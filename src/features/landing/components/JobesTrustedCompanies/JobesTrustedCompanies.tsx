import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay } from 'swiper/modules'
import styles from './JobesTrustedCompanies.module.scss'

// Import Swiper styles
import 'swiper/css'

// ─── Inline High-Fidelity SVG Brand Logos ───

const JoomlaLogo = () => (
  <svg width="140" height="40" viewBox="0 0 140 40" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="Joomla">
    {/* Joomla Colorful Icon */}
    <g transform="translate(0, 4)">
      {/* Top ring - Yellow */}
      <path d="M16 8C18.2091 8 20 6.20914 20 4C20 1.79086 18.2091 0 16 0C13.7909 0 12 1.79086 12 4C12 6.20914 13.7909 8 16 8Z" fill="#F4B400" />
      {/* Right ring - Green */}
      <path d="M28 16C28 18.2091 26.2091 20 24 20C21.7909 20 20 18.2091 20 16C20 13.7909 21.7909 12 24 12C26.2091 12 28 13.7909 28 16Z" fill="#0F9D58" />
      {/* Bottom ring - Blue */}
      <path d="M16 32C18.2091 32 20 30.2091 20 28C20 25.7909 18.2091 24 16 24C13.7909 24 12 25.7909 12 28C12 30.2091 13.7909 32 16 32Z" fill="#4285F4" />
      {/* Left ring - Red */}
      <path d="M4 16C4 18.2091 2.20914 20 0 20C-2.20914 20 -4 18.2091 -4 16C-4 13.7909 -2.20914 12 0 12C2.20914 12 4 13.7909 4 16Z" fill="#DB4437" transform="translate(4, 0)" />
      
      {/* Intersecting center links */}
      <path d="M10 16C10 12.6863 12.6863 10 16 10C19.3137 10 22 12.6863 22 16C22 19.3137 19.3137 22 16 22C12.6863 22 10 19.3137 10 16Z" stroke="#E5E4E7" strokeWidth="2" />
    </g>
    {/* Joomla! Text */}
    <text x="42" y="26" fill="#08060D" fontSize="21" fontWeight="800" fontFamily="var(--sans)" letter-spacing="-0.5px">Joomla!</text>
  </svg>
)

const DiscordJSLogo = () => (
  <svg width="150" height="40" viewBox="0 0 150 40" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="DiscordJS">
    {/* Discord Clyde Icon */}
    <g transform="translate(0, 6) scale(0.9)">
      <path fill="#5865F2" d="M26.4 1.7C26.4 1.7 23.5 0 19.5 0l-0.5 0.6c4.6 1.4 6.7 3.4 6.7 3.4C23 2.5 20.3 1.6 17.5 1.3C14.7 0.9 11.9 1 9.3 1.5C7.5 1.8 5.7 2.3 4 3.1C3.4 3.4 3 3.6 3 3.6s2.1-2.1 6.7-3.4L9.2 0C5.2 0 2.3 1.7 2.3 1.7S0 6.6 0 12.6C0 12.6 1.4 15 4.9 15.1l1-1.2C3.8 13.3 2.8 12.3 2.8 12.3s0.2 0.1 0.5 0.2c3.7 2.1 7.7 2.6 11 2.2C16.7 14.4 19.1 13.7 21.4 12.5C21.7 12.3 21.9 12.2 21.9 12.2s-1 1-3.1 1.6l1 1.2c3.6-0.2 5-2.5 5-2.5C28.7 6.6 26.4 1.7 26.4 1.7z M9.5 10.6c-1.1 0-2.1-1-2.1-2.2C7.4 7.2 8.3 6.2 9.5 6.2c1.2 0 2.1 1 2.1 2.2C11.6 9.6 10.7 10.6 9.5 10.6z M19.6 10.6c-1.1 0-2.1-1-2.1-2.2c0-1.2 0.9-2.2 2.1-2.2s2.1 1 2.1 2.2C21.7 9.6 20.8 10.6 19.6 10.6z"/>
    </g>
    {/* Discord.JS Gradient Text */}
    <defs>
      <linearGradient id="discordjs-grad" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#5865F2" />
        <stop offset="50%" stopColor="#9B5DE5" />
        <stop offset="100%" stopColor="#F15BB5" />
      </linearGradient>
    </defs>
    <text x="32" y="25" fill="url(#discordjs-grad)" fontSize="20" fontWeight="900" fontFamily="var(--sans)" letter-spacing="0.5px">DISCORD.JS</text>
  </svg>
)

