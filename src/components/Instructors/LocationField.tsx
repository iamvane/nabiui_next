import * as React from 'react';
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from 'react-places-autocomplete';
import {
  IconButton,
  InputAdornment,
  TextField,
} from '@material-ui/core';

import { ListTemplateComponent } from 'components/common/constants/ListTemplate';

interface Props {
  getLatLng: (lat: string, lng: string) => void;
  getLocation: (location: string) => void;
  address: string;
}

interface State {
  location: string;
  lat: string;
  lng: string;
}

export class LocationField extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      location: '',
      lat: '',
      lng: '',
    };
  }

  public componentDidUpdate(prevProps: Props): void {
    if (prevProps.address !== this.props.address) {
      this.setState({
        location: this.props.address
      });
    }
  }

  public handleLocationChange = (location: string) => {
    this.setState({location});
  }

  public handleLocationSelect = (location: string) => {
    this.setState({location}, () => {
      geocodeByAddress(location)
      .then(results => getLatLng(results[0]))
      .then(coordinates => this.setState({
        ...this.state,
        lat: String(coordinates.lat),
        lng: String(coordinates.lng)
      /* tslint:disable */
      }, () => {
        this.props.getLatLng(this.state.lat, this.state.lng);
        this.props.getLocation(this.state.location);
      }))
      /* tslint:enable */
      .catch(error => console.log('Error', error));
    });
  }

  public render () {
    const locationIcon = 'https://nabimusic.s3.us-east-2.amazonaws.com/assets/images/pin-location.png';
    return (
      <PlacesAutocomplete
        value={this.state.location}
        onChange={this.handleLocationChange}
        onSelect={this.handleLocationSelect}
      >
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
          <div className="nabi-full-width">
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
            <div className="filter-autocomplete-suggestion-list nabi-position-absolute">
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
    );
  }
}

export default Location;
