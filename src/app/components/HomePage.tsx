import { useRef, useState } from "react";
import { ArrowRight, ChevronDown, ChevronLeft, ChevronRight, Menu, X } from "lucide-react";
import device from "@/assets/46ba4aeb2e54923f5b128714d60aaecdd7b4bcac.png";
import baby from "@/assets/8a250fef6b7394ac221237cbc3275b1f3991b611.png";
import family from "@/assets/9d7e53572b328d4399f242954cd93336f071028d.png";
import life from "@/assets/d705a77bdbb56d27bead2973827da1ff99167073.png";
import work from "@/assets/979c9c445552d810fb1dceee7d75c334a662503c.png";
import walk from "@/assets/9cdb6686ea43b66a3051eb8d816e31a001b27d77.png";
import heroPhoto from "@/assets/sein/hero-documentary.png";
import gardenPhoto from "@/assets/sein/garden-motion.png";
import "./HomePage.css";

const waitlist = "/waitlist";
const skills = [
  { name: "婴儿照护", image: baby, scene: "刚哄睡宝宝，你终于能坐下来喝一口水。", ask: "这两天他怎么总是睡一小会儿就醒？", reply: "我留意到，宝宝这三天的小睡比平时平均短了约 40 分钟。要不要一起看看喂奶与入睡时间有没有变化？", finds: ["喂养、睡眠与情绪之间的变化", "容易被忙碌掩盖的照护规律", "值得带去咨询专业人士的问题"], author: "儿科与婴幼儿照护领域的专业人士" },
  { name: "儿童教育", image: family, scene: "放学路上，孩子又说今天不想聊学校。", ask: "我是不是问得太多了？", reply: "最近你们聊到学校时，他常会先说“没什么”；聊到朋友时却会主动多说几句。今晚可以从那个朋友的话题开始。", finds: ["孩子愿意主动聊的话题", "亲子交流中的情绪转折", "适合继续追问或暂停的时刻"], author: "儿童发展与家庭教育领域的专业人士" },
  { name: "亲密关系", image: family, scene: "一次小争执结束后，你们都安静了下来。", ask: "我们为什么总在这件事上吵？", reply: "你们最近几次谈到家务时，讨论都从安排变成了“谁更辛苦”。也许可以先说说各自最需要被理解的部分。", finds: ["反复出现的沟通模式", "没被说出口的需求", "更适合开启对话的时机"], author: "关系咨询与心理健康领域的专业人士" },
  { name: "时间记录", image: work, scene: "一天结束了，你却想不起时间都去了哪里。", ask: "我今天到底忙了什么？", reply: "你上午的时间主要花在两次讨论和一段临时沟通上。原本想推进的方案，是在下午才真正开始的。", finds: ["时间实际流向了哪里", "反复打断专注的事情", "值得留下的决定与承诺"], author: "效率教练与工作方式研究者" },
  { name: "自我成长", image: walk, scene: "散步时，你又想起那个迟迟没有开始的计划。", ask: "我怎么总是坚持不下来？", reply: "过去几周，你每次提起这个计划都很有热情，但总想一次做得很完整。我们先把第一步缩小到十分钟，好吗？", finds: ["不断重复的想法与阻力", "真正让你有能量的事", "可以今天开始的小行动"], author: "心理学与个人成长领域的专业人士" },
  { name: "创业", image: work, scene: "刚和用户聊完，你脑中还有许多零散的反馈。", ask: "这次访谈有什么值得注意？", reply: "这是本周第 4 次有人提到“第一次上手太复杂”。他们用词不同，但卡住的位置相同。要不要把它列为下轮验证重点？", finds: ["用户反馈中的重复信号", "重要讨论里尚未落实的决定", "假设与真实观察之间的差距"], author: "创业者与产品实践者" },
  { name: "生活规划", image: life, scene: "晚饭后，你想把家里那些悬着的事情理一理。", ask: "下周有什么需要提前安排？", reply: "你提到周三要带孩子复诊，周五有家庭聚会。周三的交通安排还没定，要不要现在留出时间处理？", finds: ["散落在对话里的待办", "彼此冲突的家庭安排", "重要事项之前的准备窗口"], author: "生活管理与家庭服务领域的专业人士" },
];
const moments = [
  ["07:10", "婴儿照护", "比闹钟更早的早晨", "“这几天宝宝醒得更早了。也许可以先看昨晚的入睡时间。”"],
  ["08:40", "生活规划", "出门前的一句提醒", "“周三复诊需要带上上次的检查记录。”"],
  ["10:30", "创业", "听见重复出现的信号", "“这是本周第 4 次有人提到上手太复杂。”"],
  ["13:20", "时间记录", "给忙碌一个轮廓", "“上午有两次讨论占用了原定的深度工作时间。”"],
  ["17:50", "儿童教育", "放学路上的小线索", "“今天他主动提起了新朋友，可以从这里继续聊。”"],
  ["20:15", "亲密关系", "一次更好的开口", "“先说感受，也许比先谈分工更容易听见彼此。”"],
  ["23:00", "自我成长", "在一天结束前", "“那个想了很久的计划，明天先做十分钟。”"],
];
const faq = [
  ["Sein 会一直保存我身边的声音吗？", "默认不会保存原始音频。Sein 优先在设备本地处理信息；当你主动双击保存录音时，LED 会亮起。"],
  ["我需要一次安装全部技能吗？", "不用。你可以从眼下最需要的技能开始，再按生活的变化选择其他技能。"],
  ["示例中的数字是真实用户数据吗？", "不是。页面中的时间、次数和数值仅用于演示 Sein 可能如何发现规律，不代表真实用户或实际效果。"],
  ["如何加入 Waitlist？", "点击 Join the waitlist，在候补页面通过邮件申请。请在邮件应用中发送申请，打开草稿不代表已经加入。"],
  ["加入候补名单需要付费吗？", "不需要。加入候补名单不涉及付款，也不构成购买承诺。"],
  ["什么时候可以体验？", "开放体验和发售时间尚未公布。可加入候补名单，关注后续产品消息。"],
];
const roles = ["儿科与婴幼儿照护", "儿童发展与家庭教育", "关系咨询与心理健康", "效率教练与工作方式", "创业与产品实践", "生活管理与家庭服务"];

