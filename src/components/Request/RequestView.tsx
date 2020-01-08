import * as React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import {
  Action,
  Dispatch
} from 'redux';
import { useRouter } from 'next/router';
import Check from '@material-ui/icons/Check';
import {
  Avatar,
  CircularProgress,
  Grid,
  Typography,
} from '@material-ui/core';

import { fetchRequest } from '../../redux/actions/RequestActions';
import { StoreState } from '../../redux/reducers/store';
import PageTitle from '../common/PageTitle';
import { RequestViewComponent } from './constants';
import { useForm } from '../../hooks/useForm';
import { Role } from '../../constants/Roles';
import { PlaceForLessons } from '../PlaceForLessons/constants';
import { instruments } from '../../../assets/data/instruments';
import ApplicationForm from './ApplicationForm';
import RequestApplied from './RequestApplied';

interface OwnProps {
}

interface DispatchProps {
  fetchRequest: (id: number) => void;
}

interface StateProps {
  // TODO: set to RequestType on api integration
  request: any;
  isFetchingRequest: boolean;
}

interface Props extends
  DispatchProps,
  StateProps {}

export const RequestView = (props: Props) => {
  const router = useRouter();
  const id = Number(router.query.id);

  React.useEffect(() => {
    const fetchData = async () => {
      if (id) {
        await props.fetchRequest(id);
      }
    };
    fetchData();
    /* tslint:disable */
  }, []);

  const AvatarStyles = { width: '140px', height: '140px'};

  const state = {
    lessonRate: '',
    message: ''
  };

  const { values, handleChange, handleSubmit } = useForm(sendAplication, state);

  function sendAplication() {
    console.log(values);
  }

  const instrument = instruments.find(t => t.value === props.request.instrument);
  const pageTitle = props.request.applied ? RequestViewComponent.Labels.Request : RequestViewComponent.sendApplication;

  const isRequesting = props.isFetchingRequest;

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
                <Grid item={true} className="nabi-margin-center">
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
                  <Typography color="primary">
                    {RequestViewComponent.Labels.StudentDetais}
                  </Typography>
                    {props.request.studentDetails && props.request.studentDetails.map((student: any, i: number) => (
                      <Typography key={i}>
                        - {student.name}, {" "} {student.age} {" "} yrs old
                      </Typography>
                    ))
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
                  handleChange={handleChange}
                  handleSubmit={handleSubmit}
                  values={values}
                  request={props.request}
                />
              }
            </div>
          </Grid>
        </Grid>
      }
    </div>
  );
};

const mapStateToProps = (state: StoreState, _ownProps: OwnProps): StateProps => {
  return {
    request: state.requests.request,
    isFetchingRequest: state.requests.actions.fetchRequest.isRequesting,
  };
};

const mapDispatchToProps = (
  dispatch: Dispatch<Action>
): DispatchProps => ({
  fetchRequest: (id: number) => dispatch(fetchRequest(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(RequestView);
