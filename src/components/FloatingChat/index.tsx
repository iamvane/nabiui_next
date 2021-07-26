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

import { StreamChat } from "stream-chat";

import "../../../assets/css/chat.css";
import "./App.css";

import { CloseCustomerIcon, OpenCustomerIcon } from "./assets";
import '../../constants/getstreamConstants'
import { UserType } from "../../redux/models/UserModel";
import { defaultImage, instanceId, limitMessages, theme as gsTheme, tokenEndpoint } from "../../constants/getstreamConstants";

const theme = gsTheme;

const Paginator = (
  props: JSX.IntrinsicAttributes &
    InfiniteScrollPaginatorProps & { children?: React.ReactNode }
) => <InfiniteScrollPaginator threshold={300} {...props} />;


const chatClient = StreamChat.getInstance(instanceId);
interface OwnProps {
  user: UserType;
}

const App = (props: OwnProps) => {
  const [open, setOpen] = useState(true);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    if (props.user && props.user.id >= 0) {
      fetch(`${tokenEndpoint}${props.user.id}${props.user.role}`, {
        method: "get",
      })
        .then((res) => res.json())
        .then(({ token }) => {
          chatClient.disconnectUser();
          chatClient
            .connectUser(
              {
                id: `${props.user.id}${props.user.role}`,
                name: props.user.displayName,
                image: props.user.avatar ? props.user.avatar : defaultImage,
              },
              token
            )
            .then(() => setLoading(false));
        });
    }
    return () => {
      chatClient.disconnectUser();
    };
  }, [setLoading]);

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
                  options={{ limit: limitMessages }}
                  filters={{ members: { $in: [`${props.user.id}${props.user.role}`] } }}
                  sort={{ last_message_at: -1 }}
                  Paginator={Paginator}
                />
                <Channel>
                  <Window>
                    <MessageList Message={MessageTeam} />
                    <MessageInput />
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

export default App;
