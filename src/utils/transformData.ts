export const transformData = (data: string) => {
  const dateEarly = new Date(data)

  let month: string | number
  let date: string | number

  dateEarly.getMonth() >= 10
    ? month = dateEarly.getMonth()
    : month = '0' + dateEarly.getMonth()

  dateEarly.getDate() >= 10
    ? date = dateEarly.getDate()
    : date = '0' + dateEarly.getDate()

  return `${date}/${month}/${dateEarly.getFullYear()}`
}
