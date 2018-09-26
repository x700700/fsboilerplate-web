import consts from '../global/consts';
import {builtinValidId, validateId} from '../utils/misc';
import { myFetch } from '../utils/myFetch';
import * as types from './actionsTypes';
import { setError } from './app.actions';
import { invalidateTrainings, TrainingExercisesCountUpdate } from './trainings.actions';


// Todo: disable redux_logger in production!!

// =================================================================================================================
// Add Exercise
// =================================================================================================================
const requestAddExercise = () => {
    return {
        type: types.EXER_ADD_REQUEST,
    }
};
const receiveAddExercise = newExercise => {
    return {
        type: types.EXER_ADD_RECEIVED,
        receivedAt: Date.now(),
        newExercise: newExercise,
    }
};
export const addExercise = (trainingId) => {
    return (dispatch, getState) => {
        if (!validateId(dispatch, trainingId, 'Add Exercise'))
            return;
        if (!getState().didInvalidate && !getState().isFetching) {
            dispatch(fetchCreateExercise(trainingId));
        }
    }
};
const fetchCreateExercise = (trainingId) => {
    return dispatch => {
        dispatch(requestAddExercise());
        myFetch(dispatch, `${consts.API_TRAININGS}/${trainingId}/exercises`, 'POST', null, fetchCreateExerciseSuccess, fetchCreateExerciseError)
    }
};
const fetchCreateExerciseSuccess = (dispatch, exercise) => {
    dispatch(receiveAddExercise(exercise));
    dispatch(TrainingExercisesCountUpdate(exercise.trainingId, 1));
};
const fetchCreateExerciseError = (dispatch, prefix, errorReason) => {
    dispatch(setError(prefix, errorReason));
    dispatch(receiveAddExercise(null));
};

// =================================================================================================================
// Update Exercise
// =================================================================================================================
const requestUpdateExercise = (updatedExercise) => {
    return {
        type: types.EXER_UPDATE_REQUEST,
        updatedExercise: updatedExercise,
    }
};
const receiveUpdateExercise = updatedExercise => {
    return {
        type: types.EXER_UPDATE_RECEIVED,
        receivedAt: Date.now(),
        updatedExercise: updatedExercise,
        shouldReloadSampleExercises: updatedExercise? updatedExercise.shouldReloadSampleExercises : false,
    }
};
export const updateExercise = (updatedExercise) => {
    /*
    // Unnecessary! - Unicode text is encoded to utf8 automatically via stringify().
    //
    updatedExercise.question = utf8.encode(updatedExercise.question);
    updatedExercise.answer = utf8.encode(updatedExercise.answer);
    */
    return (dispatch, getState) => {
        if (!validateId(dispatch, updatedExercise.id, 'Update Exercise'))
            return;
        if (!getState().didInvalidate && !getState().isFetching) {
            dispatch(fetchUpdateExercise(updatedExercise));
        }
    }
};
const fetchUpdateExercise = (exercise) => {
    return dispatch => {
        dispatch(requestUpdateExercise(exercise));
        const updateInfo = {
            question: exercise.question,
            answer: exercise.answer,
        };
        myFetch(dispatch, `${consts.API_TRAININGS}/${exercise.trainingId}/exercises/${exercise.id}`, 'PUT', updateInfo, fetchUpdateExerciseSuccess, fetchUpdateExerciseError)
    }
};
const fetchUpdateExerciseSuccess = (dispatch, exercise) => {
    dispatch(receiveUpdateExercise(exercise));
    if (exercise.shouldReloadSampleExercises) {
        dispatch(invalidateTrainings());
    }
};
const fetchUpdateExerciseError = (dispatch, prefix, errorReason) => {
    dispatch(setError(prefix, errorReason));
    dispatch(receiveUpdateExercise(null));
};

