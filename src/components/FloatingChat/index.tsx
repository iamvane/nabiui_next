import React, { useEffect, useState } from "react";
import {
  Channel,
  ChannelList,
  Chat,
  InfiniteScrollPaginator,
  InfiniteScrollPaginatorProps,
  MessageInput,
  MessageInputFlat,
  MessageList,
  MessageTeam,
  Thread,
  Window,
} from "stream-chat-react";
import { Action, Dispatch } from "redux";

import { StreamChat } from "stream-chat";

import "../../../assets/css/chat.css";
import "./App.css";

import { CloseCustomerIcon, OpenCustomerIcon } from "./assets";
import { connect, useSelector } from "react-redux";
import { UserType } from "../../redux/models/UserModel";
import { fetchUser } from "../../redux/actions/UserActions";
import { StoreState } from "../../redux/reducers/store";

const theme = "light";

const Paginator = (
  props: JSX.IntrinsicAttributes &
    InfiniteScrollPaginatorProps & { children?: React.ReactNode }
) => <InfiniteScrollPaginator threshold={300} {...props} />;


const chatClient = StreamChat.getInstance("9srtnzz4hrxh");

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

interface Props extends DispatchProps, StateProps, OwnProps {}


const App = (props: Props) => {
  const [open, setOpen] = useState(true);

  const [loading, setLoading] = useState(true);
  const user = useSelector((state: StateProps) => {
    const user = state.user.user;
    return user;
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
            .then(() => setLoading(false));
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

      {!loading && (
        <Chat client={chatClient} theme={`commerce ${theme}`}>
          <div className={`customer-wrapper ${open ? "wrapper--open" : ""}`}>
            <div
              className={`toggle-button ${open && "close-button"}`}
              onClick={() => setOpen(!open)}
            >
              {open ? <CloseCustomerIcon /> : <OpenCustomerIcon />}
            </div>
            {open && (
              <>
                <ChannelList
                  options={{ limit: 10 }}
                  filters={{ members: { $in: [`luis`] } }}
                  sort={{ last_message_at: -1 }}
                  Paginator={Paginator}
                />
                <Channel>
                  <Window>
                    <MessageList Message={MessageTeam} />
                    <MessageInput Input={MessageInputFlat} />
                  </Window>
                  <Thread />
                </Channel>
              </>
            )}
          </div>
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
