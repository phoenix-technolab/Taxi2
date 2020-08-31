import React, { useState, useEffect } from 'react';
import {
  Select,
  MenuItem,
  Grid,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Typography,
  TextField
} from '@material-ui/core';
import GoogleMapsAutoComplete from '../components/GoogleMapsAutoComplete';
import { getEstimate, clearEstimate } from '../actions/estimateactions';
import { addBooking, clearBooking } from '../actions/bookingactions';
import { useSelector, useDispatch } from "react-redux";
import AlertDialog from '../components/AlertDialog';
import languageJson from '../config/language';
import { makeStyles } from '@material-ui/core/styles';
import UsersCombo from '../components/UsersCombo';

const useStyles = makeStyles(theme => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  '@global': {
    body: {
      backgroundColor: theme.palette.common.white,
    },
  },
  container: {
    zIndex: "12",
    color: "#FFFFFF",
    alignContent: 'center'
  },
  title: {
    color: "#000",
  },
  gridcontainer: {
    alignContent: 'center'
  },
  items: {
    margin: 0,
    width: '100%'
  },
  input: {
    fontSize: 18,
    color: "#000"
  },
  inputdimmed: {
    fontSize: 18,
    color: "#737373"
  },
  carphoto: {
    height: '18px',
    marginRight: '10px'
  },
  buttonStyle: {
    margin: 0,
    width: '100%',
    height: '100%'
  }
}));

