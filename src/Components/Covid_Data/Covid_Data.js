import React from "react";
import { stateTable } from "../indexing";
import "./Covid_Data.css";
const CovidData = (data) => {
  return (
    data.data !== undefined && (
      <React.Fragment>
        <h2 id="map_title">State wise Cases in India</h2>
        <div className="home">
          <table id="simple-board">
            <tbody>{stateTable(data.data)}</tbody>
          </table>
        </div>
      </React.Fragment>
    )
  );
};

export default CovidData;
