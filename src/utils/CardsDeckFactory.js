import _ from 'lodash';
import consts from '../global/consts';
import { myFetch } from './myFetch';
import {map1stObject, modelValidId} from './misc';
import CardsDeck from './CardsDeck';


class CardsDeckFactory {

    constructor(props) {
        this.cardsDeck = null;

        this.trainings = props.trainings;
        this.playedTrainingId = props.playedTrainingId;
        this.gameType = props.gameType;
        this.storeCardsDeck = props.storeCardsDeck;
        this.reloadPlayedTraining = props.reloadPlayedTraining;

        this.setPlayedTraining = props.setPlayedTraining;
        this.setGameType = props.setGameType;
        this.saveGame = props.saveGame;
        this.setError = props.setError;
    }

    getCardsDeck() {
        return this.cardsDeck;
    }
    bindSetMyState = (setMyState) => {
        this.setMyState = setMyState;
    };

    LoadTraining = () => {
        const {storeCardsDeck, playedTrainingId, setPlayedTraining, reloadPlayedTraining} = this;

        let localStorageGameType = consts.GAME_TYPE_UNKNOWN;
        let localStoragePlayedTrainingId = -1;
        let localStoragePlayedCardsDeckMap = null;
        try {
            localStorageGameType = parseInt(localStorage.getItem(consts.LOCAL_STORAGE_GAME_TYPE), 10);
            localStoragePlayedTrainingId = localStorage.getItem(consts.LOCAL_STORAGE_PLAYED_TRAINING_ID);
            localStoragePlayedCardsDeckMap = JSON.parse(localStorage.getItem(consts.LOCAL_STORAGE_PLAYED_CARDS_DECK));
        } catch (e) {
            console.log('*** local storage is demaged. ignoring and clean it.');
            console.error(e);
            localStorage.removeItem(consts.LOCAL_STORAGE_GAME_TYPE);
            localStorage.removeItem(consts.LOCAL_STORAGE_PLAYED_TRAINING_ID);
            localStorage.removeItem(consts.LOCAL_STORAGE_PLAYED_CARDS_DECK);
        }
        let localStoragePlayedCardsDeck = null;
        if (localStoragePlayedCardsDeckMap) {
            localStoragePlayedCardsDeck = new CardsDeck(localStoragePlayedCardsDeckMap.id, localStoragePlayedCardsDeckMap.name, localStoragePlayedCardsDeckMap.initialExercises);
            localStoragePlayedCardsDeck.copyFrom(localStoragePlayedCardsDeckMap);
        }

        // console.log(`----- gameType[${localStorageGameType}] <> storeGameType[${this.gameType}] - isNan[${isNaN(localStorageGameType)}] - reloadPlayedTraining[${reloadPlayedTraining}]`);
        if (reloadPlayedTraining) {
            this.setGameType(consts.GAME_TYPE_UNKNOWN);
            localStorage.removeItem(consts.LOCAL_STORAGE_GAME_TYPE);
        }
        else if (!isNaN(localStorageGameType) && localStorageGameType > consts.GAME_TYPE_UNKNOWN) {
            console.log('save gameType');
            this.setGameType(localStorageGameType);
            localStorage.setItem(consts.LOCAL_STORAGE_GAME_TYPE, localStorageGameType);
        }

        console.log(`GameMount: rdx-store.cardsDeck=[${storeCardsDeck}] localStoragePlayedCardsDeck=[${localStoragePlayedCardsDeck}] `+
            `storeCardsDeckTrainingId[${(storeCardsDeck !== null? storeCardsDeck.id : 0)}] <> playedTrainingId[${playedTrainingId}] <> localStoragePlayedTrainingId[${localStoragePlayedTrainingId}]`);

        if (!reloadPlayedTraining &&
            storeCardsDeck === null && localStoragePlayedCardsDeck !== null &&
            (CardsDeck.isTrainingIdValid(localStoragePlayedCardsDeck.id) &&
                (localStoragePlayedCardsDeck.id === playedTrainingId || !CardsDeck.isTrainingIdValid(playedTrainingId)))) {
            console.log('*** rdx-store is empty, however local storage contains the right cards set.');
            this.cardsDeck = localStoragePlayedCardsDeck;
        } else {
            if (reloadPlayedTraining && CardsDeck.isTrainingIdValid(playedTrainingId)) {
                console.log(`*** reload was requested - get played training [${playedTrainingId}]`);
                setPlayedTraining(playedTrainingId, false);
                this.getPlayedExercises({trainingId: playedTrainingId});
            }
            else if (storeCardsDeck === null &&
                !CardsDeck.isTrainingIdValid(playedTrainingId) && modelValidId(localStoragePlayedTrainingId)) {
                console.log(`*** rdx-store is empty, previous played id is null, however local storage played training [${localStoragePlayedTrainingId}] is valid - refetch the training.`);
                setPlayedTraining(localStoragePlayedTrainingId, false);
                this.getPlayedExercises({trainingId: localStoragePlayedTrainingId});
            }
            else if (storeCardsDeck !== null && CardsDeck.wasTrainingChanged(playedTrainingId, storeCardsDeck.id)) {
                console.log(`*** rdx-store does not fit previous played id - get the new played training [${playedTrainingId}]`);
                this.getPlayedExercises({trainingId: playedTrainingId});
            }
            else if (storeCardsDeck === null && modelValidId(playedTrainingId)) {
                console.log(`*** rdx-store is empty - get played training [${playedTrainingId}]`);
                this.getPlayedExercises({trainingId: playedTrainingId});
            }
            else if (storeCardsDeck != null) {
                console.log('*** rdx-store CardsDeck exists and fine.');
                this.cardsDeck = storeCardsDeck;
            }
            else {
                console.log('*** all is null, nothing to fetch, load default training.');
                const defaultTraining = map1stObject(_(CardsDeck.DefaultTrainings()).map().slice(0,1).value());
                this.setNewTraining(defaultTraining);
            }
        }
        if (this.cardsDeck !== null) {
            this.setState();
        }
    };


