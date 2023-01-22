// import Routers from "./Routers";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import StartScreen from './screens/StartScreen';
import ExplainScreen from './screens/ExplainScreen';
import GameScreen from "./screens/GameScreen";
import ResultScreen from "./screens/ResultScreen";

function App() {
  return (
    // <div className="App">
    //   <Routers/>
    // </div>
  <BrowserRouter>
    <Routes>
        <Route path="/" element={<StartScreen/>}/>
        <Route path="/GameScreen" element={<GameScreen/>}/>
        <Route path="/ExplainScreen" element={<ExplainScreen/>}/>
        <Route path="/ResultScreen" element={<ResultScreen/>} />
    </Routes>
  </BrowserRouter>
  );
}

export default App;
