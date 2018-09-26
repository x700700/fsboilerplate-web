import * as types from './actionsTypes';


export const saveGame = cardsDeck => {
    return {
        type: types.GAME_SAVE,
        cardsDeck: cardsDeck
    }
};
export const setGameType = gameType => {
    return {
        type: types.SET_GAME_TYPE,
        gameType: gameType,
    }
};
