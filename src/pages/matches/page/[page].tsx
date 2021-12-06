import { GetStaticPaths, GetStaticProps } from "next";
import Head from "next/head";
import Layout from "../../../components/Layout";
import BasicMeta from "../../../components/meta/BasicMeta";
import OpenGraphMeta from "../../../components/meta/OpenGraphMeta";
import TwitterCardMeta from "../../../components/meta/TwitterCardMeta";
import MatchList from "../../../components/MatchList";
import config from "../../../lib/config";
import { countMatches, listMatchContent, MatchContent } from "../../../lib/matches";

type Props = {
  matches: MatchContent[];
  page: number;
  pagination: {
    current: number;
    pages: number;
  };
};
export default function Page({ matches, pagination, page }: Props) {
  const url = `/matches/page/${page}`;
  return (
    <Layout>
      <BasicMeta url={url} />
      <OpenGraphMeta url={url} />
      <TwitterCardMeta url={url}/>
      <MatchList matches={matches} pagination={pagination} />
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const page = parseInt(params.page as string);
  const matches = listMatchContent(page, config.matches_per_page);
  const pagination = {
    current: page,
    pages: Math.ceil(countMatches() / config.matches_per_page),
  };
  return {
    props: {
      page,
      matches,
      pagination,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const pages = Math.ceil(countMatches() / config.matches_per_page);
  const paths = Array.from(Array(pages - 1).keys()).map((it) => ({
    params: { page: (it + 2).toString() },
  }));
  return {
    paths: paths,
    fallback: false,
  };
};
