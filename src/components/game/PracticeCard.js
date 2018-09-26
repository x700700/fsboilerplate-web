import React, { Component } from 'react';
import { PieChart } from 'react-easy-chart'; // HowTo: Easy Charts - https://rma-consulting.github.io/react-easy-chart/pie-chart/index.html
import starsGif from '../../assets/stars_track.gif';
import { CardFace } from './PracticeComponents';
import { CardContainer, CardSurface, FinaleContainer, FinaleChart, FinaleGif } from './PracticeCard.style';


const sideQ = 1;

class PracticeCard extends Component {
    render = () => {
        const {cardsDeck, exercise, side, gameStatus, CardRotate, CardHovered} = this.props;
        let cardColor = side === sideQ || gameStatus >= 1.0 ? '#efffff' : '#fffda8';
        return (
            <CardContainer id='practice-card-container'>
                {gameStatus < 1.0 &&
                    <CardSurface
                        cardColor={cardColor}
                        onClick={() => this.CardRotateIfNotSelected(CardRotate)}
                        onMouseOver={() => CardHovered(true)}
                        onMouseLeave={() => CardHovered(false)}
                    >
                        <CardFace exercise={exercise} side={side} SkipCardRotate={this.SkipCardRotate} gameStatus={gameStatus}/>
                    </CardSurface>
                }
                {gameStatus >= 1.0 &&
                    <FinaleContainer id='finale-container'>
                        <FinaleGif src={starsGif} alt=''/>
                        <FinaleChart id='finale-chart'>
                            <PieChart
                            size={220}
                            innerHoleSize={89}
                            labels
                            data={cardsDeck.pieChartData()}
                            />
                        </FinaleChart>
                        <CardSurface id='card-space' hide={true}/>
                    </FinaleContainer>
                }
            </CardContainer>
        );
    };
    constructor(props) {
        super(props);
        this.skipCardRotate = false;
    }
        SkipCardRotate = () => {
        this.skipCardRotate = true;
    };
    CardRotateIfNotSelected = (CardRotate) => {
        if (!this.skipCardRotate) {
            CardRotate();
        }
        this.skipCardRotate = false;
    }
}

export default PracticeCard;
