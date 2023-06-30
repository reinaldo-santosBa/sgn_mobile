import { TouchableOpacity } from 'react-native'
import React from 'react'
import styles from './styles'
import Icon from 'react-native-vector-icons/AntDesign'

interface iProps{
    func:()=>void
}

const BtnBack : React.FC<iProps> = ({ func }) => {
  return (
    <TouchableOpacity
        style={styles.areaIcon}
        onPress={() => {
          func()
        }}
    >
        <Icon
            name='arrowleft'
            size={30}
            color='#FFF'
        />
    </TouchableOpacity>
  )
}

export default BtnBack
