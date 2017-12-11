import React from 'react';
import styled from 'styled-components';

import { updateLayer } from 'actions/editor';
import { IMAGE_SOURCES, IMAGE_HEIGHT, IMAGE_WIDTH } from 'common/Config';
import LayerPreview from './LayerPreview';

const STEPS = {
  opacity: 0.1,
  rotation: 10,
  x: 10,
  y: 10,
  scaleX: 0.1,
  scaleY: 0.1,
  cropX: 10,
  cropY: 10,
  cropWidth: 10,
  cropHeight: 10,
  skewX: 0.1,
  skewY: 0.1,
};

const getOnLayerSettingsChange = (layerId, property) => event => {
  updateLayer({ layerId, property, value: +event.target.value });
};

const Label = styled.div`
  display: inline-block;
  width: 80px;
  text-align: right;
`

const LayerSettingsLine = ({ layerData, property, layerId }) => (
  <div>
    <Label>{property}:</Label>
    <input
      type="number"
      value={layerData[property]}
      onChange={getOnLayerSettingsChange(layerId, property)}
      step={STEPS[property] || 1}
      style={{ width: 116 }}
    />
  </div>
)

const LayerSettingsPanel = styled.div`
  display: inline-block;
  border: 1px solid #ccc;
  margin: 10px;
`

const LayerSettings = ({ layerData, layerId }) => (
  <LayerSettingsPanel>
    <div>Settings for layer {layerId}</div>
    <LayerPreview src={IMAGE_SOURCES[layerId]} />
    <LayerSettingsLine layerData={layerData} layerId={layerId} property="opacity" />
    <LayerSettingsLine layerData={layerData} layerId={layerId} property="rotation" />
    <LayerSettingsLine layerData={layerData} layerId={layerId} property="x" />
    <LayerSettingsLine layerData={layerData} layerId={layerId} property="y" />
    <LayerSettingsLine layerData={layerData} layerId={layerId} property="scaleX" />
    <LayerSettingsLine layerData={layerData} layerId={layerId} property="scaleY" />
    <LayerSettingsLine layerData={layerData} layerId={layerId} property="cropX" />
    <LayerSettingsLine layerData={layerData} layerId={layerId} property="cropY" />
    <LayerSettingsLine layerData={layerData} layerId={layerId} property="cropWidth" />
    <LayerSettingsLine layerData={layerData} layerId={layerId} property="cropHeight" />
    <LayerSettingsLine layerData={layerData} layerId={layerId} property="skewX" />
    <LayerSettingsLine layerData={layerData} layerId={layerId} property="skewY" />
  </LayerSettingsPanel>
);

export default LayerSettings;
