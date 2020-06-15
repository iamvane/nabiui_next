import * as React from 'react';
import Head from 'next/head';
import {
  Button,
  CircularProgress,
  FormControl,
  Grid,
  Hidden,
  Select,
  Typography,
 } from '@material-ui/core';

import { instruments } from '../../../assets/data/instruments';
import PageTitle from '../common/PageTitle';
import { InstrumentsComponent } from '../Instruments/constants';
import { ListTemplateComponent } from '../common/constants/ListTemplate';
import { LocationField } from '../Instructors/LocationField';

interface Props {
  pageTitle: string;
  results: number;
  handleChange: (event: React.FormEvent<{}>) => void;
  hasCallToAction?: boolean;
  address: string;
  instrument: string;
  filterSection: JSX.Element;
  mainContent: JSX.Element;
  getLatLng: (lat: string, lng: string) => void;
  getLocation: (location: string) => void;
  isRequesting: boolean;
}

export const ListTemplate: React.StatelessComponent<Props> = (props) => {
  const instrumentSelectItems = instruments.map(instrument => {
    return (
      <option key={instrument.value} value={instrument.value}>{instrument.name}</option>
    );
  });

  const { hasCallToAction, results } = props;

  const SearchSection = (): JSX.Element => {
    return (
      <div className={`${!hasCallToAction && 'nabi-section-widest nabi-background-nabi'} nabi-margin-bottom-small`}>
        <Grid container={true} spacing={2}>
          <Grid item={true} xs={12} sm={4} className="nabi-vertical-align-center">
            {!hasCallToAction ?
              <React.Fragment>
                <Button color="secondary" variant="contained">
                  {ListTemplateComponent.ctaButton}
                </Button>
                <Typography className="nabi-margin-left-small nabi-color-white">or search:</Typography>
              </React.Fragment> :
              <Hidden only={['xs']}>
                <Typography className="nabi-margin-left-xsmall nabi-margin-top-xsmall nabi-margin-bottom-xsmall">
                  1-20 of {results} results
                </Typography>
              </Hidden>
            }
          </Grid>
          <Grid item={true} xs={12} sm={3} className="nabi-vertical-align-center">
            <FormControl fullWidth={true}>
              <Select
                native={true}
                value={props.instrument}
                onChange={props.handleChange}
                inputProps={{
                  id: ListTemplateComponent.Ids.Instruments,
                  name: ListTemplateComponent.FieldNames.Instruments
                }}
              >
              <option value="" disabled={true}>
                {InstrumentsComponent.DisabledPlaceholders.SelectInstrument}
              </option>
              {instrumentSelectItems}
              </Select>
            </FormControl>
          </Grid>
          <Grid item={true} xs={12} sm={5} className="nabi-vertical-align-center">
            <LocationField
              getLatLng={props.getLatLng}
              address={props.address}
              getLocation={props.getLocation}
            />
          </Grid>
        </Grid>
      </div>
    );
  };

  return (
    <div className="nabi-container nabi-margin-top-small nabi-margin-top-zero-md">
      <Head>
        <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyDfA1CE5k-YS94ZnyFiOIjwlr99jz7JjOA&libraries=places"></script>
      </Head>
      <PageTitle pageTitle={props.pageTitle} />
      <Grid container={true} spacing={0}>
        <Grid item={true} xs={12}>
          <SearchSection />
        </Grid>
        {props.isRequesting ?
          <div className="nabi-text-center nabi-full-width">
            <CircularProgress />
          </div> :
          <React.Fragment>
            <Grid item={true} xs={12}>
              <div className="nabi-section-widest nabi-background-white">
                {props.filterSection}
              </div>
            </Grid>
            <Grid item={true} xs={12}>
              {results === 0 ?
              <div className="nabi-section-widest nabi-background-white nabi-text-center nabi-margin-top-small">
                <Typography>No results. Contact us if you need help.</Typography>
              </div> :
              <React.Fragment>
                <Typography
                  color="primary"
                  className="nabi-margin-top-small nabi-margin-bottom-small nabi-text-center"
                >
                  {results} result(s)
                </Typography>
                {props.mainContent}
              </React.Fragment>}
            </Grid>
          </React.Fragment>}
      </Grid>
    </div>
  );
};

export default ListTemplate;
