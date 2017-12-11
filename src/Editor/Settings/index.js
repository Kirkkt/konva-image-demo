import React from 'react';
import { connect } from 'react-redux';

import { addOneLayer, removeOneLayer } from 'actions/editor';
import LayerSettings from './LayerSettings';

const HowManyLayers = ({ editor }) => (
  <div>
    How many layers? { editor.length + ' ' }
    <button onClick={removeOneLayer}>-</button>
    <button onClick={addOneLayer}>+</button>
  </div>
)

const Settings = ({ editor }) => (
  <div>
    <HowManyLayers editor={editor} />
    {editor.map((layerData, index) => (
      <LayerSettings
        layerData={layerData}
        layerId={index}
        key={index}
      />
    ))}
  </div>
);
export default connect(
  ({ editor }) => ({
    editor,
  })
)(Settings);
