import "./App.css";
import Dashboard from "./layouts/Dashboard";
import CandidateDashboard from "./layouts/CandidateDashboard";
import "semantic-ui-css/semantic.min.css";
import { Container } from "semantic-ui-react";
import Navi from "./layouts/Navi";
import { Route, Switch } from "react-router-dom";
import JobAdvertisementList from "./pages/JobAdvert/JobAdvertisementList";
import JobAdvertisementAdd from "./pages/JobAdvert/JobAdvertisementAdd";
import CandidateList from "./pages/User/CandidateList";
import EmployerList from "./pages/User/EmployerList";
import JobAdvertDetail from "./pages/JobAdvert/JobAdvertDetail";
import Resume from "./pages/User/Resume";
import EmployerDetail from "./pages/User/EmployerDetail";

function App() {
  return (
    <div className="App">
      <Navi />
      <Container className="main">
        <Switch>
          {/* <Route exact path="/" component={Dashboard} /> */}
          <Route path="/home" component={Dashboard}/>
          <Route exact path="/candidate" component={CandidateDashboard} />
          </Switch>
      </Container>
    </div>
  );
}

export default App;
