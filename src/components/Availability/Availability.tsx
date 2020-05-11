import * as React from 'react';

import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from '@material-ui/core';

import { AvailabilityComponent } from '../Availability/constants';
import SectionTitle from '../common/SectionTitle';

let id = 0;
function createData(
  name: string, monday: JSX.Element, tuesday: JSX.Element, wednesday: JSX.Element,
  thursday: JSX.Element, friday: JSX.Element, saturday: JSX.Element, sunday: JSX.Element) {
  id += 1;
  return { id, name, monday, tuesday, wednesday, thursday, friday, saturday, sunday };
}

interface Props {
  handleChange: (event: React.FormEvent<{}>) => void;
  renderCheckbox: (stateName: string) => JSX.Element;
}

/**
 * Availability: it allows instructors to set their schedule
 */
const Availability: React.StatelessComponent<Props> = props => {

  const data = [
    createData(
      '8AM-10AM', (props.renderCheckbox('mon8to10')), (props.renderCheckbox('tue8to10')),
      (props.renderCheckbox('wed8to10')), (props.renderCheckbox('thu8to10')), (props.renderCheckbox('fri8to10')),
      (props.renderCheckbox('sat8to10')), (props.renderCheckbox('sun8to10'))),
    createData(
      '10AM-12PM', (props.renderCheckbox('mon10to12')), (props.renderCheckbox('tue10to12')),
      (props.renderCheckbox('wed10to12')), (props.renderCheckbox('thu10to12')), (props.renderCheckbox('fri10to12')),
      (props.renderCheckbox('sat10to12')), (props.renderCheckbox('sun10to12'))),
    createData(
      '12PM-3PM', (props.renderCheckbox('mon12to3')), (props.renderCheckbox('tue12to3')),
      (props.renderCheckbox('wed12to3')), (props.renderCheckbox('thu12to3')), (props.renderCheckbox('fri12to3')),
      (props.renderCheckbox('sat12to3')), (props.renderCheckbox('sun12to3'))),
    createData(
      '3PM-6PM', (props.renderCheckbox('mon3to6')), (props.renderCheckbox('tue3to6')),
      (props.renderCheckbox('wed3to6')), (props.renderCheckbox('thu3to6')), (props.renderCheckbox('fri3to6')),
      (props.renderCheckbox('sat3to6')), (props.renderCheckbox('sun3to6'))),
    createData(
      '6PM-9PM', (props.renderCheckbox('mon6to9')), (props.renderCheckbox('tue6to9')),
      (props.renderCheckbox('wed6to9')), (props.renderCheckbox('thu6to9')), (props.renderCheckbox('fri6to9')),
      (props.renderCheckbox('sat6to9')), (props.renderCheckbox('sun6to9'))),
  ];

  return (
    <div>
      <SectionTitle text={AvailabilityComponent.title} />

      <Typography className="nabi-margin-top-xsmall nabi-margin-bottom-xsmall">
        {AvailabilityComponent.description}
      </Typography>
      <Paper className="nabi-remove-shadow nabi-text-center">
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>{AvailabilityComponent.schedule}</TableCell>
              <TableCell>{AvailabilityComponent.WeekdaysFirstAbbr.Monday}</TableCell>
              <TableCell>{AvailabilityComponent.WeekdaysFirstAbbr.Tuesday}</TableCell>
              <TableCell>{AvailabilityComponent.WeekdaysFirstAbbr.Wendesday}</TableCell>
              <TableCell>{AvailabilityComponent.WeekdaysFirstAbbr.Thursday}</TableCell>
              <TableCell>{AvailabilityComponent.WeekdaysFirstAbbr.Friday}</TableCell>
              <TableCell>{AvailabilityComponent.WeekdaysFirstAbbr.Saturday}</TableCell>
              <TableCell>{AvailabilityComponent.WeekdaysFirstAbbr.Sunday}</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map(n => {
              return (
                <TableRow key={n.id}>
                  <TableCell scope="row">
                    {n.name}
                  </TableCell>
                  <TableCell>{n.monday}</TableCell>
                  <TableCell>{n.tuesday}</TableCell>
                  <TableCell>{n.wednesday}</TableCell>
                  <TableCell>{n.thursday}</TableCell>
                  <TableCell>{n.friday}</TableCell>
                  <TableCell>{n.saturday}</TableCell>
                  <TableCell>{n.sunday}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </Paper>
    </div>
  );
};

export default (Availability);