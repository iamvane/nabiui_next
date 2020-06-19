import * as React from 'react';

import {
  Button,
  FormControl,
  Grid,
  Input,
  Select,
  Typography
} from '@material-ui/core';
import Add from '@material-ui/icons/Add';

import { instruments } from '../../../assets/data/instruments';
import {
  InstrumentsComponent,
  skillLevelOptions
} from './constants';
import SectionTitle from '../common/SectionTitle';
import { InstrumentsType } from './model';
import InstrumentAdded from './InstrumentAdded';

interface Props {
  instruments?: InstrumentsType[];
  instrument: string;
  skillLevel: string;
  isEditing?: boolean;
  handleChange: (event: React.FormEvent<{}>) => void;
  addInstrument: (event: React.FormEvent<{}>) => void;
  deleteInstrument: (instrument: string) => void;
}

const Instruments: React.StatelessComponent<Props> = props => {
  const selectSkillLevelOptions: JSX.Element[] = [];

  for (const [key, value] of Object.entries(skillLevelOptions)) {
    const capitalLabel = value.label.charAt(0).toUpperCase() + value.label.slice(1);
    selectSkillLevelOptions.push(<option key={key} value={value.value}>{capitalLabel}</option>);
  }

  const selectedInstruments = props.instruments && props.instruments.map((instrument, i) => (
    <InstrumentAdded
      key={i}
      instrument={instrument.instrument}
      skillLevel={instrument.skillLevel}
      deleteInstrument={(instrumentName: string) => props.deleteInstrument(instrumentName)}
    />
  ));

  const instrumentSelectItems = instruments.map(instrument => {
    return (
      <option key={instrument.value} value={instrument.value}>{instrument.name}</option>
    );
  });

  const {
    instrument,
    skillLevel
  } = props;
  return (
    <div className="nabi-instruments">
      <SectionTitle text={InstrumentsComponent.Text.Instruments} />
      {selectedInstruments}
      <Typography className="nabi-margin-top-xsmall">
        {InstrumentsComponent.Text.SpecifyWhatInstrument}
      </Typography>
      <Grid container={true} spacing={1}>
        <Grid item={true} md={props.isEditing ? 6 : 4} xs={12}>
          <FormControl fullWidth={true}>
            <Select
              native={true}
              value={props.instrument}
              onChange={props.handleChange}
              inputProps={{
                id: InstrumentsComponent.Ids.Instrument,
                name: InstrumentsComponent.FieldNames.Instrument
              }}
            >
              <option value="" disabled={true}>
                {InstrumentsComponent.DisabledPlaceholders.SelectInstrument}
              </option>
               {instrumentSelectItems}
            </Select>
          </FormControl>
        </Grid>
        <Grid item={true} md={props.isEditing ? 6 : 4} xs={12}>
          <FormControl fullWidth={true}>
            <Select
              input={
                <Input
                  id={InstrumentsComponent.Ids.SkillLevel}
                  name={InstrumentsComponent.FieldNames.SkillLevel}
                />
              }
              value={props.skillLevel}
              onChange={props.handleChange}
              native={true}
            >
              <option value="" disabled={true}>
                {InstrumentsComponent.DisabledPlaceholders.SelectLevel}
              </option>
              {selectSkillLevelOptions}
            </Select>
          </FormControl >
        </Grid>
        <Grid item={true} md={props.isEditing ? 12 : 4} xs={10}>
          <Button
            color="primary"
            variant="contained"
            className="nabi-text-uppercase nabi-margin-top-xsmall"
            disabled={skillLevel && instrument ? false : true}
            onClick={props.addInstrument}
          >
            <Add className="nabi-margin-right-xsmall" />
            {InstrumentsComponent.Text.Add}
          </Button>
        </Grid>
      </Grid>
    </div>
  );
};
export default Instruments;