export default function AddBookings(props) {
  const dispatch = useDispatch();
  const classes = useStyles();
  const cartypes = useSelector(state => state.cartypes.cars);
  const estimatedata = useSelector(state => state.estimatedata);
  const bookingdata = useSelector(state => state.bookingdata);
  const userdata = useSelector(state => state.usersdata);
  const settings = useSelector(state => state.settingsdata.settings);
  const [carType, setCarType] = useState(languageJson.select_car);
  const [pickupAddress, setPickupAddress] = useState(null);
  const [dropAddress, setDropAddress] = useState(null);
  const [estimateModalStatus, setEstimateModalStatus] = React.useState(false);
  const [selectedCarDetails, setSelectedCarDetails] = useState(null);
  const [users, setUsers] = useState(null);
  const [commonAlert, setCommonAlert] = useState({ open: false, msg: '' });
  const [userCombo, setUserCombo] = useState(null);
  const [estimateRequested, setEstimateRequested] = useState(false);
  const [bookingType, setBookingType] = useState('Book Now');

  const getDateString = (date) => {
    let d = null;
    d = date ? new Date(date) : new Date();

    let month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear(),
      hours = d.getHours(),
      mins = d.getMinutes();
    if (month >= 1 & month <= 9)
      month = '0' + month.toString();
    if (day >= 0 & day <= 9)
      day = '0' + day.toString();
    if (hours >= 0 & hours <= 9)
      hours = '0' + hours.toString();
    if (mins >= 0 & mins <= 9)
      mins = '0' + mins.toString();

    return [year, month, day].join('-') + 'T' + [hours, mins].join(':');
  }

  const dateDiff = (date) => {
    const date1 = new Date();
    const date2 = new Date(date);
    const diffTime = date2 - date1;
    return diffTime / (1000 * 60);
  }

  const [selectedDate, setSelectedDate] = React.useState(getDateString());

  const handleCarSelect = (event) => {
    setCarType(event.target.value);
    let carDetails = null;
    for (let i = 0; i < cartypes.length; i++) {
      if (cartypes[i].name === event.target.value) {
        carDetails = cartypes[i];
      }
    }
    setSelectedCarDetails(carDetails);
  };

  const handleBookTypeSelect = (event) => {
    setBookingType(event.target.value);
    if (bookingType === 'Book Later') {
      setSelectedDate(getDateString());
    }
  };

  const onDateChange = (event) => {
    setSelectedDate(event.target.value);
  };

  useEffect(() => {
    if (estimatedata.estimate && estimateRequested) {
      setEstimateRequested(false);
      setEstimateModalStatus(true);
    }
    if (userdata.users) {
      let arr = [];
      for (let i = 0; i < userdata.users.length; i++) {
        let user = userdata.users[i];
        if (user.usertype === 'rider') {
          arr.push({
            'firstName': user.firstName,
            'lastName': user.lastName,
            'mobile': user.mobile,
            'email': user.email,
            'uid': user.id,
            'desc': user.firstName + ' ' + user.lastName + ' (' + user.mobile + ') ' + user.email
          });
        }
      }
      setUsers(arr);
    }
  }, [estimatedata.estimate, userdata.users, estimateRequested]);


  const handleGetEstimate = (e) => {
    e.preventDefault();
    setEstimateRequested(true);
    if (userCombo && pickupAddress && dropAddress && selectedCarDetails) {
      if (bookingType === 'Book Now') {
        dispatch(getEstimate({
          pickup: pickupAddress,
          drop: dropAddress,
          carDetails: selectedCarDetails,
        }));
      } else {
        if (bookingType === 'Book Later' && selectedDate) {
          if (dateDiff(selectedDate) >= 15) {
            dispatch(getEstimate({
              pickup: pickupAddress,
              drop: dropAddress,
              carDetails: selectedCarDetails,
            }));
          } else {
            setCommonAlert({ open: true, msg: languageJson.past_booking_error });
          }
        } else {
          setCommonAlert({ open: true, msg: languageJson.select_proper });
        }
      }
    } else {
      setCommonAlert({ open: true, msg: languageJson.select_proper })
    }
  };

  const confirmBooking = (e) => {
    e.preventDefault();
    setEstimateModalStatus(false);
    dispatch(addBooking({
      pickup: pickupAddress,
      drop: dropAddress,
      carDetails: selectedCarDetails,
      userDetails: userCombo,
      estimate: estimatedata.estimate,
      tripdate: new Date(selectedDate).toString(),
      bookLater: bookingType === 'Book Later' ? true : false,
      settings: settings
    }));

  };

  const handleEstimateModalClose = (e) => {
    e.preventDefault();
    setEstimateModalStatus(false);
    dispatch(clearEstimate());
    setEstimateRequested(false);
  };

  const handleEstimateErrorClose = (e) => {
    e.preventDefault();
    dispatch(clearEstimate());
    setEstimateRequested(false);
  };

  const handleBookingAlertClose = (e) => {
    e.preventDefault();
    dispatch(clearBooking());
    dispatch(clearEstimate());
    clearForm();
  };

  const clearForm = () => {
    setUserCombo(null);
    setPickupAddress(null);
    setDropAddress(null);
    setSelectedCarDetails(null);
    setCarType(languageJson.select_car);
    setBookingType(languageJson.book_now);
    setEstimateRequested(false);
  }

  const handleBookingErrorClose = (e) => {
    e.preventDefault();
    dispatch(clearBooking());
    setEstimateRequested(false);
  };

  const handleCommonAlertClose = (e) => {
    e.preventDefault();
    setCommonAlert({ open: false, msg: '' })
  };

  return (
    <div className={classes.container}>
      <Grid item xs={12} sm={12} md={8} lg={8}>
        <Grid container spacing={2} >
          <Grid item xs={12}>
            <Typography component="h1" variant="h5" className={classes.title}>
              {languageJson.addbookinglable}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            {users ?
              <UsersCombo
                className={classes.items}
                placeholder={languageJson.select_user}
                users={users}
                value={userCombo}
                onChange={(event, newValue) => {
                  setUserCombo(newValue);
                }}
              />
              : null}
          </Grid>
          <Grid item xs={12}>
            <GoogleMapsAutoComplete
              placeholder={languageJson.pickup_location}
              value={pickupAddress}
              className={classes.items}
              onChange={
                (value) => {
                  setPickupAddress(value);
                }
              }
            />
          </Grid>
          <Grid item xs={12}>
            <GoogleMapsAutoComplete placeholder={languageJson.drop_location}
              value={dropAddress}
              className={classes.items}
              onChange={
                (value) => {
                  setDropAddress(value);
                }
              }
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            {cartypes ?
              <Select
                id="car-type-native"
                value={carType}
                onChange={handleCarSelect}
                variant="outlined"
                fullWidth
                className={carType === languageJson.select_car ? classes.inputdimmed : classes.input}
              >
                <MenuItem value={languageJson.select_car} key={languageJson.select_car}>
                  {languageJson.select_car}
                </MenuItem>
                {
                  cartypes.map((car) =>
                    <MenuItem key={car.name} value={car.name}>
                      <img src={car.image} className={classes.carphoto} alt="car types" />{car.name}
                    </MenuItem>
                  )
                }
              </Select>
              : null}
          </Grid>
          <Grid item xs={12} sm={6}>
            <Select
              id="booking-type-native"
              value={bookingType}
              onChange={handleBookTypeSelect}
              className={classes.input}
              variant="outlined"
              fullWidth
              inputProps={{ 'aria-label': 'Without label' }}
            >
              <MenuItem key={"Book Now"} value={"Book Now"}>
                {languageJson.book_now}
              </MenuItem>
              <MenuItem key={"Book Later"} value={"Book Later"}>
                {languageJson.book_later}
              </MenuItem>
            </Select>
          </Grid>
          {bookingType === 'Book Later' ?
            <Grid item xs={12} sm={6} >
              <TextField
                id="datetime-local"
                label={languageJson.booking_date_time}
                type="datetime-local"
                variant="outlined"
                fullWidth
                className={classes.commonInputStyle}
                InputProps={{
                  className: classes.input
                }}
                value={selectedDate}
                onChange={onDateChange}
              />
            </Grid>
            : null}
          <Grid item xs={12} sm={6} >
            <Button
              size="large"
              onClick={handleGetEstimate}
              variant="contained" 
              color="primary"
              className={classes.buttonStyle}
            >
              <i className="fas fa-car" />
              {languageJson.book}
            </Button>
          </Grid>
        </Grid>
      </Grid>
      <Dialog
        open={estimateModalStatus}
        onClose={handleEstimateModalClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{languageJson.estimate}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            ${estimatedata.estimate ? estimatedata.estimate.estimateFare : null}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleEstimateModalClose} color="primary">
            {languageJson.cancel}
          </Button>
          <Button onClick={confirmBooking} color="primary" autoFocus>
            {languageJson.book_now}
          </Button>
        </DialogActions>
      </Dialog>
      <AlertDialog open={bookingdata.booking ? true : false} onClose={handleBookingAlertClose}>{bookingdata.booking ? languageJson.booking_success + bookingdata.booking.booking_id : null}</AlertDialog>
      <AlertDialog open={bookingdata.error.flag} onClose={handleBookingErrorClose}>{bookingdata.error.msg}</AlertDialog>
      <AlertDialog open={estimatedata.error.flag} onClose={handleEstimateErrorClose}>{estimatedata.error.msg}</AlertDialog>
      <AlertDialog open={commonAlert.open} onClose={handleCommonAlertClose}>{commonAlert.msg}</AlertDialog>
    </div>
  );
}