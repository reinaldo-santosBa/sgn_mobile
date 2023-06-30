import { TouchableOpacity } from 'react-native'
import React from 'react'
import styles from './styles'
import Icon from 'react-native-vector-icons/FontAwesome'

interface iProps{
    func:()=>void
}

const BtnAdd : React.FC<iProps> = ({ func }) => {
  return (
    <TouchableOpacity
        style={styles.areaIcon}
        onPress={() => {
          func()
        }}
    >
        <Icon
            name='plus'
            size={30}
            color='#FFF'
        />
    </TouchableOpacity>
  )
}

export default BtnAdd
