import { useState } from 'react';
import { ArrowUpRight, ArrowDown, AudioLines, BatteryFull, Check, ChevronDown, Feather, LockKeyhole, Menu, Mic, Sparkles, Usb, X } from 'lucide-react';
import { Button } from './ui/button';
import './SuixinpeiPage.css';

const asset = (name: string) => `/suixinpei/${name}`;
const gestures = [
  { name: '点一下', title: '捕捉此刻', description: '灵感、风景、突然想起的一句话。轻点一下，把值得留下的瞬间收进记忆。', status: '此刻，已收藏', icon: Sparkles },
  { name: '点两下', title: '开始录音', description: '一段对话，一次会议，或是自己的碎碎念。双击开始记录，专心投入眼前。', status: '正在记录你的声音', icon: Mic },
  { name: '长按', title: '唤醒你的 AI', description: '直接开启 AI 对话，或调用 OpenClaw。你的随身顾问，也是你的贾维斯。', status: '我在，随时为你', icon: AudioLines },
];
const questions = [
  ['没有网络，还可以使用吗？', '可以。离线也能录音、转写，本地转录不限量，无需等待云端。AI 对话等在线功能需要网络连接。'],
  ['一颗按钮，分别怎么操作？', '点一下捕捉此刻；点两下开始录音；长按直接开启 AI 对话，或调用 OpenClaw。'],
  ['需要为每次转写付费吗？', '本地录音与转写属于免费基础功能。AI 功能付费，具体方案将在产品正式开放时公布。'],
  ['可以怎么佩戴？', '挂脖、夹衣或揣兜，都随你。约 30 克的轻巧机身，为随身携带而设计。'],
  ['续航和充电方式是什么？', '设计标注为 8 小时续航，使用通用 USB-C 接口充电。实际续航随使用方式而变化。'],
];

