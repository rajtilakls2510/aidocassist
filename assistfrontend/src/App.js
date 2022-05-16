import "./normalize.css";
import "./App.css";
import Navbar from "./components/Navbar";
import LandingPage from "./components/LandingPage";
import { Route, Switch, BrowserRouter as Router } from "react-router-dom";
import DiseasePage from "./components/disease/DiseasePage";
import HandFracturePage from "./components/handfracture/HandFracturePage";
import CovidPredictorPage from "./components/covid/CovidPredictorPage";
import BreastCancerPage from "./components/breastcancer/BreastCancerPage";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Switch>
          <Route path="/breast-cancer-detector" component={BreastCancerPage} />
          <Route
            path="/covid19-pneumonia-predictor"
            component={CovidPredictorPage}
          />
          <Route path="/hand-fracture-detector" component={HandFracturePage} />
          <Route path="/disease-predictor" component={DiseasePage} />
          <Route exact path="*" component={LandingPage} />
        </Switch>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
