
import Layout from '../../components/Layout';
import BasicMeta from '../../components/meta/BasicMeta';
import TeamGenerator from '../../components/TeamGenerator';
import OpenGraphMeta from '../../components/meta/OpenGraphMeta';
import InstagramCardMeta from '../../components/meta/InstagramCardMeta';

export default function Index() {
  const url = '/team-generator';
  return (
    <Layout>
      <BasicMeta url={url} />
      <OpenGraphMeta url={url} />
      <InstagramCardMeta url={url} />
      <TeamGenerator></TeamGenerator>
    </Layout>
  );
}
