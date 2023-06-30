import { AuthContextProvider } from './src/contexts/contextApi'
import { NavigationContainer } from '@react-navigation/native'
import RouterFullScreen from './src/routes/fullScreen.routes'
import React from 'react'

const App = () => {
  return (

     <NavigationContainer>

      <AuthContextProvider>

        <RouterFullScreen/>

      </AuthContextProvider>

    </NavigationContainer>

  )
}

export default App
