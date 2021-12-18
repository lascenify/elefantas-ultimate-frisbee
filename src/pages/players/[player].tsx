import { GetStaticProps, GetStaticPaths } from "next";
import renderToString from "next-mdx-remote/render-to-string";
import { MdxRemote } from "next-mdx-remote/types";
import matter from "gray-matter";
import fs from "fs";
import yaml from "js-yaml";
import hydrate from "next-mdx-remote/hydrate";
import InstagramEmbed from "react-instagram-embed";
import YouTube from "react-youtube";
import { TwitterTweetEmbed } from "react-twitter-embed";
import { fetchPlayersContent } from "../../lib/players";

export type Props = {
  slug: string;
  name: string;
  number: number;
  age?: number;
  description: string;
  memberSince: string;
  source: MdxRemote.Source;
};

const components = { InstagramEmbed, YouTube, TwitterTweetEmbed };
const slugToPlayerContent = (playerContents => {
  let hash = {}
  playerContents.forEach(it => hash[it.slug] = it)
  return hash;
})(fetchPlayersContent());

export default function Player({
  slug,
  name,
  number,
  age,
  description,
  memberSince,
  source
}: Props) {
  const content = hydrate(source, { components })
  return (<div></div>)
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = fetchPlayersContent().map(it => "/players/" + it.slug);
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const slug = params.player as string;
  const source = fs.readFileSync(slugToPlayerContent[slug].fullPath, "utf8");
  const { content, data } = matter(source, {
    engines: { yaml: (s) => yaml.load(s, { schema: yaml.JSON_SCHEMA }) as object }
  });
  const mdxSource = await renderToString(content, { components, scope: data });
  return {
    props: {
      slug: data.slug,
      name: data.name,
      number: data.number,
      age: data.age,
      description: data.description,
      memberSince: data.memberSince,
      source: mdxSource
    },
  };
};

