import * as React from 'react';
import { connect } from 'react-redux';
import {
  Action,
  Dispatch
} from 'redux';
import { useRouter } from 'next/router';
import Router from "next/router";
import Head from 'next/head';

import {
  Card,
  Divider,
  FormControlLabel,
  Grid,
  Icon,
  Radio,
  RadioGroup,
  Typography,
  Tooltip,
  CircularProgress
} from '@material-ui/core';

import { StoreState } from '../../redux/reducers/store';
import {
  bookLessons,
  fetchBookLessonsData
} from "../../redux/actions/RequestActions";
import { Routes } from '../common/constants/Routes';
import { CommonConstants } from '../common/constants/common';
import { pageTitlesAndDescriptions } from '../common/constants/TitlesAndDescriptions';
import SnackBar from '../common/SnackBar';
import PageTitle from '../common/PageTitle';
import SectionTitle from '../common/SectionTitle';
import { BookLessonsComponent } from './constants';
import {
  BookLessonPackages,
  BookLessonsPayload
} from './model';
import StripePaymentForm from "../PaymentForm/StripePaymentForm";

interface StateProps {
  bookLessonsRequesting: boolean;
  bookLessonsError: string;
  bookLessonsMessage: string;
  bookLessonsDataRequesting: boolean;
  bookLessonsDataError: string;
  lessonPrice: number;
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
  const [showSnackbar, setShowSnackbar] = React.useState(false);
  const [snackbarMessage, setSnackbarMessage] = React.useState('');
  const [lessonPackage, setLessonPckage] =
  React.useState({
    name: BookLessonsComponent.bookLessonPackages[0].name,
    lessonNumber: BookLessonsComponent.bookLessonPackages[0].lessonNumber
  })

  const router = useRouter();
  const applicationId = Number(router.query.id);

  React.useEffect(() => {
    const fetchData = async () => {
      if (applicationId) {
        await props.fetchBookLessonsData(applicationId);
      }
    };
    fetchData();
    if (props.bookLessonsMessage) {
      setShowSnackbar(true);
      setSnackbarMessage('Lessons booked successfully.')
      setInterval(() => Router.push(Routes.Dashboard), 3000);
    }
    if (props.bookLessonsError) {
      setShowSnackbar(true);
      setSnackbarMessage(props.bookLessonsError)
    }
    /* tslint:disable */
  },[props.bookLessonsMessage, props.bookLessonsError]);

  const selectLessonPackage = (bookLessonPackages: BookLessonPackages) => {
    setLessonPckage(bookLessonPackages)
  }

  const subTotal: number = lessonPackage.name === BookLessonsComponent.bookLessonPackages[2].name ?
    (lessonPackage.lessonNumber * props.lessonPrice) - ((lessonPackage.lessonNumber * props.lessonPrice) * .05) :
    lessonPackage.lessonNumber * props.lessonPrice;
  const processingFeeTotal: number = Number(((subTotal * BookLessonsComponent.processingFee) + .30).toFixed(2));
  const total = Number((subTotal +  processingFeeTotal + BookLessonsComponent.placementFee)).toFixed(2);

  const submitPayment = async (stripeToken: string) => {
    const params: BookLessonsPayload = {
      lessonQty: lessonPackage.lessonNumber,
      totalAmount: Number(total),
      chargeDescription: lessonPackage.name,
      applicationId,
      stripeToken
    }
    await props.bookLessons(params);
  }

