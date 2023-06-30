import React from 'react'
import styles from './styles'
import { SafeAreaView } from 'react-native-safe-area-context'

interface IContainer {
    children:React.ReactNode
}

const Container : React.FC<IContainer> = ({ children }) => {
  return (
    <SafeAreaView
      style={styles.container}

    >

        {children}

    </SafeAreaView>

  )
}

export default Container
