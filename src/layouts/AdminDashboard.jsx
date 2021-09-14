import React from 'react'
import { Grid } from 'semantic-ui-react';
import { Route, useRouteMatch } from 'react-router-dom';
import AdminSection from './AdminSection';

export default function AdminDashboard() {
    let match=useRouteMatch();
    return (
        <div>
            <Grid>
                <Grid.Row>
                    <Grid.Column width={3}>
                        <AdminSection match={match}/>
                    </Grid.Column>
                    <Grid.Column width={13}>
                        
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        </div>
    )
}
