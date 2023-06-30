import { Text } from 'react-native'
import React, { SetStateAction } from 'react'
import * as S from './styles'
interface props{
  nome: string;
  onChange: (value : string) => void;
  modalChange: () => undefined;
  cod: string;
  setUnidMat: React.Dispatch<SetStateAction<string>>

}
export const ItemUnidMat: React.FC<props> = ({ nome, onChange, modalChange, cod, setUnidMat }) => {
  return (
    <S.AreaSelect

      onPress={
        () => {
          onChange(cod)
          modalChange()
          setUnidMat(nome)
        }
      }
    >
      <Text>{nome}</Text>
    </S.AreaSelect>
  )
}
