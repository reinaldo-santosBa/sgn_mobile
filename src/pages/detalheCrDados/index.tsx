import React, { useEffect } from 'react'
import MenuConainerGerencial from '../../components/menu/menuContainerGerencial'
import { BackHandler } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { RootStackParamList } from '../../routes/fullScreen.routes'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import * as S from './styles'
import { VictoryAxis, VictoryBar, VictoryChart, VictoryTheme } from 'victory-native'

interface propsRoute {
  route: {
    key: string,
    name: string,
    params: {
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
    }
    path: string
  }
}

const DetalheCrDados: React.FC = ({ route }: propsRoute) => {
  const {
    abertoDespesa,
    baixadoDespesa,
    totalDespesa
  } = route.params.despesa
  const {
    abertoReceita,
    baixadoReceita,
    totalReceita
  } = route.params.receita
  const {
    aberto,
    baixado,
    total
  } = route.params.totais

  const despesaData = [
    { quarter: 'Aberto', earnings: parseFloat(abertoDespesa) },
    { quarter: 'Baixado', earnings: parseFloat(baixadoDespesa) },
    { quarter: 'Total', earnings: parseFloat(totalDespesa) }
  ]
  const receitaData = [
    { quarter: 'Aberto', earnings: parseFloat(abertoReceita) },
    { quarter: 'Baixado', earnings: parseFloat(baixadoReceita) },
    { quarter: 'Total', earnings: parseFloat(totalReceita) }
  ]

  const totalData = [
    { quarter: 'Aberto', earnings: parseFloat(aberto) },
    { quarter: 'Baixado', earnings: parseFloat(baixado) },
    { quarter: 'Total', earnings: parseFloat(total) }
  ]

  const { dtFormatadaIni, dtFormatadaFim } = route.params
  type FullNavigationProp = NativeStackNavigationProp<
    RootStackParamList,
    'DetalheCrMain'
  >;
  const navigation = useNavigation<FullNavigationProp>()

  const backAction = () => {
    navigation.navigate('DetalheCrMain')
    return true
  }

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', backAction)

    return () =>
      BackHandler.removeEventListener('hardwareBackPress', backAction)
  }, [])

  return (
    <MenuConainerGerencial>
      <S.Contorno
        contentContainerStyle={{ flexGrow: 1, alignItems: 'center' }}

      >

        <S.TextTittle>
          Periodo
        </S.TextTittle>
        <S.TextTittle>
          {dtFormatadaIni} - {dtFormatadaFim}
        </S.TextTittle>
        <S.CardArea style={{ elevation: 5 }} >
          <S.TextTittleCard>
            Despesa
          </S.TextTittleCard>
          <S.TextContentCard>
            <S.TextTittleContentCard>Aberto: </S.TextTittleContentCard>
            {abertoDespesa}
          </S.TextContentCard>
          <S.TextContentCard>
            <S.TextTittleContentCard>Baixado: </S.TextTittleContentCard>
            {baixadoDespesa}
          </S.TextContentCard>
          <S.TextContentCard>
            <S.TextTittleContentCard>Total: </S.TextTittleContentCard>
            {totalDespesa}
          </S.TextContentCard>
          <VictoryChart
            theme={VictoryTheme.material}
            width={300}
          >
            <VictoryAxis />
            <VictoryBar data={despesaData} x="quarter" y="earnings" style={{ data: { fill: '#c43a31' } }} />
          </VictoryChart>
        </S.CardArea>

        <S.CardArea style={{ elevation: 5 }} >
          <S.TextTittleCard>
             Receita
          </S.TextTittleCard>
          <S.TextContentCard>
            <S.TextTittleContentCard>Aberto: </S.TextTittleContentCard>
            {abertoReceita}
          </S.TextContentCard>
          <S.TextContentCard>
            <S.TextTittleContentCard>Baixado: </S.TextTittleContentCard>
            {baixadoReceita}
          </S.TextContentCard>
          <S.TextContentCard>
            <S.TextTittleContentCard>Total: </S.TextTittleContentCard>
            {totalReceita}
          </S.TextContentCard>
          <VictoryChart
            theme={VictoryTheme.material}
            width={300}
          >
            <VictoryAxis />
            <VictoryBar data={receitaData} x="quarter" y="earnings" style={{ data: { fill: '#27a339' } }} />
          </VictoryChart>
        </S.CardArea>

        <S.CardArea style={{ elevation: 5 }} >
          <S.TextTittleCard>
            Totais
          </S.TextTittleCard>
          <S.TextContentCard>
            <S.TextTittleContentCard>Aberto: </S.TextTittleContentCard>
            {aberto}
          </S.TextContentCard>
          <S.TextContentCard>
            <S.TextTittleContentCard>Baixado: </S.TextTittleContentCard>
            {baixado}
          </S.TextContentCard>
          <S.TextContentCard>
            <S.TextTittleContentCard>Total: </S.TextTittleContentCard>
            {total}
          </S.TextContentCard>
          <VictoryChart
            theme={VictoryTheme.material}
            width={300}
          >
            <VictoryAxis />
            <VictoryBar data={totalData} x="quarter" y="earnings" />
          </VictoryChart>
        </S.CardArea>
      </S.Contorno>
    </MenuConainerGerencial>
  )
}

export default DetalheCrDados
