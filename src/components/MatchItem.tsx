import { MatchContent } from "../lib/matches";
import Date from "./Date";
import Link from "next/link";
import { parseISO } from "date-fns";

type Props = {
  match: MatchContent;
};
export default function MatchItem({ match }: Props) {
  return (
    <Link href={"/matches/" + match.slug}>
      <a>
        <Date date={parseISO(match.date)} />
        <h2>Partit jugat el {match.date.toString()}</h2>
        <h4>Resultat: {match.blueTeam?.score || 0} - {match.redTeam?.score || 0} </h4>
        <style jsx>
          {`
            a {
              color: #222;
              display: inline-block;
            }
            h2 {
              margin: 0;
              font-weight: 500;
            }
          `}
        </style>
      </a>
    </Link>
  );
}
