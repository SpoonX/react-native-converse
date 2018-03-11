import {StyleSheet} from 'react-native'

export default StyleSheet.create({
  container: {
    maxWidth           : '55%',
    marginHorizontal: 10,
    marginVertical  : 5,
    borderRadius    : 10,
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowRadius: 0.2,
    shadowOpacity: 0.15,
    elevation: 1
  },
})

export const themed = ({outgoing, incoming, fontSize}, isOutgoing) => ({
  container: {
    backgroundColor                                     : isOutgoing ? outgoing.backgroundColor : incoming.backgroundColor,
    alignSelf                                           : isOutgoing ? 'flex-end' : 'flex-start',
    [`borderBottom${isOutgoing ? 'Right' : 'Left'}Radius`]: 0,
  },

  textMessage: {
    color: isOutgoing ? outgoing.textColor : incoming.textColor,
    fontSize
  },
})
