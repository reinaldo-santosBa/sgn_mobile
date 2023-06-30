import { Text } from 'react-native'
import React, { SetStateAction } from 'react'
import * as S from './styles'
interface props{
  nome: string;
  onChange: (value : string) => void;
  modalChange: () => undefined;
  cod: string;
  setCereDesc: React.Dispatch<SetStateAction<string>>
  setPlgcCod: React.Dispatch<SetStateAction<string>>
  plgcCod: string
  setTircCod: React.Dispatch<SetStateAction<string>>
  tircCod: string;
}
export const ItemCr: React.FC<props> = ({ nome, onChange, modalChange, cod, setCereDesc, setPlgcCod, plgcCod, setTircCod, tircCod }) => {
  console.log('====================================')
  console.log(plgcCod, tircCod)
  console.log('====================================')
  return (
    <S.AreaSelect

      onPress={
        () => {
          onChange(cod)
          modalChange()
          setCereDesc(nome)
          setPlgcCod(plgcCod)
          setTircCod(tircCod)
        }
      }
    >
      <Text>{nome}</Text>
    </S.AreaSelect>
  )
}
