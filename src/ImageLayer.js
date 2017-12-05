import React, { Component } from 'react';
import { Layer, Image } from 'react-konva';

const genImage = src => new Promise((resolve) => {
  const image = new window.Image()
  image.src = src
  image.onload = () => resolve(image)
})

export default class ImageLayer extends Component {
  state = {
    image: null,
  }
  componentDidMount() {
    genImage(this.props.src)
      .then(image => this.setState({ image }))
  }
  render() {
    return (
      <Layer>
        <Image
          visible={true}
          image={this.state.image}
          opacity={this.props.imageData.opacity}
          rotation={this.props.imageData.rotation}
          x={this.props.imageData.x}
          y={this.props.imageData.y}
          scaleX={this.props.imageData.scaleX}
          scaleY={this.props.imageData.scaleY}
        />
      </Layer>
    )
  }
}
