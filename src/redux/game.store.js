import * as types from './actionsTypes';
import consts from '../global/consts';


const gameReducer = (  state = {
                                cardsDeck: null,
                                gameType: consts.GAME_TYPE_UNKNOWN,
                            },
                            action) => {

    switch (action.type) {

        case types.GAME_SAVE:
            return {...state, cardsDeck: action.cardsDeck};

        case types.SET_GAME_TYPE:
            return {...state, gameType: action.gameType};

        default:
            return state;
    }
};
export default gameReducer;
