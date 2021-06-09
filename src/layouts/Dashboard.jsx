import React from "react";
import JobAdvertisementList from "../pages/JobAdvert/JobAdvertisementList";
import Navi from "./Navi";
import Section from "./Section";
import { Grid } from "semantic-ui-react";
import CandidateList from "../pages/User/CandidateList";
import EmployerList from "../pages/User/EmployerList";
import JobPosition from "../pages/JobAdvert/JobPosition";

export default function Dashboard() {
  return (
    <div>
      <Grid>
        <Grid.Row>
          <Grid.Column width={3}>
            <Section />
          </Grid.Column>
          <Grid.Column width={13}>
            <JobAdvertisementList />
            <CandidateList/>
            <EmployerList/>
            <JobPosition/>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </div>
  );
}
