import * as React from "react";
import { Action, Dispatch } from "redux";
import { ThunkAction } from "redux-thunk";
import { connect } from "react-redux";
import Router, { useRouter } from "next/router";
import Link from "next/link";
import Head from "next/head";
import { StreamChat } from "stream-chat";

import { Button, Grid, CircularProgress, Typography } from "@material-ui/core";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";

import { getCookie, setCookie } from "../../utils/cookies";
import { track } from "../../utils/analytics";
import { StoreState } from "../../redux/reducers/store";
import { fetchInstructor } from "../../redux/actions/InstructorActions";
import {
  fetchBestMatch,
  assignInstructor,
} from "../../redux/actions/RequestActions";
import { Role } from "../Auth/Registration/constants";
import { Routes } from "../common/constants/Routes";
import { pageTitlesAndDescriptions } from "../common/constants/TitlesAndDescriptions";
import PageTitle from "../common/PageTitle";
import { ProfileComponent } from "./constants";
import ProfileHeader from "./ProfileHeader";
import { Header } from "../Header/Header";
import { Footer } from "../common/Footer";
import { Reviews } from "./Reviews";
import { InstructorProfileType } from "../../redux/models/InstructorModel";
import { page } from "../../utils/analytics";
import SnackBar from "../common/SnackBar";
import { Experience } from "./Experience";
import { UserType } from "../../redux/models/UserModel";
import { fetchUser } from "../../redux/actions/UserActions";

interface StateProps {
  isFetchingBestMatch: boolean;
  fetchBestMatchError: string;
  instructorProfile: InstructorProfileType;
  isFetchingProfile: boolean;
  fetchProfileError: string;
  isAssigningInstructor: boolean;
  assignInstructorMessage: string;
  assignInstructorError: string;
  user: UserType;
}

interface DispatchProps {
  fetchInstructor: (id: number) => void;
  fetchBestMatch: (requestId: number) => void;
  assignInstructor: (instructorId: number, requestId: number) => void;
  fetchUser: () => void;
}

interface OwnProps {}

interface Props extends StateProps, DispatchProps, OwnProps {}

const chatClient = StreamChat.getInstance("9srtnzz4hrxh");