function CTA({ children, light = false }: { children: React.ReactNode; light?: boolean }) {
  return <a className={"sein-cta" + (light ? " sein-cta-light" : "")} href={waitlist}>{children}<ArrowRight size={17} aria-hidden="true" /></a>;
}

export default function HomePage() {
  const [active, setActive] = useState(0);
  const [open, setOpen] = useState<number | null>(0);
  const [menu, setMenu] = useState(false);
  const timeline = useRef<HTMLDivElement>(null);
  const skill = skills[active];
  const go = (id: string) => { document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }); setMenu(false); };
  return <div className="sein-page">
    <header className="sein-header"><div className="sein-header-inner">
      <a className="sein-logo" href="/" aria-label="Sein 首页">Sein<span>PAI</span></a>
      <nav className={"sein-nav" + (menu ? " is-open" : "")} aria-label="首页导航">
        <button onClick={() => go("how")}>如何运作</button><button onClick={() => go("skills")}>顾问技能</button><button onClick={() => go("hardware")}>认识设备</button><button onClick={() => go("faq")}>常见问题</button><CTA>Join the waitlist</CTA>
      </nav>
      <button className="sein-menu-button" onClick={() => setMenu(!menu)} aria-label={menu ? "关闭菜单" : "打开菜单"} aria-expanded={menu}>{menu ? <X /> : <Menu />}</button>
    </div></header>
    <main>
      <section className="sein-hero"><div className="sein-hero-copy">
        <p className="sein-kicker">随身的个人 AI 顾问</p><h1>一位懂你的顾问，<br />一直在你身边。</h1>
        <p className="sein-lede">戴上 Sein，让那些容易错过的细节，慢慢变成更懂你生活的提醒。</p>
        <div className="sein-hero-actions"><CTA>Join the waitlist</CTA><button className="sein-text-link" onClick={() => go("skills")}>看看它能做什么 <ArrowRight size={17} /></button></div>
        <p className="sein-hero-note">加入候补名单，获取开放体验与产品进展通知</p>
      </div><div className="sein-hero-visual" aria-label="Sein 设备与主动发现提醒示意">
        <div className="sein-hero-orbit" /><img className="sein-device" src={device} alt="手持白色 Sein PAI 设备" />
        <div className="sein-insight insight-one"><span className="sein-pulse" />刚刚发现<p>宝宝这三天的小睡都短了约 40 分钟</p></div>
        <div className="sein-insight insight-two"><span className="sein-pulse" />刚刚发现<p>你本周第 4 次提到这个产品问题</p></div>
        <div className="sein-insight insight-three"><span className="sein-pulse" />温柔提醒<p>周三复诊，记得带上检查记录</p></div>
      </div><p className="sein-demo-note">页面中的提示、时间与数字均为演示示例。</p></section>
      <div className="sein-skill-strip" aria-label="Sein 的七种顾问技能"><div>{[...skills, ...skills].map((item, i) => <span key={i}>{item.name}<i /></span>)}</div></div>
      <section className="sein-intro sein-container"><h2>生活里最重要的事，<br />往往没有说明书。</h2><div><span className="sein-small-rule" /><p>养育一个孩子，理解一个人，找回自己的节奏。那些问题不会总在你准备好的时候出现。Sein 从你已经在过的生活里，帮你看见线索。</p></div></section>
      <section className="sein-how" id="how"><div className="sein-container"><div className="sein-section-heading"><p className="sein-kicker">如何运作</p><h2>三步，让理解发生在日常里。</h2></div><div className="sein-how-grid">
        <article><span>01</span><div className="sein-step-icon">◌</div><h3>戴上它</h3><p>吊坠、夹子、别针，选一种适合今天的戴法。Sein 陪你进入真实的生活场景。</p></article>
        <article><span>02</span><div className="sein-step-icon">✳</div><h3>装上技能</h3><p>从婴儿照护到创业，选择眼下最需要的顾问技能，给 Sein 一个理解你的方向。</p></article>
        <article><span>03</span><div className="sein-step-icon">↗</div><h3>它会主动提醒你</h3><p>当重复的规律或重要的变化出现，Sein 会及时给你一个值得留意的提示。</p></article>
      </div></div></section>
      <section className="sein-skills sein-container" id="skills"><div className="sein-section-heading sein-skills-heading"><div><p className="sein-kicker">顾问技能</p><h2>你正在经历什么，<br />就从哪里开始。</h2></div><p>每一种技能，都为一种真实的生活问题而设计。点击查看 Sein 可能如何与你对话。</p></div>
        <div className="sein-skill-tabs" role="tablist" aria-label="选择顾问技能">{skills.map((s, i) => <button key={s.name} role="tab" id={"skill-tab-" + i} aria-selected={i === active} aria-controls="skill-panel" className={i === active ? "is-active" : ""} onClick={() => setActive(i)}><span>{String(i + 1).padStart(2, "0")}</span>{s.name}</button>)}</div>
        <div className="sein-skill-panel" id="skill-panel" role="tabpanel" aria-labelledby={"skill-tab-" + active} key={skill.name}>
          <div className="sein-skill-story"><div className="sein-skill-image"><img src={skill.image} alt="日常生活场景" className={active === 6 ? "sein-crop-top" : ""} /></div><div className="sein-skill-image-caption"><span>一个真实场景</span><p>{skill.scene}</p></div></div>
          <div className="sein-skill-detail"><p className="sein-skill-count">技能 {String(active + 1).padStart(2, "0")} / 07</p><h3>{skill.name}</h3><div className="sein-dialogue"><div><span>你说</span><p>“{skill.ask}”</p></div><div className="sein-reply"><span>Sein 回应</span><p>“{skill.reply}”</p></div></div><div className="sein-discover"><h4>它能帮你发现</h4><ul>{skill.finds.map((x) => <li key={x}>{x}</li>)}</ul></div><p className="sein-author">由{skill.author}参与设计</p></div>
        </div><p className="sein-skills-note">对话为功能演示，具体建议因个人情况而异，不能替代专业诊断或咨询。</p>
      </section>
      <section className="sein-proactive"><div className="sein-container sein-proactive-inner"><div><p className="sein-kicker">主动发现</p><h2>最重要的问题，<br />往往是你没问出口的那个。</h2><p>你不需要知道该问什么。Sein 会留意那些多次出现、悄悄变化、值得重新看一眼的事，再把提醒交还给你。</p></div><div className="sein-dark-card"><span className="sein-pulse" />刚刚发现<p>你最近三次提到“没时间休息”，都发生在同一种忙碌的下午。</p><small>要不要一起看看，那段时间里发生了什么？</small></div></div></section>
      <section className="sein-day sein-container"><div className="sein-section-heading sein-day-heading"><div><p className="sein-kicker">和 Sein 一起的一天</p><h2>一天很长，<br />重要的细节很轻。</h2></div><div className="sein-carousel-controls"><button onClick={() => timeline.current?.scrollBy({ left: -330, behavior: "smooth" })} aria-label="查看前一个时刻"><ChevronLeft /></button><button onClick={() => timeline.current?.scrollBy({ left: 330, behavior: "smooth" })} aria-label="查看后一个时刻"><ChevronRight /></button></div></div><div className="sein-timeline" ref={timeline} tabIndex={0} aria-label="横向滚动查看一天中的提醒">{moments.map((m) => <article key={m[0]}><div className="sein-timeline-time">{m[0]}</div><div className="sein-timeline-dot" /><span>{m[1]}</span><h3>{m[2]}</h3><p>{m[3]}</p></article>)}</div><p className="sein-day-hint">左右滑动，看看 Sein 如何陪你走过一天 <ArrowRight size={16} /></p></section>
      <section className="sein-authors"><div className="sein-container sein-authors-inner"><div><p className="sein-kicker">技能作者</p><h2>好的建议，<br />来自真正懂这一领域的人。</h2><p>我们希望每一种技能，都有专业知识作为起点，再在真实的日常里变得有用。</p><a href="/contact" className="sein-outline-link">成为技能作者 <ArrowRight size={17} /></a></div><div className="sein-author-list">{roles.map((role, i) => <div key={role}><span>{String(i + 1).padStart(2, "0")}</span><p>{role}</p><ArrowRight size={17} /></div>)}</div></div></section>
      <section className="sein-hardware sein-container" id="hardware"><div className="sein-hardware-visual"><div className="sein-hardware-glow" /><img src={device} alt="Sein PAI 白色可穿戴设备" /></div><div className="sein-hardware-copy"><p className="sein-kicker">认识设备</p><h2>放在身上，<br />把注意力还给生活。</h2><p>Sein 是一枚轻巧的随身设备。你可以把它佩在胸前、夹在衣服上，或用别针固定，让它自然地融入每天。</p><dl>
        <div><dt>佩戴方式</dt><dd>吊坠 / 夹子 / 别针</dd></div><div><dt>音频</dt><dd>默认不保存；主动保存录音时 LED 亮起</dd></div><div><dt>信息处理</dt><dd>优先在设备本地处理</dd></div><div><dt>隐私保护</dt><dd>记录内容加密</dd></div><div><dt>影像</dt><dd>支持拍照与录像；具体功能以最终产品说明为准</dd></div>
      </dl><p className="sein-spec-note">加入候补名单，关注后续产品进展。</p></div></section>
      <section className="sein-privacy"><div className="sein-container sein-privacy-inner"><div><p className="sein-kicker">隐私</p><h2>你的生活，<br />由你决定留下什么。</h2></div><div><p>Sein 默认不保存原始音频，先在设备本地处理信息。只有你主动保存录音时，LED 才会亮起。记录内容会加密保护。</p><a href="/privacy" className="sein-text-link">查看隐私说明 <ArrowRight size={17} /></a></div></div></section>
      <section className="sein-faq sein-container" id="faq"><div className="sein-section-heading"><p className="sein-kicker">常见问题</p><h2>你可能还想知道。</h2></div><div className="sein-faq-list">{faq.map((item, i) => <div className="sein-faq-item" key={item[0]}><button onClick={() => setOpen(open === i ? null : i)} aria-expanded={open === i}><span>{item[0]}</span><ChevronDown size={19} className={open === i ? "is-open" : ""} /></button>{open === i && <p>{item[1]}</p>}</div>)}</div></section>
      <section className="sein-final"><div className="sein-container"><p className="sein-kicker">让理解，从今天开始</p><h2>有人陪你看见，<br />生活就多了一种可能。</h2><CTA light>Join the waitlist</CTA><p>加入候补名单，获取开放体验与产品进展通知</p></div></section>
    </main>
    <footer className="sein-footer"><div className="sein-container"><div className="sein-footer-top"><a className="sein-logo" href="/">Sein<span>PAI</span></a><p>一位懂你的顾问，一直在你身边。</p></div><div className="sein-footer-bottom"><span>© 2026 Persein</span><nav aria-label="页脚导航"><a href="/about">关于我们</a><a href="/contact">联系我们</a><a href="/privacy">隐私政策</a><a href={waitlist}>Waitlist</a></nav></div></div></footer>
  </div>;
}
