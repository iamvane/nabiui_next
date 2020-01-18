import * as React from "react";
import { connect } from "react-redux";
import Router from "next/router";

import { StoreState } from "../../redux/reducers/store";
import { page } from "../../utils/analytics";
import { UserType } from "../../redux/models/UserModel";
import { Routes } from "../common/constants/Routes";
import Banner from "./Banner";
import Features from "./Features";
import Testimonials from "./Testimonials";
import BecomeATeacher from "./BecomeATeacher";
import FreeLesson from "./FreeLesson";
import { useRouter } from "next/router";
import ReferralModal from '../Referral/ReferralModal';

/**
 * Homepage component
 */

export interface State {
  performRedirect: boolean;
}

interface StateProps {
  user: UserType;
  token: string;
}

export interface Props
  extends // RouteComponentProps<{}>,
  StateProps {}

export const Homepage = (props: Props) => {
  const { query } = useRouter();
  const [openModal, setOpenModal] = React.useState(false)

  React.useEffect(() => {

    if (query.token) {
      setOpenModal(true)
    }

    const userId = props.user ? props.user.email : "anonymous";

    const analiticsProps = {
      userId,
      properties: {
        referrer: document.referrer
      }
    };
    page("Home", analiticsProps);

    if (props.token) {
      Router.push(Routes.Dashboard);
    }
  }, []);

  return (
    <div>
      <Banner showClaimDiscountBanner={true} />
      <Features />
      <Testimonials />
      <BecomeATeacher />
      <FreeLesson />
      <ReferralModal isOpen={openModal} handleClose={() => setOpenModal(true)}/>
    </div>
  );
};

const mapStateToProps = (state: StoreState, _ownProps: {}): StateProps => {
  const { user, token } = state.user;

  return {
    user,
    token
  };
};

export default connect(mapStateToProps, undefined)(Homepage);
