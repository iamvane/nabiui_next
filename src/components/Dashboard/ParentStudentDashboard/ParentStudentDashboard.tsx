import * as React from 'react';
import Link from 'next/link';
import { connect } from 'react-redux';

import { Typography } from '@material-ui/core';

import { StoreState } from '../../../redux/reducers/store';
import { UserType } from '../../../redux/models/UserModel';
import { Routes } from '../../common/constants/Routes';

import SectionTitle from '../../common/SectionTitle';
import InviteFriends from '../../InviteFriends/InviteFriends';
import { Role } from '../../Auth/Registration/constants';
import { PreLaunchStudentDashboardComponent as constants } from '../constants';
import StudentCard from './StudentCard';
import {
  StudentDetailsType,
  ParentProfileType
} from './model';

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
            <Link href={`${Routes.BuildRequest}/student-details`}><a>Edit Student Details</a></Link>
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
