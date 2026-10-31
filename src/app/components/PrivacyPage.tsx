import { useEffect, useState } from "react";
import PageShell from "./PageShell";
import { useLocale } from "../i18n/LocaleProvider";
import { privacyAssetPath, privacyPageUrl, resolvePrivacyLocation, type PrivacyLanguage, type PrivacyService } from "../legal/privacy";
import "./PrivacyPage.css";

const labels = {
  "zh-Hans": { title: "隐私政策", preview: "官网预览", choose: "选择你所使用的服务", intro: "先选择服务主体，再查看对应政策。阅读语言不会改变服务主体。", mainland: "中国内地服务", global: "Persein Inc. 服务", language: "阅读语言", contents: "章节目录", expand: "展开章节目录", print: "打印 / 保存 PDF", standalone: "独立页面", loading: "正在加载完整政策…", error: "暂时无法加载政策，请重试。", retry: "重新加载", fallback: "当前语言的完整政策尚未提供，现显示英文版。", updated: "更新日期", version: "版本" },
  "zh-Hant": { title: "隱私政策", preview: "網站預覽", choose: "選擇你使用的服務", intro: "先選擇服務主體，再查看對應政策。閱讀語言不會改變服務主體。", mainland: "中國內地服務", global: "Persein Inc. 服務", language: "閱讀語言", contents: "章節目錄", expand: "展開章節目錄", print: "列印／儲存 PDF", standalone: "獨立頁面", loading: "正在載入完整政策…", error: "暫時無法載入政策，請重試。", retry: "重新載入", fallback: "目前尚未提供此語言的完整政策，現顯示英文版。", updated: "更新日期", version: "版本" },
  en: { title: "Privacy Policy", preview: "Website preview", choose: "Choose the service you use", intro: "Choose the service provider to read the applicable policy. Changing the reading language does not change the provider.", mainland: "Mainland China service", global: "Persein Inc. service", language: "Reading language", contents: "Contents", expand: "Show contents", print: "Print / Save PDF", standalone: "Standalone page", loading: "Loading the full policy…", error: "The policy could not be loaded. Please retry.", retry: "Retry", fallback: "The full policy is not yet available in the requested language. Showing English.", updated: "Updated", version: "Version" },
  ja: { title: "プライバシーポリシー", preview: "ウェブサイトプレビュー", choose: "ご利用のサービスを選択", intro: "サービス提供者を選択して、適用されるポリシーをご確認ください。表示言語を変更しても提供者は変わりません。", mainland: "中国本土のサービス", global: "Persein Inc. のサービス", language: "表示言語", contents: "目次", expand: "目次を表示", print: "印刷／PDF に保存", standalone: "独立ページ", loading: "ポリシー全文を読み込み中…", error: "読み込めませんでした。再試行してください。", retry: "再試行", fallback: "指定言語の全文はまだありません。英語版を表示しています。", updated: "更新日", version: "バージョン" },
  ko: { title: "개인정보 처리방침", preview: "웹사이트 미리보기", choose: "이용 중인 서비스 선택", intro: "서비스 제공자를 선택하여 적용되는 방침을 확인하세요. 표시 언어를 바꿔도 제공자는 변경되지 않습니다.", mainland: "중국 본토 서비스", global: "Persein Inc. 서비스", language: "표시 언어", contents: "목차", expand: "목차 보기", print: "인쇄 / PDF 저장", standalone: "독립 페이지", loading: "방침 전문을 불러오는 중…", error: "방침을 불러오지 못했습니다. 다시 시도해 주세요.", retry: "다시 시도", fallback: "요청한 언어의 전문이 아직 없어 영어판을 표시합니다.", updated: "업데이트", version: "버전" },
} as const;
const scopeCopy = {
  "zh-Hans": { title: "服务主体与适用范围", intro: "中国内地服务由珀森文化（杭州）有限公司提供；Persein Inc. 服务由 Persein Inc. 提供。本页按阅读语言默认展示政策版本；App 或账号链接指定服务地区时，以该链接为准。更换阅读语言不会变更账号服务主体或迁移数据。", current: "当前阅读版本" },
  "zh-Hant": { title: "服務主體與適用範圍", intro: "中國內地服務由珀森文化（杭州）有限公司提供；Persein Inc. 服務由 Persein Inc. 提供。本頁依閱讀語言預設顯示政策版本；App 或帳號連結指定服務地區時，以該連結為準。切換閱讀語言不會變更帳號服務主體或遷移資料。", current: "目前閱讀版本" },
  en: { title: "Service provider and scope", intro: "The Mainland China service is provided by 珀森文化（杭州）有限公司. The Persein Inc. service is provided by Persein Inc. This page defaults to a policy version based on the reading language; a service specified by an App or account link takes precedence. Changing the reading language does not change your account's provider or move your data.", current: "Policy version displayed" },
  ja: { title: "サービス提供者と適用範囲", intro: "中国本土のサービスは珀森文化（杭州）有限公司が、Persein Inc. のサービスは Persein Inc. が提供します。このページでは表示言語に応じたポリシーを初期表示し、App やアカウントのリンクにサービスの指定がある場合はそちらを優先します。言語の変更によってアカウントの提供者が変わったり、データが移転したりすることはありません。", current: "表示中のポリシー" },
  ko: { title: "서비스 제공자 및 적용 범위", intro: "중국 본토 서비스는 珀森文化（杭州）有限公司가, Persein Inc. 서비스는 Persein Inc.가 제공합니다. 이 페이지는 읽기 언어에 따라 방침을 기본 표시하며, App 또는 계정 링크에 지정된 서비스가 우선합니다. 읽기 언어를 변경해도 계정의 서비스 제공자가 바뀌거나 데이터가 이전되지 않습니다.", current: "현재 표시된 방침" },
} as const;
const languages: [PrivacyLanguage, string][] = [["zh-Hans", "简体中文"], ["zh-Hant", "繁體中文"], ["en", "English"], ["ja", "日本語"], ["ko", "한국어"]];
type PolicyDocument = { service: PrivacyService; language: PrivacyLanguage; controller: string; title: string; version: string; updated: string; html: string; sections: {id: string; title: string}[] };

