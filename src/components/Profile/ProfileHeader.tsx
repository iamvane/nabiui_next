import * as React from 'react';

import {
  Avatar,
  Grid,
  Icon,
  IconButton,
  Typography,
  TextField,
  Button
} from '@material-ui/core';

import { UserType } from '../../redux/models/UserModel';
import { RatesType } from '../Rates/model';
import EditInstrumentsModal from '../Profile/EditInstrumentsModal';
import { BioComponent } from '../Bio/constants';
import { InstrumentsType } from '../Instruments/model';
import { ProfileHeaderComponent } from './constants';
import EditRatesModal from './EditRatesModal';

interface Props {
  bioTitle: string;
  avatarImage: any;
  displayName: string;
  reviews: number;
  experience: number;
  backgroundCheck: boolean;
  favorite: boolean;
  rates: RatesType;
  memberSince: number;
  lessonsTaught: number;
  age: number;
  user: UserType;
  showBioTitleForm?: boolean;
  showInstrumentsForm: boolean;
  showRatesForm: boolean;
  instruments: InstrumentsType[];
  instrument: string;
  skillLevel: string;
  notEditable?: boolean;
  addInstrument: (event: React.FormEvent<{}>) => void;
  deleteInstrument: (instrument: string) => void;
  toggleBioTitleForm: () => void;
  cancelNameEdition: () => void;
  toggleRatesForm: () => void;
  toggleInstrumentsForm: () => void;
  handleSave: (event: React.FormEvent<{}>) => void;
  handleChange: (event: React.FormEvent<{}>) => void;
  changeAvatar( avatar: string ): void;
}

interface State {
  isViewMore: boolean;
}

/**
 * Profile Header
 */
class ProfileHeader extends React.Component<Props, State>  {
  constructor(props: Props) {
    super(props);
    this.state = {
      isViewMore: false
    };
  }

