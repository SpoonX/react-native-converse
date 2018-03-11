import React, { Component } from 'react'
import { TextInput, Text, View, TouchableOpacity, Image } from 'react-native'
import PropTypes from 'prop-types'
import styles from './MessageInput.styles'

/**
 * - animations
 * - message hydrators
 * - Images
 * - Videos
 * - Sound clips
 * - Group chat
 * - Optional opt-in sorting
 * - creation grouping (smart, by date)
 */
export class MessageInput extends Component {

  static propTypes = {
    onSubmit: PropTypes.func,
    theme: PropTypes.object,
    placeholder: PropTypes.string
  }

  static defaultProps = {
    placeholder: 'Type a message...'
  }

  state = {
    text: ''
  }

  render () {
    const { theme, placeholder } = this.props
    const { text } = this.state

    return (
      <View style={styles.container}>
        <TouchableOpacity style={[styles.barButton, styles.addButton]}>
          <Image source={theme.addIcon} />
        </TouchableOpacity>
        <TextInput
          placeholder={placeholder}
          onChangeText={text => this.setState({text})}
          underlineColorAndroid='rgba(0,0,0,0)'
          value={text}
          style={styles.input}
        />
        <TouchableOpacity style={[styles.barButton, styles.submitButton]} onPress={() => this.onSubmit()}>
          <Image source={ text.length ? theme.sendIconActive : theme.sendIcon } />
        </TouchableOpacity>
      </View>
    )
  }

  onSubmit () {
    const { text } = this.state

    if (!text.length) {
      return
    }

    if (typeof this.props.onSubmit === 'function') {
      this.props.onSubmit(text)
    }

    this.setState({text: ''})
  }
}
