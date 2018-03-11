import React, { Component } from 'react'
import { Platform, Dimensions, FlatList, KeyboardAvoidingView, Text, View, StyleSheet } from 'react-native'
import PropTypes from 'prop-types'
import { Homefront } from 'homefront'
import { variables } from '../../theme'
import { Bubble } from '../Bubble'
import { MessageInput } from '../MessageInput'
import styles from './Chat.styles'

/**
 * - https://github.com/taskrabbit/react-native-parsed-text
 * - https://github.com/oblador/react-native-lightbox
 * - message hydrators
 * - Images
 * - Rename messageInput (is not only input)
 * - Styles (colors, fonts, sizes)
 * - Videos
 * - Sound clips
 * - Add message time (use moment)
 * - Group chat
 * - Optional opt-in sorting
 * - creation grouping (smart, by date)
 * - Bubble grouping (style wise, less padding, tower style like telegram)
 * - backgroundImage
 * - Use instance ID as key prefix
 */
export class Chat extends Component {

  static propTypes = {
    user               : PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    participants       : PropTypes.array.isRequired,
    messages           : PropTypes.array,
    animated           : PropTypes.bool,
    onSubmit           : PropTypes.func,
    renderBubble       : PropTypes.func,
    inputPlaceholder   : PropTypes.string,
    messageHydrator    : PropTypes.func,
    participantHydrator: PropTypes.func,
    renderMessageInput : PropTypes.func,
  }

  static defaultProps = {
    user: 1,

    animated: true,

    messages: []
  }

  constructor (props) {
    super(props)

    this.state = {
      initialized           : false,
      keyboardVerticalOffset: 0,
      theme                 : this.makeTheme(props.theme)
    }
  }

  makeTheme (theme = {}) {
    return Homefront.merge({}, variables, theme)
  }

  componentWillReceiveProps (nextProps) {
    if (this.props.theme !== nextProps.theme) {
      this.setState({theme: this.makeTheme(nextProps.theme)})
    }
  }

  hydrateMessage (message) {
    if (typeof this.props.messageHydrator === 'function') {
      return this.props.messageHydrator(message)
    }

    return message
  }

  hydrateParticipant(participant) {
    if (typeof this.props.participantHydrator === 'function') {
      return this.props.participantHydrator(participant)
    }

    return participant
  }

  onLayout ({nativeEvent: {layout: {height}}}) {
    this.setState({keyboardVerticalOffset: Dimensions.get('window').height - height})
  }

  shouldComponentUpdate (nextProps, nextState) {
    const hasVerticalOffset = typeof nextState.keyboardVerticalOffset === 'number'

    if (!nextState.initialized && hasVerticalOffset) {
      this.setState({initialized: true})
    }

    return hasVerticalOffset
  }

  avoidKeyboard (content) {
    if (Platform.OS === 'ios') {
      return (
        <KeyboardAvoidingView keyboardVerticalOffset={keyboardVerticalOffset} behavior='padding' style={styles.container}>
          {content}
        </KeyboardAvoidingView>
      )
    }

    return content
  }

  render () {
    const {keyboardVerticalOffset, theme} = this.state

    return (
      <View style={[styles.chatContainer, {backgroundColor: theme.chat.backgroundColor}]} onLayout={event => this.onLayout(event)}>
        <KeyboardAvoidingView keyboardVerticalOffset={keyboardVerticalOffset} behavior={Platform.OS === 'ios' ? 'padding' : null} style={styles.container}>
          <FlatList
            inverted
            style={styles.messageContainer}
            data={this.props.messages}
            keyExtractor={item => `cm_${item.id}`}
            ListHeaderComponent={() => this.renderFooter()}
            renderItem={(item) => this.renderItem(item)}
          />
          {this.renderMessageInput()}
        </KeyboardAvoidingView>
      </View>
    )
  }

  renderFooter () {
    return <View style={styles.footer} />
  }

  onSubmit (text) {
    if (typeof this.props.onSubmit === 'function') {
      return this.props.onSubmit(text)
    }
  }

  renderMessageInput () {
    if (typeof this.props.renderMessageInput === 'function') {
      return this.props.renderMessageInput()
    }

    return (
      <MessageInput
        theme={this.state.theme.messageInput}
        placeholder={this.props.inputPlaceholder}
        onSubmit={text => this.onSubmit(text)}
      />
    );
  }

  renderItem ({item, index}) {
    item                       = this.hydrateMessage(item)
    const {theme, initialized} = this.state
    const type                 = item.type || 'text'
    const props                = {
      user    : this.props.user,
      theme   : theme.bubble,
      animated: this.props.animated && initialized,
      item,
      type
    }

    if (typeof this.props.renderBubble === 'function') {
      const customBubble = this.props.renderBubble(props)

      if (customBubble) {
        return customBubble
      }
    }

    return (
      <Bubble {...props} />
    )
  }
}
