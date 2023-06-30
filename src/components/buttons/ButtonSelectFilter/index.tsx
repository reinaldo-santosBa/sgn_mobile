import React from 'react'
import * as S from './styles'

interface props{
    text: string;
    handleClick: () => void;
}
const ButtonSelectFilter: React.FC<props> = ({ text, handleClick }) => {
  return (
    <S.AreaBtn
        onPress={handleClick}
    >
        <S.TextBtn>
            {text}
        </S.TextBtn>
    </S.AreaBtn>
  )
}

export default ButtonSelectFilter
