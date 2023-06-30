import { View } from 'react-native'
import React from 'react'
import styles from './styles'

interface props{

  children:React.ReactNode

}

const AreaMenu : React.FC <props> = ({ children } :props) => {
  return (

    <View

      style={styles.container}

    >

      {children}

    </View>

  )
}

export default AreaMenu
