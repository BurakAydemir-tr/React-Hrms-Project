import React from 'react'
import { Route, useRouteMatch } from 'react-router-dom';
import { Grid } from 'semantic-ui-react';
import CandidateSection from "../layouts/CandidateSection"
import CandidateFavorite from '../pages/User/CandidateFavorite';

export default function CandidateDashboard() {
    let match=useRouteMatch();
    return (
        <div>
            <Grid>
                <Grid.Row>
                    <Grid.Column width={3}>
                        <CandidateSection match={match}/>
                    </Grid.Column>
                    <Grid.Column width={13}>
                        <Route exact path={`${match.path}/favorite`} component={CandidateFavorite}/>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        </div>
    )
}
