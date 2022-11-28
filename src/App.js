import "./App.css";
import Accordion from "./components/Accordion/Accordion";
import "./assets/css/main.css";
import Main from "./components/Main/main";
import MainContextProvider from "./contexts/MainContext";
import WarriorContextProvider from "./contexts/WarriorContext";

function App() {
  return (
    <div className="App">
      <div className="container">
        <MainContextProvider>
          <WarriorContextProvider>
            <Main />
          </WarriorContextProvider>
        </MainContextProvider>
      </div>
    </div>
  );
}

export default App;
