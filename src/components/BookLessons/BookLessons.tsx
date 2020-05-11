import * as React from 'react';
import { connect } from 'react-redux';
import {
  Action,
  Dispatch
} from 'redux';
import { useRouter } from 'next/router';
import Router from "next/router";
import Head from 'next/head';

import 'react-datepicker/dist/react-datepicker.css';

import {
  Button,
  Card,
  CircularProgress,
  Divider,
  FormControlLabel,
  Grid,
  Icon,
  Radio,
  RadioGroup,
  TextField,
  Typography,
  Tooltip
} from '@material-ui/core';

import { StoreState } from '../../redux/reducers/store';
import {
  bookLessons,
  fetchBookLessonsData,
  chooseLessonPackage,
  scheduleLessons
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
  BookLessonsPayload,
  BookLessonsData,
  LessonType
} from './model';
import StripeElementsWrapper from "../PaymentForm/StripeElementsWrapper";
import StripePaymentForm from "../PaymentForm/StripePaymentForm";
import ScheduleLessons from './ScheduleLessons';

interface StateProps extends BookLessonsData {
  bookLessonsRequesting: boolean;
  bookLessonsError: string;
  bookLessonsMessage: string;
  bookLessonsDataRequesting: boolean;
  bookLessonsDataError: string;
  chooseLessonPackageRequesting: boolean;
  chooseLessonPackageError: string;
  scheduleLessonsRequesting: boolean;
  scheduleLessonsError: string;
  scheduleLessonsMessage: string;
  bookingId: number;
}

