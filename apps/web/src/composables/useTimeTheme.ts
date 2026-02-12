import { ref, computed, onMounted, onUnmounted } from 'vue'

export type TimePeriod = 'morning' | 'afternoon' | 'evening' | 'night'

interface TimeTheme {
  period: TimePeriod
  greeting: string
  emoji: string
  accentColor: string
  accentColorLight: string
}

const themes: Record<TimePeriod, TimeTheme> = {
  morning: {
    period: 'morning',
    greeting: 'Good morning',
    emoji: '☀️',
    accentColor: '#f97316',
    accentColorLight: '#fff7ed',
  },
  afternoon: {
    period: 'afternoon',
    greeting: 'Good afternoon',
    emoji: '🌤️',
    accentColor: '#3b82f6',
    accentColorLight: '#eff6ff',
  },
  evening: {
    period: 'evening',
    greeting: 'Good evening',
    emoji: '🌅',
    accentColor: '#a855f7',
    accentColorLight: '#faf5ff',
  },
  night: {
    period: 'night',
    greeting: 'Good evening',
    emoji: '🌙',
    accentColor: '#6366f1',
    accentColorLight: '#eef2ff',
  },
}

function getTimePeriod(hour: number): TimePeriod {
  if (hour >= 6 && hour < 12) return 'morning'
  if (hour >= 12 && hour < 18) return 'afternoon'
  if (hour >= 18 && hour < 21) return 'evening'
  return 'night'
}

export function useTimeTheme() {
  const currentHour = ref(new Date().getHours())
  let interval: ReturnType<typeof setInterval> | null = null

  const period = computed(() => getTimePeriod(currentHour.value))
  const theme = computed(() => themes[period.value])

  function applyThemeToDOM() {
    const t = theme.value
    document.documentElement.style.setProperty('--accent-dynamic', t.accentColor)
    document.documentElement.style.setProperty('--accent-dynamic-light', t.accentColorLight)
  }

  onMounted(() => {
    applyThemeToDOM()
    interval = setInterval(() => {
      const newHour = new Date().getHours()
      if (newHour !== currentHour.value) {
        currentHour.value = newHour
        applyThemeToDOM()
      }
    }, 60000)
  })

  onUnmounted(() => {
    if (interval) clearInterval(interval)
  })

  return {
    period,
    theme,
    currentHour,
  }
}
