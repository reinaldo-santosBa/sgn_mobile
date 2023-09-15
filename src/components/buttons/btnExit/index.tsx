import { TouchableOpacity } from 'react-native'
import React from 'react'
import styles from './styles'
import Icon from 'react-native-vector-icons/Feather'

interface iProps{
    func:()=>void;
    marginT?: number;
}

const BtnExit : React.FC<iProps> = ({ func, marginT }) => {
  if (!marginT) {
    marginT = 0
  }
  return (
    <TouchableOpacity
        style={[styles.areaIcon, { top: marginT }]}
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
