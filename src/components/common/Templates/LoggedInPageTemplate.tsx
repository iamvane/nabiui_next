import * as React from 'react';
import { Grid } from '@material-ui/core';

import { LessonType, NextLesson } from "../../Dashboard/models"
import PageTitle from '../PageTitle';
import NavigationContainer from '../../Navigation/NavigationContainer';
import { Role } from '../../../constants/Roles';
interface Props {
  sidebarContent: JSX.Element;
  mainContent: JSX.Element;
  pageTitle?: string;
  instructorId?: number;
  role?: string;
  isRequesting?: boolean;
  titlePlaceholder?: string;
  firstName?: string;
  lessons?: LessonType[];
  nextLesson?: NextLesson;
  handleUserLogout?: () => void;
}

export const LoggedInPageTemplate: React.StatelessComponent<Props> = (props) => {
  let pageTitle = props.pageTitle.replace(
    props.titlePlaceholder,
    props.firstName
  );

  pageTitle = props.role !== Role.parent ? pageTitle.replace('Family', '') : pageTitle;
  return (
    <div className="nabi-container nabi-margin-top-small nabi-margin-top-zero-md">
      {props.pageTitle && <PageTitle pageTitle={pageTitle} />}
      <Grid container={true} spacing={4}>
        <NavigationContainer
          role={props.role}
          instructorId={props.instructorId}
          isRequesting={props.isRequesting}
          handleUserLogout={props.handleUserLogout}
          lessons={props.lessons}
          nextLesson={props.nextLesson}
        />
        {/* <NavigationContainer /> */}
        {/* <Grid item={true} xs={12} md={4}>
          <div className="nabi-section-widest nabi-background-white">
            {props.sidebarContent}
          </div>
        </Grid>
        <Grid item={true} xs={12} md={8}>
          {props.mainContent}
        </Grid> */}
      </Grid>
    </div>
  );
};

export default LoggedInPageTemplate;
