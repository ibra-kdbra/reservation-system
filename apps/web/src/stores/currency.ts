import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

interface CurrencyInfo {
  code: string
  symbol: string
  name: string
  flag: string
  rate: number // rate relative to USD
}

const CURRENCIES: CurrencyInfo[] = [
  { code: 'USD', symbol: '$', name: 'US Dollar', flag: '🇺🇸', rate: 1 },
  { code: 'JPY', symbol: '¥', name: 'Japanese Yen', flag: '🇯🇵', rate: 149.5 },
  { code: 'THB', symbol: '฿', name: 'Thai Baht', flag: '🇹🇭', rate: 35.2 },
  { code: 'KRW', symbol: '₩', name: 'Korean Won', flag: '🇰🇷', rate: 1320 },
  { code: 'INR', symbol: '₹', name: 'Indian Rupee', flag: '🇮🇳', rate: 83.1 },
  { code: 'SGD', symbol: 'S$', name: 'Singapore Dollar', flag: '🇸🇬', rate: 1.34 },
  { code: 'MYR', symbol: 'RM', name: 'Malaysian Ringgit', flag: '🇲🇾', rate: 4.72 },
  { code: 'PHP', symbol: '₱', name: 'Philippine Peso', flag: '🇵🇭', rate: 56.1 },
  { code: 'VND', symbol: '₫', name: 'Vietnamese Dong', flag: '🇻🇳', rate: 24850 },
  { code: 'IDR', symbol: 'Rp', name: 'Indonesian Rupiah', flag: '🇮🇩', rate: 15650 },
  { code: 'HKD', symbol: 'HK$', name: 'Hong Kong Dollar', flag: '🇭🇰', rate: 7.82 },
]

export const useCurrencyStore = defineStore('currency', () => {
  const saved = localStorage.getItem('nestasia_currency') || 'USD'
  const selectedCode = ref(saved)

  const currencies = CURRENCIES

  const selected = computed(
    () => currencies.find((c) => c.code === selectedCode.value) || currencies[0],
  )

  function setCurrency(code: string) {
    selectedCode.value = code
    localStorage.setItem('nestasia_currency', code)
  }

  function convert(usdAmount: number): number {
    return usdAmount * selected.value.rate
  }

  function format(usdAmount: number): string {
    const converted = convert(usdAmount)
    const info = selected.value

    // Special formatting for currencies with large numbers
    if (info.rate > 1000) {
      return `${info.symbol}${Math.round(converted).toLocaleString()}`
    }
    if (info.rate > 100) {
      return `${info.symbol}${Math.round(converted).toLocaleString()}`
    }
    return `${info.symbol}${converted.toFixed(converted < 100 ? 2 : 0)}`
  }

  return {
    selectedCode,
    selected,
    currencies,
    setCurrency,
    convert,
    format,
  }
})
