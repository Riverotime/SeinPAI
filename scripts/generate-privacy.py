from pathlib import Path
import re, html, json, hashlib
ROOT=Path(__file__).resolve().parents[1]
OUT=ROOT/'public/legal/privacy/v1.0'
SOURCE=ROOT/'content/privacy'
def inline(t):
 t=html.escape(t)
 t=re.sub(r'\*\*(.+?)\*\*',r'<strong>\1</strong>',t)
 t=re.sub(r'https://[^\s；，。<|]+',lambda m:'<a href="'+m[0]+'">'+m[0]+'</a>',t)
 return t

def render(md):
 lines=md.splitlines();parts=[];nav=[];i=0;n=0
 while i<len(lines):
  l=lines[i]
  if not l.strip():i+=1;continue
  if l.startswith('#'):
   level=len(l)-len(l.lstrip('#'));title=l[level:].strip()
   if level==2:
    n+=1;ident='section-'+str(n);nav.append((ident,title));parts.append(f'<h2 id="{ident}">{inline(title)}</h2>')
   else:parts.append(f'<h{level}>{inline(title)}</h{level}>')
   i+=1;continue
  if l.startswith('|'):
   rows=[]
   while i<len(lines) and lines[i].startswith('|'):
    cells=[x.strip() for x in lines[i].strip('|').split('|')]
    if not all(re.fullmatch(r'[:\- ]+',c) for c in cells):rows.append(cells)
    i+=1
   parts.append('<div class="table-wrap"><table><thead><tr>'+''.join('<th scope="col">'+inline(c)+'</th>' for c in rows[0])+'</tr></thead><tbody>'+''.join('<tr>'+''.join('<td>'+inline(c)+'</td>' for c in row)+'</tr>' for row in rows[1:])+'</tbody></table></div>');continue
  if l.startswith('> '):parts.append('<blockquote><p>'+inline(l[2:])+'</p></blockquote>');i+=1;continue
  if re.match(r'(- |\d+\. )',l):
   tag='ol' if re.match(r'\d+\.',l) else 'ul';items=[]
   while i<len(lines) and re.match(r'(- |\d+\. )',lines[i]):items.append('<li>'+inline(re.sub(r'^(- |\d+\. )','',lines[i]))+'</li>');i+=1
   parts.append('<'+tag+'>'+''.join(items)+'</'+tag+'>');continue
  para=[]
  while i<len(lines) and lines[i].strip():para.append(inline(lines[i].rstrip()));i+=1
  parts.append('<p>'+'<br>'.join(para)+'</p>')
 return ''.join(parts),nav


TITLE={'zh-Hans':'Sein 隐私政策','zh-Hant':'Sein 隱私政策','en':'Sein Privacy Policy','ja':'Sein プライバシーポリシー','ko':'Sein 개인정보 처리방침'}
NAME={'zh-Hans':'简体中文','zh-Hant':'繁體中文','en':'English','ja':'日本語','ko':'한국어'}
CSS=(SOURCE/'standalone.css').read_text()
for service in ['mainland','persein']:
 for code in TITLE:
  md=(SOURCE/(code+'.md')).read_text()
  if service=='persein' and code=='zh-Hans':
   md=md.replace('珀森文化（杭州）有限公司','Persein Inc.').replace('本版本适用于Persein Inc.提供的中国内地服务','本版本适用于 Persein Inc. 提供的服务')
  if service=='mainland' and code!='zh-Hans':md=md.replace('Persein Inc.','珀森文化（杭州）有限公司')
  controller='珀森文化（杭州）有限公司' if service=='mainland' else 'Persein Inc.'
  rendered,nav=render(md)
  body=rendered[rendered.index('<h2 '):]
  payload={'version':'1.0','language':code,'service':service,'controller':controller,'title':TITLE[code],'updated':'2026-10-31','html':body,'sections':[{'id':i,'title':t} for i,t in nav],'sourceHash':hashlib.sha256(md.encode()).hexdigest()}
  dest=OUT/service;dest.mkdir(parents=True,exist_ok=True)
  (dest/(code+'.json')).write_text(json.dumps(payload,ensure_ascii=False,separators=(',',':')))
  links=''.join('<a href="'+key+'.html" lang="'+key+'">'+name+'</a> ' for key,name in NAME.items())
  navhtml=''.join('<a href="#'+i+'">'+html.escape(t)+'</a>' for i,t in nav)
  page='<!DOCTYPE html><html lang="'+code+'"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>'+TITLE[code]+'</title><style>'+CSS+'</style></head><body><div class="layout"><aside class="sidebar"><div class="brand">Sein</div><nav>'+navhtml+'</nav></aside><main class="main"><header class="hero"><h1>'+TITLE[code]+'</h1><p>'+controller+'</p><p>'+links+'</p><a href="/privacy?service='+service+'&amp;lang='+code+'">Sein ↗</a></header><article class="document">'+rendered+'</article><footer class="footer"><a href="mailto:hi@seinpai.com">hi@seinpai.com</a></footer></main></div></body></html>'
  (dest/(code+'.html')).write_text(page)
print('Generated 10 operator/language variants: HTML + JSON')
