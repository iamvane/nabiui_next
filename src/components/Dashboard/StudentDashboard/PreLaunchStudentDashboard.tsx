import * as React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { Typography } from '@material-ui/core';

import { StoreState } from 'redux/store';
import { Routes } from 'components/common/constants/Routes';

import SectionTitle from 'components/common/SectionTitle';
import { PreLaunchStudentDashboardComponent as constants } from 'components/Dashboard/constants';
import InviteFriends from 'components/InviteFriends/InviteFriends';
import { Role } from 'components/common/constants/Registration';
import StudentCard from 'components/Dashboard/StudentDashboard/StudentCard';
import { UserType } from 'redux/models/UserModel';
import {
  StudentDetailsType,
  ParentProfileType
} from 'components/Dashboard/StudentDashboard/model';

interface OwnProps {
}

interface State {
  showStudentForm: boolean;
  isEditing: boolean;
}

interface StateProps {
  user: UserType;
  profile: StudentDetailsType | ParentProfileType;
}

interface Props extends
  OwnProps,
  StateProps { }

export class PreLaunchStudentDashboard extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      showStudentForm: false,
      isEditing: false,
    };
  }

  render() {
    return (
      <div className="nabi-section-widest nabi-background-white nabi-margin-bottom-small">
        <SectionTitle text={constants.studentSectionTitle} />
          {
            this.props.user.role === Role.parent ?
            this.props.profile &&
            (this.props.profile as ParentProfileType).students.map((student: StudentDetailsType, i: number, ) =>
              <StudentCard
                key={i}
                editStudent={() => console.log()}
                deleteStudent={() => console.log()}
                user={this.props.user}
                student={student}
                noEdit={true}
              /> ) :
              <StudentCard
                editStudent={() => console.log()}
                deleteStudent={() => console.log()}
                user={this.props.user}
                student={this.props.profile as StudentDetailsType}
                noEdit={true}
              />}
          <Typography className="nabi-margin-top-small">
            <Link to={`${Routes.BuildRequest}/student-details`}>Edit Student Details</Link>
          </Typography>
        <InviteFriends />
      </div>
    );
  }
}

const mapStateToProps = (state: StoreState, _ownProps: OwnProps): StateProps => {
  const { user } = state.user;

  return {
    user,
    profile: state.user.user.profile as StudentDetailsType | ParentProfileType
  };
};

export default connect(mapStateToProps, {})(PreLaunchStudentDashboard);
