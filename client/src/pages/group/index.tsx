import React, {ReactElement} from 'react';
import {Switch, useRouteMatch} from 'react-router-dom';
import Member from '../member/Member';
import Group from './Group';
import Page from '../../Page';
import Rounds from './Rounds';
import Members from './Members';
import {Divider} from 'semantic-ui-react';
import AddMember from './AddMember';
import {useLoadGroupMembers} from '../../Store/GroupMembers';
import {useLoadRounds} from '../../Store/Rounds';

export default function (): ReactElement {
  useLoadGroupMembers();
  useLoadRounds();
  const {url} = useRouteMatch();
  return <Switch>
    <Page path={`${url}/rounds`} displayName={'Runden'}>
      <Rounds/>
    </Page>
    <Page path={`${url}/member/:groupMemberId`} displayName={'Mitglied'}>
      <Member/>
    </Page>
    <Page path={`${url}/addMembers`} displayName={'Mitglieder'}>
      <Members/>
      <Divider section/>
      <AddMember/>
    </Page>
    <Page path={`${url}`}
          menuItems={[{icon: 'user plus', route: `${url}/addMembers`, title: 'Mitglieder hinzufügen'}]}>
      <Group/>
    </Page>
  </Switch>;
}
