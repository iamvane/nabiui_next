import * as React from 'react';
import PlacesAutocomplete from 'react-places-autocomplete';
import {
  IconButton,
  InputAdornment,
  TextField,
  Typography
} from '@material-ui/core';

import { ListTemplateComponent } from '../common/constants/ListTemplate';
import SectionTitle from '../common/SectionTitle';
import { LocationComponent } from './constants';

interface Props {
  handleLocationChange: (location: string) => void;
  handleLocationSelect: (location: string) => void;
  location: string;
  isFilter?: boolean;
  handleError: () => void;
}

const Location: React.StatelessComponent <Props> = props => {
  const locationIcon = 'https://nabimusic.s3.us-east-2.amazonaws.com/assets/images/pin-location.png';
  return (
    <div className={!props.isFilter ? 'nabi-margin-top-large nabi-margin-bottom-xlarge' : ''}>
      {!props.isFilter && <SectionTitle text={LocationComponent.sectionTitle} />}
      {!props.isFilter &&
        <Typography className="nabi-margin-top-xsmall">
          {LocationComponent.description}
        </Typography>
      }
      <PlacesAutocomplete
        value={props.location}
        onChange={props.handleLocationChange}
        onSelect={props.handleLocationSelect}
        onError={props.handleError}
      >
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
          <div>
            <TextField
              {...getInputProps({
                fullWidth: true,
                placeholder: ListTemplateComponent.locationPlaceholder,
                InputProps: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <IconButton
                        aria-label="location"
                      >
                        <img src={locationIcon} className="nabi-custom-button-icon" alt="location-icon" />
                      </IconButton>
                    </InputAdornment>
                  ),
                }
              })}
            />
            <div>
              {loading && <div>Loading...</div>}
              {suggestions.map(suggestion => {
                const className = suggestion.active
                  ? 'suggestion-item--active'
                  : 'suggestion-item';
                const style = suggestion.active
                  ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                  : { backgroundColor: '#ffffff', cursor: 'pointer' };
                return (
                  <div
                    key={suggestion}
                    {...getSuggestionItemProps(suggestion, {
                      className,
                      style,
                    })}
                  >
                    <span>{suggestion.description}</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </PlacesAutocomplete>
    </div>
  );
};

export default Location;
