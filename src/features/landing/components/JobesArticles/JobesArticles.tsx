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
    date: '05 January, 2023',
    author: 'Mr. Rakhab',
    title: 'To Be Continue Redesign & Build Up Your Career Opportunity.',
    href: '#',
  },
  {
    id: 2,
    image: '/images/articles/article-interview.png',
    date: '05 March, 2023',
    author: 'Mr. Rakhab',
    title: 'To Make Your Smartness & Speak To Smartly In Interviewing.',
    href: '#',
  },
  {
    id: 3,
    image: '/images/articles/article-skills.png',
    date: '07 January, 2023',
    author: 'Mr. Rakhab',
    title: 'How To Improve Your Skills & Speak Fluently Any Job Viva.',
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
            Our Recent <span className={styles['p-articles__header-accent']}>Article</span>
          </h2>
          <p className={styles['p-articles__header-subtitle']}>
            To much valuable feed from our trusted users in world-wide.
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
              <a href={article.href} className={styles['p-articles__card-link']} aria-label={article.title}>
                {/* ─── Image Wrapper ─── */}
                <div className={styles['p-articles__card-image-wrapper']}>
                  <img
                    src={article.image}
                    alt={article.title}
                    className={styles['p-articles__card-image']}
                    loading="lazy"
                  />
                  {/* ─── Date Badge ─── */}
                  <span className={styles['p-articles__card-date']}>
                    {article.date}
                  </span>
                </div>

                {/* ─── Card Content ─── */}
                <div className={styles['p-articles__card-content']}>
                  <div className={styles['p-articles__card-author']}>
                    <span className={styles['p-articles__card-author-dot']} aria-hidden="true" />
                    <span>{article.author}</span>
                  </div>
                  <h3 className={styles['p-articles__card-title']}>
                    {article.title}
                  </h3>
                </div>
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
