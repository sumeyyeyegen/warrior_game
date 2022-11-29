import "./App.css";
import Accordion from "./components/Accordion/Accordion";
// import "./assets/css/main.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import Main from "./components/Main/main";
import MainContextProvider from "./contexts/MainContext";
import WarriorContextProvider from "./contexts/WarriorContext";

function App() {
  return (
    <div className="App">
        <MainContextProvider>
          <WarriorContextProvider>
            <Main />
          </WarriorContextProvider>
        </MainContextProvider>
    </div>
  );
}

export default App;
