import React, {Component} from 'react';
import { HoverImageContainer, BackgroundImage, PlayImage, DeleteImage } from "./HoverImage.style";


class HoverImage extends Component {
    render = () => {
        const { id, bgImg, playImg, deleteImg, onClick } = this.props;
        return (
            <HoverImageContainer id={id}>
                <BackgroundImage id='background-image' src={bgImg} alt=''/>

                {this.props.children}

                <PlayImage id='play-image' src={playImg} alt='Play' comp={this}
                           onClick={() => onClick()}
                />
                {deleteImg &&
                    <DeleteImage id='delete-image' src={deleteImg} alt='del' comp={this}/>
                }
            </HoverImageContainer>
        );
    };
}
export default HoverImage;
