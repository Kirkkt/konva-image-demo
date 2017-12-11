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

const fakeAPIResponse = {"errorCode":0,"error":"","response":{"external_id":"8GlGeu7O9WU","width":"218.00","height":"305.00","images":[{"width":"60.84","height":"106.72","x":"15.62","y":"181.84"},{"width":"61.82","height":"106.72","x":"77.11","y":"164.27"},{"width":"61.17","height":"107.05","x":"140.89","y":"181.84"}]}}

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

    render() {
        if(!this.state.designDetails) return null;
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
                />
                <Image
                    visible={true}
                    image={this.state.foregroundImage}
                    opacity={1}
                    x={this.props.imageData.x}
                    y={this.props.imageData.y}
                    scaleX={this.props.imageData.scaleX}
                    scaleY={this.props.imageData.scaleY}
                />
            </Layer>
    )
    }
}