export const Profile = (props: Props) => {
  const [showSnackbar, setShowSnackbar] = React.useState(false);
  const [snackbarDetails, setSnackBarDetails] = React.useState({
    type: "",
    message: "",
  });
  const [bookTrial, setBookTrial] = React.useState(false);
  const [bestMatchId, setBestMatchId] = React.useState(undefined);

  React.useEffect(() => {
    require("../../../assets/scripts/StickyProfileCta.js");
  }, []);

  const router = useRouter();
  const instructorId = Number(router.query.id);
  const requestId = Number(router.query.requestId);
  const isTrial = router.pathname === "/book-trial/best-match";

  React.useEffect(() => {
    if (props.user && props.user.id >= 0 && props.instructorProfile && props.instructorProfile) {
      console.log(props.user);

      fetch(`/api/profile?user_id=user@${props.instructorProfile.id}_role@instructor`, {
        method: "get",
      })
        .then((res) => res.json())
        .then(async ({ token }) => {
          await chatClient.disconnectUser();
          await chatClient.connectUser(
            {
              id: `user@${props.instructorProfile.id}_role@instructor`,
              name: props.instructorProfile.name,
              image:
                "https://getstream.io/random_png/?id=orange-bush-1&name=orange-bush-1",
            },
            token
          );
          await chatClient.disconnectUser();

          fetch(`/api/profile?user_id=user@${props.user.id}_role@${props.user.role}`, {
            method: "get",
          })
            .then((res) => res.json())
            .then(async ({ token }) => {
              await chatClient.connectUser(
                {
                  id: `user@${props.user.id}_role@${props.user.role}`,
                  name: props.user.displayName,
                  image:
                    "https://getstream.io/random_png/?id=orange-bush-1&name=orange-bush-1",
                },
                token
              );
            });
        });
    }
    return () => {
      chatClient.disconnectUser();
    };
  }, [props.user, props.instructorProfile]);

  React.useEffect(() => {
    const fetchData = () => {
      props.fetchUser();
    };
    fetchData();
  }, []);

  React.useEffect(() => {
    // Set analytics data for Segment
    const userEmail = getCookie("userEmail");
    let analiticsProps: any = {
      userId: userEmail,
      properties: {
        referrer: document.referrer,
      },
    };

    // If booking trial
    if (isTrial) {
      page("Viewed Best Match", analiticsProps);

      const fetchBestMatch = async () => {
        await props.fetchBestMatch(requestId);
      };
      fetchBestMatch();
    } else {
      // set bestMatchId from route
      setBestMatchId(Number(router.query.bestMatchId));

      // set segment page tracking
      analiticsProps.instructorId = instructorId;
      page("Viewed Instructor Profile", analiticsProps);

      // If component is not used in trial get profile
      const fetchProfile = async () => {
        if (instructorId) {
          await props.fetchInstructor(instructorId);
        }
      };
      fetchProfile();
    }
    /* tslint:disable */
  }, []);

  React.useEffect(() => {
    // Display snackbar if there is an API error
    if (props.fetchBestMatchError || props.fetchProfileError) {
      setSnackBarDetails({
        type: "error",
        message: ProfileComponent.error,
      });
      return setShowSnackbar(true);
    }
  }, [props.fetchBestMatchError, props.fetchProfileError]);

  React.useEffect(() => {
    if (props.instructorProfile?.id) {
      if (isTrial) {
        // Set the bestMatchId id from fetched bestMtach
        setBestMatchId(Number(props.instructorProfile?.id));
      }
    }
  }, [props.instructorProfile]);

  const role = getCookie("role");

  React.useEffect(() => {
    if (!bookTrial) {
      return;
    }

    if (props.assignInstructorError) {
      setSnackBarDetails({
        type: "error",
        message: props.assignInstructorError,
      });
      setShowSnackbar(true);
    }

    if (props.assignInstructorMessage) {
      setCookie("instructorName", props.instructorProfile?.name);
      const userEmail = getCookie("userEmail");
      const analiticsProps = {
        userId: userEmail,
        properties: {
          referrer: document.referrer,
          instructorId: instructorId,
        },
      };
      track("Trial Started", analiticsProps);
      Router.push(
        `${Routes.BookTrial + Routes.TrialConfirmation}?instructorName=${
          props.instructorProfile?.name
        }`
      );
    }
  }, [props.assignInstructorError, props.assignInstructorMessage, bookTrial]);

  const assignInstructor = async () => {
    const channel = chatClient.channel(`messaging`, {
      name: `${props.instructorProfile.name} - ${props.user.displayName}`,
      members: [
        `user@${props.user.id}_role@${props.user.role}`,
        `user@${props.instructorProfile?.id}_role@instructor`,
      ],
    });
    await channel.create();
    await props.assignInstructor(props.instructorProfile?.id, requestId);
    setBookTrial(true);
  };

  return (
    <div>
      <Head>
        <title>{pageTitlesAndDescriptions.profile.title}</title>
        <meta
          name="description"
          content={pageTitlesAndDescriptions.profile.description}
        ></meta>
      </Head>
      <Header />
      <div className="nabi-container nabi-margin-bottom-medium nabi-margin-top-medium profile-content-wrapper">
        <PageTitle pageTitle={ProfileComponent.pageTitle} />
        {!isTrial && (
          <Breadcrumbs aria-label="breadcrumb">
            <Link
              href={
                role === Role.instructor
                  ? Routes.InstructorStudio
                  : Routes.ParentStudio
              }
            >
              <a>{ProfileComponent.breadcrumbLabels.home}</a>
            </Link>
            <Typography>{ProfileComponent.breadcrumbLabels.profile}</Typography>
          </Breadcrumbs>
        )}
        {props.isFetchingBestMatch ||
          props.isFetchingProfile ||
          (props.isAssigningInstructor && (
            <div className="nabi-text-center">
              <CircularProgress />
            </div>
          ))}
        <Grid container={true} spacing={1}>
          <Grid item={true} xs={12} md={7}>
            <div className="nabi-section nabi-background-white nabi-margin-top-xsmall">
              <ProfileHeader nextPath="" instructor={props.instructorProfile} />
            </div>
            <Reviews reviews={props.instructorProfile?.reviews} />
            <Experience instructor={props.instructorProfile} />
          </Grid>
          <Grid xs={5} item={true} id="profile-cta" className="hide-on-mobile">
            <div className="nabi-section nabi-background-white nabi-text-center">
              <span className="nabi-text-mediumbold">
                {ProfileComponent.bookTrialWith} {props.instructorProfile?.name}
              </span>
              <Button
                onClick={() => assignInstructor()}
                variant="contained"
                color="primary"
                className="nabi-margin-top-xsmall"
              >
                {ProfileComponent.bookTrialButton}
              </Button>
              <Link
                href={`${
                  Routes.BookTrial + Routes.IntructorsMatch
                }?requestId=${requestId}&bestMatchId=${bestMatchId}`}
              >
                <a>
                  <Button
                    variant="text"
                    color="primary"
                    className="nabi-margin-top-xsmall"
                  >
                    {ProfileComponent.viewMoreInstructorsButton}
                  </Button>
                </a>
              </Link>
            </div>
          </Grid>
        </Grid>
      </div>
      <div className="hide-on-mobile">
        <Footer />
      </div>
      <div className="profile-cta-mobile nabi-background-white nabi-text-center hide-on-desktop">
        <div className="profile-cta-content-wrapper">
          {router.query.bestMatchId || isTrial ? (
            <>
              <Button
                onClick={() => assignInstructor()}
                fullWidth={true}
                variant="contained"
                color="primary"
                className="nabi-margin-top-xsmall nabi-display-block"
              >
                {ProfileComponent.bookTrialButton}
              </Button>
              <Link
                href={`${
                  Routes.BookTrial + Routes.IntructorsMatch
                }?requestId=${requestId}&bestMatchId=${bestMatchId}`}
              >
                <a>
                  <Button
                    variant="text"
                    color="primary"
                    className="nabi-margin-top-xsmall"
                  >
                    {ProfileComponent.viewMoreInstructorsButton}
                  </Button>
                </a>
              </Link>
            </>
          ) : (
            <Link href={Routes.RegistrationParentStudent}>
              <a>
                <Button
                  fullWidth={true}
                  variant="contained"
                  color="primary"
                  className="nabi-margin-top-xsmall nabi-display-block"
                >
                  {ProfileComponent.bookTrialButton}
                </Button>
              </a>
            </Link>
          )}
        </div>
      </div>

      <SnackBar
        isOpen={showSnackbar}
        message={snackbarDetails.message}
        handleClose={() => setShowSnackbar(false)}
        variant={snackbarDetails.type}
      />
    </div>
  );
};

