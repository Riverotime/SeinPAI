"""Browser regression for the help-center history/locale race.

Requires Python Playwright and installed Chrome. Run Vite separately, then:
  python3 scripts/verify-help-center.py --base-url http://127.0.0.1:4181
The same checks can run against the public production URL.
"""
import argparse
from playwright.sync_api import sync_playwright

parser = argparse.ArgumentParser()
parser.add_argument('--base-url', default='http://127.0.0.1:4181')
args = parser.parse_args()
base = args.base_url.rstrip('/')
with sync_playwright() as playwright:
    browser = playwright.chromium.launch(channel='chrome', headless=True)
    page = browser.new_page(viewport={'width': 390, 'height': 844})
    errors = []
    page.on('pageerror', lambda error: errors.append(str(error)))

    def language_is(language):
        page.wait_for_function('''language =>
          document.querySelector('main')?.lang === language &&
          document.getElementById('help-language')?.value === language''', arg=language)

    for initial in ['zh-Hans', 'zh-Hant', 'en']:
        page.goto(f'{base}/help?lang={initial}#firmware-update', wait_until='domcontentloaded')
        language_is(initial)
        assert page.locator('.help-answer').count() == 23
        assert page.locator('#firmware-update').get_attribute('open') is not None
        # Intentionally do not wait for the site-locale effect after selecting English.
        # The old locale-dependent listener could cancel the pending popstate timer.
        for attempt in range(3):
            for language in ['zh-Hant', 'en']:
                page.locator('#help-language').select_option(language)
            page.go_back(wait_until='domcontentloaded')
            language_is('zh-Hant')
            assert 'lang=zh-Hant' in page.url
            page.go_forward(wait_until='domcontentloaded')
            language_is('en')
        assert page.locator('#planned').count() == 0
        assert not page.evaluate('document.documentElement.scrollWidth > innerWidth')

    page.goto(f'{base}/help?lang=ja', wait_until='domcontentloaded')
    language_is('en')
    assert page.locator('.help-language-note').is_visible()
    page.goto(f'{base}/help?lang=zh-Hans', wait_until='domcontentloaded')
    language_is('zh-Hans')
    page.get_by_role('searchbox').fill('你的声音和数据')
    assert page.locator('#data').count() == 1
    page.get_by_role('searchbox').fill('zzzz404')
    assert page.locator('.help-empty').is_visible()
    page.get_by_role('button', name='清除搜索与筛选').click()
    page.get_by_role('button', name='升级与修复').click()
    assert page.locator('.help-answer').count() == 4
    page.locator('.help-shortcuts a').nth(1).click()
    page.locator('#connection[open]').wait_for()
    assert page.locator('.help-answer').count() == 23
    page.evaluate("window.navigate('/about')")
    page.wait_for_function("location.pathname === '/about' && !document.getElementById('help-language')")
    page.go_back(wait_until='domcontentloaded')
    language_is('zh-Hans')
    assert not errors, errors
    print(f'PASS {base}: 23 articles; 9 rapid language Back/Forward cycles; deep links; '
          'fallback; search; categories; route unmount/remount; mobile overflow; no page errors')
    browser.close()
