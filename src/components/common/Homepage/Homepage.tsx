import * as React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import { StoreState } from '../../../redux/reducers/store';
import Banner from './Banner';
import PopularInstruments from './PopularInstruments';
import BecomeATeacher from './BecomeATeacher';
import { UserType } from '../../../redux/models/UserModel';
import { Routes } from '../constants/Routes';
import { page } from '../../../utils/analytics';

/**
 * Homepage component
 */

export interface State {
  performRedirect: boolean;
}

interface StateProps {
  user: UserType;
}

export interface Props extends
  // RouteComponentProps<{}>,
  StateProps { }

export class Homepage extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      performRedirect: false
    };
  }

  public componentDidMount() {
    const userId = this.props.user ? this.props.user.email : 'anonymous';

    const analiticsProps = {
      userId,
      properties: {
        referrer: document.referrer
      }
    };
    page('Home', analiticsProps);
  }

  public componentDidUpdate(prevProps: Props): void {
    if (prevProps.user !== this.props.user && this.props.user.email) {
      this.setState({performRedirect: true});
    }
  }

  public render() {
    return (
      <div>
        <Banner />
        <PopularInstruments />
        <BecomeATeacher />
        {this.state.performRedirect && <Redirect to={Routes.Dashboard} />}
      </div>
    );
  }
}

const mapStateToProps = (state: StoreState, _ownProps: {}): StateProps => {
  const {
    user
  } = state.user;

  return {
    user,
  };
};

export default connect(mapStateToProps, undefined)(Homepage);
