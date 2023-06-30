import React from 'react'
import * as S from './styles'
import Icon from 'react-native-vector-icons/Entypo'
interface props{
  materialDesc: string;
  quantidade: string;
  unidadeMedi: string;
  materialCod: string;
  handleClick: (cod: string)=> void
}

export const ItemMaterial: React.FC<props> = (
  {
    materialDesc,
    quantidade,
    unidadeMedi,
    handleClick,
    materialCod
  }
) => {
  const handleClickSub = () => {
    handleClick(materialCod)
  }
  return (
    <S.AreaItem>
      <S.AreaContent>
          <S.TextContentTitle>
            Produto / Serviço
          </S.TextContentTitle>
          <S.TextContent>
            {
              materialDesc.length > 20
                ? materialDesc.slice(0, 20) + '...'
                : materialDesc
            }
          </S.TextContent>
          <S.TextContentTitle>
            Unidade de medida
          </S.TextContentTitle>
          <S.TextContent>
            {unidadeMedi}
          </S.TextContent>
        <S.TextContentTitle>
          Quantidade
        </S.TextContentTitle>
        <S.TextContent>
          {quantidade}
        </S.TextContent>
      </S.AreaContent>
      <S.ButtonSub
        onPress={handleClickSub}
      >
        <Icon
          name={'minus'}
          color={'#fff'}
          size={30}
        />
      </S.ButtonSub>
    </S.AreaItem>
  )
}
