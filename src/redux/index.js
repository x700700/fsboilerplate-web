import { createStore, combineReducers, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import app from './app.store';
import user from './user.store';
import trainings from './trainings.store';
import exercises from './exercises.store';
import game from './game.store';


const reducer = combineReducers({
    app,
    user,
    trainings,
    exercises,
    game
});


const middleware = applyMiddleware(thunkMiddleware, createLogger({collapsed: true}));
const store = createStore(reducer, middleware);

export default store

