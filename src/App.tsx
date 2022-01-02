import { Fragment } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Navbar from "./components/items/Navbar";
import MyHome from "./components/pages/MyHome";
import BankDetails from "./components/pages/BankDetails";
import About from "./components/pages/About";
import Explore from "./components/pages/Explore";
import useStickyState from "./hooks/useStickyState";

import "./App.css";

const App = () => {
  const [notes, setNotes] = useStickyState({}, "notes");
  const [favorites, setFavorites] = useStickyState({}, "favorites");

  return (
    <Router>
      <Fragment>
        <Navbar />
        <div className="container">
          <Routes>
            <Route
              path="/banks/explore"
              element={
                <Explore
                  favorites={favorites}
                  setFavorites={setFavorites}
                  notes={notes}
                />
              }
            />
            <Route
              path="/banks/:id"
              element={
                <BankDetails
                  favorites={favorites}
                  setFavorites={setFavorites}
                  notes={notes}
                  setNotes={setNotes}
                />
              }
            />
            <Route path="/about" element={<About />} />
            <Route
              path="/"
              element={
                <MyHome
                  favorites={favorites}
                  setFavorites={setFavorites}
                  notes={notes}
                />
              }
            />
          </Routes>
        </div>
      </Fragment>
    </Router>
  );
};

export default App;
