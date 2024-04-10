import React from "react";
import "../../css/home.css";
import Button from "react-bootstrap/Button";
import Footer from "../Elements/Footer";
import Encabezado from "./encabezado";
import Cuerpo from "./cuerto";
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import NavigationIcon from '@mui/icons-material/Navigation';
import { FormattedMessage } from "react-intl";
import { Link } from 'react-scroll';

function Home() {
  return (
  <div className="coli">
    <Encabezado/>
    <Cuerpo/>
    <Footer />
    <Box sx={{ position: 'fixed', bottom: 20, right: 20, '& > :not(style)': { m: 1 } }}>
      <Link to="header" style={{ textDecoration: 'none' }} smooth={true} duration={500}> {/* Utiliza un enlace directo aquí */}
        <Fab variant="extended">
          <NavigationIcon sx={{ mr: 1 }} />
          <FormattedMessage id="index.start" defaultMessage="start" />
        </Fab>
      </Link>
    </Box>
  </div>
  );
}

export default Home;