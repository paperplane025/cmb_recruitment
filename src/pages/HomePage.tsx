import { JobesHero, JobesCategories, JobesFeaturedJobs, JobesStats, JobesLocations, JobesTestimonials, JobesTrustedCompanies, JobesTopRecruiters, JobesArticles } from '@/features/landing/index.ts'

export function HomePage() {

  return (
    <div className="flex flex-col">
      <JobesHero />
      <JobesCategories />
      <JobesFeaturedJobs />
      <JobesStats />
      <JobesLocations />
      <JobesTestimonials />
      <JobesTrustedCompanies />
      <JobesTopRecruiters />
      <JobesArticles />
    </div>
  )
}

