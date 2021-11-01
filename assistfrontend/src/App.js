import "./normalize.css";
import "./App.css";
import Navbar from "./components/Navbar";
import LandingPage from "./components/LandingPage";
import { Route, Switch, BrowserRouter as Router } from "react-router-dom";
import DiseasePage from "./components/disease/DiseasePage";

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Switch>
          <Route path="/disease-predictor" component={DiseasePage} />
          <Route exact path="*" component={LandingPage} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
