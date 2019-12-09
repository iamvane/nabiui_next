import * as React from 'react';

import {
  Icon,
  IconButton,
  Grid,
  Typography
} from '@material-ui/core';

import { EducationType }  from 'components/Education/model';
import {
  degreeTypeLabels,
  EducationAddedComponent
} from 'components/Education/constants';

interface Props extends EducationType {
  deleteEducation: (educationId: number | undefined) => void;
  editEducation: (educationId: number | undefined) => void;
  gridWidth?: boolean | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | undefined;
  notEditable?: boolean;
}

const EducationAdded: React.StatelessComponent<Props> = props => {
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
          onClick={() => props.deleteEducation(props.id)}
        >
          <Icon>delete</Icon>
        </IconButton>

        <IconButton
          color="primary"
          className="nabi-float-right"
          aria-label="Edit"
          onClick={() => props.editEducation(props.id)}
        >
          <Icon>edit</Icon>
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
