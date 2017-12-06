import { IMAGE_SOURCES } from 'common/Config';

const generateNewDefaultLayer = layerId => ({
  opacity: 1,
  rotation: 0,
  x: 0,
  y: 0,
  scaleX: 0,
  scaleY: 0,
  skewX: 0,
  skewY: 0,
})

const defaultState = [
  generateNewDefaultLayer(0),
  generateNewDefaultLayer(1),
  generateNewDefaultLayer(2),
];

export default (state = defaultState, action) => {
  const newState = [ ...state ];
  switch (action.type) {
    case 'ADD_ONE_LAYER': {
      if (newState.length === IMAGE_SOURCES.length) {
        return newState;
      }
      return [
        ...newState,
        generateNewDefaultLayer(newState.length),
      ];
    }
    case 'REMOVE_ONE_LAYER': {
      if (newState.length === 0) {
        return newState;
      }
      return newState.slice(0, newState.length - 1);
    }
    case 'UPDATE_LAYER': {
      const { layerId, property, value } = action.payload;
      if (isNaN(value) || layerId >= newState.length) {
        return newState;
      }
      const newProperty = {};
      newProperty[property] = value;
      newState[layerId] = {
        ...newState[layerId],
        ...newProperty,
      }
      return newState;
    }
    default: {
      return newState;
    }
  }
}
