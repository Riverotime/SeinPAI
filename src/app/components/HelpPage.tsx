import { useEffect, useMemo, useRef, useState } from "react";
import { ArrowUpRight, Search, ArrowDown, Download, Bluetooth, RefreshCw, Cable } from "lucide-react";
import PageShell from "./PageShell";
import { useLocale } from "../i18n/LocaleProvider";
import { normalizePrivacyLanguage } from "../legal/privacy";
import { zhArticles, zhHantArticles, enArticles, helpAppVersion } from "../help/content";
import "./HelpPage.css";

type ReadingLanguage = 'zh-Hans' | 'zh-Hant' | 'en';
const copy = {
 'zh-Hans': {title:'每一步，都有解答。',eyebrow:'SEIN · 帮助中心',intro:'从第一次连接，到日常记录与设备更新。找到你现在需要的那一步。',search:'搜索问题，例如：连不上、同步、固件',searchLabel:'搜索帮助文章',all:'全部问题',categories:{start:'开始使用',device:'连接与设备',daily:'日常使用',sync:'记录与同步',updates:'升级与修复',privacy:'隐私与权限',support:'故障与支持'},quick:['获取 App','连接不上？','同步历史记录','电脑升级工具'],quickNote:['下载与更新','先从这里排查','查看开始与重试步骤','USB 数据线 · 电脑浏览器'],topics:'按主题查找',results:'篇解答',empty:'没有找到相关问题。',emptyBody:'试试「连接」「同步」「更新」，或直接联系我们。',clear:'清除搜索与筛选',supportTitle:'还需要帮忙？',supportBody:'告诉我们发生了什么。附上版本、发生时间和经过遮挡的错误截图，更方便定位。',email:'联系 Sein 支持',details:'反馈前需要准备什么',language:'阅读语言',route:'操作路径',scope:'本页按 2026 年 10 月 31 日的 iOS v0.87 界面整理；旧测试版本及 Android 的入口可能不同。',download:'获取 App',privacy:'隐私政策'},
 'zh-Hant': {title:'每一步，都有解答。',eyebrow:'SEIN · 幫助中心',intro:'從第一次連接，到日常記錄與裝置更新。找到你現在需要的那一步。',search:'搜尋問題，例如：連不上、同步、韌體',searchLabel:'搜尋說明文章',all:'全部問題',categories:{start:'開始使用',device:'連接與裝置',daily:'日常使用',sync:'記錄與同步',updates:'升級與修復',privacy:'隱私與權限',support:'故障與支援'},quick:['取得 App','連接不上？','同步歷史記錄','電腦升級工具'],quickNote:['下載與更新','先從這裡排查','查看開始與重試步驟','USB 資料線 · 電腦瀏覽器'],topics:'依主題尋找',results:'篇解答',empty:'沒有找到相關問題。',emptyBody:'試試「連接」「同步」「更新」，或直接聯絡我們。',clear:'清除搜尋與篩選',supportTitle:'還需要幫忙？',supportBody:'告訴我們發生了什麼。附上版本、發生時間和經過遮擋的錯誤截圖，更方便定位。',email:'聯絡 Sein 支援',details:'回報前需要準備什麼',language:'閱讀語言',route:'操作路徑',scope:'本頁依 2026 年 10 月 31 日的 iOS v0.87 介面整理；舊測試版本及 Android 的入口可能不同。',download:'取得 App',privacy:'隱私政策'},
 en: {title:'A little help, every step.',eyebrow:'SEIN · HELP CENTER',intro:'From your first connection to everyday records and updates. Find the next step you need.',search:'Search connection, sync, firmware…',searchLabel:'Search help articles',all:'All questions',categories:{start:'Getting started',device:'Connection & device',daily:'Everyday use',sync:'Records & sync',updates:'Updates & repair',privacy:'Privacy & permissions',support:'Troubleshooting'},quick:['Get the app','Trouble connecting?','Sync your records','Computer update tool'],quickNote:['Download & update','Start troubleshooting here','Start, pause & retry','USB data cable · Computer browser'],topics:'Browse by topic',results:'answers',empty:'No matching questions.',emptyBody:'Try connection, sync or update, or contact us directly.',clear:'Clear search and filters',supportTitle:'Need a hand?',supportBody:'Tell us what happened. Include versions, the incident time and a redacted error screenshot to help us investigate.',email:'Contact Sein support',details:'What to include in your report',language:'Reading language',route:'Where to find it',scope:'Based on the iOS v0.87 interface as of 31 October 2026. Older test builds and Android may use different navigation.',download:'Get the app',privacy:'Privacy Policy'}
};
function resolve(search: string, locale: string) {
 const raw = new URLSearchParams(search).get('lang') || locale;
 const normalized = normalizePrivacyLanguage(raw);
 const language: ReadingLanguage = normalized === 'zh-Hans' || normalized === 'zh-Hant' ? normalized : 'en';
 return {language, requested:raw};
}
export default function HelpPage() {
 const {locale, setLocale} = useLocale();
 const siteLocale = useRef(locale);
 useEffect(()=>{siteLocale.current=locale;},[locale]);
 const [reading,setReading] = useState(()=>resolve(window.location.search,locale));
 const [query,setQuery] = useState('');
 const [category,setCategory] = useState('all');
 const [active,setActive] = useState(()=>window.location.hash.slice(1));
 const ui = copy[reading.language];
 const articles = reading.language === 'zh-Hans' ? zhArticles : reading.language === 'zh-Hant' ? zhHantArticles : enArticles;
 useEffect(()=>{
  const url = new URL(window.location.href);
  if(!url.searchParams.has('lang')) url.searchParams.set('lang',reading.requested);
  const siteLanguage = reading.language === 'en' ? 'en' : 'zh';
  if(locale !== siteLanguage) setLocale(siteLanguage);
  window.history.replaceState(window.history.state,'',url);
  document.title = `${reading.language === 'en' ? 'Help Center' : reading.language === 'zh-Hant' ? '幫助中心' : '帮助中心'} | Sein`;
  document.documentElement.lang = reading.language;
 },[reading,locale,setLocale]);
 useEffect(()=>{
  let pending: number | undefined;
  // Subscribe once: a site-locale update must not cancel a pending Back/Forward.
  // Capture the destination before another effect can normalize the URL.
  const sync=()=>{
   const destination=resolve(window.location.search,siteLocale.current);
   const destinationHash=window.location.hash.slice(1);
   window.clearTimeout(pending);
   pending=window.setTimeout(()=>{setReading(destination);setQuery('');setCategory('all');setActive(destinationHash);},0);
  };
  const hash=()=>{setQuery('');setCategory('all');setActive(window.location.hash.slice(1));};
  window.addEventListener('popstate',sync);window.addEventListener('hashchange',hash);
  return ()=>{window.clearTimeout(pending);window.removeEventListener('popstate',sync);window.removeEventListener('hashchange',hash);};
 },[]);
 useEffect(()=>{
  if(active) requestAnimationFrame(()=>document.getElementById(active)?.scrollIntoView({block:'start'}));
 },[active]);
 const filtered=useMemo(()=>{
  const terms=query.trim().toLocaleLowerCase().split(/\s+/).filter(Boolean);
  return articles.filter(a=>(category==='all'||a.category===category)&&terms.every(term=>`${a.title} ${a.path ?? ""} ${a.paragraphs.join(' ')} ${a.steps?.join(' ')??''} ${a.links?.map(l=>l.label).join(' ')??''}`.toLocaleLowerCase().includes(term)));
 },[articles,category,query]);
 const changeLanguage=(language: ReadingLanguage)=>{
  const url=new URL(window.location.href);url.searchParams.set('lang',language);
  window.history.pushState(window.history.state,'',url);setReading({language,requested:language});setQuery('');setCategory('all');
 };
 const languageControl=<div className="language-switcher"><label className="language-label" htmlFor="help-language">{ui.language}</label><select id="help-language" value={reading.language} onChange={e=>changeLanguage(e.target.value as ReadingLanguage)}><option value="zh-Hans">简体中文</option><option value="zh-Hant">繁體中文</option><option value="en">English</option></select></div>;
 const fallback=reading.language==='en' && !/^en(?:-|$)/i.test(reading.requested);
 return <PageShell current="help" languageControl={languageControl}><main className="help-page" lang={reading.language} onClick={event=>{
   const anchor=(event.target as Element).closest('a[href^="#"]');
   const id=anchor?.getAttribute('href')?.slice(1);
   if(!id) return;
   event.preventDefault();
   const url=new URL(window.location.href);url.hash=id;
   if(window.location.hash!==url.hash) window.history.pushState(window.history.state,'',url);
   setQuery('');setCategory('all');setActive(id);
   requestAnimationFrame(()=>document.getElementById(id)?.scrollIntoView({block:'start'}));
  }}>
  <section className="help-hero"><p className="site-eyebrow">{ui.eyebrow}</p><h1>{ui.title}</h1><p className="help-lead">{ui.intro}</p><p className="help-version">{helpAppVersion}</p>
   {fallback&&<p className="help-language-note" role="status">{reading.requested.startsWith('ja')?'日本語のガイドは準備中です。現在は英語版を表示しています。':reading.requested.startsWith('ko')?'한국어 가이드는 준비 중입니다. 현재 영어 가이드를 표시합니다.':'This guide is available in English, Simplified Chinese and Traditional Chinese. Showing English.'}</p>}
   <label className="help-search"><Search size={22} aria-hidden="true"/><span className="help-sr-only">{ui.searchLabel}</span><input type="search" value={query} placeholder={ui.search} onChange={e=>setQuery(e.target.value)} aria-controls="help-answers"/></label>
   <div className="help-shortcuts">{[Download,Bluetooth,RefreshCw,Cable].map((Icon,i)=><a key={i} href={['/start','#connection','#history-sync','#usb-update'][i]}><Icon size={23} strokeWidth={1.5} aria-hidden="true"/><span><strong>{ui.quick[i]}</strong><small>{ui.quickNote[i]}</small></span><ArrowUpRight className="help-shortcut-arrow" size={17} aria-hidden="true"/></a>)}</div>
  </section>
  <div className="help-body"><aside className="help-topics"><h2>{ui.topics}</h2><nav aria-label={ui.topics}>{[['all',ui.all],...Object.entries(ui.categories)].map(([key,label])=><button key={key} aria-pressed={category===key} onClick={()=>setCategory(key)}>{label}<span>{key==='all'?articles.length:articles.filter(a=>a.category===key).length}</span></button>)}</nav></aside>
   <section id="help-answers" className="help-answers" aria-label={ui.all}><p className="help-count" role="status">{filtered.length} {ui.results}</p>
    {filtered.length===0?<div className="help-empty"><h2>{ui.empty}</h2><p>{ui.emptyBody}</p><button className="site-button" onClick={()=>{setQuery('');setCategory('all');}}>{ui.clear}</button></div>:filtered.map(article=><details key={article.id} id={article.id} className="help-answer" open={active===article.id||undefined}><summary><span>{article.title}</span><ArrowDown size={18} aria-hidden="true"/></summary><div className="help-answer-content">{article.path&&<p className="help-path"><span>{ui.route}</span>{article.path}</p>}{article.paragraphs.map((p,i)=><p key={i}>{p}</p>)}{article.steps&&<ol>{article.steps.map(step=><li key={step}>{step}</li>)}</ol>}{article.links&&<div className="help-article-links">{article.links.map(link=><a key={link.href} href={link.href.startsWith('/privacy')?`${link.href}?lang=${reading.language}`:link.href} {...(link.href.startsWith('https:')?{target:'_blank',rel:'noopener noreferrer'}:{})}>{link.label}</a>)}</div>}</div></details>)}
   </section>
  </div>
  <section id="support" className="help-support"><div><p className="site-eyebrow">SEIN SUPPORT</p><h2>{ui.supportTitle}</h2><p>{ui.supportBody}</p></div><div className="help-support-actions"><a className="site-button" href="mailto:hi@seinpai.com?subject=Sein%20support">{ui.email}<ArrowUpRight size={17} aria-hidden="true"/></a><a href="#contact">{ui.details}</a><span>hi@seinpai.com</span></div></section>
  <p className="help-scope">{ui.scope}</p>
 </main></PageShell>;
}
