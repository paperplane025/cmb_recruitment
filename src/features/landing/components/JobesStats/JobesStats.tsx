import { useEffect, useRef, useState } from 'react'
import styles from './JobesStats.module.scss'

// Import SVG images from assets
import counterIcon1 from '@/assets/images/home4-counter-1.svg'
import counterIcon2 from '@/assets/images/home4-counter-2.svg'
import counterIcon3 from '@/assets/images/home4-counter-3.svg'
import counterIcon4 from '@/assets/images/home4-counter-4.svg'

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
  iconSrc: string
  value: number
  suffix: string
  label: string
  id: string
}

const STATS: StatItem[] = [
  { id: 'stat-recruiters', iconSrc: counterIcon1, value: 800, suffix: 'K+', label: 'Tổng nhà tuyển dụng' },
  { id: 'stat-users', iconSrc: counterIcon2, value: 600, suffix: 'K+', label: 'Lượt truy cập mỗi ngày' },
  { id: 'stat-jobs', iconSrc: counterIcon3, value: 10, suffix: 'K+', label: 'Việc làm đăng mỗi ngày' },
  { id: 'stat-applied', iconSrc: counterIcon4, value: 700, suffix: 'K+', label: 'Tổng lượt ứng tuyển' },
]

/* ─── Single stat card ─── */

function StatCard({ stat, isVisible }: { stat: StatItem; isVisible: boolean }) {
  const count = useCountUp(stat.value, isVisible)
  return (
    <div className={styles['p-stats__item']} id={stat.id}>
      <div className={styles['p-stats__icon-wrapper']}>
        <img src={stat.iconSrc} alt={stat.label} className={styles['p-stats__icon-img']} />
      </div>
      <div className={styles['p-stats__content']}>
        <div className={styles['p-stats__number-wrapper']}>
          <h3 className={styles['p-stats__number']}>{count}</h3>
          <span className={styles['p-stats__suffix']}>{stat.suffix}</span>
        </div>
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
      aria-label="Thống kê nền tảng"
    >
      <div className={`${styles['p-stats__container']} l-container`}>
        {STATS.map((stat) => (
          <StatCard key={stat.id} stat={stat} isVisible={isVisible} />
        ))}
      </div>
    </section>
  )
}
