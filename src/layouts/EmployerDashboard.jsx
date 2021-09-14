import React from 'react'
import { Grid } from 'semantic-ui-react';
import { Route, useRouteMatch } from 'react-router-dom';
import EmployerSection from './EmployerSection';
import JobAdvertisementList from '../pages/JobAdvert/JobAdvertisementList';
import EmployerUpdate from '../pages/User/Employer/EmployerUpdate';

export default function EmployerDashboard() {
    let match=useRouteMatch();
    let id=7;
    return (
        <div>
            <Grid>
                <Grid.Row>
                    <Grid.Column width={3}>
                        <EmployerSection match={match}/>
                    </Grid.Column>
                    <Grid.Column width={13}>
                        <Route exact path={`${match.path}/:id`} component={EmployerUpdate}/>
                        <Route exact path={`${match.path}/:id/jobAdvertisements`} component={JobAdvertisementList}/>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        </div>
    )
}
