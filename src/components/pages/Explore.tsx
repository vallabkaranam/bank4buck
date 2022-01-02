import { useState, useEffect, Fragment } from "react";
import Search from "../items/Search";
import axios from "axios";
import usePageBottom from "../../hooks/usePageBottom";
import BankList from "../items/BankList";
import Spinner from "../Spinner";
import ScrollToTop from "../ScrollToTop";
import { bankUrl, limit } from "../../utils";
import { Bank } from "../../Bank.definitions";

interface Props {
  favorites: { [x: string]: boolean };
  setFavorites: (obj: object) => void;
  notes: { [x: string]: string };
}
const Explore = ({ favorites, setFavorites, notes }: Props) => {
  const [banksList, setBanksList] = useState<Bank[]>([]);
  const [totalBankCount, setTotalBankCount] = useState(0);
  const [offset, setOffset] = useState(0);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState({});
  const isPageBottom = usePageBottom();

  let url = `${bankUrl}?limit=${limit}&search=name:${searchKeyword}&offset=${offset}&fields=NAME,ACTIVE,CITY,STNAME,ASSET,NETINC,UNINUM&filters=!UNINUM:(${Object.keys(
    favorites
  )
    .concat(Object.keys(notes))
    .map((key) => `"${key}"`)
    .join(",")})`;

  useEffect(() => {
    setBanksList([]);
    setOffset(0);
    setIsLoading(true);
  }, [searchKeyword]);

  useEffect(() => {
    async function getBanks() {
      try {
        if (
          JSON.stringify(favorites) === "{}" &&
          JSON.stringify(notes) === "{}"
        ) {
          url = url.split("&filters")[0];
        }
        const res = await axios.get(url);
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
  }, [isLoading, offset, searchKeyword, favorites]);

  useEffect(() => {
    if (isPageBottom && banksList.length < totalBankCount) {
      setIsLoading(true);
      setOffset(offset + limit);
    }
  }, [isPageBottom]);

  return (
    <Fragment>
      <h1>Wanna get more Bank4Buck?</h1>
      <Search
        setSearchKeyword={setSearchKeyword}
        placeholder="Explore institutions..."
      />

      {isLoading ? <Spinner /> : <b>Total Institutions: {totalBankCount}</b>}

      <BankList
        list={banksList}
        notes={notes}
        favorites={favorites}
        setFavorites={setFavorites}
      />
      <ScrollToTop />
    </Fragment>
  );
};

export default Explore;
