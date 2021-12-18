import React from "react";
import { MatchContent } from "../lib/matches";
import MatchItem from "./MatchItem";
import Pagination from "./Pagination";
import {Image} from 'cloudinary-react';
import config from "../lib/config";
type Props = {
  matches: MatchContent[];
  pagination: {
    current: number;
    pages: number;
  };
};
const { cloudinary_cloud_name, cloudinary_upload_preset } = config;

export default function MatchList({ matches, pagination }: Props) {
  return (
    <div className={"container"}>
      <div className={"headerContainer"}>
       <h2> Partits jugats </h2>
       <Image secure="true" className={"image"} width="100" responsive cloudName={cloudinary_cloud_name}  uploadPreset={cloudinary_upload_preset} publicId="/frisbee-front.png" />

      </div>
      <div className={"matches"}>
        <ul className={"match-list"}>
          {matches.map((it, i) => (
            <li key={i}>
              <MatchItem match={it} />
            </li>
          ))}
        </ul>
        <Pagination
          current={pagination.current}
          pages={pagination.pages}
          link={{
            href: (page) => (page === 1 ? "/matches" : "/matches/page/[page]"),
            as: (page) => (page === 1 ? null : "/matches/page/" + page),
          }}
        />
      </div>
      <style jsx>{`
        .container {
          display: flex;
          flex-direction: column;
          margin: 0 auto;
          max-width: 1200px;
          width: 100%;
          padding: 0 1.5rem;
        }
        ul {
          margin: 0;
          padding: 0;
        }
        li {
          list-style: none;
        }
        .matches {
          width: 100%;
          display: flex;
          flex-direction: column;
          flex: 1 1 auto;
          align-items: start;
        }
        .matches li {
          margin-bottom: 1.5rem;
        }
        .matches-list {
          flex: 1 0 auto;
        }
        .headerContainer{
          display: flex;
          flex-direction: row;
          align-items: center;
          gap: 1.5rem;
          padding-bottom: 2rem;
        }
        @media (min-width: 769px) {
          .categories {
            display: block;
          }
        }
      `}</style>
    </div>
  );
}
