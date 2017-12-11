import React, { Component } from 'react';
import { Image, Group } from 'react-konva';


const genImage = src => new Promise((resolve) => {
    const image = new window.Image()
    image.src = src
    image.onload = () => resolve(image)
});
/* to be fetched from API */
const flatPreviewData = {
    opacity: 0.7,
    scaleX: 0.25,
    scaleY: 0.25,
};
const MAGIC_Y_FACTOR = 62
const PIXEL_TO_MM_RATIO = 1.486
export default class FlatPreview extends Component {
    constructor(params){
        super(params)
        this.state = {
            userImages: [],
            designDetails : null, /* should be used to calculate PIXEL_TO_MM_RATIO dynamically*/
        }
    }


    componentDidMount() {
        this.props.srcs.map(src => {
            genImage(src)
                .then(userImage => {
                    var userImages = this.state.userImages.slice()
                    userImages.push(userImage)
                    this.setState({ userImages })
                })
        })

    }

    render() {
        return (

                <Group>
                    {this.props.imagesDiameters.map((diameters, i) => {
                        if(typeof this.state.userImages[i] === 'object' ){
                        let crop = {
                            x:10,
                            y:10,
                            height:20,
                            width:20
                        }/*@fixme passing crop to image makes images dark insteadof cropping them */
                        return <Image
                            visible={true}
                            image={this.state.userImages[i]}
                            opacity={flatPreviewData.opacity}
                            x={diameters.x * PIXEL_TO_MM_RATIO}
                            y={(diameters.y * PIXEL_TO_MM_RATIO - diameters.height * PIXEL_TO_MM_RATIO ) - MAGIC_Y_FACTOR }

                        />}
                    })}
                </Group>
        )
    }
}