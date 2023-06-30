import React, { SetStateAction } from 'react'

import SplashScreen from '../pages/splashScreen'

import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Login from '../pages/login'
import SignUp from '../pages/signUp'
import Home from '../pages/home'
import ComprasHome from '../pages/comprasHome'
import Pedidos from '../pages/pedidos'
import DetalhePedido from '../pages/detalhePedido'
import GerencialHome from '../pages/gerencial'
import MovDiaria from '../pages/movDiaria'
import MovDiariaDetalhe from '../pages/movDiariaDetalhe'
import AgendaHome from '../pages/agendaHome'
import SolicitacaoCompras from '../pages/solicitacaoCompra'
import DetalheSolicitacaoCompra from '../pages/detalheSolicitacaoCompra'
import ServiceContract from '../pages/serviceContract'
import ServiceContractBulletin from '../pages/serviceContractBulletin'
import DetalheCrMain from '../pages/detalheCrMain'
import DetalheCrDados from '../pages/detalheCrDados'
import AddPurchaseOrder from '../pages/addPurchaseOrder'
import DetalheContratoServico from '../pages/detalheContratoServico'
import DetalheContratoBulletinServico from '../pages/DetalheContratoBulletinServico'
import PurchaseWorksheet from '../pages/purchaseWorksheet'
import DetailsPurchaseWorksheet from '../pages/detailsPurchaseWorksheet'
import PriceDetailsPurchaseWorksheet from '../pages/priceDetailsPurchaseWorksheet'

export type RootStackParamList = {
    SplashScreen: undefined;
    LoginRoute: undefined;
    Login: undefined;
    SignUp: undefined;
    Home: undefined;
    ComprasHome: undefined;
    Pedidos: undefined;
    DetalhePedido: {
        FORN_NOME: string;
        PEDI_DATA: string;
        PEDI_COD: string;
        ASS: string;
        VALOR_TOTAL_SERVICO: string;
        VALOR_TOTAL_ITEM: string;
        PEDI_FORN_COD: string;
        PEDI_NUMERO: string;
        responseFunc: React.Dispatch<SetStateAction<[]>>
    };
    Gerencial: undefined;
    MovDiaria: undefined;
    DetailsPurchaseWorksheet: {
        PLAC_SECO_COD: string;
        PLAC_COD: string;
        PLAC_PESS_COD: string;
        PLAC_STATUS: string;
        ASS: string;
        SECO_DESC: string;
        PESS_NOME: string;
    };
    DetalheCrDados: {
        dtFormatadaIni: string;
        dtFormatadaFim: string;
        despesa: {
            abertoDespesa: string;
            baixadoDespesa: string;
            totalDespesa: string;
        },
        receita: {
            abertoReceita: string;
            baixadoReceita: string;
            totalReceita: string;
        },
        totais: {
            aberto: string;
            baixado: string;
            total: string;
        }
    };
    Agenda: undefined;
    SolicitacaoCompra: undefined;
    PurchaseWorksheet: undefined;
    DetalheSolicitacao: undefined;
    ServiceContract: undefined;
    DetalheContratoServico: {
        item: {
            COCS_COD: string,
            ASS: string;
            VALOR_TOTAL: string,
            COCS_DT_INICIO: string,
            COCS_DT_FIM: string,
            COCS_FORMA_PAGAMENTO: string,
            SERV_DESC: string,
            FORN_NOME: string,
            EMPR_NOME: string,
            FILI_NOME_FANTASIA: string,
            LOCA_DESC: string
        }
    };
    ServiceContractBulletin: undefined;
    DetalheCrMain: undefined;
    MovDiariaDetalhe: {
        data: string
    };
    AddPurchaseOrder: undefined
    DetalheContratoBulletinServico: {
        BOCS_DT_INICIO: string;
        BOCS_DT_FIM: string;
        BOCS_OBS: string;
        BOCS_DT_VENC: string;
        ASS: string;
        COCS_COD: string;
        BOCS_NUMERO: string;
        VALOR_TOTAL: string;
        BOCS_COD: string;
        FORN_COD: string;
        CERE_COD: string;
        FORN_NOME: string;
    }
    PriceDetailsPurchaseWorksheet: {
        PLAF_FORN_COD: string;
        PLAC_COD: string;
    };
};

const AuthStack = createNativeStackNavigator<RootStackParamList>()
const AuthRoutesSplash = () => {
  return (
        <AuthStack.Navigator>
            <AuthStack.Screen

                name="SplashScreen"

                component={SplashScreen}

                options={{ headerShown: false }}

            />

            <AuthStack.Screen

                name="Login"

                component={Login}

                options={{ headerShown: false }}

            />

            <AuthStack.Screen

                name="SignUp"

                component={SignUp}

                options={{ headerShown: false }}

            />

            <AuthStack.Screen

                name="Home"

                component={Home}

                options={{ headerShown: false }}

            />

            <AuthStack.Screen

                name="ComprasHome"

                component={ComprasHome}

                options={{ headerShown: false }}

            />

            <AuthStack.Screen

                name="Pedidos"

                component={Pedidos}

                options={{ headerShown: false }}

            />

            <AuthStack.Screen

                name="DetalhePedido"

                component={DetalhePedido}

                options={{ headerShown: false }}

            />

            <AuthStack.Screen

                name="Gerencial"

                component={GerencialHome}

                options={{ headerShown: false }}

            />

            <AuthStack.Screen

                name="MovDiaria"

                component={MovDiaria}

                options={{ headerShown: false }}

            />

            <AuthStack.Screen

                name="MovDiariaDetalhe"

                component={MovDiariaDetalhe}

                options={{ headerShown: false }}

            />

            <AuthStack.Screen

                name="Agenda"

                component={AgendaHome}

                options={{ headerShown: false }}

            />

            <AuthStack.Screen

                name="SolicitacaoCompra"

                component={SolicitacaoCompras}

                options={{ headerShown: false }}

            />

            <AuthStack.Screen

                name="DetalheSolicitacao"

                component={DetalheSolicitacaoCompra}

                options={{ headerShown: false }}

            />

            <AuthStack.Screen

                name="ServiceContract"

                component={ServiceContract}

                options={{ headerShown: false }}

            />

            <AuthStack.Screen

                name="DetalheContratoServico"

                component={DetalheContratoServico}

                options={{ headerShown: false }}

            />

            <AuthStack.Screen

                name="ServiceContractBulletin"

                component={ServiceContractBulletin}

                options={{ headerShown: false }}

            />

            <AuthStack.Screen

                name="DetalheCrMain"

                component={DetalheCrMain}

                options={{ headerShown: false }}

            />

            <AuthStack.Screen

                name="DetalheCrDados"

                component={DetalheCrDados}

                options={{ headerShown: false }}

            />
            <AuthStack.Screen

                name="AddPurchaseOrder"

                component={AddPurchaseOrder}

                options={{ headerShown: false }}

            />
            <AuthStack.Screen

                name="DetalheContratoBulletinServico"

                component={DetalheContratoBulletinServico}

                options={{ headerShown: false }}

            />

            <AuthStack.Screen

                name="PurchaseWorksheet"

                component={PurchaseWorksheet}

                options={{ headerShown: false }}

            />

            <AuthStack.Screen

                name="DetailsPurchaseWorksheet"

                component={DetailsPurchaseWorksheet}

                options={{ headerShown: false }}

            />

            <AuthStack.Screen

                name="PriceDetailsPurchaseWorksheet"

                component={PriceDetailsPurchaseWorksheet}

                options={{ headerShown: false }}

            />

        </AuthStack.Navigator>
  )
}

export default AuthRoutesSplash
