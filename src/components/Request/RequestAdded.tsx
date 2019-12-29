import * as React from 'react';

import {
  Grid,
  Icon,
  IconButton,
  Typography
} from '@material-ui/core';

import { RequestType }  from '../../redux/models/RequestModel';
import { RequestAddedComponent } from './constants';
import { StudentType } from './models';

interface Props extends RequestType {
  notEditable: boolean;
  deleteRequest?: (requestId: number) => void;
  editRequest?: (requestId: number) => void;
  gridWidth?: boolean | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | undefined;
}

/**
 * RequestAdded
 */
const RequestAdded: React.StatelessComponent<Props> = props => {
  const {
    students
  } = props as { students: StudentType[] };
  const renderStudentDetails = students.map((student, i) => {
    return (
      <Typography key={i}>
        <mark>
          {RequestAddedComponent.studentDetails.replace(
            RequestAddedComponent.studentNameReplace, student.name)
            .replace(RequestAddedComponent.studentAgeReplace, String(student.age))
            .replace(RequestAddedComponent.studentSkillLevelReplace, String(student.skillLevel)
          )}
        </mark>
      </Typography>
    );
  });

  return (
    <Grid
      item={true}
      md={props.gridWidth ? props.gridWidth : false}
      xs={12}
      className={`nabi-margin-top-small ${props.notEditable ? '' : 'nabi-editable-item'}`}
    >
      <div className="nabi-action-buttons">
        <IconButton
          color="primary"
          className="nabi-float-right nabi-margin-left-xsmall"
          aria-label="Delete"
          onClick={() => props.deleteRequest && props.deleteRequest(props.id)}
        >
          <Icon>delete</Icon>
        </IconButton>

        <IconButton
          color="primary"
          className="nabi-float-right"
          aria-label="Edit"
          onClick={() => props.editRequest && props.editRequest(props.id)}
        >
          <Icon>edit</Icon>
        </IconButton>
      </div>

      <Typography className="nabi-margin-top-small nabi-text-uppercase" variant="body2">
        <mark>{props.requestTitle}</mark>
      </Typography>

      <Typography>
        <mark>
          <span className="nabi-color-nabi">
            {RequestAddedComponent.Labels.Instrument}
            {' '}
          </span>
          {props.instrument}
        </mark>
      </Typography>

      <Typography>
        <mark>
          <span className="nabi-color-nabi">
            {RequestAddedComponent.Labels.PlaceForLessons}
            {' '}
          </span>
          {props.placeForLessons}
        </mark>
      </Typography>

      <Typography>
        <mark>
          <span className="nabi-color-nabi">
            {RequestAddedComponent.Labels.LessonDuration}
            {' '}
          </span>
          {props.lessonDuration}
        </mark>
      </Typography>

      <Typography>
        <span className="nabi-color-nabi">{RequestAddedComponent.Labels.StudentDetails}</span>
      </Typography>
      {renderStudentDetails}
      <Typography>
        <span className="nabi-color-nabi">{RequestAddedComponent.Labels.Message}</span>
      </Typography>
      <Typography>
        <mark>{props.requestMessage}</mark>
      </Typography>
    </Grid>
  );
};

export default RequestAdded;
