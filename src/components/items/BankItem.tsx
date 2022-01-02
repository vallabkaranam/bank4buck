import { Link } from "react-router-dom";
import { Bank } from "../../Bank.definitions";
import { toDollars } from "../../utils";
import Favorite from "../Favorite";
interface Props {
  bank: Bank;
  notes: { [x: string]: string };
  favorites: { [x: string]: boolean };
  setFavorites: (obj: object) => void;
}
const BankItem = ({ bank, notes, favorites, setFavorites }: Props) => {
  const { UNINUM: id, NAME, ACTIVE, CITY, STNAME, ASSET, NETINC } = bank.data;
  return (
    <div className="card bg-light bank_item_container">
      <span className="quick_info_column">
        <h3 className="text-primary text-left item_title">
          <Link to={`/banks/${id}`}>{NAME}</Link>
        </h3>
        <ul className="list">
          <li>
            <span
              className={`badge ${ACTIVE ? "badge-success" : "badge-primary"}`}
            >
              {ACTIVE ? "Active" : "Inactive"}
            </span>
          </li>

          <li>
            <i
              className="fas fa-map-marker-alt"
              style={{ height: 16, width: 14 }}
            />{" "}
            {`${CITY}, ${STNAME}`}
          </li>
          <li>
            <i
              className="fas fa-dollar-sign"
              style={{ height: 16, width: 14 }}
            />{" "}
            {toDollars(ASSET)}
          </li>
          <li>
            <i className="far fa-plus-square" /> {toDollars(NETINC)}
          </li>
        </ul>
      </span>
      <div className="text-primary fav_notes_column">
        <span>
          <Favorite favorites={favorites} setFavorites={setFavorites} id={id} />
        </span>
        {id in notes ? <i className="fas fa-sticky-note text-center" /> : null}
      </div>
    </div>
  );
};

export default BankItem;