const LibraryOfCongressLogo = () => (
  <svg width="160" height="40" viewBox="0 0 160 40" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="Library of Congress">
    <g transform="translate(0, 4)">
      {/* Book pages / Dome shape */}
      <path d="M0 4H10V28H0V4Z" fill="#0A3161" />
      <path d="M12 4C12 4 16 0 22 0C28 0 32 4 32 4V28C32 28 28 24 22 24C16 24 12 28 12 28V4Z" fill="#CC3A32" />
      <path d="M15 8H29" stroke="white" strokeWidth="2.5" />
      <path d="M15 13H29" stroke="white" strokeWidth="2.5" />
      <path d="M15 18H29" stroke="white" strokeWidth="2.5" />
    </g>
    {/* Text */}
    <text x="38" y="18" fill="#08060D" fontSize="10.5" fontWeight="800" fontFamily="var(--heading)" letter-spacing="0.2px">LIBRARY OF</text>
    <text x="38" y="29" fill="#08060D" fontSize="10.5" fontWeight="800" fontFamily="var(--heading)" letter-spacing="0.2px">CONGRESS</text>
  </svg>
)

const CockroachLabsLogo = () => (
  <svg width="155" height="40" viewBox="0 0 155 40" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="Cockroach Labs">
    {/* Cockroach Icon */}
    <g transform="translate(0, 6)">
      {/* Green Shield */}
      <rect x="2" y="2" width="22" height="24" rx="11" fill="#13B55B" />
      {/* Antennae */}
      <path d="M8 8C8 8 10 2 13 2" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M18 8C18 8 16 2 13 2" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
      {/* Bug body details */}
      <circle cx="13" cy="11" r="3.5" fill="white" />
      <rect x="11.5" y="14" width="3" height="8" rx="1.5" fill="white" />
      <line x1="8" y1="14" x2="18" y2="14" stroke="white" strokeWidth="1.5" />
      <line x1="8" y1="18" x2="18" y2="18" stroke="white" strokeWidth="1.5" />
    </g>
    {/* Text */}
    <text x="32" y="25" fill="#08060D" fontSize="16.5" fontWeight="700" fontFamily="var(--sans)" letter-spacing="-0.3px">
      Cockroach <tspan fill="#13B55B" fontWeight="800">LABS</tspan>
    </text>
  </svg>
)

const ZephyrLogo = () => (
  <svg width="130" height="40" viewBox="0 0 130 40" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="Zephyr">
    {/* Zephyr Leaf Icon */}
    <g transform="translate(0, 8)">
      {/* Leaf curves */}
      <path d="M0 12C4 4 12 0 20 4C14 6 10 12 8 18C8 18 2 16 0 12Z" fill="#00A7AC" />
      <path d="M12 6C15 3 22 2 24 8C20 8 17 10 16 13C16 13 13 10 12 6Z" fill="#7FD1B9" />
    </g>
    {/* Text */}
    <text x="30" y="26" fill="#08060D" fontSize="19" fontWeight="800" fontFamily="var(--heading)" letter-spacing="2px">Z<tspan fill="#00A7AC">E</tspan>PHYR</text>
  </svg>
)

const HoneybadgerLogo = () => (
  <svg width="150" height="40" viewBox="0 0 150 40" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="Honeybadger">
    {/* Honeybadger Red/Orange Shield with lightning */}
    <g transform="translate(0, 6)">
      <polygon points="12,0 24,6 20,22 12,28 4,22 0,6" fill="#F25F5C" />
      {/* Lightning bolt */}
      <path d="M13 5L8 14H15L11 23L18 11H11L13 5Z" fill="white" />
    </g>
    {/* Text */}
    <text x="32" y="25" fill="#F25F5C" fontSize="18" fontWeight="800" fontFamily="var(--sans)" fontStyle="italic" letter-spacing="-0.3px">
      Honey<tspan fill="#08060D">badger</tspan>
    </text>
  </svg>
)

export function JobesTrustedCompanies() {
  const brandSlides = [
    <JoomlaLogo key="joomla" />,
    <DiscordJSLogo key="discord" />,
    <LibraryOfCongressLogo key="library" />,
    <CockroachLabsLogo key="cockroach" />,
    <ZephyrLogo key="zephyr" />,
    <HoneybadgerLogo key="honeybadger" />
  ]

  return (
    <section className={styles['p-companies']} id="trusted-companies-section" aria-labelledby="companies-heading">
      <div className={`${styles['p-companies__container']} l-container`}>
        {/* Left Side Label */}
        <div className={styles['p-companies__label-wrapper']}>
          <h2 className={styles['p-companies__label']} id="companies-heading">
            Our Trusted Company
          </h2>
          <div className={styles['p-companies__label-line']} aria-hidden="true" />
        </div>

        {/* Right Side Slider */}
        <div className={styles['p-companies__slider-wrapper']}>
          <Swiper
            modules={[Autoplay]}
            loop={true}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
              pauseOnMouseEnter: true
            }}
            spaceBetween={40}
            slidesPerView={2}
            breakpoints={{
              480: {
                slidesPerView: 3,
                spaceBetween: 30
              },
              768: {
                slidesPerView: 4,
                spaceBetween: 40
              },
              1024: {
                slidesPerView: 6,
                spaceBetween: 40
              }
            }}
            className={styles['p-companies__slider']}
          >
            {[...brandSlides, ...brandSlides].map((slide, idx) => (
              <SwiperSlide key={idx} className={styles['p-companies__slide']}>
                <div className={styles['p-companies__logo-container']}>
                  {slide}
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  )
}
