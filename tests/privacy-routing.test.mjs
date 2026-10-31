import test from 'node:test';
import assert from 'node:assert/strict';
import { resolvePrivacyLocation, privacyAssetPath, privacyPageUrl } from '../src/app/legal/privacy.ts';

test('public policy defaults follow reading language without requiring an operator choice', () => {
  for (const [lang, expected] of [['zh', 'mainland'], ['zh-CN', 'mainland'], ['zh-Hans', 'mainland'], ['zh-Hant', 'persein'], ['en', 'persein'], ['ja', 'persein'], ['ko', 'persein']]) {
    for (const query of ['', '?service=unknown']) {
      const selection = resolvePrivacyLocation(query, lang);
      assert.equal(selection.service, expected);
      assert.equal(selection.explicitService, false);
    }
  }
});
test('language changes never change an explicitly selected operator', () => {
  for (const service of ['mainland', 'persein']) {
    for (const lang of ['zh-Hans', 'zh-Hant', 'en', 'ja', 'ko']) {
      const parsed = resolvePrivacyLocation(privacyPageUrl(service, lang), 'fr');
      assert.equal(parsed.service, service);
      assert.equal(parsed.explicitService, true);
      assert.equal(parsed.language, lang);
      assert.equal(privacyAssetPath(service, lang, 'json'), `/legal/privacy/v1.0/${service}/${lang}.json`);
    }
  }
});
test('language-only links keep automatic policy display instead of pinning an operator', () => {
  for (const [lang, expected] of [['zh-Hans', 'mainland'], ['zh-Hant', 'persein'], ['en', 'persein']]) {
    const url = privacyPageUrl(null, lang);
    assert.equal(new URLSearchParams(url.split('?')[1]).has('service'), false);
    const parsed = resolvePrivacyLocation(url, 'fr');
    assert.equal(parsed.language, lang);
    assert.equal(parsed.service, expected);
    assert.equal(parsed.explicitService, false);
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
