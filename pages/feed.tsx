import React, { useEffect, useState } from "react";

import {
  StreamApp,
  StatusUpdateForm,
  FlatFeed,
  NotificationDropdown,
  Activity,
  ActivityFooter,
  LikeButton,
  CommentField,
  CommentList,
  CommentItem,
  InfiniteScrollPaginator,
} from "react-activity-feed";
import "react-activity-feed/dist/index.css";
import { connect, useSelector } from "react-redux";
import { Action, Dispatch } from "redux";
import { fetchUser } from "../src/redux/actions/UserActions";
import { UserType } from "../src/redux/models/UserModel";
import { StoreState } from "../src/redux/reducers/store";
import { Header } from "../src/components/Header/Header";
import { menuItems } from "../src/components/StudioParent/constants";
import { menuItems as menuItemsInstructor } from "../src/components/StudioInstructor/constants";

import { connect as stream } from 'getstream';



import {instanceId,tokenEndpoint,defaultImage,limitMessages,theme,appId,feedGroup} from '../src/constants/getstreamConstants';
const apiKey = instanceId;

interface Props extends DispatchProps, StateProps, OwnProps {}

interface StateProps {
  user: UserType;
  isRequestingFetch: boolean;
  isRequestingUpdate: boolean;
  errorUpdate: string;
  updateAvatarMessage: string;
}

interface DispatchProps {
  fetchUser: () => void;
}

interface OwnProps {
  nextPath: string;
}

function Feed(props: Props) {
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState<string | null>(null);
  const [role, setRole] = useState<string | null>(null)
  const user = useSelector((state: StateProps) => {
    const user = state.user.user;
    return user;
  });

  useEffect(() => {
    if (user && user.id > 0) {
      setLoading(true);
      console.log(user);
      fetch(`${tokenEndpoint}${user.id}${user.role}`, {
        method: "get",
      })
        .then((res) => res.json())
        .then( async ({ token }) => {
          setToken(token);
          setRole(user.role)
          setLoading(false);
        });
    }
  }, [user, setLoading]);

  useEffect(() => {
    const fetchData = () => {
      props.fetchUser();
    };
    fetchData();
  }, []);
  return (
    <>
      <Header
        drawerMenuItems={role === "instructor" ? menuItemsInstructor : menuItems}
        // headerMenuItems={[]}
        privateRoute={true}
      />
      <div style={{ maxWidth: "600px", margin: "0 auto" }}>
        {token && (
          <StreamApp apiKey={apiKey} appId={appId} token={token}>
            {<div className="wrapper box">
          <h3>NABI MUSIC Feed</h3>
        </div>}
            <StatusUpdateForm />
            <FlatFeed
              notify
              feedGroup={feedGroup}
              options={{
                limit: limitMessages,
                withOwnChildren: true,
                withRecentReactions: true,
              }}
              Paginator={InfiniteScrollPaginator}
              Activity={({ activity, feedGroup, userId }) => (
                
                <Activity
                  activity={activity}
                  feedGroup={feedGroup}
                  userId={userId}
                  Footer={() => (
                    <>
                      <ActivityFooter
                        activity={activity}
                        feedGroup={feedGroup}
                        userId={userId}
                      />
                      <CommentField activity={activity} />
                      <CommentList
                        activityId={activity.id as string}
                        CommentItem={({ comment }) => (
                          <div className="wrapper">
                            <CommentItem comment={comment} />
                            <LikeButton reaction={comment} />
                          </div>
                        )}
                      />
                    </>
                  )}
                />
              )}
            />
          </StreamApp>
        )}
      </div>
    </>
  );
}

function mapStateToProps(state: StoreState, _ownProps: OwnProps): StateProps {
  const {
    user,
    actions: {
      fetchUser: { isRequesting: isRequestingFetch },
      updateUser: { isRequesting: isRequestingUpdate, error: errorUpdate },
      uploadAvatar: { message: updateAvatarMessage },
    },
  } = state.user;

  return {
    user,
    isRequestingFetch,
    isRequestingUpdate,
    errorUpdate,
    updateAvatarMessage,
  };
}

const mapDispatchToProps = (dispatch: Dispatch<Action>): DispatchProps => ({
  fetchUser: () => dispatch(fetchUser()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Feed);
