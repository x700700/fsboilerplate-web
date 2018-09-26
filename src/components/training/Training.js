import React, { Component } from 'react';
import { ThemeProvider } from 'styled-components';
import PropTypes from 'prop-types';
import consts from '../../global/consts'
import iconEdit from '../../assets/pencil.png';
import starIconImg from '../../assets/starIcon.png';
import difficultyIconImg from '../../assets/difficulty_icon.png';
import { colorTheme } from "../../global/theme.colors";
import Card from '../tools/Card';
import { Stats, Body, Main} from "./Training.style";
import { Rate } from '../tools/RateBars';
import { Header } from './Header';
import { SampleExercise } from './SampleExercise';
import HoverContextMenuBox from '../tools/HoverConextMenuBox'
import {modelValidId} from '../../utils/misc';


const theme = {
    width: '10.8em',
};
const bottomTheme = {
    height: '1.4',
    bg: colorTheme.col1_m,
    color: colorTheme.col1_l3,
    shadow: colorTheme.col1_d4,
    textAlign: 'center',
    imageAlign: '42%',
    margin: '0.1rem',
    padding: '0.15rem',
    fontSize: '90%',
    imgHeight: '20px',
    imgWidth: '20px',
    paddingBottom: '0.3rem',
};
const contextMenuItems = [
    {
        action: consts.TRAINING_ACTIONS.EDIT,
        icon: iconEdit,
        height: '13px',
        width: '120px',
    },
    /* {
        action: consts.TRAINING_ACTIONS.DELETE,
        icon: iconDelete,
        height: '20px',
        width: '20px',
    }, */
];

class Training extends Component {
    render = () => {
        const { training } = this.props;
        const bottomHover = this.state.trainingHover && modelValidId(training.id);
        const bottomText = `${training.exercisesCount} cards`;
        return (
            <ThemeProvider theme={theme}>
                <Card id='training-card'>
                    <Header id='header' training={training} UpdateField={this.props.trainingRename}/>
                    <Body id='training-container'
                         onMouseOver={() => this.MouseOver()}
                         onMouseLeave={() => this.MouseLeave()}
                    >
                        <Main id='training-main'>
                            <SampleExercise exercise={training.sampleExercise || {}}
                                            trainingHover={this.state.trainingHover}
                                            onClick={() => this.props.trainingPlay(training)}
                            />
                            <Stats id='training-stats'>
                                <Rate title='Popularity' count={training.popularity} icon={starIconImg}/>
                                <Rate title='Difficulty' count={training.difficulty} icon={difficultyIconImg}/>
                            </Stats>
                        </Main>
                        <HoverContextMenuBox id='training-context-menu' theme={bottomTheme} text={bottomText}
                                             menuItems={contextMenuItems} isHover={bottomHover}
                                             onClick={this.menuItemClicked}
                        />
                    </Body>
                </Card>
            </ThemeProvider>
        );
    };
    constructor(props) {
        super(props);
        this.state = {
            trainingHover: false
        };
    }
    componentDidMount() {
    }
    menuItemClicked = (action) => {
        console.log(`Clicked [${action}] for training [${this.props.training.name}]`, action);
        switch (action) {
            case consts.TRAINING_ACTIONS.EDIT:
                modelValidId(this.props.training.id) && this.props.trainingEdit(this.props.training);
                break;

            case consts.TRAINING_ACTIONS.DELETE:
                modelValidId(this.props.training.id) && this.props.trainingArchive(this.props.training);
                break;


            default:
        }
    };
    MouseOver = () => {
        this.setState({trainingHover: true});
    };
    MouseLeave = () => {
        this.setState({trainingHover: false});
    };
}
Training.propTypes = {
    training: PropTypes.object.isRequired,
    trainingPlay: PropTypes.func.isRequired,
    trainingEdit: PropTypes.func.isRequired,
    trainingArchive: PropTypes.func.isRequired,
};
export default Training;

