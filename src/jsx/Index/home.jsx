import React from "react";
import "../../css/home.css";
import Button from "react-bootstrap/Button";
import Footer from "../Elements/Footer";
import Encabezado from "./encabezado";
import Cuerpo from "./cuerto";

function Home() {
  return (
  <div className="coli">
    <Encabezado/>
    <Cuerpo/>
    <Footer />
  </div>
  );
}

export default Home;