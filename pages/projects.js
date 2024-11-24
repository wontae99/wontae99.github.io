const { motion } = require('framer-motion')
import { fadeIn, fadeInUp, staggerHalf } from 'constants/animation'

import siteMetadata from '@/data/siteMetadata'
import projectsData from '@/data/projectsData'
import Card from '@/components/Card'
import { PageSEO } from '@/components/SEO'

export default function Projects() {
  return (
    <>
      <PageSEO title={`Projects - ${siteMetadata.author}`} description={siteMetadata.description} />
      <motion.section variants={staggerHalf} initial="initial" animate="animate">
        <div className="divide-y divide-gray-200 dark:divide-gray-700">
          <motion.div variants={fadeIn}>
            <div className="space-y-2 pt-6 pb-8 md:space-y-5">
              <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
                Projects
              </h1>
              <p className="text-lg leading-7 text-gray-500 dark:text-gray-400">
                지금까지 발자취들👏
              </p>
            </div>
          </motion.div>
          <motion.div variants={fadeInUp} >
            <div className="container py-12 mx-auto">
              <div className="-m-4 flex flex-wrap justify-center lg:justify-start">
                {projectsData.map((d) => (
                  <Card
                    key={d.title}
                    title={d.title}
                    description={d.description}
                    imgSrc={d.imgSrc}
                    href={d.href}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </motion.section>
    </>
  )
}
