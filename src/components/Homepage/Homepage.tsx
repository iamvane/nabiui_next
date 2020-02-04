import * as React from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import Router from "next/router";
import Head from 'next/head';

import { StoreState } from "../../redux/reducers/store";
import { page } from "../../utils/analytics";
import { UserType } from "../../redux/models/UserModel";
import { Routes } from "../common/constants/Routes";
import { pageTitlesAndDescriptions } from '../common/constants/TitlesAndDescriptions';
import Banner from "./Banner";
import Features from "./Features";
import Testimonials from "./Testimonials";
import BecomeATeacher from "./BecomeATeacher";
import FreeLesson from "./FreeLesson";
import { useRouter } from "next/router";
import ReferralModal from "../Referral/ReferralModal";
import PrivateRoute from '../Auth/PrivateRoutes';
import { fetchReferralInfo } from "../../redux/actions/UserActions";

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

export interface Props extends StateProps {} // RouteComponentProps<{}>,

export const Homepage = (props: Props) => {
  const { query } = useRouter();
  const dispath = useDispatch();
  const [openModal, setOpenModal] = React.useState(false);
  const referralInfo = useSelector(
    (state: StoreState) => state.user.referralInfo
  );

  const { error } = useSelector(
    (state: StoreState) => state.user.actions.fetchReferralInfo
  );

  React.useEffect(() => {
    if (error) {
      setOpenModal(false);
    } else {
      if (props.token) {
        Router.push(Routes.Dashboard);
      }

      if (query.token) {
        dispath(fetchReferralInfo(query.token));
        setOpenModal(true);
      } else {
        const userId = props.user ? props.user.email : "anonymous";

        const analiticsProps = {
          userId,
          properties: {
            referrer: document.referrer
          }
        };
        page("Home", analiticsProps);
      }
    }
  }, [error]);

  const docTitle = referralInfo.displayName ? pageTitlesAndDescriptions.referral.title :
    pageTitlesAndDescriptions.homepage.title;
  const docDescription =  referralInfo.displayName ? pageTitlesAndDescriptions.referral.description :
    pageTitlesAndDescriptions.homepage.description;
  return (
    <div>
      <Head>
        <title>{docTitle}</title>
        <meta name="description" content={docDescription}></meta>
      </Head>
      <Banner referralInfo={referralInfo} error={error} />
      <Features />
      <Testimonials />
      <BecomeATeacher />
      <FreeLesson />
      <ReferralModal
        isOpen={openModal}
        handleClose={() => setOpenModal(false)}
      />
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

export default connect(mapStateToProps, undefined)(PrivateRoute(Homepage, 'Public'));
