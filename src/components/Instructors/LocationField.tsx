import * as React from 'react';
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from 'react-places-autocomplete';
import {
  IconButton,
  InputAdornment,
  TextField,
  Typography
} from '@material-ui/core';

import { ListTemplateComponent } from '../common/constants/ListTemplate';

interface Props {
  getLatLng: (lat: string, lng: string) => void;
  getLocation: (location: string) => void;
  address: string;
  getLocationError?: (error: string) => void;
  error?: string;
}

interface State {
  location: string;
  lat: string;
  lng: string;
  error: string;
}

export class LocationField extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      location: '',
      lat: '',
      lng: '',
      error: ''
    };
  }

  public componentDidMount(): void {
    if (this.props.address) {
      geocodeByAddress(this.props.address)
        .then(results => getLatLng(results[0]))
        .then(coordinates => {
          this.setState({
            ...this.state,
            lat: String(coordinates.lat),
            lng: String(coordinates.lng)
          });
          this.props.getLatLng(String(coordinates.lat), String(coordinates.lng));
          this.props.getLocation(this.state.location);
        });
      this.setState({
        location: this.props.address
      });
    }
    this.setState({
      error: this.props.error
    });
  }

  public componentDidUpdate(prevProps: Props): void {
    if (prevProps.address !== this.props.address) {
      this.setState({
        location: this.props.address
      });
    }

    if (prevProps.error !== this.props.error) {
      this.setState({
        error: this.props.error
      })
    }
  }

  public handleLocationChange = (location: string) => {
    this.setState({ location, error: '' });
  }

  public handleLocationSelect = (location: string) => {
    this.setState({ location }, () => {
      geocodeByAddress(location)
        .then(results => getLatLng(results[0]))
        .then(coordinates => {
          this.setState({
            ...this.state,
            lat: String(coordinates.lat),
            lng: String(coordinates.lng)
          });
          this.props.getLatLng(String(coordinates.lat), String(coordinates.lng));
          this.props.getLocation(this.state.location);
        })
        .catch(error => {
          this.props.getLocation('');
          this.setState({ error: 'Enter a valid location.' })
          this.props.getLocationError && this.props.getLocationError('Enter a valid location.')
          console.log('Error', error)
        });
    });
  }

  public render() {
    const locationIcon = 'https://nabimusic.s3.us-east-2.amazonaws.com/assets/images/pin-location.png';
    return (
      <div>
        <PlacesAutocomplete
          value={this.state.location}
          onChange={this.handleLocationChange}
          onSelect={this.handleLocationSelect}
        >
          {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
            <div className="nabi-full-width">
              <TextField
                {...getInputProps({
                  variant: "standard",
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
              <div className="nabi-z-index-1 nabi-position-absolute">
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
        {this.state.error && <Typography color="error" className="nabi-margin-top-xsmall">{this.state.error}</Typography>}
      </div>
    );
  }
}

export default LocationField;
