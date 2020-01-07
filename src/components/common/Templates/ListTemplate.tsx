import * as React from "react";
import {
  Button,
  CircularProgress,
  FormControl,
  Grid,
  Hidden,
  Select,
  Typography
} from "@material-ui/core";

import { instruments } from "../../../../assets/data/instruments";
import { InstrumentsComponent } from "../../Instruments/constants";
import { LocationField } from "../../Instructors/LocationField";
import PageTitle from "../PageTitle";
import { ListTemplateComponent } from "../constants/ListTemplate";

interface Props {
  pageTitle: string;
  results: number;
  handleChange: (event: React.FormEvent<{}>) => void;
  hasCallToAction?: boolean;
  address: string;
  isRequestingMoreData: boolean;
  instrument: string;
  filterSection: JSX.Element;
  mainContent: JSX.Element;
  getLatLng: (lat: string, lng: string) => void;
  getLocation: (location: string) => void;
  isRequesting: boolean;
}

export const ListTemplate: React.StatelessComponent<Props> = props => {
  const instrumentSelectItems = instruments.map(instrument => {
    return (
      <option key={instrument.value} value={instrument.value}>
        {instrument.name}
      </option>
    );
  });

  const { hasCallToAction, results } = props;

  const SearchSection = (): JSX.Element => {
    return (
      <div className="nabi-section-widest nabi-background-nabi nabi-margin-bottom-small">
        <Grid container={true} spacing={2}>
          {hasCallToAction &&
            <Grid item={true} xs={12} sm={4} className="nabi-vertical-align-center">
              <React.Fragment>
                <Button color="secondary" variant="contained">
                  {ListTemplateComponent.ctaButton}
                </Button>
                <Typography className="nabi-margin-left-small nabi-color-white">or search:</Typography>
              </React.Fragment>
            </Grid>
          }
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
          <Grid item={true} xs={12} sm={hasCallToAction ? 5 : 9} className="nabi-vertical-align-center">
            <LocationField getLatLng={props.getLatLng} address={props.address} getLocation={props.getLocation} />
          </Grid>
        </Grid>
      </div>
    );
  };

  return (
    <div className="nabi-container nabi-margin-top-small nabi-margin-top-zero-md">
      <PageTitle pageTitle={props.pageTitle} />
      <Grid container={true} spacing={0}>
        <Grid item={true} xs={12}>
          <SearchSection />
        </Grid>
        {props.isRequesting ? (
          <div className="nabi-text-center nabi-full-width">
            <CircularProgress />
          </div>
        ) : (
          <React.Fragment>
            <Grid item={true} xs={12}>
              <div className="nabi-section-widest nabi-background-white">
                {props.filterSection}
              </div>
            </Grid>
            <Grid item={true} xs={12}>
              {results === 0 ? (
                <div className="nabi-section-widest nabi-background-white nabi-text-center nabi-margin-top-small">
                  <Typography>
                    No results. Contact us if you need help.
                  </Typography>
                </div>
              ) : (
                <React.Fragment>
                  <Typography
                    color="primary"
                    className="nabi-margin-top-small nabi-margin-bottom-small nabi-text-center"
                  >
                    {results} result(s)
                  </Typography>
                  {props.mainContent}

                  {props.isRequestingMoreData &&
                    <div className="nabi-text-center nabi-full-width">
                     <CircularProgress />
                   </div>
                  }
                </React.Fragment>
              )}
            </Grid>
          </React.Fragment>
        )}
      </Grid>
    </div>
  );
};

export default ListTemplate;
