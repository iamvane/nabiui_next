import * as React from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import Router from "next/router";
import Head from 'next/head';
import Link from "next/link";

import { Button, Typography, Grid } from "@material-ui/core";

import { StoreState } from "../../redux/reducers/store";
import { page } from "../../utils/analytics";
import { UserType } from "../../redux/models/UserModel";
import { getCookie } from "../../utils/cookies";
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
import { Role } from '../Auth/Registration/constants';

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

export interface Props extends StateProps { } // RouteComponentProps<{}>,

export const Home = (props: Props) => {
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
    if (referralInfo.openModal) {
      setOpenModal(true);
    }
    if (props.token) {
      const role = getCookie('role');
      Router.push(role === Role.instructor ? Routes.InstructorStudio : Routes.ParentStudio);
    }

    if (query.token) {
      dispath(fetchReferralInfo(query.token));
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
  }, [error, referralInfo.openModal]);

  const docTitle = referralInfo.displayName ? pageTitlesAndDescriptions.referral.title :
    pageTitlesAndDescriptions.homepage.title;
  const docDescription = referralInfo.displayName ? pageTitlesAndDescriptions.referral.description :
    pageTitlesAndDescriptions.homepage.description;

  const logo =
    "https://nabimusic.s3.us-east-2.amazonaws.com/assets/images/full-logo.png";

  const bannerImage = "https://nabimusic.s3.us-east-2.amazonaws.com/assets/images/nabi-homepage-image-new.jpg";

  return (
    <div className="nabi-background-white">
      <div className="nabi-header-container nabi-position-relative">
        <div>
          <Head>
            <title>{docTitle}</title>
            <meta name="description" content={docDescription}></meta>
          </Head>
        </div>
        <div className="nabi-header-menu">
          How It Works
      </div>

        <div className="nabi-header-button">
          <Link href={Routes.Login} prefetch={false}>
            <a>
              <Button
                color="primary"
                variant="contained"
                className="nabi-responsive-button nabi-margin-left-small"
              >
                Log in
            </Button>
            </a>
          </Link>
        </div>
        <div
          className="nabi-logo-anchor "
        >
          <Link href={Routes.HomePage}>
            <a>
              <>
                <img className="nabi-text-center" alt="logo" src={logo} />
              </>
            </a>
          </Link>
        </div>
        <h2>A vitual music world for children</h2>
        Explore individualized music curriculums for children ages 4-18. Learn music with a live instructor and perform your skills. Join now for a trial lesson.
        <Grid container={true} spacing={1}>
                <Grid item={true} xs={12} md={6}>
                  <Link href={Routes.Registration}>
                    <a>
                      <Button
                        color="primary"
                        variant="contained"
                        className="nabi-full-width"
                      >
                        Start Learning
                      </Button>
                    </a>
                  </Link>
                </Grid>
                <Grid item={true} xs={12} md={6}>
                  <Link href={Routes.Registration}>
                    <a>
                      <Button
                        color="secondary"
                        variant="contained"
                        className="nabi-full-width"
                      >
                        Start Teaching
                      </Button>
                    </a>
                  </Link>
                </Grid>
              </Grid>
        <img className="nabi-text-center" alt="logo" src={bannerImage} />
      </div>
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

export default connect(mapStateToProps, undefined)(PrivateRoute(Home, 'Public'));
