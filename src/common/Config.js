export const IMAGE_WIDTH = 400
export const IMAGE_HEIGHT = 200
export const LAYERS = 9
export const STAGES = 100
export const IMAGE_SOURCES = [...new Array(LAYERS).keys()].map(key => require('assets/400x200-' + key + '.jpeg'))
