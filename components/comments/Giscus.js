import { useRouter } from 'next/router'
import { useTheme } from 'next-themes'
import { useEffect, useRef, useState } from 'react'

import siteMetadata from '@/data/siteMetadata'

export default function Giscus() {
  const ref = useRef(null)

  const { theme, resolvedTheme } = useTheme()
  const commentsTheme =
    siteMetadata.comment.giscusConfig.themeURL === ''
      ? theme === 'dark' || resolvedTheme === 'dark'
        ? siteMetadata.comment.giscusConfig.darkTheme
        : siteMetadata.comment.giscusConfig.theme
      : siteMetadata.comment.giscusConfig.themeURL

  const [mounted, setMounted] = useState(false)
  const router = useRouter()

  // https://github.com/giscus/giscus/tree/main/styles/themes

  const {
    repo,
    repositoryId,
    category,
    categoryId,
    mapping,
    reactions,
    metadata,
    inputPosition,
    lang,
  } = siteMetadata?.comment?.giscusConfig

  useEffect(() => {
    if (!ref.current || ref.current.hasChildNodes()) return

    const scriptElem = document.createElement('script')
    scriptElem.src = 'https://giscus.app/client.js'
    scriptElem.async = true
    scriptElem.crossOrigin = 'anonymous'

    scriptElem.setAttribute('data-repo', 'wontae99/wontae99-blog')
    scriptElem.setAttribute('data-repo-id', 'R_kgDOJ3i8_A')
    scriptElem.setAttribute('data-category', 'General')
    scriptElem.setAttribute('data-category-id', 'DIC_kwDOJ3i8_M4CXsr7')
    scriptElem.setAttribute('data-mapping', 'pathname')
    scriptElem.setAttribute('data-strict', '0')
    scriptElem.setAttribute('data-reactions-enabled', '1')
    scriptElem.setAttribute('data-emit-metadata', '1')
    scriptElem.setAttribute('data-input-position', 'top')
    scriptElem.setAttribute('data-loading', 'lazy')
    scriptElem.setAttribute('data-theme', commentsTheme)
    scriptElem.setAttribute('data-lang', lang)

    ref.current.appendChild(scriptElem)
    setMounted(true)
  }, [])

  // https://github.com/giscus/giscus/blob/main/ADVANCED-USAGE.md#isetconfigmessage
  useEffect(() => {
    if (!mounted) return

    const iframe = document.querySelector('iframe.giscus-frame')
    iframe?.contentWindow?.postMessage({ giscus: { setConfig: { theme } } }, 'https://giscus.app')
  }, [theme, mounted])

  useEffect(() => {
    const iframe = document.querySelector('iframe.giscus-frame')
    iframe?.contentWindow?.postMessage(
      { giscus: { setConfig: { term: router.asPath } } },
      'https://giscus.app'
    )
  }, [router.asPath])

  return <section ref={ref} className="container my-5" />
}
