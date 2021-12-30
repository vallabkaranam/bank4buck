import React from "react";
import BankItem from "./BankItem";

interface Props {
  list: Array<any>;
  notes: Object;
  favorites: Object;
  setFavorites: any;
}

const BankList = ({ list, notes, favorites, setFavorites }: Props) => {
  return (
    <div className="list_container">
      {list.map((bank) => (
        <BankItem
          bank={bank}
          notes={notes}
          favorites={favorites}
          setFavorites={setFavorites}
          key={bank.data.UNINUM}
        />
      ))}
    </div>
  );
};

export default BankList;
