import consts from '../global/consts';
import { myFetch } from '../utils/myFetch';
import * as types from './actionsTypes';
import { setError } from './app.actions';
import { editedTrainingRename } from './exercises.actions';


// =================================================================================================================
// Get My Trainings
// =================================================================================================================
export const invalidateTrainings = () => {
    return {
        type: types.TRAININGS_INVALIDATE,
    }
};
const requestTrainings = () => {
    return {
        type: types.TRAININGS_REQUEST,
    }
};
const receiveTrainings = trainingsMap => {
    const invalidate = !trainingsMap;
    return {
        type: types.TRAININGS_RECEIVED,
        receivedAt: Date.now(),
        trainingsMap: trainingsMap,
        invalidate: invalidate,
    }
};

const shouldFetch = (shouldReloadSampleExercises, {trainingsMap, isFetching, didInvalidate}) => {
    if (isFetching) {
        return false;
    } else if (!trainingsMap) {
        return true;
    } else if (shouldReloadSampleExercises) {
        return true;
    } else {
        return didInvalidate
    }
};
export const getTrainings = () => {
    return (dispatch, getState) => {
        if (shouldFetch(getState().exercises.shouldReloadSampleExercises, getState().trainings)) {
            dispatch(invalidateTrainings());
            dispatch(requestTrainings());
            myFetch(dispatch, consts.API_TRAININGS, 'GET', null, fetchTrainingsSuccess, fetchTrainingsError);
        }
    }
};
const fetchTrainingsSuccess = (dispatch, trainings) => {
    dispatch(receiveTrainings(trainings));
};
const fetchTrainingsError = (dispatch, prefix, errorReason) => {
    dispatch(setError(prefix, errorReason));
    dispatch(receiveTrainings(null));
};

// =================================================================================================================
// exerciseCount
// =================================================================================================================
export const TrainingExercisesCountUpdate = (id, countUpdate) => {
    return {
        type: types.TRAINING_EXER_COUNT_UPD,
        trainingId: id,
        countUpdate: countUpdate,
    }
};

// =================================================================================================================
// Rename Training
// =================================================================================================================
const requestUpdateTraining = () => {
    return {
        type: types.TRAINING_UPDATE_REQUEST,
    }
};
const receiveUpdateTraining = updatedTraining => {
    return {
        type: types.TRAINING_UPDATE_RECEIVED,
        receivedAt: Date.now(),
        updatedTraining: updatedTraining,
    }
};
export const updateTraining = (updatedTraining) => {
    return (dispatch, getState) => {
        if (!getState().didInvalidate && !getState().isFetching) {
            dispatch(fetchUpdateTraining(updatedTraining));
        }
    }
};
const fetchUpdateTraining = (training) => {
    return dispatch => {
        const url = `${consts.API_TRAININGS}/${training.id}`;
        delete training.id;
        dispatch(requestUpdateTraining());
        myFetch(dispatch, url, 'PUT', training, fetchUpdateTrainingSuccess, fetchUpdateTrainingError)
    }
};
const fetchUpdateTrainingSuccess = (dispatch, updatedTraining) => {
    dispatch(receiveUpdateTraining(updatedTraining));
    dispatch(editedTrainingRename(updatedTraining.name));
};
const fetchUpdateTrainingError = (dispatch, prefix, errorReason) => {
    dispatch(setError(prefix, errorReason));
    dispatch(receiveUpdateTraining(null));
};


// =================================================================================================================
// Create Training
// =================================================================================================================
const requestCreateTraining = () => {
    return {
        type: types.TRAINING_CREATE_REQUEST,
    }
};
const receiveCreateTraining = newTraining => {
    return {
        type: types.TRAINING_CREATE_RECEIVED,
        receivedAt: Date.now(),
        newTraining: newTraining,
    }
};
export const createTraining = () => {
    return (dispatch, getState) => {
        if (!getState().didInvalidate && !getState().isFetching) {
            dispatch(fetchCreateTraining());
        }
    }
};
const fetchCreateTraining = () => {
    return dispatch => {
        const url = `${consts.API_TRAININGS}`;
        dispatch(requestCreateTraining());
        myFetch(dispatch, url, 'POST', null, fetchCreateTrainingSuccess, fetchCreateTrainingError)
    }
};
const fetchCreateTrainingSuccess = (dispatch, newTraining) => {
    dispatch(receiveCreateTraining(newTraining));
};
const fetchCreateTrainingError = (dispatch, prefix, errorReason) => {
    dispatch(setError(prefix, errorReason));
    dispatch(receiveCreateTraining(null));
};


// =================================================================================================================
// Archive Training
// =================================================================================================================
const requestArchiveTraining = () => {
    return {
        type: types.TRAINING_ARCHIVE_REQUEST,
    }
};
const receiveArchiveTraining = archivedTraining => {
    return {
        type: types.TRAINING_ARCHIVE_RECEIVED,
        receivedAt: Date.now(),
        archivedTraining: archivedTraining,
    }
};
export const archiveTraining = (archivedTrainingId) => {
    return (dispatch, getState) => {
        if (!getState().didInvalidate && !getState().isFetching) {
            dispatch(fetchArchiveTraining(archivedTrainingId));
        }
    }
};
const fetchArchiveTraining = (trainingId) => {
    return dispatch => {
        const url = `${consts.API_TRAININGS}/${trainingId}`;
        dispatch(requestArchiveTraining());
        myFetch(dispatch, url, 'DELETE', null, fetchArchiveTrainingSuccess, fetchArchiveTrainingError)
    }
};
const fetchArchiveTrainingSuccess = (dispatch, archivedTraining) => {
    dispatch(receiveArchiveTraining(archivedTraining));
};
const fetchArchiveTrainingError = (dispatch, prefix, errorReason) => {
    dispatch(setError(prefix, errorReason));
    dispatch(receiveArchiveTraining(null));
};


