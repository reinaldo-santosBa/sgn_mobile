import React, { SetStateAction, useState } from 'react'
import * as C from './styled'
interface params{
  setTipo: React.Dispatch<SetStateAction<string>>
}
const ButtonSoliFornPlanilha: React.FC<params> = ({ setTipo }) => {
  const [color1, setColor1] = useState('#000')
  const [color2, setColor2] = useState('transparent')

  const onClick1 = () => {
    setColor1('#000')
    setColor2('transparent')
    setTipo('FORN')
  }

  const onClick2 = () => {
    setColor2('#000')
    setColor1('transparent')
    setTipo('SOLI')
  }

  return (
    <C.AreaBtn>
      <C.Btn
        onPress={onClick1}
      >
        <C.CircleArea>
          <C.CircleAreaInto
            backgroound={color1}
          />
        </C.CircleArea>
        <C.BtnText>Fornecedores</C.BtnText>
      </C.Btn>
      <C.Btn
        onPress={onClick2}
      >
        <C.CircleArea>
          <C.CircleAreaInto
            backgroound={color2}
          />
        </C.CircleArea>
        <C.BtnText>Solicitações</C.BtnText>
      </C.Btn>
    </C.AreaBtn>
  )
}

export default ButtonSoliFornPlanilha
