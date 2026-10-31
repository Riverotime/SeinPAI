import { useEffect, useState } from "react";
import PageShell from "./PageShell";
import { useLocale } from "../i18n/LocaleProvider";
import { privacyAssetPath, privacyPageUrl, resolvePrivacyLocation, type PrivacyLanguage, type PrivacyService } from "../legal/privacy";
import "./PrivacyPage.css";

const labels = {
  "zh-Hans": { title: "隐私政策", preview: "官网预览", choose: "选择你所使用的服务", intro: "先选择服务主体，再查看对应政策。阅读语言不会改变服务主体。", mainland: "中国内地服务", global: "Persein Inc. 服务", language: "阅读语言", contents: "章节目录", expand: "展开章节目录", print: "打印 / 保存 PDF", standalone: "独立页面", loading: "正在加载完整政策…", error: "暂时无法加载政策，请重试或打开独立页面。", retry: "重新加载", fallback: "当前语言的完整政策尚未提供，现显示英文版。", updated: "更新日期", version: "版本" },
  "zh-Hant": { title: "隱私政策", preview: "網站預覽", choose: "選擇你使用的服務", intro: "先選擇服務主體，再查看對應政策。閱讀語言不會改變服務主體。", mainland: "中國內地服務", global: "Persein Inc. 服務", language: "閱讀語言", contents: "章節目錄", expand: "展開章節目錄", print: "列印／儲存 PDF", standalone: "獨立頁面", loading: "正在載入完整政策…", error: "暫時無法載入政策，請重試或開啟獨立頁面。", retry: "重新載入", fallback: "目前尚未提供此語言的完整政策，現顯示英文版。", updated: "更新日期", version: "版本" },
  en: { title: "Privacy Policy", preview: "Website preview", choose: "Choose the service you use", intro: "Choose the service provider to read the applicable policy. Changing the reading language does not change the provider.", mainland: "Mainland China service", global: "Persein Inc. service", language: "Reading language", contents: "Contents", expand: "Show contents", print: "Print / Save PDF", standalone: "Standalone page", loading: "Loading the full policy…", error: "The policy could not be loaded. Retry or open the standalone page.", retry: "Retry", fallback: "The full policy is not yet available in the requested language. Showing English.", updated: "Updated", version: "Version" },
  ja: { title: "プライバシーポリシー", preview: "ウェブサイトプレビュー", choose: "ご利用のサービスを選択", intro: "サービス提供者を選択して、適用されるポリシーをご確認ください。表示言語を変更しても提供者は変わりません。", mainland: "中国本土のサービス", global: "Persein Inc. のサービス", language: "表示言語", contents: "目次", expand: "目次を表示", print: "印刷／PDF に保存", standalone: "独立ページ", loading: "ポリシー全文を読み込み中…", error: "読み込めませんでした。再試行するか、独立ページを開いてください。", retry: "再試行", fallback: "指定言語の全文はまだありません。英語版を表示しています。", updated: "更新日", version: "バージョン" },
  ko: { title: "개인정보 처리방침", preview: "웹사이트 미리보기", choose: "이용 중인 서비스 선택", intro: "서비스 제공자를 선택하여 적용되는 방침을 확인하세요. 표시 언어를 바꿔도 제공자는 변경되지 않습니다.", mainland: "중국 본토 서비스", global: "Persein Inc. 서비스", language: "표시 언어", contents: "목차", expand: "목차 보기", print: "인쇄 / PDF 저장", standalone: "독립 페이지", loading: "방침 전문을 불러오는 중…", error: "방침을 불러오지 못했습니다. 다시 시도하거나 독립 페이지를 열어 주세요.", retry: "다시 시도", fallback: "요청한 언어의 전문이 아직 없어 영어판을 표시합니다.", updated: "업데이트", version: "버전" },
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
  const visible = document?.service === selection.service && document?.language === selection.language ? document : null;
  const asset = selection.service ? privacyAssetPath(selection.service, selection.language, "html") : null;

  useEffect(() => {
    const sync = () => setSelection(resolvePrivacyLocation(window.location.search, locale));
    window.addEventListener("popstate", sync);
    return () => window.removeEventListener("popstate", sync);
  }, [locale]);

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

  function choose(service: PrivacyService | null, language: PrivacyLanguage) {
    const next = service ? privacyPageUrl(service, language) : `/privacy?lang=${language}`;
    window.history.pushState({}, "", next);
    setSelection({ service, language, usedFallback: false });
    setLocale(language === "zh-Hans" || language === "zh-Hant" ? "zh" : language);
  }

  const languageControl = <label className="privacy-language">{ui.language}<select aria-label={ui.language} value={selection.language} onChange={event => choose(selection.service, event.target.value as PrivacyLanguage)}>{languages.map(([value, title]) => <option key={value} value={value} lang={value}>{title}</option>)}</select></label>;
  const contents = visible?.sections.map(section => <a key={section.id} href={`#${section.id}`}>{section.title}</a>);

  return <PageShell languageControl={languageControl}>
    <main className="site-document privacy-page" lang={selection.language}>
      <div className="privacy-container">
        <header className="privacy-intro">
          <span className="site-eyebrow">SEIN / {ui.preview}</span>
          <h1>{ui.title}</h1>
          <fieldset className="privacy-services"><legend>{ui.choose}</legend><p>{ui.intro}</p><div>
            <button type="button" data-service="mainland" aria-pressed={selection.service === "mainland"} onClick={() => choose("mainland", selection.language)}><span>{ui.mainland}</span><small>珀森文化（杭州）有限公司</small></button>
            <button type="button" data-service="persein" aria-pressed={selection.service === "persein"} onClick={() => choose("persein", selection.language)}><span>{ui.global}</span><small>Persein Inc.</small></button>
          </div></fieldset>
          {selection.usedFallback && <p role="status" className="privacy-notice">{ui.fallback}</p>}
          {selection.service && <div className="privacy-tools"><span>{ui.version} 1.0 · {ui.updated} 2026-10-31</span><button type="button" onClick={() => window.print()} disabled={!visible}>{ui.print}</button><a href={asset!}>{ui.standalone} ↗</a></div>}
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
