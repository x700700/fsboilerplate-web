import _ from 'lodash';
import * as types from './actionsTypes';
import {objectValidId, objectToMap, modelValidId} from '../utils/misc';


const exercisesReducer = (  state = {
                                trainingId: -1,
                                training: null,
                                isFetching: false,
                                didInvalidate: false,
                                lastUpdated: 0,
                                updatedExerciseBeforeChange: null,
                                selected4DeleteExerciseId: -1,
                                selected4DeleteTime: Date.now(),
                            },
                            action) => {

    let updatedTraining;
    switch (action.type) {

        case types.EDITED_TRAINING_INVALIDATE:
            return {
                ...state,
                didInvalidate: true,
                trainingId: -1,
                training: null,
            };

        case types.EDITED_TRAINING_REQUEST:
            return {
                ...state,
                isFetching: true,
            };

        case types.EDITED_TRAINING_RECEIVED:
            return {
                ...state,
                isFetching: false,
                didInvalidate: !action.training,
                lastUpdated: action.receivedAt,
                training: action.training,
            };


        case types.EDITED_TRAINING_RENAMED:
            updatedTraining = _.cloneDeep(state.training);
            updatedTraining.name = action.newName;
            return {
                ...state,
                training: updatedTraining,
            };


        case types.EXER_ADD_REQUEST:
            return {
                ...state,
                isFetching: true,
            };

        case types.EXER_ADD_RECEIVED:
            updatedTraining = _.cloneDeep(state.training);
            updatedTraining.exercises = _.merge(state.training.exercises, objectToMap(action.newExercise));
            return {
                ...state,
                isFetching: false,
                lastUpdated: action.receivedAt,
                training: updatedTraining,

            };

        case types.EXER_UPDATE_REQUEST:
            const exerciseBeforeChange = _.cloneDeep(state.training.exercises[action.updatedExercise.id]);
            return {
                ...state,
                isFetching: true,
                updatedExerciseBeforeChange: exerciseBeforeChange,
            };

        case types.EXER_UPDATE_RECEIVED:
            updatedTraining = _.cloneDeep(state.training);
            if (objectValidId(action.updatedExercise)) {
                updatedTraining.exercises[action.updatedExercise.id] = action.updatedExercise;
            } else {
                updatedTraining.exercises[action.updatedExercise.id] = state.updatedExerciseBeforeChange;
            }
            return {
                ...state,
                isFetching: false,
                lastUpdated: action.receivedAt,
                training: updatedTraining,
                updatedExerciseBeforeChange: null,
            };

        case types.EXER_DEL_REQUEST:
            return {
                ...state,
                isFetching: true,
            };

        case types.EXER_DEL_RECEIVED:
            const newTrn4Del = _.cloneDeep(state.training);
            if (modelValidId(action.deletedExerciseId)) {
                newTrn4Del.exercises = _.omit(newTrn4Del.exercises, action.deletedExerciseId);
            }
            return {
                ...state,
                isFetching: false,
                lastUpdated: (modelValidId(action.deletedExerciseId) ? action.receivedAt : state.lastUpdated),
                selected4DeleteExerciseId: -1,
                training: newTrn4Del,
            };

        case types.EXER_SELECTED_FOR_DELETE:
            console.log(`selected for delete exerciseId[${action.exerciseId}]: [${(modelValidId(action.exerciseId) ? state.training.exercises[action.exerciseId].question : '')} <-> ${(modelValidId(action.exerciseId) ? state.training.exercises[action.exerciseId].answer : '')}]`);
            return {
                ...state,
                selected4DeleteExerciseId: action.exerciseId,
                selected4DeleteTime: (modelValidId(action.exerciseId) ? Date.now() : state.selected4DeleteTime),
            };


        default:
            return state;
    }
};
export default exercisesReducer;


export const getExercises = state => {

    // TDB Sorting & Filtering

    const receivedExercisesMap = (state.exercises.training !== null? state.exercises.training.exercises : {});
    const exercisesIdArray = _.keys(receivedExercisesMap).reverse();
    return [receivedExercisesMap, exercisesIdArray];
};
