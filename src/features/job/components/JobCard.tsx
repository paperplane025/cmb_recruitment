import { Link } from 'react-router'
import { jobDetailPath } from '@/shared/constants/index.ts'
import { formatDate } from '@/shared/utils/dateUtils.ts'
import { getEmploymentTypeLabel, getCategoryLabel, formatSalary } from '../utils.ts'
import type { Job } from '../types.ts'

type JobCardProps = {
  job: Job
}

export function JobCard({ job }: JobCardProps) {
  return (
    <article className="group rounded-lg border border-[var(--border)] p-5 text-left transition-shadow hover:shadow-[var(--shadow)]">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <h2 className="text-lg text-[var(--text-h)]">{job.title}</h2>
          <p className="mt-1 text-sm text-[var(--text)]">
            {job.company} · {job.location}
          </p>
        </div>
        {job.isFeatured && (
          <span className="shrink-0 rounded-full bg-[var(--accent-bg)] px-2.5 py-0.5 text-xs font-medium text-[var(--accent)]">
            Nổi bật
          </span>
        )}
      </div>

      <p className="mt-3 line-clamp-2 text-sm">{job.description}</p>

      <div className="mt-4 flex flex-wrap gap-2">
        <span className="rounded-md bg-[var(--code-bg)] px-2 py-0.5 text-xs text-[var(--text-h)]">
          {getCategoryLabel(job.category)}
        </span>
        <span className="rounded-md bg-[var(--code-bg)] px-2 py-0.5 text-xs text-[var(--text-h)]">
          {getEmploymentTypeLabel(job.employmentType)}
        </span>
        <span className="rounded-md bg-[var(--code-bg)] px-2 py-0.5 text-xs text-[var(--text-h)]">
          {formatSalary(job.salary.min, job.salary.max, job.salary.currency)}
        </span>
      </div>

      <div className="mt-4 flex items-center justify-between">
        <span className="text-xs text-[var(--text)]">
          {formatDate(job.postedAt)}
        </span>
        <Link
          to={jobDetailPath(job.id)}
          className="text-sm font-medium text-[var(--accent)] transition-opacity group-hover:opacity-80"
        >
          Xem chi tiết →
        </Link>
      </div>
    </article>
  )
}
