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
  dataPerfumeT: responseData[]
  setDataPerfumeT: Dispatch<SetStateAction<responseData[]>>
  loadingT: boolean
  setLoadingT: Dispatch<SetStateAction<boolean>>
  dataPerfumeID: responseData[]
  setDataPerfumeID: Dispatch<SetStateAction<responseData[]>>
  loadingID: boolean
  setLoadingID: Dispatch<SetStateAction<boolean>>
  dataPerfumeCh: responseData[]
  setDataPerfumeCh: Dispatch<SetStateAction<responseData[]>>
  loadingCh: boolean
  setLoadingCh: Dispatch<SetStateAction<boolean>>

  perfume_id: string
  setPerfume_id: Dispatch<SetStateAction<string>>

}

const StateContext = createContext<StateContextType | undefined>(undefined);

interface ContextProviderProps {
  children: ReactNode;
}

export const ContextProvider: React.FC<ContextProviderProps> = ({ children }) => {

  const [perfume_id, setPerfume_id] = useState<string>("")

  const [dataResponseW, setDataResponseW] = useState<responseData[]>([]);
  const [loadingW, setLoadingW] = useState<boolean>(false)

  const [dataResponseM, setDataResponseM] = useState<responseData[]>([])
  const [loadingM, setLoadingM] = useState<boolean>(false)

  const [dataPerfumeT, setDataPerfumeT] = useState<responseData[]>([])
  const [loadingT, setLoadingT] = useState<boolean>(false)

  const [dataPerfumeCh, setDataPerfumeCh] = useState<responseData[]>([])
  const [loadingCh, setLoadingCh] = useState<boolean>(false)

  const [dataPerfumeID, setDataPerfumeID] = useState<responseData[]>([])
  const [loadingID, setLoadingID] = useState<boolean>(false)

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
        setLoadingM,
        dataPerfumeT,
        setDataPerfumeT,
        loadingT,
        setLoadingT,
        dataPerfumeID,
        setDataPerfumeID,
        loadingID,
        setLoadingID,
        perfume_id,
        setPerfume_id,
        dataPerfumeCh,
        setDataPerfumeCh,
        loadingCh,
        setLoadingCh
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
