import * as React from 'react';
import { Role } from '../../../../constants/Roles';

import {
  Button,
  FormControl,
  FormControlLabel,
  Grid,
  Input,
  Radio,
  RadioGroup,
  Select,
  Typography,
} from '@material-ui/core';

import Link from 'next/link';
import { Routes } from '../../../../constants/Routes';
import {
  BannerComponent
} from './constants';
import { instruments } from '../../../../../assets/data/instruments';
import SectionTitle from '../../../common-components/SectionTitle';

/**
 * Homepage banner component
 */
interface State {
  role: Role;
  instrument: string;
}

export class Banner extends React.Component<{}, State> {
  constructor(props: {}) {
    super(props);
    this.state = {
      instrument: '',
      role: Role.student,
    };
  }

  public handleChange = (event: React.FormEvent<HTMLInputElement>): void => {
    const target = event.currentTarget;
    const value = target.value;
    const name = target.name;

    this.setState({
      ...this.state,
      [name]: value
    });
  }

  public render(): JSX.Element {
    const instrumentSelectItems = instruments.map(instrument => {
      return (
        <option key={instrument.value} value={instrument.value}>{instrument.name}</option>
      );
    });

    return (
      <section id="banner" className="nabi-position-relative">
        <div className="container">
          <Grid item={true} xs={12} md={4} className="nabi-margin-center cta-container">
            <h1 className="nabi-text-mediumbold nabi-color-white nabi-margin-bottom-xsmall nabi-text-center">
              {BannerComponent.cta}
            </h1>
            <Typography className="nabi-text-center">{BannerComponent.description}</Typography>
            <FormControl fullWidth={true} className="nabi-instruments-select nabi-margin-bottom-small">
              <Select
                native={true}
                fullWidth={true}
                input={
                  <Input
                    id={BannerComponent.instrumentId}
                    name={BannerComponent.instrumentName}
                  />
                }
                value={this.state.instrument}
                onChange={this.handleChange as any}
                placeholder={BannerComponent.instrumentPlaceholder}
              >
                <option value="">{BannerComponent.instrumentPlaceholder}</option>
                {instrumentSelectItems}
              </Select>
            </FormControl>
            <SectionTitle text={BannerComponent.roleLabel} noDivider={true} />
            <FormControl required={true}>
              <RadioGroup
                name={BannerComponent.roleName}
                onChange={this.handleChange}
                value={this.state.role}
              >
                <FormControlLabel
                  control={<Radio />}
                  label={BannerComponent.studentLabel}
                  value={Role.student}
                />
                <FormControlLabel
                  control={<Radio />}
                  label={BannerComponent.parentLabel}
                  value={Role.parent}
                />
              </RadioGroup>
            </FormControl>
            <div className="nabi-text-center">
              <Link href={Routes.Registration}>
                <Button color="primary" variant="contained">
                  {BannerComponent.buttonText}
                </Button>
              </Link>
            </div>
          </Grid>
        </div>
      </section>
    );
  }
}

export default Banner;
