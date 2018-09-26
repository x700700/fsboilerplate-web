

const apiUrl = process.env.NODE_ENV === 'production' ? 'http://api.fsboilerplate.com:4044' : 'http://api.dev.fsboilerplate.com:4044';

const consts =
{
    PAGE_WELCOME: '/welcome',
    PAGE_MY_TRAININGS: '/trainings',
    PAGE_MY_EXERCISES: '/exercises',
    PAGE_GAME: '/play',

    API_AUTH: `${apiUrl}/auth`,
    API_TRAININGS: `${apiUrl}/trainings`,


    BUILTIN_TRAININGS_ID_COUNTER_START: -100,
    LOCAL_STORAGE_EDITED_TRAINING_ID: 'fsboilerplate.app.editedTrainingId',
    LOCAL_STORAGE_PLAYED_TRAINING_ID: 'fsboilerplate.app.playedTrainingId',
    LOCAL_STORAGE_PLAYED_CARDS_DECK: 'fsboilerplate.app.playedCardsDeck',
    LOCAL_STORAGE_GAME_TYPE: 'fsboilerplate.app.gameType',

    TRAINING_VAL_TYPE_NAME: 'trainingName',

    EXERCISE_VAL_TYPE_QUESTION: 'q',
    EXERCISE_VAL_TYPE_ANSWER: 'a',

    GAME_TYPE_UNKNOWN: 1,
    GAME_TYPE_PRACTICE: 2,
    GAME_TYPE_EXAM: 3,


    TRAINING_ACTIONS: {
        EDIT: 'edit',
        DELETE: 'delete'
    },

};
export default consts;
