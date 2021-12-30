import React, { useState, useEffect, Fragment } from "react";
import Search from "../layout/Search";
import axios from "axios";
import usePageBottom from "../../hooks/usePageBottom";
import BankList from "../layout/BankList";
import Spinner from "../Spinner";
import ScrollToTop from "../ScrollToTop";

interface Props {
  favorites: any;
  setFavorites: any;
  notes: any;
}
const Explore = ({ favorites, setFavorites, notes }: Props) => {
  const [banksList, setBanksList] = useState<any[]>([]);
  const [totalBankCount, setTotalBankCount] = useState(0);
  const [offset, setOffset] = useState(0);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState({});
  const limit = 30;
  const isPageBottom = usePageBottom();

  let url = `https://banks.data.fdic.gov/api/institutions?limit=${limit}&search=name:${searchKeyword}&offset=${offset}&filters=!UNINUM:(${Object.keys(
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
