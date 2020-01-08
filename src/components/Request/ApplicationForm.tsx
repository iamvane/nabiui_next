import * as React from 'react';
import NumberFormat from 'react-number-format';

import {
  Button,
  Grid,
  TextField,
  Typography
} from '@material-ui/core';

import SectionTitle from '../common/SectionTitle';
import { RequestViewComponent } from './constants';

interface Props {
  request: any;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  message: string
  rate: string;
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
}

function NumberFormatCustom(props: any) {
  const { inputRef, onChange, name,  ...other } = props;

  return (
    <NumberFormat
      {...other}
      ref={inputRef}
      onValueChange={values => {
        onChange({
          currentTarget: {
            value: values.value,
            name: name
          },
        });
      }}
      decimalScale={2}
      fixedDecimalScale={true}
      thousandSeparator={true}
    />
  );
}

const ApplicationForm = (props:Props) => {
  return (
    <React.Fragment>
      <form noValidate={true} autoComplete="off" onSubmit={props.handleSubmit}>
        <SectionTitle text={RequestViewComponent.sendApplication} />
        <Grid className="nabi-text-center nabi-margin-bottom-small">
          <Typography
            className="nabi-text-mediumbold nabi-margin-top-small nabi-text-uppercase"
          >
            {RequestViewComponent.Labels.LessonRate}
          </Typography>
          <Typography
            className="nabi-margin-bottom-xsmall"
          >
          {RequestViewComponent.lessonDuration.replace(
            RequestViewComponent.lessonDurationPlaceHolder,
            props.request.lessonDuration
          )}
          </Typography>
          <TextField
            className="nabi-rates-field"
            placeholder="$0.00"
            value={props.rate}
            onChange={props.handleChange}
            id={RequestViewComponent.Ids.LessonRate}
            name={RequestViewComponent.FieldNames.LessonRate}
            InputProps={{
              inputComponent: NumberFormatCustom,
            }}
          />
        </Grid>
        <Typography
          className="nabi-text-mediumbold nabi-text-center nabi-margin-bottom-xsmall nabi-text-uppercase"
        >
          {RequestViewComponent.sendMessageTo.replace(
            RequestViewComponent.userPlaceholder,
            props.request.displayName
          )}
        </Typography>
        <TextField
          margin="normal"
          className="nabi-margin-remove"
          required={true}
          multiline={true}
          onChange={props.handleChange}
          value={props.message}
          id={RequestViewComponent.Ids.Message}
          name={RequestViewComponent.FieldNames.Message}
          fullWidth={true}
          rows={6}
        />
        <Grid item={true} xs={12} className="nabi-text-center">
          <Button
            type="submit"
            color="primary"
            variant="contained"
            className="nabi-margin-top-small"
          >
            {RequestViewComponent.sendApplication}
          </Button>
        </Grid>
      </form>
    </React.Fragment>
  );
};

export default ApplicationForm;
