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

export default class FlatPreview extends Component {

    constructor(props){
        super(props)
        this.state = {
            backgroundImage: null,
            foregroundImage: null,
            userImages: null,
            designDetails: null,
        };
        this.getUserPhotosDiameters();
    }

    getUserPhotosDiameters() {
        $.getJSON(PREVIEW_DETAILS_ENDPOINT + this.props.designId)
            .then((results) => {
                this.setState({ designDetails: results.response })
                this.updateLayers()
            });
    }

    updateLayers() {
        console.log(DESIGN_LAYER_STORAGE_BASE_URL + this.state.designDetails.external_id + DESIGN_LAYER_BACKGROUND_PARAMETER_NAME)
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