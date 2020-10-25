import * as React from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import Router from "next/router";
import Head from 'next/head';
import Link from "next/link";

import { Avatar, Button, Typography, Grid } from "@material-ui/core";
import Menu from "@material-ui/icons/Menu";

import dynamic from "next/dynamic";
const Star = dynamic(() => import('@material-ui/icons/Star'), {
  ssr: false,
});

import "../../../assets/scss/Home.scss";
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
import { HomeComponent } from './constants/Home';
import SocialMenu from '../common/SocialMenu';
import { CollapsibleSidebar } from "../CollapsibleSidbar/CollapsibleSidbar";
import { DrawerMenu } from "../Header/DrawerMenu";

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
  const [isDrawerMenuOpen, setIsDraweMenuOpen] = React.useState(false);
  const [isStudentParentMenuOpen, setStudentParentMenuOpen] = React.useState(
    false
  );

  const docTitle = pageTitlesAndDescriptions.homepage.title;
  const docDescription = pageTitlesAndDescriptions.homepage.description;

  const logo =
    "https://nabimusic.s3.us-east-2.amazonaws.com/assets/images/full-logo.png";

  const bannerImage = "https://nabimusic.s3.us-east-2.amazonaws.com/assets/images/nabi-homepage-image-new.jpg";
  const bannerImg = "https://nabimusic.s3.us-east-2.amazonaws.com/assets/images/nabiBannerImage.jpg";

  const toggleDrawerMenu = () => {
    setIsDraweMenuOpen(prevOpen => !prevOpen);
  };

  const displayRatingStars = (reviewsNumber: number) => {
    let ratingStars: JSX.Element[] = [];
    for (let i = 0; i < 5; i++) {
      if (i < reviewsNumber) {
        ratingStars.push(<Star key={i} className="featured-instructor-rating" />);
      } else {
        ratingStars.push(<Star color="secondary" className="featured-instructor-rating" key={i} />);
      }
    }
    return ratingStars;
  };

  return (
    <div>
      <div>
        <Head>
          <title>{docTitle}</title>
          <meta name="description" content={docDescription}></meta>
        </Head>
      </div>
      <div className="nabi-background-white nabi-hide-mobile">
        <div className="nabi-container nabi-position-relative nabi-background-white">
          <Grid container={true} spacing={1} className="nabi-padding-top-xsmall">
            <Grid item={true} xs={4} md={1}>
              <Link href={Routes.HomePage}>
                <a>
                  <img className="nabi-responsive-image" alt="logo" src={logo} id="logo"/>
                </a>
              </Link>
            </Grid>
            <Grid item={true} xs={8} className="hide-on-desktop nabi-text-right menu-container">
              <Menu onClick={toggleDrawerMenu} color="primary" />
              <DrawerMenu
                isOpen={isDrawerMenuOpen}
                closeMenu={toggleDrawerMenu}
              />
            </Grid>
            <Grid item={true} xs={11} className="nabi-text-right menu-container hide-on-mobile">
              <Link href={Routes.HowItWorksParents} prefetch={false}>
                <a className="nabi-text-mediumbold nabi-margin-right-small">
                  {HomeComponent.howItWorks}
                </a>
              </Link>
              <Link href={Routes.RegistrationInstructor} prefetch={false}>
                <a className="nabi-text-mediumbold nabi-margin-right-small">
                  {HomeComponent.teach}
                </a>
              </Link>
              <Link href={Routes.Login} prefetch={false}>
                <a className="nabi-text-mediumbold">
                  {HomeComponent.login}
                </a>
              </Link>
            </Grid>
          </Grid>
        </div>
      </div>
      <section id="banner-new" className="nabi-position-relative">
        <div className="nabi-container">
          <Grid container={true} spacing={1}>
            <Grid item={true} xs={8} md={6}>
              <h2 className="banner-heading">{HomeComponent.valueHeading}</h2>
              <Link href={Routes.RegistrationParentStudent}>
                <a>
                  <Button
                    color="primary"
                    variant="contained"
                  >
                    {HomeComponent.cta}
                  </Button>
                </a>
              </Link>
              <p>{HomeComponent.noCard}</p>
            </Grid>
          </Grid>
        </div>
      </section>
      <div className="nabi-background-white">
        <div className="nabi-container nabi-padding-top-small nabi-padding-bottom-large">
          <Grid item={true} xs={12} md={6} className="nabi-margin-center nabi-text-center">
            <h2>
              {HomeComponent.oneOnOne}
            </h2>
            <p>
              {HomeComponent.progress}
            </p>
          </Grid>
          <Grid container={true} className="nabi-margin-top-xlarge nabi-margin-bottom-small">
            {
              HomeComponent.featuredInstructors.map((item, i) => (
                <Grid md={3} item={true} key={i}>
                  <div className="featured-instructor-wrapper nabi-margin-center">
                    <Grid container={true} className="nabi-text-center">
                      <Grid item={true} xs={12}>
                        <Avatar alt={item.name} src={item.avatar} className="featured-avatar nabi-margin-center" />
                        <span className="nabi-text-mediumbold nabi-display-block">{item.name}</span>
                        <div>{item.experience} YRS EXP | {item.age} YRS OLD</div>
                        {displayRatingStars(item.rating)}<span className="nabi-color-orange featured-reviews-number">({item.numberOfReviews})</span>
                        <div className="featured-insrtuments">
                          {item.instruments.map((instrument, i) =>
                            <span key={i} className="featured-instrument">{instrument}</span>
                          )}
                        </div>
                      </Grid>
                      <Grid container={true} className="stats-wrapper">
                        <Grid item={true} xs={4}>
                          <p className="stats-label nabi-text-mediumbold">Rate</p>
                        </Grid>
                        <Grid item={true} xs={4}>
                          <p className="stats-label nabi-text-mediumbold">Lessons Taught</p>
                        </Grid>
                        <Grid item={true} xs={4}>
                          <p className="stats-label nabi-text-mediumbold">Verified</p>
                        </Grid>
                        <Grid item={true} xs={4}>
                          <span className="nabi-color-nabi nabi-text-mediumbold">${item.rate}</span>
                        </Grid>
                        <Grid item={true} xs={4}>
                          <span className="nabi-color-nabi nabi-text-mediumbold">{item.lessonsTaught}</span>
                        </Grid>
                        <Grid item={true} xs={4}>
                          <span className="nabi-color-nabi nabi-text-mediumbold">Yes</span>
                        </Grid>
                      </Grid>
                      <Link href={Routes.RegistrationParentStudent} prefetch={false}>
                        <a className="nabi-full-width">
                          <Button
                            color="primary"
                            variant="contained"
                            className="nabi-margin-top-medium featured-button"
                            fullWidth={true}
                          >
                            Book Trial
                          </Button>
                        </a>
                      </Link>
                    </Grid>
                  </div>
                </Grid>
              ))
            }
          </Grid>
        </div>
      </div>

      <Testimonials />
      <div className="nabi-container nabi-background-color">
        <Grid container={true} className="nabi-padding-bottom-small">
          <Grid item={true} xs={12} className="nabi-text-center nabi-text-left-md">
            © Nabi Music 2020.
          </Grid>
          <Grid item={true} xs={12} md={6} className="nabi-text-center nabi-text-left-md nabi-margin-top-small">
            <Link href={Routes.TermsOfUse} prefetch={false}>
              <a className="nabi-text-mediumbold nabi-margin-right-small">
                Terms
            </a>
            </Link>
            <Link href={Routes.ContactUs} prefetch={false}>
              <a className="nabi-text-mediumbold">
                Contact
            </a>
            </Link>
          </Grid>
          <Grid item={true} xs={12} md={6} className="nabi-text-center nabi-text-right-md nabi-margin-top-small">
            <SocialMenu />
          </Grid>
        </Grid>
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
