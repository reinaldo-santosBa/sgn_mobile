import React from 'react'
import Container from '../../components/container'
import * as C from './styled'

interface Iprops {
  textModule: string;
  module: string;
}

const HomeModule: React.FC<Iprops> = ({ textModule, module }) => {
  return (
    <Container>
      {module === 'compras'
        ? <C.IconModule
          source={require('../../assets/img/modulos_novos/compras.png')}
          resizeMode='contain'
        />
        : ''
      }
      {module === 'gerencial'
        ? <C.IconModule
          source={require('../../assets/img/modulos_novos/gerencial.png')}
          resizeMode='contain'
        />
        : ''
      }
      {module === 'pagar'
        ? <C.IconModule
          source={require('../../assets/img/modulos_novos/pagar.png')}
          resizeMode='contain'
        />
        : ''
      }
        <C.Tittle>O que é o {module}?</C.Tittle>
        <C.TextContent>
          {textModule}
        </C.TextContent>
      </Container>
  )
}

export default HomeModule
