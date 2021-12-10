import { GetStaticProps, GetStaticPaths } from "next";
import renderToString from "next-mdx-remote/render-to-string";
import { MdxRemote } from "next-mdx-remote/types";
import hydrate from "next-mdx-remote/hydrate";
import matter from "gray-matter";
import { fetchMatchContent, Team } from "../../lib/matches";
import fs from "fs";
import yaml from "js-yaml";
import { parseISO } from 'date-fns';
import MatchLayout from "../../components/MatchLayout";

import InstagramEmbed from "react-instagram-embed";
import YouTube from "react-youtube";
import { TwitterTweetEmbed } from "react-twitter-embed";

export type Props = {
  dateString: string;
  slug: string;
  author: string;
  redTeam: Team,
  blueTeam: Team,
  source: MdxRemote.Source;
};

const components = { InstagramEmbed, YouTube, TwitterTweetEmbed };
const slugToMatchContent = (matchContents => {
  let hash = {}
  matchContents.forEach(it => hash[it.slug] = it)
  return hash;
})(fetchMatchContent());

export default function Match({
  dateString,
  slug,
  author,
  redTeam,
  blueTeam,
  source,
}: Props) {
  const content = hydrate(source, { components })
  console.log("equipo en match.tsx", redTeam)
  return (
    <MatchLayout
      date={parseISO(dateString)}
      slug={slug}
      author={author}
      redTeam={redTeam}
      blueTeam={blueTeam}
    >
      {content}
    </MatchLayout>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = fetchMatchContent().map(it => "/matches/" + it.slug);
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const slug = params.match as string;
  const source = fs.readFileSync(slugToMatchContent[slug].fullPath, "utf8");
  const { content, data } = matter(source, {
    engines: { yaml: (s) => yaml.load(s, { schema: yaml.JSON_SCHEMA }) as object }
  });
  const mdxSource = await renderToString(content, { components, scope: data });
  return {
    props: {
      dateString: data.date,
      slug: data.slug,
      author: data.author,
      blueTeam: data.blueTeam,
      redTeam: data.redTeam,
      source: mdxSource
    },
  };
};

