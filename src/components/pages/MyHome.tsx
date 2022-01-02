import { useState, useEffect, Fragment } from "react";
import axios from "axios";
import usePageBottom from "../../hooks/usePageBottom";
import Search from "../items/Search";
import BankList from "../items/BankList";
import Spinner from "../Spinner";
import money from "../../assets/money.png";
import ScrollToTop from "../ScrollToTop";
import { bankUrl, limit } from "../../utils";
import { Bank } from "../../Bank.definitions";

interface Props {
  favorites: { [x: string]: boolean };
  setFavorites: (obj: object) => void;
  notes: { [x: string]: string };
}

const MyHome = ({ favorites, setFavorites, notes }: Props) => {
  const [banksList, setBanksList] = useState<Bank[]>([]);
  const [totalBankCount, setTotalBankCount] = useState(0);
  const [offset, setOffset] = useState(0);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState({});
  const isPageBottom = usePageBottom();

  useEffect(() => {
    setBanksList([]);
    setOffset(0);
    setIsLoading(true);
  }, [searchKeyword]);

  useEffect(() => {
    async function getBanks() {
      try {
        const res = await axios.get(
          `${bankUrl}?limit=${limit}&search=name:${searchKeyword}&offset=${offset}&fields=NAME,ACTIVE,CITY,STNAME,ASSET,NETINC,UNINUM&filters=UNINUM:(${Object.keys(
            favorites
          )
            .concat(Object.keys(notes))
            .map((key) => `"${key}"`)
            .join(",")})`
        );
        const newBanks = await res.data;

        if (newBanks) {
          setBanksList((prev) => prev.concat(newBanks.data));
          setTotalBankCount(newBanks.totals.count);
        }
      } catch (error) {
        let message;
        if (error instanceof Error) message = error.message;
        else message = String(error);
        setError({ message });
      }

      setIsLoading(false);
    }
    if (isLoading) {
      getBanks();
    }
  }, [isLoading, offset, searchKeyword, favorites, notes]);

  useEffect(() => {
    if (isPageBottom && banksList.length < totalBankCount) {
      setIsLoading(true);
      setOffset(offset + limit);
    }
  }, [isPageBottom]);

  return (
    <Fragment>
      <h1>MyQuickBucks</h1>
      <Search setSearchKeyword={setSearchKeyword} />
      {JSON.stringify(favorites) === "{}" && JSON.stringify(notes) === "{}" ? (
        <div className="text-center">
          <h3>
            You have not selected any institution as your favorite, nor have you
            made any notes. <br />
            Visit the Explore page now to start making more Bank4Buck!
          </h3>
          <img
            src={money}
            alt="money"
            style={{ height: "25rem", width: "25rem" }}
          />
        </div>
      ) : (
        <Fragment>
          {isLoading ? (
            <Spinner />
          ) : (
            <b>Total Institutions: {totalBankCount}</b>
          )}
          <BankList
            list={banksList}
            notes={notes}
            favorites={favorites}
            setFavorites={setFavorites}
          />
        </Fragment>
      )}
      <ScrollToTop />
    </Fragment>
  );
};

export default MyHome;
