import React, { Component } from 'react';
import { Layer, Image } from 'react-konva';
import UserPhotosLayer from './UserPhotosLayer';
import { PREVIEW_DETAILS_ENDPOINT, DESIGN_LAYER_STORAGE_BASE_URL, DESIGN_LAYER_BACKGROUND_PARAMETER_NAME, DESIGN_LAYER_FOREGROUND_PARAMETER_NAME } from './common/Config';
import $ from 'jquery';

const genImage = src => new Promise((resolve) => {
    const image = new window.Image()
    image.src = src
    image.onload = () => resolve(image)
})

const fakeAPIResponse = {"errorCode":0,"error":"","response":{"external_id":"8GlGeu7O9WU","width":"156.00","height":"113.00","images":[{"width":"43.11","height":"75.44","x":"100.475","y":"25.38"},{"width":"43.57","height":"75.21","x":"55.525","y":"12.995"},{"width":"42.88","height":"75.21","x":"12.19","y":"25.385"}]}}
const fakeAPIResponse2 = {"errorCode":0,"error":"","response":{"external_id":"fFcQ-6xRrmg","width":"113.00","height":"156.00","images":[{"width":"41.38","height":"44.88","x":"56.91","y":"62.54"},{"width":"43.24","height":"45.5","x":"13.47","y":"61.92"},{"width":"41.59","height":"43.85","x":"56.915","y":"17.035"},{"width":"42","height":"44.27","x":"14.3","y":"17.035"}]}}

export default class FlatPreview extends Component {

    constructor(props){
        super(props)
        this.state = {
            backgroundImage: null,
            foregroundImage: null,
            userImages: null,
            designDetails: fakeAPIResponse.response, //@fixme set null to use api
        };
        this.getUserPhotosDiameters();
        this.updateLayers(); //@fixme delete to use api
    }

    getUserPhotosDiameters() {
        //@fixme uncomment to use api
        // $.getJSON(PREVIEW_DETAILS_ENDPOINT + this.props.designId)
        //     .then((results) => {
        //         this.setState({ designDetails: results.response })
        //         this.updateLayers()
        //     });


    }

    updateLayers() {
        genImage(DESIGN_LAYER_STORAGE_BASE_URL + this.state.designDetails.external_id + DESIGN_LAYER_BACKGROUND_PARAMETER_NAME)
            .then(backgroundImage => this.setState({ backgroundImage }))
        genImage(DESIGN_LAYER_STORAGE_BASE_URL + this.state.designDetails.external_id + DESIGN_LAYER_FOREGROUND_PARAMETER_NAME)
            .then(foregroundImage => this.setState({ foregroundImage }))
    }

    calculatePixelXRatio() {
        return this.state.foregroundImage.naturalWidth / this.state.designDetails.width;

    }
    calculatePixelYRatio() {
        return this.state.foregroundImage.naturalHeight / this.state.designDetails.height;
    }

    render() {
        if(!this.state.designDetails || !this.state.foregroundImage) return null;
        let ratioX = this.calculatePixelXRatio();
        let ratioY = this.calculatePixelYRatio();
        return (
            <Layer>
                <Image
                    visible={true}
                    image={this.state.backgroundImage}
                    opacity={this.props.imageData.opacity}
                    x={this.props.imageData.x}
                    y={this.props.imageData.y}
                    scaleX={this.props.imageData.scaleX}
                    scaleY={this.props.imageData.scaleY}
                />
                <UserPhotosLayer
                    srcs = {this.props.src.userImages}
                    imagesDiameters ={this.state.designDetails.images}
                    designDetails ={{width: this.state.designDetails.width, height: this.state.designDetails.height}}
                    pixelToMMXRatio={ratioX}
                    pixelToMMYRatio={ratioY}
                    previewDimmensions={{width: this.state.foregroundImage.naturalWidth, height: this.state.foregroundImage.naturalHeight }}
                />
                <Image
                    visible={true}
                    image={this.state.foregroundImage}
                    opacity={this.props.imageData.opacity}
                    x={this.props.imageData.x}
                    y={this.props.imageData.y}
                    scaleX={this.props.imageData.scaleX}
                    scaleY={this.props.imageData.scaleY}
                />
            </Layer>
    )
    }
}