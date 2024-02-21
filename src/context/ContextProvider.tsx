import React, { createContext, useState, useContext, ReactNode, Dispatch, SetStateAction } from "react";
import { responseData } from "../interface/interface";

// Definir el tipo para el estado del contexto
interface StateContextType{
  dataResponseW: responseData[]
  setDataResponseW: Dispatch<SetStateAction<responseData[]>>
  loadingW: boolean
  setLoadingW: Dispatch<SetStateAction<boolean>>
  dataResponseM: responseData[]
  setDataResponseM: Dispatch<SetStateAction<responseData[]>>
  loadingM: boolean
  setLoadingM: Dispatch<SetStateAction<boolean>>
}

const StateContext = createContext<StateContextType | undefined>(undefined);

interface ContextProviderProps {
  children: ReactNode;
}

export const ContextProvider: React.FC<ContextProviderProps> = ({ children }) => {
  const [dataResponseW, setDataResponseW] = useState<responseData[]>([]);
  const [loadingW, setLoadingW] = useState<boolean>(false)

  const [dataResponseM, setDataResponseM] = useState<responseData[]>([])
  const [loadingM, setLoadingM] = useState<boolean>(false)

  return (
    <StateContext.Provider
      value={{
        dataResponseW, 
        setDataResponseW,
        loadingW, 
        setLoadingW,
        dataResponseM,
        setDataResponseM,
        loadingM,
        setLoadingM
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = (): StateContextType => {
  const context = useContext(StateContext);
  if (!context) {
    throw new Error("useContext debe ser utilizado dentro de un ContextProvider");
  }
  return context;
};
