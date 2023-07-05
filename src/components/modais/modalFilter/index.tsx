import { Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { SetStateAction } from 'react'
import styles from './styles'
import Icon from 'react-native-vector-icons/FontAwesome'
import ButtonSelectFilter from '../../buttons/ButtonSelectFilter'
import InputDatePickerSelect from '../../input/inputDatePickerSelect'

interface Iprops {

    func?: () => void;
    funcSearch?: () => void;
    inputNum?: string;
    setInputNum?: React.Dispatch<SetStateAction<string>>;
    type: string;
    number?: string;
    setNumber?: React.Dispatch<SetStateAction<string>>;
    date?: string;
    setDate?: React.Dispatch<SetStateAction<string>>;
    purshingSector?: string;
    setModalPurshingSector?: React.Dispatch<SetStateAction<boolean>>;
    modalPurshingSector?: boolean;
    inputCod?: string;
    setInputCod?: React.Dispatch<SetStateAction<string>>;
    employeeDesc?: string;
    setModalEmployee?: React.Dispatch<SetStateAction<boolean>>;
    modalEmployee?: boolean;
    supplierDesc?: string;
    setModalSupplier?: React.Dispatch<SetStateAction<boolean>>;
    modalSupplier?: boolean;
    setModalWereHouse?: React.Dispatch<SetStateAction<boolean>>;
    modalWereHouse?: boolean;
    werehouseDesc?: string;
    dtFormatada?: string;
    setDtFormatada?: React.Dispatch<SetStateAction<string>>;
    setDtFormatadaRequest?: React.Dispatch<SetStateAction<string>>;
    crDesc?: string;
    setModalCr?: React.Dispatch<SetStateAction<boolean>>;
    modalCr?: boolean;
    subsidiaryDesc?: string;
    setModalSubsidiary?: React.Dispatch<SetStateAction<boolean>>;
    modalSubsidiary?: boolean;
    companyDesc?: string;
    setModalCompany?: React.Dispatch<SetStateAction<boolean>>;
    modalCompany?: boolean;
    localDesc?: string;
    setModalLocal?: React.Dispatch<SetStateAction<boolean>>;
    modalLocal?: boolean;
}

const ModalFilter: React.FC<Iprops> = ({
  inputNum, setInputNum, func, funcSearch, type, number, setNumber, purshingSector, setModalPurshingSector, modalPurshingSector, inputCod, setInputCod, employeeDesc, setModalEmployee, modalEmployee, supplierDesc, setModalSupplier, modalSupplier, setModalWereHouse, modalWereHouse, werehouseDesc, dtFormatada, setDtFormatada, setDtFormatadaRequest, setModalCr, modalCr, crDesc, subsidiaryDesc, setModalSubsidiary, modalSubsidiary, companyDesc, setModalCompany, modalCompany, setModalLocal, localDesc, modalLocal
}: Iprops) => {
  if (type === 'pedido') {
    return (
            <View style={styles.modalArea}>
                <TouchableOpacity
                    style={styles.icon}
                    onPress={() => {
                      func()
                    }}
                >
                    <Icon
                        name='close'
                        size={40}
                        color='#fff'
                    />

                </TouchableOpacity>

                <View style={styles.modalAreaInterna}>

                    <View>

                        <TextInput

                            onChangeText={setInputNum}

                            value={inputNum}

                            style={styles.textInput}

                            placeholder='Digite o numero do pedido'

                            keyboardType={'numeric'}

                        />

                    </View>

                    <ButtonSelectFilter
                        text={employeeDesc}
                        handleClick={
                            () => {
                              setModalEmployee(!modalEmployee)
                            }
                        }
                    />

                    <ButtonSelectFilter
                        text={supplierDesc}
                        handleClick={
                            () => {
                              setModalSupplier(!modalSupplier)
                            }
                        }
                    />

                    <TouchableOpacity style={styles.btnSearch}

                        onPress={() => {
                          funcSearch()
                        }}

                    >

                        <Text

                            style={styles.textSearch}

                        >

                            PESQUISAR

                        </Text>

                        <Icon

                            style={styles.iconSearch}

                            name='search'

                            size={20}

                            color='#fff'

                        />

                    </TouchableOpacity>

                </View>

            </View>
    )
  } else if (type === 'solicitacao') {
    return (
            <View style={styles.modalArea}>
                <TouchableOpacity
                    style={styles.icon}
                    onPress={() => {
                      func()
                    }}
                >
                    <Icon
                        name='close'
                        size={40}
                        color='#fff'
                    />

                </TouchableOpacity>

                <View style={styles.modalAreaInterna}>

                    <View>

                        <TextInput

                            onChangeText={setNumber}

                            value={number}

                            style={styles.textInput}

                            placeholder='Digite o numero da solicitação'

                            keyboardType={'numeric'}

                        />

                    </View>

                    <ButtonSelectFilter
                        text={werehouseDesc}
                        handleClick={
                            () => {
                              setModalWereHouse(!modalWereHouse)
                            }
                        }
                    />

                    <InputDatePickerSelect
                        dtFormatada={dtFormatada}
                        setDtFormatada={setDtFormatada}
                        setDtFormatadaRequest={setDtFormatadaRequest}
                    />

                    <ButtonSelectFilter
                        text={purshingSector}
                        handleClick={
                            () => {
                              setModalPurshingSector(!modalPurshingSector)
                            }
                        }
                    />

                    <ButtonSelectFilter
                        text={crDesc}
                        handleClick={
                            () => {
                              setModalCr(!modalCr)
                            }
                        }
                    />

                    <TouchableOpacity style={styles.btnSearch}

                        onPress={() => {
                          funcSearch()
                        }}

                    >

                        <Text

                            style={styles.textSearch}

                        >

                            PESQUISAR

                        </Text>

                        <Icon

                            style={styles.iconSearch}

                            name='search'

                            size={20}

                            color='#fff'

                        />

                    </TouchableOpacity>

                </View>

            </View>
    )
  } else if (type === 'contrato') {
    return (
            <View style={styles.modalArea}>
                <TouchableOpacity
                    style={styles.icon}
                    onPress={() => {
                      func()
                    }}
                >
                    <Icon
                        name='close'
                        size={40}
                        color='#fff'
                    />

                </TouchableOpacity>

                <View style={styles.modalAreaInterna}>

                    <View>

                        <TextInput

                            onChangeText={setInputCod}

                            value={inputCod}

                            style={styles.textInput}

                            placeholder='Digite o codigo do contrato'

                            keyboardType={'numeric'}

                        />

                    </View>

                    <ButtonSelectFilter
                        text={companyDesc}
                        handleClick={
                            () => {
                              setModalCompany(!modalCompany)
                            }
                        }
                    />

                    <ButtonSelectFilter
                        text={subsidiaryDesc}
                        handleClick={
                            () => {
                              setModalSubsidiary(!modalSubsidiary)
                            }
                        }
                    />

                    <ButtonSelectFilter
                        text={supplierDesc}
                        handleClick={
                            () => {
                              setModalSupplier(!modalSupplier)
                            }
                        }
                    />

                    <ButtonSelectFilter
                        text={localDesc}
                        handleClick={
                            () => {
                              setModalLocal(!modalLocal)
                            }
                        }
                    />

                    <TouchableOpacity style={styles.btnSearch}

                        onPress={() => {
                          funcSearch()
                        }}

                    >

                        <Text

                            style={styles.textSearch}

                        >

                            PESQUISAR

                        </Text>

                        <Icon

                            style={styles.iconSearch}

                            name='search'

                            size={20}

                            color='#fff'

                        />

                    </TouchableOpacity>

                </View>

            </View>
    )
  } else if (type === 'boletim') {
    return (
            <View style={styles.modalArea}>
                <TouchableOpacity
                    style={styles.icon}
                    onPress={() => {
                      func()
                    }}
                >
                    <Icon
                        name='close'
                        size={40}
                        color='#fff'
                    />

                </TouchableOpacity>

                <View style={styles.modalAreaInterna}>

                    <View>

                        <TextInput

                            onChangeText={setInputCod}

                            value={inputCod}

                            style={styles.textInput}

                            placeholder='Digite o codigo do contrato'

                            keyboardType={'numeric'}

                        />

                    </View>

                    <View>

                        <TextInput

                            onChangeText={setInputNum}

                            value={inputNum}

                            style={styles.textInput}

                            placeholder='Digite o número do boletim'

                            keyboardType={'numeric'}

                        />

                    </View>

                    <ButtonSelectFilter
                        text={supplierDesc}
                        handleClick={
                            () => {
                              setModalSupplier(!modalSupplier)
                            }
                        }
                    />

                    <TouchableOpacity style={styles.btnSearch}

                        onPress={() => {
                          funcSearch()
                        }}

                    >

                        <Text

                            style={styles.textSearch}

                        >

                            PESQUISAR

                        </Text>

                        <Icon

                            style={styles.iconSearch}

                            name='search'

                            size={20}

                            color='#fff'

                        />

                    </TouchableOpacity>

                </View>

            </View>
    )
  } else if (type === 'planilha') {
    return (
          <View style={styles.modalArea}>
              <TouchableOpacity
                  style={styles.icon}
                  onPress={() => {
                    func()
                  }}
              >
                  <Icon
                      name='close'
                      size={40}
                      color='#fff'
                  />

              </TouchableOpacity>

              <View style={styles.modalAreaInterna}>

                  <View>

                      <TextInput

                          onChangeText={setInputCod}

                          value={inputCod}

                          style={styles.textInput}

                          placeholder='Digite o codigo da planilha'

                          keyboardType={'numeric'}

                      />

                  </View>

                    <ButtonSelectFilter
                        text={purshingSector}
                        handleClick={
                            () => {
                              setModalPurshingSector(!modalPurshingSector)
                            }
                        }
                    />

                  <ButtonSelectFilter
                      text={employeeDesc}
                      handleClick={
                          () => {
                            setModalEmployee(!modalEmployee)
                          }
                      }
                  />

                  <TouchableOpacity style={styles.btnSearch}

                      onPress={() => {
                        funcSearch()
                      }}

                  >

                      <Text

                          style={styles.textSearch}

                      >

                          PESQUISAR

                      </Text>

                      <Icon

                          style={styles.iconSearch}

                          name='search'

                          size={20}

                          color='#fff'

                      />

                  </TouchableOpacity>

              </View>

          </View>
    )
  } else if (type === 'pagar') {
    return (
          <View style={styles.modalArea}>
              <TouchableOpacity
                  style={styles.icon}
                  onPress={() => {
                    func()
                  }}
              >
                  <Icon
                      name='close'
                      size={40}
                      color='#fff'
                  />

              </TouchableOpacity>

              <View style={styles.modalAreaInterna}>

                  <View>

                      <TextInput

                          onChangeText={setInputCod}

                          value={inputCod}

                          style={styles.textInput}

                          placeholder='Digite o numero da transação'

                          keyboardType={'numeric'}

                      />

                </View>

                <View>

                    <TextInput

                        onChangeText={setInputNum}

                        value={inputNum}

                        style={styles.textInput}

                        placeholder='Digite o número do documento'

                        keyboardType={'numeric'}

                    />

                </View>

                  <ButtonSelectFilter
                      text={supplierDesc}
                      handleClick={
                          () => {
                            setModalSupplier(!modalSupplier)
                          }
                      }
                  />

                  <TouchableOpacity style={styles.btnSearch}

                      onPress={() => {
                        funcSearch()
                      }}

                  >

                      <Text

                          style={styles.textSearch}

                      >

                          PESQUISAR

                      </Text>

                      <Icon

                          style={styles.iconSearch}

                          name='search'

                          size={20}

                          color='#fff'

                      />

                  </TouchableOpacity>

              </View>

          </View>
    )
  }
}

export default ModalFilter
