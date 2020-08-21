import * as React from 'react';
import moment from 'moment';
import Router from "next/router";
import {
  Button,
  Divider,
  Grid,
  Typography
} from '@material-ui/core';
import DateRangeIcon from '@material-ui/icons/DateRange';
import Schedule from '@material-ui/icons/Schedule';
import Face from '@material-ui/icons/Face';
import MusicNoteIcon from '@material-ui/icons/MusicNote';

import { instruments } from '../../../assets/data/instruments';
import { getCookie } from "../../utils/cookies";
import PageTitle from '../common/PageTitle';
import { Routes } from '../common/constants/Routes';
import { Role } from '../../constants/Roles';
import { ContactItem } from './ContactItem';
import { Conversation } from './Conversation';

import {
  MessagesComponent,
  dummyContacts,
  dummyConversation
} from './constants';

interface Props {
  headingMessage?: string;
  handleContinue?: () => void;
}

const Messages = (props: Props) => {
  const [screen, setScreen] = React.useState('contacts');

  return (
    <div className="nabi-container nabi-margin-bottom-medium">
      <PageTitle pageTitle={MessagesComponent.pageTitle} />
      <Grid
        item={true}
        xs={12}
        md={6} className="nabi-section nabi-background-white nabi-margin-center"
      >
        {screen === 'contacts' ?
          <>
            <Button onClick={() => setScreen('messages')}>Go to messages</Button>
            {dummyContacts.map((contact, i) =>
              <React.Fragment key={i}>
                <ContactItem
                  avatar={contact.avatar}
                  name={contact.name} 
                  lastMessage={contact.lastMessage}
                  lastMessageDate={contact.lastMessageDate}
                />
                {i !== dummyContacts.length - 1 ? <Divider className="nabi-margin-top-small nabi-margin-bottom-small"/> : '' }
              </React.Fragment>
            )}
          </> :
          <>
            <Button onClick={() => setScreen('contacts')}>Go to contacts</Button>
            {dummyConversation.map((convo, i) => 
              <Conversation
                key={i}
                date={convo.date}
                messages={convo.messages}
              />
            )}
          </>
        }
      </Grid>
    </div>
  )
}

export default Messages;
