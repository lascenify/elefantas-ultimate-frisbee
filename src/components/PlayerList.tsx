import React from "react";
import Pagination from "./Pagination";
import config from "../lib/config";
import { PlayerContent } from "../lib/players";
import PlayerItem from "./PlayerItem";
import { CloudinaryContext, Image } from 'cloudinary-react';
type Props = {
  players: PlayerContent[];
  pagination: {
    current: number;
    pages: number;
  };
};
const { cloudinary_cloud_name, cloudinary_upload_preset } = config;

export default function PlayerList({ players, pagination }: Props) {
  return (
    <CloudinaryContext cloudName={cloudinary_cloud_name} uploadPreset={cloudinary_upload_preset}>
      <div className={"container"}>
        <div className={"headerContainer"}>
        <Image secure="true" className={"image"} width="200" responsive cloudName={cloudinary_cloud_name}  uploadPreset={cloudinary_upload_preset} publicId="/logo.png" />
        <h2> La millor gent, el millor post-partit, els pitjors esguinces.
          <br/>
          <span className="fancy"> Elefantas, </span>ara més animals que mai!</h2>

        </div>

        <div className={"playersContainer"}>
          {players.map((it, i) => (
            <li key={i}>
              <PlayerItem player={it} />
            </li>
          ))}
        </div>
        <Pagination
          current={pagination.current}
          pages={pagination.pages}
          link={{
          href: (page) => (page === 1 ? "/players" : "/players/page/[page]"),
          as: (page) => (page === 1 ? null : "/players/page/" + page),
          }}
        />
        <style jsx>{`
          .container {
            width: 100%;
            padding: 0 1.5rem;
          }
          .headerContainer{
            display: flex;
            flex-direction: row;
            align-items: center;
          }
          .playersContainer {

            display: grid;
            grid-template-columns: repeat(3, 1fr);
            grid-gap: 2.5rem;
            grid-auto-rows: minmax(100px, auto);
            margin: 0 auto;
            max-width: 1200px;
          }
          ul {
            margin: 0;
            padding: 0;
          }
          li {
            list-style: none;
          }

          .fancy {
              color: #15847d;
            }
        `}
        </style>
      </div>
    </CloudinaryContext>
  );
}
