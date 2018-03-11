import {StyleSheet} from 'react-native'

export const themed = ({outgoing, incoming, timestamp, fontSize}, isOutgoing) => ({
  textMessage: {
    color: isOutgoing ? outgoing.textColor : incoming.textColor,
    fontSize
  }
})

export default StyleSheet.create({
  wrapper: {
    padding: 10
  }
})
