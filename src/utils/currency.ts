export const CURRENCY_SYMBOL = '₨'
export const CURRENCY_CODE = 'PKR'

export const formatCurrency = (amount: number): string => {
  return `${CURRENCY_SYMBOL}${amount.toFixed(2)}`
}

export const formatCurrencyWithCode = (amount: number): string => {
  return `${CURRENCY_SYMBOL}${amount.toFixed(2)} ${CURRENCY_CODE}`
}
