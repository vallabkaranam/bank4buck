import { fireEvent, render } from "@testing-library/react";
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

  const favorites = { "417": true };
  const setFavorites = jest.fn();

  test("renders Favorite component", () => {
    const { UNINUM } = fakeBankData.data;
    render(
      <Favorite favorites={favorites} setFavorites={setFavorites} id={UNINUM} />
    );
  });

  test("UNINUM in favorites state renders filled favorite icon and does not render empty icon", () => {
    const { UNINUM } = fakeBankData.data;
    render(
      <Favorite favorites={favorites} setFavorites={setFavorites} id={UNINUM} />
    );
    expect(document.querySelector(".fas")).not.toBeNull();
    expect(document.querySelector(".far")).toBeNull();
  });

  test("UNINUM not in favorites state renders empty favorite icon and does not render filled icon", () => {
    const { UNINUM } = fakeBankData.data;
    const favorites = {};
    render(
      <Favorite favorites={favorites} setFavorites={setFavorites} id={UNINUM} />
    );
    expect(document.querySelector(".fas")).toBeNull();
    expect(document.querySelector(".far")).not.toBeNull();
  });

  test("calls setFavorites (through addObj) when favorite icon is clicked", () => {
    const { UNINUM } = fakeBankData.data;
    const favorites = {};
    render(
      <Favorite favorites={favorites} setFavorites={setFavorites} id={UNINUM} />
    );
    const empty_heart = document.querySelector(".far")!;
    fireEvent.click(empty_heart);
    expect(setFavorites).toHaveBeenCalled();
  });

  test("calls setFavorites (through removeObj) when favorite icon is clicked", () => {
    const { UNINUM } = fakeBankData.data;
    render(
      <Favorite favorites={favorites} setFavorites={setFavorites} id={UNINUM} />
    );
    const filled_heart = document.querySelector(".fas")!;
    fireEvent.click(filled_heart);
    expect(setFavorites).toHaveBeenCalled();
  });
});
