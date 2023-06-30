import { View, TextInput } from 'react-native'
import React from 'react'
import styles from './styles'

interface props{

    placeholder: string,
    onChange: React.Dispatch<React.SetStateAction<string>>;
    value: string
}

const InputModal: React.FC<props> = ({ placeholder, onChange, value }) => {
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

              />

            </View>

        </View>

  )
}

export default InputModal
