import _ from 'lodash';
import * as types from './actionsTypes';
import CardsDeck from '../utils/CardsDeck';


const trainingsReducer = (  state = {
                                trainingsMap: null,
                                isFetching: false,
                                didInvalidate: false,
                                playedTrainingId: -1,
                                selectedTrainingId: -1,
                            },
                            action) => {

    let updatedTrainingsMap = state.trainingsMap;
    switch (action.type) {

        case types.TRAININGS_INVALIDATE:
            return {
                ...state,
                didInvalidate: true,
                trainingsMap: null,
            };

        case types.TRAININGS_REQUEST:
            return {
                ...state,
                isFetching: true,
            };

        case types.TRAININGS_RECEIVED:
            return {
                ...state,
                isFetching: false,
                didInvalidate: action.invalidate,
                lastUpdated: action.receivedAt,
                trainingsMap: action.trainingsMap,
            };

        case types.TRAINING_EXER_COUNT_UPD:
            const newMap4CountUpd = _.cloneDeep(state.trainingsMap);
            if (newMap4CountUpd !== null) {
                try {
                    newMap4CountUpd[action.trainingId].exercisesCount += action.countUpdate;
                } catch (err) {
                    console.error(`newMap4CountUpd[action.trainingId].exercisesCount failed for trainingId[${action.trainingId}].`);
                }
            }
            return {
                ...state,
                trainingsMap: newMap4CountUpd,
            };

        case types.TRAINING_UPDATE_REQUEST:
            return {
                ...state,
                isFetching: true,
            };

        case types.TRAINING_UPDATE_RECEIVED:
            if (action.updatedTraining) {
                updatedTrainingsMap = _.cloneDeep(state.trainingsMap);
                if (updatedTrainingsMap && updatedTrainingsMap[action.updatedTraining.id]) {
                    updatedTrainingsMap[action.updatedTraining.id].name = action.updatedTraining.name;
                }
            }
            return {
                ...state,
                isFetching: false,
                lastUpdated: action.updatedTraining? action.receivedAt : state.lastUpdated,
                trainingsMap: updatedTrainingsMap,
                updatedTrainingBeforeRename: null,
            };

        case types.TRAINING_CREATE_REQUEST:
            return {
                ...state,
                isFetching: true,
            };

        case types.TRAINING_CREATE_RECEIVED:
            if (action.newTraining) {
                updatedTrainingsMap = {};
                updatedTrainingsMap[action.newTraining.id] = action.newTraining;
                _.merge(updatedTrainingsMap, state.trainingsMap)
            }
            return {
                ...state,
                isFetching: false,
                lastUpdated: action.newTraining? action.receivedAt : state.lastUpdated,
                trainingsMap: updatedTrainingsMap,
            };


        case types.TRAINING_ARCHIVE_REQUEST:
            return {
                ...state,
                isFetching: true,
            };

        case types.TRAINING_ARCHIVE_RECEIVED:
            if (action.archivedTraining) {
                updatedTrainingsMap = _.cloneDeep(state.trainingsMap);
                delete updatedTrainingsMap[action.archivedTraining.id];
            }
            return {
                ...state,
                isFetching: false,
                lastUpdated: action.archivedTraining? action.receivedAt : state.lastUpdated,
                trainingsMap: updatedTrainingsMap,
            };

        default:
            return state;
    }
};
export default trainingsReducer; // Todo - rename to trainingsStore


export const getStoreTrainings = state => {
    const trainingsMap = _.cloneDeep(CardsDeck.DefaultTrainings());
    _.merge(trainingsMap, state.trainings.trainingsMap);
    const trainingsIdArray = _.keys(trainingsMap);
    return [trainingsMap, trainingsIdArray];
};
