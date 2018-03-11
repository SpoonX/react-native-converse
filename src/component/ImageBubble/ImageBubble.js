import React, { Component } from 'react'
import { TextInput, Text, View, TouchableOpacity, Image } from 'react-native'
import PropTypes from 'prop-types'
import Lightbox from 'react-native-lightbox'
import styles from './ImageBubble.styles'
import { Timestamp } from '../Timestamp'

export class ImageBubble extends Component {
  static propTypes = {
    content   : PropTypes.object,
    style     : PropTypes.object,
    isOutgoing: PropTypes.bool
  }

  state = {
    resizeMode: 'cover'
  }

  render () {
    const {resizeMode}                 = this.state
    const {content: {source, caption}} = this.props

    const imageStyle = {
      maxWidth    : '100%',
      maxHeight   : '100%',
      height      : 100,
      width : 100,
      borderRadius: 5
    }

    return (
      <View>
        <Lightbox>
          <Image style={imageStyle} source={{uri: source}} resizeMode={'contain'} />
        </Lightbox>
        <View style={styles.footer}>
          {this.renderCaption(caption)}
          <Timestamp {...this.props} />
        </View>
      </View>
    )
  }

  renderCaption (caption) {
    if (!caption) {
      return null
    }

    const {isOutgoing, theme}            = this.props
    const {outgoing, incoming, fontSize} = theme

    const captionStyle = {
      color: isOutgoing ? outgoing.textColor : incoming.textColor,
      fontSize
    }

    return <Text style={captionStyle}>{caption}</Text>
  }
}