export default function PrivacyPage() {
  const { locale, setLocale } = useLocale();
  const [selection, setSelection] = useState(() => resolvePrivacyLocation(window.location.search, locale));
  const [document, setDocument] = useState<PolicyDocument | null>(null);
  const [failed, setFailed] = useState(false);
  const [attempt, setAttempt] = useState(0);
  const ui = labels[selection.language];
  const scope = scopeCopy[selection.language];
  const visible = document?.service === selection.service && document?.language === selection.language ? document : null;

  useEffect(() => {
    const siteLanguage = selection.language === "zh-Hans" || selection.language === "zh-Hant" ? "zh" : selection.language;
    if (locale !== siteLanguage) {
      const currentUrl = window.location.href;
      setLocale(siteLanguage);
      // Keep the policy's script and any pinned service while localizing the site shell.
      window.history.replaceState(window.history.state, "", currentUrl);
    }
  }, [selection.language, locale, setLocale]);

  useEffect(() => {
    const sync = () => setSelection(resolvePrivacyLocation(window.location.search, locale));
    window.addEventListener("popstate", sync);
    return () => window.removeEventListener("popstate", sync);
  }, [locale]);

  useEffect(() => {
    if (!new URLSearchParams(window.location.search).has("lang")) {
      window.history.replaceState(window.history.state, "", privacyPageUrl(selection.explicitService ? selection.service : null, selection.language));
    }
  }, [selection.explicitService, selection.service, selection.language]);

  useEffect(() => {
    if (!selection.service) { setDocument(null); return; }
    const controller = new AbortController();
    setFailed(false);
    const path = privacyAssetPath(selection.service, selection.language, "json")!;
    fetch(path, { signal: controller.signal }).then(async response => {
      if (!response.ok) throw new Error("Policy unavailable");
      const data: PolicyDocument = await response.json();
      if (data.service !== selection.service || data.language !== selection.language || typeof data.html !== "string" || !Array.isArray(data.sections)) throw new Error("Policy variant mismatch");
      if (!controller.signal.aborted) setDocument(data);
    }).catch(() => { if (!controller.signal.aborted) setFailed(true); });
    return () => controller.abort();
  }, [selection.service, selection.language, attempt]);

  function chooseLanguage(language: PrivacyLanguage) {
    const next = privacyPageUrl(selection.explicitService ? selection.service : null, language);
    const previous = window.location.href;
    setLocale(language === "zh-Hans" || language === "zh-Hant" ? "zh" : language);
    // LocaleProvider updates ?lang; preserve this history entry before adding the next one.
    window.history.replaceState(window.history.state, "", previous);
    window.history.pushState({}, "", next);
    setSelection(resolvePrivacyLocation(next, language));
  }

  const languageControl = <label className="privacy-language">{ui.language}<select aria-label={ui.language} value={selection.language} onChange={event => chooseLanguage(event.target.value as PrivacyLanguage)}>{languages.map(([value, title]) => <option key={value} value={value} lang={value}>{title}</option>)}</select></label>;
  const contents = visible?.sections.map(section => <a key={section.id} href={`#${section.id}`}>{section.title}</a>);

  return <PageShell languageControl={languageControl}>
    <main className="site-document privacy-page" lang={selection.language}>
      <div className="privacy-container">
        <header className="privacy-intro">
          <span className="site-eyebrow">SEIN</span>
          <h1>{ui.title}</h1>
          <section className="privacy-scope" aria-labelledby="privacy-scope-title">
            <h2 id="privacy-scope-title">{scope.title}</h2>
            <p>{scope.intro}</p>
          </section>
          {selection.usedFallback && <p role="status" className="privacy-notice">{ui.fallback}</p>}
        </header>
        {selection.service && <div className="privacy-reading">
          {visible && <aside className="privacy-contents" aria-label={ui.contents}><h2>{ui.contents}</h2><nav>{contents}</nav></aside>}
          <div className="privacy-body">
            {visible && <><details className="privacy-mobile-contents"><summary>{ui.expand}</summary><nav>{contents}</nav></details><article className="privacy-copy" aria-label={ui.title} data-service={visible.service} data-language={visible.language} dangerouslySetInnerHTML={{ __html: visible.html }} /></>}
            {!visible && !failed && <p role="status">{ui.loading}</p>}
            {failed && <div role="alert"><p>{ui.error}</p><button type="button" className="site-button" onClick={() => setAttempt(value => value + 1)}>{ui.retry}</button></div>}
          </div>
        </div>}
      </div>
    </main>
  </PageShell>;
}
