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

import "stream-chat-react/dist/css/index.css";

const chatClient = StreamChat.getInstance("9srtnzz4hrxh");

const Paginator = (
  props: JSX.IntrinsicAttributes &
    InfiniteScrollPaginatorProps & { children?: React.ReactNode }
) => <InfiniteScrollPaginator threshold={300} {...props} />;

const filters = { type: "messaging" };

const App = () => {

  useEffect(() => {
    const token = async () => {
      const { token } = await (
        await fetch("/api/profile", {
          method: "post",
          body: JSON.stringify({ user_id: "luis" }),
        })
      ).json();
      chatClient.connectUser(
        {
          id: "luis",
          name: "luis",
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

export default App;
