import React, { Component } from 'react'
import * as Animatable from 'react-native-animatable'
import { FlatList, Text, View, ViewPropTypes } from 'react-native'
import PropTypes from 'prop-types'
import styles, { themed } from './Bubble.styles'
import { TextBubble } from '../TextBubble'
import { ImageBubble } from '../ImageBubble'

export class Bubble extends Component {
  static propTypes = {
    user    : PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    theme   : PropTypes.object,
    animated: PropTypes.bool,
    item    : PropTypes.object,
    type    : PropTypes.string,
    types : PropTypes.object,
    defaultTypes: PropTypes.object,
  }

  static defaultProps = {
    animated: true,
    types: {},
    defaultTypes: {
      text: TextBubble,
      image: ImageBubble,
    }
  }

  _initialized = false

  render () {
    const {item, type} = this.props
    const theme        = themed(this.props.theme, this.isOutgoing())

    return this.renderAnimation(
      <View style={[styles.container, theme.container]}>
        {this.renderBubbleType(type, item)}
      </View>
    )
  }

  renderBubbleType (type, {content, createdAt}) {
    const BubbleContent = this.props.types[type] || this.props.defaultTypes[type];

    if (!BubbleContent) {
      throw new Error(`Unknown bubble type "" supplied. Did you forget to register your custom bubble type (prop "types")?`);
    }

    const props = {
      isOutgoing: this.isOutgoing(),
      content   : content,
      theme     : this.props.theme,
      createdAt
    }

    return <BubbleContent {...props} />
  }

  shouldComponentUpdate (nextProps, nextState) {
    const current = this.props.item
    const next    = nextProps.item

    return current.id !== next.id || current.content !== next.content
  }

  renderAnimation (bubble) {
    if (!this.props.animated) {
      return bubble
    }

    const animate = this.isOutgoing() ? 'zoomInRight' : 'zoomInLeft'

    if (this._initialized) {
      return bubble
    }

    this._initialized = true

    return (
      <Animatable.View duration={300} easing='ease-in' animation={animate}>
        {bubble}
      </Animatable.View>
    )
  }

  isOutgoing () {
    return this.props.item.participant === this.props.user
  }
}
