import React, { Component } from 'react';
import { Image, Group } from 'react-konva';


const genImage = src => new Promise((resolve) => {
    const image = new window.Image()
    image.src = src
    image.onload = () => resolve(image)
});
/* to be fetched from API */
const flatPreviewData = {
    opacity: 1,
};

export default class FlatPreview extends Component {
    constructor(params){
        super(params)
        this.state = {
            userImages: [],
            designDetails : null, /* should be used to calculate PIXEL_TO_MM_RATIO dynamically*/
        }
        console.log(this.props.pixelToMMRatio)
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
                        if(typeof this.state.userImages[i] === 'object'  ){
                            const image = this.state.userImages[i];
                        let crop = {
                            x:image.naturalWidth / 4,
                            y:10,
                            height: image.naturalHeight,
                            width:image.naturalWidth / 2
                        }
                        return (<Image
                            visible={true}
                            image={this.state.userImages[i]}
                            opacity={flatPreviewData.opacity}
                            x={diameters.x * this.props.pixelToMMXRatio}
                            y={diameters.y * this.props.pixelToMMYRatio}
                            scaleX={(diameters.width * this.props.pixelToMMYRatio)/image.naturalWidth}
                            scaleY={(diameters.height * this.props.pixelToMMYRatio)/image.naturalHeight}
                            crop={crop}
                        />)
                           }
                    })}
                </Group>
        )
    }
}