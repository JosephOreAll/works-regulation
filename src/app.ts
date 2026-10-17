/*
 * Joseph Oreall - Research Workspace
 * TypeScript client application. All charts and geographic interactions are
 * drawn with accessible SVG/HTML, and all data originate from bundled research.
 * No third-party runtime dependency and no server-side collection of user data.
 */

type ProjectId = 'pacifico' | 'hhi' | 'peru';
type TabId = 'mapa' | 'lectura' | 'introduccion' | 'marco' | 'antecedentes' | 'datos' | 'resultados' | 'discusion' | 'conclusiones' | 'materiales';
type Metric = 'revenue' | 'teu' | 'vessels';
type LitKind = 'all' | 'antecedente' | 'teoria';

type GeoCountry = {name:string;path:string;bounds:[number,number,number,number]};
type Port = {code:string;name:string;country:string;lat:number;lon:number;locationSource:string;quarterValues:Record<string,number>;start:number;end:number;relativeTrend:number};
type Literature = {id:string;project:ProjectId;kind:string;number:number;title:string;authors:string;journal:string;doi:string|null;year:string|null;summary:string;cover:string|null;poster:string|null;source:string|null;status?:string;note:string;sections?:Record<string,string>;quartile?:string|null;quartileSource?:string|null;quartileNote?:string|null;originalEncrypted?:string|null;esEncrypted?:string|null;theoryExcerpt?:string;coverNote?:string;titleOriginal?:string};
type IncomeRow = {op:string;month:string;revenue:number;teu:number;vessels:number};
type Coefficient = {variable:string;value:number;lo:number;hi:number;p:number};
type DataBundle = {
  ports:{quarters:string[];ports:Port[];source:string};
  countries:{countries:GeoCountry[];attribution:string};
  literature:{items:Literature[];covers:number};
  income:{rows:IncomeRow[];coefficients:Coefficient[];source:string};
  hhi:{compare:{period:string;hhi:number}[];decomposition:{name:string;pct:number}[];shapleyEntry:number;ar2:number;lo95:number;hi95:number;normalized:number[];source:string};
};
type NotebookCell = {cell_type:string;source:string[]|string;metadata?:Record<string,unknown>};
type Notebook = {cells:NotebookCell[]};
interface Window { __JO_DATA__?: DataBundle; __JO_NOTEBOOKS__?: Partial<Record<ProjectId,Notebook>>; }
type Rect = {x:number;y:number;w:number;h:number};

