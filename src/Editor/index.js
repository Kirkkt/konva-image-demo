import React, { Component } from 'react';
import { Stage } from 'react-konva';
import { IMAGE_WIDTH, IMAGE_HEIGHT, LAYERS, IMAGE_SOURCES } from 'common/Config';
import ImageLayer from 'common/ImageLayer';

const getNewLayers = () => [...new Array(LAYERS).keys()];
const getNewImageData = () => [...new Array(LAYERS).keys()].map(imageKey => ({
  opacity: Math.random(),
  rotation: 360 * Math.random(),
  x: IMAGE_WIDTH * (.2 * Math.random() - .1),
  y: IMAGE_HEIGHT * (.2 * Math.random() - .1),
  scaleX: .9 + .2 * Math.random(),
  scaleY: .7 + .6 * Math.random(),
  skewX: Math.random(),
  skewY: Math.random(),
}));

export default class Editor extends Component {
  state = {
    layers: getNewLayers(),
    imageData: getNewImageData(),
  }
  render() {
    return (
      <div>
        <div>
        <button onClick={
          () => {
            this.setState({
              layers: getNewLayers(),
              imageData: getNewImageData(),
            })
          }
        }>
          <h1>reload</h1>
        </button>
        <button onClick={
          () => {
            this.state.imageData.forEach(data => {
              data[0].rotation = 360 - data[0].rotation;
            })
            this.forceUpdate()
          }
        }>
          <h1>change one layer</h1>
        </button>
        </div>
        <Stage style={{display: 'inline-block'}} width={IMAGE_WIDTH} height={IMAGE_HEIGHT}>
          {this.state.layers.map(imageKey => (
            <ImageLayer
              key={imageKey}
              src={IMAGE_SOURCES[imageKey]}
              imageData={this.state.imageData[imageKey]}
            />
          ))}
        </Stage>
      </div>
    );
  }
}

