import React from 'react';
import { connect } from 'react-redux';
import { Stage } from 'react-konva';
import styled from 'styled-components';

import { IMAGE_WIDTH, IMAGE_HEIGHT, IMAGE_SOURCES } from 'common/Config';
import ImageLayer from 'common/ImageLayer';

const Wrapper = styled.div`
  margin: auto;
  border: 10px solid #ccc;
  border-radius: 5px;
  width: ${IMAGE_WIDTH}px;
  height: ${IMAGE_HEIGHT}px;
`

const ImageStage = ({ editor }) => (
  <Wrapper>
    <Stage width={IMAGE_WIDTH} height={IMAGE_HEIGHT}>
      {editor.map((layerData, layerId) => (
        <ImageLayer
          key={layerId}
          src={IMAGE_SOURCES[layerId]}
          imageData={layerData}
        />
      ))}
    </Stage>
  </Wrapper>
);

export default connect(({ editor }) => ({
  editor,
}))(ImageStage);
