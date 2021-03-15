import React from "react";
import { Home, Footer, Header } from "./Components/indexing";
import "./App.css";

export default function App() {
  return (
    <React.Fragment>
      <Header />
      <Home />
      <Footer />
    </React.Fragment>
  );
}
