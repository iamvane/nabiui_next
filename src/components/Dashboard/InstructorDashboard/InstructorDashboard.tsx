import * as React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import {
  Button,
  Divider,
  Typography,
} from '@material-ui/core';

import { StoreState } from 'redux/store';
import { checkErrors } from 'utils/checkErrors';
import { Routes } from 'components/common/constants/Routes';
import SectionTitle from 'components/common/SectionTitle';
import {
  BuyMoreLessonsModalComponent,
  InstructorDashboardComponent
} from 'components/Dashboard/constants';
import RequestCard from 'components/Request/RequestCard';
import StudentCard from 'components/Dashboard/InstructorDashboard/StudentCard';
import {
  studentMockData,
  // studentMockDataEmpty
} from 'components/Dashboard/mockdata';
import BuyMoreLessons from 'components/Dashboard/InstructorDashboard/BuyMoreLessons';

interface OwnProps {
}

interface State {
  openBuyLessonsModal: boolean;
  lessonRate: string;
  lessonDuration: string;
  // TODO: set to StudentType when api integration is done
  selectedStudent: any;
  errors: BuyMoreLessonsModalComponent.BuyMoreLessonsErrors;
}

interface StateProps {
  // TODO: set to RequestType when api integration is done
  requests: any;
}

interface Props extends OwnProps, StateProps {}

export class InstructorDashboard extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      openBuyLessonsModal: false,
      lessonRate: '0.00',
      selectedStudent: {},
      lessonDuration: '45 mins',
      errors: {}
    };
  }

  public openBuyLessonsForm = (student: any) => {
    this.setState({
      selectedStudent: student,
      openBuyLessonsModal: true
    });
  }
  public closeBuyLessonsForm = () => {
    this.setState({
      openBuyLessonsModal: false
    });
  }

  public handleChange = (event: React.FormEvent<HTMLInputElement>): void => {
    const target = event.currentTarget;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      ...this.state,
      [name]: value
    });
  }

  public validateLessonRate = (values: BuyMoreLessonsModalComponent.BuyMoreLessonsErrors ) => {
    const {
      lessonRate
    } = values;

    const { FieldKey } = BuyMoreLessonsModalComponent;

    const formErrors: BuyMoreLessonsModalComponent.BuyMoreLessonsErrors = {
      lessonRate: ''
    };

    // Validate lesson rate
    if (Number(lessonRate) === 0.00) {
      formErrors.lessonRate = BuyMoreLessonsModalComponent.errorMessages[FieldKey.LessonRate];
    }
    return formErrors;
  }

  public handleSubmit = (event: React.SyntheticEvent<HTMLInputElement>): void => {
    if (event) {
      event.preventDefault();
    }

    const valuesToValidate: BuyMoreLessonsModalComponent.BuyMoreLessonsErrors = {
      lessonRate: this.state.lessonRate,
    };

    const formErrors = this.validateLessonRate(valuesToValidate);

    this.setState({errors: formErrors}, () => {
      const errorsArray = Object.values(this.state.errors);
      const isError = checkErrors(errorsArray);
      if (!isError) {
        // TODO: handle send reminder here
        console.log('reminder sent');
      }
    });
  }

  render() {
    const mockData = studentMockData; // set to studentMockDataEmpty to view empty view

    return (
      <React.Fragment>
        <div className="nabi-section-widest nabi-background-white nabi-margin-bottom-small">
          <SectionTitle text={InstructorDashboardComponent.myStudents} />
          {mockData.length > 0 ?
            mockData.map((student, i) => (
              <React.Fragment key={i}>
                <StudentCard
                  student={student}
                  toggleBuyLessonsForm={() => this.openBuyLessonsForm(student)}
                />
                {i !== mockData.length - 1 && <Divider className="nabi-margin-bottom-xsmall" />}
              </React.Fragment>
            )) :
            <React.Fragment>
              <Typography>{InstructorDashboardComponent.noStundets}</Typography>
              <Link
                className="nabi-cursor-pointer"
                to={Routes.Requests}
              >
                <Button
                  color="primary"
                  className="nabi-responsive-button nabi-margin-top-xsmall"
                  variant="contained"
                >
                  {InstructorDashboardComponent.findJobsButton}
                </Button>
              </Link>
            </React.Fragment>
          }
        </div>
        {this.props.requests.length > 0 &&
          <div className="nabi-section-widest nabi-background-white">
            <SectionTitle
              text={InstructorDashboardComponent.applyToJobs}
              cta={
                <Link to={Routes.Requests}>
                  <Typography>{InstructorDashboardComponent.viewAll}</Typography>
                </Link>}
            />
            {this.props.requests.map((request: any, i: number) => (
              <React.Fragment key={i}>
                <RequestCard request={request} />
                {i !== this.props.requests.length - 1 && <Divider className="nabi-margin-bottom-xsmall" />}
              </React.Fragment>
            ))}
          </div>
        }
        <BuyMoreLessons
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
          closeHandler={this.closeBuyLessonsForm}
          isOpen={this.state.openBuyLessonsModal}
          student={this.state.selectedStudent}
          lessonRate={this.state.lessonRate}
          lessonDuration={this.state.lessonDuration}
          error={this.state.errors.lessonRate}
        />
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state: StoreState, _ownProps: OwnProps): StateProps => {
  return {
    requests: state.requests.requests,
  };
};

export default connect(mapStateToProps, {})(InstructorDashboard);
