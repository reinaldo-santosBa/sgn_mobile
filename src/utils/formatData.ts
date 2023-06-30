export const formatDate = (data: Date) => {
  const month = data.getMonth() + 1
  const year = data.getFullYear()
  let monthFormat
  let date

  month >= 10 ? monthFormat = month : monthFormat = '0' + month

  data.getDate() >= 10 ? date = data.getDate() : date = '0' + data.getDate()
  let dataFormated = ''

  dataFormated = date + '\\' + monthFormat + '\\' + year

  return dataFormated
}
