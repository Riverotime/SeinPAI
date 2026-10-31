import test from 'node:test';
import assert from 'node:assert/strict';
import { resolvePrivacyLocation, privacyAssetPath, privacyPageUrl } from '../src/app/legal/privacy.ts';

test('an unspecified or invalid service requires selection, regardless of language', () => {
  for (const lang of ['zh', 'en', 'ja']) {
    assert.equal(resolvePrivacyLocation('', lang).service, null);
    assert.equal(resolvePrivacyLocation('?service=unknown', lang).service, null);
  }
});
test('language changes never change an explicitly selected operator', () => {
  for (const service of ['mainland', 'persein']) {
    for (const lang of ['zh-Hans', 'zh-Hant', 'en', 'ja', 'ko']) {
      const parsed = resolvePrivacyLocation(privacyPageUrl(service, lang), 'fr');
      assert.equal(parsed.service, service);
      assert.equal(parsed.language, lang);
      assert.equal(privacyAssetPath(service, lang, 'json'), `/legal/privacy/v1.0/${service}/${lang}.json`);
    }
  }
});
test('legacy App language codes resolve without losing the explicit service', () => {
  for (const code of ['zh', 'zh-cn', 'zh-Hans']) assert.equal(resolvePrivacyLocation(`?service=mainland&lang=${code}`, 'en').language, 'zh-Hans');
  assert.equal(resolvePrivacyLocation('?service=persein&lang=zh-hant', 'en').language, 'zh-Hant');
});
test('unsupported languages fall back visibly and cannot inject an asset path', () => {
  const parsed = resolvePrivacyLocation('?service=persein&lang=fr', 'ja');
  assert.equal(parsed.language, 'en');
  assert.equal(parsed.usedFallback, true);
  assert.equal(privacyAssetPath('unknown', '../../secret', 'html'), null);
});
