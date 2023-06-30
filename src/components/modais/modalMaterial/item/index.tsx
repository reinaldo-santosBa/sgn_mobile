import { Text } from 'react-native'
import React, { SetStateAction } from 'react'
import * as S from './styles'
interface props{
  nome: string;
  onChange: (value : string) => void;
  modalChange: () => undefined;
  cod: string;
  setmateDesc: React.Dispatch<SetStateAction<string>>
  setUnmaNome: React.Dispatch<SetStateAction<string>>
  unmaNome: string;
  setUnmaCod: React.Dispatch<SetStateAction<string>>
  unmaCod: string
}
export const ItemMaterial: React.FC<props> = ({ nome, onChange, modalChange, cod, setmateDesc, setUnmaNome, unmaNome, setUnmaCod, unmaCod }) => {
  return (
    <S.AreaSelect

      onPress={
        () => {
          onChange(`${cod}`)
          setmateDesc(`${nome}`)
          modalChange()
          setUnmaNome(unmaNome)
          setUnmaCod(unmaCod)
        }
      }
    >
      <Text>{cod} - {nome}</Text>
    </S.AreaSelect>
  )
}
