import { Text } from 'react-native'
import React, { SetStateAction } from 'react'
import * as S from './styles'

interface props{
  nome: string;
  onChange: (value : string) => void;
  modalChange: () => undefined;
  cod: string;
  setItemPlgcDesc: React.Dispatch<SetStateAction<string>>
}

export const ItemItemPlcg: React.FC<props> = ({ nome, onChange, modalChange, cod, setItemPlgcDesc }) => {
  return (
    <S.AreaSelect

      onPress={
        () => {
          onChange(cod)
          modalChange()
          setItemPlgcDesc(nome)
        }
      }
    >
      <Text>{nome}</Text>
    </S.AreaSelect>
  )
}
