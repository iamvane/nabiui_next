import * as React from 'react';
import {
  Avatar,
  Button,
  Divider,
  Grid,
  IconButton,
  TextField,
  Typography
} from '@material-ui/core';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';

import PageTitle from '../common/PageTitle';
import { ContactItem } from './ContactItem';
import { Conversation } from './Conversation';
import {
  auth,
  database
} from "../../utils/firebase";
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
  const [authenticated, setAuthenticated] = React.useState(false)
  const [loading, setLoading] = React.useState(true)
  const [screen, setScreen] = React.useState('contacts');
  const [writeError, setWriteError] = React.useState(null);
  const [message, setMessage] = React.useState('');
  const [uid, setUid] = React.useState('');
  const [chats, setChats] = React.useState([]);
  const [readError, setReadError] = React.useState(null);
  const [groups, setGroups] = React.useState([]);
  const [messageText, setMessageText] = React.useState('');
  const [sentAt, setSentAt] = React.useState('');
  const [currentGroupId, setCurrentGroupId] = React.useState('');

  React.useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setUid(user.uid);
        setAuthenticated(true)
        setLoading(false)
      } else {
        setAuthenticated(false)
        setLoading(false)
      }
    })

    const fetchData = async () => {
      try {
        // fetchGroupByUserID(uid) {
          return new Promise((resolve, reject) => {
            const groupRef = database.collection('group')
            groupRef
             .where('members', 'array-contains', uid)
             .onSnapshot((querySnapshot) => {
               const allGroups = []
               querySnapshot.forEach((doc) => {
                 const data = doc.data()
                 data.id = doc.id
                 if (data.recentMessage) allGroups.push(data)
               })
               setGroups(allGroups)
             })
           })
        }
    };
    fetchData();
  },[]);


  const sendMessage = async (e) => {
    e.preventDefault();
    setWriteError(null);
    if (messageText.trim()) {
    const message = {
      messageText,
      sentAt,
      sentBy: uid,
    }
    return new Promise((resolve, reject) => {
      database.collection('message')
        .doc(currentGroupId)
        .collection('messages')
        .add(message)
        .then(function (docRef) {
          resolve(message)
        })
        .catch(function (error) {
          reject(error)
        })
      })
    }


    // try {
    //   await firebase.database().ref("chats").push({
    //     content: message,
    //     timestamp: Date.now(),
    //     uid: uid
    //   });
    //   setMessage('');
    // } catch (error) {
    //   setWriteError(error.message);
    // }

    // firebase
  }
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
                {i !== dummyContacts.length - 1 ? <Divider className="nabi-margin-top-small nabi-margin-bottom-small" /> : ''}
              </React.Fragment>
            )}
          </> :
          <>
            <IconButton onClick={() => setScreen('contacts')} className="nabi-float-left conversation-back-button">
              <ArrowBackIosIcon />
            </IconButton>
            <div className="conversation-avatar-wrapper">
              <Avatar src={dummyContacts[0].avatar} className="nabi-border-nabi conversation-avatar nabi-margin-center" />
              <Typography className="nabi-text-center"><span className="nabi-text-mediumbold">Mary M.</span></Typography>
            </div>
            <div className="conversation-item">
              <Conversation
                chats={chats}
                currentUser={uid}
              />
            </div>
            <TextField rows={2} multiline={true} fullWidth={true} value={message} onChange={(e) => setMessage(e.target.value)} />
            {writeError && <Typography color="error">{writeError}</Typography>}
            <Button className="nabi-display-block nabi-margin-top-xsmall" color="primary" variant="contained" onClick={sendMessage}>
              Send
            </Button>
          </>
        }
      </Grid>
    </div>
  )
}

export default Messages;
