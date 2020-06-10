import * as React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import {
  Action,
  Dispatch
} from 'redux';
import { useRouter } from 'next/router';
import Link from 'next/link';

import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Check from '@material-ui/icons/Check';
import {
  Avatar,
  CircularProgress,
  Grid,
  Typography,
} from '@material-ui/core';

import PrivateRoute from '../Auth/PrivateRoutes';
import { fetchRequest } from '../../redux/actions/RequestActions';
import { fetchUser } from '../../redux/actions/UserActions';
import { StoreState } from '../../redux/reducers/store';
import { submitApplication } from '../../redux/actions/InstructorActions';
import PageTitle from '../common/PageTitle';
import SnackBar from '../common/SnackBar';
import { Routes } from '../common/constants/Routes';
import { RequestViewComponent } from './constants';
import { PlaceForLessons } from '../PlaceForLessons/constants';
import { instruments } from '../../../assets/data/instruments';
import ApplicationForm from './ApplicationForm';
import RequestApplied from './RequestApplied';
import { ApplicationPayload } from './models';

interface OwnProps {
}

interface DispatchProps {
  fetchRequest: (id: number) => void;
  submitApplication: (payload: ApplicationPayload) => void;
  fetchUser: () => void;
}

interface StateProps {
  // TODO: set to RequestType on api integration
  request: any;
  isFetchingRequest: boolean;
  isSubmittingApplication: boolean;
  submitApplicationMessage: string
  submitApplicationError: string;
  token: string;
}

interface Props extends
  DispatchProps,
  StateProps {}

