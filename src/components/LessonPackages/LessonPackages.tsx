import * as React from 'react';
import { connect } from 'react-redux';
import {
  Action,
  Dispatch
} from 'redux';
import Link from 'next/link';

import {
  Button,
  Card,
  Divider,
  Grid,
  Typography,
} from '@material-ui/core';

import { fetchLowestRate } from '../../redux/actions/UserActions';
import { StoreState } from '../../redux/reducers/store';
import { Routes } from '../common/constants/Routes';
import PageTitle from '../common/PageTitle';
import { BookLessonsComponent } from '../BookLessons/constants';
import * as constants from './constants';

interface StateProps {
  lowestRate: number;
  isRequesting: boolean;
  error: string;
}

interface DispatchProps {
  fetchLowestRate: () => void;
}

interface OwnProps {
}

interface Props extends
  DispatchProps,
  StateProps { }

export class Pricing extends React.Component<Props, {}> {
  public componentDidMount(): void {
    this.props.fetchLowestRate();
  }

  public render(): JSX.Element {
    return (
      <div className="nabi-container nabi-text-center">
        <PageTitle pageTitle={constants.pageTitle} />

        <div className="nabi-section nabi-padding-top-zero">
          <Typography className="">
            {constants.description}
          </Typography>
          <Typography className="">
            {constants.descriptionSecond}
          </Typography>
           <Typography color="primary" className="nabi-text-center nabi-margin-bottom-medium">
            {BookLessonsComponent.satisfactionGuaranteed}
          </Typography>
          <div>
            <Grid container={true} direction="row" alignItems="center" spacing={1} justify="space-around">
              {BookLessonsComponent.bookLessonPackages.map((lessonPackage, i) => (
                <Grid item={true} xs={12} md={4} key={lessonPackage.name}>
                  <div>
                    <p
                      color={constants.cardTextColors[i] === 'nabi-color-nabi' ? 'primary' : undefined}
                      // tslint:disable-next-line:max-line-length
                      className={`${constants.cardTextColors[i]} nabi-text-center nabi-font-medium nabi-text-uppercase nabi-margin-bottom-small nabi-text-mediumbold`}
                    >
                      {lessonPackage.name}
                    </p>
                    <Grid
                      item={true}
                      xs={8}
                      md={12}
                      className="nabi-margin-center nabi-margin-bottom-small"
                    >
                    {/* tslint:disable-next-line:max-line-length */}
                      <Card className={`${constants.cardBackgroundColors[i]} nabi-text-center nabi-book-lessons-card`}>
                        <p className="nabi-font-medium nabi-text-uppercase nabi-color-white nabi-margin-top-zero nabi-margin-bottom-zero">
                          {lessonPackage.lessonNumber} {BookLessonsComponent.lessons}
                        </p>
                        <Divider className="nabi-margin-top-xsmall" />
                        {/* <Typography
                          variant="h5"
                          className="nabi-color-white nabi-font-medium nabi-margin-top-xsmall"
                        >
                          {constants.lessonCost.replace(
                            constants.lessonCostPlaceholer,
                            String(this.props.lowestRate)
                          )}
                        </Typography> */}
                        <Typography
                          className="nabi-color-white nabi-margin-top-xsmall"
                        >
                          {constants.includes}
                        </Typography>
                        <Typography

                          className="nabi-color-white nabi-font-small nabi-margin-top-xsmall"
                        >
                          -{" "} {constants.lessonQuantities[i]} {constants.lessonIncluded}
                        </Typography>
                        <Typography
                          className="nabi-color-white nabi-font-small nabi-margin-top-xsmall"
                        >
                          {constants.freeTrial}
                        </Typography>
                        <Typography
                          className="nabi-color-white nabi-font-small nabi-margin-top-xsmall"
                        >
                          {constants.matchingAndBooking}
                        </Typography>
                        <Typography
                          className="nabi-color-white nabi-font-small nabi-margin-top-xsmall"
                        >
                          {constants.backgroundCheckedInstructors}
                        </Typography>
                        <Typography
                          className="nabi-color-white nabi-font-small nabi-margin-top-xsmall"
                        >
                          {constants.instructorsList}
                        </Typography>
                        {i === 2 &&
                          <Typography
                            className="nabi-color-white nabi-font-small nabi-margin-top-xsmall"
                          >
                            {constants.tenOff}
                          </Typography>
                        }
                        {/* <Divider className="nabi-margin-top-xsmall" />
                        <Typography
                          variant="h5"
                          className="nabi-color-white nabi-margin-top-large nabi-margin-bottom-small"
                        >
                          {BookLessonsComponent.packageCost.replace(
                            BookLessonsComponent.packageCostPlaceholer,
                            i === 2 ?
                            // tslint:disable-next-line:max-line-length
                            String((lessonPackage.lessonNumber * this.props.lowestRate) - ((lessonPackage.lessonNumber * this.props.lowestRate ) * .10)) : 
                            String(lessonPackage.lessonNumber * this.props.lowestRate)
                          )}
                        </Typography> */}
                      </Card>
                    </Grid>
                  </div>
                </Grid>
              ))}
            </Grid>
          </div>
          <Link href={Routes.Registration}>
            <a>
              <Button className="nabi-margin-top-medium" variant="contained" color="primary">{constants.button}</Button>
            </a>
          </Link>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state: StoreState, _ownProps: OwnProps): StateProps {
  const {
    lowestRate,
    actions: {
      fetchLowestRate: {
        isRequesting,
        error
      }
    },
  } = state.user;

  return {
    lowestRate: lowestRate || 0,
    isRequesting,
    error
  };
}

const mapDispatchToProps = (
  dispatch: Dispatch<Action>,
  _ownProps: OwnProps
): DispatchProps => ({
  fetchLowestRate: () => dispatch(fetchLowestRate()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Pricing);
