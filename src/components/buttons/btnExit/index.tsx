import { TouchableOpacity } from 'react-native'
import React from 'react'
import styles from './styles'
import Icon from 'react-native-vector-icons/Feather'

interface iProps{
    func:()=>void
}

const BtnExit : React.FC<iProps> = ({ func }) => {
  return (
    <TouchableOpacity
        style={styles.areaIcon}
        onPress={() => {
          func()
        }}
    >
        <Icon
            name='x'
            size={30}
            color='#FFF'
        />
    </TouchableOpacity>
  )
}

export default BtnExit