export const RequestView = (props: Props) => {
  const [rate, setRate] = React.useState('');
  const [message, setMessage] = React.useState('');
  const [showSnackbar, setShowSnackbar] = React.useState(false);
  const [snackbarMessage, setSnackbarMessage] = React.useState('');
  const [allFieldsFilled, setAllFieldsFilled] = React.useState(false);

  const router = useRouter();
  const id = Number(router.query.id);

  React.useEffect(() => {
    const fetchData = async () => {
      if (id) {
        await props.fetchRequest(id);
      }
    };
    fetchData();
    if (props.submitApplicationMessage) {
      setShowSnackbar(true);
      setSnackbarMessage('Application sent successfully.')
    }
    if (props.submitApplicationError) {
      setShowSnackbar(true);
      setSnackbarMessage(props.submitApplicationError)
    }
    /* tslint:disable */
  },[props.submitApplicationMessage, props.submitApplicationError]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const target = event.currentTarget;
    const value = target.value;
    const name = target.name;

    if (name === RequestViewComponent.FieldNames.LessonRate) {
      setRate(value)
    } else if (name === RequestViewComponent.FieldNames.Message) {
      setMessage(value)
    }
  }

  React.useEffect(() => {
    const confirmAllFieldsFilled = [
      rate,
      message
    ].every(value => value.length > 0);

    setAllFieldsFilled(confirmAllFieldsFilled);
  }, [
    rate,
    message
  ])

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
    if (event) {
      event.preventDefault();
    }

    const payload: ApplicationPayload = {
      requestId: props.request.id,
      rate,
      message
    }
    await props.submitApplication(payload);
  }

  const AvatarStyles = { width: '140px', height: '140px'};

  const state = {
    lessonRate: '',
    message: ''
  };

  const instrument = instruments.find(t => t.value === props.request.instrument);
  const pageTitle = props.request.applied ? RequestViewComponent.Labels.Request : RequestViewComponent.sendApplication;

  const isRequesting = props.isFetchingRequest || props.isSubmittingApplication;

  return (
    <div className="nabi-container">
      {props.request.applied && !isRequesting ?
        /* tslint:disable-next-line:max-line-length */
        <div className="nabi-background-nabi nabi-padding-small nabi-border-radius nabi-margin-top-small nabi-margin-top-zero-md">
          <Typography>
            <span className="nabi-color-white">
            <Check className="nabi-vertical-bottom nabi-margin-right-xsmall" />
            {`You applied for this job on  ${moment(props.request.application.dateApplied).format("MMM Do YYYY")}`}
            </span>
          </Typography>
        </div> :
      ''}

      <PageTitle pageTitle={pageTitle} />
      <div className="nabi-margin-bottom-xsmall">
        <Breadcrumbs aria-label="breadcrumb">
          <Link href={Routes.Dashboard}>
            <a>{RequestViewComponent.breadcrumbLabels.home}</a>
          </Link>
          <Link href={Routes.Requests}>
            <a>{RequestViewComponent.breadcrumbLabels.requests}</a>
          </Link>
          <Typography>{RequestViewComponent.breadcrumbLabels.sendApplication}</Typography>
        </Breadcrumbs>
      </div>
      {isRequesting ? <div className="nabi-text-center"><CircularProgress /></div> :
        <Grid container={true} spacing={1} >
          <Grid xs={12} item={true} md={6} className="nabi-margin-bottom-medium">
            <div className="nabi-background-white nabi-section-widest">
              {/* <div className="nabi-float-right">
                <IconButton color="primary">
                  <Icon>favorite</Icon>
                </IconButton>
              </div> */}

              <Grid container={true} className="nabi-margin-center">
                <Grid item={true} xs={12}>
                  <Avatar
                    src={props.request.avatar}
                    style={AvatarStyles}
                    className="nabi-margin-center"
                  />
                  <Typography className="nabi-text-mediumbold nabi-margin-top-xsmall nabi-text-center">
                    {props.request.displayName}
                  </Typography>
                  <Typography className="nabi-text-center">
                    {props.request.location}
                  </Typography>
                </Grid>
                <Grid item={true} xs={12} className="nabi-margin-center">
                  <h1
                    /* tslint:disable-next-line:max-line-length */
                    className="nabi-text-mediumbold nabi-text-center nabi-jennasue-title nabi-color-nabi nabi-margin-top-small nabi-margin-bottom-small"
                  >
                    {props.request.requestTitle}
                  </h1>
                </Grid>
                <Grid item={true} xs={12} md={7} className="nabi-margin-center">
                  <Typography color="primary" className="nabi-display-inline-block nabi-margin-right-xsmall">
                    {RequestViewComponent.Labels.Instrument}
                  </Typography>
                  <Typography className="nabi-display-inline-block">

                    {instrument && instrument.name}
                  </Typography>
                  <br />
                  <Typography color="primary" className="nabi-display-inline-block nabi-margin-right-xsmall">
                    {RequestViewComponent.Labels.PlaceForLesson}
                  </Typography>
                  <Typography className="nabi-display-inline-block">
                    {PlaceForLessons[props.request.placeForLessons]}
                  </Typography>
                  <br />
                  <Typography color="primary" className="nabi-display-inline-block nabi-margin-right-xsmall">
                    {RequestViewComponent.Labels.LessonDuration}
                  </Typography>
                  <Typography className="nabi-display-inline-block">
                    {props.request.lessonDuration} mins
                  </Typography>
                  <Typography color="primary" className="nabi-display-inline-block nabi-margin-right-xsmall">
                    {RequestViewComponent.Labels.SkillLevel}
                  </Typography>
                  <Typography className="nabi-display-inline-block">
                    {props.request.skillLevel}
                  </Typography>
                  {props.request.studentDetails.length > 0 &&
                    <>
                      <Typography color="primary">
                        {RequestViewComponent.Labels.StudentDetais}
                      </Typography>
                        {props.request.studentDetails && props.request.studentDetails.map((student: any, i: number) => (
                          <Typography key={i}>
                            - {student.name}, {" "} {student.age} {" "} yrs old
                          </Typography>
                        ))
                      }
                    </>
                  }
                  {props.request.date &&
                    <>
                     <br />
                      <Typography color="primary" className="nabi-display-inline-block nabi-margin-right-xsmall">
                        {RequestViewComponent.Labels.Date}
                      </Typography>
                      <Typography className="nabi-display-inline-block">
                        {props.request.date}
                      </Typography>
                   </>
                  }
                  {props.request.time &&
                    <>
                      <br />
                      <Typography color="primary" className="nabi-display-inline-block nabi-margin-right-xsmall">
                        {RequestViewComponent.Labels.Time}
                      </Typography>
                      <Typography className="nabi-display-inline-block">
                        {props.request.time}
                      </Typography>
                   </>
                  }
                  {props.request.timezone &&
                    <>
                      <br />
                      <Typography color="primary" className="nabi-display-inline-block nabi-margin-right-xsmall">
                        {RequestViewComponent.Labels.Timezone}
                      </Typography>
                      <Typography className="nabi-display-inline-block">
                        {props.request.timezone}
                      </Typography>
                   </>
                  }
                </Grid>
                <Grid item={true} xs={12} md={7} className="nabi-margin-center">
                  <Typography color="primary" className="nabi-margin-top-xsmall">
                    {RequestViewComponent.Labels.Message}
                  </Typography>
                  <Typography>
                    {props.request.requestMessage}
                  </Typography>
                </Grid>
              </Grid>
            </div>
          </Grid>
          <Grid item={true} xs={12} md={6} className="nabi-margin-bottom-medium nabi-margin-bottom-medium">
            <div className="nabi-background-white nabi-section-widest">
              {props.request.applied ?
                <RequestApplied application={props.request.application} /> :
                <ApplicationForm
                  request={props.request}
                  handleChange={handleChange}
                  message={message}
                  rate={rate}
                  handleSubmit={handleSubmit}
                  allFieldsFilled={allFieldsFilled}
                />
              }
            </div>
          </Grid>
        </Grid>
      }
      <SnackBar
        isOpen={showSnackbar}
        message={snackbarMessage}
        handleClose={() => setShowSnackbar(false)}
        variant={props.submitApplicationMessage ? "success" : "error"}
      />
    </div>
  );
};

const mapStateToProps = (state: StoreState, _ownProps: OwnProps): StateProps => {
  const {
    isRequesting: isSubmittingApplication,
    message: submitApplicationMessage,
    error: submitApplicationError,
  } = state.instructor.actions.submitApplication

  return {
    request: state.requests.request,
    isFetchingRequest: state.requests.actions.fetchRequest.isRequesting,
    isSubmittingApplication,
    submitApplicationMessage,
    submitApplicationError,
    token: state.user.token,
  };
};

const mapDispatchToProps = (
  dispatch: Dispatch<Action>
): DispatchProps => ({
  fetchUser: () => dispatch(fetchUser()),
  fetchRequest: (id: number) => dispatch(fetchRequest(id)),
  submitApplication: (payload: any) => dispatch(submitApplication(payload))
});

export default connect(mapStateToProps, mapDispatchToProps)(PrivateRoute(RequestView, 'Private', ['Instructor'], 'Request View'));
