export const IMAGE_WIDTH = 400
export const IMAGE_HEIGHT = 200
export const LAYERS = 9
export const STAGES = 100
export const PREVIEW_WIDTH = 324
export const PREVIEW_HEIGHT = 453
export const PREVIEW_DETAILS_ENDPOINT = 'http://optimalprint.dev/app-api/public-design/preview?design_id='
export const DESIGN_LAYER_STORAGE_BASE_URL = 'https://sl-public-test.s3-eu-west-1.amazonaws.com/do/'
export const DESIGN_LAYER_FOREGROUND_PARAMETER_NAME = '/design_layer-p1-en-GB'
export const DESIGN_LAYER_BACKGROUND_PARAMETER_NAME = '/background_layer-p1-en-GB'
export const IMAGE_SOURCES = [...new Array(LAYERS).keys()].map(key => require('assets/400x200-' + key + '.jpeg'))
