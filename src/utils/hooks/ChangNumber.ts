export const ChangNumber = (value: number) => {
  const newValue = new Intl.NumberFormat('fa-IR').format(value)
  return newValue
}
