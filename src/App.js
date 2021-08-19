import "./App.css";
import Dashboard from "./layouts/Dashboard";
import CandidateDashboard from "./layouts/CandidateDashboard";
import "semantic-ui-css/semantic.min.css";
import { Container } from "semantic-ui-react";
import Navi from "./layouts/Navi";
import { Route, Switch } from "react-router-dom";
import Filter from "./layouts/Filter";
import { ToastContainer } from "react-toastify";


function App() {
  return (
    <div className="App">
      <ToastContainer position="bottom-right"/>
      <Navi />
      <Container className="main">
        <Switch>
          {/* <Route exact path="/" component={Dashboard} /> */}
          <Route path="/home" component={Dashboard}/>
          <Route path="/candidate" component={CandidateDashboard} />
          <Route exact path="/filter" component={Filter}/>
        </Switch>
      </Container>
    </div>
  );
}

export default App;
