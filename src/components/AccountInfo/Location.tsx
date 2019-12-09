import * as React from 'react';
import PlacesAutocomplete from 'react-places-autocomplete';
import {
  TextField,
  Typography
} from '@material-ui/core';

import SectionTitle from 'components/common/SectionTitle';
import { LocationComponent } from 'components/AccountInfo/constants';

interface Props {
  handleLocationChange: (location: string) => void;
  handleLocationSelect: (location: string) => void;
  location: string;
}

const Location: React.StatelessComponent <Props> = props => {
  return (
    <div className="nabi-margin-top-large nabi-margin-bottom-xlarge">
      <SectionTitle text={LocationComponent.sectionTitle} />
      <Typography className="nabi-margin-top-xsmall">
        {LocationComponent.description}
      </Typography>
      <PlacesAutocomplete
        value={props.location}
        onChange={props.handleLocationChange}
        onSelect={props.handleLocationSelect}
      >
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
          <div>
            <TextField
              {...getInputProps({
                fullWidth: true
              })}
            />
            <div>
              {loading && <div>Loading...</div>}
              {suggestions.map(suggestion => {
                const className = suggestion.active
                  ? 'suggestion-item--active'
                  : 'suggestion-item';
                // inline style for demonstration purpose
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
