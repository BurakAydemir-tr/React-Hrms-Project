import React from "react";
import JobAdvertisementList from "../pages/JobAdvert/JobAdvertisementList";
import JobAdvertisementAdd from "../pages/JobAdvert/JobAdvertisementAdd";
import Navi from "./Navi";
import Section from "./Section";
import { Grid } from "semantic-ui-react";
import CandidateList from "../pages/User/CandidateList";
import EmployerList from "../pages/User/EmployerList";
import JobPosition from "../pages/JobAdvert/JobPosition";
import { Route } from "react-router-dom";
import JobAdvertDetail from "../pages/JobAdvert/JobAdvertDetail";
import Resume from "../pages/User/Resume";
import EmployerDetail from "../pages/User/EmployerDetail";

export default function Dashboard() {
  return (
    <div>
      <Grid>
        <Grid.Row>
          <Grid.Column width={3}>
            <Section />
          </Grid.Column>
          <Grid.Column width={13}>
            <Route exact path="/" component={JobAdvertisementList}/>
            <Route exact path="/jobAdvertisements" component={JobAdvertisementList}/>
            <Route exact path="/jobAdvertisements/:id" component={JobAdvertDetail}/>
            <Route exact path="/jobAdvertisementAdd" component={JobAdvertisementAdd}/>
            <Route exact path="/candidates" component={CandidateList}/>
            <Route exact path="/candidates/:id" component={Resume}/>
            <Route exact path="/employers" component={EmployerList}/>
            <Route exact path="/employers/:id" component={EmployerDetail}/>
            <Route exact path="/jobAdvertAdd" component={JobAdvertisementAdd}/>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </div>
  );
}
