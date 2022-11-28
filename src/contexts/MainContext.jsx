import { createContext, useEffect, useState } from "react";

export const MainContext = createContext();

const MainContextProvider = (props) => {
  

  return (
    <MainContext.Provider value={{

    }}>
      {props.children}
    </MainContext.Provider>
  )
}

export default MainContextProvider;