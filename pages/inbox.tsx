import React, { useEffect, useState } from "react";
import { StreamChat } from "stream-chat";
import {
  Chat,
  Channel,
  ChannelHeader,
  MessageInput,
  MessageList,
  Thread,
  Window,
  InfiniteScrollPaginator,
  ChannelList,
  InfiniteScrollPaginatorProps,
  MessageTeam,
  MessageInputFlat,
} from "stream-chat-react";
import { Action, Dispatch } from "redux";
import { StoreState } from "../src/redux/reducers/store";
import { fetchUser } from "../src/redux/actions/UserActions";
import { UserType } from "../src/redux/models/UserModel";
import { connect, useSelector } from "react-redux";
import { menuItems } from "../src/components/StudioParent/constants";
import { Header } from "../src/components/Header/Header";
import { menuItems as menuItemsInstructor } from "../src/components/StudioInstructor/constants";

import {
  instanceId,
  tokenEndpoint,
  defaultImage,
  limitMessages,
  theme,
} from "../src/constants/getstreamConstants";

import "stream-chat-react/dist/css/index.css";

const chatClient = StreamChat.getInstance(instanceId);

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

const Paginator = (
  props: JSX.IntrinsicAttributes &
    InfiniteScrollPaginatorProps & { children?: React.ReactNode }
) => <InfiniteScrollPaginator threshold={300} {...props} />;

const App = (props: Props) => {
  const [loading, setLoading] = useState(true);
  const user = useSelector((state: StateProps) => {
    const user = state.user.user;
    return user;
  });
  const [role, setRole] = useState<string | null>(null);

  useEffect(() => {
    if (user && user.id >= 0) {
      console.log(user);

      const id =
        user.role === "instructor"
          ? `user@${user.instructorId}_role@${user.role}`
          : `user@${user.id}_role@${user.role}`;
      console.log("id", id);

      fetch(`${tokenEndpoint}${id}`, {
        method: "get",
      })
        .then((res) => res.json())
        .then(async ({ token }) => {
          await chatClient.disconnectUser()
          chatClient
            .connectUser(
              {
                id,
                name: user.displayName,
                image: user.avatar ? user.avatar : defaultImage,
              },
              token
            )
            .then((res) => {
              setLoading(false);
              setRole(user.role);
            });
        });
    }
    return () => {
      chatClient.disconnectUser();
    };
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
        drawerMenuItems={
          role === "instructor" ? menuItemsInstructor : menuItems
        }
        // headerMenuItems={[]}
        privateRoute={true}
      />
      {!loading && (
        <Chat client={chatClient}>
          <ChannelList
            filters={{
              members: {
                $in: [
                  user.role === "instructor"
                    ? `user@${user.instructorId}_role@${user.role}`
                    : `user@${user.id}_role@${user.role}`,
                ],
              },
            }}
            sort={{ last_message_at: -1 }}
            Paginator={Paginator}
          />
          <Channel>
            <Window>
              <ChannelHeader />
              <MessageList Message={MessageTeam} />
              <MessageInput Input={MessageInputFlat} />
            </Window>
            <Thread />
          </Channel>
        </Chat>
      )}
    </>
  );
};

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

export default connect(mapStateToProps, mapDispatchToProps)(App);
