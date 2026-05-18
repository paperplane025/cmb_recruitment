import { useParams } from 'react-router'
import { useJob, useJobs, JobCard } from '@/features/job/index.ts'
import {
  getEmploymentTypeLabel,
  getCategoryLabel,
  formatSalary,
} from '@/features/job/utils.ts'
import { ErrorState } from '@/shared/components/ui/ErrorState.tsx'
import { LoadingState } from '@/shared/components/ui/LoadingState.tsx'
import { formatDate } from '@/shared/utils/dateUtils.ts'
import { getErrorMessage } from '@/shared/lib/getErrorMessage.ts'

export function JobDetailPage() {
  const { id } = useParams<{ id: string }>()
  const { data: job, isLoading, isError, error, refetch } = useJob(id)

  // Fetch related jobs by same category (exclude current job)
  const { data: relatedData } = useJobs(
    job ? { category: job.category } : {},
    1,
  )

  const relatedJobs =
    relatedData?.items.filter((j) => j.id !== id).slice(0, 3) ?? []

  if (isLoading) {
    return <LoadingState />
  }

  if (isError) {
    return (
      <ErrorState
        message={getErrorMessage(
          error,
          'Không tải được chi tiết tin tuyển dụng.',
        )}
        onRetry={() => refetch()}
      />
    )
  }

  if (!job) {
    return <ErrorState message="Không tìm thấy tin tuyển dụng." />
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_300px]">
      {/* Main content */}
      <article className="text-left">
        <h1>{job.title}</h1>
        <p className="text-sm text-[var(--text)]">
          {job.company} · {job.location} · {formatDate(job.postedAt)}
        </p>

        {/* Tags */}
        <div className="mt-4 flex flex-wrap gap-2">
          <span className="rounded-md bg-[var(--code-bg)] px-2.5 py-1 text-xs font-medium text-[var(--text-h)]">
            {getCategoryLabel(job.category)}
          </span>
          <span className="rounded-md bg-[var(--code-bg)] px-2.5 py-1 text-xs font-medium text-[var(--text-h)]">
            {getEmploymentTypeLabel(job.employmentType)}
          </span>
          <span className="rounded-md bg-[var(--accent-bg)] px-2.5 py-1 text-xs font-medium text-[var(--accent)]">
            {formatSalary(job.salary.min, job.salary.max, job.salary.currency)}
          </span>
          {job.isFeatured && (
            <span className="rounded-md bg-[var(--accent-bg)] px-2.5 py-1 text-xs font-medium text-[var(--accent)]">
              ⭐ Nổi bật
            </span>
          )}
        </div>

        {/* Description */}
        <section className="mt-8">
          <h2 className="text-lg">Mô tả công việc</h2>
          <p className="mt-3 whitespace-pre-wrap">{job.description}</p>
        </section>

        {/* Requirements */}
        {job.requirements.length > 0 && (
          <section className="mt-8">
            <h2 className="text-lg">Yêu cầu</h2>
            <ul className="mt-3 list-inside list-disc space-y-1 text-sm">
              {job.requirements.map((req) => (
                <li key={req}>{req}</li>
              ))}
            </ul>
          </section>
        )}

        {/* Benefits */}
        {job.benefits.length > 0 && (
          <section className="mt-8">
            <h2 className="text-lg">Quyền lợi</h2>
            <ul className="mt-3 list-inside list-disc space-y-1 text-sm">
              {job.benefits.map((benefit) => (
                <li key={benefit}>{benefit}</li>
              ))}
            </ul>
          </section>
        )}
      </article>

      {/* Sidebar — Related Jobs */}
      <aside className="text-left">
        <h2 className="text-lg">Việc làm liên quan</h2>
        {relatedJobs.length > 0 ? (
          <div className="mt-4 grid gap-3">
            {relatedJobs.map((relJob) => (
              <JobCard key={relJob.id} job={relJob} />
            ))}
          </div>
        ) : (
          <p className="mt-4 text-sm text-[var(--text)]">
            Chưa có việc làm liên quan.
          </p>
        )}
      </aside>
    </div>
  )
}
