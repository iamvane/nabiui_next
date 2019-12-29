import * as React from 'react';

import {
  Button,
  Grid,
  Typography
} from '@material-ui/core';

import { instruments } from '../../../../assets/data/instruments';
import { Role } from '../../Auth/Registration/constants';
import { SkillLevel } from '../../Instruments/constants';
import { StudentCardComponent } from '../constants';

interface Props {
  // TODO: change to Re1uestType when doing API integration
  student: any;
  toggleBuyLessonsForm: () => void;
}

const StudentCard: React.StatelessComponent<Props> = props => {
  const instrumentDisplay = instruments.find(t => t.value === props.student.students[0].instrument);

  return (
    <Grid container={true} className="nabi-margin-bottom-small">
      <Grid item={true} xs={12} md={5}>
        <Grid container={true}>
          <Grid item={true} xs={6}>
            <Typography>{StudentCardComponent.studentLabel}</Typography>
          </Grid>
          <Grid item={true} xs={6} className="nabi-text-right">
            <Typography>{props.student.students[0].name}</Typography>
          </Grid>
          {props.student.user.role === Role.parent ?
            <React.Fragment>
              <Grid item={true} xs={6}>
                <Typography>Parent</Typography>
              </Grid>
              <Grid item={true} xs={6} className="nabi-text-right">
                <Typography>{props.student.user.firstName}</Typography>
              </Grid>
            </React.Fragment> : ''
          }
          <Grid item={true} xs={6}>
            <Typography>{StudentCardComponent.ageLabel}</Typography>
          </Grid>
          <Grid item={true} xs={6} className="nabi-text-right">
            <Typography>{props.student.students[0].age}</Typography>
          </Grid>
          <Grid item={true} xs={6}>
            <Typography>{StudentCardComponent.instrumentLabel}</Typography>
          </Grid>
          <Grid item={true} xs={6} className="nabi-text-right">
            <Typography>{instrumentDisplay && instrumentDisplay.name}</Typography>
          </Grid>
          <Grid item={true} xs={6}>
            <Typography>{StudentCardComponent.skillLevelLabel}</Typography>
          </Grid>
          <Grid item={true} xs={6} className="nabi-text-right">
            <Typography>{SkillLevel[props.student.students[0].skillLevel]}</Typography>
          </Grid>
        </Grid>
      </Grid>
      <Grid item={true} xs={12} md={5} className="nabi-text-center nabi-text-left-md nabi-padding-left-small-md">
        <Button
          color="primary"
          className="nabi-responsive-button nabi-margin-top-xsmall"
          variant="contained"
          onClick={props.toggleBuyLessonsForm}
        >
          {StudentCardComponent.lessonsRemainingButton.replace(
            StudentCardComponent.lessonsPlaceholder,
            props.student.lessonsRemaining
          )}
        </Button>
        <br />
        <Button
          color="primary"
          className="nabi-responsive-button nabi-margin-top-xsmall nabi-margin-right-xsmall"
          variant="contained"
        >
          {StudentCardComponent.gradeButton}
        </Button>
        <Button
          color="primary"
          className="nabi-responsive-button nabi-margin-top-xsmall"
          variant="contained"
        >
          {StudentCardComponent.contactStudentButton}
        </Button>
      </Grid>
    </Grid>
  );
};

export default StudentCard;
