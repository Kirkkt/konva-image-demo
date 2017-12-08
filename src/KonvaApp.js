import React, { Component } from 'react';
import { Stage } from 'react-konva';
import { IMAGE_WIDTH, IMAGE_HEIGHT, LAYERS, STAGES, PREVIEW_HEIGHT, PREVIEW_WIDTH } from './common/Config';
import ImageLayer from './ImageLayer';
import FlatPreview from './FlatPreview';

const ImageSources = [...new Array(LAYERS).keys()].map(key => require('./assets/400x200-' + key + '.jpeg'))

const getNewLayers = () => [...new Array(LAYERS).keys()];
const getNewImageData = () => [...new Array(STAGES).keys()].map(stageKey => [...new Array(LAYERS).keys()].map(imageKey => ({
  opacity: Math.random(),
  rotation: 360 * Math.random(),
  x: IMAGE_WIDTH * (.2 * Math.random() - .1),
  y: IMAGE_HEIGHT * (.2 * Math.random() - .1),
  scaleX: .9 + .2 * Math.random(),
  scaleY: .7 + .6 * Math.random(),
}))) ;

const flatPreviewData = {
  opacity: 0.5,
  rotation: 0,
  x: 0,
  y: 0,
  scaleX: 1,
  scaleY: 1,
};

const flatPreviewSrc = {
  userImages: [
    require('./assets/user_images/1.jpg'),
    require('./assets/user_images/2.jpg'),
    require('./assets/user_images/3.jpg'),
  ],
};

const sampleDesignId = 858542

export default class KonvaApp extends Component {
  state = {
    layers: getNewLayers(),
    imageData: getNewImageData(),
    flatPreviewData: flatPreviewData,
    flatPreviewSrc: flatPreviewSrc,
  }
  render() {
    return (
      <div>
        <h1>Flat preview</h1>
        <Stage style={{display: 'inline-block'}} key="randomkey2" width={PREVIEW_WIDTH} height={PREVIEW_HEIGHT}>
          <FlatPreview
              key={"randomkey"}
              src={flatPreviewSrc}
              imageData={this.state.flatPreviewData}
              designId={sampleDesignId}
          />
        </Stage>
        <Stage style={{display: 'inline-block'}} key="randomkey3" width={PREVIEW_WIDTH} height={PREVIEW_HEIGHT}>
          <FlatPreview
              key={"randomkey"}
              src={flatPreviewSrc}
              imageData={this.state.flatPreviewData}
              designId={sampleDesignId}
          />
        </Stage>
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
        {[...new Array(STAGES).keys()].map(stageKey => (
          <Stage style={{display: 'inline-block'}} key={stageKey} width={IMAGE_WIDTH} height={IMAGE_HEIGHT}>
            {this.state.layers.map(imageKey => (
              <ImageLayer
                key={imageKey}
                src={ImageSources[imageKey]}
                imageData={this.state.imageData[stageKey][imageKey]}
              />
            ))}
          </Stage>
        ))}
      </div>
    );
  }
}