interface DispatchProps {
  bookLessons: (data: BookLessonsPayload) => void;
  fetchBookLessonsData: (id: number) => void;
  chooseLessonPackage: (packageName: string, applicationId: number) => void;
  scheduleLessons: (data: Partial<LessonType>) => void;
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
    lessonNumber: BookLessonsComponent.bookLessonPackages[0].lessonNumber,
    value: BookLessonsComponent.bookLessonPackages[0].value
  });

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
      setSnackbarMessage(props.bookLessonsMessage)
    }
    if (props.bookLessonsError) {
      setShowSnackbar(true);
      setSnackbarMessage(props.bookLessonsError)
    }
    /* tslint:disable */
  },[
    props.bookLessonsMessage,
    props.bookLessonsError,
    props.chooseLessonPackageError,
  ]);

  const selectLessonPackage = async (bookLessonPackages: BookLessonPackages) => {
    await props.chooseLessonPackage(bookLessonPackages.value, applicationId);
    setLessonPckage(bookLessonPackages)
  }

  const submitPayment = async (stripeToken: string) => {
    const params: BookLessonsPayload = {
      package: lessonPackage.value,
      applicationId,
      paymentMethodCode: stripeToken
    }

    if (props.freeTrial) {
      params.package = 'trial';
    }

    await props.bookLessons(params);
  }

  const scheduleLessons = async (data: Partial<LessonType>) => {
    const params: Partial<LessonType> = {
      bookingId: applicationId,
      date: data.date,
      time: data.time,
      timezone: data.timezone
    }

    await props.scheduleLessons(params);
  }

  return (
    <div className="nabi-container nabi-margin-bottom-medium">
      <Head>
        <title>{pageTitlesAndDescriptions.bookLessons.title}</title>
        <meta name="description" content={pageTitlesAndDescriptions.bookLessons.description}></meta>
        <script src="https://js.stripe.com/v3/"></script>
      </Head>
      <PageTitle pageTitle={props.freeTrial ? BookLessonsComponent.pageTitleTrial : BookLessonsComponent.pageTitle} />
      {props.bookLessonsDataRequesting || props.chooseLessonPackageRequesting ? <div className="nabi-text-center"><CircularProgress /></div> :
        <div className="nabi-section nabi-background-white">
          {props.bookLessonsMessage ?
           <ScheduleLessons scheduleLessons={scheduleLessons} bookingId={props.bookingId} />
            :
            <React.Fragment>
              {props.freeTrial ?
              <React.Fragment>
                <h1 className="nabi-jennasue-title nabi-color-nabi nabi-text-normalbold">{BookLessonsComponent.trialHeading}</h1>
                <Typography className="nabi-margin-bottom-small">{BookLessonsComponent.trialDescription}</Typography>
              </React.Fragment>
              :
              <React.Fragment>
                <Typography color="primary" className="nabi-text-center nabi-margin-bottom-medium nabi-text-uppercase">
                  {BookLessonsComponent.buyLessons}
                </Typography>
              <div>
              <Grid container={true} direction="row" alignItems="center" spacing={1}>
                {BookLessonsComponent.bookLessonPackages.map((lessonPackageItem, i) => {
                  return (
                    <Grid item={true} xs={12} md={4} key={lessonPackageItem.name}>
                      <RadioGroup
                        name={lessonPackageItem.value}
                        value={lessonPackage.value}
                        onChange={() => selectLessonPackage(lessonPackageItem)}
                      >
                        <FormControlLabel
                          className="nabi-margin-right-zero nabi-margin-left-zero"
                          value={lessonPackageItem.value}
                          control={<Radio />}
                          labelPlacement="top"
                          label={
                            <div>
                              <Typography
                                color={lessonPackage.value === lessonPackageItem.value && BookLessonsComponent.cardTextColors[i] === 'nabi-color-nabi' ? 'primary' : undefined}
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
                                    String(props.lessonRate)
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
                                    String(lessonPackageItem.lessonNumber * props.lessonRate)
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
                    <Typography>
                      <span className="nabi-text-mediumbold nabi-margin-right-xsmall">{BookLessonsComponent.lessons}</span>
                      {BookLessonsComponent.BookingSummary.LessonCalculation.replace(
                        BookLessonsComponent.BookingSummary.NumberOfLessonsPlaceholder,
                        String(lessonPackage.lessonNumber)
                      ).replace(
                        BookLessonsComponent.BookingSummary.LessonPricePlaceholder,
                        String(props.lessonRate)
                      )}
                    </Typography>
                  </Grid>
                  <Grid item={true} xs={5} md={7}>
                    <Typography>{CommonConstants.dollarSing}{String(props.lessonsPrice)}</Typography>
                  </Grid>
                  {props.placementFee &&
                    <React.Fragment>
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
                          {CommonConstants.dollarSing}{String(props.placementFee)}
                        </Typography>
                      </Grid>
                    </React.Fragment>
                  }
                  <Grid item={true} xs={7} md={3}>
                    <Typography className="nabi-text-mediumbold">
                      {BookLessonsComponent.BookingSummary.ProcessingFee}
                    </Typography>
                  </Grid>
                  <Grid item={true} xs={5} md={7}>
                    <Typography>
                      {CommonConstants.dollarSing}{String(props.processingFee)}
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
                      {CommonConstants.dollarSing}{String(props.subTotal)}
                    </Typography>
                  </Grid>
                  {props.virtuosoDiscount &&
                    <React.Fragment>
                      <Grid item={true} xs={7} md={3}>
                      <Typography className="nabi-text-mediumbold">
                          {BookLessonsComponent.BookingSummary.VirtuosoDiscount}
                        </Typography>
                      </Grid>
                      <Grid item={true} xs={5} md={7}>
                        <Typography className="nabi-text-mediumbold">
                          {String(props.virtuosoDiscount)}{CommonConstants.percentage}
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
                      {CommonConstants.dollarSing}{String(props.total)}
                    </Typography>
                  </Grid>
                </Grid>
              </div>
            </React.Fragment>}
            <Grid item={true} xs={12} md={6}>
              <StripeElementsWrapper>
                <StripePaymentForm
                  submitPayment={submitPayment}
                  clientSecret={props.clientSecret}
                  buttonText={props.freeTrial ? BookLessonsComponent.pageTitleTrial : BookLessonsComponent.pageTitle}
                />
              </StripeElementsWrapper>
            </Grid>
          </React.Fragment>
          }
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
      chooseLessonsPackage: {
        isRequesting: chooseLessonPackageRequesting,
        error: chooseLessonPackageError,
      },
      scheduleLessons: {
        isRequesting: scheduleLessonsRequesting,
        error: scheduleLessonsError,
        message: scheduleLessonsMessage
      }
    }
  } = state.requests;

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
    chooseLessonPackageRequesting,
    chooseLessonPackageError,
    virtuosoDiscount,
    scheduleLessonsRequesting,
    scheduleLessonsError,
    scheduleLessonsMessage,
    bookingId
  }
};

const mapDispatchToProps = (
  dispatch: Dispatch<Action>
): DispatchProps => ({
  bookLessons: (data: BookLessonsPayload) => dispatch(bookLessons(data)),
  fetchBookLessonsData: (id: number) => dispatch(fetchBookLessonsData(id)),
  chooseLessonPackage: (packageName: string, applicationId: number) => dispatch(chooseLessonPackage(packageName, applicationId)),
  scheduleLessons: (data: Partial<LessonType>) => dispatch(scheduleLessons(data))
});

export default connect(mapStateToProps, mapDispatchToProps)(BookLessons);
