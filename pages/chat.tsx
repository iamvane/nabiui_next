import React, { useEffect } from "react";
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
import {
  Action,
  Dispatch
} from 'redux';
import { StoreState } from '../src/redux/reducers/store';
import {
  fetchUser,
  updateUser,
} from '../src/redux/actions/UserActions';
import { UserType } from '../src/redux/models/UserModel';
import { connect } from "react-redux";

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

const filters = { type: "messaging" };

const App = (props: Props) => {

  useEffect(() => {
    const fetchData = async () => {
      await props.fetchUser();
    };
    fetchData();
    const token = async () => {
      const { token } = await (
        await fetch(`/api/profile?user_id=${props.user.email}`, {
          method: "get"
        })
      ).json();
      chatClient.connectUser(
        {
          id: props.user.email,
          name: props.user.displayName,
          image:
            "https://getstream.io/random_png/?id=orange-bush-1&name=orange-bush-1",
        },
        token
      );
    };
    token();

    return () => {
      chatClient.disconnectUser();
    };
  }, []);

  return <Chat client={chatClient}>
    <ChannelList
      filters={filters}
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
};

function mapStateToProps(state: StoreState, _ownProps: OwnProps): StateProps {
  const {
    user,
    actions: {
      fetchUser: {
        isRequesting: isRequestingFetch,
      },
      updateUser: {
        isRequesting: isRequestingUpdate,
        error: errorUpdate
      },
      uploadAvatar: {
        message: updateAvatarMessage
      }
    },
  } = state.user;

  return {
    user,
    isRequestingFetch,
    isRequestingUpdate,
    errorUpdate,
    updateAvatarMessage
  };
}

const mapDispatchToProps = (
  dispatch: Dispatch<Action>
): DispatchProps => ({
  fetchUser: () => dispatch(fetchUser()),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
