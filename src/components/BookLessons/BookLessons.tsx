import * as React from 'react';
import { connect } from 'react-redux';
import Router from "next/router";
import {
  Action,
  Dispatch
} from 'redux';
import { useRouter } from 'next/router';
import Head from 'next/head';

import 'react-datepicker/dist/react-datepicker.css';
const reactStringReplace = require('react-string-replace');

import {
  Avatar,
  CircularProgress,
  Divider,
  Grid,
  IconButton,
  Typography,
} from '@material-ui/core';

import { StoreState } from '../../redux/reducers/store';
import {
  bookLessons,
  fetchBookLessonsData,
} from "../../redux/actions/RequestActions";
import { CommonConstants } from '../common/constants/common';
import { pageTitlesAndDescriptions } from '../common/constants/TitlesAndDescriptions';
import SnackBar from '../common/SnackBar';
import PageTitle from '../common/PageTitle';
import SectionTitle from '../common/SectionTitle';
import { Routes } from '../common/constants/Routes';
import { BookLessonsComponent } from './constants';
import {
  BookLessonsPayload,
  BookLessonsData,
} from './model';
import StripeElementsWrapper from "../PaymentForm/StripeElementsWrapper";
import StripePaymentForm from "../PaymentForm/StripePaymentForm";
import { BackgroundCheckStatus } from "../ProfileBuilder/constants";
import { displayRatings } from '../../utils/displayRatings';
import { ProfileHeaderComponent } from "../Profile/constants";

interface StateProps extends BookLessonsData {
  bookLessonsRequesting: boolean;
  bookLessonsError: string;
  bookLessonsMessage: string;
  bookLessonsDataRequesting: boolean;
  bookLessonsDataError: string;
  bookingId: number;
}

interface DispatchProps {
  bookLessons: (data: BookLessonsPayload) => void;
  fetchBookLessonsData: (id: number) => void;
}

interface OwnProps { }

interface Props extends
  OwnProps,
  StateProps,
  DispatchProps { }

