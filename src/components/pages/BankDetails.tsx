import React, { useEffect, useState, Fragment } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Favorite from "../Favorite";
import { removeObj, toDollars } from "../../utils";

interface Props {
  favorites: Object;
  setFavorites: any;
  notes: any;
  setNotes: any;
}

const BankDetails = ({ favorites, setFavorites, notes, setNotes }: Props) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [bankDetail, setBankDetail] = useState({} as any);
  const [text, setText] = useState(id && notes[id] ? notes[id] : "");

  useEffect(() => {
    async function getBankData() {
      const res = await axios.get(
        `https://banks.data.fdic.gov/api/institutions?limit=1&filters=UNINUM:${id}&fields=NAME,ADDRESS,ASSET,ACTIVE,ESTYMD,NETINC,STNAME,WEBADDR,ZIP,UNINUM,CHARTER,FLDOFF`
      );
      setBankDetail(res.data.data[0].data);
    }
    getBankData();
  }, []);

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
        {console.log(bankDetail)}
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
            {WEBADDR && (
              <li style={{ marginTop: "0.5rem" }}>
                <i className="fas fa-link" style={{ height: 16, width: 20 }} />
                <a href={`http://${WEBADDR}`} target="_blank">
                  <b>Visit the website</b>
                </a>
              </li>
            )}
          </ul>
        </div>
        <div>
          Notes:
          <textarea
            value={text}
            onChange={(ev) => setText(ev.target.value)}
            placeholder={"Leave a note..."}
            style={{
              resize: "vertical",
              height: "20rem",
              borderRadius: 5,
              marginTop: 10,
            }}
          />
          <div
            style={{
              marginTop: 10,
              display: "flex",
              justifyContent: "flex-end",
            }}
          >
            <button
              className="btn btn-success btn-sm"
              onClick={(ev) => {
                ev.preventDefault();
                if (
                  (id && notes[id] && text === "") ||
                  (text === "" && id && !(id in favorites))
                ) {
                  removeObj(notes, setNotes, id);
                } else if (text !== "") {
                  setNotes({ ...notes, [bankDetail.UNINUM]: text });
                }
                navigate(-1);
              }}
            >
              Save and Exit
            </button>
            <button
              className={"btn btn-dark btn-sm"}
              onClick={(ev) => {
                ev.preventDefault();
                if (id && notes[id] && text !== notes[id]) {
                  if (
                    window.confirm(
                      "You have unsaved changes! Are you sure you want to go back without saving?"
                    )
                  ) {
                    navigate(-1);
                  } else {
                    console.log("hi");
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
            id={bankDetail.UNINUM?.toString()}
          />
        </div>
      </div>
      <h1></h1>
    </Fragment>
  );
};

export default BankDetails;
