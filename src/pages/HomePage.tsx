import { JobesHero, JobesCategories, JobesFeaturedJobs, JobesStats, JobesLocations, JobesTestimonials, JobesArticles } from '@/features/landing/index.ts'
import styles from './HomePage.module.scss'

export function HomePage() {

  return (
    <div className={styles['p-home']}>
      <JobesHero />
      <JobesCategories />
      <JobesFeaturedJobs />
      <JobesStats />
      <JobesLocations />
      <JobesTestimonials />
      <JobesArticles />
    </div>
  )
}

