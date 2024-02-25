import { Select } from '@chakra-ui/react'

function LanguageSelector({ locale, setLocale, size = 'sm' }) {
  return (
    <Select size={size} value={locale} onChange={e => setLocale(e.target.value)}>
      <option value="en">Language: English</option>
      <option value="zh-TW">語言：中文</option>
      <option value="ja-JP">言語：日本語</option>
    </Select>
  )
}

export default LanguageSelector
