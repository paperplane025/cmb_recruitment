import { Link } from 'react-router'
import { blogDetailPath } from '@/shared/constants/index.ts'
import { formatDate } from '@/shared/utils/dateUtils.ts'
import type { BlogPost } from '../types.ts'
import styles from './BlogCard.module.scss'

type BlogCardProps = {
  post: BlogPost
}

export function BlogCard({ post }: BlogCardProps) {
  return (
    <article className={styles['c-blog-card']}>
      {post.coverImage && (
        <Link to={blogDetailPath(post.id)} className={styles['c-blog-card__image-link']}>
          <img src={post.coverImage} alt={post.title} className={styles['c-blog-card__image']} />
        </Link>
      )}

      <div className={styles['c-blog-card__body']}>
        <span className={styles['c-blog-card__date']}>{formatDate(post.postedAt)}</span>
        <h2 className={styles['c-blog-card__title']}>
          <Link to={blogDetailPath(post.id)}>{post.title}</Link>
        </h2>
        <p className={styles['c-blog-card__excerpt']}>{post.excerpt}</p>

        <div className={styles['c-blog-card__footer']}>
          <Link to={blogDetailPath(post.id)} className={styles['c-blog-card__link']}>
            Đọc tiếp →
          </Link>
        </div>
      </div>
    </article>
  )
}
