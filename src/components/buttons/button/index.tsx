/* eslint-disable @typescript-eslint/no-explicit-any */
import { Text, TouchableOpacity } from 'react-native'
import React from 'react'
import styles from './styles'

interface buttonProps {

  functionOnpress:()=> void;
  textButton:string

}

const Button : React.FC<buttonProps> = ({ functionOnpress, textButton }) => {
  const onPressFunction = () => {
    functionOnpress()
  }

  return (
    <TouchableOpacity

        onPress={
          () => onPressFunction()
        }

        style={styles.areaButton}

    >

        <Text style={styles.textButton}>

            {textButton}

        </Text>

    </TouchableOpacity>

  )
}

export default Button
