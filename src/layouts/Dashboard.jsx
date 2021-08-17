import React from "react";
import JobAdvertisementList from "../pages/JobAdvert/JobAdvertisementList";
import JobAdvertisementAdd from "../pages/JobAdvert/JobAdvertisementAdd";
import Section from "./Section";
import { Grid } from "semantic-ui-react";
import CandidateList from "../pages/User/CandidateList";
import EmployerList from "../pages/User/EmployerList";
import { Route, Switch, useRouteMatch } from "react-router-dom";
import JobAdvertDetail from "../pages/JobAdvert/JobAdvertDetail";
import Resume from "../pages/User/Resume";
import EmployerDetail from "../pages/User/EmployerDetail";

export default function Dashboard() {

  let match=useRouteMatch();
  console.log(match)

  return (
    <div>
      <Grid>
        <Grid.Row>
          <Grid.Column width={3}>
            <Section match={match}/>
          </Grid.Column>
          <Grid.Column width={13}>
              <Route
                exact
                path={`${match.path}/jobAdvertisements`}
                component={JobAdvertisementList}
              />
              <Route
                exact
                path={`${match.path}/jobAdvertisements/:id`}
                component={JobAdvertDetail}
              />
              <Route
                exact
                path={`${match.path}/jobAdvertisementAdd`}
                component={JobAdvertisementAdd}
              />
              <Route exact path={`${match.path}/candidates`} component={CandidateList} />
              <Route exact path={`${match.path}/candidates/:id`} component={Resume} />
              <Route exact path={`${match.path}/employers`} component={EmployerList} />
              <Route
                exact
                path={`${match.path}/employers/:id`}
                component={EmployerDetail}
              />
              <Route
                exact
                path={`${match.path}/jobAdvertAdd`}
                component={JobAdvertisementAdd}
              />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </div>
  );
}
