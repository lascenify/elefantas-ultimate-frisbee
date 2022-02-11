import path from "path";

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
