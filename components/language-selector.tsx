"use client"

import { useState, useRef, useEffect } from "react"
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"

interface LanguageSelectorProps {
  currentLanguage: string
  onLanguageChange: (language: string) => void
}

const languages = [
  { code: "en", name: "English (United Kingdom)" },
  { code: "en-US", name: "English (United States)" },
  { code: "bg", name: "Български" },
  { code: "cs", name: "Čeština" },
  { code: "da", name: "Dansk" },
  { code: "de", name: "Deutsch" },
  { code: "el", name: "Ελληνικά" },
  { code: "es", name: "Español" },
  { code: "et", name: "Eesti" },
  { code: "fi", name: "Suomi" },
  { code: "fr", name: "Français" },
  { code: "hr", name: "Hrvatski" },
  { code: "hu", name: "Magyar" },
  { code: "it", name: "Italiano" },
  { code: "ja", name: "日本語" },
  { code: "lt", name: "Lietuvių" },
  { code: "lv", name: "Latviešu" },
  { code: "nl", name: "Nederlands" },
  { code: "no", name: "Norsk" },
  { code: "pl", name: "Polski" },
  { code: "pt", name: "Português" },
  { code: "ro", name: "Română" },
  { code: "ru", name: "Русский" },
  { code: "sk", name: "Slovenčina" },
  { code: "sv", name: "Svenska" },
  { code: "uk", name: "Українська" },
]

export default function LanguageSelector({ currentLanguage, onLanguageChange }: LanguageSelectorProps) {
  const [showLanguageMenu, setShowLanguageMenu] = useState(false)
  const [languageSearch, setLanguageSearch] = useState("")
  const languageDropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (languageDropdownRef.current && !languageDropdownRef.current.contains(event.target as Node)) {
        setShowLanguageMenu(false)
        setLanguageSearch("")
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const filteredLanguages = languages.filter((l) => l.name.toLowerCase().includes(languageSearch.toLowerCase()))

  const currentLang = languages.find((l) => l.code === currentLanguage)

  return (
    <div className="relative" ref={languageDropdownRef}>
      <button
        onClick={() => setShowLanguageMenu(!showLanguageMenu)}
        className="flex items-center gap-2 hover:text-white transition-colors"
      >
        <span>{currentLang?.name || "English (United Kingdom)"}</span>
        <svg
          className={`w-4 h-4 transition-transform ${showLanguageMenu ? "rotate-180" : ""}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {showLanguageMenu && (
        <div className="absolute bottom-full left-0 mb-2 w-[90vw] sm:w-[320px] bg-[#2d3540] rounded-2xl shadow-2xl overflow-hidden border border-white/10">
          <div className="p-3 md:p-4 border-b border-white/10">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 md:w-5 md:h-5 text-white/50" />
              <Input
                type="text"
                placeholder="Search"
                value={languageSearch}
                onChange={(e) => setLanguageSearch(e.target.value)}
                className="h-11 md:h-12 pl-9 md:pl-10 bg-white/5 border-white/10 text-white placeholder:text-white/50 rounded-xl md:rounded-2xl text-sm md:text-base"
              />
            </div>
          </div>
          <div className="max-h-[280px] md:max-h-[320px] overflow-y-auto">
            {filteredLanguages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => {
                  onLanguageChange(lang.code)
                  setShowLanguageMenu(false)
                  setLanguageSearch("")
                }}
                className="w-full px-3 md:px-4 py-2.5 md:py-3 hover:bg-white/5 transition-colors text-left text-white/90 text-sm md:text-base"
              >
                {lang.name}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
