import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'

/**
 * Custom hook to dynamically update document title and metadata (SEO).
 * Supports multilingual routing through i18next.
 * 
 * @param {string} titleKey - The translation key for the page title.
 * @param {string} descriptionKey - The translation key for the page description.
 */
export default function useSEO(titleKey, descriptionKey) {
  const { t, i18n } = useTranslation()

  useEffect(() => {
    // 1. Set Document Title
    const baseTitle = "Tharsanan"
    const translatedTitle = titleKey ? t(titleKey) : ""
    
    if (!titleKey || titleKey === 'seo.home.title') {
      document.title = baseTitle
    } else {
      document.title = translatedTitle || baseTitle
    }

    // 2. Set Meta Description
    const translatedDesc = descriptionKey ? t(descriptionKey) : ""
    if (translatedDesc) {
      const metaDesc = document.querySelector('meta[name="description"]')
      if (metaDesc) {
        metaDesc.setAttribute('content', translatedDesc)
      }
      
      // Set OpenGraph Description
      const ogDesc = document.querySelector('meta[property="og:description"]')
      if (ogDesc) {
        ogDesc.setAttribute('content', translatedDesc)
      }
    }
    
    // 3. Set OpenGraph Title
    const ogTitle = document.querySelector('meta[property="og:title"]')
    if (ogTitle) {
      ogTitle.setAttribute('content', translatedTitle || baseTitle)
    }
  }, [titleKey, descriptionKey, t, i18n.language])
}
