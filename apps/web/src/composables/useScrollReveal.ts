import { onMounted, onUnmounted } from 'vue'

interface ScrollRevealOptions {
  threshold?: number
  rootMargin?: string
  staggerDelay?: number
  animation?: 'slide-up' | 'slide-left' | 'slide-right' | 'scale' | 'fade'
  once?: boolean
}

export function useScrollReveal(options: ScrollRevealOptions = {}) {
  const {
    threshold = 0.15,
    rootMargin = '0px 0px -50px 0px',
    staggerDelay = 80,
    animation = 'slide-up',
    once = true,
  } = options

  let observer: IntersectionObserver | null = null

  function getAnimationStyles(anim: string) {
    switch (anim) {
      case 'slide-up':
        return { from: 'translate3d(0, 40px, 0)', to: 'translate3d(0, 0, 0)' }
      case 'slide-left':
        return { from: 'translate3d(-40px, 0, 0)', to: 'translate3d(0, 0, 0)' }
      case 'slide-right':
        return { from: 'translate3d(40px, 0, 0)', to: 'translate3d(0, 0, 0)' }
      case 'scale':
        return { from: 'scale(0.9)', to: 'scale(1)' }
      case 'fade':
      default:
        return { from: 'none', to: 'none' }
    }
  }

  function setupReveal() {
    const sections = document.querySelectorAll('[data-reveal]')

    observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target as HTMLElement
            const delay = parseInt(el.dataset.revealDelay || '0', 10)
            const anim = el.dataset.revealAnimation || animation

            setTimeout(() => {
              el.classList.add('revealed')
              el.style.opacity = '1'
              el.style.transform = getAnimationStyles(anim).to
            }, delay)

            // Also reveal staggered children
            const children = el.querySelectorAll('[data-reveal-child]')
            children.forEach((child, index) => {
              const childEl = child as HTMLElement
              setTimeout(() => {
                childEl.classList.add('revealed')
                childEl.style.opacity = '1'
                childEl.style.transform = 'translate3d(0, 0, 0) scale(1)'
              }, delay + (index + 1) * staggerDelay)
            })

            if (once) observer?.unobserve(el)
          } else if (!once) {
            const el = entry.target as HTMLElement
            const anim = el.dataset.revealAnimation || animation
            el.classList.remove('revealed')
            el.style.opacity = '0'
            el.style.transform = getAnimationStyles(anim).from

            const children = el.querySelectorAll('[data-reveal-child]')
            children.forEach((child) => {
              const childEl = child as HTMLElement
              childEl.classList.remove('revealed')
              childEl.style.opacity = '0'
              childEl.style.transform = 'translate3d(0, 30px, 0)'
            })
          }
        })
      },
      { threshold, rootMargin }
    )

    sections.forEach((section) => {
      const el = section as HTMLElement
      const anim = el.dataset.revealAnimation || animation
      el.style.opacity = '0'
      el.style.transform = getAnimationStyles(anim).from
      el.style.transition = `opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1), transform 0.7s cubic-bezier(0.16, 1, 0.3, 1)`

      // Setup children
      const children = el.querySelectorAll('[data-reveal-child]')
      children.forEach((child) => {
        const childEl = child as HTMLElement
        childEl.style.opacity = '0'
        childEl.style.transform = 'translate3d(0, 30px, 0)'
        childEl.style.transition = `opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1), transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)`
      })

      observer!.observe(el)
    })
  }

  onMounted(() => {
    // Slight delay to ensure DOM is fully rendered
    requestAnimationFrame(() => {
      requestAnimationFrame(setupReveal)
    })
  })

  onUnmounted(() => {
    observer?.disconnect()
  })

  return { setupReveal }
}
