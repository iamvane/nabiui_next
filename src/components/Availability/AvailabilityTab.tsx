import React from 'react';

import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';

import { ProfileContentComponent } from '../Profile/constants';
import { AvailabilityComponent } from './constants';
import { AvailabilityType } from './model';

interface TabPanelProps {
  children?: React.ReactNode;
  index: any;
  value: any;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div hidden={value !== index} className="nabi-background-color nabi-padding-top-small nabi-padding-left-xsmall nabi-padding-bottom-small nabi-margin-bottom-small">
      <Typography>{value === index && children}</Typography>
    </div>
  );
}

function a11yProps(index: any) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function AvailabilityTab(availability: AvailabilityType) {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  const availabilityObj = availability.availability;

  var keys = Object.keys(availabilityObj);

  var filtered = keys.filter(function(key) {
      return availabilityObj[key]
  });

  const timeItems = (day: Object) =>  {
    let availableTimes = [];
    filtered.map(item => day[item] && availableTimes.push(day[item]))
    if (availableTimes.length > 0) {
      return availableTimes.join(', ')
    } else {
      return 'Not available.'
    }
  }

  return (
    <div>
      <AppBar position="static">
        <Tabs value={value} onChange={handleChange} aria-label="availability">
          <Tab label={AvailabilityComponent.WeekdaysFirstAbbr.Monday} {...a11yProps(0)} />
          <Tab label={AvailabilityComponent.WeekdaysFirstAbbr.Tuesday} {...a11yProps(1)} />
          <Tab label={AvailabilityComponent.WeekdaysFirstAbbr.Wendesday} {...a11yProps(2)} />
          <Tab label={AvailabilityComponent.WeekdaysFirstAbbr.Thursday} {...a11yProps(3)} />
          <Tab label={AvailabilityComponent.WeekdaysFirstAbbr.Friday} {...a11yProps(4)} />
          <Tab label={AvailabilityComponent.WeekdaysFirstAbbr.Saturday} {...a11yProps(5)} />
          <Tab label={AvailabilityComponent.WeekdaysFirstAbbr.Sunday} {...a11yProps(6)} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        {timeItems(ProfileContentComponent.monday)}
      </TabPanel>
      <TabPanel value={value} index={1}>
        {timeItems(ProfileContentComponent.tuesday)}
      </TabPanel>
      <TabPanel value={value} index={2}>
        {timeItems(ProfileContentComponent.wednesday)}
      </TabPanel>
      <TabPanel value={value} index={3}>
        {timeItems(ProfileContentComponent.thursday)}
      </TabPanel>
      <TabPanel value={value} index={4}>
        {timeItems(ProfileContentComponent.friday)}
      </TabPanel>
      <TabPanel value={value} index={5}>
        {timeItems(ProfileContentComponent.saturday)}
      </TabPanel>
      <TabPanel value={value} index={6}>
        {timeItems(ProfileContentComponent.sunday)}
      </TabPanel>
    </div>
  );
}