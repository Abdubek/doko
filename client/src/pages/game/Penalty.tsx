import React, {ReactElement, useCallback, useEffect, useState} from 'react';
import {Button, Checkbox, Form, Header, Icon, Modal, Segment} from 'semantic-ui-react';
import {useRoundParticipatingPlayers} from '../../store/Players';
import {useGame, usePatchGame} from '../../store/Games';
import {useGroupMembers} from '../../store/GroupMembers';

export default function Penalty(): ReactElement {
  const {data} = useGame()!;
  const patchGame = usePatchGame();
  const members = useGroupMembers();
  const roundParticipatingPlayers = useRoundParticipatingPlayers();
  const penaltyMemId = data.gameTypeMemberId;
  const allOtherPlayerIds = roundParticipatingPlayers.map(({groupMemberId}) => groupMemberId)
                                                     .filter((id) => id !== penaltyMemId);
  const contraLength = data.contra.members.length;
  const gameOtherPlayerIds = data.players.filter((id) => id !== penaltyMemId);
  const [open, setOpen] = useState(false);

  const getPoints = useCallback(() => (data.gamePoints * contraLength).toString(),
    [data.gamePoints, contraLength]);
  const [points, setPoints] = useState<string>(getPoints);
  const [error, setError] = useState(false);
  useEffect(() => {
    setPoints(getPoints());
  }, [getPoints]);

  return <>
    <Segment vertical>
      <Header>Regelverstoß von {members[data.gameTypeMemberId!].name}</Header>
      <Form>
        <Form.Field>
          <Checkbox
            radio
            label={<label>Nur {contraLength === 1
              ? <b>{members[data.contra.members[0]].name}</b>
              : `ein Solospieler`} erhält positive Punkte</label>}
            name='penaltyDivision'
            value='solo'
            checked={contraLength === 1}
            onChange={() => setOpen(true)}
          />
        </Form.Field>
        <Form.Field>
          <Checkbox
            radio
            label='Nur die 3 Gegenspieler dieses Spiels erhalten positive Punkte'
            name='penaltyDivision'
            value='game'
            checked={contraLength === 3}
            onChange={() => patchGame({data: {contra: {members: gameOtherPlayerIds}}})}
          />
        </Form.Field>
        {roundParticipatingPlayers.length > 4 && <>
          <Form.Field>
            <Checkbox
              radio
              label={`Alle ${allOtherPlayerIds.length} Gegenspieler dieser Runde erhalten positive Punkte`}
              name='penaltyDivision'
              value='all'
              checked={contraLength === allOtherPlayerIds.length}
              onChange={() => patchGame({data: {contra: {members: allOtherPlayerIds}}})}
            />
          </Form.Field>
        </>}

        <Form.Input label={'Strafpunkte'}
                    type={'number'}
                    error={error}
                    step={contraLength}
                    value={points}
                    required
                    onChange={(_, {value: v}) => {
                      setPoints(v);
                      const parsedValue = Math.floor(+v);
                      if (parsedValue <= 0) {
                        setError(true);
                      } else {
                        if (parsedValue % contraLength) {
                          setError(true);
                        } else {
                          patchGame({data: {gamePoints: Math.floor(parsedValue / contraLength)}});
                          setError(false);
                        }
                      }
                    }}/>

        <p>Die Strafpunkte müssen unter den Gegenspielern aufteilbar sein.</p>
      </Form>

      <Modal open={open} onClose={() => setOpen(false)} basic size='small'>
        <Header>
          <Icon name={'male'}/>
          Solo-Spieler gegen den der Regelverstoß begangen wurde
        </Header>
        <Modal.Content className="u-flex-row-around u-flex-wrap">
          {gameOtherPlayerIds.map((id) => <p key={id}>
            <Button inverted onClick={() => {
              patchGame({data: {contra: {members: [id]}}});
              setOpen(false);
            }}><Icon name='user'/> {members[id].name}</Button>
          </p>)}
        </Modal.Content>
      </Modal>
    </Segment>
  </>;
}
