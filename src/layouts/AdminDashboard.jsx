import React from 'react'
import { Grid } from 'semantic-ui-react';
import { Route, useRouteMatch } from 'react-router-dom';
import AdminSection from './AdminSection';
import ConfirmEmployerList from '../pages/User/Employee/ConfirmEmployerList';

export default function AdminDashboard() {
    let match=useRouteMatch();
    let id=12;
    return (
        <div>
            <Grid>
                <Grid.Row>
                    <Grid.Column width={3}>
                        <AdminSection match={match}/>
                    </Grid.Column>
                    <Grid.Column width={13}>
                        <Route exact path={`${match.path}/:id/employers`} component={ConfirmEmployerList}/>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        </div>
    )
}
