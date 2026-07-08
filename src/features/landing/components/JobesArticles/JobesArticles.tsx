import styles from './JobesArticles.module.scss'

interface Article {
  id: number
  image: string
  date: string
  author: string
  title: string
  href: string
}

const ARTICLES: Article[] = [
  {
    id: 1,
    image: '/images/articles/article-career.png',
    date: '05 Tháng 1, 2023',
    author: 'Ông Rakhab',
    title: 'Tiếp tục tái thiết kế và xây dựng cơ hội nghề nghiệp của bạn.',
    href: '#',
  },
  {
    id: 2,
    image: '/images/articles/article-interview.png',
    date: '05 Tháng 3, 2023',
    author: 'Ông Rakhab',
    title: 'Thể hiện sự thông minh và trả lời khéo léo khi phỏng vấn.',
    href: '#',
  },
  {
    id: 3,
    image: '/images/articles/article-skills.png',
    date: '07 Tháng 1, 2023',
    author: 'Ông Rakhab',
    title: 'Cách cải thiện kỹ năng và giao tiếp trôi chảy trong mọi buổi phỏng vấn.',
    href: '#',
  },
]

export function JobesArticles() {
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
        <div className={styles['p-articles__grid']}>
          {ARTICLES.map((article) => (
            <article
              key={article.id}
              className={styles['p-articles__card']}
              id={`article-card-${article.id}`}
            >
              {/* ─── Image Wrapper ─── */}
              <div className={styles['p-articles__card-image-wrapper']}>
                <a href={article.href} className={styles['p-articles__card-image-link']} aria-label={article.title}>
                  <img
                    src={article.image}
                    alt={article.title}
                    className={styles['p-articles__card-image']}
                    loading="lazy"
                  />
                </a>
              </div>

              {/* ─── Date Badge ─── */}
              <a href="#" className={styles['p-articles__card-date']}>
                {article.date}
              </a>

              {/* ─── Card Content ─── */}
              <div className={styles['p-articles__card-content']}>
                <div className={styles['p-articles__card-author']}>
                  <span className={styles['p-articles__card-author-dot']} aria-hidden="true" />
                  <a href="#" className={styles['p-articles__card-author-link']}>
                    {article.author}
                  </a>
                </div>
                <h3 className={styles['p-articles__card-title']}>
                  <a href={article.href}>{article.title}</a>
                </h3>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