  public render(): JSX.Element {
    const defaultAvatar = 'https://nabimusic.s3.us-east-2.amazonaws.com/assets/images/nabi-default-avatar.png';
    const BackgroundCheckIcon = 'https://nabimusic.s3.us-east-2.amazonaws.com/assets/images/nabi-background-check.svg';
    const toggleTeaches = () => { this.setState({ isViewMore: !this.state.isViewMore }); };
    const {
      bioTitle,
      avatarImage,
      displayName,
      reviews,
      experience,
      age,
      rates,
      memberSince,
      backgroundCheck,
      favorite,
      lessonsTaught,
      instruments
    } = this.props;

    const displayRatingStars = (reviewsNumber: number) => {
      let ratingStars: JSX.Element[] = [];
      for (let i = 0; i < 5; i++ ) {
        if (i < reviewsNumber) {
          ratingStars.push(<Icon key={i}>star</Icon>);
        } else {
          ratingStars.push(<Icon color="disabled" key={i}>star</Icon>);
        }
      }
      return ratingStars;
    };

    let instrumentItems = instruments && instruments.map((instrument: any) => {
      let instrumentItem = [];
      // tslint:disable-next-line:max-line-length
      instrumentItem.push(instrument.name.charAt(0).toUpperCase() + instrument.name.slice(1) + ' (' + instrument.skillLevel + ')');
      return (
        instrumentItem
      );
    });

    const formattedRates = {
      mins30: parseFloat(rates.mins30.toString()).toFixed(2),
      mins45: parseFloat(rates.mins45.toString()).toFixed(2),
      mins60: parseFloat(rates.mins60.toString()).toFixed(2),
      mins90: parseFloat(rates.mins90.toString()).toFixed(2),
    };

    const renderBioTitleForm = (): JSX.Element => (
      <div>
        <TextField
          // onChange={this.props.handleChange}
          id={BioComponent.Ids.BioTitle}
          margin="normal"
          fullWidth={true}
          name={BioComponent.FieldNames.BioTitle}
          required={true}
          value={this.props.bioTitle}
        />
        <Button variant="contained" onClick={this.props.handleSave} color="primary">
          <Icon className="nabi-margin-right-xsmall">save</Icon>
          {ProfileHeaderComponent.Text.Save}
        </Button>
        <Button
          onClick={this.props.toggleBioTitleForm}
          color="default"
          variant="contained"
          className="nabi-margin-left-xsmall"
        >
          <Icon className="nabi-margin-right-xsmall">close</Icon>
          {ProfileHeaderComponent.Text.Cancel}
        </Button>
      </div>
    );

    const getRenderedItems = () => {
      if (this.state.isViewMore) {
        return instrumentItems;
      }
      return instrumentItems.slice(0, 2);
    };

    return (
      <Grid container={true}>
        <Grid item={true} md={3} xs={12} className="nabi-text-center nabi-margin-bottom-xsmall">
          <div className="hide-on-desktop nabi-margin-bottom-xsmall">
            {!this.props.showBioTitleForm ?
            <div className={this.props.notEditable ? '' : 'nabi-editable-item'}>
              <div className="nabi-display-inline-block">
                {/*tslint:disable-next-line:max-line-length*/}
                <h1 className={`${this.props.notEditable ? '' : 'nabi-editable-item'} nabi-text-mediumbold  nabi-margin-remove nabi-jennasue-title`}>
                  <mark className="nabi-color-nabi">{bioTitle}</mark>
                </h1>
              </div>
              <div className="nabi-action-buttons">
                <IconButton
                  color="primary"
                  aria-label="Edit"
                  onClick={this.props.toggleBioTitleForm}
                >
                  <Icon>edit</Icon>
                </IconButton>
              </div>
            </div>
            : renderBioTitleForm()}
          </div>
          <div className={this.props.notEditable ? '' : 'nabi-editable-item'}>
            <div className="nabi-display-inline-block">
              <Avatar alt={displayName} src={avatarImage ? avatarImage : defaultAvatar} className="profile-avatar"/>
              {/*tslint:disable-next-line:max-line-length*/}
              {/* <AvatarUploader originalImage={avatarImage} imageChanged={(avatarImg: string) => { this.props.changeAvatar(avatarImg); }} /> */}
            </div>
            <div className="nabi-action-buttons nabi-position-absolute">
              <label className="nabi-cursor-pointer" htmlFor="nabi-image-cropper">
                <IconButton
                  color="primary"
                  aria-label="Edit"
                >
                  <label className="nabi-cursor-pointer" htmlFor="nabi-image-cropper">
                    <Icon>edit</Icon>
                  </label>
                </IconButton>
              </label>
            </div>
          </div>
          <div className="nabi-margin-top-xsmall">
            <Typography
              className={`nabi-text-center nabi-text-mediumbold nabi-margin-bottom-xsmall
              nabi-display-inline-block`}
            >
              <mark>{displayName}</mark>
            </Typography>
          </div>
          <div className="nabi-cursor-pointer nabi-color-nabi">
            {displayRatingStars(reviews)}
            <span className="nabi-color-nabi">{reviews}</span>
          </div>
          <Typography className="nabi-text-uppercase">
            {experience} {ProfileHeaderComponent.Text.YearExperiece} | {age} {ProfileHeaderComponent.Text.YearOld}
          </Typography>
        </Grid>
        <Grid item={true} md={7} xs={12} className="nabi-text-center nabi-text-left-md nabi-padding-left-large-md">
          <Grid container={true}>
            <Grid container={true} item={true} xs={10}>
              <div className="hide-on-mobile">
                {!this.props.showBioTitleForm ?
                <div className={this.props.notEditable ? '' : 'nabi-editable-item'}>
                  <div className="nabi-display-inline-block">
                    {/*tslint:disable-next-line:max-line-length*/}
                    <h1 className={`${this.props.notEditable ? '' : 'nabi-editable-item'} nabi-text-mediumbold  nabi-margin-remove nabi-jennasue-title`}>
                     <mark className="nabi-color-nabi">{bioTitle}</mark>
                    </h1>
                  </div>
                  <div className="nabi-action-buttons nabi-position-absolute">
                    <IconButton
                      color="primary"
                      className="nabi-margin-left-xsmall"
                      aria-label="Edit"
                      onClick={this.props.toggleBioTitleForm}
                    >
                      <Icon>edit</Icon>
                    </IconButton>
                  </div>
                </div>
                : renderBioTitleForm()}
              </div>
            </Grid>
            <Grid
              item={true}
              md={5}
              xs={12}
              className="nabi-text-left-md nabi-margin-bottom-xsmall nabi-margin-top-xsmall"
            >
              <div className={this.props.notEditable ? '' : 'nabi-editable-item'}>
                <Typography
                 className="nabi-text-mediumbold nabi-text-uppercase nabi-color-nabi"
                >
                  {ProfileHeaderComponent.Text.LessonsRates}
                </Typography>
                <Typography className="nabi-display-inline-block">
                  <mark>
                    {ProfileHeaderComponent.rates.ThirtyMinsRate}
                    <span className="nabi-margin-left-xsmall">${formattedRates.mins30}</span><br/>
                    {ProfileHeaderComponent.rates.FortyFiveMinsRate}
                    <span className="nabi-margin-left-xsmall">${formattedRates.mins45}</span><br/>
                    {ProfileHeaderComponent.rates.SixtyMinsRate}
                    <span className="nabi-margin-left-xsmall">${formattedRates.mins60}</span><br/>
                    {ProfileHeaderComponent.rates.NinetyMinsRate}
                    <span className="nabi-margin-left-xsmall">${formattedRates.mins90}</span><br/>
                  </mark>
                </Typography>
                <div className="nabi-action-buttons nabi-position-absolute">
                  <IconButton
                    color="primary"
                    className="nabi-margin-left-xsmall"
                    aria-label="Edit"
                    onClick={this.props.toggleRatesForm}
                  >
                    <Icon>edit</Icon>
                  </IconButton>
                </div>
              </div>
            </Grid>
            <Grid
              item={true}
              xs={9}
              md={6}
              className="nabi-margin-center nabi-margin-bottom-small nabi-margin-top-xsmall"
            >
              <div className={this.props.notEditable ? '' : 'nabi-editable-item'}>
                <Typography className="nabi-display-inline-block">
                  <span className="nabi-color-nabi nabi-text-mediumbold">{ProfileHeaderComponent.Text.Teaches} </span>
                  <mark>{getRenderedItems().join(', ')}</mark>
                  {instrumentItems.length > 2 &&
                    <span
                      className="nabi-color-nabi nabi-cursor-pointer nabi-margin-left-xsmall"
                      onClick={toggleTeaches}
                    >
                      {this.state.isViewMore ?
                        ProfileHeaderComponent.Text.ViewLess :
                        ProfileHeaderComponent.Text.ViewMore}
                    </span>
                  }
                </Typography>
                <div className="nabi-action-buttons nabi-position-absolute">
                  <IconButton
                    color="primary"
                    className="nabi-margin-left-xsmall"
                    aria-label="Edit"
                    onClick={this.props.toggleInstrumentsForm}
                  >
                    <Icon>edit</Icon>
                  </IconButton>
                </div>
              </div>
              <ul className="nabi-padding-left-small">
                <li className="nabi-list nabi-list-style-position-inside">
                  <Typography className="nabi-color-default nabi-display-inline">
                    {ProfileHeaderComponent.Text.MemberSince} {memberSince}
                  </Typography>
                </li>
                <li className="nabi-list nabi-list-style-position-inside">
                  <Typography className="nabi-color-default nabi-display-inline">
                    {lessonsTaught} {ProfileHeaderComponent.Text.LessonsTaught}
                  </Typography>
                </li>
              </ul>
            </Grid>
          </Grid>
        </Grid>
        {/* Start of background check & favorites*/}
        <Grid
          item={true}
          md={2}
          xs={4}
          className="nabi-text-center nabi-padding-left-large-md nabi-margin-center"
        >
          <Grid container={true}>
            <div className="background-check-and-favorites nabi-margin-center">
              <Grid
                item={true}
                xs={12}
                className="nabi-margin-remove"
              >
                <Grid container={true}>
                  <Grid item={true} xs={6} className="nabi-margin-bottom-xsmall">
                    <IconButton
                      color={backgroundCheck ? 'primary' : 'secondary'}
                      className="nabi-margin-right-xsmall"
                    >
                      <img
                        src={BackgroundCheckIcon}
                        className="nabi-custom-button-icon"
                        alt="background-check"
                      />
                    </IconButton>
                  </Grid>
                  <Grid item={true} xs={6} className="nabi-margin-bottom-xsmall">
                    <IconButton
                      color={favorite ? 'primary' : 'secondary'}
                    >
                      <Icon>favorite</Icon>
                    </IconButton>
                  </Grid>
                </Grid>
              </Grid>
            </div>
          </Grid>
        </Grid>
        <EditRatesModal
          isFormDialogOpen={this.props.showRatesForm}
          closeHandler={this.props.toggleRatesForm}
          handleChange={this.props.handleChange}
          handleSubmit={this.props.handleSave}
          mins30={rates.mins30}
          mins45={rates.mins45}
          mins60={rates.mins60}
          mins90={rates.mins90}
        />
        <EditInstrumentsModal
          isFormDialogOpen={this.props.showInstrumentsForm}
          closeHandler={this.props.toggleInstrumentsForm}
          instruments={this.props.instruments}
          instrument={this.props.instrument}
          skillLevel={this.props.skillLevel}
          handleChange={this.props.handleChange}
          handleSubmit={this.props.handleSave}
          addInstrument={this.props.addInstrument}
          deleteInstrument={this.props.deleteInstrument}
        />
      </Grid>
    );
  }
}

export default ProfileHeader;
