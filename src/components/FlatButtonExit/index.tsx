import React from 'react'
import * as C from './styles'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { RootStackParamList } from '../../routes/fullScreen.routes.js'
import { useNavigation } from '@react-navigation/native'
  type FullNavigationProp = NativeStackNavigationProp<
    RootStackParamList,
    'MovDiariaDetalhe'
  >;
const FlatButtonExitHome: React.FC = () => {
  const navigation = useNavigation <FullNavigationProp>()
  return (
    <>
      <C.AreaBtn
        style={{
          elevation: 10
        }}
        onPress={() => {
          navigation.navigate('Login')
        }}
      >
            <C.Icon
                  name={'power-off'}
                  size={25}
                  color="#121212"
            />
        </C.AreaBtn>
    </>
  )
}

export default FlatButtonExitHome
