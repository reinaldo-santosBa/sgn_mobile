import { View, TextInput } from 'react-native'
import React from 'react'
import styles from './styles'

interface props{

    placeholder: string,
    onChange: React.Dispatch<React.SetStateAction<string>>;
    value: string,
    type?: string
}

const InputWithoutIcon: React.FC<props> = ({ placeholder, onChange, value, type }) => {
  return (

        <View

            style={styles.inputArea}

        >
            <View

                style={styles.area}

            >

              <TextInput
                  placeholder={placeholder}
                  style={styles.input}
                  onChangeText={onChange}
                  value={value}
                  keyboardType={type === 'number-pad' ? 'number-pad' : 'default'}

              />

            </View>

        </View>

  )
}

export default InputWithoutIcon
