import React, { Component } from 'react'
import { TextInput, Text, View, TouchableOpacity, Image } from 'react-native'
import PropTypes from 'prop-types'
import moment from 'moment/moment'

export class Timestamp extends Component {
  static propTypes = {
    createdAt : PropTypes.instanceOf(Date),
    theme     : PropTypes.object,
    isOutgoing: PropTypes.bool,
  }

  render () {
    const {isOutgoing, theme, createdAt}  = this.props
    const {outgoing, incoming, timestamp} = theme

    const style = {
      color    : isOutgoing ? outgoing.textColor : incoming.textColor,
      fontSize : timestamp.fontSize,
      alignSelf: 'flex-end',
      opacity  : 0.8,
    }

    return <Text style={style}>{moment(createdAt).format('HH:mm')}</Text>
  }
}
