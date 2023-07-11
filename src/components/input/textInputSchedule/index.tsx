import { View, TextInput } from 'react-native'
import React, { SetStateAction } from 'react'
import styles from './styles'

interface props{

    input: string,
    placeHolder: string,
    setInput: React.Dispatch<SetStateAction<string>>;
    placeHolderColor: string,
    name:string,
    secureTextEntry:boolean

}

const InputSchedule : React.FC <props> = ({ input, placeHolder, setInput, placeHolderColor, name, secureTextEntry } : props) => {
  return (

        <View

            style={styles.inputArea}

        >
            <View

                style={styles.area}

            >

                <TextInput

                    onChangeText={setInput}
                    value={input}
                    placeholder = {placeHolder}
                    placeholderTextColor={placeHolderColor}
                    style={styles.input}
                    secureTextEntry={secureTextEntry}

                />

            </View>

        </View>

  )
}

export default InputSchedule
