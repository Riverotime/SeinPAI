import { buyLink } from "@/app/links";
import { advisorExamples } from "./advisorExamples";
import dayComic from "@/assets/sein/photos/day-comic.png";
import emotionalScene from "@/assets/sein/photos/emotional-support.jpg";
import biographyScene from "@/assets/sein/photos/life-story-writing.jpg";
import comicScene from "@/assets/sein/photos/comic-artist.jpg";
import expertsScene from "@/assets/sein/photos/expert-workshop.jpg";
import { useLocale, LanguageSwitcher } from "../i18n/LocaleProvider";
import { useEffect, useRef, useState } from "react";
import { ArrowUp, ArrowRight, ChevronDown, ChevronLeft, ChevronRight, Check, Clock3, Mic, Plus, Send, Sparkles } from "lucide-react";
import seinLogo from "@/assets/sein/sein-logo-mark.svg";
import device from "@/assets/46ba4aeb2e54923f5b128714d60aaecdd7b4bcac.png";
import hero from "@/assets/sein/photos/family-walk.jpg";
import babyScene from "@/assets/sein/photos/baby-quiet.jpg";
import childScene from "@/assets/sein/photos/family-at-home.jpg";
import relationshipScene from "@/assets/sein/photos/pregnancy-calm.jpg";
import founderScene from "@/assets/sein/photos/team-discussion.jpg";
import growthScene from "@/assets/sein/photos/adult-studying.jpg";
import flowOne from "@/assets/sein/ref-flow-1.jpg";
import flowTwo from "@/assets/sein/ref-flow-2.jpg";
import flowThree from "@/assets/sein/ref-flow-3.jpg";
import flowers from "@/assets/sein/ref-flowers.jpg";
import "./HomePageLassie.css";
import "./HomePageReplica.css";
import "./HomePageBrand.css";
const heroScenesData = [{
  label: "Everyday life",
  image: device,
  alt: "A hand holding the Sein wearable",
  title: "Bring expert guidance",
  ending: "into everyday life.",
  copy: "专业人士的经验帮助确定关注什么、如何判断；AI 联系你的背景与日常细节，让知识变成此刻用得上的支持。"
}];
const waitlist = buyLink;
const skillsData = [{
  name: "婴儿照护",
  image: babyScene,
  position: "55% 50%",
  scene: "结合月龄，读懂最近的小变化。",
  context: "家人聊起：“宝宝现在会叫妈妈了。”",
  ask: "能帮我留下这个小变化吗？",
  reply: "你们刚才聊到，宝宝开始叫妈妈了。可以把这段对话整理进成长记录。要不要加上当时的地点，以及你们听到时的心情？",
  finds: ["家人聊到的成长变化", "值得留下的一句话", "由你补充的细节与感受"],
  author: "儿科与婴幼儿照护专业人士"
}, {
  name: "儿童教育",
  image: childScene,
  position: "60% 50%",
  scene: "电视需要关掉，情绪不必马上收起来。",
  ask: "怎么陪孩子练习说“不”？",
  reply: "刚才，你告诉孩子，不喜欢时可以表达拒绝。可以陪他练习一句：“谢谢，我想自己来。” 再问问他，什么时候会想用到这句话。",
  finds: ["孩子愿意主动聊的话题", "亲子交流中的情绪转折", "适合继续或暂停的时刻"],
  author: "儿童发展与家庭教育专业人士"
}, {
  name: "亲密关系",
  image: relationshipScene,
  position: "55% 50%",
  scene: "孕晚期的一句“好累”，值得被认真听见。",
  context: "妻子：“肚子越来越沉，昨晚翻来覆去都没睡好。想到快生了，我还有点害怕。”",
  ask: "除了说“别担心”，我还能怎么陪她？",
  reply: "她说到身体的不舒服，也说到对生产的担心。可以先回应：“听起来昨晚真的很难熬，我在这里陪你。” 再问她想聊聊担心的事，还是想先休息一会儿；今晚的家务，你可以主动接过来。",
  finds: ["她明确说出的不适和担心", "先倾听、再询问的回应方式", "能主动分担的具体小事"],
  author: "关系咨询与心理健康专业人士"
}, {
  name: "自我成长",
  image: growthScene,
  position: "64% 48%",
  scene: "翻开一本书，给自己留一点安静的时间。",
  ask: "我怎么总是坚持不下来？",
  reply: "每次提起这个计划，你都很有热情，却总想一次做得很完整。明天先做十分钟，好吗？",
  finds: ["不断重复的阻力", "真正让你有能量的事", "今天就能开始的小行动"],
  author: "心理学与个人成长专业人士"
}, {
  name: "创业",
  image: founderScene,
  position: "58% 45%",
  scene: "刚和用户聊完，你脑中还有许多零散的反馈。",
  ask: "这次访谈有什么值得注意？",
  reply: "这是本周第 4 次有人提到“第一次上手太复杂”。他们用词不同，卡住的位置却相同。",
  finds: ["用户反馈中的重复信号", "尚未落实的重要决定", "假设与真实观察的差距"],
  author: "创业者与产品实践者"
}, {
  name: "心理支持",
  title: "心理支持",
  image: emotionalScene,
  position: "50% 50%",
  scene: "有些感受，不必一个人理清。",
  ask: "那场谈话已经结束了，可我还是有些难受。",
  reply: "你愿意说说，是哪一句话一直留在心里吗？我们可以先不急着找办法，慢慢理清你当时的感受，以及现在最需要什么。",
  author: "心理健康与情绪支持专业人士",
  finds: []
}, {
  name: "传记作者",
  title: "传记作者",
  image: biographyScene,
  position: "52% 50%",
  scene: "刚才笑过的那句话，也可以成为家庭的故事。",
  ask: "刚才那句话把大家都逗笑了，能帮我留下来吗？",
  reply: "可以把你选中的对话整理成一则家庭小记，保留那句原话。你可以补充当时的情景，再决定是否分享；想画成漫画时，也可以从这段小记开始。",
  author: "传记写作者与口述史实践者",
  finds: []
}, {
  name: "随身漫画师",
  title: "随身漫画师",
  image: comicScene,
  position: "42% 55%",
  scene: "把今天的小插曲，变成一格格值得收藏的日常。",
  ask: "孩子说月亮在跟着我们回家，这一刻能画成漫画吗？",
  reply: "",
  author: "漫画作者与视觉叙事创作者",
  finds: []
}, {
  name: "更多专业",
  title: "生活不止这些场景。",
  image: expertsScene,
  position: "50% 50%",
  scene: "探索更多来自专业人士的技能，找到适合你此刻生活的支持。",
  ask: "",
  reply: "",
  author: "",
  more: true,
  finds: []
}];
const momentsData = [["07:10", "婴儿照护", "听见成长的一刻", "你们聊到宝宝开始叫妈妈了，这一刻值得留下。"], ["10:30", "创业", "听见重复的信号", "这是本周第 4 次有人提到上手太复杂。"], ["17:50", "儿童教育", "练习表达自己", "不喜欢时，可以说“不”。陪孩子练习一句温和而清楚的表达。"], ["20:15", "亲密关系", "听见孕晚期的辛苦", "她说昨晚没睡好，也担心生产。先听她说说，再问她现在需要什么。"], ["23:00", "自我成长", "在一天结束前", "那个想了很久的计划，明天先做十分钟。"]];
const faqData = [["Sein 只有这些技能吗？", "不是。这里展示的是部分生活场景示例。Sein 有来自各领域专业人士的各种技能，你可以按自己的需要选择。"], ["Sein 会一直保存我身边的声音吗？", "默认不会保存原始音频。Sein 优先在设备本地处理信息；主动双击保存录音时，LED 会亮起。"], ["我需要一次安装全部技能吗？", "不用。你可以先选择眼下最需要的技能，再按生活的变化添加其他技能。"], ["示例里的数字是真实数据吗？", "不是。页面中的时间、次数与数值均为功能演示，不代表真实用户数据或实际效果。"], ["如何购买 Sein？", "点击「立即购买」，在 Stripe 支付页面完成付款。"]];
const rolesData = ["儿科与婴幼儿照护", "儿童发展与家庭教育", "关系咨询与心理健康", "效率教练与工作方式", "创业与产品实践", "生活管理与家庭服务"];
function SeinMark({
  className = ""
}: {
  className?: string;
}) {
  return <img className={"rep-sein-mark " + className} src={seinLogo} alt="" aria-hidden="true" />;
}
function CTA({
  children,
  dark = false
}: {
  children?: React.ReactNode;
  dark?: boolean;
}) {
  const {
    t
  } = useLocale();
  return <a className={"rep-cta" + (dark ? " rep-cta-dark" : "")} href={waitlist}>{typeof children === "string" ? t(children) : children ?? t("Buy now")}</a>;
}
export default function HomePageLassie() {
  const {
    t,
    localize
  } = useLocale();
  const heroScenes = localize(heroScenesData);
  const skills = localize(skillsData);
  const moments = localize(momentsData);
  const faq = localize(faqData);
  const roles = localize(rolesData);
  const heroScene = heroScenes[0];
  const [active, setActive] = useState<number>(0);
  const [comicOpen, setComicOpen] = useState(false);
  const advisorTrack = useRef<HTMLDivElement>(null);
  const advisorButtons = useRef<(HTMLButtonElement | null)[]>([]);
  const selectAdvisor = (index: number | null) => {
    if (index === null) {
      document.getElementById("sein-home")?.scrollIntoView({ behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" });
      return;
    }
    setActive(index);
    setComicOpen(false);
    const strip = advisorTrack.current;
    const target = advisorButtons.current[index];
    if (strip && target) {
      const bounds = strip.getBoundingClientRect();
      const card = target.getBoundingClientRect();
      if (card.left < bounds.left || card.right > bounds.right) strip.scrollBy({left: card.left - bounds.left - (bounds.width - card.width) / 2, behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth'});
    }
  };
  const moveAdvisor = (direction: number) => selectAdvisor((active + direction + skills.length) % skills.length);
  const [open, setOpen] = useState<number | null>(null);
  const [menu, setMenu] = useState(false);
  const page = useRef<HTMLDivElement>(null);
  const flow = useRef<HTMLElement>(null);
  const collage = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const go = (id: string) => {

    document.getElementById(id)?.scrollIntoView({
      behavior: "smooth"
    });
    setMenu(false);
  };
  useEffect(() => {
    let accumulated = 0;
    let lastWheel = 0;
    let lockedUntil = 0;
    const wheel = (event: WheelEvent) => {
      if (event.ctrlKey || Math.abs(event.deltaX) > Math.abs(event.deltaY)) return;
      const now = performance.now();
      if (now < lockedUntil) { event.preventDefault(); return; }
      const cover = document.getElementById('sein-home');
      const next = document.getElementById('skills');
      if (!cover || !next || window.scrollY >= cover.offsetTop + cover.offsetHeight - 2 || event.deltaY <= 0) return;
      if (now - lastWheel > 180) accumulated = 0;
      lastWheel = now;
      accumulated += event.deltaY * (event.deltaMode === 1 ? 16 : event.deltaMode === 2 ? window.innerHeight : 1);
      event.preventDefault();
      if (accumulated < 45) return;
      accumulated = 0;
      lockedUntil = now + 850;
      next.scrollIntoView({block:'start',behavior:window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth'});
    };
    window.addEventListener('wheel', wheel, {passive:false});
    return () => window.removeEventListener('wheel', wheel);
  }, []);
  useEffect(() => {
    let frame = 0;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const update = () => {
      frame = 0;
      const root = page.current;
      if (!root) return;
      const mobile = window.innerWidth < 1024;
      const inset = Math.min(window.scrollY / 5, mobile ? 16 : 32);
      root.style.setProperty("--hero-inset", `${inset}px`);
      root.style.setProperty("--hero-radius", `${Math.min(window.scrollY / 2.5, mobile ? 32 : 64)}px`);
      root.dataset.scrolled = String(window.scrollY > 80);
      const element = flow.current;
      if (element && !mobile && !reducedMotion) {
        const stage = element.querySelector<HTMLElement>(".rep-flow-stage")!;
        const startOffset = window.innerHeight * .5;
        const phase = Math.max(0, Math.min(2, (Math.max(0, (window.innerHeight - stage.offsetHeight) / 2) - element.getBoundingClientRect().top - startOffset) / (element.offsetHeight - stage.offsetHeight - startOffset) * 2));
        element.querySelectorAll<HTMLElement>(".rep-flow-panel").forEach((panel, i) => {
          const remaining = Math.max(0, i - phase);
          const scale = remaining <= 1 ? 1 - remaining * .135 : .865 - (remaining - 1) * .155;
          const y = phase >= i ? -Math.min(1, phase - i) * (panel.offsetHeight + 270) : panel.offsetHeight * (remaining <= 1 ? remaining * .23 : .23 + (remaining - 1) * .05);
          panel.style.transform = `translate(-50%, ${y}px) scale(${scale})`;
        });
        element.querySelectorAll<HTMLElement>(".rep-flow-description").forEach((description, i) => {
          description.style.opacity = String(Math.max(i === 1 ? .12 : 0, 1 - Math.abs(phase - i) * 1.35));
        });
      }
      const discovery = collage.current;
      if (discovery && !mobile && !reducedMotion) {
        const progress = Math.max(0, Math.min(1, -discovery.getBoundingClientRect().top / (discovery.offsetHeight - window.innerHeight)));
        discovery.dataset.shifted = String(progress > .55);
        discovery.querySelectorAll<HTMLElement>(".rep-orbit").forEach((card, i) => {
          const shift = (1 - progress) * (i % 2 ? 90 : -70);
          card.style.transform = `translateY(${shift}px)`;
        });
      }
    };
    const schedule = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", schedule, {
      passive: true
    });
    window.addEventListener("resize", schedule);
    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      window.cancelAnimationFrame(frame);
    };
  }, []);
  return <div className="rep-page" ref={page}>

    <header className="rep-header">
      <nav className={"rep-nav-pill" + (menu ? " is-open" : "")} aria-label={t("主导航")}>
        <a href="/" className="rep-brand" aria-label={t("Sein 首页")}><SeinMark /><span>Sein</span></a>
        <button className="rep-desktop-nav" onClick={() => go("skills")}>{t("Features")}</button>
        <a className="rep-desktop-nav" href="/about">{t("About")}</a>
        <button className="rep-menu" aria-expanded={menu} aria-controls="rep-mobile-menu" onClick={() => setMenu(!menu)}>{menu ? t("关闭") : t("菜单")}</button>
        {menu && <div className="rep-mobile-menu" id="rep-mobile-menu"><button onClick={() => go("skills")}>{t("Features")}</button><button onClick={() => go("how")}>{t("如何运作")}</button><button onClick={() => go("hardware")}>{t("随身设备")}</button><a href="/about">{t("About")}</a><CTA>{t("Buy now")}</CTA></div>}
      </nav>
      <div className="rep-header-cta"><button onClick={() => go("how")}>{t("如何运作")}</button><CTA>{t("Buy now")}</CTA></div>
    <div className="rep-language-control"><LanguageSwitcher /></div></header>

    <main>
      <section className="rep-hero rep-hero-stage rep-home-cover" id="sein-home" data-scene="device" aria-label={t("Sein 首页")}>
        <div className="rep-hero-media"><img src={heroScene.image} alt={heroScene.alt} loading="eager" /><div className="rep-hero-shade" /></div>
        <div className="rep-hero-stage-main"><div className="rep-hero-content"><span className="rep-hero-eyebrow">JUST Sein / {heroScene.label}</span><h1>{heroScene.title}<br /><em>{heroScene.ending}</em></h1><p>{heroScene.copy}</p><div className="rep-stage-actions"><CTA>{t("Buy now")}</CTA></div></div></div>
        <button className="rep-life-next" onClick={() => go("skills")}><span>{t("Sein 在生活中")}</span><ChevronDown size={20} aria-hidden="true" /></button>
      </section>

      <section className="rep-hero rep-hero-stage" id="skills" data-scene="life" aria-label={t("Expert guidance in everyday life")} onKeyDown={event => { if (event.key === 'Escape') selectAdvisor(null); }}>
        <div className="rep-hero-media rep-scene-layers">{skills.map((item, index) => <img key={index} src={item.image} alt={index === active ? item.scene : ""} aria-hidden={index !== active} className={index === active ? "is-visible" : ""} style={{objectPosition:item.position}} />)}<div className="rep-hero-shade" /></div>
        <div className="rep-hero-stage-main" id="rep-hero-scene" aria-live="polite" aria-atomic="true">
          <div className="rep-hero-content" key={'copy-' + active}><span className="rep-hero-eyebrow">JUST Sein / {(skills[active].title || t("{skill}顾问", {skill:skills[active].name}))}</span>
            <h2 className="rep-scene-title">{(skills[active].title || t("{skill}顾问", {skill:skills[active].name}))}</h2>
            <p>{skills[active].scene}</p>
            {skillsData[active].name === "随身漫画师" && <button className="rep-comic-toggle" aria-expanded={comicOpen} aria-controls="rep-day-comic" onClick={() => setComicOpen(value => !value)}>{t("看看创作示例")}<Plus size={15} aria-hidden="true" /></button>}
          {skillsData[active].name === "随身漫画师" && comicOpen && <figure className="rep-day-comic" id="rep-day-comic"><img src={dayComic} alt={t("一日四格漫画：一起做早餐、在公园捡树叶、牵手追月亮、回家向月亮道晚安。")} /><figcaption><strong>{t("今天，值得画下来。")}</strong><span>{t("早餐的香气 · 午后的树叶 · 跟来的月亮 · 门口的晚安")}</span><small>{t("AI 生成的创作示例")}</small></figcaption></figure>}
            {!skills[active].more && skillsData[active].name !== "随身漫画师" && <details className="rep-scene-conversation" key={active}><summary>{t(active < advisorExamples.length ? "看看判断依据与建议" : "看看创作示例")}<Plus size={15} /></summary><div className="rep-advisor-explanation">{active < advisorExamples.length ? <><small>{t("示例设定与对话概括")}</small>{([['背景与观察','context'],['为什么这样判断','reason'],['现在可以做什么','action']] as const).map(([label,field]) => <section key={field}><h3>{t(label)}</h3><p>{t(advisorExamples[active][field])}</p></section>)}<nav aria-label={t("知识参考")}><span>{t("知识参考")}</span>{advisorExamples[active].sources.map(source => <a key={source.url} href={source.url} target="_blank" rel="noopener noreferrer">{source.label} ↗</a>)}</nav></> : <><p>{skills[active].ask}</p><blockquote>{skills[active].reply}</blockquote><small>{t("创作示例，由你选择记录与分享的内容。")}</small></>}</div></details>}
            {skills[active].more && <div className="rep-more-experts"><p>{t("你希望下一位专业伙伴，在哪个时刻陪着你？")}</p><a href="/contact">{t("告诉我们你期待的方向")}<ArrowRight size={16} /></a></div>}
            <div className="rep-stage-actions"><CTA>{t("Buy now")}</CTA></div>
          </div>

        </div>
        {active !== null && <div className="rep-scene-dock"><div className="rep-advisors-arrows"><button onClick={() => moveAdvisor(-1)} aria-label={t("Previous scene")}><ChevronLeft size={18} /></button><button onClick={() => moveAdvisor(1)} aria-label={t("Next scene")}><ChevronRight size={18} /></button></div>
          <div className="rep-scene-windows" ref={advisorTrack} aria-label={t("Choose a scene")}>

            {skills.map((item, i) => <button key={i} ref={element => { advisorButtons.current[i] = element; }} id={'rep-advisor-' + i} className={'rep-scene-window' + (active === i ? ' is-active' : '')} aria-pressed={active === i} aria-controls="rep-hero-scene" onClick={() => selectAdvisor(i)}><img src={item.image} alt="" loading="lazy" style={{objectPosition:item.position}} /><span>{item.name}</span></button>)}
          </div>
        </div>}
      </section>

      <section className="rep-intro" id="intro"><SeinMark /><h2>{t("理解你，")}<br />{t("从在场开始。")}</h2></section>

      <section className="rep-flow-scroll" ref={flow} aria-label={t("Sein 如何理解生活")}>
        <div className="rep-flow-stage">
          <div className="rep-flow-description rep-flow-description-one"><h3>{t("Sein 留意你的日常")}</h3><p>{t("从一段段普通的对话里，留意那些重复出现、悄悄改变的线索。")}</p></div>
          <div className="rep-flow-description rep-flow-description-two"><h3>{t("把重要变化告诉你")}</h3><p>{t("当值得留意的规律出现，Sein 会主动提醒，并把判断留给你。")}</p></div>
          <div className="rep-flow-description rep-flow-description-three"><h3>{t("也回答你的问题")}</h3><p>{t("想梳理一件事时，Sein 已经记得相关的上下文。你可以从这里继续聊。")}</p></div>
          <div className="rep-flow-panel rep-flow-panel-one"><img src={flowOne} alt={t("黄蓝色柔焦植物背景")} loading="lazy" /><div className="rep-flow-working"><div><SeinMark /><span>{t("Sein 正在留意…")}</span></div><div className="rep-flow-status rep-flow-context"><span>{t("“该关电视了” → “还想看” → “别哭了”")}</span><small>{t("场景概括 · 非逐字转录")}</small></div></div></div>
          <div className="rep-flow-panel rep-flow-panel-two"><img src={flowTwo} alt={t("柔焦绿色花草")} loading="lazy" /><div className="rep-flow-notification"><div><SeinMark /><span>{t("Sein 留意到")}</span><small>{t("亲子沟通")}</small></div><p>{t("电视需要关掉，情绪不必马上收起来。")}</p><span>{t("advisor.example.1.0")}</span><details className="rep-flow-recap"><summary>{t("看看判断依据与建议")}<Plus size={12} aria-hidden="true" /></summary><div><small>{t("场景概括 · 非逐字转录")}</small><p>{t("“该关电视了” → “还想看” → “别哭了”")}</p><blockquote><strong>{t("为什么这样判断")}</strong><br />{t("advisor.example.1.1")}<br /><br /><strong>{t("现在可以做什么")}</strong><br />{t("advisor.example.1.2")}</blockquote><a href={advisorExamples[1].sources[0].url} target="_blank" rel="noopener noreferrer">AAP · Emotion coaching ↗</a></div></details></div></div>
          <div className="rep-flow-panel rep-flow-panel-three"><img src={flowThree} alt={t("柔焦粉色花草背景")} loading="lazy" /><div className="rep-flow-input"><Plus size={15} /><span>{t("和 Sein 聊聊你正在想的事")}</span><Mic size={12} /><ArrowUp size={17} /></div></div>
        </div>
      </section>

      <section className="rep-collage-scroll" ref={collage} aria-label={t("主动发现")}>
        <div className="rep-collage-stage">
          <div className="rep-collage-heading rep-collage-heading-first"><h2>{t("各种生活技能，")}<br />{t("来自专业人士。")}</h2></div>
          <div className="rep-collage-heading rep-collage-heading-second"><h2>{t("最重要的问题，")}<br />{t("往往是你没问出口的那个。")}</h2></div>
          <div className="rep-orbit rep-orbit-flowers"><img src={flowers} alt={t("阳光中的黄色野花")} loading="lazy" /></div>
          <div className="rep-orbit rep-orbit-first-note"><div className="rep-mini-heading"><span className="rep-mini-icon"><SeinMark /></span><span>{t("婴儿照护")}</span><small>{t("值得记住的一刻")}</small></div><p><Check />{t("爸妈聊到")}<span>{t("开始叫妈妈")}</span></p><p><Check />{t("值得留下")}<span className="rep-green">{t("成长的一刻")}</span></p></div>
          <div className="rep-orbit rep-orbit-family"><img src={childScene} alt={t("母亲和孩子在家中相处")} loading="lazy" /></div>
          <div className="rep-orbit rep-orbit-summary"><div className="rep-mini-heading"><SeinMark /><span>{t("Sein 正在梳理今天…")}</span></div><p><Clock3 />{t("今天的心情")}<span>{t("心理支持")}</span></p><p><Sparkles />{t("重复出现的反馈")}<span>{t("创业")}</span></p><p><Check />{t("明天想做的一件事")}<span>{t("自我成长")}</span></p></div>
          <div className="rep-orbit rep-orbit-work"><img src={founderScene} alt={t("同事围坐在桌边交流")} loading="lazy" /></div>
          <div className="rep-orbit rep-orbit-work-note"><div className="rep-mini-heading"><SeinMark /><span>{t("刚刚发现一个重复信号…")}</span></div><div className="rep-mini-status"><span><Check size={11} />{t("值得留意")}</span><small>{t("创业")}</small></div><p>{t("“第一次上手太复杂”")}<span>{t("本周第 4 次")}</span></p><small>{t("不同的说法，指向了同一个问题。")}</small></div>
        </div>
      </section>

      <section className="rep-how" id="how"><h2>{t("Sein 如何运作")}</h2><div className="rep-how-grid">
        <article><div className="rep-how-visual rep-how-device"><img src={device} alt={t("Sein 随身设备")} loading="lazy" /></div><h3>{t("戴上它")}</h3><p>{t("吊坠、夹子或别针。选一种适合今天的方式，把 Sein 带进真实生活。")}</p></article>
        <article><div className="rep-how-visual rep-how-skills"><div><SeinMark /><span>{t("选择你的生活技能")}</span><p><Check />{t("婴儿照护")}</p><p><Check />{t("亲密关系")}</p><p><Plus />{t("添加新技能")}</p></div></div><h3>{t("装上技能")}</h3><p>{t("从眼下最需要的领域开始，让 Sein 知道你最想理解什么。")}</p></article>
        <article><div className="rep-how-visual rep-how-alert"><div><SeinMark /><span>{t("刚刚发现")}</span><p>{t("你最近几次提到的困扰，")}<br />{t("似乎发生在同一段时间。")}</p><small>{t("要不要一起看看？")}</small></div></div><h3>{t("收到主动提醒")}</h3><p>{t("当重要的规律出现，Sein 会给你一个值得留意的提示。")}</p></article>
      </div></section>

      <section className="rep-day"><div className="rep-day-heading"><h2>{t("和 Sein 一起的一天")}</h2><div><button onClick={() => track.current?.scrollBy({
              left: -420,
              behavior: "smooth"
            })} aria-label={t("向左滑动")}><ChevronLeft size={18} /></button><button onClick={() => track.current?.scrollBy({
              left: 420,
              behavior: "smooth"
            })} aria-label={t("向右滑动")}><ChevronRight size={18} /></button></div></div><div className="rep-day-track" ref={track} tabIndex={0} aria-label={t("横向滚动查看一天中的提醒")}>{moments.map(m => <article key={m[0]}><span>{m[0]}</span><small>{m[1]}</small><h3>{m[2]}</h3><p>“{m[3]}”</p></article>)}</div></section>

      <section className="rep-authors"><h2>{t("每一种技能，")}<br />{t("都来自专业人士。")}</h2><div className="rep-authors-body"><p>{t("从育儿、关系到工作与成长，")}<br />{t("让各领域专业人士的知识，陪你走进日常。")}</p><div className="rep-role-list">{roles.map(role => <span key={role}>{role}</span>)}</div><a href="/contact" className="rep-text-link">{"" + t("成为技能作者") + " "}<ArrowRight size={14} /></a></div></section>

      <section className="rep-hardware" id="hardware"><div className="rep-hardware-image"><img src={device} alt={t("手持 Sein PAI 随身设备")} loading="lazy" /></div><div className="rep-hardware-copy"><h2>{t("小小一枚，")}<br />{t("一直在身边。")}</h2><dl><div><dt>{t("佩戴")}</dt><dd>{t("吊坠 / 夹子 / 别针")}</dd></div><div><dt>{t("音频")}</dt><dd>{t("默认不保存原始音频")}</dd></div><div><dt>{t("录音指示")}</dt><dd>{t("主动录音时 LED 亮起")}</dd></div><div><dt>{t("信息处理")}</dt><dd>{t("优先在设备本地处理")}</dd></div><div><dt>{t("影像")}</dt><dd>{t("拍照与录像，以最终产品说明为准")}</dd></div></dl></div></section>

      <section className="rep-privacy"><SeinMark /><h2>{t("你的生活，")}<br />{t("由你决定留下什么。")}</h2><p>{t("默认不保存原始音频，优先在设备本地处理。")}<br />{t("主动保存录音时，LED 会亮起。记录内容加密保护。")}</p><a href="/privacy" className="rep-text-link">{"" + t("查看隐私说明") + " "}<ArrowRight size={14} /></a></section>

      <section className="rep-faq" id="faq"><h2>{t("常见问题")}</h2><div className="rep-faq-list">{faq.map((item, i) => <article key={item[0]} className={open === i ? "is-open" : ""}><button id={"rep-faq-trigger-" + i} onClick={() => setOpen(open === i ? null : i)} aria-expanded={open === i} aria-controls={"rep-faq-answer-" + i}>{item[0]}<span><ChevronDown size={17} /></span></button><div id={"rep-faq-answer-" + i} role="region" aria-labelledby={"rep-faq-trigger-" + i} hidden={open !== i}><p>{item[1]}</p></div></article>)}</div></section>

      <section className="rep-final"><div className="rep-final-frame"><img src={hero} alt={t("一家人牵手走在户外小径上")} loading="lazy" /><div className="rep-final-content"><SeinMark /><h2>{t("从今天开始，")}<br />{t("看见更多。")}</h2><div className="rep-hero-bottom"><span>{t("在场，才更懂你")}</span><CTA>{t("Buy now")}</CTA></div><small>{t("通过 Stripe 安全支付")}</small></div></div></section>
    </main>

    <footer className="rep-footer"><div className="rep-footer-panel"><div className="rep-footer-heading"><h2>{t("生活发生的地方，")}<br /><em>{t("Sein 就在场。")}</em></h2><CTA dark /></div><div className="rep-footer-links"><div><span>{t("关于 Sein")}</span><a href="/about">{t("关于我们")}</a><a href="/contact">{t("联系我们")}</a></div><div><span>{t("探索")}</span><button onClick={() => go("skills")}>{t("生活技能")}</button><button onClick={() => go("hardware")}>{t("随身设备")}</button><a href={waitlist}>{t("Buy")}</a></div><div><span>{t("更多")}</span><a href="/privacy">{t("隐私政策")}</a><a href="/contact">{t("成为技能作者")}</a></div></div><div className="rep-footer-copyright"><SeinMark /><p>{t("© 2026 Persein. 保留所有权利。")}</p></div></div><div className="rep-footer-wordmark" aria-hidden="true">Sein</div></footer>
  </div>;
}
