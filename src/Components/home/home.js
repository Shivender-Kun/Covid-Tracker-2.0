import React from "react";
import loadable from "@loadable/component";
import {
  CovidData,
  MapData,
  TotalDataCards,
  fetchData,
  CovidCities,
} from "../indexing";
import "./home.css";

// const MapData = loadable(() => import("../Map_data/Map_data"));
const ChartData = loadable(() => import("../Chart_data/Chart_data"));

const Home = () => {
  const [data, setData] = React.useState({});

  React.useEffect(() => {
    const fetch = async () => {
      const apidata = await fetchData();

      setData(apidata);
    };
    fetch();
  }, []);

  return (
    <div className="homes">
      {data ? <TotalDataCards data={data["total_values"]} /> : null}
      <div id="homeFlex">
        <div id="covid_data">
          <CovidCities />
          {data ? <CovidData data={data["state_wise"]} /> : null}
        </div>
        <div id="map_data">
          <MapData />
        </div>
        <div id="chart_data">
          <ChartData />
        </div>
      </div>
    </div>
  );
};

export default Home;
