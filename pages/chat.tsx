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
import { fetchUser, updateUser } from "../src/redux/actions/UserActions";
import { UserType } from "../src/redux/models/UserModel";
import { connect, DefaultRootState, useSelector } from "react-redux";

import "stream-chat-react/dist/css/index.css";

const chatClient = StreamChat.getInstance("9srtnzz4hrxh");

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
    const user = state.user.user
    return user
  });

  useEffect(() => {
    if (user && user.id >= 0) {
      console.log(user);

      fetch(`/api/profile?user_id=${user.id}${user.role}`, {
        method: "get",
      })
        .then((res) => res.json())
        .then(({ token }) => {
          console.log(token);
          chatClient.disconnectUser();
          chatClient
            .connectUser(
              {
                id: `${user.id}${user.role}`,
                name: user.displayName,
                image:
                  "https://getstream.io/random_png/?id=orange-bush-1&name=orange-bush-1",
              },
              token
            )
            .then((res) => setLoading(false));
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
      {loading ? (
        <div>hi</div>
      ) : (
        <Chat client={chatClient}>
          <ChannelList
            filters={{ members: { $in: [`${user.id}${user.role}`] } }}
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
