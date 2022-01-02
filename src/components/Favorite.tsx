import { Fragment } from "react";
import { addObj, removeObj } from "../utils";

interface Props {
  favorites: { [x: string]: boolean };
  id: string;
  setFavorites: (obj: object) => void;
}
const Favorite = ({ favorites, setFavorites, id }: Props) => {
  return (
    <Fragment>
      {id in favorites ? (
        <span
          role="button"
          onClick={() => {
            removeObj(favorites, setFavorites, id);
          }}
        >
          <i className="fas fa-heart clickable" />
        </span>
      ) : (
        <span
          role="button"
          onClick={() => {
            addObj(favorites, setFavorites, id);
          }}
        >
          <i className="far fa-heart clickable" />
        </span>
      )}
    </Fragment>
  );
};

export default Favorite;
