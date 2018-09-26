import _ from 'lodash';
import { objectToMap } from './misc';
import consts from '../global/consts';
import { DefaultVocabularySet } from '../global/DefaultTrainings';
import { modelValidId, builtinValidId } from '../utils/misc';


class CardsDeck {
    constructor(id, name, exercises) {
        this.id = id;
        this.name = name;
        //this.initialExercises = _.map(exercises, _.clone);
        this.initialExercises = _.filter(_.clone(exercises), (e) => {
            return (e.question !== null && e.answer !== null && e.question.length > 0 && e.answer.length > 0);
        }); // .slice(1,6); // TODO - *** Debug (slice) ***

        //console.log(this.initialExercises);
        if (this.gameStatus === undefined) {
            this.restart();
        }
    }
    copyFrom(other) {
        this.id = other.id;
        this.name = other.name;
        this.initialExercises = other.initialExercises;
        this.gameStatus = other.gameStatus;
        this.exercises = other.exercises;
        this.statusQuant = other.statusQuant;
        this.finishedExercises = other.finishedExercises;
    }
    restart() {
        this.gameStatus = 0.01;
        this.exercises = _.slice(_.shuffle(_.map(this.initialExercises, _.clone)), 0, 19);
        for (const i in this.exercises) {
            this.setExamAltAnswers(this.exercises[i]);
        }
        this.statusQuant = 1.0 / this.exercises.length;
        this.finishedExercises = [];
    }
    setExamAltAnswers(exercise) {
        const alt = _.slice(_.shuffle(_.filter(this.initialExercises, (e) => {
            return e.id !== exercise.id;
        })), 0, 4);
        exercise.alt = _.cloneDeep(alt);
        exercise.alt.push(_.cloneDeep(exercise));
        exercise.alt = _.shuffle(exercise.alt);
        exercise.altSelectedId = 0;
    }
    get topExercise() {
        let exercise = null;
        if (this.exercises.length > 0) {
            exercise = this.exercises[0];
        }
        else {
            this.gameStatus = 1.0;
            exercise = _.cloneDeep(nilCards[1].exercise);
        }
        return exercise;
    }

    updateResult = (correct, redoExercise) => {
        let lastExercise = this.exercises.shift();
        lastExercise.played++;
        if (!correct) {
            lastExercise.wrongs++;
        }
        if (!redoExercise || (redoExercise && correct)) {
            this.gameStatus += this.statusQuant;
        }
        if (redoExercise && !correct) {
            this.exercises[this.exercises.length] = lastExercise;
        }
        if (correct || !redoExercise || (redoExercise && correct)) {
            this.finishedExercises[this.finishedExercises.length] = lastExercise;
        }
        if (this.gameStatus >= 1.0) {
            // Todo: Post server with stats.
            console.log('cards over. stats:');
            console.log(this.finishedExercises);
        }
    };
    score = () => {
        const total = this.finishedExercises.length;
        if (total === 0)
            return 0;
        let wrongs = 0;
        for (const i in this.finishedExercises) {
            const e = this.finishedExercises[i];
            wrongs += e.wrongs;
        }
        const _score = Math.round((total - wrongs) / total * 100);
        return _score;
    };
    pieChartData = () => {
        let stats = [
            { key: 'right', value: 0, color: '#27c611' },
            { key: 'wrong', value: 0, color: '#ff9d0c' },
        ];
        for (const i in this.finishedExercises) {
            const e = this.finishedExercises[i];
            stats[0].value += e.played;
            stats[1].value += e.wrongs;
        }
        if (stats[0].value === 0 && stats[1].value === 0)
            stats[0].value = 1;

        if (stats[0].value > 0)
            stats[0].key = stats[0].value.toString();
        else
            stats[0].key = '';
        if (stats[1].value > 0)
            stats[1].key = stats[1].value.toString();
        else
            stats[1].key = '';

        return stats;
    };

    static NilCard = () => {
        return _.cloneDeep(nilCards[0]);
    };
    static isTrainingIdValid = (id) => {
        const valid = modelValidId(id) || builtinValidId(id);
        return valid;
    };
    static wasTrainingChanged = (id1, id2) => {
        const changed = CardsDeck.isTrainingIdValid(id1) && id1 !== id2;
        return changed;
    };

    static defaultTrainings = null;
    static DefaultTrainings = () => {
        if (CardsDeck.defaultTrainings === null) {
            CardsDeck.defaultTrainings = {};
            _.assign(CardsDeck.defaultTrainings, objectToMap(CardsDeck.QnAArraryToTraining('לוח הכפל בכיף', CardsDeck.MultiplicationChartArray())));
            _.assign(CardsDeck.defaultTrainings, objectToMap(CardsDeck.QnAArraryToTraining('אוצר המילים של המשחק', DefaultVocabularySet)));
        }
        return CardsDeck.defaultTrainings;
    };
    static QnAArraryToTraining = (name, arr) => {
        let training =
            {
                id: --defaultIdsCounter,
                name: name,
                popularity: 5,
                difficulty: 2,
                exercisesCount: arr.length,
                sampleExercise: arr[0],
                exercises: {},
            };
        arr.forEach((item) => {
            _.assign(training.exercises, objectToMap(
                {
                    id: --defaultIdsCounter,
                    question: item.question,
                    answer: item.answer,
                    played: 0,
                    wrongs: 0
                }));
        });
        return training;
    };
    static MultiplicationChartArray = () => {
        let multiplyArray = [];
        let counter = 0;
        for (let i=2 ; i<=9 ; i++) {
            for (let j=2 ; j<=9 ; j++) {
                multiplyArray[counter++] = {
                    question: `${i} X ${j}`,
                    answer: (i * j).toString(10)
                }
            }
        }
        multiplyArray = _.shuffle(multiplyArray);
        return multiplyArray;
    }
}
let defaultIdsCounter = consts.BUILTIN_TRAININGS_ID_COUNTER_START;

export default CardsDeck;
// =================================================================================================================
// =================================================================================================================
const nilCards = [
    {
        exercise:   {
            id: 0,
            question: '',
            answer: '',
            played: 0,
            wrongs: 0,
            alt: [],
            altSelectedId: 0,
        },
    },
    {
        exercise:   {
            id: 0,
            question: '',
            answer: '',
            played: 0,
            wrongs: 0,
            alt: [],
            altSelectedId: 0,
        },
    },
];
// =================================================================================================================
