import * as types from './actionsTypes';


export const setCurrentPage = currentPage => {
    return {
        type: types.APP_SET_CURRENT_PAGE,
        currentPage: currentPage
    }
};

export const setError = (prefix, errorReason) => {
    const errorMsg = `Error ${prefix} - ${errorReason}`;
    console.error(errorMsg);
    return {
        type: types.APP_SET_ERROR,
        error: errorMsg
    }
};
export const resetError = () => {
    return {
        type: types.APP_RESET_ERROR,
    }
};

export const setPlayedTraining = (trainingId, reload) => {
    return {
        type: types.APP_SET_TRAINING_PLAYED,
        playedTrainingId: trainingId,
        reload: reload,
    };
};

export const setEditedTraining = (trainingId) => {
    return {
        type: types.APP_SET_TRAINING_EDITED,
        editedTrainingId: trainingId,
    };
};
