import {
  Button,
  Grid,
  Typography
} from '@material-ui/core';
import DateRangeIcon from '@material-ui/icons/DateRange';
import Schedule from '@material-ui/icons/Schedule';
import Face from '@material-ui/icons/Face';
import MusicNoteIcon from '@material-ui/icons/MusicNote';

import PageTitle from '../common/PageTitle';

export const NewRequest = () => {
  return (
    <div className="nabi-container nabi-margin-bottom-medium">
      <PageTitle pageTitle="NEW STUDENT" />
      <Grid
        item={true}
        xs={12}
        md={8} className="nabi-section nabi-background-white nabi-margin-center"
      >
        <p className="nabi-color-nabi nabi-text-center nabi-jennasue-title nabi-margin-bottom-small nabi-margin-top-xsmall">
          Trial Piano Lesson
        </p>
        <div>
          <DateRangeIcon className="text-aligned-icon" color="primary" />
          <Typography className="nabi-display-inline nabi-margin-left-xsmall">
            Aug 11 @ 7:00AM
          </Typography>
        </div>
        <div>
          <Schedule className="text-aligned-icon" color="primary" />
          <Typography className="nabi-display-inline nabi-margin-left-xsmall">
            30 mins
          </Typography>
        </div>
        <div>
          <MusicNoteIcon className="text-aligned-icon" color="primary" />
          <Typography className="nabi-display-inline nabi-margin-left-xsmall">
            Guitar(Acoustic)
            </Typography>
        </div>
        <div>
          <Face className="text-aligned-icon" color="primary" />
          <Typography className="nabi-display-inline nabi-margin-left-xsmall">
            Matias, 6 year old, beginner
          </Typography>
        </div>
        <div className="nabi-text-right nabi-margin-top-large">
          <Button color="default" className="nabi-margin-right-xsmall">
            Decline
            </Button>
          <Button color="primary" variant="contained">
            Accept
          </Button>
        </div>
      </Grid>
    </div>
  )
}
