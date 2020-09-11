import * as React from 'react';
import moment from 'moment';
import Router from "next/router";
import {
  Avatar,
  Button,
  Divider,
  Grid,
  IconButton,
  Typography
} from '@material-ui/core';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import Schedule from '@material-ui/icons/Schedule';
import Face from '@material-ui/icons/Face';

import { instruments } from '../../../assets/data/instruments';
import { getCookie } from "../../utils/cookies";
import PageTitle from '../common/PageTitle';
import { Routes } from '../common/constants/Routes';
import { Role } from '../../constants/Roles';
import { ContactItem } from './ContactItem';
import { Conversation } from './Conversation';
import '../../../assets/scss/Messages.scss';

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
            {dummyContacts.map((contact, i) =>
              <React.Fragment key={i}>
                <ContactItem
                  avatar={contact.avatar}
                  name={contact.name} 
                  lastMessage={contact.lastMessage}
                  lastMessageDate={contact.lastMessageDate}
                  goToThread={() => setScreen('messages')}
                />
                {i !== dummyContacts.length - 1 ? <Divider className="nabi-margin-top-small nabi-margin-bottom-small"/> : '' }
              </React.Fragment>
            )}
          </> :
          <>
            <IconButton onClick={() => setScreen('contacts')} className="nabi-float-left conversation-back-button">
              <ArrowBackIosIcon />
            </IconButton>
            <div className="conversation-avatar-wrapper">
              <Avatar src={dummyContacts[0].avatar} className="nabi-border-nabi conversation-avatar"/>
            </div>
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