type ProjectMeta={
  id:ProjectId;index:string;category:string;title:string;short:string;period:string;
  accent:string;scope:string;counts:string;studyTitle:string;paper:string;repo:string;
};
const PROJECTS:Record<ProjectId,ProjectMeta>={
 pacifico:{id:'pacifico',index:'01',category:'REDES MAR\u00cdTIMAS',title:'Conectividad marítima de Chancay y los puertos del Pacífico sudamericano durante 2025–2026',short:'Chancay y los puertos del Pac\u00edfico sudamericano',period:'2025 - 2026',accent:'teal',scope:'14 puertos / 4 pa\u00edses',counts:'98 observaciones',studyTitle:'Conectividad mar\u00edtima de Chancay y los puertos del Pac\u00edfico sudamericano durante 2025\u20132026',paper:'pacifico.pdf',repo:'https://github.com/JosephOreAll/research_regulation-Pacificports'},
 hhi:{id:'hhi',index:'02',category:'ORGANIZACI\u00d3N INDUSTRIAL',title:'Entrada de Chancay y desconcentración del tráfico de contenedores en la costa central peruana',short:'Entrada de Chancay y desconcentraci\u00f3n del tr\u00e1fico de contenedores',period:'2015 - 2026',accent:'blue',scope:'3 terminales',counts:'HHI / AR(2)',studyTitle:'Entrada de Chancay y desconcentraci\u00f3n del tr\u00e1fico de contenedores en la costa central peruana',paper:'hhi.pdf',repo:'https://github.com/lizzie-bartolo/research_regulation-hhi'},
 peru:{id:'peru',index:'03',category:'ECONOMETR\u00cdA APLICADA',title:'Actividad portuaria e ingresos de terminales concesionados en el Perú durante 2014–2026',short:'Terminales concesionados en el Per\u00fa',period:'2014 - 2026',accent:'coral',scope:'3 operadores',counts:'450 cambios mensuales',studyTitle:'Actividad portuaria e ingresos de terminales concesionados en el Per\u00fa durante 2014\u20132026',paper:'peru.pdf',repo:'https://github.com/JosephOreAll/research_regulation-PeruvianPorts'}
};
const AUTHORS='Lizzie Gimena Bartolo Artica, Patricia Goetendia Limache, Bridgit Manani Carri\u00f3n y Joseph Manuel Orellana Allpoc';
const COUNTRY_LABELS=['Todos','Peru','Chile','Colombia','Ecuador'];
const COUNTRY_ES:Record<string,string>={Peru:'Per\u00fa',Chile:'Chile',Colombia:'Colombia',Ecuador:'Ecuador'};
const ICONS:Record<string,string>={
 arrow:'<path d="M5 12h14m-6-6 6 6-6 6"/>', back:'<path d="m15 18-6-6 6-6"/>',
 pin:'<path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z"/><circle cx="12" cy="10" r="2.5"/>',
 link:'<path d="M8 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-3M13 3h8v8m0-8-9 9"/>',
 download:'<path d="M12 3v12m-5-5 5 5 5-5M4 17v4h16v-4"/>',
 book:'<path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2Z"/>',
 layers:'<path d="m12 2 9 5-9 5-9-5 9-5Zm-9 10 9 5 9-5M3 17l9 5 9-5"/>',
 code:'<path d="m8 17-5-5 5-5m8 0 5 5-5 5M14 4l-4 16"/>',
 search:'<circle cx="11" cy="11" r="7"/><path d="m20 20-4-4"/>',
 plus:'<path d="M12 5v14M5 12h14"/>', minus:'<path d="M5 12h14"/>',
 reset:'<path d="M3 12a9 9 0 1 0 2.6-6.4M3 3v7h7"/>',
 clock:'<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 3"/>',
 chart:'<path d="M3 3v18h18M7 16l4-6 4 3 5-8"/>',
 chevron:'<path d="m7 10 5 5 5-5"/>', menu:'<path d="M4 7h16M4 12h16M4 17h16"/>',
 close:'<path d="M5 5l14 14M19 5 5 19"/>',copy:'<rect x="8" y="8" width="13" height="13" rx="2"/><path d="M4 16V5a2 2 0 0 1 2-2h11"/>',
 check:'<path d="m4 12 6 6L20 6"/>',lock:'<rect x="5" y="10" width="14" height="11" rx="2"/><path d="M8 10V7a4 4 0 0 1 8 0v3"/>'
};
function icon(name:string,size=18){return `<svg width="${size}" height="${size}" viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.65" stroke-linecap="round" stroke-linejoin="round">${ICONS[name]||ICONS.arrow}</svg>`}
const html=(v:unknown):string=>String(v??'').replace(/[&<>"']/g,ch=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]||ch));
const es=(n:number,decimals=1):string=>new Intl.NumberFormat('es-PE',{minimumFractionDigits:decimals,maximumFractionDigits:decimals}).format(n);
const short=(s:string,length=140)=>s.length<=length?s:s.slice(0,length).replace(/\s+\S*$/,'')+'\u2026';
const link=(href:string,text:string,cls='')=>`<a href="${html(href)}" target="_blank" rel="noopener noreferrer" class="${cls}">${text}${icon('link',13)}</a>`;
const getUrl=(url:string)=>new URL(url.replace(/^\//,''),window.location.href.split('#')[0]);
let DB:DataBundle;
const notebooks:Partial<Record<ProjectId,Notebook>>={};
let notebookLoading:Partial<Record<ProjectId,boolean>>={};
let selected: {project:ProjectId|null;tab:TabId}={project:null,tab:'mapa'};
let currentCountry='Todos';let currentPort='PECHY';let currentQuarter='2026T3';
let selectedOperator='APM';let selectedMetric:Metric='revenue';
let litSearch='';let litKind:LitKind='all';let litCount=80;
let notebookVisible=8;let mobileOpen=false;
let expandedLitId:string|null=null;let domesticPort='';let domesticZoom=false;let gatedId:string|null=null;let gatedKind:'original'|'es'='original';
let mapRect:Rect={x:-103,y:-16,w:81,h:82};
let mapDragging:{x:number;y:number;rect:Rect;active:boolean}|null=null;
let mapAnimation:number|undefined;
const app=document.getElementById('app')!;

function navigation():string{
 const current=selected.project;
 return `<header class="topbar"><div class="container topbar-inner">
 <a class="brand" href="#/" aria-label="Inicio"><img src="./assets/branding/monogram-header.png" alt="Monograma JO" class="brand-mark"/><span class="brand-name">Joseph Oreall<small>Research Workspace</small></span></a>
 <nav class="navlinks ${mobileOpen?'mobile-active':''}" aria-label="Menú"><a href="#/" class="${!current?'active':''}">Inicio</a><a href="#/" data-scroll-to="projects">Investigaciones</a>${current?`<a href="#/investigacion/${current}/mapa" class="${selected.tab==='mapa'?'active':''}">Mapa</a>`:''}</nav>
 <div class="nav-actions"><img class="signature-top" src="./assets/branding/signature.png" alt="Firma de Joseph Oreall"/><button class="mobile-button" data-action="mobile" aria-label="Abrir menú">${icon(mobileOpen?'close':'menu',21)}</button></div>
 </div></header>`;
}
function footer():string{
 return `<footer class="footer"><div class="container footer-inner"><div><img class="footer-symbol" src="./assets/branding/monogram-header.png" alt="JO"/><span>Joseph Oreall<small>Universidad Nacional del Centro del Perú</small></span></div><div class="footer-motto"><em>Hecho por estudiantes para los estudiantes de la UNCP</em><em>Somos del Centro, Somos del Perú !!!!</em></div><a href="#/">Volver al inicio ${icon('arrow',14)}</a></div></footer>`;
}
function artMark(id:ProjectId):string{
 if(id==='pacifico') return `<svg class="card-svg" viewBox="0 0 350 185" aria-hidden="true"><path d="M0 160 Q66 125 132 141 T350 59" fill="none" stroke="rgba(10,95,96,.25)" stroke-width="2" stroke-dasharray="4 8"/><path d="M8 148 Q102 142 132 125 T350 35" fill="none" stroke="#368d8e" stroke-width="3"/><circle cx="50" cy="143" r="5" fill="#368d8e"/><circle cx="133" cy="125" r="5" fill="#368d8e"/><circle cx="230" cy="90" r="5" fill="#368d8e"/><circle cx="330" cy="48" r="7" fill="#26696b"/><path d="M24 50 Q114 19 175 56 T316 72" fill="none" stroke="rgba(16,112,108,.14)" stroke-width="1.5"/></svg>`;
 if(id==='hhi')return `<svg class="card-svg" viewBox="0 0 350 185" aria-hidden="true"><rect x="25" y="70" width="57" height="87" rx="8" fill="#b9cbd8"/><rect x="97" y="28" width="57" height="129" rx="8" fill="#5f879f"/><rect x="169" y="90" width="57" height="67" rx="8" fill="#96b2c5"/><rect x="241" y="54" width="57" height="103" rx="8" fill="#2f526e"/><path d="M18 160h300" stroke="#708b9e" stroke-width="2"/><path d="M25 38h273" stroke="#b4c4ce" stroke-width="2" stroke-dasharray="4 7"/></svg>`;
 return `<svg class="card-svg" viewBox="0 0 350 185" aria-hidden="true"><path d="M20 165 H330M25 150V20" stroke="#cbd9d5" stroke-width="2"/><path d="M25 130 C60 105 75 121 110 93 S168 115 208 75 285 90 326 30" fill="none" stroke="#bb7d63" stroke-width="4"/><path d="M25 144 C70 131 82 137 123 121 169 101 197 120 235 93 268 85 293 107 326 74" fill="none" stroke="#557f74" stroke-width="3" stroke-dasharray="7 7"/><circle cx="326" cy="30" r="7" fill="#bb7d63"/></svg>`;
}
function projectCard(id:ProjectId):string{
 const p=PROJECTS[id];
 return `<a href="#/investigacion/${id}/mapa" class="project-card project-card-${p.accent} reveal" aria-label="Abrir investigación: ${html(p.title)}">
 <div class="project-poster"><img loading="lazy" src="./assets/research/${id}-cover.webp" alt="Ilustración de la investigación ${html(p.title)}"/><span class="project-poster-shade"></span><span class="project-card-logo"><img loading="lazy" src="./assets/research/${id}-logo.png" alt=""/></span></div>
 <div class="project-content"><span class="project-card-caption">${html(p.category)} <span class="project-card-period">${html(p.period)}</span></span><h3>${html(p.title)}</h3><span class="project-card-link">Explorar ${icon('arrow',17)}</span></div></a>`;
}
function home():string{
 return `<main id="main"><section class="welcome container"><div class="welcome-copy reveal"><span class="kicker">JOSEPH OREALL</span><h1>Investigaciones</h1><p>Economía portuaria, conectividad marítima y regulación económica.</p></div><div class="welcome-side"><span>Universidad Nacional del Centro del Perú</span></div></section>
 <section id="projects" class="container project-section"><div class="projects-layout">${projectCard('hhi')}${projectCard('pacifico')}${projectCard('peru')}</div></section>
</main>`;
}
function tabs(id:ProjectId,active:TabId):string{
 const defs:{id:TabId;name:string}[]=[
  ...(id==='pacifico'?[{id:'mapa' as TabId,name:'Mapa interactivo'}]:[{id:'mapa' as TabId,name:'Panorama'}]),
  {id:'introduccion',name:'Introducci\u00f3n'},
  {id:'marco',name:'Marco te\u00f3rico'},
  {id:'antecedentes',name:'Antecedentes'},
  {id:'datos',name:'Datos y m\u00e9todos'},
  {id:'resultados',name:'Resultados'},
  {id:'materiales',name:'Materiales'}
 ];
 return `<div class="tab-shell"><div class="tabs" role="tablist" aria-label="Secciones del estudio">${defs.map(t=>`<a role="tab" aria-selected="${t.id===active?'true':'false'}" href="#/investigacion/${id}/${t.id}" class="${t.id===active?'current':''}">${t.name}${t.id===active?'<span class="tab-active-dot"></span>':''}</a>`).join('')}</div></div>`;
}
const CHAPTERS:{id:TabId;name:string;asset:string}[]=[
 {id:'introduccion',name:'Introducción',asset:'introduccion.png'},
 {id:'marco',name:'Marco teórico',asset:'marco.png'},
 {id:'antecedentes',name:'Antecedentes',asset:'antecedentes.svg'},
 {id:'datos',name:'Materiales y métodos',asset:'datos.png'},
 {id:'resultados',name:'Resultados',asset:'resultados.png'},
 {id:'discusion',name:'Discusión e implicancias regulatorias',asset:'discusion.png'},
 {id:'conclusiones',name:'Conclusiones',asset:'conclusiones.png'}
];
function studyHeader(id:ProjectId):string{
 const p=PROJECTS[id];
 return `<section class="study-head"><div class="container study-topline"><a href="#/" class="breadcrumb">${icon('back',16)} Investigaciones</a><a class="study-repository" href="${p.repo}" target="_blank" rel="noopener noreferrer">${icon('link',15)} Repositorio en GitHub</a></div><div class="container study-heading-row"><div><span class="kicker">${html(p.category)}</span><h1>${html(p.title)}</h1><p class="study-subtitle">Universidad Nacional del Centro del Perú</p></div><img src="./assets/research/${id}-logo.png" class="study-header-logo" alt="Logo de la investigación"/></div></section>`;
}
function wheel(id:ProjectId,active:TabId):string{
 const isOpen=active!=='lectura';
 return `<div class="research-layout ${isOpen?'wheel-shifted':'wheel-initial'}"><div class="wheel-place"><div class="research-wheel" role="navigation" aria-label="Secciones de la investigación">
 <div class="wheel-rim"></div><div class="wheel-rim inner"></div><div class="wheel-core"><img src="./assets/research/${id}-logo.png" alt="Logo de la investigación"/></div>
 ${CHAPTERS.map((c,i)=>{const angle=-90+(i*360/CHAPTERS.length);const t=(angle*Math.PI/180);const xx=50+38*Math.cos(t);const yy=50+38*Math.sin(t);return `<a href="#/investigacion/${id}/${c.id}" class="wheel-node ${c.id===active?'chosen':''}" style="left:${xx.toFixed(3)}%;top:${yy.toFixed(3)}%" aria-current="${c.id===active?'page':'false'}"><img src="./assets/sections/${c.asset}" alt=""/><span>${c.name}</span></a>`}).join('')}
 </div>${isOpen?`<a class="wheel-reset" href="#/investigacion/${id}/lectura">${icon('reset',15)} Ver ruleta</a>`:''}</div>
 <div class="wheel-panel ${isOpen?'show':''}" id="research-content">${isOpen?chapterContent(id,active):`<div class="wheel-welcome"><h2>${html(PROJECTS[id].title)}</h2><p>Selecciona una sección de la ruleta para consultar su contenido.</p></div>`}</div></div>`;
}
function chapterContent(id:ProjectId,tab:TabId):string{
 if(tab==='introduccion')return introduction(id);
 if(tab==='marco')return theory(id);
 if(tab==='antecedentes')return literatureView(id,'antecedente');
 if(tab==='datos')return methods(id)+`<div class="in-methods" id="research-materials">${materials(id)}</div>`;
 if(tab==='resultados')return results(id);
 if(tab==='discusion')return discussion(id);
 if(tab==='conclusiones')return conclusions(id);
 if(tab==='materiales')return materials(id);
 return introduction(id);
}
function study(id:ProjectId,tab:TabId):string{
 let body='';
 if(tab==='mapa')body=`<div class="dashboard-intro container"><div><span class="kicker">ÁMBITO DE ESTUDIO</span><h2>Puertos y actividad observada</h2></div><a class="btn btn-dark" href="#/investigacion/${id}/lectura">Ver investigación ${icon('arrow',16)}</a></div><section class="container dashboard-main">${id==='pacifico'?pacificMap():domesticMap(id)}</section><section class="container dashboard-bottom"><a class="btn btn-dark" href="#/investigacion/${id}/lectura">Ver investigación ${icon('arrow',16)}</a><a href="${PROJECTS[id].repo}" class="text-link" target="_blank" rel="noopener noreferrer">Repositorio ${icon('link',14)}</a></section>`;
 else body=`<div class="container research-topline"><a href="#/investigacion/${id}/mapa">${icon('back',15)} Volver al mapa</a><span>Contenido de la investigación</span></div>${wheel(id,tab)}`;
 return `<main id="main">${studyHeader(id)}${body}<div class="container research-end"><a href="#/">Ver otras investigaciones ${icon('arrow',15)}</a><a href="${PROJECTS[id].repo}" target="_blank" rel="noopener noreferrer">Repositorio en GitHub ${icon('link',15)}</a></div></main>`;
}
function resultPill(v:string,caption:string):string{return `<div class="pill-metric"><strong>${v}</strong><span>${caption}</span></div>`;}
function overviewTiles(id:ProjectId):string{return id==='pacifico'?resultPill('14','puertos estudiados'):id==='hhi'?resultPill('18,8 %','variación del HHI'):resultPill('450','variaciones mensuales');}
function sectionIntro(eyebrow:string,title:string,desc:string):string{
 return `<div class="content-heading"><span class="kicker">${eyebrow.replace(/^\d+\s*\/\s*/, '')}</span><h2>${title}</h2><p>${desc}</p></div>`;
}
const DOMESTIC_PORTS:{id:string;name:string;country:string;lon:number;lat:number;operator:string;note:string;}[]=[
 {id:'Chancay',name:'Chancay',country:'Perú',lon:-77.265,lat:-11.57,operator:'CHANCAY',note:'Operación comercial desde junio de 2025. Participa en el conjunto Callao–Chancay analizado mediante el HHI.'},
 {id:'APM',name:'APM Terminals Callao',country:'Perú',lon:-77.158,lat:-12.050,operator:'APM',note:'Terminal concesionado del Callao. Forma parte de la muestra de contenedores y del panel de ingresos.'},
 {id:'DPW',name:'DP World Callao',country:'Perú',lon:-77.146,lat:-12.060,operator:'DPW',note:'Operador del Callao considerado en el análisis de concentración y en las estimaciones de ingresos.'},
 {id:'Paita',name:'Terminal Portuario de Paita',country:'Perú',lon:-81.111,lat:-5.09,operator:'PAITA',note:'Concesionario utilizado como referencia en el estudio de ingresos y actividad portuaria.'}
];
function domesticMap(id:ProjectId):string{
 const points=id==='hhi'?DOMESTIC_PORTS.slice(0,3):DOMESTIC_PORTS.filter(x=>x.id!=='Chancay');
 if(!points.some(v=>v.id===domesticPort))domesticPort=points[0].id;
 const peru=DB.countries.countries.find(x=>x.name==='Peru');
 return `<div class="domestic-section"><div class="domestic-top"><div><h2>${id==='hhi'?'Costa central del Perú':'Terminales concesionados del Perú'}</h2><p>${id==='hhi'?'Selecciona un terminal para consultar su papel en el índice de concentración y las cifras conjuntas del estudio.':'Selecciona un terminal para consultar sus ingresos y sus indicadores de actividad.'}</p></div><span>Fuente cartográfica: Natural Earth</span></div>
 <div class="domestic-explorer"><div class="domestic-map-wrap"><div class="domestic-country-control"><button data-action="domestic-reset">${icon('reset',16)} Vista completa</button></div>
 <svg id="domestic-map" class="domestic-map" viewBox="-84 -1 18 20" preserveAspectRatio="xMidYMid meet" role="img" aria-label="Mapa interactivo de los terminales analizados en Perú"><rect x="-120" y="-70" width="150" height="150" fill="#eaf2f3"/><path d="${peru?peru.path:''}" fill="#dce5e5" stroke="#a8bfc3" stroke-width=".09" data-action="domestic-reset"/><text x="-83" y="14.7" fill="#8ba3aa" font-size=".5" letter-spacing=".12" pointer-events="none">OCÉANO PACÍFICO</text>
 ${points.map((v,i)=>`<g class="geo-click ${domesticPort===v.id?'active':''}" role="button" tabindex="0" data-action="domestic-port" data-port="${v.id}" aria-label="Seleccionar ${html(v.name)}"><circle class="geo-halo" cx="${v.lon}" cy="${-v.lat}" r=".33"/><circle class="geo-pin" cx="${v.lon}" cy="${-v.lat}" r=".16"/><title>${html(v.name)}</title></g>`).join('')}</svg>
 <div class="domestic-map-note">Ubicaciones referenciales de los terminales. Selecciona un punto o un nombre para continuar.</div>
 <div class="domestic-port-list">${points.map(v=>`<button class="domestic-port ${domesticPort===v.id?'active':''}" data-action="domestic-port" data-port="${v.id}">${icon('pin',15)} ${html(v.name)} ${icon('arrow',13)}</button>`).join('')}</div></div><aside class="domestic-info" id="domestic-info">${domesticInfo(id)}</aside></div></div>`;
}
function domesticInfo(id:ProjectId):string{
 const p=DOMESTIC_PORTS.find(x=>x.id===domesticPort) || DOMESTIC_PORTS[0];
 if(id==='hhi')return `<div class="domestic-side-head"><span class="kicker">TERMINAL DE LA MUESTRA</span><h3>${html(p.name)}</h3><p>${p.note}</p></div><div class="domestic-result"><span>Concentración del conjunto Callao–Chancay</span><div class="domestic-compare"><div><small>Jun–Oct 2024</small><strong>5 410,5</strong></div><div><small>Jun–Oct 2025</small><strong>4 392,6</strong></div></div><p>HHI promedio. La comparación corresponde al conjunto de terminales, no a un índice individual por operador.</p></div><div class="domestic-result"><span>Modelo AR(2)</span><strong>−752,1 puntos</strong><p>Cambio de nivel estimado, según el artículo.</p></div>`;
 const op=p.operator; const rows=DB.income.rows.filter(v=>v.op===op&&Number.isFinite(v.revenue));const last=rows.slice(-30);
 const lastRow=rows[rows.length-1];const label=op==='DPW'?'DP World':op==='PAITA'?'Paita':'APM Callao';
 const k=DB.income.coefficients.find(c=>c.variable.includes(`[${op}]:dln_teu`));
 return `<div class="domestic-side-head"><span class="kicker">CONCESIONARIO</span><h3>${html(label)}</h3><p>${p.note}</p></div><div class="domestic-result"><span>Ingresos del último mes de la base</span><strong>${lastRow?'US$ '+es(lastRow.revenue/1e6,2)+' M':'No disponible'}</strong><p>${lastRow?lastRow.month:''} - serie homogeneizada para el análisis.</p></div><div class="domestic-result"><span>Evolución de ingresos mensuales</span>${last.length>2?lineChart(last.map(v=>({x:v.month,y:v.revenue/1e6})),{width:400,height:180,compact:true,round:1,color:'#47788a'}):''}<p>Últimos ${last.length} meses con registro en la base procesada.</p></div>${k?`<div class="domestic-result"><span>Elasticidad estimada respecto a TEU</span><strong>${es(k.value,3)}</strong><p>Asociación estimada en el modelo de ingresos.</p></div>`:''}`;
}

function pacificMap():string{
 return `<div class="map-section"><div class="section-intro-split"><div><span class="kicker">PUERTOS DEL PACÍFICO SUDAMERICANO</span><h2>Conectividad marítima<br/><em>por puerto.</em></h2></div><p>Selecciona un pa\u00eds para acercarte a sus puertos. Despu\u00e9s elige un terminal para explorar su conectividad trimestral en los registros de UNCTAD.</p></div>
 <div class="map-toolbar"><div class="country-filters" aria-label="Seleccionar pa\u00eds">${COUNTRY_LABELS.map(c=>`<button data-action="country" data-country="${c}" class="chip ${currentCountry===c?'selected':''}" aria-pressed="${currentCountry===c}">${COUNTRY_ES[c]||c}<span>${c==='Todos'?14:DB.ports.ports.filter(p=>p.country===c).length}</span></button>`).join('')}</div><div class="quarter-select"><label for="quarter">Trimestre PLSCI</label><select id="quarter" aria-label="Trimestre de los datos">${DB.ports.quarters.map(q=>`<option value="${q}" ${q===currentQuarter?'selected':''}>${q}</option>`).join('')}</select></div></div>
 <div class="explorer-layout"><div class="map-frame"><div class="map-frame-label"><span class="map-pulse"></span> PAC\u00cdFICO SUDAMERICANO <small>GEOGRAF\u00cdA / UNCTAD</small></div><svg id="pacific-map" class="research-map" viewBox="${mapRect.x} ${mapRect.y} ${mapRect.w} ${mapRect.h}" preserveAspectRatio="xMidYMid meet" role="img" aria-label="Mapa de los puertos de la muestra en la costa del Pac\u00edfico sudamericano"><defs><pattern id="sea-grid" width="7" height="7" patternUnits="userSpaceOnUse"><path d="M7 0H0V7" fill="none" stroke="#d0dfdf" stroke-width=".09"/></pattern></defs><rect x="-160" y="-80" width="220" height="180" fill="#e7f0ef"/><rect x="-160" y="-80" width="220" height="180" fill="url(#sea-grid)"/><text x="-96" y="17" class="ocean-label">OC\u00c9ANO PAC\u00cdFICO</text>
 ${DB.countries.countries.map(c=>`<path class="country-shape ${['Peru','Chile','Colombia','Ecuador'].includes(c.name)?'country-active-area':''} ${currentCountry===c.name?'country-selected':''}" data-action="country" data-country="${html(c.name)}" d="${c.path}"><title>${html(COUNTRY_ES[c.name]||c.name)}</title></path>`).join('')}
 ${DB.ports.ports.map(p=>`<g class="port-marker ${currentPort===p.code?'port-selected':''} ${currentCountry!=='Todos'&&currentCountry!==p.country?'port-dimmed':''}" role="button" tabindex="0" data-action="port" data-port="${p.code}" aria-label="Seleccionar puerto ${html(p.name)}"><circle class="port-halo" cx="${p.lon}" cy="${-p.lat}" r="1.2"/><circle class="port-dot" cx="${p.lon}" cy="${-p.lat}" r=".62"/><title>${html(p.name)} (${html(COUNTRY_ES[p.country]||p.country)}). PLSCI ${es(p.quarterValues[currentQuarter],2)}</title></g>`).join('')}
 </svg><div class="map-controls"><button aria-label="Acercar" title="Acercar" data-action="zoom-in">${icon('plus',18)}</button><button aria-label="Alejar" title="Alejar" data-action="zoom-out">${icon('minus',18)}</button><button aria-label="Restablecer mapa" title="Vista completa" data-action="map-reset">${icon('reset',18)}</button></div><div class="map-attribution">Fuente: Natural Earth / UNCTAD PLSCI  -  Coordenadas del estudio</div><div class="map-legend"><span><i class="legend-port"></i> Puerto incluido</span><span><i class="legend-selected"></i> Seleccionado</span></div></div>
 <aside class="map-info" id="map-side">${mapSideContent()}</aside></div><div class="map-source-note">${icon('pin',15)} Las coordenadas proceden del archivo <strong>coords_14.csv</strong> de la investigaci\u00f3n. Los valores PLSCI son registros trimestrales oficiales incorporados en la base del estudio. Las posiciones son referenciales, no destinadas a navegaci\u00f3n.</div>
 </div>`;
}
function mapSideContent():string{
 const p=DB.ports.ports.find(x=>x.code===currentPort)||DB.ports.ports[0];
 const active=DB.ports.ports.filter(x=>currentCountry==='Todos'||x.country===currentCountry);
 const qValue=p.quarterValues[currentQuarter];
 const trend=((p.end/p.start)-1)*100;
 return `<div class="map-side-head"><span class="kicker">FICHA DE PUERTO / ${html(p.code)}</span><h3>${html(p.name)}</h3><p>${icon('pin',15)} ${html(COUNTRY_ES[p.country]||p.country)}</p></div><div class="port-stat"><div><span>\u00cdndice PLSCI</span><strong>${es(qValue,2)}</strong></div><div><span>${currentQuarter}</span><span class="stat-accent">UNCTAD</span></div></div><div class="port-trend"><div class="port-trend-top"><span>EVOLUCI\u00d3N TRIMESTRAL</span><strong>${trend>=0?'+':''}${es(trend,1)} % <small>2025T1-2026T3</small></strong></div>${lineChart(DB.ports.quarters.map(q=>({x:q,y:p.quarterValues[q]})),{width:340,height:158,compact:true,round:1})}<div class="chart-foot"><span>2025-T1</span><span>2026-T3</span></div></div><div class="port-selector-label">PUERTOS ${currentCountry==='Todos'?'DE LA MUESTRA':'DE '+html((COUNTRY_ES[currentCountry]||currentCountry).toUpperCase())}</div><div class="map-port-list">${active.map(x=>`<button data-action="port" data-port="${x.code}" class="map-port-item ${x.code===p.code?'active':''}"><span class="port-mini-dot"></span><span>${html(x.name)}</span><strong>${es(x.quarterValues[currentQuarter],1)}</strong>${icon('arrow',14)}</button>`).join('')}</div></div>`;
}
function lineChart(points:{x:string;y:number}[],opts:{width:number;height:number;compact?:boolean;round?:number;color?:string}):string{
 const w=opts.width,h=opts.height;const margins=opts.compact?{l:13,r:12,t:17,b:13}:{l:44,r:20,t:24,b:29};
 const vals=points.filter(p=>Number.isFinite(p.y)).map(p=>p.y);if(!vals.length)return '<p>Datos no disponibles</p>';
 let mn=Math.min(...vals),mx=Math.max(...vals);const space=Math.max((mx-mn)*.17,(Math.abs(mx)||1)*.06);mn-=space;mx+=space;
 const px=(i:number)=>margins.l+(i/Math.max(1,points.length-1))*(w-margins.l-margins.r);
 const py=(v:number)=>margins.t+(1-(v-mn)/(mx-mn))*(h-margins.t-margins.b);
 const d=points.map((p,i)=>(i?'L':'M')+px(i).toFixed(1)+','+py(p.y).toFixed(1)).join(' ');
 const gradId='fill-'+Math.round(Math.random()*1e9);
 return `<svg class="line-chart ${opts.compact?'compact':''}" viewBox="0 0 ${w} ${h}" role="img" aria-label="Serie de ${points.length} observaciones"><defs><linearGradient id="${gradId}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${opts.color||'#23867e'}" stop-opacity=".17"/><stop offset="1" stop-color="${opts.color||'#23867e'}" stop-opacity="0"/></linearGradient></defs><path d="${d} L${px(points.length-1)},${h-margins.b} L${px(0)},${h-margins.b} Z" fill="url(#${gradId})"/>${[0,.5,1].map(t=>`<line x1="${margins.l}" y1="${margins.t+t*(h-margins.t-margins.b)}" x2="${w-margins.r}" y2="${margins.t+t*(h-margins.t-margins.b)}" stroke="#d9e3df" stroke-dasharray="3 6"/>`).join('')}<path d="${d}" stroke="${opts.color||'#23867e'}" fill="none" stroke-width="${opts.compact?2.7:3}" stroke-linecap="round" stroke-linejoin="round"/>${points.map((p,i)=>`<circle cx="${px(i)}" cy="${py(p.y)}" r="${opts.compact?2.9:4.5}" fill="${opts.color||'#23867e'}" stroke="white" stroke-width="1.6"><title>${html(p.x)}: ${es(p.y,opts.round??2)}</title></circle>`).join('')}${!opts.compact?`<text class="chart-axis-label" x="${margins.l}" y="${h-5}">${html(points[0].x)}</text><text class="chart-axis-label" text-anchor="end" x="${w-margins.r}" y="${h-5}">${html(points[points.length-1].x)}</text><text class="chart-axis-label" x="5" y="${margins.t+5}">${es(mx,0)}</text><text class="chart-axis-label" x="5" y="${h-margins.b}">${es(mn,0)}</text>`:''}</svg>`;
}
function hhiOverview():string{
 const before=DB.hhi.compare[0].hhi,after=DB.hhi.compare[1].hhi;
 return `${sectionIntro('CONCENTRACI\u00d3N PORTUARIA','La estructura del tr\u00e1fico en transformaci\u00f3n','Explora los indicadores principales del estudio sobre APM Callao, DP World Callao y Chancay. Los valores corresponden a comparaciones y estimaciones reportadas en el art\u00edculo, no a una simulaci\u00f3n causal.')}
 <div class="overview-metrics">${overviewTiles('hhi')}</div><div class="two-panel-layout"><div class="results-panel"><div class="panel-header"><span class="kicker">HHI / PUNTOS</span><span>Junio-octubre, meses comparables</span></div><h3>Concentraci\u00f3n observada</h3><div class="hhi-bars"><div class="hhi-bar-group"><div><span>2024</span><strong>${es(before,1)}</strong></div><div class="hhi-bar-track"><span style="width:${100*before/6000}%" class="hhi-bar-before"></span></div></div><div class="hhi-bar-group"><div><span>2025</span><strong>${es(after,1)}</strong></div><div class="hhi-bar-track"><span style="width:${100*after/6000}%" class="hhi-bar-after"></span></div></div></div><div class="panel-footnote">Variaci\u00f3n de -18,8 % en el HHI promedio. Fuente: APN, c\u00e1lculos del estudio.</div></div><div class="results-panel"><div class="panel-header"><span class="kicker">DESCOMPOSICI\u00d3N</span><span>Variaci\u00f3n explicada contablemente</span></div><h3>Origen de la variaci\u00f3n</h3><div class="donut-layout"><div class="donut-circle"><div><strong>87,4 %</strong><small>cuota Chancay</small></div></div><div class="donut-legend"><div><i style="background:#296d75"></i> Cuota de Chancay <strong>87,4 %</strong></div><div><i style="background:#c4d4d9"></i> Reparto Callao <strong>12,6 %</strong></div></div></div><div class="panel-footnote">La descomposici\u00f3n contable no identifica causalidad.</div></div></div><div class="source-inline">${icon('book',17)} El art\u00edculo principal tambi\u00e9n estima un cambio de nivel de ${es(DB.hhi.ar2,1)} puntos con errores AR(2). <a href="#/investigacion/hhi/resultados">Ver resultados completos ${icon('arrow',15)}</a></div>`;
}
function incomeOverview():string{
 return `${sectionIntro('DATOS DE PANEL','Ingresos, operaciones y actividad portuaria','Comparaci\u00f3n mensual basada en los registros procesados de OSITRAN y BCRP. Selecciona un operador y una variable para explorar su trayectoria.')}
 <div class="overview-metrics">${overviewTiles('peru')}</div>${incomeExplorer()}<div class="source-inline">${icon('book',17)} Las series de ingresos est\u00e1n expresadas en USD de acuerdo con el tratamiento de moneda documentado en el estudio. <a href="#/investigacion/peru/datos">Ver la metodolog\u00eda ${icon('arrow',15)}</a></div>`;
}
function incomeExplorer():string{
 const rows=DB.income.rows.filter(r=>r.op===selectedOperator);
 const label=selectedMetric==='revenue'?'Ingreso total (USD)':selectedMetric==='teu'?'Contenedores (TEU)':'Naves atendidas';
 const data=rows.map(r=>({x:r.month,y:r[selectedMetric]}));
 const last=rows[rows.length-1];
 return `<div class="income-explorer results-panel"><div class="income-toolbar"><div><span class="kicker">SERIES TEMPORALES</span><h3>${label}</h3></div><div class="income-controls"><select id="operator" aria-label="Seleccionar operador"><option value="APM" ${selectedOperator==='APM'?'selected':''}>APM Callao</option><option value="DPW" ${selectedOperator==='DPW'?'selected':''}>DP World Callao</option><option value="PAITA" ${selectedOperator==='PAITA'?'selected':''}>Paita</option></select><select id="metric" aria-label="Seleccionar indicador"><option value="revenue" ${selectedMetric==='revenue'?'selected':''}>Ingresos (USD)</option><option value="teu" ${selectedMetric==='teu'?'selected':''}>Contenedores (TEU)</option><option value="vessels" ${selectedMetric==='vessels'?'selected':''}>Naves atendidas</option></select></div></div><div class="big-number"><strong>${last?es(last[selectedMetric],selectedMetric==='revenue'?0:0):'--'}</strong><span>${last?.month||''}  -  ${label}</span></div>${lineChart(data,{width:960,height:270,round:0,color:'#a96c55'})}<div class="panel-footnote">453 registros en niveles (2014-01 a 2026-07, tres operadores)  -  Panel procesado del art\u00edculo.</div></div>`;
}

type StudyCopy={eyebrow:string;lead:string;paragraphs:string[];question:string;objectives:string[];theory:{title:string;who:string;summary:string}[];formula:string;formulaNote:string;approach:string[]};
const STUDY_COPY:Record<ProjectId,StudyCopy>={
 pacifico:{
  eyebrow:'REDES PORTUARIAS Y CONECTIVIDAD',
  lead:'\u00bfC\u00f3mo evoluciona la conectividad mar\u00edtima de Chancay frente a los puertos consolidados del Pac\u00edfico sudamericano?',
  paragraphs:[
   'La incorporaci\u00f3n de Chancay a los servicios regulares de contenedores permite examinar el lugar de un nuevo puerto en una red internacional con nodos de distinta trayectoria.',
   'La comparaci\u00f3n utiliza el Port Liner Shipping Connectivity Index (PLSCI) de UNCTAD. La muestra incluye Chancay, Callao, Paita y otros once puertos de Chile, Colombia y Ecuador entre el primer trimestre de 2025 y el tercero de 2026.',
   'El estudio compara niveles y tendencias relativas con efectos fijos de puerto y trimestre, m\u00e1s tendencias propias de cada unidad. Los resultados describen cambios observados de conectividad sin atribuir una relaci\u00f3n causal a la apertura comercial.'
  ],question:'\u00bfSe acorta la distancia relativa de conectividad entre Chancay y Callao durante la etapa inicial?',
  objectives:['Describir la evoluci\u00f3n del PLSCI en catorce puertos comparables.','Estimar tendencias espec\u00edficas con Callao como referencia.','Examinar la estabilidad temporal y la dependencia espacial de los residuos.'],
  theory:[
   {title:'Econom\u00eda de redes',who:'Economides (1996); Katz y Shapiro (1985)',summary:'El valor de una conexi\u00f3n depende de otras conexiones disponibles y de las decisiones interdependientes de los participantes.'},
   {title:'Regionalizaci\u00f3n portuaria',who:'Notteboom y Rodrigue (2005)',summary:'Los puertos se integran con corredores, zonas log\u00edsticas y mercados internos dentro de redes que superan el \u00e1mbito local.'},
   {title:'Aglomeraci\u00f3n y nodos',who:'Fujita y Mori (1996)',summary:'Las econom\u00edas de aglomeraci\u00f3n y la localizaci\u00f3n de puertos ayudan a explicar patrones espaciales de actividad.'},
   {title:'Competencia y entrada',who:'Baumol, Panzar y Willig (1983); de Langen y Pallis (2007)',summary:'La posibilidad de entrada y las barreras del sistema portuario condicionan las estrategias y las alternativas de elecci\u00f3n.'}
  ],formula:'ln(PLSCI\u1d62\u209c) = \u03b1\u1d62 + \u03bb\u209c + \u03a3\u03b3\u2c7c(D\u1d62\u2c7c \u00d7 \u03c4\u209c) + \u03b5\u1d62\u209c',formulaNote:'Efectos fijos de puerto y trimestre; tendencias espec\u00edficas respecto a Callao (referencia).',
  approach:['Descarga de series PLSCI y LSBCI desde UNCTADstat; identificaci\u00f3n de los 14 c\u00f3digos portuarios.','Construcci\u00f3n y validaci\u00f3n del panel balanceado (14 puertos por 7 trimestres).','Regresi\u00f3n con efectos fijos y tendencias; ejercicios de sensibilidad y diagn\u00f3sticos espaciales.']
 },
 hhi:{
  eyebrow:'CONCENTRACI\u00d3N Y REGULACI\u00d3N',
  lead:'\u00bfC\u00f3mo cambi\u00f3 la concentraci\u00f3n del tr\u00e1fico de contenedores en el conjunto Callao-Chancay?',
  paragraphs:[
   'La entrada de Chancay modifica el n\u00famero de operadores que atienden contenedores en la costa central peruana. El objetivo es cuantificar la distribuci\u00f3n de cuotas entre APM Terminals Callao, DP World Callao y Chancay.',
   'La base mensual se construy\u00f3 con registros portuarios de enero de 2015 a julio de 2026. El an\u00e1lisis utiliza el \u00edndice Herfindahl-Hirschman (HHI), su normalizaci\u00f3n por participantes y una descomposici\u00f3n contable.',
   'Se complementa con regresiones din\u00e1micas de errores autorregresivos. Una reducci\u00f3n del HHI de tr\u00e1fico representa redistribuci\u00f3n de vol\u00famenes, pero no prueba por s\u00ed sola efectos en tarifas ni competencia efectiva.'
  ],question:'\u00bfQu\u00e9 parte de la variaci\u00f3n observada est\u00e1 asociada a la cuota de Chancay?',
  objectives:['Calcular el HHI del conjunto portuario y sus cambios en meses comparables.','Descomponer la variaci\u00f3n por cuota de entrada y reparto interno en Callao.','Contrastar el cambio de nivel con un modelo de series temporales y pruebas alternativas.'],
  theory:[
   {title:'Organizaci\u00f3n industrial',who:'Stigler (1971); Demsetz (1982)',summary:'La estructura del mercado y las barreras de entrada son relevantes para interpretar concentraci\u00f3n, conducta y regulaci\u00f3n.'},
   {title:'Concentraci\u00f3n HHI',who:'Naldi y Flamini (2018)',summary:'El HHI resume las participaciones cuadr\u00e1ticas y permite estudiar su redistribuci\u00f3n cuando entra un operador.'},
   {title:'Mercados disputables',who:'Baumol, Panzar y Willig (1983)',summary:'La amenaza potencial de entrada y las condiciones estructurales merecen un an\u00e1lisis separado del n\u00famero observado de agentes.'},
   {title:'Acceso y regulaci\u00f3n',who:'Laffont y Tirole; Armstrong y Vickers',summary:'Los incentivos, el acceso a la infraestructura y la regulaci\u00f3n afectan la conducta y el bienestar, m\u00e1s all\u00e1 de un \u00edndice agregado.'}
  ],formula:'HHI\u209c = 10 000 \u00d7 \u03a3(s\u1d62\u209c)\u00b2',formulaNote:'s representa la participaci\u00f3n de cada terminal en el tr\u00e1fico de contenedores del conjunto analizado.',
  approach:['Consolidaci\u00f3n de registros APN en Excel y PDF, con respaldo de fuentes BCRP.','C\u00e1lculo del HHI, tratamiento de meses de transici\u00f3n y descomposici\u00f3n contable.','Estimaci\u00f3n con errores AR(2) y comprobaciones de robustez de la serie.']
 },
 peru:{
  eyebrow:'FACTURACI\u00d3N Y ACTIVIDAD PORTUARIA',
  lead:'\u00bfC\u00f3mo se relacionan los ingresos mensuales de los terminales concesionados con el movimiento de contenedores y las naves atendidas?',
  paragraphs:[
   'El estudio analiza la facturaci\u00f3n y la actividad mensual de APM Callao y DP World Callao durante la incorporaci\u00f3n comercial de Chancay, utilizando Paita como referencia.',
   'Las series de OSITRAN y BCRP cubren enero de 2014 a julio de 2026. La construcci\u00f3n del panel requiere revisar los registros originales y homogeneizar la moneda de facturaci\u00f3n de Paita antes de 2021.',
   'El modelo principal en primeras diferencias logar\u00edtmicas incluye efectos fijos de operador y fecha, coeficientes espec\u00edficos por actividad e interacciones del periodo comercial. Las relaciones obtenidas son asociaciones estimadas, no impactos causales.'
  ],question:'\u00bfQu\u00e9 tan distinta es la respuesta de ingresos frente al movimiento de contenedores y naves seg\u00fan el operador?',
  objectives:['Documentar y homogeneizar el panel de ingresos en USD, TEU y naves.','Estimar elasticidades de corto plazo por terminal.','Comparar el periodo comercial desde junio de 2025 frente a Paita y evaluar sensibilidad.'],
  theory:[
   {title:'Demanda portuaria y costos',who:'Talley (2006); de Langen (2007)',summary:'Los ingresos dependen de servicios prestados y elecci\u00f3n de puerto, vinculados con costos monetarios y tiempos.'},
   {title:'Barreras de entrada',who:'de Langen y Pallis (2007)',summary:'Infraestructura, conectividad y accesibilidad configuran las condiciones de competencia entre terminales.'},
   {title:'Regulaci\u00f3n de incentivos',who:'Laffont y Tirole (1993); Motta (2004)',summary:'Las reglas de acceso, remuneraci\u00f3n y control regulatorio forman parte del entorno de operadores concesionados.'},
   {title:'Externalidades de red',who:'Katz y Shapiro (1985)',summary:'La actividad de un terminal se relaciona con decisiones de l\u00edneas navieras y conexiones disponibles en el sistema.'}
  ],formula:'\u0394ln(R\u1d62\u209c) = \u03b1\u1d62 + \u03bb\u209c + \u03b2\u1d62\u0394ln(TEU\u1d62\u209c) + \u03b8\u1d62\u0394ln(Naves\u1d62\u209c) + \u03b4\u1d62Post\u1d62\u209c + \u03b5\u1d62\u209c',
  formulaNote:'Panel de cambios mensuales; los coeficientes de TEU y naves son espec\u00edficos de operador.',
  approach:['Descarga del libro estad\u00edstico de OSITRAN y series monetarias BCRP.','Revisi\u00f3n de celdas, conciliaci\u00f3n de moneda y preparaci\u00f3n de diferencias logar\u00edtmicas.','Estimaci\u00f3n con efectos fijos e inferencia agrupada por mes, m\u00e1s comprobaciones HAC.']
 }
};

function formulaMath(id:ProjectId):string{
 const open='<math xmlns="http://www.w3.org/1998/Math/MathML" display="block" class="math-equation">';
 const close='</math>';
 if(id==='hhi')return open+`<msub><mi>HHI</mi><mi>t</mi></msub><mo>=</mo><mn>10000</mn><mo>×</mo><msub><mo>∑</mo><mi>i</mi></msub><msup><msub><mi>s</mi><mrow><mi>i</mi><mi>t</mi></mrow></msub><mn>2</mn></msup>`+close;
 if(id==='pacifico')return open+`<mi>ln</mi><mo>(</mo><msub><mi>PLSCI</mi><mrow><mi>i</mi><mi>t</mi></mrow></msub><mo>)</mo><mo>=</mo><msub><mi>α</mi><mi>i</mi></msub><mo>+</mo><msub><mi>λ</mi><mi>t</mi></msub><mo>+</mo><msub><mo>∑</mo><mrow><mi>j</mi><mo>≠</mo><mi>Callao</mi></mrow></msub><msub><mi>γ</mi><mi>j</mi></msub><mo>(</mo><msub><mi>D</mi><mrow><mi>i</mi><mi>j</mi></mrow></msub><mo>×</mo><msub><mi>τ</mi><mi>t</mi></msub><mo>)</mo><mo>+</mo><msub><mi>ε</mi><mrow><mi>i</mi><mi>t</mi></mrow></msub>`+close;
 return open+`<mi>Δ</mi><mi>ln</mi><mo>(</mo><msub><mi>R</mi><mrow><mi>i</mi><mi>t</mi></mrow></msub><mo>)</mo><mo>=</mo><msub><mi>α</mi><mi>i</mi></msub><mo>+</mo><msub><mi>λ</mi><mi>t</mi></msub><mo>+</mo><msub><mi>β</mi><mi>i</mi></msub><mi>Δ</mi><mi>ln</mi><mo>(</mo><msub><mi>TEU</mi><mrow><mi>i</mi><mi>t</mi></mrow></msub><mo>)</mo><mo>+</mo><msub><mi>θ</mi><mi>i</mi></msub><mi>Δ</mi><mi>ln</mi><mo>(</mo><msub><mi>Naves</mi><mrow><mi>i</mi><mi>t</mi></mrow></msub><mo>)</mo><mo>+</mo><msub><mi>δ</mi><mi>i</mi></msub><msub><mi>Post</mi><mrow><mi>i</mi><mi>t</mi></mrow></msub><mo>+</mo><msub><mi>ε</mi><mrow><mi>i</mi><mi>t</mi></mrow></msub>`+close;
}

function introduction(id:ProjectId):string{
 const c=STUDY_COPY[id];
 return `<article class="chapter-copy">${sectionIntro('INTRODUCCIÓN','El estudio',c.lead)}<div class="chapter-text">${c.paragraphs.map(x=>`<p>${x}</p>`).join('')}</div>
 <div class="research-question"><span class="kicker">Pregunta de investigación</span><h3>${c.question}</h3></div><h3>Objetivos</h3><div class="chapter-objectives">${c.objectives.map((x,i)=>`<div><span>0${i+1}</span><p>${x}</p></div>`).join('')}</div>
 <div class="academic-authors"><strong>Autores</strong><p>${AUTHORS.replace('  -  ',' y ')}</p><a href="./docs/papers/${id}.pdf" target="_blank" rel="noopener noreferrer">Consultar artículo completo ${icon('link',15)}</a></div></article>`;
}
function theory(id:ProjectId):string{
 const c=STUDY_COPY[id];
 return `<section class="academic-library">${sectionIntro('MARCO TEÓRICO','Marco teórico','Selecciona una obra para consultar sus fundamentos y materiales de estudio.')}
 <div class="formula-card"><div><span class="kicker">Especificación del estudio</span><p>${c.formulaNote}</p></div><div class="formula-text" role="math">${formulaMath(id)}</div></div>
 <div class="bibliography-count">Obras consultadas</div><div class="bibliography-search"><label>${icon('search',16)}<input id="lit-search" value="${html(litSearch)}" type="search" placeholder="Buscar autor, obra o tema" aria-label="Buscar en marco teórico"/></label></div>
 <div id="literature-results" class="paper-list">${litCards(id,'teoria',litSearch)}</div></section>`;
}
function literatureView(id:ProjectId,filter:LitKind):string{
 
 return `<section class="academic-library">${sectionIntro('ANTECEDENTES','Antecedentes','Estudios utilizados para situar la pregunta, los métodos y los resultados de esta investigación.')}
<div class="bibliography-search"><label>${icon('search',16)}<input id="lit-search" value="${html(litSearch)}" type="search" placeholder="Buscar artículo, autor o revista" aria-label="Buscar antecedentes"/></label></div>
 <div id="literature-results" class="paper-list">${litCards(id,'antecedente',litSearch)}</div></section>`;
}
function litCards(id:ProjectId,kind:LitKind,q:string):string{
 const query=q.trim().toLocaleLowerCase('es');
 const all=DB.literature.items.filter(l=>l.project===id&&l.kind===kind&&(!query||[l.title,l.authors,l.journal,l.summary,l.doi].join(' ').toLocaleLowerCase('es').includes(query)));
 if(!all.length)return `<div class="no-results">No se encontraron artículos con esos términos.</div>`;
 return all.map((x,i)=>paperItem(x)).join('');
}
function paragraphPart(k:string,txt:string):string{
 return txt?`<section class="abstract-section"><h4>${k}</h4><p>${html(txt)}</p></section>`:'';
}
function paperItem(l:Literature):string{
 const op=expandedLitId===l.id;
 const sect=l.sections||{};
 const head=l.kind==='teoria'?'Obra teórica':'Artículo científico';
 const mainCover=l.cover?`<img loading="lazy" src=".${html(l.cover)}" alt="Portada de ${html(l.journal||'la publicación')}"/>`:`<div class="cover-empty">${icon('book',38)}</div>`;
 const quote=l.kind==='teoria'?(l.summary||l.theoryExcerpt||'Consulta el póster de esta obra para revisar su aportación teórica.'):(l.summary||'Síntesis preparada a partir del artículo y del póster académico.');
 const fields=l.kind==='antecedente'?`<div class="abstract-grid">${paragraphPart('Contexto',sect.contexto||'')}${paragraphPart('Problema',sect.problema||'')}${paragraphPart('Objetivo',sect.objetivo||'')}${paragraphPart('Metodología',sect.metodologia||'')}${paragraphPart('Resultados',sect.resultados||'')}${paragraphPart('Conclusiones',sect.conclusiones||'')}</div>`:`<div class="abstract-section theory-excerpt"><h4>Fundamento y contribución</h4><p>${html(l.theoryExcerpt||l.summary||'La ficha de referencia bibliográfica permite identificar la obra y consultar el póster.')}</p></div>`;
 return `<article class="paper-item ${op?'open':''}" id="${html(l.id)}"><div class="paper-cover-soft" style="${l.cover?`background-image:linear-gradient(90deg,rgba(255,255,255,.99),rgba(255,255,255,.94),rgba(255,255,255,.77)),url('.${html(l.cover)}')`:''}"></div>
 <button class="paper-head" data-action="expand-lit" data-lit="${html(l.id)}" aria-expanded="${op}" aria-controls="abstract-${html(l.id)}"><div class="paper-cover">${mainCover}</div><div class="paper-title"><span class="paper-index">${head} ${String(l.number).padStart(2,'0')}</span><h3>${html(l.title)}</h3><p>${html(l.authors||l.status||'Documento de referencia')}</p>${l.journal?`<span class="paper-journal">${html(l.journal)}${l.year?' ('+html(l.year)+')':''}</span>`:''}${l.kind==='antecedente'?`<span class="paper-quartile" title="${html(l.quartileNote||'Clasificación por categoría temática; SJR 2025')}">${l.quartile?'SJR 2025 '+html(l.quartile): 'Cuartil por confirmar'}</span>`:''}</div><span class="paper-expander">${icon('plus',19)}</span></button>
 <div class="abstract-wrap" id="abstract-${html(l.id)}"><div class="abstract-inner"><h4 class="abstract-overview-title">${l.kind==='teoria'?'Síntesis de la obra':'Resumen general'}</h4><p class="abstract-overview">${html(quote)}</p>${fields}
 <div class="paper-actions">${l.poster?`<a class="btn btn-outline" href=".${html(l.poster)}" download>${icon('download',15)} Descargar póster</a>`:''}${l.source?`<a class="btn btn-outline" href="${html(l.source)}" target="_blank" rel="noopener noreferrer">Fuente original ${icon('link',14)}</a>`:''}${l.quartileSource?`<a class="btn btn-outline" href="${html(l.quartileSource)}" target="_blank" rel="noopener noreferrer">Consultar SJR ${icon('link',14)}</a>`:''}
 ${l.originalEncrypted?`<button class="btn btn-light" data-action="secure" data-lit="${html(l.id)}" data-filekind="original">${icon('lock',15)} Artículo original</button>`:''}${l.esEncrypted?`<button class="btn btn-light" data-action="secure" data-lit="${html(l.id)}" data-filekind="es">${icon('lock',15)} Versión en español</button>`:''}</div>
 <p class="paper-rights">${l.kind==='teoria'?'Consulta de obra teórica.':'Material bibliográfico para revisión académica.'} Las portadas identifican la publicación y pueden no corresponder al ejemplar exacto. Los derechos de las obras corresponden a sus titulares.</p></div></div></article>`;
}
function litModal(id:string):string{return ''}
function methods(id:ProjectId):string{
 const c=STUDY_COPY[id];const sources=sourceLinks(id);
 return `<div class="wide-reading">${sectionIntro('04 / DATOS Y M\u00c9TODOS','De las fuentes a las estimaciones','La trazabilidad es parte del trabajo: los cuadernos de Python documentan las consultas, las transformaciones y los criterios utilizados para construir cada base.')}
 <div class="workflow-line">${c.approach.map((x,i)=>`<div class="workflow-step"><span class="workflow-number">0${i+1}</span><span class="workflow-connector"></span><h3>${['Obtenci\u00f3n','Preparaci\u00f3n','Estimaci\u00f3n'][i]}</h3><p>${x}</p></div>`).join('')}</div><div class="sources-layout"><div><span class="kicker">FUENTES PRIMARIAS</span><h3>Procedencia de los datos</h3><p>Accede a las plataformas estad\u00edsticas y a los archivos procesados. Se muestran los enlaces a las instituciones proveedoras y a las bases utilizadas en la investigación.</p></div><div class="sources-list">${sources.map((s,i)=>`<a href="${html(s.url)}" target="_blank" rel="noopener noreferrer" class="source-row"><span class="source-count">0${i+1}</span><div><strong>${s.name}</strong><small>${s.description}</small></div>${icon('link',17)}</a>`).join('')}</div></div><div class="formula-card method-formula"><div><span class="kicker">ESPECIFICACI\u00d3N EMP\u00cdRICA</span><h3>${id==='hhi'?'\u00cdndice de concentraci\u00f3n':'Modelo principal'}</h3><p>${c.formulaNote}</p></div><div class="formula-text" role="math">${formulaMath(id)}</div></div><div class="section-transition"><div><strong>Consultar cuaderno Jupyter</strong><p>El c\u00f3digo puede consultarse por celdas, incluyendo las partes de web scraping, API y validaci\u00f3n de datos.</p></div><a class="btn btn-dark" href="#/investigacion/${id}/datos" data-action="scroll-materials">Ver c\u00f3digo y descargas ${icon('arrow',15)}</a></div></div>`;
}
function sourceLinks(id:ProjectId):{name:string;description:string;url:string}[]{
 if(id==='pacifico')return [
  {name:'UNCTADstat - PLSCI',description:'\u00cdndice trimestral de conectividad mar\u00edtima por puerto.',url:'https://unctadstat.unctad.org/datacentre/reportInfo/US.PLSCI'},
  {name:'UNCTADstat - LSBCI',description:'Conectividad mar\u00edtima bilateral para pruebas complementarias.',url:'https://unctadstat.unctad.org/datacentre/reportInfo/US.LSBCI'},
  {name:'Autoridad Portuaria Nacional (Per\u00fa)',description:'Estad\u00edsticas operativas y reportes de tr\u00e1fico portuario.',url:'https://piep.apn.gob.pe/publicaciones-estadisticas/'},
  {name:'Observatorio Log\u00edstico de Chile',description:'Datos de contenedores y actividad portuaria.',url:'https://observatorio.observatoriologistico.cl/'},
  {name:'SuperTransporte Colombia',description:'Estad\u00edsticas de tr\u00e1fico portuario.',url:'https://www.supertransporte.gov.co/'},
  {name:'Boletines portuarios de Ecuador',description:'Publicaciones de actividad portuaria.',url:'https://www.mit.gob.ec/boletines-estadisticos-portuarios/'}];
 if(id==='hhi')return [
  {name:'Autoridad Portuaria Nacional',description:'Series mensuales de contenedores (TEU) por terminal.',url:'https://piep.apn.gob.pe/publicaciones-estadisticas/'},
  {name:'Banco Central de Reserva del Per\u00fa',description:'Series macroecon\u00f3micas de contraste.',url:'https://estadisticas.bcrp.gob.pe/estadisticas/series/'},
  {name:'Ministerio de Transportes y Comunicaciones',description:'Licencia para las operaciones comerciales de Chancay.',url:'https://www.gob.pe/institucion/mtc/noticias/1182446-mtc-otorga-al-terminal-portuario-de-chancay-la-licencia-para-el-inicio-oficial-de-sus-operaciones'}];
 return [
  {name:'OSITRAN - Bolet\u00edn estad\u00edstico',description:'Series mensuales de ingresos, contenedores y naves.',url:'https://www.ositran.gob.pe/anterior/publicaciones/boletin-estadistico/'},
  {name:'OSITRAN - Libro de series',description:'Archivo oficial de terminales concesionados.',url:'https://www.ositran.gob.pe/anterior/wp-content/uploads/2026/10/series-puertos-setiembre-26.xlsx'},
  {name:'BCRP - Estad\u00edsticas y API',description:'Tipo de cambio e IPC para homogeneizaci\u00f3n de las series.',url:'https://estadisticas.bcrp.gob.pe/estadisticas/series/'}];
}
function results(id:ProjectId):string{
 if(id==='hhi')return `<div class="wide-reading">${sectionIntro('05 / RESULTADOS','Estructura y concentraci\u00f3n del mercado','Resultados documentados para los meses comparables de junio-octubre de 2024 y 2025. Se muestran cifras del art\u00edculo, no datos generados para la web.')}${hhiOverview().replace(/<div class="source-inline">[\s\S]*?<\/div>\s*$/,'')}<div class="result-notes"><div><span class="kicker">MODELO AR(2)</span><h3>${es(DB.hhi.ar2,1)} puntos HHI</h3><p>Estimaci\u00f3n principal del cambio de nivel. Intervalo de confianza del 95 %: [${es(DB.hhi.lo95,1)}; ${es(DB.hhi.hi95,1)}].</p></div><div><span class="kicker">HHI NORMALIZADO</span><h3>0,082 \u2192 0,159</h3><p>La estructura con tres participantes conserva participaciones desiguales; una reducci\u00f3n del HHI no equivale a igualdad de cuotas.</p></div><div><span class="kicker">ASIGNACI\u00d3N SHAPLEY</span><h3>86,0 %</h3><p>Proporci\u00f3n atribuida al componente asociado a Chancay bajo el criterio de Shapley.</p></div></div></div>`;
 if(id==='peru'){
  const c=DB.income.coefficients;
  return `<div class="wide-reading">${sectionIntro('05 / RESULTADOS','Elasticidades y variaciones de actividad','Los coeficientes corresponden al modelo en primeras diferencias logar\u00edtmicas del art\u00edculo (inferencias agrupadas por mes).')}${incomeExplorer()}<div class="elasticity-grid">${['APM','DPW','PAITA'].map(op=>{const a=c.find(x=>x.variable.includes(`[${op}]:dln_teu`));const b=c.find(x=>x.variable.includes(`[${op}]:dln_naves`));return `<div class="elasticity-card"><span class="kicker">${op==='DPW'?'DP WORLD':op}</span><h3>Respuesta de ingresos</h3><div class="elasticity-value"><span>TEU</span><strong>${a?es(a.value,3):'--'}</strong></div><div class="elasticity-meter"><i style="width:${a?Math.min(100,100*a.value/.75):0}%"></i></div><div class="elasticity-value"><span>Naves</span><strong>${b?es(b.value,3):'--'}</strong></div><div class="elasticity-meter secondary"><i style="width:${b?Math.min(100,100*b.value/.75):0}%"></i></div></div>`}).join('')}</div><div class="result-notes two"><div><span class="kicker">INTERACCIONES COMERCIALES</span><h3>APM +2,03 pp / DP World +3,48 pp</h3><p>Diferencias mensuales estimadas frente a Paita desde junio de 2025. Los intervalos principales incluyen cero.</p></div><div><span class="kicker">INTERPRETACI\u00d3N</span><h3>Asociaciones, no causalidad</h3><p>Las elasticidades estimadas describen covariaciones en el periodo analizado, sin demostrar efectos causales de Chancay.</p></div></div></div>`;
 }
 const chancay=DB.ports.ports.find(p=>p.code==='PECHY')!;
 const callao=DB.ports.ports.find(p=>p.code==='PECLL')!;
 return `<div class="wide-reading">${sectionIntro('05 / RESULTADOS','Conectividad de Chancay frente a Callao','Compara la serie observada de dos puertos de la muestra. Los valores provienen directamente del panel PLSCI utilizado en la estimaci\u00f3n.')}
 <div class="overview-metrics">${resultPill('7,41 %','tendencia relativa estimada por trimestre')}${resultPill('9,03 %','frente a cuatro referentes')}${resultPill('98','observaciones del panel')}</div><div class="results-panel wide-chart"><div class="panel-header"><span class="kicker">PLSCI / UNCTAD</span><span>2025T1 \u2014 2026T3</span></div><h3>Trayectorias observadas</h3><div class="compared-graphs"><div><strong class="series-label"><i style="background:#21897f"></i> Chancay</strong>${lineChart(DB.ports.quarters.map(q=>({x:q,y:chancay.quarterValues[q]})),{width:490,height:190,round:2})}</div><div><strong class="series-label"><i style="background:#557589"></i> Callao</strong>${lineChart(DB.ports.quarters.map(q=>({x:q,y:callao.quarterValues[q]})),{width:490,height:190,round:2,color:'#557589'})}</div></div><div class="panel-footnote">Chancay: ${es(chancay.start,2)} \u2192 ${es(chancay.end,2)}. Callao: ${es(callao.start,2)} \u2192 ${es(callao.end,2)}. Las escalas gr\u00e1ficas se ajustan a cada serie.</div></div><div class="result-notes"><div><span class="kicker">TENDENCIA RELATIVA</span><h3>+7,41 % / trimestre</h3><p>Crecimiento estimado en la raz\u00f3n de conectividad Chancay/Callao en el periodo.</p></div><div><span class="kicker">ROBUSTEZ</span><h3>Resultado positivo</h3><p>La tendencia principal persiste al omitir trimestres individualmente y al restringir la ventana temporal.</p></div><div><span class="kicker">RESIDUOS ESPACIALES</span><h3>Sin evidencia al 5 %</h3><p>Con las matrices probadas, las pruebas de Moran no detectaron agrupamiento espacial residual.</p></div></div></div>`;
}

const DISCUSSION:Record<ProjectId,{paras:string[];points:string[]}>= {
 hhi:{paras:[
 'El índice de concentración resume cómo se distribuye el movimiento de contenedores entre los operadores del conjunto Callao–Chancay. La reducción observada coincide con la incorporación de un nuevo participante, pero no establece por sí sola cómo cambiaron los precios efectivos o el poder de mercado de cada servicio.',
 'La descomposición contable atribuye la mayor parte del cambio a la cuota de Chancay; el índice normalizado, en cambio, señala que siguen existiendo participaciones desiguales. Ambas medidas son complementarias y responden a preguntas distintas.',
 'Para valorar la competencia efectiva también sería necesario observar las alternativas reales de los usuarios, las condiciones de acceso, la frecuencia de atención, los tiempos de espera y las tarifas por servicio.' ],
 points:['El mercado relevante debe delimitarse según los servicios y las alternativas de sustitución disponibles.','El seguimiento del HHI requiere series consistentes de tráfico por terminal.','No se atribuye causalidad al inicio comercial de Chancay.']},
 pacifico:{paras:[
 'El aumento de la conectividad de Chancay durante los siete trimestres estudiados refleja una trayectoria de integración a los servicios regulares de contenedores. Su crecimiento relativo es superior al de Callao, aunque este conserva un valor de conectividad más alto al final del periodo.',
 'El PLSCI recoge dimensiones de conexión marítima y no es una medida de ingresos, tarifas o bienestar social. Por ello, las comparaciones de niveles y tendencias deben interpretarse dentro de su ámbito específico.',
 'El modelo con efectos fijos y tendencias por puerto permite contrastar trayectorias comparables. Las pruebas de sensibilidad apoyan el resultado descriptivo, pero la ventana temporal sigue siendo corta para valorar su permanencia.' ],
 points:['Mantener un seguimiento trimestral de Chancay frente a Callao y otros puertos de referencia.','Complementar el PLSCI con información sobre rutas, frecuencia y continuidad del servicio.','Evitar confundir tendencia de conectividad con impacto causal sobre la competencia.']},
 peru:{paras:[
 'Las elasticidades estimadas muestran diferencias entre los terminales en la asociación entre crecimiento de ingresos y movimiento de contenedores. Para las naves atendidas, la evidencia de diferencias entre operadores es menos concluyente.',
 'Las interacciones del periodo comercial de Chancay se estiman frente a Paita, pero sus intervalos de confianza principales incluyen cero. La comprobación HAC modifica la precisión de algunos contrastes, por lo que las conclusiones deben considerar la sensibilidad de la inferencia.',
 'La conciliación de los datos originales y el tratamiento de la moneda de Paita forman parte central de la reproducibilidad. Su documentación permite distinguir ajustes de medición de relaciones económicas observadas.' ],
 points:['Actualizar las series operativas y monetarias con unidades comparables.','Distinguir respuesta de facturación de mecanismos tarifarios o causales no identificados.','Seguir los ingresos y la actividad por operador y servicio a medida que aumente la muestra.']}
};
const CONCLUSIONS:Record<ProjectId,string[]>={
 hhi:['El HHI promedio del conjunto Callao–Chancay se redujo de 5 410,5 a 4 392,6 puntos entre junio–octubre de 2024 y los mismos meses de 2025, una disminución del 18,8 %.','El componente asociado a la cuota de Chancay explica el 87,4 % de la variación en la descomposición contable. La asignación Shapley obtiene el 86,0 %.','La especificación con errores AR(2) estima un cambio de nivel de −752,1 puntos. Las cuotas continúan siendo desiguales, por lo que la desconcentración observada no equivale a una evaluación completa de competencia.'],
 pacifico:['El PLSCI de Chancay aumentó de 70,37 a 119,08 entre 2025-T1 y 2026-T3, frente al aumento de 280,72 a 305,33 de Callao.','La tendencia estimada de la razón Chancay/Callao fue de 7,41 % por trimestre. En la comparación con cuatro referentes internacionales se estimó 9,03 %.','El resultado conserva signo positivo en los ejercicios de sensibilidad realizados. La continuidad de la serie permitirá evaluar si la trayectoria se mantiene o cambia.'],
 peru:['Las elasticidades de ingreso respecto a TEU estimadas fueron 0,208 para APM, 0,496 para DP World y 0,657 para Paita, con diferencias entre operadores.','Las elasticidades respecto de naves fueron 0,414, 0,491 y 0,444, respectivamente. Las diferencias ajustadas del periodo comercial frente a Paita no fueron concluyentes bajo la inferencia principal.','La revisión de registros de OSITRAN y la homogeneización de la facturación de Paita permiten reproducir las series y sus resultados. Las estimaciones describen asociaciones, no efectos causales demostrados.']
};
function discussion(id:ProjectId):string{
 const o=DISCUSSION[id];
 return `<article class="chapter-copy">${sectionIntro('DISCUSIÓN','Discusión e implicancias regulatorias','Alcances e interpretación económica de los resultados del estudio.')}<div class="chapter-text">${o.paras.map(t=>`<p>${t}</p>`).join('')}</div><h3>Implicancias regulatorias</h3><div class="implications">${o.points.map((t,i)=>`<div><span>${String(i+1).padStart(2,'0')}</span><p>${t}</p></div>`).join('')}</div></article>`;
}
function conclusions(id:ProjectId):string{
 return `<article class="chapter-copy">${sectionIntro('CONCLUSIONES','Conclusiones','Síntesis de los resultados obtenidos y sus límites de interpretación.')}<div class="conclusion-list">${CONCLUSIONS[id].map((t,i)=>`<div><span>${String(i+1).padStart(2,'0')}</span><p>${t}</p></div>`).join('')}</div><a class="btn btn-outline" href="./docs/papers/${id}.pdf" target="_blank" rel="noopener noreferrer">Consultar artículo completo ${icon('link',15)}</a></article>`;
}
function materials(id:ProjectId):string{
 const dataLinks=(id==='pacifico'?[['Panel PLSCI (98 observaciones)','./data/tables/pacifico_panel_98.csv'],['Coordenadas de 14 puertos','./data/tables/pacifico_coordenadas_14.csv']]:id==='peru'?[['Panel integrado, columnas seleccionadas (453)','./data/tables/peru_panel_453_resumen.csv']]:[]);
 return `<div class="wide-reading">${sectionIntro('06 / MATERIAL REPRODUCIBLE','C\u00f3digo, bases y documentos','Los notebooks originales se entregan en una versi\u00f3n de consulta sin salidas ejecutadas. Conservan la l\u00f3gica de extracci\u00f3n, preparaci\u00f3n y estimaci\u00f3n. Algunas celdas requieren conexi\u00f3n a servicios institucionales.')}
 <div class="downloads-grid"><div class="download-card"><div class="download-icon">${icon('book',24)}</div><span>MANUSCRITO</span><h3>Art\u00edculo de investigaci\u00f3n</h3><p>Versi\u00f3n PDF con metodolog\u00eda, resultados y bibliograf\u00eda.</p>${link('./docs/papers/'+id+'.pdf','Abrir PDF '+icon('arrow',16),'download-action')}</div><div class="download-card"><div class="download-icon">${icon('code',24)}</div><span>JUPYTER NOTEBOOK</span><h3>Extracci\u00f3n y estimaci\u00f3n</h3><p>C\u00f3digo Python con consultas HTTP, tratamiento de datos y comprobaciones.</p>${link('./docs/notebooks/'+id+'.ipynb','Descargar .ipynb '+icon('download',16),'download-action')}</div><div class="download-card"><div class="download-icon">${icon('layers',24)}</div><span>REPOSITORIO</span><h3>Material acad\u00e9mico</h3><p>Referencia al proyecto en GitHub para documentar y ampliar la investigaci\u00f3n.</p>${link(PROJECTS[id].repo,'Abrir repositorio '+icon('arrow',16),'download-action')}</div></div>
 ${dataLinks.length?`<div class="data-file-section"><div><span class="kicker">DATOS TABULARES</span><h3>Bases de consulta</h3></div><div>${dataLinks.map(([name,path])=>`<a class="data-file" href="${path}" download><span>${icon('download',16)}</span><strong>${name}</strong><small>CSV</small></a>`).join('')}</div></div>`:''}
 <div class="notebook-section"><div class="notebook-title"><div><span class="kicker">CUADERNO JUPYTER</span><h3>Dentro del notebook</h3><p>Las celdas se muestran directamente desde el archivo .ipynb. Haz clic en cada t\u00edtulo para desplegar el c\u00f3digo.</p></div><span class="python-pill">${icon('code',15)} Python / Jupyter</span></div><div id="notebook-viewer">${notebookMarkup(id)}</div></div><div class="library-note">${icon('book',16)} Reproducibilidad documental no significa ejecuci\u00f3n autom\u00e1tica en la web: las APIs externas, descargas, OCR o Selenium se ejecutan en un entorno Python local. Los recursos originales de terceros deben consultarse respetando sus licencias.</div></div>`;
}
function notebookMarkup(id:ProjectId):string{
 const nb=notebooks[id];if(!nb)return `<div class="notebook-loading"><span class="loader-orbit"></span> Preparando celdas del cuaderno...</div>`;
 const cells=nb.cells.slice(0,notebookVisible);
 return `<div class="notebook-shell"><div class="notebook-shell-top"><span><i></i> ${id.toUpperCase()}_datos_y_estimacion.ipynb</span><span>${nb.cells.length} celdas  -  Python</span></div>${cells.map((c,i)=>{const source=Array.isArray(c.source)?c.source.join(''):c.source;
  if(c.cell_type==='markdown'){
   const first=source.split('\n').find(x=>x.trim())||'Nota';
   const parsed=source.replace(/^#{1,5}\s+/gm,'').replace(/\*\*/g,'').replace(/\*([^*]+)\*/g,'$1');
   return `<div class="notebook-markdown"><span>MD / ${String(i+1).padStart(2,'0')}</span><div><h4>${html(short(first.replace(/^#+\s*/,''),150))}</h4><p>${html(short(parsed.split('\n').slice(1).join(' ').trim(),245))}</p></div></div>`;
  }
  return `<details class="code-cell" ${i===Math.min(2,cells.length-1)?'open':''}><summary><span class="cell-number">In [${String(i+1).padStart(2,'0')}]:</span><strong>${html(source.split('\n').find(s=>s.trim()&&!s.trim().startsWith('#'))?.slice(0,93)||'Bloque de c\u00f3digo')}</strong>${icon('chevron',16)}</summary><div class="code-cell-content"><button class="copy-code" data-action="copy-cell" data-cell="${i}">${icon('copy',14)} Copiar</button><pre><code>${html(source)}</code></pre></div></details>`;
 }).join('')}</div>${notebookVisible<nb.cells.length?`<button class="show-more" data-action="nbmore">Mostrar m\u00e1s celdas (${Math.min(8,nb.cells.length-notebookVisible)} siguientes) ${icon('plus',16)}</button>`:''}`;
}
function updateNotebookIfPresent(id:ProjectId){
 const target=document.getElementById('notebook-viewer');if(target)target.innerHTML=notebookMarkup(id);
}
async function loadNotebook(id:ProjectId){
 if(notebooks[id]||notebookLoading[id])return;
 const builtIn=window.__JO_NOTEBOOKS__?.[id];
 if(builtIn){notebooks[id]=builtIn;updateNotebookIfPresent(id);return;}
 notebookLoading[id]=true;
 try{const res=await fetch('./docs/notebooks/'+id+'.ipynb');if(!res.ok)throw Error('HTTP '+res.status);notebooks[id]=await res.json() as Notebook;}
 catch(e){console.error('Notebook load failed:',e);const target=document.getElementById('notebook-viewer');if(target)target.innerHTML='<div class="no-results">No se pudo abrir el notebook. Comprueba que el sitio se est\u00e9 sirviendo desde HTTP.</div>';return;}
 finally{notebookLoading[id]=false}
 updateNotebookIfPresent(id);
}

function route(){
 const parts=(window.location.hash||'#/').replace(/^#\/?/,'').split('/').filter(Boolean);
 const id=parts[0]==='investigacion'&&['pacifico','hhi','peru'].includes(parts[1])?parts[1] as ProjectId:null;
 const t=parts[2] as TabId;
 selected={project:id,tab:id&&['mapa','lectura','introduccion','marco','antecedentes','datos','resultados','discusion','conclusiones','materiales'].includes(t)?t:'mapa'};
 mobileOpen=false;
 if(selected.tab!=='antecedentes'&&selected.tab!=='marco'){litSearch='';expandedLitId=null;}
 render();window.scrollTo({top:0,behavior:'instant'});
}
function reveal(){
 const els=document.querySelectorAll('.reveal');
 if(!('IntersectionObserver'in window)){els.forEach(el=>el.classList.add('visible'));return}
 const obs=new IntersectionObserver((entries,observer)=>{for(const e of entries)if(e.isIntersecting){e.target.classList.add('visible');observer.unobserve(e.target)}},{threshold:.08});
 els.forEach(el=>obs.observe(el));
}
function render(){
 app.innerHTML=navigation()+(selected.project?study(selected.project,selected.tab):home())+footer()+`<div id="dialog-container"></div>`;
 reveal();
 if(selected.project&&(selected.tab==='datos'||selected.tab==='materiales'))void loadNotebook(selected.project);
 if(selected.project==='pacifico'&&selected.tab==='mapa')setTimeout(()=>attachMap(),20);
}
function getRect(x:number,y:number,w:number,h:number):Rect{return{x,y,w,h}}
const DEFAULT_MAP=getRect(-102,-16,80,82);
function fit(rect:Rect,pad=1.13):Rect{
 const svg=document.getElementById('pacific-map');const aspect=svg?svg.clientWidth/Math.max(1,svg.clientHeight):1.2;
 let w=rect.w*pad,h=rect.h*pad;
 if(w/h<aspect)w=h*aspect;else h=w/aspect;
 const cx=rect.x+rect.w/2,cy=rect.y+rect.h/2;
 return{x:cx-w/2,y:cy-h/2,w,h};
}
function rectForCountry(name:string):Rect{
 const c=DB.countries.countries.find(x=>x.name===name);
 if(!c)return DEFAULT_MAP;
 const [a,b,d,e]=c.bounds;
 return fit({x:a,y:b,w:Math.max(1,d-a),h:Math.max(1,e-b)},1.2);
}
function rectForPort(p:Port):Rect{return fit({x:p.lon-4.5,y:-p.lat-3.2,w:9,h:6.4},1.08)}
function updateMapRect(r:Rect){
 mapRect=r;
 const svg=document.getElementById('pacific-map') as SVGSVGElement|null;
 if(!svg)return;
 svg.setAttribute('viewBox',`${r.x} ${r.y} ${r.w} ${r.h}`);
 // Preserve readable marker sizes across zoom levels.
 const unitsPerPixel=Math.max(r.w/Math.max(1,svg.clientWidth),r.h/Math.max(1,svg.clientHeight));
 const radius=unitsPerPixel*5.6;
 svg.querySelectorAll<SVGCircleElement>('.port-dot').forEach(circle=>{
   circle.setAttribute('r',String(radius));
   circle.setAttribute('stroke-width',String(radius*.24));
 });
 svg.querySelectorAll<SVGCircleElement>('.port-halo').forEach(circle=>{
   circle.setAttribute('r',String(radius*1.78));
   circle.setAttribute('stroke-width',String(radius*.1));
 });
 const ocean=svg.querySelector<SVGTextElement>('.ocean-label');
 if(ocean)ocean.style.opacity=r.w<36?'0':'1';
}
function flyTo(target:Rect,ms=660){
 const svg=document.getElementById('pacific-map');if(!svg){mapRect=target;return}
 if(mapAnimation!==undefined)cancelAnimationFrame(mapAnimation);
 const from={...mapRect};const start=performance.now();
 const f=(t:number)=>{
  const k=Math.min(1,(t-start)/ms),e=1-Math.pow(1-k,3);
  updateMapRect({x:from.x+(target.x-from.x)*e,y:from.y+(target.y-from.y)*e,w:from.w+(target.w-from.w)*e,h:from.h+(target.h-from.h)*e});
  if(k<1)mapAnimation=requestAnimationFrame(f);else mapAnimation=undefined;
 };mapAnimation=requestAnimationFrame(f);
}
function setActiveMapElements(){
 document.querySelectorAll<HTMLButtonElement>('.chip').forEach(el=>{
  el.classList.toggle('selected',el.dataset.country===currentCountry);
  el.setAttribute('aria-pressed',String(el.dataset.country===currentCountry));
 });
 document.querySelectorAll<SVGElement>('.country-shape').forEach(el=>el.classList.toggle('country-selected',el.dataset.country===currentCountry));
 document.querySelectorAll<SVGElement>('.port-marker').forEach(el=>{
  const p=DB.ports.ports.find(x=>x.code===el.dataset.port);
  el.classList.toggle('port-selected',el.dataset.port===currentPort);
  el.classList.toggle('port-dimmed',currentCountry!=='Todos'&&currentCountry!==p?.country);
  const title=el.querySelector('title');if(title&&p)title.textContent=p.name+' - '+currentQuarter+': '+es(p.quarterValues[currentQuarter],2);
 });
 const box=document.getElementById('map-side');if(box)box.innerHTML=mapSideContent();
}
function chooseCountry(country:string){
 if(country!=='Todos'&&!DB.ports.ports.some(x=>x.country===country))return;
 currentCountry=country;
 const first=DB.ports.ports.find(x=>country==='Todos'||x.country===country);
 if(first)currentPort=first.code;
 flyTo(country==='Todos'?DEFAULT_MAP:rectForCountry(country));setActiveMapElements();
}
function choosePort(code:string){
 const p=DB.ports.ports.find(x=>x.code===code);if(!p)return;
 currentPort=code;currentCountry=p.country;
 flyTo(rectForPort(p));setActiveMapElements();
}
function zoomMap(k:number){
 const cx=mapRect.x+mapRect.w/2,cy=mapRect.y+mapRect.h/2;
 const w=Math.max(4,Math.min(140,mapRect.w*k)),h=Math.max(4,Math.min(142,mapRect.h*k));
 flyTo({x:cx-w/2,y:cy-h/2,w,h},380);
}
function attachMap(){
 const svg=document.getElementById('pacific-map') as SVGSVGElement|null;
 if(!svg)return;
 // Keep global rect across focus interactions; reset if the user has never explored.
 updateMapRect(mapRect);
 svg.addEventListener('wheel',(ev:WheelEvent)=>{ev.preventDefault();zoomMap(ev.deltaY<0?.82:1.2)},{passive:false});
 svg.addEventListener('pointerdown',(ev:PointerEvent)=>{
  if(ev.button!==0)return;
  mapDragging={x:ev.clientX,y:ev.clientY,rect:{...mapRect},active:false};
  svg.setPointerCapture(ev.pointerId);
 });
 svg.addEventListener('pointermove',(ev:PointerEvent)=>{
  if(!mapDragging)return;
  let dx=ev.clientX-mapDragging.x,dy=ev.clientY-mapDragging.y;
  if(Math.hypot(dx,dy)>5)mapDragging.active=true;
  if(!mapDragging.active)return;
  updateMapRect({...mapDragging.rect,x:mapDragging.rect.x-dx/svg.clientWidth*mapDragging.rect.w,y:mapDragging.rect.y-dy/svg.clientHeight*mapDragging.rect.h});
 });
 svg.addEventListener('pointerup',()=>{if(mapDragging){const dragged=mapDragging.active;mapDragging=null;if(dragged)svg.dataset.didDrag='yes';setTimeout(()=>delete svg.dataset.didDrag,140)}});
 svg.addEventListener('pointercancel',()=>{mapDragging=null});
 svg.querySelectorAll<SVGElement>('[data-port]').forEach(el=>{
  el.addEventListener('keydown',(ev:KeyboardEvent)=>{if(ev.key==='Enter'||ev.key===' '){ev.preventDefault();choosePort(el.dataset.port||'')}});
 });
}
function libraryRefresh(){
 if(!selected.project)return;
 const target=document.getElementById('literature-results');if(target)target.innerHTML=litCards(selected.project,litKind,litSearch);
 document.querySelectorAll<HTMLButtonElement>('.library-tabs button').forEach(el=>el.classList.toggle('active',el.dataset.kind===litKind));
}
function setModal(id:string){const el=document.getElementById('dialog-container');if(el){el.innerHTML=litModal(id);document.body.style.overflow='hidden'}}
function closeModal(){const el=document.getElementById('dialog-container');if(el)el.innerHTML='';document.body.style.overflow=''}
function copyCell(i:number){
 if(!selected.project)return;
 const c=notebooks[selected.project]?.cells[i];if(!c)return;
 const text=Array.isArray(c.source)?c.source.join(''):c.source;
 void navigator.clipboard?.writeText(text).then(()=>{
  const b=document.querySelector<HTMLButtonElement>(`[data-action="copy-cell"][data-cell="${i}"]`);
  if(b){b.innerHTML=icon('check',14)+' Copiado';setTimeout(()=>b.innerHTML=icon('copy',14)+' Copiar',1400)}
 }).catch(()=>{});
}

function secureModal(id:string,kind:'original'|'es'):string{
 const item=DB.literature.items.find(l=>l.id===id);if(!item)return '';
 return `<div class="modal-backdrop" data-action="close-modal"><div class="secure-dialog" data-modal-body="true" role="dialog" aria-modal="true" aria-label="Acceso a documento"><button class="secure-close" data-action="close-modal" aria-label="Cerrar">${icon('close',20)}</button><div class="secure-lock">${icon('lock',23)}</div><h2>Acceso a material académico</h2><p>Documento disponible para revisión académica de estudiantes de Economía de la Universidad Nacional del Centro del Perú. El uso del material está sujeto a los derechos de sus autores y editoriales.</p><span class="secure-document">${html(item.title)}</span><form id="secure-form"><label for="secure-password">Contraseña de acceso</label><input id="secure-password" type="password" autocomplete="off" required placeholder="Contraseña"/><span id="secure-msg" role="status"></span><button type="submit" class="btn btn-dark secure-submit">Acceder al documento ${icon('arrow',16)}</button></form><small>Con fines académicos. No compartir ni redistribuir copias sin autorización.</small></div></div>`;
}
async function downloadSecure():Promise<void>{
 if(!gatedId)return;
 const item=DB.literature.items.find(v=>v.id===gatedId); const path=gatedKind==='original'?item?.originalEncrypted:item?.esEncrypted;
 const pass=document.querySelector<HTMLInputElement>('#secure-password')?.value||'';
 const msg=document.getElementById('secure-msg');const btn=document.querySelector<HTMLButtonElement>('.secure-submit');
 if(!path||!msg||!pass)return;
 msg.textContent='Preparando el documento...';if(btn)btn.disabled=true;
 try{
  if(!crypto.subtle)throw new Error('Se requiere HTTPS para abrir el documento.');
  const response=await fetch(path);if(!response.ok)throw new Error('El documento protegido no está disponible.');
  const buffer=new Uint8Array(await response.arrayBuffer());
  const magic=new TextDecoder().decode(buffer.slice(0,5));if(magic!=='JORS1')throw new Error('Formato de documento incorrecto.');
  const salt=buffer.slice(5,21),nonce=buffer.slice(21,33),body=buffer.slice(33);
  const keyMaterial=await crypto.subtle.importKey('raw',new TextEncoder().encode(pass),'PBKDF2',false,['deriveKey']);
  const key=await crypto.subtle.deriveKey({name:'PBKDF2',salt,iterations:210000,hash:'SHA-256'},keyMaterial,{name:'AES-GCM',length:256},false,['decrypt']);
  const result=await crypto.subtle.decrypt({name:'AES-GCM',iv:nonce},key,body);
  const url=URL.createObjectURL(new Blob([result],{type:'application/pdf'}));
  const a=document.createElement('a');a.href=url;a.download=`${item?.id||'documento'}-${gatedKind==='original'?'original':'espanol'}.pdf`;document.body.appendChild(a);a.click();a.remove();
  setTimeout(()=>URL.revokeObjectURL(url),12000);closeModal();
 }catch(e){msg.textContent=e instanceof DOMException&&e.name==='OperationError'?'No se pudo abrir el documento. Verifica la contraseña.':String(e instanceof Error?e.message:e);}
 finally{if(btn)btn.disabled=false}
}
function handleAction(el:HTMLElement,ev:MouseEvent){
 const action=el.dataset.action;
 if(action==='close-modal'){
  if(el.dataset.modalBody||((ev.target as HTMLElement).closest('[data-modal-body]')&&!el.classList.contains('modal-close')))return;
  closeModal();return;
 }
 if(action==='scroll-materials'){document.getElementById('research-materials')?.scrollIntoView({behavior:'smooth',block:'start'});return;}
 if(action==='mobile'){mobileOpen=!mobileOpen;render();return;}
 if(action==='country'){
  const svg=document.getElementById('pacific-map');if(svg?.dataset.didDrag)return;
  const country=el.dataset.country||'Todos';chooseCountry(country);return;
 }
 if(action==='port'){
  const svg=document.getElementById('pacific-map');if(svg?.dataset.didDrag)return;
  choosePort(el.dataset.port||'');return;
 }
 if(action==='map-reset'){currentCountry='Todos';flyTo(DEFAULT_MAP);setActiveMapElements();return;}
 if(action==='zoom-in'){zoomMap(.68);return;}
 if(action==='zoom-out'){zoomMap(1.45);return;}
 if(action==='goto-lit'){
  litKind=(el.dataset.kind||'all') as LitKind;
  if(selected.project)window.location.hash=`#/investigacion/${selected.project}/antecedentes`;return;
 }
 if(action==='litkind'){litKind=(el.dataset.kind||'all') as LitKind;litCount=80;libraryRefresh();return;}
 if(action==='litmore'){litCount+=60;libraryRefresh();return;}
 if(action==='expand-lit'){ const id=el.dataset.lit||'';expandedLitId=expandedLitId===id?null:id;document.querySelectorAll<HTMLElement>('.paper-item').forEach(v=>{const on=v.id===expandedLitId;v.classList.toggle('open',on);const h=v.querySelector<HTMLButtonElement>('.paper-head');if(h)h.setAttribute('aria-expanded',String(on));});if(expandedLitId)setTimeout(()=>document.getElementById(expandedLitId||'')?.scrollIntoView({behavior:'smooth',block:'nearest'}),220);return;}
 if(action==='secure'){gatedId=el.dataset.lit||null;gatedKind=el.dataset.filekind==='es'?'es':'original';const box=document.getElementById('dialog-container');if(box){box.innerHTML=secureModal(gatedId||'',gatedKind);document.body.style.overflow='hidden';setTimeout(()=>document.getElementById('secure-password')?.focus(),75);}return;}
 if(action==='domestic-port'){domesticPort=el.dataset.port||'';const svg=document.getElementById('domestic-map') as SVGSVGElement|null;domesticZoom=true;const isPaita=domesticPort==='Paita';if(svg)svg.setAttribute('viewBox',isPaita?'-83 3.5 9 11':'-79 9 4.6 5');document.querySelectorAll('.domestic-port').forEach(x=>x.classList.toggle('active',(x as HTMLElement).dataset.port===domesticPort));const node=document.getElementById('domestic-info');if(node&&selected.project)node.innerHTML=domesticInfo(selected.project);return;}
 if(action==='domestic-reset'){domesticZoom=false;const svg=document.getElementById('domestic-map');if(svg)svg.setAttribute('viewBox','-84 -1 18 20');return;}
 if(action==='nbmore'){notebookVisible+=8;if(selected.project)updateNotebookIfPresent(selected.project);return;}
 if(action==='copy-cell'){copyCell(Number(el.dataset.cell));return;}
}
document.addEventListener('click',(ev:MouseEvent)=>{
 const target=ev.target as HTMLElement;
 const click=target.closest<HTMLElement>('[data-action]');
 if(click){if(click.tagName.toLowerCase()==='a')ev.preventDefault();handleAction(click,ev);return}
 const scrolling=target.closest<HTMLElement>('[data-scroll-to]');
 if(scrolling){ev.preventDefault();const id=scrolling.dataset.scrollTo||'projects';if(selected.project){window.location.hash='#/';setTimeout(()=>document.getElementById(id)?.scrollIntoView({behavior:'smooth'}),140)}else document.getElementById(id)?.scrollIntoView({behavior:'smooth'});return;}
});
document.addEventListener('change',(ev:Event)=>{
 const target=ev.target as HTMLSelectElement;
 if(target.id==='quarter'){
  currentQuarter=target.value;setActiveMapElements();return;
 }
 if(target.id==='operator'){selectedOperator=target.value;const el=document.querySelector('.income-explorer');if(el)el.outerHTML=incomeExplorer();return;}
 if(target.id==='metric'){selectedMetric=target.value as Metric;const el=document.querySelector('.income-explorer');if(el)el.outerHTML=incomeExplorer();return;}
});
document.addEventListener('input',(ev:Event)=>{
 const t=ev.target as HTMLInputElement;if(t.id==='lit-search'){litSearch=t.value;litCount=80;libraryRefresh();}
});
document.addEventListener('submit',(ev:SubmitEvent)=>{if((ev.target as HTMLElement).id==='secure-form'){ev.preventDefault();void downloadSecure();}});
document.addEventListener('keydown',(ev:KeyboardEvent)=>{
 if(ev.key==='Escape')closeModal();
});
window.addEventListener('hashchange',route);

async function main(){
 try{
  if(window.__JO_DATA__){DB=window.__JO_DATA__;mapRect=DEFAULT_MAP;route();return;}
  const files=['ports.json','countries.json','literature.json','income.json','hhi.json'];
  const objects=await Promise.all(files.map(async n=>{
   const r=await fetch('./data/'+n);if(!r.ok)throw new Error(n+': HTTP '+r.status);return r.json();
  }));
  DB={ports:objects[0],countries:objects[1],literature:objects[2],income:objects[3],hhi:objects[4]} as DataBundle;
  mapRect=DEFAULT_MAP;route();
 }catch(e){
  console.error(e);
  app.innerHTML='<div class="fatal-load"><h1>Los datos del sitio no se pudieron cargar.</h1><p>Inicia un servidor HTTP local desde la carpeta public o publica el sitio con GitHub Pages. Abrir index.html mediante file:// no permite cargar archivos JSON.</p><code>python -m http.server 8000 --directory public</code></div>';
 }
}
void main();
