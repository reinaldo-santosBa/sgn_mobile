import { Text } from 'react-native'
import React, { SetStateAction } from 'react'
import * as S from './styles'
interface props{
  nome: string;
  onChange: (value : string) => void;
  modalChange: () => undefined;
  cod: string;
  setSetoDesc: React.Dispatch<SetStateAction<string>>
}
export const ItemSelectPurchaseOrder: React.FC<props> = ({ nome, onChange, modalChange, setSetoDesc, cod }) => {
  return (
    <S.AreaSelect

      onPress={
        () => {
          onChange(cod)
          modalChange()
          setSetoDesc(`${nome}`)
        }
      }
    >
      <Text>{nome}</Text>
    </S.AreaSelect>
  )
}
