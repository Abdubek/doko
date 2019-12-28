### Dev
- Install dependencies with:
```
cd common
yarn install
cd ../client
yarn install
cd ../server
yarn install
cd ..
```
- Start dev-servers with `composer up -d`
- Open http://127.0.0.1:3333


### Nomenklatur
- Eine **Runde** (round) ist ein abgeschlossener Satz an Spielen, z.B. regulär 24 Spiele oder alle Spiele eines Abends.
- Ein **Durchgang** (run) sind alle Spiele bis der startende Geber wieder an der Reihe wäre. In der Regel sind das 4 
Spiele, kann aber durch Pflichtsoli länger werden. Die Dauer von Bockspielen entspricht normalerweilse einem Durchgang.
- Ein **Spiel** (game) ist ein normaler Spieldurchgang mit 10/12 Stichen (ohne/mit Neuen). 
- Ein **Stich** (trick) ist ein Teil eines Spiels bei dem 4 Karten gespielt wurden.
