import fs from "fs";
import matter from "gray-matter";
import path from "path";
import yaml from "js-yaml";

const matchesDirectory = path.join(process.cwd(), "content/matches");

export type MatchContent = {
  readonly date: string;
  readonly slug: string;
  readonly fullPath: string;
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
