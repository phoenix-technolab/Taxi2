/*eslint-disable*/
import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// @material-ui/icons
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
// core components
import styles from "assets/jss/material-kit-react/views/componentsSections/downloadStyle.js";

const useStyles = makeStyles(styles);

export default function SectionDownload() {
  const classes = useStyles();
  return (
    <div className={classes.section}>
      <div className={classes.container}>
        <GridContainer className={classes.textCenter} justify="center">
          <GridItem xs={12} sm={12} md={8}>
            <h2 className={classes.title}>Aplicaciones móviles disponibles en las App stores</h2>
            <img className={classes.triobanner} src={"https://dev.exicube.com/images/triobanner.png"} alt="2Taxi App Banner" />
            <h4 className={classes.description}>2Taxi le agradece su preferencia prometiéndole disponibilidad, seguridad y confianza.</h4>
          </GridItem>
          <GridItem xs={12} sm={8} md={6}>
            <a href="https://apps.apple.com/app/id1501332146"><img src="https://dev.exicube.com/images/appstore.png" alt="2Taxi Apple Store Link"/></a>
            <span style={{marginRight: '5px'}}></span>
            <a href="https://play.google.com/store/apps/details?id=com.exicube.grabcab"><img src="https://dev.exicube.com/images/playstore.png" alt="2Taxi Playstore Link"/></a>
          </GridItem>
        </GridContainer>

      </div>
    </div>
  );
}
