import { Text } from 'react-native'
import React, { SetStateAction } from 'react'
import * as S from './styles'
interface props{
  nome: string;
  onChange: (value : string) => void;
  modalChange: () => undefined;
  cod: string;
  setAlmoDesc: React.Dispatch<SetStateAction<string>>

}
export const ItemWerehouse: React.FC<props> = ({ nome, onChange, modalChange, cod, setAlmoDesc }) => {
  return (
    <S.AreaSelect

      onPress={
        () => {
          onChange(cod)
          modalChange()
          setAlmoDesc(nome)
        }
      }
    >
      <Text>{nome}</Text>
    </S.AreaSelect>
  )
}
