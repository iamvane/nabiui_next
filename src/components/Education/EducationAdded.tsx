import * as React from 'react';

import {
  IconButton,
  Grid,
  Typography
} from '@material-ui/core';
import Delete from '@material-ui/icons/Delete';
import Edit from '@material-ui/icons/Edit';

import { EducationType }  from './model';
import {
  degreeTypeLabels,
  EducationAddedComponent
} from './constants';

interface Props extends EducationType {
  deleteEducation?: (educationId: number | undefined) => void;
  editEducation?: (educationId: number | undefined) => void;
  gridWidth?: boolean | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
  notEditable?: boolean;
}

const EducationAdded: React.StatelessComponent<Props> = props => {
  return (
    <Grid
      item={true}
      md={props.gridWidth ? props.gridWidth : false}
      xs={12}
      className={`${props.notEditable ? '' : 'nabi-editable-item'} nabi-margin-top-small`}
    >
      <div className="nabi-action-buttons">
        <IconButton
          color="primary"
          className="nabi-float-right nabi-margin-left-xsmall"
          aria-label="Delete"
          onClick={() => props.deleteEducation(props.id)}
        >
          <Delete />
        </IconButton>

        <IconButton
          color="primary"
          className="nabi-float-right"
          aria-label="Edit"
          onClick={() => props.editEducation(props.id)}
        >
          <Edit />
        </IconButton>
      </div>

      <Typography className="nabi-text-uppercase" variant="body2">
        <mark>{props.school}</mark>
      </Typography>

      <Typography className="nabi-margin-top-xsmall">
        <mark>
          {EducationAddedComponent.concentration.replace(
            EducationAddedComponent.degreeTypePlaceholder,
            degreeTypeLabels[props.degreeType]
          ).replace(
            EducationAddedComponent.fieldOfStudyPlaceholder,
            props.fieldOfStudy
          )}
        </mark>
      </Typography>

      <Typography>
        <mark>{props.graduationYear}</mark>
      </Typography>

      <Typography>
        <mark>{props.schoolLocation}</mark>
      </Typography>
    </Grid>
  );
};

export default EducationAdded;
