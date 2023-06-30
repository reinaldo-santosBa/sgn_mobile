import React from 'react'
import * as S from './styles'

interface props{
    text: string;
}
const TextAttAddPurchase: React.FC<props> = ({ text }) => {
  return (
    <S.AreaBtn
        style={{ elevation: 5 }}
    >
        <S.TextBtn>
            {text}
        </S.TextBtn>
    </S.AreaBtn>
  )
}

export default TextAttAddPurchase
