import { Bank } from "../../Bank.definitions";
import BankItem from "./BankItem";

interface Props {
  list: Array<Bank>;
  notes: { [x: string]: string };
  favorites: { [x: string]: boolean };
  setFavorites: (obj: object) => void;
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
