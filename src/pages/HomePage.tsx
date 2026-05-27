import { JobesHero, JobesCategories, JobesFeaturedJobs, JobesStats, JobesLocations, JobesTestimonials, JobesTrustedCompanies, JobesTopRecruiters, JobesArticles } from '@/features/landing/index.ts'

export function HomePage() {

  return (
    <div className="flex flex-col">
      <JobesHero />
      <div className="l-container-1320 py-16 space-y-20">
        <JobesCategories />
        <JobesFeaturedJobs />
        <JobesStats />
        <JobesLocations />
        <JobesTestimonials />
        <JobesTrustedCompanies />
        <JobesTopRecruiters />
        <JobesArticles />
      </div>
    </div>
  )
}

