import { countPlayers, listPlayersContent, PlayerContent } from "../../lib/players";
import Layout from "../../components/Layout";
import BasicMeta from "../../components/meta/BasicMeta";
import OpenGraphMeta from "../../components/meta/OpenGraphMeta";
import TwitterCardMeta from "../../components/meta/TwitterCardMeta";
import { GetStaticProps } from "next";
import config from "../../lib/config";
import PlayerList from "../../components/PlayerList";

type Props = {
  players: PlayerContent[];
  pagination: {
    current: number;
    pages: number;
  };
};
export default function Index({ players, pagination }: Props) {
  const url = "/players";
  return (
    <Layout>
      <BasicMeta url={url}/>
      <OpenGraphMeta url={url} />
      <TwitterCardMeta url={url} />
      <PlayerList players={players} pagination={pagination}></PlayerList>
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const players = listPlayersContent(1, config.players_per_page);
  const pagination = {
    current: 1,
    pages: Math.ceil(countPlayers() / config.players_per_page),
  };
  return {
    props: {
      players,
      pagination,
    },
  };
};
