import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AlarmIcon from '@material-ui/icons/Alarm';
import VerifiedUser from "@material-ui/icons/VerifiedUser";
import EmojiTransportationIcon from '@material-ui/icons/EmojiTransportation';
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import InfoArea from "components/InfoArea/InfoArea.js";
import styles from "assets/jss/material-kit-react/views/landingPageSections/productStyle.js";

const useStyles = makeStyles(styles);

export default function ProductSection() {
  const classes = useStyles();
  return (
    <div className={classes.section}>
      <GridContainer justify="center">
        <GridItem xs={12} sm={12} md={8}>
          <h2 className={classes.title}>Información del servicio.</h2>
          <h5 className={classes.description}>
          Creemos que para hacer frente al desafío de la movilidad en Morelos, es necesario ofrecer una gama cada vez más 
          amplia de opciones de transporte para las personas. 2Taxi es una manera más de desplazarse en Morelos. Acepta 
          Pago en efectivo o Tarjetas de débito o crédito, así como nuestro propio Wallet de prepago, por medio del cual, 
          podrá agregar crédito a sus seres queridos, empleados, etc. Controlando los límites de uso Morelos, MEX.
          </h5>
        </GridItem>
      </GridContainer>
      <div>
        <GridContainer>
        <GridItem xs={12} sm={12} md={4}>
            <InfoArea
              title="Llegue a su destino a tiempo."
              description='Con el sistema de "reservar después" y el seguimiento en línea de 2taxi, usted nunca volverá a llegar tarde.'
              icon={EmojiTransportationIcon}
              iconColor="danger"
              vertical
            />
          </GridItem>
          <GridItem xs={12} sm={12} md={4}>
            <InfoArea
              title="Servicio las 24 Hrs."
              description="Consiga 2Taxi fácilmente y en la hora y lugar que usted necesite. "
              icon={AlarmIcon}
              iconColor="info"
              vertical
            />
          </GridItem>
          <GridItem xs={12} sm={12} md={4}>
            <InfoArea
              title="Confianza y seguridad."
              description="Con el seguimiento en línea, la foto de las licencias de los 2Taxi, la Ruta por la que 2Taxi debe recorrer el viaje en tiempo real, aviso de llegada, esperamos se sienta seguro."
              icon={VerifiedUser}
              iconColor="success"
              vertical
            />
          </GridItem>
        </GridContainer>
      </div>
    </div>
  );
}
