import React from 'react'
import * as C from './styles'
import { View } from 'react-native'

interface props{
  message: string[];
  error: boolean;
  func: () => void;
}
type ItemProps = {
  title: string
};

const ModalAlert: React.FC<props> = ({ message, error, func }) => {
  const Item = ({ title }: ItemProps) => (
    <View>
      <C.ModalText> - {title}</C.ModalText>
      <C.ModalText></C.ModalText>
    </View>
  )
  return (
    <C.Area>
      <C.ModalArea>
        {
          error === false
            ? <C.ModalImg source={require('../../../assets/img/ok.png')} resizeMode='contain' />
            : <C.ModalImg source={require('../../../assets/img/error.png')} resizeMode='contain' />
        }
        <C.ModalFlatList
          data={message}
          renderItem={({ item }) => <Item title={item + ''}/>}
        />
        <C.ModalBtn
          onPress={() => {
            func()
          }}
        >
          <C.ModalTextBTn>
            OK
          </C.ModalTextBTn>
        </C.ModalBtn>
      </C.ModalArea>
    </C.Area>
  )
}

export default ModalAlert
