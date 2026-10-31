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
  const explicitService = rawService === 'mainland' || rawService === 'persein';
  const requested = query.get('lang') || siteLanguage;
  const language = normalizePrivacyLanguage(requested);
  const resolvedLanguage = language ?? 'en';
  // Website document selection only: this does not assign an account operator or move data.
  // Explicit App/account links always take precedence over the reading-language default.
  const service: PrivacyService = explicitService ? rawService as PrivacyService : resolvedLanguage === 'zh-Hans' ? 'mainland' : 'persein';
  return { service, language: resolvedLanguage, usedFallback: language === null, explicitService };
}
export function privacyAssetPath(service: string, language: string, format: string): string | null {
  if (!['mainland', 'persein'].includes(service) || !privacyLanguages.includes(language as PrivacyLanguage) || !['html', 'json'].includes(format)) return null;
  return `/legal/privacy/v1.0/${service}/${language}.${format}`;
}
export function privacyPageUrl(service: string | null, language: string): string {
  const query = new URLSearchParams({lang: language});
  if (service === 'mainland' || service === 'persein') query.set('service', service);
  return `/privacy?${query}`;
}
