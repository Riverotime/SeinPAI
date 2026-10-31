export const privacyLanguages = ['zh-Hans', 'zh-Hant', 'en', 'ja', 'ko'] as const;
export type PrivacyLanguage = typeof privacyLanguages[number];
export type PrivacyService = 'mainland' | 'persein';

export function normalizePrivacyLanguage(value: string): PrivacyLanguage | null {
  const code = value.toLowerCase();
  if (['zh', 'zh-cn', 'zh-hans'].includes(code)) return 'zh-Hans';
  if (['zh-hant', 'zh-tw', 'zh-hk'].includes(code)) return 'zh-Hant';
  if (['en', 'ja', 'ko'].includes(code)) return code as PrivacyLanguage;
  return null;
}
export function resolvePrivacyLocation(search: string, siteLanguage: string) {
  const query = new URLSearchParams(search.includes('?') ? search.slice(search.indexOf('?') + 1) : search);
  const rawService = query.get('service');
  const service: PrivacyService | null = rawService === 'mainland' || rawService === 'persein' ? rawService : null;
  const requested = query.get('lang') || siteLanguage;
  const language = normalizePrivacyLanguage(requested);
  return { service, language: language ?? 'en', usedFallback: language === null };
}
export function privacyAssetPath(service: string, language: string, format: string): string | null {
  if (!['mainland', 'persein'].includes(service) || !privacyLanguages.includes(language as PrivacyLanguage) || !['html', 'json'].includes(format)) return null;
  return `/legal/privacy/v1.0/${service}/${language}.${format}`;
}
export function privacyPageUrl(service: string, language: string): string {
  const query = new URLSearchParams({service, lang: language});
  return `/privacy?${query}`;
}
