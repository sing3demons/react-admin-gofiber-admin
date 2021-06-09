export default function currencyFormat(number: any) {
  return Intl.NumberFormat('th-TH', {
    style: 'currency',
    currency: 'THB',
  }).format(number)
}
