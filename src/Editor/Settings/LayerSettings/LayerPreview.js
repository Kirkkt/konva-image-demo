import React, { Component } from 'react';
import { Stage, Layer, Image } from 'react-konva';

const genImage = src => new Promise((resolve) => {
  const image = new window.Image()
  image.src = src
  image.onload = () => resolve(image)
})

export default class LayerPreview extends Component {
  state = {
    image: null,
  }
  componentDidMount() {
    genImage(this.props.src)
      .then(image => this.setState({ image }))
  }
  render() {
    return (
      <Stage width={200} height={100}>
        <Layer>
          <Image
            visible={true}
            image={this.state.image}
            scaleX={0.5}
            scaleY={0.5}
          />
        </Layer>
      </Stage>
    )
  }
}