export const BookLessons = (props: Props) => {
  const AvatarStyles = { width: "120px", height: "120px" };

  const [showSnackbar, setShowSnackbar] = React.useState(false);
  const [snackbarMessage, setSnackbarMessage] = React.useState('');

  const router = useRouter();
  const studentId = Number(router.query.id);

  React.useEffect(() => {
    const fetchData = async () => {
      if (studentId) {
        await props.fetchBookLessonsData(studentId);
      }
    };
    fetchData();
    if (props.bookLessonsMessage) {
      setShowSnackbar(true);
      setSnackbarMessage(props.bookLessonsMessage)
      Router.push(Routes.ParentStudio)
    }
    if (props.bookLessonsError) {
      setShowSnackbar(true);
      setSnackbarMessage(props.bookLessonsError)
    }
    /* tslint:disable */
  }, [
    props.bookLessonsMessage,
    props.bookLessonsError,
  ]);

  const submitPayment = async (stripeToken: string) => {
    const params: BookLessonsPayload = {
      package: BookLessonsComponent.bookLessonPackages[0].value,
      studentId,
      paymentMethodCode: stripeToken
    }

    if (props.freeTrial) {
      params.package = 'trial';
    }

    await props.bookLessons(params);
  }

  const renderNumberOfLessonsText = () => {
    let numberOfLessonsText = BookLessonsComponent.BookingSummary.LessonCalculation.replace(
      BookLessonsComponent.BookingSummary.NumberOfLessonsPlaceholder,
      String(BookLessonsComponent.lessonNumber.artist)
    );

    numberOfLessonsText = reactStringReplace(
      numberOfLessonsText,
      BookLessonsComponent.BookingSummary.LessonsPlaceholder,
      (i: number) => {
        return <span className="nabi-text-mediumbold nabi-margin-right-xsmall">{BookLessonsComponent.lessons}</span>
      }
    );

    return reactStringReplace(
      numberOfLessonsText,
      BookLessonsComponent.BookingSummary.LessonPricePlaceholder,
      (i: number) => {
        return String(props.lessonRate)
      }
    )
  }

  const BackgroundCheckIcon =
    "https://nabimusic.s3.us-east-2.amazonaws.com/assets/images/nabi-background-check.svg";
  return (
    <div className="nabi-container nabi-margin-bottom-medium">
      <Head>
        <title>{pageTitlesAndDescriptions.bookLessons.title}</title>
        <meta name="description" content={pageTitlesAndDescriptions.bookLessons.description}></meta>
        <script src="https://js.stripe.com/v3/"></script>
      </Head>
      <PageTitle pageTitle={props.freeTrial ? BookLessonsComponent.pageTitleTrial : BookLessonsComponent.pageTitle} />

      <Grid
        item={true}
        xs={12}
        md={8} className="nabi-section nabi-background-white nabi-margin-center"
      >

        <       Grid item={true} xs={12} className="nabi-text-center nabi-margin-bottom-small">
          <Avatar
            src={props.instructor && props.instructor.avatar}
            style={AvatarStyles}
            className="nabi-margin-center nabi-margin-bottom-small"
          />
          <Typography className="nabi-margin-top-xsmall nabi-text-semibold">
            {props.instructor && props.instructor.display_name}
          </Typography>
          <div>
            {displayRatings(Number(props.instructor && props.instructor.reviews && props.instructor.reviews.rating))}
          </div>
          <Typography className="nabi-text-uppercase">
            {props.instructor && props.instructor.yearsOfExperience} {ProfileHeaderComponent.Text.YearExperiece} | {props.instructor && props.instructor.age}{" "}
            {ProfileHeaderComponent.Text.YearOld}
          </Typography>
          {props.instructor && props.instructor.backgroundCheckStatus === BackgroundCheckStatus.verified && (
            <Grid item={true} xs={12} className="nabi-margin-top-xsmall">
              <IconButton
                color="secondary"
                className="nabi-display-inline-block"
              >
                <img
                  src={BackgroundCheckIcon}
                  className="nabi-custom-button-icon"
                  alt="background-check"
                />
              </IconButton>
              <Typography className="nabi-margin-left-xsmall nabi-display-inline-block">
                Background Check
              </Typography>
            </Grid>
          )}
          <Typography className="nabi-text-semibold nabi-font-large">
            <span className="nabi-font-large">
              {BookLessonsComponent.lessonCost.replace(
                BookLessonsComponent.lessonCostPlaceholer,
                String(props.instructor && props.instructor.rate)
              )}
            </span>
          </Typography>
        </Grid>

        {props.bookLessonsDataRequesting ? <div className="nabi-text-center"><CircularProgress /></div> :
          <div className="nabi-margin-top-medium nabi-margin-bottom-small">
            <SectionTitle text={String(BookLessonsComponent.BookingSummary.SectionTitle)} />
            <Grid container={true} className="nabi-margin-top-xsmall">
              <Grid item={true} xs={7} md={3}>
                <Typography>
                  {renderNumberOfLessonsText()}
                </Typography>
              </Grid>
              <Grid item={true} xs={5} md={7}>
                <Typography>{CommonConstants.dollarSing}{String(props.lessonsPrice ? props.lessonsPrice.toFixed(2) : null)}</Typography>
              </Grid>
              <Grid item={true} xs={7} md={3}>
                <Typography className="nabi-text-mediumbold">
                  {BookLessonsComponent.BookingSummary.ProcessingFee}
                </Typography>
              </Grid>
              <Grid item={true} xs={5} md={7}>
                <Typography>
                  {CommonConstants.dollarSing}{String(props.processingFee ? props.processingFee.toFixed(2) : null)}
                </Typography>
              </Grid>
              <Grid item={true} xs={12} md={12}>
                <Grid item={true} xs={12} md={5}>
                  <Divider className="nabi-margin-top-xsmall" />
                </Grid>
              </Grid>
              <Grid item={true} xs={7} md={3}>
                <Typography className="nabi-text-mediumbold">
                  {BookLessonsComponent.BookingSummary.SubTotal}
                </Typography>
              </Grid>
              <Grid item={true} xs={5} md={7}>
                <Typography className="nabi-text-mediumbold">
                  {CommonConstants.dollarSing}{String(props.subTotal ? props.subTotal.toFixed(2) : null)}
                </Typography>
              </Grid>
              {props.discounts &&
                <React.Fragment>
                  <Grid item={true} xs={7} md={3}>
                    <Typography className="nabi-text-mediumbold">
                      {BookLessonsComponent.BookingSummary.Discounts}
                    </Typography>
                  </Grid>
                  <Grid item={true} xs={5} md={7}>
                    <Typography className="nabi-text-mediumbold">
                      {String(props.discounts.toFixed(0))}{CommonConstants.percentage}
                    </Typography>
                  </Grid>
                </React.Fragment>
              }
              <Grid item={true} xs={7} md={3}>
                <Typography color="primary" className="nabi-text-mediumbold nabi-text-uppercase">
                  {BookLessonsComponent.BookingSummary.Total}
                </Typography>
              </Grid>
              <Grid item={true} xs={5} md={7}>
                <Typography color="primary">
                  {CommonConstants.dollarSing}{String(props.total ? props.total.toFixed(2) : null)}
                </Typography>
              </Grid>
            </Grid>
          </div>
        }

        <Grid item={true} xs={12}>
          <StripeElementsWrapper>
            <StripePaymentForm
              submitPayment={submitPayment}
              clientSecret={props.clientSecret}
              buttonText={props.freeTrial ? BookLessonsComponent.pageTitleTrial : BookLessonsComponent.pageTitle}
            />
          </StripeElementsWrapper>
        </Grid>
      </Grid>
      <SnackBar
        isOpen={showSnackbar}
        message={snackbarMessage}
        handleClose={() => setShowSnackbar(false)}
        variant={props.bookLessonsMessage ? "success" : "error"}
      />
    </div>
  );
}

const mapStateToProps = (state: StoreState, _ownProps: OwnProps): StateProps => {
  const {
    clientSecret,
    lessonRate,
    lessonsPrice,
    paymentMethods,
    placementFee,
    processingFee,
    subTotal,
    total,
    freeTrial,
    virtuosoDiscount,
    discounts,
    bookingId,
    instructor,
    actions: {
      bookLessons: {
        isRequesting: bookLessonsRequesting,
        error: bookLessonsError,
        message: bookLessonsMessage
      },
      fetchBookLessonsData: {
        isRequesting: bookLessonsDataRequesting,
        error: bookLessonsDataError,
      },
    }
  } = state.requests;

  const {
    timezones
  } = state.timezones;

  return {
    bookLessonsRequesting,
    bookLessonsError,
    bookLessonsMessage,
    bookLessonsDataRequesting,
    bookLessonsDataError,
    clientSecret,
    lessonRate,
    lessonsPrice,
    paymentMethods,
    placementFee,
    processingFee,
    subTotal,
    total,
    freeTrial,
    virtuosoDiscount,
    bookingId,
    discounts,
    instructor
  }
};

const mapDispatchToProps = (
  dispatch: Dispatch<Action>
): DispatchProps => ({
  bookLessons: (data: BookLessonsPayload) => dispatch(bookLessons(data)),
  fetchBookLessonsData: (id: number) => dispatch(fetchBookLessonsData(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(BookLessons);
