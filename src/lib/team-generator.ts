import path from "path";
import { Player, SquadPlayer } from "./players";

export type GeneratorPlayer = {
  id: number;
  name: string;
  attack: number;
  defense: number;
  avg: number;
}

export async function fetchInfoFromJson() {
  const generatorDataDirectory = path.join(process.cwd(), "content/generator.json");
  const response = await fetch(generatorDataDirectory);
  const players: GeneratorPlayer[] = await response.json();
  return players;
}

export function generateTeams(players: GeneratorPlayer[]) {
  const orderedPlayers = players.sort((a, b) => a.avg -  b.avg);
  const redTeam = orderedPlayers.filter((_, index) => index % 2 === 0);
  const blueTeam = orderedPlayers.filter((_, index) => index % 2 !== 0);
  return { redTeam, blueTeam };
}

export type Team = {
  players: Player[];
  score: number;
}

/**
 * gk: goalkeeper
 * df: defenders
 * cdm: central defensive midfielders
 * cm: central midfielders
 * cam: central attack midfielders
 * fw: forwards
 */
export type Squad = {
  gk?: SquadPlayer,
  df?: SquadPlayer[],
  cdm?: SquadPlayer[],
  cm?: SquadPlayer[],
  cam?: SquadPlayer[],
  fw?: SquadPlayer[],
}

export function getMatchLineUp(players: Player[]): Squad {
  switch (players?.length) {
    case 3:
      return {
        df: [
          mapPlayerToSquadMember(players[0]),
          mapPlayerToSquadMember(players[1])
        ],
        fw: [mapPlayerToSquadMember(players[2])]
      }
    case 4:
      return {
        gk: mapPlayerToSquadMember(players[0]),
        df: [
          mapPlayerToSquadMember(players[1]),
          mapPlayerToSquadMember(players[2]),
        ],
        fw: [mapPlayerToSquadMember(players[3])]
      }
    case 5:
      return {
        gk: mapPlayerToSquadMember(players[0]),
        df:[mapPlayerToSquadMember(players[1])],
        cam: [
          mapPlayerToSquadMember(players[2]),
          mapPlayerToSquadMember(players[3]),
        ],
        fw:[mapPlayerToSquadMember(players[4])]
      }
    case 6:
      return {
        gk: mapPlayerToSquadMember(players[0]),
        df: [
          mapPlayerToSquadMember(players[1]),
          mapPlayerToSquadMember(players[2]),
        ],
        cam: [
          mapPlayerToSquadMember(players[3]),
          mapPlayerToSquadMember(players[4]),
        ],
        fw: [mapPlayerToSquadMember(players[5])]
      }
    case 7:
      return {
        gk: mapPlayerToSquadMember(players[0]),
        df: [
          mapPlayerToSquadMember(players[1]),
          mapPlayerToSquadMember(players[2]),
        ],
        cam: [
          mapPlayerToSquadMember(players[3]),
          mapPlayerToSquadMember(players[4]),
        ],
        fw: [
          mapPlayerToSquadMember(players[5]),
          mapPlayerToSquadMember(players[6]),
        ]
      }
  }
}

function mapPlayerToSquadMember(player: Player) {
  return { number: player.number, name: player.name };
}
