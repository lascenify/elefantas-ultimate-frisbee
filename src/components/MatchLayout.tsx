import React from "react";
import styles from "../../public/styles/content.module.css";
import Author from "./Author";
import Copyright from "./Copyright";
import Date from "./Date";
import Layout from "./Layout";
import BasicMeta from "./meta/BasicMeta";
import JsonLdMeta from "./meta/JsonLdMeta";
import OpenGraphMeta from "./meta/OpenGraphMeta";
import TwitterCardMeta from "./meta/TwitterCardMeta";
import { getAuthor } from "../lib/authors";
import SoccerLineUp from 'react-soccer-lineup';
import {getMatchLineUp, Team} from '../lib/matches';
type Props = {
  date: Date;
  slug: string;
  author: string;
  blueTeam: Team,
  redTeam: Team,
  children: React.ReactNode;
};

export default function MatchLayout({
  date,
  slug,
  author,
  blueTeam,
  redTeam,
  children,
}: Props) {
  const authorName = getAuthor(author).name;
  const blueTeamLineUp = {
    color: "lightblue",
    squad: getMatchLineUp(blueTeam?.players)
  };
  const redTeamLineUp = {
    color: "red",
    squad: getMatchLineUp(redTeam?.players)
  };
  const redTeamPlayers = redTeam.players.map((player)=> `${player.name} (${player.number})`).join(', ')
  const blueTeamPlayers = blueTeam.players.map((player)=> `${player.name} (${player.number})`).join(', ')

  return (
    <Layout>
      <BasicMeta
        url={`/matches/${slug}`}
      />
      <TwitterCardMeta
        url={`/matches/${slug}`}
      />
      <OpenGraphMeta
        url={`/matches/${slug}`}
      />
      <JsonLdMeta
        url={`/matches/${slug}`}
        date={date}
        author={authorName}
      />
      <div className={"container"}>
        <article>
          <header>
            <h1> Partido jugado el {date.toLocaleDateString()}</h1>
            <div className={"metadata"}>
              <div>
                <Date date={date} />
              </div>
              <div>
                <Author author={getAuthor(author)} />
              </div>
            </div>
          </header>
          <SoccerLineUp
            size={ "responsive" }
            color={ "lightseagreen" }
            pattern={"squares"}
            homeTeam={redTeamLineUp}
            awayTeam={blueTeamLineUp}
          />
          <div className="score-container">
            <h1>{redTeam.score} - {blueTeam.score}</h1>
          </div>

          <h2>Equipo rojo: </h2>
          <h3>{redTeamPlayers}</h3>
          <h2>Equipo azul: </h2>
          <h3>{blueTeamPlayers}</h3>

          <div className={styles.content}>{children}</div>
        </article>
        <footer>
          <Copyright />
        </footer>
      </div>
      <style jsx>
        {`
            .container {
              display: block;
              max-width: 36rem;
              width: 100%;
              margin: 0 auto;
              padding: 0 1.5rem;
              box-sizing: border-box;
              z-index: 0;
            }
            .metadata div {
              display: inline-block;
              margin-right: 0.5rem;
              margin-bottom: 1.5rem;
            }
            article {
              flex: 1 0 auto;
            }
            h1 {
              margin: 0 0 0.5rem;
              font-size: 2.25rem;
            }
            .score-container {
              text-align: center;
              border-style: solid;
              border-width: 3px;
              margin-top: 1.5rem;
            }

            @media (min-width: 769px) {
              .container {
                display: flex;
                flex-direction: column;
              }
            }
          `}
      </style>
      <style global jsx>
        {`
            /* Syntax highlighting */
            .token.comment,
            .token.prolog,
            .token.doctype,
            .token.cdata,
            .token.plain-text {
              color: #6a737d;
            }

            .token.atrule,
            .token.attr-value,
            .token.keyword,
            .token.operator {
              color: #d73a49;
            }

            .token.property,
            .token.tag,
            .token.boolean,
            .token.number,
            .token.constant,
            .token.symbol,
            .token.deleted {
              color: #22863a;
            }

            .token.selector,
            .token.attr-name,
            .token.string,
            .token.char,
            .token.builtin,
            .token.inserted {
              color: #032f62;
            }

            .token.function,
            .token.class-name {
              color: #6f42c1;
            }

            /* language-specific */

            /* JSX */
            .language-jsx .token.punctuation,
            .language-jsx .token.tag .token.punctuation,
            .language-jsx .token.tag .token.script,
            .language-jsx .token.plain-text {
              color: #24292e;
            }

            .language-jsx .token.tag .token.attr-name {
              color: #6f42c1;
            }

            .language-jsx .token.tag .token.class-name {
              color: #005cc5;
            }

            .language-jsx .token.tag .token.script-punctuation,
            .language-jsx .token.attr-value .token.punctuation:first-child {
              color: #d73a49;
            }

            .language-jsx .token.attr-value {
              color: #032f62;
            }

            .language-jsx span[class="comment"] {
              color: pink;
            }

            /* HTML */
            .language-html .token.tag .token.punctuation {
              color: #24292e;
            }

            .language-html .token.tag .token.attr-name {
              color: #6f42c1;
            }

            .language-html .token.tag .token.attr-value,
            .language-html
              .token.tag
              .token.attr-value
              .token.punctuation:not(:first-child) {
              color: #032f62;
            }

            /* CSS */
            .language-css .token.selector {
              color: #6f42c1;
            }

            .language-css .token.property {
              color: #005cc5;
            }
          `}
      </style>
    </Layout>
  );

}
