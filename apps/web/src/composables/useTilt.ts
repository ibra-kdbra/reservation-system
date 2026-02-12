import { ref, onMounted, onUnmounted, type Ref } from 'vue'

interface TiltOptions {
  maxTilt?: number
  perspective?: number
  speed?: number
  glare?: boolean
  maxGlare?: number
  scale?: number
}

export function useTilt(elementRef: Ref<HTMLElement | null>, options: TiltOptions = {}) {
  const {
    maxTilt = 15,
    perspective = 1000,
    speed = 400,
    glare = true,
    maxGlare = 0.35,
    scale = 1.02,
  } = options

  const tiltX = ref(0)
  const tiltY = ref(0)
  const glareOpacity = ref(0)
  const glareAngle = ref(0)
  const isHovering = ref(false)

  let currentX = 0
  let currentY = 0
  let targetX = 0
  let targetY = 0
  let animationFrame: number | null = null

  function lerp(start: number, end: number, factor: number) {
    return start + (end - start) * factor
  }

  function animate() {
    const springFactor = isHovering.value ? 0.08 : 0.15
    currentX = lerp(currentX, targetX, springFactor)
    currentY = lerp(currentY, targetY, springFactor)

    tiltX.value = currentX
    tiltY.value = currentY

    if (Math.abs(currentX - targetX) > 0.01 || Math.abs(currentY - targetY) > 0.01) {
      animationFrame = requestAnimationFrame(animate)
    } else {
      tiltX.value = targetX
      tiltY.value = targetY
    }
  }

  function handleMouseMove(e: MouseEvent) {
    if (!elementRef.value) return
    const rect = elementRef.value.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    const mouseX = e.clientX - centerX
    const mouseY = e.clientY - centerY
    const percentX = mouseX / (rect.width / 2)
    const percentY = mouseY / (rect.height / 2)

    targetX = -percentY * maxTilt
    targetY = percentX * maxTilt

    if (glare) {
      const angle = Math.atan2(mouseY, mouseX) * (180 / Math.PI)
      glareAngle.value = angle + 90
      glareOpacity.value = Math.min(
        Math.sqrt(percentX * percentX + percentY * percentY) * maxGlare,
        maxGlare
      )
    }

    if (!animationFrame) {
      animationFrame = requestAnimationFrame(animate)
    }
  }

  function handleMouseEnter() {
    isHovering.value = true
  }

  function handleMouseLeave() {
    isHovering.value = false
    targetX = 0
    targetY = 0
    glareOpacity.value = 0
    if (!animationFrame) {
      animationFrame = requestAnimationFrame(animate)
    }
  }

  onMounted(() => {
    const el = elementRef.value
    if (!el) return
    el.addEventListener('mousemove', handleMouseMove)
    el.addEventListener('mouseenter', handleMouseEnter)
    el.addEventListener('mouseleave', handleMouseLeave)
  })

  onUnmounted(() => {
    const el = elementRef.value
    if (!el) return
    el.removeEventListener('mousemove', handleMouseMove)
    el.removeEventListener('mouseenter', handleMouseEnter)
    el.removeEventListener('mouseleave', handleMouseLeave)
    if (animationFrame) cancelAnimationFrame(animationFrame)
  })

  function getTiltStyle() {
    return {
      transform: `perspective(${perspective}px) rotateX(${tiltX.value}deg) rotateY(${tiltY.value}deg) scale3d(${isHovering.value ? scale : 1}, ${isHovering.value ? scale : 1}, 1)`,
      transition: `transform ${speed}ms cubic-bezier(0.03, 0.98, 0.52, 0.99)`,
    }
  }

  function getGlareStyle() {
    return {
      background: `linear-gradient(${glareAngle.value}deg, rgba(255,255,255,${glareOpacity.value}) 0%, transparent 80%)`,
      position: 'absolute' as const,
      top: '0',
      left: '0',
      right: '0',
      bottom: '0',
      borderRadius: 'inherit',
      pointerEvents: 'none' as const,
      zIndex: '10',
    }
  }

  return {
    tiltX,
    tiltY,
    isHovering,
    glareOpacity,
    glareAngle,
    tiltStyle: getTiltStyle,
    glareStyle: getGlareStyle,
  }
}
