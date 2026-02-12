<template>
  <canvas ref="canvasRef" class="particle-field" :style="{ opacity: opacity }"></canvas>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

interface Props {
  particleCount?: number
  colors?: string[]
  maxSize?: number
  minSize?: number
  speed?: number
  opacity?: number
  mouseInfluence?: number
}

const props = withDefaults(defineProps<Props>(), {
  particleCount: 50,
  colors: () => ['rgba(232,93,58,0.25)', 'rgba(45,106,79,0.25)', 'rgba(212,168,67,0.2)', 'rgba(240,125,86,0.2)'],
  maxSize: 6,
  minSize: 1,
  speed: 0.3,
  opacity: 1,
  mouseInfluence: 80,
})

const canvasRef = ref<HTMLCanvasElement | null>(null)
let ctx: CanvasRenderingContext2D | null = null
let animationFrame: number | null = null
let particles: Particle[] = []
let mouseX = -1000
let mouseY = -1000
let width = 0
let height = 0

interface Particle {
  x: number
  y: number
  baseX: number
  baseY: number
  size: number
  color: string
  vx: number
  vy: number
  alpha: number
  alphaSpeed: number
  pulsePhase: number
}

function createParticle(): Particle {
  const x = Math.random() * width
  const y = Math.random() * height
  return {
    x,
    y,
    baseX: x,
    baseY: y,
    size: props.minSize + Math.random() * (props.maxSize - props.minSize),
    color: props.colors[Math.floor(Math.random() * props.colors.length)],
    vx: (Math.random() - 0.5) * props.speed,
    vy: (Math.random() - 0.5) * props.speed,
    alpha: 0.2 + Math.random() * 0.6,
    alphaSpeed: 0.002 + Math.random() * 0.005,
    pulsePhase: Math.random() * Math.PI * 2,
  }
}

function initParticles() {
  particles = []
  for (let i = 0; i < props.particleCount; i++) {
    particles.push(createParticle())
  }
}

function draw() {
  if (!ctx) return

  ctx.clearRect(0, 0, width, height)

  for (const p of particles) {
    // Drift movement
    p.x += p.vx
    p.y += p.vy

    // Wrap around edges softly
    if (p.x < -20) p.x = width + 20
    if (p.x > width + 20) p.x = -20
    if (p.y < -20) p.y = height + 20
    if (p.y > height + 20) p.y = -20

    // Mouse repulsion
    const dx = p.x - mouseX
    const dy = p.y - mouseY
    const dist = Math.sqrt(dx * dx + dy * dy)
    if (dist < props.mouseInfluence) {
      const force = (1 - dist / props.mouseInfluence) * 2
      p.x += dx / dist * force
      p.y += dy / dist * force
    }

    // Pulsing alpha
    p.pulsePhase += p.alphaSpeed
    const alpha = p.alpha * (0.5 + 0.5 * Math.sin(p.pulsePhase))

    // Draw bokeh circle
    ctx.beginPath()
    const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 2)
    gradient.addColorStop(0, p.color.replace(/[\d.]+\)$/, `${alpha})`))
    gradient.addColorStop(0.5, p.color.replace(/[\d.]+\)$/, `${alpha * 0.5})`))
    gradient.addColorStop(1, 'transparent')
    ctx.fillStyle = gradient
    ctx.arc(p.x, p.y, p.size * 2, 0, Math.PI * 2)
    ctx.fill()
  }

  animationFrame = requestAnimationFrame(draw)
}

function handleResize() {
  if (!canvasRef.value) return
  const rect = canvasRef.value.parentElement?.getBoundingClientRect()
  if (!rect) return
  width = rect.width
  height = rect.height
  canvasRef.value.width = width
  canvasRef.value.height = height
}

function handleMouseMove(e: MouseEvent) {
  if (!canvasRef.value) return
  const rect = canvasRef.value.getBoundingClientRect()
  mouseX = e.clientX - rect.left
  mouseY = e.clientY - rect.top
}

function handleMouseLeave() {
  mouseX = -1000
  mouseY = -1000
}

onMounted(() => {
  if (!canvasRef.value) return
  ctx = canvasRef.value.getContext('2d')
  handleResize()
  initParticles()
  draw()

  window.addEventListener('resize', handleResize)
  canvasRef.value.parentElement?.addEventListener('mousemove', handleMouseMove)
  canvasRef.value.parentElement?.addEventListener('mouseleave', handleMouseLeave)
})

onUnmounted(() => {
  if (animationFrame) cancelAnimationFrame(animationFrame)
  window.removeEventListener('resize', handleResize)
})
</script>

<style scoped>
.particle-field {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 1;
}
</style>
