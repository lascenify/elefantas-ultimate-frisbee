import { GetStaticProps } from "next";
import Layout from "../../components/Layout";
import BasicMeta from "../../components/meta/BasicMeta";
import OpenGraphMeta from "../../components/meta/OpenGraphMeta";
import TwitterCardMeta from "../../components/meta/TwitterCardMeta";
import MatchList from "../../components/MatchList";
import config from "../../lib/config";
import { countMatches, listMatchContent, MatchContent } from "../../lib/matches";

type Props = {
  matches: MatchContent[];
  pagination: {
    current: number;
    pages: number;
  };
};
export default function Index({ matches , pagination }: Props) {
  const url = "/matches";
  return (
    <Layout>
      <BasicMeta url={url}/>
      <OpenGraphMeta url={url} />
      <TwitterCardMeta url={url}  />
      <MatchList matches={matches} pagination={pagination} />
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const matches = listMatchContent(1, config.matches_per_page);
  const pagination = {
    current: 1,
    pages: Math.ceil(countMatches() / config.matches_per_page),
  };
  return {
    props: {
      matches,
      pagination,
    },
  };
};