    // =================================================================================================================
    getPlayedExercises = props => {
        const {trainingId} = props;
        if (modelValidId(trainingId)) {
            myFetch(null, `${consts.API_TRAININGS}/${trainingId}`, 'GET', null, this.fetchPlayedExercisesSuccess, this.fetchPlayedExercisesError);
        } else {
            const training = (this.trainings? this.trainings[trainingId] : null);
            if (training) {
                this.setNewTraining(training);
            } else {
                this.setMyState({name: 'Training was not found.'});
                this.setError('Get Training', `training id[${trainingId}] was not found in rdx-store.`);
            }
        }
    };
    fetchPlayedExercisesSuccess = (dispatch, training) => {
        this.setNewTraining(training);
    };
    fetchPlayedExercisesError = (dispatch, prefix, errorReason) => {
        this.setError(prefix, errorReason);
        /* const defaultTraining = map1stObject(_(CardsDeck.DefaultTrainings()).map().slice(0,1).value());
        this.setPlayedTraining(defaultTraining.id, false);
        this.setNewTraining(defaultTraining); */
    };

    setNewTraining = (training) => {
        const {id, name, exercises} = training;
        // console.log('========= ', exercises);
        this.cardsDeck = new CardsDeck(id, name, exercises);
        this.setState();
    };
    setState = () => {
        this.setMyState({name: this.cardsDeck.name, exercise: this.cardsDeck.topExercise, gameStatus: this.cardsDeck.gameStatus});
    };
    saveGameExtended = () => {
        this.saveGame(this.cardsDeck);
        localStorage.setItem(consts.LOCAL_STORAGE_PLAYED_TRAINING_ID, this.playedTrainingId);
        localStorage.setItem(consts.LOCAL_STORAGE_PLAYED_CARDS_DECK, JSON.stringify(this.cardsDeck));
    };
    // =================================================================================================================
}
export default CardsDeckFactory;
