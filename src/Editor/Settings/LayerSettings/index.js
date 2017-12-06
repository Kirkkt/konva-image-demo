import React from 'react';
import styled from 'styled-components';

import { updateLayer } from 'actions/editor';
import { IMAGE_SOURCES } from 'common/Config';
import LayerPreview from './LayerPreview';

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
    <LayerSettingsLine layerData={layerData} layerId={layerId} property="skewX" />
    <LayerSettingsLine layerData={layerData} layerId={layerId} property="skewY" />
  </LayerSettingsPanel>
);

export default LayerSettings;
