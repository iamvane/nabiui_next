import * as React from 'react';

import {
  Grid,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  TextField,
  Typography,
} from '@material-ui/core';
import AttachMoney from '@material-ui/icons/AttachMoney';

import NumberFormat from 'react-number-format';
import SectionTitle from '../common/SectionTitle';

import {
  RatesComponent,
  LessonDuration
} from './constants';
import { RatesType } from './model';

interface Props extends RatesType {
  handleChange: (event: React.FormEvent<{}>) => void;
  [key: string]: any;
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

const Rates: React.StatelessComponent<Props> = props => {
  const ratesListContent = [
    {
      name: 'mins30',
      listText: LessonDuration.thirtyMins,
    }
  ];

  const ratesListItems = ratesListContent.map((list, i) => {

    const instructorGain: number =
      isNaN((props as any)[list.name] - ((props as any)[list.name] * .25))
      ? 0
      : (props as any)[list.name] - ((props as any)[list.name] * .25);
    return (
      <Grid key={i} container={true}>
        <Grid item={true} xs={12} md={6}>
          <ListItem className="nabi-margin-bottom-small">
            <ListItemText
              primary={
                RatesComponent.ratesList.replace(
                  RatesComponent.minutesPlaceholder,
                  list.listText
                )
              }
            />
            <ListItemSecondaryAction>
              <AttachMoney color="primary" />
              <TextField
                id={list.name}
                name={list.name}
                className="nabi-rates-field"
                onChange={props.handleChange}
                required={true}
                placeholder="0.00"
                value={(props as any)[list.name]}
                InputProps={{
                  inputComponent: NumberFormatCustom,
                }}
              />
            </ListItemSecondaryAction>
          </ListItem>
        </Grid>
        <Grid item={true} xs={12} md={6}>
          {instructorGain !== 0  &&
            <Typography
              color="secondary"
              className="nabi-margin-left-small nabi-color-orange"
            >
              {
                RatesComponent.instructorGain.replace(
                  RatesComponent.gainPlaceholder,
                  String(instructorGain.toFixed(2))
                )
              }
            </Typography>
          }
        </Grid>
      </Grid>
    );
  });

  return (
    <div>
      <SectionTitle text={RatesComponent.Text.RatesForLessons} />
      <Typography className="nabi-margin-top-xsmall nabi-margin-bottom-small">
        {RatesComponent.Text.SpecifyYourPreferred}
      </Typography>
      <div className="rates">
        {ratesListItems}
      </div>
    </div>
  );
};

export default Rates;
