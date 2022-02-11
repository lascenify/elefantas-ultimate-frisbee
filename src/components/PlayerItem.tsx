import { PlayerContent } from "../lib/players";
import {Image, Transformation} from 'cloudinary-react';
type Props = {
  player: PlayerContent;
};
export default function PlayerItem({ player }: Props) {
  return (
    <div className="imageContainer">
      <Image secure="true" publicId={`/players/${player.number}.jpg`}>
        <Transformation width="300" crop="scale" />
      </Image>
      <style jsx>{`
      `}</style>
    </div>
  );
}
