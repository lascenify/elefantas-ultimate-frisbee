import React from "react";
import { MatchContent } from "../lib/matches";
import MatchItem from "./MatchItem";
import Pagination from "./Pagination";

type Props = {
  matches: MatchContent[];
  pagination: {
    current: number;
    pages: number;
  };
};
export default function MatchList({ matches, pagination }: Props) {
  return (
    <div className={"container"}>
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
          display: flex;
          flex-direction: column;
          flex: 1 1 auto;
        }
        .matches li {
          margin-bottom: 1.5rem;
        }
        .matches-list {
          flex: 1 0 auto;
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
