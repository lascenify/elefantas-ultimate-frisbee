import { GetStaticPaths, GetStaticProps } from "next";
import Layout from "../../../components/Layout";
import BasicMeta from "../../../components/meta/BasicMeta";
import OpenGraphMeta from "../../../components/meta/OpenGraphMeta";
import TwitterCardMeta from "../../../components/meta/TwitterCardMeta";
import config from "../../../lib/config";
import { countPlayers, listPlayersContent, PlayerContent } from "../../../lib/players";
import PlayerList from "../../../components/PlayerList";

type Props = {
  players: PlayerContent[];
  page: number;
  pagination: {
    current: number;
    pages: number;
  };
};
export default function Page({ players, pagination, page }: Props) {
  const url = `/players/page/${page}`;
  return (
    <Layout>
      <BasicMeta url={url} />
      <OpenGraphMeta url={url} />
      <TwitterCardMeta url={url}/>
      <PlayerList players={players} pagination={pagination} />
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const page = parseInt(params.page as string);
  const players = listPlayersContent(page, config.players_per_page);
  const pagination = {
    current: page,
    pages: Math.ceil(countPlayers() / config.players_per_page),
  };
  return {
    props: {
      page,
      players,
      pagination,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const pages = Math.ceil(countPlayers() / config.players_per_page);
  const paths = Array.from(Array(pages - 1).keys()).map((it) => ({
    params: { page: (it + 2).toString() },
  }));
  return {
    paths: paths,
    fallback: false,
  };
};
