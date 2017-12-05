import React, { Component } from 'react';
import { Stage } from 'react-konva';
import { IMAGE_WIDTH, IMAGE_HEIGHT } from './common/Config';
import ImageLayer from './ImageLayer';

const getNewLayers = () => [...new Array(9).keys()];
const getNewImageData = () => [...new Array(100).keys()].map(stageKey => [...new Array(9).keys()].map(imageKey => ({
  opacity: Math.random(),
  rotation: 360 * Math.random(),
  x: IMAGE_WIDTH * (.2 * Math.random() - .1),
  y: IMAGE_HEIGHT * (.2 * Math.random() - .1),
  scaleX: .9 + .2 * Math.random(),
  scaleY: .7 + .6 * Math.random(),
}))) ;

export default class KonvaApp extends Component {
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
        {[...new Array(100).keys()].map(stageKey => (
          <Stage style={{display: 'inline-block'}} key={stageKey} width={IMAGE_WIDTH} height={IMAGE_HEIGHT}>
            {this.state.layers.map(imageKey => (
              <ImageLayer
                key={imageKey}
                src={'http://localhost:8080/400x200-' + imageKey + '.jpeg'}
                imageData={this.state.imageData[stageKey][imageKey]}
              />
            ))}
          </Stage>
        ))}
      </div>
    );
  }
}

