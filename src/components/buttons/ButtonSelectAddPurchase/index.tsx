import React from 'react'
import * as S from './styles'

interface props{
    text: string;
    handleClick: () => void;
}
const ButtonSelectAddPurchase: React.FC<props> = ({ text, handleClick }) => {
  return (
    <S.AreaBtn
        style={{ elevation: 5 }}
        onPress={handleClick}
    >
        <S.TextBtn>
            {text}
        </S.TextBtn>
    </S.AreaBtn>
  )
}

export default ButtonSelectAddPurchase
