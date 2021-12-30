import React, { useState, useEffect, useRef, Fragment } from "react";
import axios from "axios";
import usePageBottom from "../../hooks/usePageBottom";
import Search from "../layout/Search";
import BankList from "../layout/BankList";
import Spinner from "../Spinner";
import money from "../../components/money.png";
import ScrollToTop from "../ScrollToTop";

interface Props {
  favorites: any;
  setFavorites: any;
  notes: any;
}

const MyHome = ({ favorites, setFavorites, notes }: Props) => {
  const [banksList, setBanksList] = useState<any[]>([]);
  const [totalBankCount, setTotalBankCount] = useState(0);
  const [offset, setOffset] = useState(0);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState({});
  const limit = 30;
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
          `https://banks.data.fdic.gov/api/institutions?limit=${limit}&search=name:${searchKeyword}&offset=${offset}&filters=UNINUM:(${Object.keys(
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
  }, [isLoading, offset, searchKeyword, favorites]);

  console.log(isPageBottom);

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
