import { createContext, useEffect, useState } from "react";

export const MainContext = createContext();

const MainContextProvider = (props) => {
  const [tab,setTab] = useState(1);

  return (
    <MainContext.Provider value={{
      tab,setTab
    }}>
      {props.children}
    </MainContext.Provider>
  )
}

export default MainContextProvider;