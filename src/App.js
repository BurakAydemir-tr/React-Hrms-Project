import "./App.css";
import Dashboard from "./layouts/Dashboard";
import CandidateDashboard from "./layouts/CandidateDashboard";
import "semantic-ui-css/semantic.min.css";
import { Container } from "semantic-ui-react";
import Navi from "./layouts/Navi";
import { Route, Switch } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Navi />
      <Container className="main">
        <Switch>
          <Route exact path="/" component={Dashboard} />
          <Route exact path="/candidate/filter" component={CandidateDashboard} />
          {/* <Dashboard /> */}
        </Switch>
      </Container>
    </div>
  );
}

export default App;
