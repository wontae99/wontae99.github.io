const { motion } = require('framer-motion')

import Link from './Link'
import { useTheme } from 'next-themes'
import siteMetadata from '@/data/siteMetadata'
import SocialIcon from '@/components/social-icons'

export default function Footer() {
  const { theme } = useTheme()
  return (
    <footer>
      <div className="mt-16 mb-8 flex flex-col items-center">
        <div className="mb-3 flex space-x-4">
          <SocialIcon kind="mail" href={`mailto:${siteMetadata.email}`} size="6" />
          <SocialIcon kind="github" href={siteMetadata.github} size="6" />
          <SocialIcon kind="facebook" href={siteMetadata.facebook} size="6" />
          <SocialIcon kind="twitter" href={siteMetadata.twitter} size="6" />
          <SocialIcon kind="instagram" href={siteMetadata.instagram} size="6" />
        </div>
        <div className="mb-2 flex space-x-2 text-sm text-gray-500 dark:text-gray-400">
          <div>{`© ${new Date().getFullYear()}`}</div>
          <motion.a
            href="/"
            initial={{ color: 'rgb(21 94 117)' }}
            whileHover={{ color: 'rgb(59 130 246)' }}
          >
            {siteMetadata.title}
          </motion.a>
          <div>
            Powered by{' '}
            <motion.a
              href="https://nextjs.org/"
              initial={{ color: 'rgb(21 94 117)' }}
              whileHover={{ color: 'rgb(59 130 246)' }}
            >
              Next.js
            </motion.a>
            ,{' '}
            <motion.a
              href="https://vercel.com/"
              initial={{ color: 'rgb(21 94 117)' }}
              whileHover={{ color: 'rgb(59 130 246)' }}
            >
              Vercel
            </motion.a>
          </div>
        </div>
      </div>
    </footer>
  )
}
