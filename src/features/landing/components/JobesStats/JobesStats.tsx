import { useEffect, useRef, useState } from 'react'
import styles from './JobesStats.module.scss'

/* ─── Icon components ─── */

function BuildingIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="3" y="3" width="7" height="7" rx="1" />
      <rect x="14" y="3" width="7" height="7" rx="1" />
      <rect x="14" y="14" width="7" height="7" rx="1" />
      <rect x="3" y="14" width="7" height="7" rx="1" />
    </svg>
  )
}

function UsersIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  )
}

function BadgeIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="2" y="7" width="20" height="14" rx="2" />
      <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" />
      <line x1="12" y1="12" x2="12" y2="12" />
      <line x1="8" y1="16" x2="16" y2="16" />
    </svg>
  )
}

function ClipboardIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
      <rect x="8" y="2" width="8" height="4" rx="1" ry="1" />
      <line x1="9" y1="12" x2="15" y2="12" />
      <line x1="9" y1="16" x2="13" y2="16" />
    </svg>
  )
}

/* ─── Count-up hook ─── */

function useCountUp(target: number, isVisible: boolean, duration = 1800) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!isVisible) return
    let frame = 0
    const totalFrames = Math.round(duration / 16)
    const timer = setInterval(() => {
      frame++
      // ease-out curve
      const progress = 1 - Math.pow(1 - frame / totalFrames, 3)
      const current = Math.round(progress * target)
      setCount(current)
      if (frame >= totalFrames) {
        setCount(target)
        clearInterval(timer)
      }
    }, 16)
    return () => clearInterval(timer)
  }, [isVisible, target, duration])

  return count
}

/* ─── Stat data ─── */

interface StatItem {
  icon: React.ReactNode
  value: number
  suffix: string
  label: string
  id: string
}

const STATS: StatItem[] = [
  { id: 'stat-recruiters', icon: <BuildingIcon />, value: 800, suffix: 'K+', label: 'Total Recruiters' },
  { id: 'stat-users', icon: <UsersIcon />, value: 600, suffix: 'K+', label: 'Daily User Visited' },
  { id: 'stat-jobs', icon: <BadgeIcon />, value: 10, suffix: 'K+', label: 'Daily Job Posted' },
  { id: 'stat-applied', icon: <ClipboardIcon />, value: 700, suffix: 'K+', label: 'Total Applied' },
]

/* ─── Single stat card ─── */

function StatCard({ stat, isVisible }: { stat: StatItem; isVisible: boolean }) {
  const count = useCountUp(stat.value, isVisible)
  return (
    <div className={styles['p-stats__item']} id={stat.id}>
      <span className={styles['p-stats__icon']}>{stat.icon}</span>
      <div className={styles['p-stats__content']}>
        <p className={styles['p-stats__number']}>
          <span className={styles['p-stats__count']}>{count}</span>
          <span className={styles['p-stats__suffix']}>{stat.suffix}</span>
        </p>
        <p className={styles['p-stats__label']}>{stat.label}</p>
      </div>
    </div>
  )
}

/* ─── Main exported section ─── */

export function JobesStats() {
  const ref = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0]
        if (entry && entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.25 },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <section
      ref={ref}
      className={styles['p-stats']}
      id="platform-stats-section"
      aria-label="Platform statistics"
    >
      {STATS.map((stat) => (
        <StatCard key={stat.id} stat={stat} isVisible={isVisible} />
      ))}
    </section>
  )
}
