import { Text } from 'react-native'
import React from 'react'
import * as S from './styles'
interface props{
  nome: string,
  setNomePlgcCod: (text: string, plgcCod: string, codCr: string) => undefined;
  modalChange: () => undefined;
  cereCod: string;
  plgcCod: string;
}
const ItemSelectCr: React.FC<props> = ({ nome, setNomePlgcCod, modalChange, plgcCod, cereCod }) => {
  return (
    <S.AreaSelect

      onPress={
        () => {
          setNomePlgcCod(nome, plgcCod, cereCod)
          modalChange()
        }
      }
    >
      <Text>{nome}</Text>
    </S.AreaSelect>
  )
}

export default ItemSelectCr
