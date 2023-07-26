import { TouchableOpacity } from 'react-native'
import React from 'react'
import styles from './styles'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

interface iProps{
    func:()=>void
}

const BtnListApproval : React.FC<iProps> = ({ func }) => {
  return (
    <TouchableOpacity
        style={styles.areaIcon}
        onPress={() => {
          func()
        }}
    >
        <Icon
          name='playlist-check'
          size={30}
          color='#FFF'
        />
    </TouchableOpacity>
  )
}

export default BtnListApproval
