import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router'
import { useBlogPost, useBlogPosts } from '@/features/blog/index.ts'
import { ErrorState } from '@/shared/components/ui/ErrorState.tsx'
import { PageLoadingOverlay } from '@/shared/components/ui/PageLoadingOverlay.tsx'
import { getErrorMessage } from '@/shared/lib/getErrorMessage.ts'
import { blogDetailPath } from '@/shared/constants/index.ts'
import { formatDate } from '@/shared/utils/dateUtils.ts'

import styles from './BlogDetailPage.module.scss'

export function BlogDetailPage() {
  const { id } = useParams<{ id: string }>()
  const { data: post, isLoading, isError, error, refetch } = useBlogPost(id)

  // Bài viết gần đây cho sidebar (loại trừ bài đang xem)
  const { data: recentData } = useBlogPosts({}, 1)
  const recentPosts = recentData?.items.filter((p) => p.id !== id).slice(0, 5) ?? []

  // Lightbox xem ảnh/video sự kiện phóng to
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)
  const gallery = post?.eventGallery ?? []

  useEffect(() => {
    if (lightboxIndex === null) return
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setLightboxIndex(null)
      } else if (e.key === 'ArrowLeft') {
        setLightboxIndex((prev) => (prev !== null ? (prev - 1 + gallery.length) % gallery.length : null))
      } else if (e.key === 'ArrowRight') {
        setLightboxIndex((prev) => (prev !== null ? (prev + 1) % gallery.length : null))
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [lightboxIndex, gallery.length])

  if (isLoading) {
    return <PageLoadingOverlay />
  }

  if (isError) {
    return (
      <ErrorState
        message={getErrorMessage(error, 'Không tải được bài viết.')}
        onRetry={() => refetch()}
      />
    )
  }

  if (!post) {
    return <ErrorState message="Không tìm thấy bài viết." />
  }

  return (
    <section>
      {/* ─── Breadcrumb Banner ─── */}
      <header className={styles['p-blog-detail-banner']}>
        <div className={styles['p-blog-detail-banner__ripple']} aria-hidden="true" />
        <div className={styles['p-blog-detail-banner__content']}>
          <h1 className={styles['p-blog-detail-banner__title']}>Chi tiết bài viết</h1>
          <nav className={styles['p-blog-detail-banner__breadcrumbs']} aria-label="Breadcrumb">
            <Link to="/">Trang chủ</Link>
            <span className={styles['p-blog-detail-banner__breadcrumbs-separator']} aria-hidden="true">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M9 18l6-6-6-6" />
              </svg>
            </span>
            <Link to="/blog">Blog</Link>
            <span className={styles['p-blog-detail-banner__breadcrumbs-separator']} aria-hidden="true">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M9 18l6-6-6-6" />
              </svg>
            </span>
            <span className={styles['p-blog-detail-banner__breadcrumbs-current']}>{post.title}</span>
          </nav>
        </div>
      </header>

      <div className={`${styles['p-blog-detail']} l-container`}>
        <div className={styles['p-blog-detail__grid']}>
          {/* ─── Main Column ─── */}
          <div className={styles['p-blog-detail-main']}>
            {post.coverImage && (
              <img src={post.coverImage} alt={post.title} className={styles['p-blog-detail-main__cover']} />
            )}

            <h2 className={styles['p-blog-detail-main__title']}>{post.title}</h2>

            <div className={styles['p-blog-detail-main__meta']}>
              <span>{formatDate(post.postedAt)}</span>
              {post.author && <span>Tác giả: {post.author}</span>}
            </div>

            <div
              className={styles['p-blog-detail-main__content']}
              dangerouslySetInnerHTML={{ __html: post.content }}
            />

            {gallery.length > 0 && (
              <div className={styles['p-blog-detail-gallery']}>
                <h2 className={styles['p-blog-detail-gallery__title']}>Hình ảnh sự kiện</h2>
                <div className={styles['p-blog-detail-gallery__grid']}>
                  {gallery.map((item, idx) => (
                    <figure
                      key={item.id}
                      className={styles['p-blog-detail-gallery__item']}
                      onClick={() => setLightboxIndex(idx)}
                    >
                      {item.isVideo ? (
                        <video src={item.url} muted playsInline preload="metadata" />
                      ) : (
                        <img src={item.url} alt={item.alt || post.title} loading="lazy" />
                      )}
                    </figure>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* ─── Sidebar: Recent Posts ─── */}
          <aside className={styles['p-blog-sidebar']}>
            <h3 className={styles['p-blog-sidebar__title']}>Bài viết gần đây</h3>
            <ul className={styles['p-blog-sidebar__list']}>
              {recentPosts.map((p) => (
                <li key={p.id} className={styles['p-blog-sidebar__item']}>
                  <Link to={blogDetailPath(p.id)} className={styles['p-blog-sidebar__link']}>
                    {p.title}
                  </Link>
                  <span className={styles['p-blog-sidebar__date']}>{formatDate(p.postedAt)}</span>
                </li>
              ))}
              {recentPosts.length === 0 && (
                <li className={styles['p-blog-sidebar__empty']}>Chưa có bài viết khác.</li>
              )}
            </ul>
          </aside>
        </div>
      </div>

      {/* ─── Lightbox Modal overlay ─── */}
      <div
        className={`${styles['p-blog-detail-lightbox']} ${lightboxIndex !== null ? styles['p-blog-detail-lightbox--active'] : ''}`}
        onClick={() => setLightboxIndex(null)}
      >
        {lightboxIndex !== null && gallery[lightboxIndex] && (
          <div className={styles['p-blog-detail-lightbox__content']} onClick={(e) => e.stopPropagation()}>
            <button className={styles['p-blog-detail-lightbox__close']} onClick={() => setLightboxIndex(null)}>
              &times;
            </button>
            {gallery.length > 1 && (
              <button
                className={`${styles['p-blog-detail-lightbox__btn']} ${styles['p-blog-detail-lightbox__btn--prev']}`}
                onClick={() => setLightboxIndex((prev) => (prev !== null ? (prev - 1 + gallery.length) % gallery.length : null))}
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                  <path d="M15 19l-7-7 7-7" />
                </svg>
              </button>
            )}
            {gallery[lightboxIndex].isVideo ? (
              <video
                src={gallery[lightboxIndex].url}
                className={styles['p-blog-detail-lightbox__img']}
                controls
                autoPlay
              />
            ) : (
              <img
                src={gallery[lightboxIndex].url}
                alt={gallery[lightboxIndex].alt || post.title}
                className={styles['p-blog-detail-lightbox__img']}
              />
            )}
            {gallery.length > 1 && (
              <button
                className={`${styles['p-blog-detail-lightbox__btn']} ${styles['p-blog-detail-lightbox__btn--next']}`}
                onClick={() => setLightboxIndex((prev) => (prev !== null ? (prev + 1) % gallery.length : null))}
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                  <path d="M9 5l7 7-7 7" />
                </svg>
              </button>
            )}
          </div>
        )}
      </div>
    </section>
  )
}
