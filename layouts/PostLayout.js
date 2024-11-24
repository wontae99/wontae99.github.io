import { useState, useEffect } from 'react'

const { motion } = require('framer-motion')
import { fadeInHalf, staggerHalf } from 'constants/animation'

import Link from '@/components/Link'
import PageTitle from '@/components/PageTitle'
import SectionContainer from '@/components/SectionContainer'
import { BlogSEO } from '@/components/SEO'
import siteMetadata from '@/data/siteMetadata'
import Comments from '@/components/comments'
import ScrollTopAndComment from '@/components/ScrollTopAndComment'
import ReadingProgressBar from '@/components/ReadingProgressBar'

const editUrl = (fileName) => `${siteMetadata.siteRepo}/blob/master/data/blog/${fileName}`
const discussUrl = (slug) =>
  `https://mobile.twitter.com/search?q=${encodeURIComponent(
    `${siteMetadata.siteUrl}/blog/${slug}`
  )}`

const postDateTemplate = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }

export default function PostLayout({ frontMatter, authorDetails, next, prev, children }) {
  const { slug, fileName, date, title, images, tags } = frontMatter
  const [sidebarTop, setSidebarTop] = useState(undefined)

  useEffect(() => {
    const chatEl = document.querySelector('.sidebar').getBoundingClientRect()
    setSidebarTop(chatEl.top)
  }, [])

  useEffect(() => {
    if (!sidebarTop) return

    window.addEventListener('scroll', isSticky)
    return () => {
      window.removeEventListener('scroll', isSticky)
    }
  }, [sidebarTop])

  const isSticky = (e) => {
    const chatEl = document.querySelector('.sidebar')
    const scrollTop = window.scrollY
    if (scrollTop >= sidebarTop - 10) {
      chatEl.classList.add('is-sticky')
    } else {
      chatEl.classList.remove('is-sticky')
    }
  }

  return (
    <SectionContainer>
      <BlogSEO
        url={`${siteMetadata.siteUrl}/blog/${slug}`}
        authorDetails={authorDetails}
        {...frontMatter}
      />
      <ScrollTopAndComment />
      <ReadingProgressBar />
      <motion.section variants={staggerHalf} initial="initial" animate="animate" exit="exit">
        <article>
          <div className="xl:divide-y xl:divide-gray-200 xl:dark:divide-gray-700">
            <motion.div variants={fadeInHalf}>
              <header className="pt-6 xl:pb-6">
                <div className="space-y-1 text-center">
                  <dl className="space-y-10">
                    <div>
                      <dt className="sr-only">Published on</dt>
                      <dd className="text-base font-medium leading-6 text-gray-500 dark:text-gray-400">
                        <time dateTime={date}>
                          {new Date(date).toLocaleDateString(siteMetadata.locale, postDateTemplate)}
                        </time>
                      </dd>
                    </div>
                  </dl>
                  <div>
                    <PageTitle>{title}</PageTitle>
                  </div>
                </div>
              </header>
            </motion.div>

            <div
              className="divide-y divide-gray-200 pb-8 dark:divide-gray-700 xl:grid xl:grid-cols-4 xl:gap-x-6 xl:divide-y-0"
              style={{ gridTemplateRows: 'auto 1fr' }}
            >
              <motion.div
                variants={fadeInHalf}
                className="divide-y divide-gray-200 dark:divide-gray-700 xl:col-span-3 xl:row-span-2 xl:pb-0"
              >
                <div>
                  <div className="prose max-w-none pt-10 pb-8 dark:prose-dark">{children}</div>
                  <Comments frontMatter={frontMatter} />
                </div>
              </motion.div>

              <motion.div variants={fadeInHalf}>
                <footer>
                  <div className="sidebar divide-gray-200 text-sm font-medium leading-5 dark:divide-gray-800 xl:fixed xl:bottom-32 xl:right-10 xl:col-start-1 xl:row-start-2 xl:max-w-xs xl:divide-y xl:rounded-lg xl:p-4 xl:dark:bg-neutral-800">
                    {(next || prev) && (
                      <div className="flex justify-between py-4 xl:block xl:space-y-8">
                        {prev && (
                          <div>
                            <h2 className="text-sm uppercase tracking-wide text-gray-500 dark:text-gray-400">
                              이전 글
                            </h2>
                            <div className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400">
                              <Link href={`/blog/${prev.slug}`}>{prev.title}</Link>
                            </div>
                          </div>
                        )}
                        {next && (
                          <div>
                            <h2 className="text-sm uppercase tracking-wide text-gray-500 dark:text-gray-400">
                              다음 글
                            </h2>
                            <div className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400">
                              <Link href={`/blog/${next.slug}`}>{next.title}</Link>
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                    <div className="pt-4 xl:pt-8">
                      <Link
                        href="/blog"
                        className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
                      >
                        &larr; Back to the blog
                      </Link>
                    </div>
                  </div>
                </footer>
              </motion.div>
            </div>
          </div>
        </article>
      </motion.section>
    </SectionContainer>
  )
}
