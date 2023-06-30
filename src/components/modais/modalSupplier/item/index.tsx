import { Text } from 'react-native'
import React, { SetStateAction } from 'react'
import * as S from './styles'
interface props{
  nome: string;
  onChange: (value : string) => void;
  modalChange: () => undefined;
  cod: string;
  setSupplier: React.Dispatch<SetStateAction<string>>

}
export const ItemSupplier: React.FC<props> = ({ nome, onChange, modalChange, cod, setSupplier }) => {
  return (
    <S.AreaSelect

      onPress={
        () => {
          onChange(cod)
          modalChange()
          setSupplier(nome)
        }
      }
    >
      <Text>{nome}</Text>
    </S.AreaSelect>
  )
}
