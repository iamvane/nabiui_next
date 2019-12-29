import * as React from 'react';

import {
  Grid,
  Icon,
  IconButton,
  Typography
} from '@material-ui/core';

import { UserType } from '../../../redux/models/UserModel';
import { Role } from '../../Auth/Registration/constants';
import { PreLaunchStudentDashboardComponent as constants }  from '../constants';
import { StudentDetailsType } from './model';

interface Props {
  // TODO: change to Re1uestType when doing API integration
  user: UserType;
  student: StudentDetailsType;
  editStudent: (studentId: number | undefined) => void;
  deleteStudent: (studentId: number | undefined) => void;
  noEdit?: true;
}

const StudentCard: React.StatelessComponent<Props> = props => {
  return (
    <React.Fragment>
      <Grid container={true} className={`nabi-margin-top-small ${props.noEdit ? '' : 'nabi-editable-item'}`}>
        <Grid
          item={true}
          xs={props.user.role === Role.parent ? 9 : 10}
          md={6}
        >
          <Grid container={true}>
            {props.user.role === Role.parent &&
              <React.Fragment>
                <Grid item={true} xs={6}>
                  <Typography className="nabi-text-mediumbold">{constants.Labels.Name}</Typography>
                </Grid>
                <Grid item={true} xs={6} className="nabi-text-right">
                  <Typography><mark>{props.student.name}</mark></Typography>
                </Grid>
                <Grid item={true} xs={6}>
                  <Typography className="nabi-text-mediumbold">{constants.Labels.Age}</Typography>
                </Grid>
                <Grid item={true} xs={6} className="nabi-text-right">
                  <Typography><mark>{props.student.age}</mark></Typography>
                </Grid>
              </React.Fragment>
            }
            <Grid item={true} xs={6}>
              <Typography className="nabi-text-mediumbold">{constants.Labels.Instrument}</Typography>
            </Grid>
            <Grid item={true} xs={6} className="nabi-text-right">
              <Typography><mark>{
                props.student && props.student.instrument
              }</mark></Typography>
            </Grid>
            <Grid item={true} xs={6}>
              <Typography className="nabi-text-mediumbold">{constants.Labels.SkillLevel}</Typography>
            </Grid>
            <Grid item={true} xs={6} className="nabi-text-right">
              <Typography><mark>{props.student && props.student.skillLevel}</mark></Typography>
            </Grid>
            <Grid item={true} xs={6}>
              <Typography className="nabi-text-mediumbold">{constants.Labels.LessonPlace}</Typography>
            </Grid>
            <Grid item={true} xs={6} className="nabi-text-right">
              <Typography><mark>{props.student && props.student.lessonPlace}</mark></Typography>
            </Grid>
            <Grid item={true} xs={6}>
              <Typography className="nabi-text-mediumbold">{constants.Labels.LessonDuration}</Typography>
            </Grid>
            <Grid item={true} xs={6} className="nabi-text-right">
              <Typography><mark>{props.student && props.student.lessonDuration}</mark></Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid
          item={true}
          xs={props.user.role === Role.parent ? 3 : 2}
          md={props.user.role === Role.parent ? 2 : 1}
          className="nabi-action-buttons"
        >
          {!props.noEdit &&
            <React.Fragment>
              {props.user.role === Role.parent &&
                <IconButton
                  color="primary"
                  className="nabi-float-right nabi-margin-left-xsmall"
                  aria-label="Delete"
                  onClick={() => props.deleteStudent(props.student.id)}
                >
                  <Icon>delete</Icon>
                </IconButton>
              }
              <IconButton
                color="primary"
                className="nabi-float-right"
                aria-label="Edit"
                onClick={() => props.editStudent(props.student.id)}
              >
                <Icon>edit</Icon>
              </IconButton>
            </React.Fragment>
          }
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default StudentCard;
