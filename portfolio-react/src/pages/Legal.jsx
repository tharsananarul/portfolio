import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ShieldCheck, Scale, FileText, ArrowLeft, ArrowUpRight } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import PageHero from '../components/PageHero'
import useSEO from '../hooks/useSEO'
import Magnetic from '../components/Magnetic'

export default function Legal() {
  const { t } = useTranslation()
  const [activeTab, setActiveTab] = useState('legal') // 'legal' or 'privacy'
  useSEO('seo.legal.title', 'seo.legal.desc')

  return (
    <main className="relative pb-24 bg-transparent min-h-screen overflow-hidden">
      {/* Background blobs */}
      <div className="absolute top-[10%] right-[-10%] w-[50vw] h-[50vw] bg-[var(--color-creative-blue)]/5 rounded-full blur-[150px] pointer-events-none -z-10 animate-pulse" />
      <div className="absolute bottom-[20%] left-[-15%] w-[45vw] h-[45vw] bg-[var(--color-creative-blue)]/5 rounded-full blur-[150px] pointer-events-none -z-10 animate-pulse" />

      {/* Back Button */}
      <div className="max-w-7xl mx-auto px-4 pt-8 relative z-20">
        <Magnetic>
          <Link 
            to="/" 
            className="inline-flex items-center gap-2 text-xs md:text-sm font-bold text-white/50 hover:text-white transition-colors group uppercase tracking-widest px-5 py-2.5 rounded-full border border-white/5 bg-white/[0.01] hover:bg-white/[0.03]"
          >
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
            <span>{t("project_details.back")}</span>
          </Link>
        </Magnetic>
      </div>

      <PageHero
        tag={t("legal_page.tag")}
        title={
          <span className="flex flex-col">
            <span>{t("legal_page.title_start")}</span>
            <span className="text-[var(--color-creative-blue)] -mt-2 md:-mt-5" style={{ WebkitTextStroke: '1px white' }}>
              {t("legal_page.title_end")}
            </span>
          </span>
        }
        subtitle={t("legal_page.subtitle")}
        compact
        themeColor="blue"
      />

      <section className="max-w-4xl mx-auto px-4 relative z-10">
        {/* Tab switch buttons */}
        <div className="flex border-b border-white/10 mb-12 justify-center gap-4">
          {[
            { id: 'legal', label: t('legal_page.tabs.legal'), icon: <Scale size={16} /> },
            { id: 'privacy', label: t('legal_page.tabs.privacy'), icon: <ShieldCheck size={16} /> }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`pb-4 px-6 relative font-heading font-bold text-xs md:text-sm uppercase tracking-wider flex items-center gap-2 cursor-pointer transition-colors ${
                activeTab === tab.id ? 'text-white' : 'text-white/40 hover:text-white/70'
              }`}
            >
              {tab.icon}
              <span>{tab.label}</span>
              {activeTab === tab.id && (
                <motion.div 
                  layoutId="activeTabIndicator" 
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-[var(--color-creative-blue)]"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
            </button>
          ))}
        </div>

        {/* Tab Content Display */}
        <div className="glass-card glow-card p-8 md:p-12 relative overflow-hidden min-h-[400px]">
          <AnimatePresence mode="wait">
            {activeTab === 'legal' ? (
              <motion.div
                key="legal"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.4 }}
                className="space-y-10"
              >
                {/* 1. Edition du Site */}
                <div className="space-y-3">
                  <h3 className="text-lg md:text-xl font-heading font-black uppercase text-white flex items-center gap-2">
                    <span className="w-1.5 h-6 rounded-full bg-[var(--color-creative-blue)]" />
                    {t('legal_page.sections.editor_title')}
                  </h3>
                  <p className="text-white/70 text-xs md:text-sm leading-relaxed whitespace-pre-line font-medium">
                    {t('legal_page.sections.editor_desc')}
                  </p>
                </div>

                {/* 2. Propriété Intellectuelle */}
                <div className="space-y-3">
                  <h3 className="text-lg md:text-xl font-heading font-black uppercase text-white flex items-center gap-2">
                    <span className="w-1.5 h-6 rounded-full bg-[var(--color-creative-blue)]" />
                    {t('legal_page.sections.intellectual_title')}
                  </h3>
                  <p className="text-white/70 text-xs md:text-sm leading-relaxed whitespace-pre-line font-medium">
                    {t('legal_page.sections.intellectual_desc')}
                  </p>
                </div>

                {/* 3. Gestion des Cookies */}
                <div className="space-y-3">
                  <h3 className="text-lg md:text-xl font-heading font-black uppercase text-white flex items-center gap-2">
                    <span className="w-1.5 h-6 rounded-full bg-[var(--color-creative-blue)]" />
                    {t('legal_page.sections.cookies_title')}
                  </h3>
                  <p className="text-white/70 text-xs md:text-sm leading-relaxed whitespace-pre-line font-medium">
                    {t('legal_page.sections.cookies_desc')}
                  </p>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="privacy"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.4 }}
                className="space-y-10"
              >
                {/* 1. Collecte des Données */}
                <div className="space-y-3">
                  <h3 className="text-lg md:text-xl font-heading font-black uppercase text-white flex items-center gap-2">
                    <span className="w-1.5 h-6 rounded-full bg-[var(--color-creative-blue)]" />
                    {t('legal_page.sections.data_collect_title')}
                  </h3>
                  <p className="text-white/70 text-xs md:text-sm leading-relaxed whitespace-pre-line font-medium">
                    {t('legal_page.sections.data_collect_desc')}
                  </p>
                </div>

                {/* 2. Utilisation des Données */}
                <div className="space-y-3">
                  <h3 className="text-lg md:text-xl font-heading font-black uppercase text-white flex items-center gap-2">
                    <span className="w-1.5 h-6 rounded-full bg-[var(--color-creative-blue)]" />
                    {t('legal_page.sections.data_use_title')}
                  </h3>
                  <p className="text-white/70 text-xs md:text-sm leading-relaxed whitespace-pre-line font-medium">
                    {t('legal_page.sections.data_use_desc')}
                  </p>
                </div>

                {/* 3. Vos Droits (RGPD) */}
                <div className="space-y-3">
                  <h3 className="text-lg md:text-xl font-heading font-black uppercase text-white flex items-center gap-2">
                    <span className="w-1.5 h-6 rounded-full bg-[var(--color-creative-blue)]" />
                    {t('legal_page.sections.data_rights_title')}
                  </h3>
                  <p className="text-white/70 text-xs md:text-sm leading-relaxed whitespace-pre-line font-medium">
                    {t('legal_page.sections.data_rights_desc')}
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>
    </main>
  )
}
