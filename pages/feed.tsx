import React, { PropsWithChildren, ReactNode, useContext, useEffect, useState } from "react";

import {
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
  FeedManager,
  TranslationContextValue,
  TranslationProvider,
  StreamApp,
} from "react-activity-feed";
import "react-activity-feed/dist/index.css";
import { useSelector } from "react-redux";
import { fetchUser } from "../src/redux/actions/UserActions";
import { UserType } from "../src/redux/models/UserModel";
import { StoreState } from "../src/redux/reducers/store";
import { Header } from "../src/components/Header/Header";
import { menuItems } from "../src/components/StudioParent/constants";
import { menuItems as menuItemsInstructor } from "../src/components/StudioInstructor/constants";
import StreamAnalytics from 'stream-analytics';
import {instanceId,tokenEndpoint,defaultImage,limitMessages,theme,appId,feedGroup} from '../src/constants/getstreamConstants';
import { ClientOptions, connect, GetFeedOptions, OGAPIResponse, StreamClient, StreamUser, UR } from "getstream";
import { Dispatch, Action} from "redux";
import * as Redux from 'react-redux';
import { ErrorHandler, handleError } from "react-activity-feed/dist/index.cjs";
import { Streami18n } from "stream-chat-react";
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



// type SharedFeedManagers<
//   UT extends DefaultUT = DefaultUT,
//   AT extends DefaultAT = DefaultAT,
//   CT extends UR = UR,
//   RT extends UR = UR,
//   CRT extends UR = UR,
//   PT extends UR = UR
// > = Record<string, FeedManager<UT, AT, CT, RT, CRT, PT>>;

// type Attachments = {
//   files?: Array<{ mimeType: string; name: string; url: string }>;
//   images?: string[];
//   og?: OGAPIResponse;
// };

// type DefaultUT = UR & { name: string; id?: string; profileImage?: string };

// type DefaultAT = UR & { attachments?: Attachments; text?: string };

// type SharedFeed = { feedGroup: string; notify: boolean; options: GetFeedOptions };

// type StreamAppProps<UT extends DefaultUT = DefaultUT> = {
//   apiKey: string;
//   appId: string;
//   token: string;
//   analyticsToken?: string;
//   children?: ReactNode;
//   defaultUserData?: UT;
//   errorHandler?: ErrorHandler;
//   i18nInstance?: Streami18n;
//   options?: ClientOptions;
//   sharedFeeds?: Array<SharedFeed>;
// };

// type StreamContextValue<
//   UT extends DefaultUT = DefaultUT,
//   AT extends DefaultAT = DefaultAT,
//   CT extends UR = UR,
//   RT extends UR = UR,
//   CRT extends UR = UR,
//   PT extends UR = UR
// > = {
//   analyticsClient: null | StreamAnalytics<UT>;
//   client: null | StreamClient<UT, AT, CT, RT, CRT, PT>;
//   errorHandler: ErrorHandler;
//   sharedFeedManagers: SharedFeedManagers<UT, AT, CT, RT, CRT, PT>;
//   user?: StreamUser<UT>;
//   userData?: UT;
// };

// const StreamContext = React.createContext<StreamContextValue>({
//   analyticsClient: null,
//   client: null,
//   errorHandler: handleError,
//   sharedFeedManagers: {},
// });

// const StreamAppProvider = <
//   UT extends DefaultUT = DefaultUT,
//   AT extends DefaultAT = DefaultAT,
//   CT extends UR = UR,
//   RT extends UR = UR,
//   CRT extends UR = UR,
//   PT extends UR = UR
// >({
//   children,
//   value,
// }: PropsWithChildren<{
//   value: StreamContextValue<UT, AT, CT, RT, CRT, PT>;
// }>) => <StreamContext.Provider value={value as StreamContextValue}>{children}</StreamContext.Provider>;

// const useStreamContext = <
//   UT extends DefaultUT = DefaultUT,
//   AT extends DefaultAT = DefaultAT,
//   CT extends UR = UR,
//   RT extends UR = UR,
//   CRT extends UR = UR,
//   PT extends UR = UR
// >() => useContext(StreamContext) as StreamContextValue<UT, AT, CT, RT, CRT, PT>;

