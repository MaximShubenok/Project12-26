import React from 'react';
import {Route, Switch} from "react-router-dom";
import {Information} from "../containers/Information";
import Persons from "../containers/Persons/Persons";
import {Edit} from "../containers/Functions/Edit";

export const Router = () => {
    return (
        <Switch>
            <Route path={'/'} exact>
                <Persons />
            </Route>
            <Route path={'/information'} >
                <Information />
            </Route>
            <Route path={'/edit/:id'} >
                <Edit />
            </Route>
        </Switch>
    )
};