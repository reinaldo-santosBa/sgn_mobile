import React, { SetStateAction, useState } from 'react'
import * as S from './styles'

interface props {
  setValue: React.Dispatch<SetStateAction<string>>
  onChange: React.Dispatch<SetStateAction<string>>
  onChangeCod: React.Dispatch<SetStateAction<string>>
  setArrayMaterial: React.Dispatch<SetStateAction<[]>>
  value: string;
  setUnidMatDesc: React.Dispatch<SetStateAction<string>>
  setUnidMatCod: React.Dispatch<SetStateAction<string>>
  setQuantidade: React.Dispatch<SetStateAction<string>>
}
const CheckBoxArea: React.FC<props> = ({ setValue, onChange, onChangeCod, setArrayMaterial, value, setUnidMatDesc, setUnidMatCod, setQuantidade }) => {
  const [color1, setColor1] = useState('#333')
  const [color2, setColor2] = useState('transparent')
  return (
    <S.Area>
      <S.CheckBox
        onPress={() => {
          setValue('Produto')
          setColor2('transparent')
          setColor1('#333')
          onChange('Escolha o produto/serviço')
          onChangeCod('')
          if (value !== 'Produto') {
            setArrayMaterial([])
          }
          setUnidMatDesc('Escolha a unidade de medida')
          setUnidMatCod('')
          setQuantidade('')
        }}
      >
        <S.CircleArea>
          <S.CircleAreaInto
            backgroound={color1}
          />
        </S.CircleArea>
        <S.CheckboxText>
          Produto
        </S.CheckboxText>
      </S.CheckBox>
      <S.CheckBox
        onPress={() => {
          setValue('Serviço')
          setColor1('transparent')
          setColor2('#333')
          setQuantidade('')
          setUnidMatDesc('Escolha a unidade de medida')
          setUnidMatCod('')
          onChange('Escolha o produto/serviço')
          onChangeCod('')
          if (value !== 'Serviço') {
            setArrayMaterial([])
          }
        }}
      >
        <S.CircleArea>
          <S.CircleAreaInto
            backgroound={color2}
          />
        </S.CircleArea>
        <S.CheckboxText>
          Serviço
        </S.CheckboxText>
      </S.CheckBox>
    </S.Area>
  )
}

export default CheckBoxArea
