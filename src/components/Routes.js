import React, { Component } from 'react';
import { Redirect, Route, Switch } from "react-router-dom";
import consts from "../global/consts";
import TrainingsList from "./training/TrainingsList";
import ExercisesList from "./exercise/ExercisesList";
import Game from "./game/Game";
import { Welcome } from './app/Main';



export class Routes extends Component {
    render = () =>
        <Switch>
            <Route path={consts.PAGE_WELCOME} component={Welcome}/>
            <Route path={consts.PAGE_MY_TRAININGS} component={TrainingsList}/>
            <Route path={consts.PAGE_MY_EXERCISES} component={ExercisesList}/>
            <Route path={consts.PAGE_GAME} component={Game}/>
            <Redirect from='*' to={consts.PAGE_WELCOME} />
            <Redirect from='/' to={consts.PAGE_WELCOME} />
        </Switch>;
}
