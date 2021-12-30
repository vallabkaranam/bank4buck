import React from "react";
import { Link } from "react-router-dom";
import { toDollars } from "../../utils";
import Favorite from "../Favorite";
interface Props {
  bank: any;
  notes: any;
  favorites: any;
  setFavorites: any;
}
const BankItem = ({ bank, notes, favorites, setFavorites }: Props) => {
  const id = bank.data.UNINUM;
  return (
    <div className="card bg-light bank_item_container">
      <span style={{ width: 300 }}>
        <h3 className="text-primary text-left item_title">
          <Link to={`/banks/${id}`}>{bank.data.NAME}</Link>
        </h3>
        <ul className="list">
          <li>
            <span
              className={`badge ${
                bank.data.ACTIVE ? "badge-success" : "badge-primary"
              }`}
            >
              {bank.data.ACTIVE ? "Active" : "Inactive"}
            </span>
          </li>

          <li>
            <i
              className="fas fa-map-marker-alt"
              style={{ height: 16, width: 14 }}
            />{" "}
            {`${bank.data.CITY}, ${bank.data.STNAME}`}
          </li>
          <li>
            <i
              className="fas fa-dollar-sign"
              style={{ height: 16, width: 14 }}
            />{" "}
            {toDollars(bank.data.ASSET)}
          </li>
          <li>
            <i className="far fa-plus-square" /> {toDollars(bank.data.NETINC)}
          </li>
        </ul>
      </span>
      <div className="text-primary fav_notes_column">
        <span>
          <Favorite favorites={favorites} setFavorites={setFavorites} id={id} />
        </span>
        {id in notes ? <i className="fas fa-sticky-note" /> : null}
      </div>
    </div>
  );
};

export default BankItem;