// =================================================================================================================
// Delete Exercise
// =================================================================================================================
const requestDelExercise = id => {
    return {
        type: types.EXER_DEL_REQUEST,
        exerciseId: id,

    }
};
const receiveDelExercise = deletedExercise => {
    return {
        type: types.EXER_DEL_RECEIVED,
        receivedAt: Date.now(),
        deletedExerciseId: deletedExercise? deletedExercise.id : -1,
        shouldReloadSampleExercises: deletedExercise? deletedExercise.shouldReloadSampleExercises : false,
    }
};
export const delExercise = exercise => {
    return (dispatch, getState) => {
        if (!validateId(dispatch, exercise.id, 'Delete Exercise'))
            return;
        if (!getState().didInvalidate && !getState().isFetching) {
            dispatch(fetchDeleteExercise(exercise));
        }
    }
};
const fetchDeleteExercise = (exercise) => {
    return dispatch => {
        dispatch(requestDelExercise(exercise));
        myFetch(dispatch, `${consts.API_TRAININGS}/${exercise.trainingId}/exercises/${exercise.id}`, 'DELETE', null, fetchDeleteExerciseSuccess, fetchDeleteExerciseError)
    }
};
const fetchDeleteExerciseSuccess = (dispatch, exercise) => {
    dispatch(receiveDelExercise(exercise));
    dispatch(TrainingExercisesCountUpdate(exercise.trainingId, -1));
    if (exercise.shouldReloadSampleExercises) {
        dispatch(invalidateTrainings());
    }
};
const fetchDeleteExerciseError = (dispatch, prefix, errorReason) => {
    dispatch(setError(prefix, errorReason));
    dispatch(receiveDelExercise(null));
};
export const selectExercise4Delete = (exerciseId) => {
    return {
        type: types.EXER_SELECTED_FOR_DELETE,
        exerciseId: exerciseId,
    };
};

// =================================================================================================================
// Get Exercises List
// =================================================================================================================
export const invalidateEditedTraining = () => {
    return {
        type: types.EDITED_TRAINING_INVALIDATE,
    }
};
const requestEditedTraining = (trainingId) => {
    return {
        type: types.EDITED_TRAINING_REQUEST,
        trainingId: trainingId,
    }
};
const receiveEditedTraining = training => {
    return {
        type: types.EDITED_TRAINING_RECEIVED,
        receivedAt: Date.now(),
        training: training,
        trainingId: (training && training.id) || -1,
    }
};

const shouldFetch = (trainingId, {training, isFetching, didInvalidate}) => {
    console.log(`shouldFetch: trainingId[${trainingId}] - previousTrainingId[${(training? training.id : -99)}]`);
    if (isFetching) {
        return false;
    } else if (builtinValidId(trainingId)) {
        return false;
    } else if (!training) {
        return true;
    } else if (training.id !== trainingId) {
        return true;
    } else {
        return didInvalidate
    }
};
export const getEditedTrainingIfNeeded = (trainingId) => {
    return (dispatch, getState) => {
        if (shouldFetch(trainingId, getState().exercises)) {
            dispatch(invalidateEditedTraining());
            return dispatch(fetchEditedTraining(trainingId));
        }
    }
};

const fetchEditedTraining = (trainingId) => {
    return dispatch => {
        dispatch(requestEditedTraining());
        myFetch(dispatch, `${consts.API_TRAININGS}/${trainingId}`, 'GET', null, fetchEditedTrainingSuccess, fetchEditedTrainingError)
    }
};
const fetchEditedTrainingSuccess = (dispatch, training) => {
    dispatch(receiveEditedTraining(training));
};
const fetchEditedTrainingError = (dispatch, prefix, errorReason) => {
    dispatch(setError(prefix, errorReason));
    dispatch(receiveEditedTraining(null));
};

// =================================================================================================================
// =================================================================================================================
// Update Training Name
// =================================================================================================================

export const editedTrainingRename = (newName) => {
    return {
        type: types.EDITED_TRAINING_RENAMED,
        newName: newName
    }
};
