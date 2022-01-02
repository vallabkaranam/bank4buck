import { useEffect, useState, Fragment } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Favorite from "../Favorite";
import {
  addObj,
  bankUrl,
  locationsUrl,
  removeObj,
  toDollars,
} from "../../utils";
import { Bank, bankObject } from "../../Bank.definitions";

interface Props {
  favorites: { [x: string]: boolean };
  setFavorites: (obj: object) => void;
  notes: { [x: string]: string };
  setNotes: (obj: object) => void;
}

const BankDetails = ({ favorites, setFavorites, notes, setNotes }: Props) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [bankDetail, setBankDetail] = useState({} as bankObject);
  const [totalLocations, setTotalLocations] = useState(0);
  const [locationDetail, setLocationDetail] = useState<Bank[]>([]);
  const [text, setText] = useState(id && notes[id] ? notes[id] : "");

  useEffect(() => {
    async function getBankData() {
      const res = await axios.get(
        `${bankUrl}?limit=1&filters=UNINUM:${id}&fields=NAME,ADDRESS,ASSET,ACTIVE,ESTYMD,NETINC,STNAME,WEBADDR,ZIP,UNINUM,CHARTER,FLDOFF`
      );
      const locationRes = await axios.get(
        `${locationsUrl}?limit=5&filters=FI_UNINUM:${id}&fields=NAME,ADDRESS,CITY,STNAME,UNINUM)`
      );
      setBankDetail(res.data.data[0].data);
      setTotalLocations(locationRes.data.totals.count);
      setLocationDetail(locationRes.data.data);
    }
    getBankData();
  }, [id]);

  const {
    ACTIVE,
    NAME,
    UNINUM,
    ADDRESS,
    FLDOFF,
    STNAME,
    ZIP,
    CHARTER,
    ESTYMD,
    ASSET,
    NETINC,
    WEBADDR,
  } = bankDetail;

  return JSON.stringify(bankDetail) === "{}" ? (
    <div></div>
  ) : (
    <Fragment>
      <div className="card bg-light details_container">
        <div className="details_column">
          <span
            className={`badge ${ACTIVE ? "badge-success" : "badge-danger"}`}
          >
            {ACTIVE ? "Active" : "Inactive"}
          </span>
          <h3 className="text-primary text-left detail_title">{NAME}</h3>
          <ul>
            {UNINUM && (
              <li>
                <i
                  className="fas fa-id-card-alt"
                  style={{ height: 16, width: 23 }}
                />
                <b>ID Number: </b> {UNINUM}
              </li>
            )}
            {ADDRESS && (
              <li>
                <i className="fas fa-home" /> <b>Address:</b> {ADDRESS}
              </li>
            )}
            {FLDOFF && (
              <li>
                <i className="fas fa-warehouse" /> <b>Office: </b>
                {FLDOFF}
              </li>
            )}
            {STNAME && (
              <li>
                <i className="fas fa-city" /> <b>Location:</b> {STNAME}{" "}
                {ZIP && `(Zip: ${ZIP})`}
              </li>
            )}
            {CHARTER && (
              <li>
                <i
                  className="fas fa-chart-line"
                  style={{ height: 16, width: 21 }}
                />
                <b>Charter Number:</b> {CHARTER}
              </li>
            )}
            {ESTYMD && (
              <li>
                <i
                  className="fas fa-calendar-week"
                  style={{ height: 16, width: 21 }}
                />
                <b>Established:</b> {ESTYMD}
              </li>
            )}
            {ASSET && (
              <li>
                <i
                  className="fas fa-dollar-sign"
                  style={{ marginLeft: 5, height: 16, width: 15 }}
                />
                <b>Asset Amount:</b> {toDollars(ASSET)}
              </li>
            )}
            {NETINC && (
              <li>
                <i
                  className="far fa-plus-square"
                  style={{ height: 16, width: 20 }}
                />
                <b>Net Income:</b> {toDollars(NETINC)}
              </li>
            )}
            {!!totalLocations && (
              <li>
                <i className="fas fa-map" style={{ width: 20 }} />
                <b>Total Locations:</b> {totalLocations}
              </li>
            )}
          </ul>
          {!!totalLocations && (
            <div style={{ marginTop: 20 }}>
              <u>
                <b>Check out these other locations near you: </b>
              </u>
            </div>
          )}
          <ul>
            {locationDetail.map((location) => {
              const {
                ADDRESS: locationAddress,
                CITY: locationCity,
                STNAME: locationState,
                ID: locationId,
              } = location.data;
              return (
                <li key={locationId}>
                  {locationAddress}, {locationCity}, {locationState}
                </li>
              );
            })}

            {WEBADDR && (
              <li style={{ marginTop: "0.5rem" }}>
                <i className="fas fa-link" style={{ height: 16, width: 20 }} />
                <a
                  href={
                    WEBADDR.startsWith("http") ? WEBADDR : `https://${WEBADDR}`
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <b>Visit the website</b>
                </a>
              </li>
            )}
          </ul>
        </div>
        <div>
          Notes:
          <textarea
            className="notes_textarea"
            value={text}
            onChange={(ev) => setText(ev.target.value)}
            placeholder={"Leave a note..."}
          />
          <div className="buttons_row">
            <button
              className="btn btn-success btn-sm"
              onClick={(ev) => {
                ev.preventDefault();
                if (
                  (notes[UNINUM] && text === "") ||
                  (text === "" && !(UNINUM in favorites))
                ) {
                  removeObj(notes, setNotes, UNINUM);
                } else if (text !== "") {
                  addObj(notes, setNotes, UNINUM, text);
                }
                navigate(-1);
              }}
            >
              Save and Exit
            </button>
            <button
              className="btn btn-dark btn-sm"
              onClick={(ev) => {
                ev.preventDefault();
                if (
                  (notes[UNINUM] && text !== notes[UNINUM]) ||
                  (!notes[UNINUM] && text !== "")
                ) {
                  if (
                    window.confirm(
                      "You have unsaved changes! Are you sure you want to go back without saving? Your changes will be lost."
                    )
                  ) {
                    navigate(-1);
                  }
                } else {
                  navigate(-1);
                }
              }}
            >
              Go back
            </button>
          </div>
        </div>
        <div className="text-primary favorites_column">
          <Favorite
            favorites={favorites}
            setFavorites={setFavorites}
            id={UNINUM}
          />
        </div>
      </div>
    </Fragment>
  );
};

export default BankDetails;