// /**
//  * Manages the connection with Stream. Any components that should talk to
//  * Stream should be a child of this component.
//  */
// function StreamApp<
//   UT extends DefaultUT = DefaultUT,
//   AT extends DefaultAT = DefaultAT,
//   CT extends UR = UR,
//   RT extends UR = UR,
//   CRT extends UR = UR,
//   PT extends UR = UR
// >({
//   apiKey,
//   appId,
//   errorHandler = handleError,
//   i18nInstance,
//   token,
//   analyticsToken,
//   children,
//   defaultUserData,
//   options,
//   sharedFeeds = [{ feedGroup: 'notification', notify: true, options: { mark_seen: true } }],
// }: StreamAppProps<UT>) {
//   const [client, setClient] = useState<StreamClient<UT, AT, CT, RT, CRT, PT> | null>(null);
//   const [user, setUser] = useState<StreamUser<UT, AT, CT, RT, CRT, PT>>();
//   const [analyticsClient, setAnalyticsClient] = useState<StreamAnalytics<UT> | null>(null);
//   const [userData, setUserDate] = useState<UT>();
//   const [translator, setTranslator] = useState<TranslationContextValue>();
//   const [sharedFeedManagers, setSharedFeedManagers] = useState<SharedFeedManagers<UT, AT, CT, RT, CRT, PT>>({});

//   useEffect(() => {
//     const streami18n =
//       i18nInstance && i18nInstance instanceof Streami18n ? i18nInstance : new Streami18n({ language: 'en' });

//     // streami18n.getTranslators().then(setTranslator);
//     streami18n.registerSetLanguageCallback((t) =>
//       setTranslator((prevState) => ({ ...(prevState as TranslationContextValue), t })),
//     );
//   }, [i18nInstance]);

//   const getUserInfo = async (user: StreamUser<UT>) => {
//     try {
//       console.log("defaultUserData", defaultUserData);
//       const u = defaultUserData as UT
//       await user.update(u)
//       const {data} = await user.getOrCreate(u);
//       setUserDate(data);
//     } catch (e) {
//       errorHandler(e, 'get-user-info', { userId: user.id });
//     }
//   };

//   useEffect(() => {
//     const client = connect<UT, AT, CT, RT, CRT, PT>(apiKey, token, appId, options || {});

//     let analyticsClient: StreamAnalytics<UT> | null = null;
//     if (analyticsToken) {
//       analyticsClient = new StreamAnalytics<UT>({ apiKey, token: analyticsToken });
//       analyticsClient.setUser(client.userId as string);
//     }

//     const feeds: Record<string, FeedManager<UT, AT, CT, RT, CRT, PT>> = {};
//     for (const feedProps of sharedFeeds) {
//       const manager = new FeedManager<UT, AT, CT, RT, CRT, PT>({
//         ...feedProps,
//         client,
//         analyticsClient,
//         errorHandler,
//         user,
//       });

//       feeds[manager.feed().id] = manager;
//     }

//     setClient(client);

//     setUser(client.currentUser as StreamUser<UT, AT, CT, RT, CRT, PT>);
//     setAnalyticsClient(analyticsClient);
//     setSharedFeedManagers(feeds);

//     getUserInfo(client.currentUser as StreamUser<UT>);

//     return () => client.fayeClient?.disconnect();
//   }, [apiKey, token, appId, analyticsClient]);

//   if (!translator?.t) return null;

//   return (
//     <StreamAppProvider value={{ client, analyticsClient, errorHandler, userData, user, sharedFeedManagers }}>
//       <TranslationProvider value={translator}>
//         <>{children || 'You are connected to Stream, Throw some components in here!'}</>
//       </TranslationProvider>
//     </StreamAppProvider>
//   );
// }



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
        .then(({ token }) => {
          const client = connect(apiKey, token, appId, {});
          client.currentUser.getOrCreate({
            id: `${user.id}${user.role}`,
            name: user.displayName
          })
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
        {token && !loading && (
          <StreamApp defaultUserData={{id: `${user.id}${user.role}`, name: user.displayName}} apiKey={apiKey} appId={appId} token={token}>
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
              Activity={(props) => {
                // console.log(props);

                const { activity, feedGroup, userId } = props
                return <Activity
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
              }}
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

export default Redux.connect(mapStateToProps, mapDispatchToProps)(Feed);
