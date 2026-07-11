import { useEffect, useRef, useState } from 'react'
import { useSiteStats } from '../../hooks/useSiteStats.ts'
import { LoadingState } from '@/shared/components/ui/LoadingState.tsx'
import styles from './JobesStats.module.scss'

// Import SVG images from assets
import counterIcon1 from '@/assets/images/home4-counter-1.svg'
import counterIcon2 from '@/assets/images/home4-counter-2.svg'
import counterIcon3 from '@/assets/images/home4-counter-3.svg'
import counterIcon4 from '@/assets/images/home4-counter-4.svg'

// Icon luân phiên theo thứ tự — số liệu lấy động từ wp-admin nên không gắn cứng icon theo nội dung cụ thể.
const STAT_ICONS = [counterIcon1, counterIcon2, counterIcon3, counterIcon4]

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

/* ─── Single stat card ─── */

function StatCard({
  iconSrc,
  value,
  suffix,
  label,
  isVisible,
}: {
  iconSrc: string
  value: number
  suffix: string
  label: string
  isVisible: boolean
}) {
  const count = useCountUp(value, isVisible)
  return (
    <div className={styles['p-stats__item']}>
      <div className={styles['p-stats__icon-wrapper']}>
        <img src={iconSrc} alt={label} className={styles['p-stats__icon-img']} />
      </div>
      <div className={styles['p-stats__content']}>
        <div className={styles['p-stats__number-wrapper']}>
          <h3 className={styles['p-stats__number']}>{count}</h3>
          <span className={styles['p-stats__suffix']}>{suffix}</span>
        </div>
        <p className={styles['p-stats__label']}>{label}</p>
      </div>
    </div>
  )
}

/* ─── Main exported section ─── */

export function JobesStats() {
  const ref = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)
  const { data: stats, isLoading } = useSiteStats()

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
      {isLoading ? (
        <div className={styles['p-stats__loading']}>
          <LoadingState />
        </div>
      ) : (
        <div className={`${styles['p-stats__container']} l-container`}>
          {stats?.map((stat, idx) => (
            <StatCard
              key={stat.label}
              iconSrc={stat.iconUrl ?? STAT_ICONS[idx % STAT_ICONS.length] ?? counterIcon1}
              value={stat.value}
              suffix={stat.suffix}
              label={stat.label}
              isVisible={isVisible}
            />
          ))}
        </div>
      )}
    </section>
  )
}
