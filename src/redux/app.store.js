import * as types from './actionsTypes';


const appReducer = (  state = {
                          currentPage: '',
                          error: null,
                          playedTrainingId: -1,
                          reloadPlayedTraining: false,
                          editedTrainingId: -1,
                      },
                      action) => {

    switch (action.type) {

        case types.APP_SET_CURRENT_PAGE:
            return {...state, currentPage: action.currentPage};

        case types.APP_SET_ERROR:
            return {...state, error: action.error};

        case types.APP_RESET_ERROR:
            return {...state, error: null};

        case types.APP_SET_TRAINING_PLAYED:
            return {
                ...state,
                playedTrainingId: action.playedTrainingId,
                reloadPlayedTraining: action.reload,
            };

        case types.APP_SET_TRAINING_EDITED:
            return {
                ...state,
                editedTrainingId: action.editedTrainingId,
            };

        default:
            return state;
    }
};
export default appReducer;
