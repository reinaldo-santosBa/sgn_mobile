import { View, ScrollView } from 'react-native'
import React from 'react'
import styles from './styles'
import AreaMenu from '../../areaMenu'
import MenuButtons from '../menuButtons'
import { useNavigation } from '@react-navigation/native'
import { RootStackParamList } from '../../../routes/fullScreen.routes'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'

export type HomeProps = NativeStackNavigationProp<
  RootStackParamList
>;

interface IRespondeBd {
  REEA_APLI_COD: number;
}
interface IRespondeBd2 {
  USAM_APLIC_COD: number;
}

interface Iprops {
  response: IRespondeBd[]
  response2: IRespondeBd2[]
}

const ScrollViewMenu : React.FC<Iprops> = ({ response, response2 }) => {
  const navigation = useNavigation <HomeProps>()

  return (

    <View

      style={styles.linear}

    >
      <ScrollView

        style={styles.container}

        showsVerticalScrollIndicator={false}

      >

        <AreaMenu>

          <MenuButtons

            number={1}

            image={require('../../../assets/img/modulos_novos/gerencial.png')}

            text={'Gerencial'}

            response={response} response2={response2}

            onPress={() => {
              navigation.navigate('Gerencial')
            }}

          />

          <MenuButtons

            number={2}

            image={require('../../../assets/img/modulos_novos/pagar.png')}

            response={response} response2={response2}

            text={'Pagar'}

            onPress={
              () => {
                navigation.navigate('PagarHome')
              }
            }
          />

          <MenuButtons

            number={3}

            image={require('../../../assets/img/modulos_novos/receber.png')}

            response={response} response2={response2}

            text={'Receber'}

            onPress={() => { return 1 }}
          />

        </AreaMenu>

        <AreaMenu>

          <MenuButtons

            number={4}

            image={require('../../../assets/img/modulos_novos/bancario.png')}

            text={'Bancario'}
            response={response} response2={response2}
            onPress={() => {
              return 1
            }}

          />

          <MenuButtons

            number={7}

            image={require('../../../assets/img/modulos_novos/orcamento.png')}

            response={response} response2={response2}

            text={'Orçamento'}

            onPress={() => {
              return 1
            }}
          />

          <MenuButtons

            image={require('../../../assets/img/modulos_novos/fluxo_de_caixa.png')}

            number={13}

            response={response} response2={response2}

            text={'Fluxo Caixa'}

            onPress={() => {
              return 1
            }}
          />

        </AreaMenu>

        <AreaMenu>

          <MenuButtons

            number={5}

            image={require('../../../assets/img/modulos_novos/imobiliario.png')}

            response={response} response2={response2}

            text={'Imobiliario'}

            onPress={() => {
              return 1
            }}
          />

          <MenuButtons

            number={6}

            image={require('../../../assets/img/modulos_novos/contrato-obra.png')}

            response={response} response2={response2}

            text={'Cont. obra'}

            onPress={() => {
              return 1
            }}
          />

          <MenuButtons

            number={8}

            image={require('../../../assets/img/modulos_novos/compras.png')}

            text={'Compras'}

            response={response} response2={response2}

            onPress={() => {
              navigation.navigate('ComprasHome')
            }}

          />

        </AreaMenu>

        <AreaMenu>

          <MenuButtons

            number={11}

            response={response} response2={response2}

            image={require('../../../assets/img/modulos_novos/estoque.png')}

            text={'Estoque'}

            onPress={() => {
              return 1
            }}

          />

          <MenuButtons

            number={10}

            image={require('../../../assets/img/modulos_novos/locacao.png')}

            response={response} response2={response2}

            text={'Locação'}

            onPress={() => {
              return 1
            }}
          />

          <MenuButtons

            number={0}

            image={require('../../../assets/img/modulos_novos/comercial.png')}

            response={response} response2={response2}

            text={'Comercial'}

            onPress={() => {
              return 1
            }}
          />

        </AreaMenu>

        <AreaMenu>

          <MenuButtons

            number={9}

            image={require('../../../assets/img/modulos_novos/interface_contabil.png')}

            response={response} response2={response2}

            text={'Int. Contabil'}

            onPress={() => {
              return 1
            }}
          />

          <MenuButtons

            number={18}

            image={require('../../../assets/img/modulos_novos/pessoal.png')}

            response={response} response2={response2}

            text={'Pessoal'}

            onPress={() => {
              return 1
            }}

          />

          <MenuButtons

            number={14}

            image={require('../../../assets/img/modulos_novos/fiscal.png')}

            response={response} response2={response2}

            text={'Fiscal'}

            onPress={() => {
              return 1
            }}
          />

        </AreaMenu>

      </ScrollView>

    </View>
  )
}

export default ScrollViewMenu
