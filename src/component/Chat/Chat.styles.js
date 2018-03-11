import { StyleSheet } from 'react-native'

export default StyleSheet.create({
  chatContainer: {
    flex: 1,
  },
  container: {
    flex: 1
  },
  messageContainer: {
    flex: 1,
  },
  footer: {
    paddingTop: 5
  }
})

export const themed = (variables) => StyleSheet.create({
  chatContainer: {
    flex: 1,
    backgroundColor: variables.chat.backgroundColor,
  },
  container: {
    flex: 1
  },
  messageContainer: {
    flex: 1,
    marginBottom: 5
  }
})
