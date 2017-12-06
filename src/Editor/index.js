import React from 'react';
import { Stage } from 'react-konva';
import { IMAGE_WIDTH, IMAGE_HEIGHT, LAYERS, IMAGE_SOURCES } from 'common/Config';
import ImageLayer from 'common/ImageLayer';

import Settings from './Settings';

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

const Editor = () => (
  <Settings />
);
export default Editor;

// export default class Editor extends React.Component {
//   state = {
//     layers: getNewLayers(),
//     imageData: getNewImageData(),
//   }
//   render() {
//     return (
//       <div>
//         <div>
//         </div>
//         <Stage style={{display: 'inline-block'}} width={IMAGE_WIDTH} height={IMAGE_HEIGHT}>
//           {this.state.layers.map(imageKey => (
//             <ImageLayer
//               key={imageKey}
//               src={IMAGE_SOURCES[imageKey]}
//               imageData={this.state.imageData[imageKey]}
//             />
//           ))}
//         </Stage>
//       </div>
//     );
//   }
// }

