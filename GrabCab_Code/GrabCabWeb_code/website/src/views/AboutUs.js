import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

// @material-ui/icons

// core components
import Header from "components/Header/Header.js";
import Footer from "components/Footer/Footer.js";
import HeaderLinks from "components/Header/HeaderLinks.js";

import styles from "assets/jss/material-kit-react/views/staticPages.js";
import Parallax from "components/Parallax/Parallax";

const dashboardRoutes = [];

const useStyles = makeStyles(styles);

export default function AboutUs(props) {
  const classes = useStyles();
  const { ...rest } = props;
  return (
    <div>
      <Header
        color="transparent"
        routes={dashboardRoutes}
        rightLinks={<HeaderLinks />}
        fixed
        changeColorOnScroll={{
          height: 400,
          color: "white"
        }}
        {...rest}
      />
      <Parallax small filter image={require("assets/img/header-back.jpg")} />
      <div className={classNames(classes.main, classes.mainRaised)}>

        <div className={classes.container}>
          <br />
          <h2 className={classes.title}>Quienes somos</h2>
          <p className={classes.description}>Creamos oportunidades al poner a Morelos en marcha. Cuando cuentas con movilidad en tu ciudad, todo es posible. 
          Las oportunidades que se te presentan, de pronto, están más a tu alcance. 
          Con la ayuda de nuestra tecnología, algo tan sencillo como tocar un botón para pedir un viaje se ha transformado 
          en miles de millones de interacciones entre personas de Morelos para llegar a donde quieren.
          </p>
          <br />
          <p>
          Pago en efectivo o Tarjetas de débito o crédito, así como nuestro propio Wallet de prepago,
          por medio del cual, podrá agregar crédito a sus seres queridos, empleados, etc. Controlando
          los límites de uso
          Morelos, MEX.</p>
          <br />
        </div>
      </div>

      <Footer />
    </div>
  );
}
