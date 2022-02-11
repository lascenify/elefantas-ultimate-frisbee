import Head from "next/head";
import config from "../../lib/config";

type Props = {
  url: string;
  title?: string;
  description?: string;
};
export default function InstagramCardMeta({ url, title, description }: Props) {
  return (
    <Head>
      <meta property="instagram:card" content="summary_large_image" />
      <meta property="instagram:site" content={config.instagram_account} />
      <meta property="instagram:url" content={config.base_url + url} />
      <meta
        property="instagram:title"
        content={title ? [title, config.site_title].join(" | ") : ""}
      />
      <meta
        property="instagram:description"
        content={description ? description : config.site_description}
      />
    </Head>
  );
}
