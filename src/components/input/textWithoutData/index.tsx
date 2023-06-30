import React from 'react'
import * as C from './styles'
import { Image } from 'react-native'

const TextWithoutData: React.FC = () => {
  return (
    <>
      <Image
        source={require('../../../assets/img/brokenDoc.png')}
        resizeMode='contain'
        style={{
          width: 200,
          height: 200
        }}
      />
      <C.Text>Sem dados para serem exibidos</C.Text>
    </>
  )
}

export default TextWithoutData
