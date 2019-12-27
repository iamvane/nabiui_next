import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { connect } from 'react-redux';
import {
  Action,
  Dispatch
} from 'redux';

import {
  Avatar,
  Grid,
  Icon,
  IconButton,
  Typography,
} from '@material-ui/core';

import { StoreState } from 'redux/store';
import PageTitle from 'components/common/PageTitle';
import { RequestViewComponent } from 'components/Request/constants';
import { useForm } from '../../hooks/useForm';
import { fetchRequest } from 'redux/actions/RequestActions';
import { Role } from 'components/common/constants/Registration';
import { PlaceForLessons } from 'components/PlaceForLessons/constants';
import { instruments } from '../../../assets/data/instruments';
import ApplicationForm from 'components/Request/ApplicationForm';
import RequestApplied from 'components/Request/RequestApplied';

interface OwnProps {
}

interface DispatchProps {
  fetchRequest: (id: number) => void;
}

interface StateProps {
  // TODO: set to RequestType on api integration
  request: any;
}

interface RouteParams {
  id: string;
}

interface Props extends
  DispatchProps,
  StateProps,
  RouteComponentProps<RouteParams> {}

export const RequestView: React.StatelessComponent<Props> = props => {
  React.useEffect(() => {
    if (props.match.params.id) {
      props.fetchRequest(Number(props.match.params.id));
    }
  });

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

  return (
    <div className="nabi-container">
      {props.request.applied ?
        /* tslint:disable-next-line:max-line-length */
        <div className="nabi-background-nabi nabi-padding-small nabi-border-radius nabi-margin-top-small nabi-margin-top-zero-md">
          <Typography>
            <span className="nabi-color-white">
              <Icon className="nabi-vertical-bottom">check</Icon> You applied for this job on Aug 20, 2019
            </span>
          </Typography>
        </div> :
      ''}

      <PageTitle pageTitle={pageTitle} />

      <Grid container={true} spacing={10} >
        <Grid xs={12} item={true} md={6} className="nabi-margin-center">
          <div className="nabi-background-white nabi-section-widest">
            <div className="nabi-float-right">
              <IconButton color="primary">
                <Icon>favorite</Icon>
              </IconButton>
            </div>

            <Grid container={true} className="nabi-text-center nabi-margin-center">
              <Grid item={true} xs={12}>
                <Avatar
                  src="https://photo.isu.pub/vanessacharlesthompson/photo_large.jpg"
                  style={AvatarStyles}
                  className="nabi-margin-center"
                />
                <Typography className="nabi-text-mediumbold nabi-margin-top-xsmall">
                  {props.request.user && props.request.user.firstName + ' ' + props.request.user.lastName}
                </Typography>
                <Typography>
                  {props.request.location}
                </Typography>
              </Grid>
              <Grid item={true} className="nabi-margin-center">
                <h1
                  /* tslint:disable-next-line:max-line-length */
                  className="nabi-text-mediumbold nabi-text-center nabi-jennasue-title nabi-color-nabi nabi-margin-top-small nabi-margin-bottom-small"
                >
                  {props.request.title}
                </h1>
              </Grid>
              <Grid item={true} xs={12}>
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
                <Typography color="primary" className="nabi-margin-top-small">
                  {RequestViewComponent.Labels.StudentDetais}
                </Typography>
                  {props.request.students && props.request.students.map((student: any, i: number) => (
                    <Typography key={i}>
                      {`${(props.request.user.role === Role.parent ? `- ${student.name},` : '')}
                      ${student.age} years old, ${student.skillLevel}`}</Typography>
                  ))
                 }
              </Grid>
              <Grid item={true} className="nabi-margin-center nabi-margin-bottom-medium">
                <Typography color="primary" className="nabi-margin-top-small">
                  {RequestViewComponent.Labels.Message}
                </Typography>
                <Typography>
                  {props.request.message}
                </Typography>
              </Grid>
            </Grid>
          </div>
        </Grid>
        <Grid item={true} xs={12} md={6} className="nabi-margin-center">
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
    </div>
  );
};

const mapStateToProps = (state: StoreState, _ownProps: OwnProps): StateProps => {
  return {
    request: state.requests.request
  };
};

const mapDispatchToProps = (
  dispatch: Dispatch<Action>
): DispatchProps => ({
  fetchRequest: (id: number) => dispatch(fetchRequest(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(RequestView);
