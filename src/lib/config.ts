import config from '../../config.json';

type Config = {
  readonly base_url: string;
  readonly site_title: string;
  readonly site_description: string;
  readonly site_keywords: { keyword: string }[];
  readonly matches_per_page: number;
  readonly players_per_page: number;
  readonly twitter_account: string;
  readonly instagram_account: string;
  readonly github_account: string;
  readonly cloudinary_cloud_name: string;
  readonly cloudinary_upload_preset: string;
};

export default config as Config;
