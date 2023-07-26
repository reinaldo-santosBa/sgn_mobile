import React, { SetStateAction, createContext, useState } from 'react'
interface IarraySoco {
  valorTotal: string,
  pos: string,
  socoCod: string,
}

interface IarrayContratoServico {
  cod: string,
  posAss: string,
  valor: string,
}

interface IarrayPedido {
  ASS: string,
  pediCod: string,
  valTotal: string,
  fornCod: string,
  pediNumero: string
}

interface IarrayPurchaseWorksheet {
  codigo: string;
  posAss: string;
}

interface IarrayContratoServicoBulletin {
  cod: string,
  posAss: string,
  valor: string,
  cereCod: string;
  fornCod: string;
}

interface IarrayPagar {
  trppCod: string;
  cereCod: string;
  valor: number;
}

interface IAuthContext {
  id:string,
  refreshToken:string,
  setRefreshToken: React.Dispatch<SetStateAction<string>>,
  modal:boolean,
  setModal: React.Dispatch<SetStateAction<boolean>>,
  login:string,
  setLogin: React.Dispatch<SetStateAction<string>>,
  usuaCod:string,
  setUsuaCod: React.Dispatch<SetStateAction<string>>,
  arrayPedido: Array<IarrayPedido>,
  setArrayPedido: React.Dispatch<SetStateAction<IarrayPedido[]>>;
  modalPasswordLarge: boolean;
  setModalPasswordLarge: React.Dispatch<SetStateAction<boolean>>
  bgState: boolean;
  setBgState: React.Dispatch<SetStateAction<boolean>>;
  arraySoliCompra: Array<IarraySoco>;
  setArraySoliCompra: React.Dispatch<SetStateAction<IarraySoco[]>>;
  arrayPurchaseWorksheet: Array<IarrayPurchaseWorksheet>;
  setArrayPurchaseWorksheet: React.Dispatch<SetStateAction<IarrayPurchaseWorksheet[]>>;
  arrayContratoServico: Array<IarrayContratoServico>;
  setArrayContratoServico: React.Dispatch<SetStateAction<IarrayContratoServico[]>>;
  attResponse: boolean;
  setAttResponse: React.Dispatch<SetStateAction<boolean>>;
  arrayContratoServicoBulletin: Array<IarrayContratoServicoBulletin>;
  setArrayContratoServicoBulletin: React.Dispatch<SetStateAction<IarrayContratoServicoBulletin[]>>;
  dataBase: string;
  setDataBase: React.Dispatch<SetStateAction<string>>
  url: string;
  setUrl: React.Dispatch<SetStateAction<string>>;
  version: string;
  versionApp: string;
  linkSGN: string;
  att: boolean;
  setAtt: React.Dispatch<SetStateAction<boolean>>;
  token: string;
  setToken: React.Dispatch<SetStateAction<string>>;
  arrayPagar: Array<IarrayPagar>;
  setArrayPagar: React.Dispatch<SetStateAction<IarrayPagar[]>>;
}

interface IProvider {
  children:React.ReactNode
}

export const AuthContext = createContext<IAuthContext>({} as IAuthContext)

export const AuthContextProvider : React.FC<IProvider> = ({ children }) => {
  const [modal, setModal] = useState(false)
  const [login, setLogin] = useState('')
  const [usuaCod, setUsuaCod] = useState('')
  const [refreshToken, setRefreshToken] = useState('')
  const [arrayPedido, setArrayPedido] = useState([])
  const [modalPasswordLarge, setModalPasswordLarge] = useState(false)
  const [bgState, setBgState] = useState(false)
  const [arraySoliCompra, setArraySoliCompra] = useState([])
  const [arrayContratoServico, setArrayContratoServico] = useState([])
  const [arrayContratoServicoBulletin, setArrayContratoServicoBulletin] = useState([])
  const [url, setUrl] = useState('')
  const [dataBase, setDataBase] = useState('')
  const [attResponse, setAttResponse] = useState(false)
  const [att, setAtt] = useState(false)
  const [token, setToken] = useState('')
  const [arrayPurchaseWorksheet, setArrayPurchaseWorksheet] = useState([])
  const [arrayPagar, setArrayPagar] = useState([])

  // const linkSGN = 'http://129.148.50.73:9005'
  const linkSGN = 'http://192.168.101.18:9005'
  return (

    <AuthContext.Provider

        value={

            {
              id: '',
              refreshToken,
              setRefreshToken,
              modal,
              setModal,
              login,
              setLogin,
              usuaCod,
              setUsuaCod,
              arrayPedido,
              setArrayPedido,
              modalPasswordLarge,
              setModalPasswordLarge,
              bgState,
              setBgState,
              arraySoliCompra,
              setArraySoliCompra,
              arrayContratoServico,
              setArrayContratoServico,
              attResponse,
              setAttResponse,
              arrayContratoServicoBulletin,
              setArrayContratoServicoBulletin,
              dataBase,
              setDataBase,
              url,
              setUrl,
              version: 'v1',
              versionApp: '22',
              linkSGN,
              setAtt,
              att,
              token,
              setToken,
              arrayPurchaseWorksheet,
              setArrayPurchaseWorksheet,
              arrayPagar,
              setArrayPagar
            }

        }

    >

      {children}

    </AuthContext.Provider>
  )
}
