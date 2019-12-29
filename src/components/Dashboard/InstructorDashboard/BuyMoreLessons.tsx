import * as React from 'react';
import NumberFormat from 'react-number-format';

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  Input,
  ListItem,
  Select,
  TextField,
  Typography
} from '@material-ui/core';

import { lessonDurationOptions } from '../../Rates/constants';
import { BuyMoreLessonsModalComponent } from '../constants';

interface Props {
  isOpen: boolean;
  closeHandler: () => void;
  handleSubmit: (event: React.FormEvent<{}>) => void;
  handleChange: (event: React.FormEvent<{}>) => void;
  error?: string;
  student: any;
  lessonRate: string;
  lessonDuration: string;
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

const BuyMoreLessonsModal: React.StatelessComponent <Props> = props => {
  const lessonDurationItems: any = [];
  for (const [key, value] of Object.entries(lessonDurationOptions)) {
    lessonDurationItems.push(<option key={key} value={value.value}>{value.label}</option>);
  }

  let lessonRate = Number(props.lessonRate) * .20;
  lessonRate = Number(props.lessonRate) - lessonRate;

  const { FieldKey } = BuyMoreLessonsModalComponent;

  return (
    <div>
      <Dialog
        open={props.isOpen}
        onClose={props.closeHandler}
        aria-labelledby="form-dialog-title"
        scroll="body"
      >
        <DialogTitle id="form-dialog-title nabi-text-uppercase">Send Reminder</DialogTitle>

        <DialogContent>
          <DialogContentText>
            <Typography>
              {BuyMoreLessonsModalComponent.description.replace(
                BuyMoreLessonsModalComponent.displayNamePlaceholder,
                props.student.user && props.student.user.firstName + ' ' + props.student.user.lastName.charAt(0) + '.'
              ).replace(
                BuyMoreLessonsModalComponent.instrumentPlaceholder,
                props.student.students && props.student.students[0].instrument
              )}
            </Typography>
            <ListItem className="nabi-padding-remove">
              <Typography className="list-text">
                {BuyMoreLessonsModalComponent.fieldLabels[FieldKey.LessonDuration]}
              </Typography>

              <FormControl className="nabi-rates-field">
                <Select
                  native={true}
                  input={
                  <Input
                    id={BuyMoreLessonsModalComponent.ids[FieldKey.LessonDuration]}
                    name={BuyMoreLessonsModalComponent.fieldNames[FieldKey.LessonDuration]}
                  />}
                  value={props.lessonDuration}
                  onChange={props.handleChange}
                >
                <option
                  value={BuyMoreLessonsModalComponent.placeholders[FieldKey.LessonDuration]}
                  disabled={true}
                >
                  {BuyMoreLessonsModalComponent.placeholders[FieldKey.LessonDuration]}
                </option>
                {lessonDurationItems}
                </Select>
              </FormControl>
            </ListItem>

            <ListItem className="nabi-padding-remove">
              <Typography className="list-text">
                {BuyMoreLessonsModalComponent.fieldLabels[FieldKey.LessonRate]}
              </Typography>
              <TextField
                id={BuyMoreLessonsModalComponent.ids[FieldKey.LessonRate]}
                name={BuyMoreLessonsModalComponent.fieldNames[FieldKey.LessonRate]}
                className="nabi-rates-field nabi-display-inline nabi-margin-right-small"
                onChange={props.handleChange}
                required={true}
                placeholder={BuyMoreLessonsModalComponent.placeholders[FieldKey.LessonRate]}
                value={props.lessonRate}
                InputProps={{
                  inputComponent: NumberFormatCustom,
                }}
                error={!!props.error}
                helperText={props.error}
              />
              <Typography
                className="buy-more-lessons-you-get-text nabi-display-inline-sm"
                color="primary"
              >
                {BuyMoreLessonsModalComponent.youGet.replace(
                  BuyMoreLessonsModalComponent.amountPlaceholder,
                  lessonRate.toFixed(2)
                )}
              </Typography>
            </ListItem>
          </DialogContentText>
        </DialogContent>

        <DialogActions>
          <Button
            variant="contained"
            color="default"
            onClick={props.closeHandler}
          >
            {BuyMoreLessonsModalComponent.cancelButton}
          </Button>

          <Button variant="contained" onClick={props.handleSubmit} color="primary">
            {BuyMoreLessonsModalComponent.sendButton}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default BuyMoreLessonsModal;
