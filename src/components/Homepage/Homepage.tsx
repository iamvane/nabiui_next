import * as React from 'react';
import { connect } from 'react-redux';
import Router from "next/router";

import { StoreState } from '../../redux/reducers/store';
import { page } from '../../utils/analytics';
import { UserType } from '../../redux/models/UserModel';
import { Routes } from '../common/constants/Routes';
import Banner from './Banner';
import Features from './Features';
import Testimonials from './Testimonials';
import BecomeATeacher from './BecomeATeacher';
import FreeLesson from './FreeLesson';
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
        <Features />
        <Testimonials />
        <BecomeATeacher />
        <FreeLesson />
        {this.state.performRedirect && Router.push(Routes.Dashboard)}
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
