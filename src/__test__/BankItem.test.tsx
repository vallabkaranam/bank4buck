import { render, screen } from "@testing-library/react";
import BankItem from "../components/items/BankItem";
import { BrowserRouter as Router } from "react-router-dom";
import Favorite from "../components/Favorite";

describe("BankItem", () => {
  const fakeBankData = {
    data: {
      ACTIVE: 1,
      ASSET: 3290398000,
      CITY: "Columbus",
      ID: "628",
      NAME: "JPMorgan Chase Bank, National Association",
      NETINC: 29832000,
      STNAME: "Ohio",
      UNINUM: "417",
      CHARTER: "8",
      ESTYMD: "01/01/1824",
      FLDOFF: "Columbus",
      WEBADDR: "www.jpmorganchase.com",
      ZIP: "43240",
      ADDRESS: "1111 Polaris Parkway",
    },
  };

  const favorites = {};
  const notes = { "417": "test" };
  const setFavorites = jest.fn();

  test("renders bankItem component", () => {
    render(
      <Router>
        <BankItem
          bank={fakeBankData}
          notes={notes}
          favorites={favorites}
          setFavorites={setFavorites}
        />
      </Router>
    );
  });

  test("renders a bankItem component with necessary bank data, fav icon, and notes icon", () => {
    const { UNINUM } = fakeBankData.data;
    render(
      <Router>
        <BankItem
          bank={fakeBankData}
          notes={notes}
          favorites={favorites}
          setFavorites={setFavorites}
        />
      </Router>
    );

    expect(screen.getByText("Active")).not.toBeNull();
    expect(
      screen.getByText("JPMorgan Chase Bank, National Association")
    ).not.toBeNull();
    expect(screen.getByText("Columbus, Ohio")).not.toBeNull();
    expect(screen.getByText("$3,290,398,000.00")).not.toBeNull();
    expect(screen.getByText("$29,832,000.00")).not.toBeNull();
    expect(
      <Favorite favorites={favorites} setFavorites={setFavorites} id={UNINUM} />
    ).not.toBeNull();
    expect(document.querySelector(".fa-sticky-note")).not.toBeNull();
  });

  test("UNINUM not in notes state does not render notes icon", () => {
    const notes = {};
    render(
      <Router>
        <BankItem
          bank={fakeBankData}
          notes={notes}
          favorites={favorites}
          setFavorites={setFavorites}
        />
      </Router>
    );

    expect(document.querySelector(".fa-sticky-note")).toBeNull();
  });
});
