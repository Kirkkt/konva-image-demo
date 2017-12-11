import store from '../store';

export const addOneLayer = () => {
  store.dispatch({
    type: 'ADD_ONE_LAYER',
  });
}

export const removeOneLayer = () => {
  store.dispatch({
    type: 'REMOVE_ONE_LAYER',
  });
}

export const updateLayer = ({ layerId, property, value }) => {
  store.dispatch({
    type: 'UPDATE_LAYER',
    payload: {
      layerId,
      property,
      value,
    }
  });
};
