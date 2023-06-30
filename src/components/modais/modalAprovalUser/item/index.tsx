import { Text } from 'react-native'
import React, { SetStateAction } from 'react'
import * as S from './styles'
interface props{
  nome: string;
  onChange: (value : string) => void;
  modalChange: () => undefined;
  cod: string;
  setAproval: React.Dispatch<SetStateAction<string>>

}
export const ItemUserAproval: React.FC<props> = ({ nome, onChange, modalChange, cod, setAproval }) => {
  return (
    <S.AreaSelect

      onPress={
        () => {
          onChange(cod)
          modalChange()
          setAproval(nome)
          console.log('====================================')
          console.log(1)
          console.log('====================================')
        }
      }
    >
      <Text>{nome}</Text>
    </S.AreaSelect>
  )
}