  return (
    <div className="nabi-container">
      <Head>
        <title>{pageTitlesAndDescriptions.bookLessons.title}</title>
        <meta name="description" content={pageTitlesAndDescriptions.bookLessons.description}></meta>
      </Head>
      <PageTitle pageTitle={BookLessonsComponent.pageTitle} />
      {props.bookLessonsDataRequesting ? <div className="nabi-text-center"><CircularProgress /></div> :
        <div className="nabi-section nabi-background-white">
          <Typography className="nabi-text-center">
            {BookLessonsComponent.description}
          </Typography>
          <Typography className="nabi-text-center">
            {BookLessonsComponent.descriptionSecond}
          </Typography>
          <Typography color="primary" className="nabi-text-center nabi-margin-bottom-medium">
            {BookLessonsComponent.satisfactionGuaranteed}
          </Typography>
          <Typography color="primary" className="nabi-text-center nabi-margin-bottom-medium nabi-text-uppercase">
            {BookLessonsComponent.cta}
          </Typography>
          <div>
            <Grid container={true} direction="row" alignItems="center" spacing={1}>
              {BookLessonsComponent.bookLessonPackages.map((lessonPackageItem, i) => {
                return (
                  <Grid item={true} xs={12} md={4} key={lessonPackageItem.name}>
                    <RadioGroup
                      name={lessonPackageItem.name}
                      value={lessonPackage.name}
                      onChange={() => selectLessonPackage(lessonPackageItem)}
                    >
                      <FormControlLabel
                        className="nabi-margin-right-zero nabi-margin-left-zero"
                        value={lessonPackageItem.name}
                        control={<Radio />}
                        labelPlacement="top"
                        label={
                          <div>
                            <Typography
                              color={lessonPackage.name === lessonPackageItem.name && BookLessonsComponent.cardTextColors[i] === 'nabi-color-nabi' ? 'primary' : undefined}
                              // tslint:disable-next-line:max-line-length
                              className={`${lessonPackage.name === lessonPackageItem.name ? BookLessonsComponent.cardTextColors[i]: ''} nabi-text-center nabi-font-medium nabi-text-uppercase nabi-margin-bottom-small nabi-text-mediumbold`}
                            >
                              {lessonPackageItem.name}
                            </Typography>
                            <Grid
                              item={true}
                              xs={8}
                              md={12}
                              className="nabi-margin-center nabi-margin-bottom-xsmall"
                            >
                            {/* tslint:disable-next-line:max-line-length */}
                            <Card className={`${lessonPackage.name === lessonPackageItem.name ? BookLessonsComponent.cardBackgroundColors[i] : 'nabi-background-disabled'} nabi-text-center nabi-book-lessons-card`}>
                              <p className="nabi-font-medium nabi-text-uppercase nabi-color-white nabi-margin-top-zero nabi-margin-bottom-zero">
                                {lessonPackageItem.lessonNumber} {BookLessonsComponent.lessons}
                              </p>
                              <p className="nabi-font-medium nabi-text-uppercase nabi-color-white nabi-margin-top-xsmall nabi-margin-bottom-zero">
                                {BookLessonsComponent.lessonCost.replace(
                                  BookLessonsComponent.lessonCostPlaceholer,
                                  String(props.lessonPrice.toFixed(2))
                                )}
                              </p>
                              <Typography
                                className="nabi-color-white nabi-margin-top-xsmall"
                              >
                                {BookLessonsComponent.includes}
                              </Typography>
                              <Typography
                                className="nabi-color-white nabi-font-small nabi-margin-top-xsmall"
                              >
                                {lessonPackageItem.lessonNumber} {BookLessonsComponent.lessons}
                              </Typography>
                              <Typography
                                className="nabi-color-white nabi-font-small nabi-margin-top-xsmall"
                              >
                                {BookLessonsComponent.freeLesson}
                              </Typography>
                              {i === 2 &&
                                <Typography
                                  className="nabi-color-white nabi-font-small nabi-margin-top-xsmall"
                                >
                                  {BookLessonsComponent.fivePercentOff}
                                </Typography>
                              }
                              <Divider className="nabi-margin-top-xsmall" />
                              <p
                                className="nabi-color-white nabi-font-large nabi-margin-top-small nabi-next-mediumbold nabi-margin-bottom-small"
                              >
                                {BookLessonsComponent.packageCost.replace(
                                  BookLessonsComponent.packageCostPlaceholer,
                                  i === 2 ?
                                  String((lessonPackageItem.lessonNumber * props.lessonPrice) - ((lessonPackageItem.lessonNumber * props.lessonPrice) * .05))  :
                                  String(lessonPackageItem.lessonNumber * props.lessonPrice)
                                )}
                              </p>
                              </Card>
                            </Grid>
                          </div>
                        }
                      />
                    </RadioGroup>
                  </Grid>
                )})}
            </Grid>
          </div>
          <div className="nabi-margin-top-medium nabi-margin-bottom-small">
            <SectionTitle text={String(BookLessonsComponent.BookingSummary.SectionTitle)} />
            <Grid container={true} className="nabi-margin-top-xsmall">
              <Grid item={true} xs={7} md={3}>
                <Typography className="nabi-text-mediumbold">
                  {BookLessonsComponent.BookingSummary.FreeLesson}
                </Typography>
              </Grid>
              <Grid item={true} xs={5}md={7}>
                <Typography>
                  {CommonConstants.dollarSing}{BookLessonsComponent.BookingSummary.FreeLessonCost.toFixed(2)}
                </Typography>
              </Grid>
              <Grid item={true} xs={7} md={3}>
                <Typography>
                  <span className="nabi-text-mediumbold nabi-margin-right-xsmall">{BookLessonsComponent.lessons}</span>
                  {BookLessonsComponent.BookingSummary.LessonCalculation.replace(
                    BookLessonsComponent.BookingSummary.NumberOfLessonsPlaceholder,
                    String(lessonPackage.lessonNumber)
                  ).replace(
                    BookLessonsComponent.BookingSummary.LessonPricePlaceholder,
                    String(props.lessonPrice)
                  )}
                </Typography>
              </Grid>
              <Grid item={true} xs={5} md={7}>
                <Typography>{CommonConstants.dollarSing}{subTotal.toFixed(2)}</Typography>
              </Grid>
              <Grid item={true} xs={7} md={3}>
                <Typography className="nabi-text-mediumbold">
                  {BookLessonsComponent.BookingSummary.PlacementFee}
                  <Tooltip title={BookLessonsComponent.tooltipText} placement="top">
                    <Icon className="nabi-position-absolute nabi-margin-left-xsmall">
                      help
                    </Icon>
                  </Tooltip>
                </Typography>
              </Grid>
              <Grid item={true} xs={5} md={7}>
                <Typography>
                  {CommonConstants.dollarSing}{String(BookLessonsComponent.placementFee.toFixed(2))}
                </Typography>
              </Grid>
              <Grid item={true} xs={7} md={3}>
                <Typography className="nabi-text-mediumbold">
                  {BookLessonsComponent.BookingSummary.ProcessingFee}
                </Typography>
              </Grid>
              <Grid item={true} xs={5} md={7}>
                <Typography>
                  {CommonConstants.dollarSing}{String(processingFeeTotal)}
                </Typography>
              </Grid>
              <Grid item={true} xs={7} md={3}>
                <Typography color="primary" className="nabi-text-mediumbold nabi-text-uppercase">
                  {BookLessonsComponent.BookingSummary.Total}
                </Typography>
              </Grid>
              <Grid item={true} xs={5} md={7}>
                <Typography color="primary" className="nabi-text-mediumbold">
                  {CommonConstants.dollarSing}{String(total)}
                </Typography>
              </Grid>
            </Grid>
          </div>
          <Grid item={true} xs={12} md={6}>
            <StripePaymentForm submitPayment={submitPayment} isRequesting={props.bookLessonsRequesting} />
          </Grid>
        </div>
      }
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
    bookingRate,
    actions: {
      bookLessons: {
        isRequesting: bookLessonsRequesting,
        error: bookLessonsError,
        message: bookLessonsMessage
      },
      fetchBookLessonsData: {
        isRequesting: bookLessonsDataRequesting,
        error: bookLessonsDataError,
      }
    }
  } = state.requests;

  return {
    bookLessonsRequesting,
    bookLessonsError,
    bookLessonsMessage,
    bookLessonsDataRequesting,
    bookLessonsDataError,
    lessonPrice: Number(bookingRate)
  }
};

const mapDispatchToProps = (
  dispatch: Dispatch<Action>
): DispatchProps => ({
  bookLessons: (data: BookLessonsPayload) => dispatch(bookLessons(data)),
  fetchBookLessonsData: (id: number) => dispatch(fetchBookLessonsData(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(BookLessons);
