import * as React from 'react';

import {
  Icon,
  IconButton,
  Grid,
  Typography
} from '@material-ui/core';

import { EmploymentType }  from 'components/Employment/model';
import { EmploymentAddedComponent } from 'components/Employment/constants';

interface Props extends EmploymentType {
  deleteEmployment: (employmentId: any) => void;
  editEmployment: (employmentId: any) => void;
  gridWidth?: boolean | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | undefined;
  notEditable?: boolean;
}

/**
 * EmploymentAdded
 */
const EmploymentAdded: React.StatelessComponent<Props> = props => {
  const fromMonth = props.fromMonth.charAt(0).toUpperCase() + props.fromMonth.slice(1);
  const toYear = props.toYear ? props.toYear : '';
  const toMonth = props.toMonth ? props.toMonth : '';
  const toMonthCapital = toMonth.charAt(0).toUpperCase() + toMonth.slice(1);

  return (
    <Grid
      item={true}
      md={props.gridWidth && props.gridWidth}
      xs={12}
      className={`${props.notEditable ? '' : 'nabi-editable-item'} nabi-margin-top-small`}
    >
      <div className="nabi-action-buttons">
        <IconButton
          color="primary"
          className="nabi-float-right nabi-margin-left-xsmall"
          aria-label="Delete"
          onClick={() => props.deleteEmployment(props.id)}
        >
          <Icon>delete</Icon>
        </IconButton>

        <IconButton
          color="primary"
          className="nabi-float-right"
          aria-label="Edit"
          onClick={() => props.editEmployment(props.id)}
        >
          <Icon>edit</Icon>
        </IconButton>
      </div>
      <Typography className="nabi-margin-top-small nabi-text-uppercase" variant="body2">
        <mark>{props.jobTitle}</mark>
      </Typography>
      <Typography>
        <mark>{props.employer}</mark>
      </Typography>
      {props.stillWorkHere || (!props.toYear && !toMonthCapital) ? (
        <Typography>
          <mark>
            {EmploymentAddedComponent.timelinePresent.replace(
              EmploymentAddedComponent.fromMonthPlaceholder,
              fromMonth
            ).replace(
              EmploymentAddedComponent.fromYearPlaceholder,
              props.fromYear,
            )}
          </mark>
        </Typography>
      ) : (
        <Typography>
          <mark>
            {EmploymentAddedComponent.timeline.replace(
              EmploymentAddedComponent.fromMonthPlaceholder,
              fromMonth
            ).replace(
              EmploymentAddedComponent.fromYearPlaceholder,
              props.fromYear,
            ).replace(
              EmploymentAddedComponent.toMonthPlaceholder,
              toMonthCapital,
            ).replace(
              EmploymentAddedComponent.toYearPlaceholder,
              toYear,
            )}
          </mark>
        </Typography>
      )}
      <Typography>
        <mark>{props.jobLocation}</mark>
      </Typography>
    </Grid>
  );
};

export default EmploymentAdded;
