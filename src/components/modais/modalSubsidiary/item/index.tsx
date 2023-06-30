import { Text } from 'react-native'
import React, { SetStateAction } from 'react'
import * as S from './styles'
interface props{
  nome: string;
  onChange: (value : string) => void;
  modalChange: () => undefined;
  cod: string;
  setSubsidiary: React.Dispatch<SetStateAction<string>>

}
export const ItemSubsidiary: React.FC<props> = ({ nome, onChange, modalChange, cod, setSubsidiary }) => {
  return (
    <S.AreaSelect

      onPress={
        () => {
          onChange(cod)
          modalChange()
          setSubsidiary(nome)
        }
      }
    >
      <Text>{nome}</Text>
    </S.AreaSelect>
  )
}
