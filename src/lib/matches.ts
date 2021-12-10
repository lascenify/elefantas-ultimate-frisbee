import fs from "fs";
import matter from "gray-matter";
import path from "path";
import yaml from "js-yaml";
import { Player, SquadPlayer } from "./players";

const matchesDirectory = path.join(process.cwd(), "content/matches");

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

export type MatchContent = {
  readonly date: string;
  readonly slug: string;
  readonly fullPath: string;
  readonly redTeam: Team;
  readonly blueTeam: Team;
};

let matchCache: MatchContent[];

export function fetchMatchContent(): MatchContent[] {
  if (matchCache) {
    return matchCache;
  }
  // Get file names under /matches
  const fileNames = fs.readdirSync(matchesDirectory);
  const allMatchesData = fileNames
    .filter((it) => it.endsWith(".mdx"))
    .map((fileName) => {
      // Read markdown file as string
      const fullPath = path.join(matchesDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, "utf8");

      // Use gray-matter to parse the match metadata section
      const matterResult = matter(fileContents, {
        engines: {
          yaml: (s) => yaml.load(s, { schema: yaml.JSON_SCHEMA }) as object,
        },
      });
      const matterData = matterResult.data as {
        date: string;
        slug: string;
        fullPath: string,
        redTeam: Team,
        blueTeam: Team
      };
      matterData.fullPath = fullPath;

      const slug = fileName.replace(/\.mdx$/, "");

      // Validate slug string
      if (matterData.slug !== slug) {
        throw new Error(
          "slug field not match with the path of its content source"
        );
      }

      return matterData;
    });
  // Sort matches by date
  matchCache = allMatchesData.sort((a, b) => {
    if (a.date < b.date) {
      return 1;
    } else {
      return -1;
    }
  });
  return matchCache;
}

export function countMatches(): number {
  return fetchMatchContent().length;
}

export function listMatchContent(
  page: number,
  limit: number
): MatchContent[] {
  return fetchMatchContent()
    .slice((page - 1) * limit, page * limit);
}

export function getMatchLineUp(players: Player[]): Squad {
  console.log("equipoooo", players)
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
