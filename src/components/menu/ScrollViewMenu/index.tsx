/* eslint-disable @typescript-eslint/no-explicit-any */
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

const ScrollViewMenu : React.FC = () => {
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

            image={require('../../../assets/img/modulos_novos/gerencial.png')}

            text={'Gerencial'}

            disabled={false}

            onPress={() => {
              navigation.navigate('Gerencial')
            }}

          />

          <MenuButtons

            image={require('../../../assets/img/modulos_novos/pagar.png')}

            disabled={false}

            text={'Pagar'}

            onPress={
              () => {
                navigation.navigate('PagarHome')
              }
            }
          />

          <MenuButtons

            image={require('../../../assets/img/modulos_novos/receber.png')}

            disabled={true}

            text={'Receber'}

            onPress={() => { return 1 }}
          />

        </AreaMenu>

        <AreaMenu>

          <MenuButtons

            image={require('../../../assets/img/modulos_novos/bancario.png')}

            text={'Bancario'}
            disabled={true}
            onPress={() => {
              console.log('====================================')
              console.log(1)
              console.log('====================================')
            }}

          />

          <MenuButtons

            image={require('../../../assets/img/modulos_novos/orcamento.png')}

            disabled={true}

            text={'Orçamento'}

            onPress={() => {
              return 1
            }}
          />

          <MenuButtons

            image={require('../../../assets/img/modulos_novos/fluxo_de_caixa.png')}

            disabled={true}

            text={'Fluxo Caixa'}

            onPress={() => {
              return 1
            }}
          />

        </AreaMenu>

        <AreaMenu>

          <MenuButtons

            image={require('../../../assets/img/modulos_novos/imobiliario.png')}

            disabled={true}

            text={'Imobiliario'}

            onPress={() => {
              return 1
            }}
          />

          <MenuButtons

            image={require('../../../assets/img/modulos_novos/contrato-obra.png')}

            disabled={true}

            text={'Cont. obra'}

            onPress={() => {
              return 1
            }}
          />

          <MenuButtons

            image={require('../../../assets/img/modulos_novos/compras.png')}

            text={'Compras'}

            disabled={false}

            onPress={() => {
              navigation.navigate('ComprasHome')
            }}

          />

        </AreaMenu>

        <AreaMenu>

          <MenuButtons

            disabled={true}

            image={require('../../../assets/img/modulos_novos/estoque.png')}

            text={'Estoque'}

            onPress={() => {
              console.log('====================================')
              console.log(1)
              console.log('====================================')
            }}

          />

          <MenuButtons

            image={require('../../../assets/img/modulos_novos/locacao.png')}

            disabled={true}

            text={'Locação'}

            onPress={() => {
              return 1
            }}
          />

          <MenuButtons

            image={require('../../../assets/img/modulos_novos/comercial.png')}

            disabled={true}

            text={'Comercial'}

            onPress={() => {
              return 1
            }}
          />

        </AreaMenu>

        <AreaMenu>

          <MenuButtons

            image={require('../../../assets/img/modulos_novos/interface_contabil.png')}

            disabled={true}

            text={'Int. Contabil'}

            onPress={() => {
              return 1
            }}
          />

          <MenuButtons

            image={require('../../../assets/img/modulos_novos/pessoal.png')}

            disabled={true}

            text={'Pessoal'}

            onPress={() => {
              return 1
            }}

          />

          <MenuButtons

            image={require('../../../assets/img/modulos_novos/fiscal.png')}

            disabled={true}

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