const mapStateToProps = (state: StoreState, _ownProps: {}): StateProps => {
  const {
    user,
    actions: {
      fetchUser: { isRequesting: isRequestingFetch },
      updateUser: { isRequesting: isRequestingUpdate, error: errorUpdate },
      uploadAvatar: { message: updateAvatarMessage },
    },
  } = state.user;
  const {
    instructor: {
      instructorProfile,
      actions: {
        fetchInstructor: {
          isRequesting: isFetchingProfile,
          error: fetchProfileError,
        },
      },
    },
    requests: {
      bestMatch,
      actions: {
        fetchBestMatch: {
          isRequesting: isFetchingBestMatch,
          error: fetchBestMatchError,
        },
        assignInstructor: {
          isRequesting: isAssigningInstructor,
          error: assignInstructorError,
          message: assignInstructorMessage,
        },
      },
    },
  } = state;
  return {
    user,
    isFetchingBestMatch,
    fetchBestMatchError,
    instructorProfile: bestMatch || instructorProfile,
    isFetchingProfile,
    fetchProfileError,
    isAssigningInstructor,
    assignInstructorMessage,
    assignInstructorError,
  };
};

function mapDispatchToProps(
  dispatch: Dispatch<Action<any>>,
  _ownProps: OwnProps
): DispatchProps {
  return {
    fetchInstructor: (id: number) => dispatch(fetchInstructor(id)),
    fetchBestMatch: (requestId: number) => dispatch(fetchBestMatch(requestId)),
    assignInstructor: (instructorId: number, requestId: number) =>
      dispatch(assignInstructor(instructorId, requestId)),
    fetchUser: () => dispatch(fetchUser()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
