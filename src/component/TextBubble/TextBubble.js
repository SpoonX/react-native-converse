import React, { Component } from 'react'
import { TextInput, Text, View, TouchableOpacity, Image } from 'react-native'
import PropTypes from 'prop-types'
import styles from './TextBubble.styles'
import { Timestamp } from '../Timestamp'

export class TextBubble extends Component {
  static propTypes = {
    content   : PropTypes.string,
    createdAt : PropTypes.instanceOf(Date),
    theme     : PropTypes.object,
    isOutgoing: PropTypes.bool,
  }

  render () {
    const {isOutgoing, theme, content, createdAt}   = this.props
    const {outgoing, incoming, fontSize} = theme

    const style = {
      color: isOutgoing ? outgoing.textColor : incoming.textColor,
      fontSize
    }

    return (
      <View style={styles.wrapper}>
        <Text style={style}>{content}</Text>
        <Timestamp {...this.props} />
      </View>
    )
  }
}
