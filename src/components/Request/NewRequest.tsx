import * as React from 'react';
import Link from 'next/link';
import moment from 'moment';
import {
  Action,
  Dispatch
} from 'redux';
import { connect } from 'react-redux';
import { useRouter } from 'next/router';

import {
  Button,
  Grid,
  Typography,
  CircularProgress
} from '@material-ui/core';
import DateRangeIcon from '@material-ui/icons/DateRange';
import Schedule from '@material-ui/icons/Schedule';
import Face from '@material-ui/icons/Face';
import MusicNoteIcon from '@material-ui/icons/MusicNote';

import { StoreState } from '../../redux/reducers/store';
import { submitApplication } from '../../redux/actions/InstructorActions';
import { fetchRequest } from '../../redux/actions/RequestActions';
import { instrumentDisplay } from "../../utils/displayInstrument";
import PageTitle from '../common/PageTitle';
import { Routes } from '../common/constants/Routes';
import { ApplicationPayload } from "./models";
import { NewRequestComponent } from './constants'

interface OwnProps {
}

interface DispatchProps {
  fetchRequest: (id: number) => void;
  respond: (accept: ApplicationPayload) => void;
}

interface StateProps {
  request: any;
  isFetchingRequest: boolean;
  isResponding: boolean;
  respondMessage: string
  respondError: string;
}

interface Props extends
  DispatchProps,
  StateProps {}

const NewRequest = (props: Props) => {

  const router = useRouter();
  const id = Number(router.query.id);

  React.useEffect(() => {
    const fetchData = async () => {
      if (id) {
        await props.fetchRequest(id);
      }
    };
    fetchData();
    if (props.respondMessage) {
      // setShowSnackbar(true);
      // setSnackbarMessage('Application sent successfully.')
    }
    if (props.respondError) {
      // setShowSnackbar(true);
      // setSnackbarMessage(props.submitApplicationError)
    }
    /* tslint:disable */
  },[props.respondMessage, props.respondError]);

  const handleSubmit = async (accept: Boolean) => {
    const userId = String(router.query.userId);
    
    await props.respond({
      requestId: id,
      userId,
      accept
    })
  }

  return (
    <div className="nabi-container nabi-margin-bottom-medium">
      <PageTitle pageTitle={NewRequestComponent.pageTitle} />
      <Grid
        item={true}
        xs={12}
        md={8} className="nabi-section nabi-background-white nabi-margin-center"
      >
        {props.isResponding ?
        <div className="nabi-text-center"><CircularProgress /></div> :
        props.respondError ?
        <Typography>{NewRequestComponent.errorMessage}</Typography> :
        props.respondMessage ?
        <div className="nabi-text-center">
          <Typography>{NewRequestComponent.responseMessage}</Typography>
          <Link href={Routes.InstructorStudio}>
            <Button color="primary" variant="contained" className="nabi-margin-top-small">
              {NewRequestComponent.goToStudioButton}
            </Button>
          </Link>
        </div> :
        <>
        <p className="nabi-color-nabi nabi-text-center nabi-jennasue-title nabi-margin-bottom-small nabi-margin-top-xsmall">
          {NewRequestComponent.title.replace(
            NewRequestComponent.instrumentPlaceholder,
            instrumentDisplay(props.request.instrument)
          )}
        </p>
        <div>
          <DateRangeIcon className="text-aligned-icon" color="primary" />
          <Typography className="nabi-display-inline nabi-margin-left-xsmall">
          {NewRequestComponent.date.replace(
            NewRequestComponent.datePlaceholder,
            moment(props.request.date).format('MMM D')
          ).replace(
            NewRequestComponent.timePlaceholder,
            moment(props.request.time, "h:mm").format("h:mmA")
          )}
          </Typography>
        </div>
        <div>
          <Schedule className="text-aligned-icon" color="primary" />
          <Typography className="nabi-display-inline nabi-margin-left-xsmall">
            {NewRequestComponent.lessonDuration}
          </Typography>
        </div>
        <div>
          <MusicNoteIcon className="text-aligned-icon" color="primary" />
          <Typography className="nabi-display-inline nabi-margin-left-xsmall">
            {instrumentDisplay(props.request.instrument)}
          </Typography>
        </div>
        <div>
          <Face className="text-aligned-icon" color="primary" />
          {props.request.studentDetails &&
          <Typography className="nabi-display-inline nabi-margin-left-xsmall">
            {NewRequestComponent.studentDetails.replace(
              NewRequestComponent.studentNamePlaceholder,
              props.request.studentDetails[0].name
            ).replace(
              NewRequestComponent.agePlaceholder,
              props.request.studentDetails[0].age
            ).replace(
              NewRequestComponent.skillLevelPlaceholder,
              props.request.skillLevel
            )}
          </Typography>
        }
        </div>
        <div className="nabi-text-right nabi-margin-top-large">
          <Button
            color="default"
            className="nabi-margin-right-xsmall"
            onClick={() => handleSubmit(false)}
          >
            {NewRequestComponent.passButton}
            </Button>
          <Button
            color="primary"
            variant="contained"
            onClick={() => handleSubmit(true)}
          >
            {NewRequestComponent.acceptButton}
          </Button>
        </div>
        </>}
      </Grid>
    </div>
  )
}

const mapStateToProps = (state: StoreState, _ownProps: OwnProps): StateProps => {
  const {
    isRequesting: isResponding,
    message: respondMessage,
    error: respondError,
  } = state.instructor.actions.submitApplication
  

  return {
    request: state.requests.request,
    isFetchingRequest: state.requests.actions.fetchRequest.isRequesting,
    isResponding,
    respondMessage,
    respondError
  };
};

const mapDispatchToProps = (
  dispatch: Dispatch<Action>
): DispatchProps => ({
  fetchRequest: (id: number) => dispatch(fetchRequest(id)),
  respond: (applciation: ApplicationPayload) => dispatch(submitApplication(applciation))
});

export default connect(mapStateToProps, mapDispatchToProps)(NewRequest);
