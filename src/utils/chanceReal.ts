const changeReal = (value : string) => {
  let valueFormated
  if (value === '' || value === null || value === undefined) {
    valueFormated = 'R$ 0,00'
  } else {
    const valueRounded = parseFloat(value)
    const valueInt = valueRounded.toFixed(2)
    valueFormated = 'R$' + valueInt.replace('.', ',')
  }

  return valueFormated
}

export default changeReal