export default function SuixinpeiPage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [gesture, setGesture] = useState(0);
  const active = gestures[gesture];
  const ActiveIcon = active.icon;
  const closeMenu = () => setMenuOpen(false);

  return (
    <div className="sxp" lang="zh-CN">
      <a className="sxp-skip" href="#sxp-main">跳至内容</a>
      <header className="sxp-header">
        <a href="#sxp-top" className="sxp-brand" aria-label="随心佩首页"><span className="sxp-brand-symbol">s.</span><span>随心佩<span className="sxp-brand-en">SEIN</span></span></a>
        <nav id="sxp-mobile-nav" className={menuOpen ? 'sxp-nav is-open' : 'sxp-nav'} aria-label="页面导航">
          <a href="#sxp-story" onClick={closeMenu}>认识随心佩</a><a href="#sxp-features" onClick={closeMenu}>随身魔法</a><a href="#sxp-details" onClick={closeMenu}>产品细节</a><a href="#sxp-faq" onClick={closeMenu}>常见问题</a>
        </nav>
        <Button asChild className="sxp-cta sxp-header-cta"><a href="/waitlist">期待相遇 <ArrowUpRight size={15} /></a></Button>
        <Button variant="ghost" size="icon" className="sxp-menu" aria-label={menuOpen ? '关闭导航' : '打开导航'} aria-expanded={menuOpen} aria-controls="sxp-mobile-nav" onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X /> : <Menu />}</Button>
      </header>
      <main id="sxp-main">
        <section className="sxp-hero" id="sxp-top" data-node-id="2319:14266">
          <p className="sxp-eyebrow"><span /> 随心而行，记你所想</p>
          <h1>你的随身 <span>AI 顾问</span></h1>
          <p className="sxp-hero-sub">轻轻一戴，让生活自成篇章。</p>
          <div className="sxp-hero-image"><img src={asset('hero.png')} alt="手指轻托白色随心佩，展示小巧的随身机身" width="1024" height="1024" loading="eager" data-node-id="2315:14067" /></div>
          <div className="sxp-hero-bottom"><span>小小一枚，装下你的每一天。</span><a href="#sxp-story" aria-label="向下探索随心佩"><ArrowDown size={18} /></a><span>记录生活 · 发现自己</span></div>
        </section>

        <section className="sxp-intro sxp-section" id="sxp-story">
          <p className="sxp-eyebrow">A LITTLE CLOSER TO YOU</p>
          <h2>生活，值得被记得。<br /><span>而你，值得全心投入。</span></h2>
          <p>不用急着拿出手机，不用打断眼前的对话。<br />随心佩默默倾听、整理、归档，<br className="sxp-mobile-break" />把那些一闪而过的瞬间，变成属于你的记忆。</p>
          <div className="sxp-intro-tags"><span><Feather size={15} /> 轻盈随身</span><span><AudioLines size={15} /> 本地转录</span><span><Sparkles size={15} /> AI 懂你</span></div>
        </section>

        <section className="sxp-features sxp-section" id="sxp-features">
          <div className="sxp-section-heading"><div><p className="sxp-eyebrow">EVERYDAY, A LITTLE MAGIC</p><h2>随心佩，<br />把日常变成珍藏。</h2></div><p>你只管生活。<br />剩下的，交给随心佩。</p></div>
          <div className="sxp-bento">
            <article className="sxp-card sxp-diary" data-node-id="2319:14169"><div className="sxp-card-copy"><span className="sxp-card-index">01 / 记录</span><h3>为你自动撰写日记</h3><p>不用你亲自动笔的日记。随心佩倾听、整理、归档。你的生活，自动记录，为你谱写人生传记。</p></div><div className="sxp-journal" aria-label="自动日记界面示意"><div className="sxp-journal-top"><span>今天的篇章</span><Sparkles size={15} /></div><span className="sxp-journal-date">一个值得记住的日子</span><h4>在忙碌里，<br />遇见生活的小小回声。</h4><p>上午的灵感，午后的一场对话，还有回家路上的念头。平凡的日常，也有值得被记住的光。</p><div className="sxp-journal-line" /><div className="sxp-journal-tags"><span>生活碎片</span><span>今日心情</span></div><span className="sxp-demo-label">日记示意</span></div></article>
            <article className="sxp-card sxp-transcribe" data-node-id="2319:14165"><span className="sxp-card-index">02 / 倾听</span><div className="sxp-wave" aria-hidden="true">{[12,24,38,22,50,68,36,56,28,44,18,30,14].map((height,i)=><i key={i} style={{height}} />)}</div><h3>免费本地转录</h3><p>本地转录，无限量。<br />无需等待云端。</p><span className="sxp-small-pill"><span /> OFFLINE, ALWAYS READY</span></article>
            <article className="sxp-card sxp-memory" data-node-id="2319:14164"><span className="sxp-card-index">03 / 记忆</span><div className="sxp-memory-dots" aria-hidden="true"><span /><span /><span /><span /><span /></div><h3>记翼，你的记忆翅膀</h3><p>你只管说，随心佩来整理——措辞、语气、情绪。音频即阅即焚，只留下属于你的笔记。</p><LockKeyhole size={19} className="sxp-memory-lock" /></article>
          </div>
        </section>

        <section className="sxp-magic sxp-section" aria-labelledby="sxp-magic-title">
          <div className="sxp-magic-visual"><img src={asset('device.png')} alt="黑色随心佩机身与侧面细节" width="1024" height="640" loading="lazy" /><div className="sxp-live-status" key={gesture}><ActiveIcon size={16} /><span>{active.status}</span><span className="sxp-live-dot" /></div></div>
          <div className="sxp-magic-copy"><p className="sxp-eyebrow">ONE BUTTON. MORE POSSIBILITIES.</p><h2 id="sxp-magic-title">一颗按键，<br />三种随心。</h2><p>把复杂的事，变成一个简单的动作。</p><div className="sxp-gesture-tabs" role="tablist" aria-label="魔法按钮手势">{gestures.map((item,i)=><Button key={item.name} variant="ghost" id={`sxp-tab-${i}`} role="tab" aria-selected={gesture===i} aria-controls="sxp-gesture-panel" tabIndex={gesture===i?0:-1} className={gesture===i?'is-active':''} onClick={()=>setGesture(i)} onKeyDown={e=>{if(['ArrowRight','ArrowLeft','Home','End'].includes(e.key)){e.preventDefault();const next=e.key==='Home'?0:e.key==='End'?2:(gesture+(e.key==='ArrowRight'?1:2))%3;setGesture(next);document.getElementById(`sxp-tab-${next}`)?.focus();}}}>{item.name}</Button>)}</div><div id="sxp-gesture-panel" role="tabpanel" aria-labelledby={`sxp-tab-${gesture}`} className="sxp-gesture-panel"><h3>{active.title} <ArrowUpRight size={20} /></h3><p>{active.description}</p></div><span className="sxp-demo-label">点击手势，查看功能演示</span></div>
        </section>

        <section className="sxp-details sxp-section" id="sxp-details">
          <div className="sxp-centered-heading"><p className="sxp-eyebrow">SMALL IN SIZE. BIG ON LIFE.</p><h2>不止这些。</h2><p>每一个小细节，都为陪你更久一点。</p></div>
          <div className="sxp-detail-grid"><article><span className="sxp-detail-number">10<span>秒</span></span><h3>留住刚刚的精彩</h3><p>想起要录的时候，前 10 秒音频已经录好了。</p></article><article><span className="sxp-detail-number">30<span>克</span></span><h3>轻到忘记它在</h3><p>挂脖、夹衣、揣兜，随你。你的日常，它都合拍。</p></article><article><span className="sxp-detail-number">8<span>小时</span></span><h3>陪你一整天</h3><p>从出门到归家，让灵感和记忆始终在线。</p></article></div>
          <div className="sxp-detail-bottom"><article><span className="sxp-detail-icon"><Sparkles size={24} /></span><div><h3>环境感知</h3><p>不止拍照，还能感知。让 AI 懂得你所在的场景。</p></div></article><article><span className="sxp-detail-icon"><Usb size={24} /></span><div><h3>USB-C 充电</h3><p>通用接口，随便找根线就能充。</p></div></article><article><span className="sxp-detail-icon"><BatteryFull size={24} /></span><div><h3>随心佩戴</h3><p>小巧机身，无感连接，轻轻一戴就出发。</p></div></article></div>
        </section>

        <section className="sxp-free sxp-section"><div><p className="sxp-eyebrow">YOURS, FROM THE VERY START</p><h2>基础免费，<br /><span>AI 随需而选。</span></h2><p>离线也能录音、转写。<br />日常记录，自在拥有。</p></div><div className="sxp-plan"><div className="sxp-plan-top"><span>随身记录</span><span>基础功能</span></div><h3>免费<span> / 本地使用</span></h3><ul><li><Check size={17} /> 本地录音</li><li><Check size={17} /> 无限量本地转写</li><li><Check size={17} /> 离线也能记录</li></ul><div className="sxp-plan-note"><Sparkles size={17} /><p>AI 功能按需付费<br /><span>具体方案将在正式开放时公布</span></p></div></div></section>

        <section className="sxp-faq sxp-section" id="sxp-faq"><div><p className="sxp-eyebrow">A FEW THINGS TO KNOW</p><h2>你或许还想知道。</h2></div><div className="sxp-faq-list">{questions.map(([question,answer],i)=><details key={question}><summary><span className="sxp-faq-index">0{i+1}</span>{question}<ChevronDown size={18} /></summary><p>{answer}</p></details>)}</div></section>

        <section className="sxp-ending"><p className="sxp-eyebrow">YOUR LIFE, BEAUTIFULLY REMEMBERED.</p><h2>赛博贴身玉佩。</h2><p className="sxp-ending-lines">不是记录仪。不是转写工具。<br />是第一个真正属于你的个人 AI。</p><div className="sxp-ending-mark"><img src={asset('ca78a.svg')} alt="随心佩品牌标志" width="144.491" height="144.491" loading="lazy" data-node-id="2319:14195" /></div><h3>随心佩</h3><p className="sxp-ending-description">一枚常伴左右的赛博挂件。轻轻一戴，无感连接，<br />替你默默记录生活、整理思绪、追踪情绪、发现自己。</p><Button asChild className="sxp-cta sxp-ending-cta"><a href="/waitlist">期待与你相遇 <ArrowUpRight size={17} /></a></Button><span className="sxp-expecting">Expecting</span></section>
      </main>
      <footer className="sxp-footer"><a className="sxp-brand" href="#sxp-top"><span className="sxp-brand-symbol">s.</span>随心佩</a><span>随心而行，记你所想。</span><div><a href="/privacy">隐私政策</a><a href="/contact">联系我们</a><span>© {new Date().getFullYear()} Sein</span></div></footer>
    </div>
  );
}
