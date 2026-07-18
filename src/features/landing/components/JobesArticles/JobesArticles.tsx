import { Link } from 'react-router'
import { useFeaturedBlogPosts } from '@/features/blog/index.ts'
import { LoadingState } from '@/shared/components/ui/LoadingState.tsx'
import { formatDate } from '@/shared/utils/dateUtils.ts'
import { blogDetailPath } from '@/shared/constants/index.ts'
import styles from './JobesArticles.module.scss'

export function JobesArticles() {
  const { data: articles, isLoading } = useFeaturedBlogPosts(3)

  return (
    <section
      className={styles['p-articles']}
      id="recent-articles-section"
      aria-labelledby="articles-heading"
    >
      <div className={`${styles['p-articles__container']} l-container`}>
        {/* ─── Section Header ─── */}
        <div className={styles['p-articles__header']}>
          <h2 className={styles['p-articles__header-title']} id="articles-heading">
            Bài viết <span className={styles['p-articles__header-accent']}>mới nhất</span> của chúng tôi
          </h2>
          <p className={styles['p-articles__header-subtitle']}>
            Những chia sẻ giá trị từ người dùng tin cậy của chúng tôi trên toàn thế giới.
          </p>
        </div>

        {/* ─── Article Cards Grid ─── */}
        {isLoading ? (
          <div className={styles['p-articles__loading']}>
            <LoadingState />
          </div>
        ) : (
          <div className={styles['p-articles__grid']}>
            {articles?.slice(0, 3).map((article) => (
              <article
                key={article.id}
                className={styles['p-articles__card']}
                id={`article-card-${article.id}`}
              >
                {/* ─── Image Wrapper ─── */}
                {article.coverImage && (
                  <div className={styles['p-articles__card-image-wrapper']}>
                    <Link
                      to={blogDetailPath(article.id)}
                      className={styles['p-articles__card-image-link']}
                      aria-label={article.title}
                    >
                      <img
                        src={article.coverImage}
                        alt={article.title}
                        className={styles['p-articles__card-image']}
                        loading="lazy"
                      />
                    </Link>
                  </div>
                )}

                {/* ─── Date Badge ─── */}
                <Link to={blogDetailPath(article.id)} className={styles['p-articles__card-date']}>
                  {formatDate(article.postedAt)}
                </Link>

                {/* ─── Card Content ─── */}
                <div className={styles['p-articles__card-content']}>
                  <h3 className={styles['p-articles__card-title']}>
                    <Link to={blogDetailPath(article.id)}>{article.title}</Link>
                  </h3>
                </div>
              </article>
            ))}
            {articles?.length === 0 && <p>Chưa có bài viết nào.</p>}
          </div>
        )}
      </div>
    </section>
  )
}

