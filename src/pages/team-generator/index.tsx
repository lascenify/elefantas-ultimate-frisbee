
import Layout from '../../components/Layout';
import BasicMeta from '../../components/meta/BasicMeta';
import TeamGenerator from '../../components/TeamGenerator';
import OpenGraphMeta from '../../components/meta/OpenGraphMeta';
import TwitterCardMeta from '../../components/meta/TwitterCardMeta';
import { GeneratorPlayer } from '../../lib/team-generator';

interface Props {
  players: GeneratorPlayer[];
}
export default function Index({players}: Props) {
  const url = '/team-generator';
  return (
    <Layout>
      <BasicMeta url={url} />
      <OpenGraphMeta url={url} />
      <TwitterCardMeta url={url} />
      <TeamGenerator></TeamGenerator>
    </Layout>
  );
}
