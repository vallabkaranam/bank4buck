import { fireEvent, render, waitFor } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import Favorite from "../components/Favorite";
import BankDetails from "../components/pages/BankDetails";
import axios from "axios";
jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

const mockHistory = jest.fn().mockImplementation();
jest.mock("react-router-dom", () => ({
  // @ts-ignore
  ...jest.requireActual("react-router-dom"),
  useHistory: () => ({
    push: mockHistory,
  }),
}));

test("renders bankDetails component with necessary bank data, location data, fav icon, and notes textarea", async () => {
  mockedAxios.get.mockResolvedValueOnce({
    data: {
      data: [
        {
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
        },
      ],
    },
  });

  mockedAxios.get.mockResolvedValueOnce({
    data: {
      totals: {
        count: 5124,
      },
      data: [
        {
          data: {
            ADDRESS: "118 East Grand River",
            CITY: "Fowlerville",
            ID: "10132",
            NAME: "JPMorgan Chase Bank, National Association",
            STNAME: "Michigan",
          },
        },
      ],
    },
  });

  const favorites = {};
  const notes = { "417": "test" };
  const setFavorites = jest.fn();
  const setNotes = jest.fn();

  const { getByText } = render(
    <Router>
      <BankDetails
        favorites={favorites}
        setFavorites={setFavorites}
        notes={notes}
        setNotes={setNotes}
      />
    </Router>
  );
  expect(await waitFor(() => getByText("Active"))).not.toBeNull();
  expect(
    await waitFor(() => getByText("JPMorgan Chase Bank, National Association"))
  ).not.toBeNull();
  expect(await waitFor(() => getByText("417"))).not.toBeNull();
  expect(await waitFor(() => getByText("1111 Polaris Parkway"))).not.toBeNull();
  expect(await waitFor(() => getByText("Columbus"))).not.toBeNull();
  expect(await waitFor(() => getByText("Ohio (Zip: 43240)"))).not.toBeNull();
  expect(await waitFor(() => getByText("8"))).not.toBeNull();
  expect(await waitFor(() => getByText("01/01/1824"))).not.toBeNull();
  expect(await waitFor(() => getByText("$3,290,398,000.00"))).not.toBeNull();
  expect(await waitFor(() => getByText("$29,832,000.00"))).not.toBeNull();
  expect(await waitFor(() => getByText(5124))).not.toBeNull();
  expect(
    await waitFor(() =>
      getByText("118 East Grand River, Fowlerville, Michigan")
    )
  ).not.toBeNull();
  expect(await waitFor(() => getByText("Visit the website"))).not.toBeNull();
  expect(getByText("Save and Exit")).not.toBeNull();
  expect(getByText("Go back")).not.toBeNull();
  expect(
    <Favorite favorites={favorites} setFavorites={setFavorites} id={"417"} />
  ).not.toBeNull();
});

// Testing is a never ending process, can also add tests to see if the button click behavior is as expected to increase coverage.
