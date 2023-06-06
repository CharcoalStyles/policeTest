const currency = amount => {
  const num = amount / 1000
  return `$${num.toFixed(0)}k`
}

export default (context, inject) => {
  inject('currency', currency)
}
