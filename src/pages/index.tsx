import Layout from '../components/Layout';
import BasicMeta from '../components/meta/BasicMeta';
import OpenGraphMeta from '../components/meta/OpenGraphMeta';
import InstagramCardMeta from '../components/meta/InstagramCardMeta';
import HomeCarousel from '../components/HomeCarousel';
import { CloudinaryContext } from 'cloudinary-react';
import config from '../lib/config';

const { cloudinary_cloud_name, cloudinary_upload_preset } = config;
export default function Index() {
  return (
    <CloudinaryContext cloudName={cloudinary_cloud_name} uploadPreset={cloudinary_upload_preset}>
      <Layout>
        <BasicMeta url={'/'} />
        <OpenGraphMeta url={'/'} />
        <InstagramCardMeta url={'/'} />
        <div className="container">
            <h1>
              Hola! Benvinguda a la pàgina oficial de EUF
              <br />
              <span className="fancy"> Elefantas Ultimate Frisbee </span>
            </h1>
          <h4>Solo asuntos ultimate, por favor.</h4>

          <HomeCarousel/>
        </div>
        <style jsx>{`
          .container {
            display: flex;
            align-items: center;
            flex-direction: column;
            padding-left: 2rem;
            padding-right: 2rem;
          }
          h1 {
            font-size: 2.5rem;
            margin: 0;
            font-weight: 500;
          }
          h2 {
            font-size: 1.75rem;
            font-weight: 400;
            line-height: 1.25;
          }
          .fancy {
            color: #15847d;
          }
          .handle {
            display: inline-block;
            margin-top: 0.275em;
            color: #9b9b9b;
            letter-spacing: 0.05em;
          }

          @media (min-width: 769px) {
            h1 {
              font-size: 3rem;
            }
            h2 {
              font-size: 2.25rem;
            }
          }
        `}</style>
      </Layout>
    </CloudinaryContext>
  );
}
