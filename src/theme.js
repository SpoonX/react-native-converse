export const images = {
  paperPlaneActive: require('./image/paper-plane-active.png'),
  paperPlane: require('./image/paper-plane.png'),
  add: require('./image/add.png'),
}

export const variables = {
  chat  : {
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
}
