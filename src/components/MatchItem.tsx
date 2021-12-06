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
        <h2>Partido jugado el {match.date.toString()}</h2>
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