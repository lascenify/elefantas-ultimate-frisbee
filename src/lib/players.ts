import path from "path";
import fs from "fs";
import matter from "gray-matter";
import yaml from "js-yaml";

const playersDirectory = path.join(process.cwd(), "content/players");

export type PlayerContent = {
  readonly slug: string;
  readonly name: string;
  readonly number: number;
  readonly age?: number;
  readonly description?: string;
  readonly memberSince?: string;
};

export type Player = {
  name: string;
  number: number;
  age?: number;
  description?: string;
  memberSince?: string;
}

export type SquadPlayer = {
  name?: string;
  number?: number;
}

let playersCache: PlayerContent[];

export function fetchPlayersContent(): PlayerContent[] {
  if (playersCache) {
    return playersCache;
  }
  // Get file names under /players
  const fileNames = fs.readdirSync(playersDirectory);
  const allPlayersData = fileNames
    .filter((it) => it.endsWith(".mdx"))
    .map((fileName) => {
      // Read markdown file as string
      const fullPath = path.join(playersDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, "utf8");

      // Use gray-matter to parse the match metadata section
      const matterResult = matter(fileContents, {
        engines: {
          yaml: (s) => yaml.load(s, { schema: yaml.JSON_SCHEMA }) as object,
        },
      });
      const matterData = matterResult.data as {
        slug: string,
        name: string,
        number: number,
        age: number,
        description: string,
        memberSince: string,
        fullPath: string
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
  // Sort players by name
  playersCache = allPlayersData.sort((a, b) => {
    if (a.number > b.number) {
      return 1;
    } else {
      return -1;
    }
  });
  return playersCache;
}

export function countPlayers(): number {
  return fetchPlayersContent().length;
}

export function listPlayersContent(
  page: number,
  limit: number
): Player[] {
  return fetchPlayersContent()
    .slice((page - 1) * limit, page * limit);
}
