# react-native-converse

A customizable, fast and easy react native chat module.

[![Gitter chat](https://badges.gitter.im/SpoonX/Dev.svg)](https://gitter.im/SpoonX/Dev)

## Installing

`yarn add react-native-converse` or `npm, i --save react-native-converse`.

## Usage

Here's an extended example of how you could use the module. Extended documentation will follow in the near future.

_**Note:** generally you'd get the messages from a a redux store for example. The following snippet is just to illustrate usage._

```jsx
import React, { Component } from 'react';

class ChatScreen extends Component {
  render() {
    const props = {
      user               : 1,    // Active user
      animated           : true, // Animate new messages
      onSubmit           : text => this.onSubmit(text),
      messageHydrator    : message => this.hydrateMessage(message),
      participantHydrator: participant => this.hydrateParticipant(participant),
      participants       : [
        {id: 1, displayName: 'RWOverdijk', avatar: 'https://placekitten.com/g/300/300'},
        {id: 2, displayName: 'Somebody', avatar: 'https://placekitten.com/g/300/300'},
      ],
      messages           : [
        {id: 1, author: 1, createdAt: new Date, content: `Hey! What's up!?`},
        {id: 2, author: 2, createdAt: new Date, content: `Your face is up`}
      ]
    }

    return <Chat {...props} theme={theme} />;
  }

  /**
   * Dispatch an event or something here.
   */
  onSubmit(text) {
    // ...
  }

  /**
   * Use this method to return the message object-structure as desired by the module.
   * This method makes it easier to use your own data format.
   */
  hydrateMessage({uuid, author, created, text}) {
    return {
      id         : uuid,
      participant: author.id,
      createdAt  : created,
      content    : text
    };
  }

  /**
   * Use this method to return the participant object-structure as desired by the module.
   * This method makes it easier to use your own data format.
   */
  hydrateParticipant({uuid, username, profile}) {
    return {id: uuid, displayName: username, avatar: profile.avatar};
  }
}

// Note: These are the defaults.
const theme = {
  chat: {
    backgroundColor: '#d4e2e3'
  },
  messageInput: {
    sendIcon: images.paperPlane,
    sendIconActive: images.paperPlaneActive,
    addIcon: images.add,
  },
  bubble: {
    fontSize: 14,

    outgoing: {
      backgroundColor: '#6585E8',
      textColor      : '#fff'
    },

    incoming: {
      backgroundColor: '#fff',
      textColor      : '#222222'
    },

    timestamp: {
      fontSize: 10
    }
  }
};
```

## State of the module

This module is currently usable, ish, if your intentions are to just implement a chat with your own styling.
If your intentions are to implement a lot of custom features, this module isn't for you. Yet.
This module is actively being developed and will offer a lot more flexibility and features.

Soon. For realsies.

## Values

While working on this module, the following values have been and will be kept in mind.

- **Performance.** Some components are limited in customization purely for the sake of performance.
- **Performance again.** Seriously, the chat should be as slick as possible.
- **Cater to the majority.** The components are designed around most common use.
- **Extendible.** Add what you need in a uniform way.

## Roadmap

- Allow for more customization.
- Custom animations.
- Avatars.
- Plugins and message types.
- Add more default message types.
- Documentation besides example.
- Add play-mode, adding messages with a customizable interval.

## License

MIT
