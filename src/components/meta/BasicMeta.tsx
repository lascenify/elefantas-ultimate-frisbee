import Head from 'next/head';
import config from '../../lib/config';

type Props = {
  author?: string;
  url: string;
};
export default function BasicMeta({ author, url }: Props) {
  return (
    <Head>
      <title>{config.site_title}</title>
      <meta name="description" content={config.site_description} />
      <meta
        name="keywords"
        content={
           config.site_keywords.map((it) => it.keyword).join(',')
        }
      />
      {author ? <meta name="author" content={author} /> : null}
      <link rel="canonical" href={config.base_url + url} />
    </Head>
  );
}
