"use strict";
;
const DATA = window.__JO_DATA__;
const NOTEBOOKS = window.__JO_NOTEBOOKS__ || {};
const P = {
    hhi: { id: 'hhi', title: 'Entrada de Chancay y desconcentraci\u00f3n del tr\u00e1fico de contenedores en la costa central peruana', description: 'Concentraci\u00f3n portuaria y distribuci\u00f3n del tr\u00e1fico', repo: 'https://github.com/lizzie-bartolo/research_regulation-hhi', paper: 'hhi.pdf', portNames: ['Chancay', 'Callao'] },
    pacifico: { id: 'pacifico', title: 'Conectividad mar\u00edtima de Chancay y los puertos del Pac\u00edfico sudamericano durante 2025-2026', description: 'Conectividad de l\u00edneas mar\u00edtimas', repo: 'https://github.com/JosephOreAll/research_regulation-Pacificports', paper: 'pacifico.pdf', portNames: DATA.ports.ports.map(x => x.name) },
    peru: { id: 'peru', title: 'Actividad portuaria e ingresos de terminales concesionados en el Per\u00fa durante 2014-2026', description: 'Ingresos y actividad de los terminales', repo: 'https://github.com/JosephOreAll/research_regulation-PeruvianPorts', paper: 'peru.pdf', portNames: ['Paita', 'Callao'] }
};
const CHAPTERS = [
    { id: 'introduccion', title: 'Introducci\u00f3n', image: 'introduccion.png' },
    { id: 'marco', title: 'Marco te\u00f3rico', image: 'marco.png' },
    { id: 'antecedentes', title: 'Antecedentes', image: 'antecedentes.svg' },
    { id: 'metodos', title: 'Materiales y m\u00e9todos', image: 'datos.png' },
    { id: 'resultados', title: 'Resultados', image: 'resultados.png' },
    { id: 'discusion', title: 'Discusi\u00f3n e implicancias regulatorias', image: 'discusion.png' },
    { id: 'conclusiones', title: 'Conclusiones', image: 'conclusiones.png' }
];
const ICONS = {
    arrow: '<path d="M5 12h14m-6-6 6 6-6 6"/>', back: '<path d="m15 18-6-6 6-6"/>',
    plus: '<path d="M12 5v14M5 12h14"/>', minus: '<path d="M5 12h14"/>',
    reset: '<path d="M3 12a9 9 0 1 0 2.5-6.3M3 3v7h7"/>',
    close: '<path d="M5 5l14 14M19 5 5 19"/>', down: '<path d="M12 3v13m-5-5 5 5 5-5M4 19h16"/>',
    github: '<path d="M9 19c-4 1.3-4-2-6-2m12 4v-3.8a3.5 3.5 0 0 0-1-2.8c3.2-.3 6.5-1.5 6.5-7.2A5.5 5.5 0 0 0 19 3.3a5 5 0 0 0-.1-3.1S17 0 15.5 1.4a12 12 0 0 0-6.9 0C7.1 0 5.6.2 5.6.2a5 5 0 0 0-.1 3.1A5.5 5.5 0 0 0 4 7.2c0 5.7 3.3 6.9 6.5 7.2a3.5 3.5 0 0 0-1 2.8V21"/>',
    search: '<circle cx="11" cy="11" r="7"/><path d="m20 20-4-4"/>',
    pin: '<path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z"/><circle cx="12" cy="10" r="2.2"/>',
    lock: '<rect x="5" y="10" width="14" height="11" rx="2"/><path d="M8 10V7a4 4 0 1 1 8 0v3"/>',
    check: '<path d="m4 12 5 5 11-11"/>',
    external: '<path d="M8 4H5a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2h13a2 2 0 0 0 2-2v-3M13 4h8v8m0-8-9 9"/>',
    scroll: '<path d="M8 5h11M8 10h11M8 15h8M4 5h.1M4 10h.1M4 15h.1"/>',
    code: '<path d="m8 17-5-5 5-5m8 0 5 5-5 5M14 4l-4 16"/>',
    book: '<path d="M4 3h13a3 3 0 0 1 3 3v15H7a3 3 0 0 1-3-3V3Zm0 13h16"/>',
    chart: '<path d="M4 20V4m0 16h16M8 14l3-4 4 3 5-8"/>',
    file: '<path d="M5 3h9l5 5v13H5V3Zm9 0v6h5M8 14h8M8 18h6"/>',
    chevron: '<path d="m6 9 6 6 6-6"/>', left: '<path d="m14 6-6 6 6 6"/>', right: '<path d="m10 6 6 6-6 6"/>',
    copy: '<rect x="7" y="7" width="14" height="14" rx="2"/><path d="M17 7V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h2"/>'
};
const ico = (name, size = 18) => `<svg viewBox="0 0 24 24" width="${size}" height="${size}" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${ICONS[name] || ICONS.arrow}</svg>`;
const esc = (val) => String(val ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c] || c));
const num = (v, dec = 1) => new Intl.NumberFormat('es-PE', { minimumFractionDigits: dec, maximumFractionDigits: dec }).format(v);
const shorten = (s, n = 190) => s.length > n ? s.slice(0, n).replace(/\s+\S*$/, '').trim() + '...' : s;
const docUrl = (p) => p.replace(/^\//, './');
const link = (path, label, cls = '') => `<a class="${cls}" href="${esc(path)}" ${/^https?:/.test(path) ? 'target="_blank" rel="noopener noreferrer"' : ''}>${label}${ico('external', 14)}</a>`;
const ui = document.getElementById('app');
const S = { project: null, view: 'home', chapter: 'introduccion', country: '', port: 'PECHY', quarter: '2026T3', operator: 'APM', metric: 'revenue', hhiType: 'hhi', search: '', openLit: '', litTab: 'resumen', nbShow: 10, nbOpen: -1, wheelOpen: true, mapRect: null, collapsed: false, secureId: '', secureKind: 'original', compare: 'PECLL' };
const MAP = {
    pacifico: { x: -92, y: -11, w: 69, h: 77 },
    hhi: { x: -79, y: 8.2, w: 6.4, h: 8.4 },
    peru: { x: -86, y: -1.9, w: 14.5, h: 22.2 }
};
const GEO_PORTS = [
    { code: 'HHI-CHY', name: 'Chancay', country: 'Peru', lat: -11.56667, lon: -77.26667 },
    { code: 'HHI-CAL', name: 'Callao', country: 'Peru', lat: -12.05, lon: -77.13, operators: ['APM', 'DPW'] },
    { code: 'PER-PAI', name: 'Paita', country: 'Peru', lat: -5.077, lon: -81.105, operators: ['PAITA'] },
    { code: 'PER-CAL', name: 'Callao', country: 'Peru', lat: -12.05, lon: -77.13, operators: ['APM', 'DPW'] }
];
const COUNTRY_ES = { Peru: 'Per\u00fa', Chile: 'Chile', Colombia: 'Colombia', Ecuador: 'Ecuador' };
const SJR = {
    'sensors': { q: 'Q1', link: 'https://www.scimagojr.com/journalsearch.php?q=130124&tip=sid' },
    'scientific reports': { q: 'Q1', link: 'https://www.scimagojr.com/journalsearch.php?q=21100200805&tip=sid' },
    'geojournal': { q: 'Q2', link: 'https://www.scimagojr.com/journalsearch.php?q=28772&tip=sid' },
    'journal of shipping and trade': { q: 'Q2', link: 'https://www.scimagojr.com/journalsearch.php?q=21101192304&tip=sid' }
};
const projectEntries = ['hhi', 'pacifico', 'peru'];
function header() { return `<header class="site-head"><a href="#/" class="site-name" aria-label="Research Workspace">Research Workspace</a><span class="head-stroke" aria-hidden="true"></span></header>`; }
function footer() { return `<footer class="footer"><img src="./assets/branding/signature.png" alt="Firma" loading="lazy"/></footer>`; }
function home() { return `<main class="home-shell"><section class="research-gallery" aria-label="Elegir una investigaci\u00f3n">${projectEntries.map((id, i) => `<a class="photo-card photo-${id}" href="#/investigacion/${id}/mapa" style="--delay:${i * 100}ms" aria-label="${esc(P[id].title)}"><img src="./assets/photography/${id}.webp" alt="Fotograf\u00eda portuaria"/><span class="photo-shade"></span><span class="photo-information"><strong>${esc(P[id].title)}</strong><span class="photo-cta">${ico('arrow', 19)}</span></span></a>`).join('')}</section></main>`; }
function anchorTo(page, view, section) { return `#/investigacion/${page}/${view}${section ? '/' + section : ''}`; }
function locationLink(id) { return `<a class="subtle-link" target="_blank" rel="noopener noreferrer" href="${P[id].repo}">Repositorio ${ico('external', 14)}</a>`; }
function dashHeader(id) { return `<div class="dash-heading"><a class="back-link" href="#/">${ico('back', 16)} Investigaciones</a><h1>${esc(P[id].title)}</h1></div>`; }
function dashFooter(id) { return `<div class="dash-bottom"><a href="${anchorTo(id, 'estudio', 'introduccion')}" class="primary-link">Ver investigaci\u00f3n ${ico('arrow', 18)}</a>${locationLink(id)}</div>`; }
function mapPorts(id) { return id === 'pacifico' ? DATA.ports.ports.map(p => ({ ...p, operators: [] })) : GEO_PORTS.filter(p => id === 'hhi' ? p.code.startsWith('HHI') : p.code.startsWith('PER')); }
function mapRectFor(id) { return S.mapRect || MAP[id]; }
function mapMarkers(id, rect) {
    const r = rect.w / 90;
    return mapPorts(id).map(p => {
        const selected = (id === 'pacifico' ? S.port === p.code : (id === 'peru' ? ((S.operator === 'PAITA' && p.name === 'Paita') || (S.operator !== 'PAITA' && p.name === 'Callao')) : (S.port === p.code)));
        const dim = S.country && (id === 'pacifico' ? p.country !== S.country : false);
        return `<g class="map-marker ${selected ? 'chosen' : ''} ${dim ? 'dimmed' : ''}" data-port="${esc(p.code)}" role="button" tabindex="0" aria-label="Puerto ${esc(p.name)}"><circle cx="${p.lon}" cy="${-p.lat}" r="${r * 1.78}" class="halo"/><circle cx="${p.lon}" cy="${-p.lat}" r="${r}" class="dot"/><title>${esc(p.name)}</title></g>`;
    }).join('');
}
function mapMarkup(id) { const rect = mapRectFor(id), countries = DATA.countries.countries; return `<div class="geo-shell"><div id="leaflet-map" class="leaflet-map" aria-label="Mapa navegable"></div><div class="geo-toolbar"><button data-map-reset title="Ver mapa completo" aria-label="Ver mapa completo">${ico('reset', 17)}</button><button data-map-zoom="1.6" title="Acercar" aria-label="Acercar">${ico('plus', 18)}</button><button data-map-zoom="0.625" title="Alejar" aria-label="Alejar">${ico('minus', 18)}</button></div><svg id="map-svg" viewBox="${rect.x} ${rect.y} ${rect.w} ${rect.h}" preserveAspectRatio="xMidYMid meet" aria-label="Mapa interactivo con pa\u00edses y puertos"><rect x="-180" y="-60" width="240" height="200" fill="var(--sea)" />${countries.map(c => `<path data-country="${esc(c.name)}" d="${c.path}" class="country-shape ${S.country === c.name ? 'selected' : ''} ${['Peru', 'Chile', 'Colombia', 'Ecuador'].includes(c.name) ? 'eligible' : ''}" tabindex="0" role="button" aria-label="${esc(COUNTRY_ES[c.name] || c.name)}"><title>${esc(COUNTRY_ES[c.name] || c.name)}</title></path>`).join('')}${mapMarkers(id, rect)}</svg><div class="map-compass"><span>OC\u00c9ANO PAC\u00cdFICO</span></div>${S.country ? `<div class="map-country-tag"><button data-map-reset-country aria-label="Volver a todos los pa\u00edses">${ico('back', 15)}</button>${esc(COUNTRY_ES[S.country] || S.country)}</div>` : ''}</div>`; }
function tableRow(cells) { return `<tr>${cells.map(t => `<td>${t}</td>`).join('')}</tr>`; }
function metricLabel(m) { return m === 'revenue' ? 'Ingresos (USD)' : m === 'teu' ? 'Contenedores (TEU)' : 'Naves atendidas'; }
function portQuarter(id) { return DATA.ports.ports.find(p => p.code === id); }
function selectOptions(v, sel) { return v.map(p => `<option value="${esc(p.value)}" ${sel === p.value ? 'selected' : ''}>${esc(p.name)}</option>`).join(''); }
function dashboard(id) { return `<main class="dashboard"><section class="dashboard-inner">${dashHeader(id)}<div class="map-frame map-${id}"><div class="map-column">${mapMarkup(id)}</div><aside id="map-details" class="map-details">${dashboardPanel(id)}</aside></div>${dashFooter(id)}</section></main>`; }
function dashboardPanel(id) { if (id === 'pacifico')
    return pacificPanel(); if (id === 'hhi')
    return hhiPanel(); return incomePanel(); }
const CHARTS = new Map();
function chartHtml(key, def) {
    CHARTS.set(key, def);
    const v = def.series.flatMap(s => s.values).filter(Number.isFinite), ymin = Math.min(...v), ymax = Math.max(...v);
    const margin = Math.max((ymax - ymin) * .12, Math.abs(ymax) * .035, .15), min = Math.max(0, ymin - margin), max = ymax + margin;
    const xx = (i) => 64 + i * (795 - 94) / Math.max(1, def.x.length - 1), yy = (x) => 270 - (x - min) / (max - min) * 217;
    const lines = def.series.map((ser, si) => `<polyline points="${ser.values.map((val, i) => `${xx(i)},${yy(val)}`).join(' ')}" fill="none" stroke="${ser.color}" stroke-width="3.2" stroke-linecap="round" stroke-linejoin="round"/><g class="chart-points">${ser.values.map((val, i) => `<circle cx="${xx(i)}" cy="${yy(val)}" r="${si === 0 ? 3.5 : 2.6}" fill="${ser.color}"/>`).join('')}</g>`).join('');
    const ticks = Array.from({ length: 5 }, (_, i) => min + (max - min) * i / 4);
    const every = Math.max(1, Math.ceil(def.x.length / 5));
    return `<div class="chart-card" data-chart-wrap="${key}"><div class="chart-top"><div><h3>${esc(def.title)}</h3>${def.unit ? `<p>${esc(def.unit)}</p>` : ''}</div><div class="chart-buttons"><button data-export-png="${key}" title="Guardar gr\u00e1fico PNG">${ico('down', 15)} PNG</button><button data-export-xlsx="${key}" title="Descargar datos Excel">${ico('down', 15)} Excel</button></div></div><div class="svg-chart-shell"><svg class="data-chart" data-chart="${key}" viewBox="0 0 795 300" preserveAspectRatio="xMidYMid meet" aria-label="Gr\u00e1fico interactivo de ${esc(def.title)}"><g class="chart-grids">${ticks.map(t => `<line x1="64" x2="771" y1="${yy(t)}" y2="${yy(t)}"/><text x="54" y="${yy(t) + 4}" text-anchor="end">${num(t, def.unit?.includes('USD') ? 0 : 1)}</text>`).join('')}</g>${lines}<g class="chart-dates">${def.x.filter((_, i) => i % every === 0 || i === def.x.length - 1).map(t => { const i = def.x.indexOf(t); return `<text x="${xx(i)}" y="291" text-anchor="middle">${esc(t)}</text>`; }).join('')}</g><line data-crosshair x1="0" x2="0" y1="32" y2="270" stroke="#89817b" stroke-width="1" stroke-dasharray="4 6" visibility="hidden"/><rect class="chart-hit" x="58" y="15" width="715" height="255" fill="transparent"/></svg><div class="chart-pop" hidden></div></div>${def.series.length > 1 ? `<div class="chart-legend">${def.series.map(s => `<span><i style="background:${s.color}"></i>${esc(s.name)}</span>`).join('')}</div>` : ''}</div>`;
}
function pacificPanel() {
    const p = portQuarter(S.port) || DATA.ports.ports[0], vals = DATA.ports.quarters.map(k => Number(p.quarterValues[k] || 0)), last = Number(p.quarterValues[S.quarter] || p.end), pct = (last / p.start - 1) * 100;
    const countryList = DATA.ports.ports.filter(t => !S.country || S.country === t.country).sort((a, b) => (b.quarterValues[S.quarter] || 0) - (a.quarterValues[S.quarter] || 0));
    return `<div class="detail-content"><div class="detail-heading"><span class="detail-type">${esc(COUNTRY_ES[p.country] || p.country)}</span><h2>${esc(p.name)}</h2></div><div class="metric-grid"><div><span>PLSCI</span><strong>${num(last, 2)}</strong></div><div><span>Cambio desde 2025 T1</span><strong>${pct >= 0 ? '+' : ''}${num(pct, 1)} %</strong></div></div><p class="metric-explain">El PLSCI mide la conectividad de un puerto con los servicios regulares de transporte mar\u00edtimo de contenedores. Un valor m\u00e1s alto indica mayor conectividad.</p><label class="control-line">Trimestre<select id="quarter-select">${selectOptions(DATA.ports.quarters.map(q => ({ name: q.replace('T', ' T'), value: q })), S.quarter)}</select></label>${chartHtml('pacific-port', { title: 'Conectividad de ' + p.name, x: DATA.ports.quarters.map(q => q.replace('T', ' T')), series: [{ name: p.name, values: vals, color: '#b88751' }], unit: '\u00cdndice PLSCI', file: 'conectividad_' + p.name.toLowerCase().replaceAll(' ', '_') })}<div class="detail-table"><h3>Puertos de la muestra</h3><div class="ports-table" role="list">${countryList.map(q => `<button role="listitem" data-port-pick="${esc(q.code)}" class="port-line ${q.code === p.code ? 'active' : ''}"><span>${esc(q.name)}</span><strong>${num(q.quarterValues[S.quarter] || 0, 1)}</strong>${ico('right', 14)}</button>`).join('')}</div></div></div>`;
}
function hhiPanel() {
    const chosen = S.port === 'HHI-CHY' ? 'Chancay' : 'Callao';
    const h = DATA.hhi;
    const hhiType = S.hhiType === 'normalized';
    const vals = hhiType ? h.normalized : h.compare.map(r => r.hhi), label = hhiType ? 'HHI normalizado' : '\u00cdndice Herfindahl-Hirschman (HHI)';
    return `<div class="detail-content"><div class="detail-heading"><span class="detail-type">Costa central peruana</span><h2>${chosen}</h2><p>${chosen === 'Callao' ? 'APM Terminals y DP World' : 'Terminal de Chancay'}</p></div><div class="metric-grid"><div><span>HHI 2024</span><strong>${num(h.compare[0].hhi, 1)}</strong></div><div><span>HHI 2025</span><strong>${num(h.compare[1].hhi, 1)}</strong></div></div><p class="metric-explain">El HHI resume la concentraci\u00f3n del tr\u00e1fico de contenedores entre operadores. Los valores corresponden al conjunto Callao-Chancay, no al puerto elegido.</p><label class="control-line">Indicador<select id="hhi-select"><option value="hhi" ${!hhiType ? 'selected' : ''}>HHI</option><option value="normalized" ${hhiType ? 'selected' : ''}>HHI normalizado</option></select></label>${chartHtml('hhi-trend', { title: label, x: ['Jun-Oct 2024', 'Jun-Oct 2025'], series: [{ name: label, values: vals, color: '#a37648' }], unit: hhiType ? 'Escala normalizada' : 'Puntos HHI', file: hhiType ? 'hhi_normalizado' : 'concentracion_hhi' })}<div class="compact-facts"><div><span>Variaci\u00f3n</span><strong>-18,8 %</strong></div><div><span>Modelo AR(2)</span><strong>-752,1 puntos</strong></div><div><span>Cuota de Chancay en la descomposici\u00f3n</span><strong>87,4 %</strong></div></div></div>`;
}
function incomePanel() {
    const rows = DATA.income.rows.filter(r => r.op === S.operator), vals = rows.map(r => r[S.metric]);
    const last = rows.at(-1);
    let totalTitle = P.peru.description;
    return `<div class="detail-content"><div class="detail-heading"><span class="detail-type">${S.operator === 'PAITA' ? 'Paita' : 'Callao'}</span><h2>${S.operator === 'DPW' ? 'DP World' : S.operator === 'PAITA' ? 'Terminal Portuario de Paita' : 'APM Terminals'}</h2></div><div class="metric-grid"><div><span>${esc(metricLabel(S.metric))}</span><strong>${last ? num(last[S.metric], 0) : '--'}</strong></div><div><span>\u00daltimo mes</span><strong>${last ? esc(last.month) : '--'}</strong></div></div><div class="double-select"><label>Terminal<select id="operator-select">${selectOptions([{ name: 'APM Callao', value: 'APM' }, { name: 'DP World Callao', value: 'DPW' }, { name: 'Paita', value: 'PAITA' }], S.operator)}</select></label><label>Indicador<select id="income-metric-select">${selectOptions([{ name: 'Ingresos', value: 'revenue' }, { name: 'Contenedores', value: 'teu' }, { name: 'Naves', value: 'vessels' }], S.metric)}</select></label></div>${chartHtml('income-trend', { title: metricLabel(S.metric), x: rows.map(r => r.month), series: [{ name: S.operator, values: vals, color: '#a37648' }], unit: S.metric === 'revenue' ? 'USD' : S.metric === 'teu' ? 'TEU' : 'Naves', file: 'actividad_' + S.operator + '_' + S.metric })}<div class="compact-facts"><div><span>Elasticidad respecto a TEU</span><strong>${num(DATA.income.coefficients.find(c => c.variable === `C(op)[${S.operator}]:dln_teu`)?.value || 0, 3)}</strong></div><div><span>Elasticidad respecto a naves</span><strong>${num(DATA.income.coefficients.find(c => c.variable === `C(op)[${S.operator}]:dln_naves`)?.value || 0, 3)}</strong></div></div></div>`;
}
function homeOrRoute() { const raw = location.hash.replace(/^#\/?/, '').split('/').filter(Boolean); if (raw[0] !== 'investigacion' || !projectEntries.includes(raw[1])) {
    S.view = 'home';
    S.project = null;
    return;
} const p = raw[1]; const switchProject = S.project !== p; const oldView = S.view; S.project = p; S.view = raw[2] === 'estudio' ? 'study' : 'dashboard'; if (S.view === 'study' && oldView !== 'study')
    S.wheelOpen = true; if (switchProject) {
    S.country = '';
    S.mapRect = null;
    S.port = p === 'pacifico' ? 'PECHY' : p === 'hhi' ? 'HHI-CHY' : 'PER-CAL';
    S.operator = 'APM';
    S.openLit = '';
    S.search = '';
} if (S.view === 'study') {
    S.chapter = CHAPTERS.find(c => c.id === raw[3])?.id || 'introduccion';
} }
function render() { destroyLeaflet(); homeOrRoute(); CHARTS.clear(); ui.innerHTML = `${header()}<div class="page-transition" key="${S.view}">${S.view === 'home' ? home() : S.view === 'dashboard' ? dashboard(S.project) : studyPage(S.project)}</div>${S.view === 'home' ? footer() : ''}<div id="modal"></div>`; afterRender(); }
function rerenderPartial() { const d = document.getElementById('map-details'); if (d && S.project) {
    CHARTS.clear();
    d.innerHTML = dashboardPanel(S.project);
    initChartEvents(d);
} }
function updateSelection(country, port) {
    if (!S.project)
        return;
    const id = S.project;
    if (country !== undefined)
        S.country = country;
    if (port) {
        S.port = port;
        if (id === 'peru') {
            const g = GEO_PORTS.find(p => p.code === port);
            if (g?.name === 'Paita')
                S.operator = 'PAITA';
            else if (S.operator === 'PAITA')
                S.operator = 'APM';
        }
    }
    const oldMapRect = { ...mapRectFor(id) };
    rerenderPartial();
    updateMapClasses();
    if (leafletLive()) {
        if (country !== undefined) {
            if (country) {
                const layer = leafletCountries.find(it => it.name === country)?.layer;
                if (layer)
                    leafletMap.flyToBounds(layer.getBounds(), { padding: [30, 30], duration: 1, maxZoom: 6 });
            }
            else if (leafletBaseBounds) {
                leafletMap.flyToBounds(leafletBaseBounds, { padding: [45, 45], duration: 1, maxZoom: id === 'hhi' ? 10 : 7 });
            }
        }
        else if (port) {
            const pin = mapPorts(id).find(p => p.code === port);
            if (pin)
                leafletMap.flyTo([pin.lat, pin.lon], Math.max(leafletMap.getZoom(), id === 'pacifico' ? 8 : id === 'hhi' ? 11 : 8), { duration: 1 });
        }
        return;
    }
    if (country !== undefined) {
        const target = country ? countryBounds(country) : MAP[id];
        animateMap(oldMapRect, target, 760);
    }
    else if (port) {
        const p = mapPorts(id).find(p => p.code === port);
        if (p)
            animateMap(oldMapRect, portBounds(id, p.lat, p.lon), 630);
    }
}
function fitBounds(rect, pad = 1.22) { const centerX = rect.x + rect.w / 2, centerY = rect.y + rect.h / 2, w = Math.max(rect.w * pad, 1.3), h = Math.max(rect.h * pad, 1.5); return { x: centerX - w / 2, y: centerY - h / 2, w, h }; }
function countryBounds(name) { const entry = DATA.countries.countries.find(c => c.name === name); if (!entry)
    return MAP[S.project || 'pacifico']; let [x0, y0, x1, y1] = entry.bounds; return fitBounds({ x: x0, y: y0, w: x1 - x0, h: y1 - y0 }, 1.36); }
function portBounds(id, lat, lon) { const w = id === 'pacifico' ? 9.5 : id === 'hhi' ? 1.95 : 4.65, h = id === 'pacifico' ? 11 : id === 'hhi' ? 2.15 : 5.7; return { x: lon - w / 2, y: -lat - h / 2, w, h }; }
function mapSvg() { return document.getElementById('map-svg'); }
let mapAnimation = 0;
function applyRect(r) { const svg = mapSvg(); if (!svg)
    return; svg.setAttribute('viewBox', `${r.x} ${r.y} ${r.w} ${r.h}`); svg.querySelectorAll('.halo').forEach(n => n.setAttribute('r', String(r.w / 90 * 1.78))); svg.querySelectorAll('.dot').forEach(n => n.setAttribute('r', String(r.w / 90))); S.mapRect = { ...r }; }
function animateMap(from, to, ms = 720) {
    if (mapAnimation)
        cancelAnimationFrame(mapAnimation);
    const start = performance.now();
    const ease = (t) => 1 - Math.pow(1 - t, 3);
    const move = (now) => { const p = Math.min(1, (now - start) / ms), u = ease(p); applyRect({ x: from.x + (to.x - from.x) * u, y: from.y + (to.y - from.y) * u, w: from.w + (to.w - from.w) * u, h: from.h + (to.h - from.h) * u }); if (p < 1)
        mapAnimation = requestAnimationFrame(move);
    else
        mapAnimation = 0; };
    mapAnimation = requestAnimationFrame(move);
}
function updateMapClasses() { updateLeafletStyles(); const svg = mapSvg(); if (!svg)
    return; svg.querySelectorAll('[data-country]').forEach(el => el.classList.toggle('selected', el.dataset.country === S.country)); svg.querySelectorAll('[data-port]').forEach(el => { const k = el.dataset.port; el.classList.toggle('chosen', k === S.port); if (S.project === 'pacifico') {
    const p = mapPorts('pacifico').find(q => q.code === k);
    el.classList.toggle('dimmed', !!S.country && p?.country !== S.country);
} }); }
let leafletMap = null;
let leafletPorts = [];
let leafletCountries = [];
let leafletBaseBounds = null;
function leafletLive() { return !!leafletMap && !!document.querySelector('.geo-shell.leaflet-ready'); }
function destroyLeaflet() {
    if (leafletMap) {
        try {
            leafletMap.remove();
        }
        catch { }
    }
    leafletMap = null;
    leafletPorts = [];
    leafletCountries = [];
    leafletBaseBounds = null;
}
function countryTag() {
    const shell = document.querySelector('.geo-shell');
    if (!shell)
        return;
    shell.querySelector('.map-country-tag')?.remove();
    if (S.country) {
        const badge = document.createElement('div');
        badge.className = 'map-country-tag';
        badge.innerHTML = `<button data-map-reset-country aria-label="Volver a todos los países">${ico('back', 15)}</button>${esc(COUNTRY_ES[S.country] || S.country)}`;
        shell.append(badge);
    }
}
function countryCoordinates(path) {
    return (path.match(/M[^M]+/g) || []).map(segment => (segment.match(/-?\d+(?:\.\d+)?,-?\d+(?:\.\d+)?/g) || []).map(pair => {
        const [lon, y] = pair.split(',').map(Number);
        return [-y, lon];
    }).filter(point => Number.isFinite(point[0]) && Number.isFinite(point[1]))).filter(part => part.length > 2);
}
function updateLeafletStyles() {
    if (!leafletMap)
        return;
    leafletCountries.forEach(it => { let active = it.name === S.country; it.layer.setStyle({ fillOpacity: active ? .22 : .06, fillColor: active ? '#9b7651' : '#d4c6b7', color: active ? '#9c7956' : '#b3a89b', weight: active ? 2 : 1 }); });
    leafletPorts.forEach(({ layer, port }) => { const chosen = port.code === S.port || (S.project === 'peru' && ((S.operator === 'PAITA' && port.name === 'Paita') || (S.operator !== 'PAITA' && port.name === 'Callao'))); const faded = !!S.country && port.country !== S.country; layer.setStyle({ radius: chosen ? 9 : 7, color: '#fffdf9', weight: chosen ? 3 : 2, fillColor: chosen ? '#9c6e44' : '#414043', fillOpacity: faded ? .35 : 1, opacity: faded ? .6 : 1 }); });
    countryTag();
}
function initLeafletMap() {
    const L = window.L;
    const node = document.getElementById('leaflet-map');
    if (!L || !node || !S.project)
        return;
    try {
        leafletMap = L.map(node, { zoomControl: false, attributionControl: true, scrollWheelZoom: true, preferCanvas: true, zoomSnap: .1, minZoom: 2, maxZoom: 15, worldCopyJump: false });
        const tiles = L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', { subdomains: 'abcd', maxZoom: 18, attribution: '&copy; OpenStreetMap contributors &copy; CARTO' });
        tiles.on('load', () => node.closest('.geo-shell')?.classList.add('leaflet-ready'));
        tiles.addTo(leafletMap);
        leafletCountries = [];
        for (const c of DATA.countries.countries) {
            if (!['Peru', 'Chile', 'Ecuador', 'Colombia'].includes(c.name))
                continue;
            const coords = countryCoordinates(c.path);
            if (!coords.length)
                continue;
            const layer = L.polygon(coords, { stroke: true, weight: 1, color: '#b3a89b', fillColor: '#d4c6b7', fillOpacity: .06, interactive: S.project === 'pacifico', bubblingMouseEvents: false });
            layer.addTo(leafletMap);
            if (S.project === 'pacifico') {
                layer.bindTooltip(COUNTRY_ES[c.name] || c.name, { direction: 'center', sticky: true, className: 'geo-country-tooltip' });
                layer.on('mouseover', () => layer.setStyle({ fillOpacity: .18, weight: 1.5 }));
                layer.on('mouseout', () => updateLeafletStyles());
                layer.on('click', () => { S.country = c.name; rerenderPartial(); updateLeafletStyles(); leafletMap.flyToBounds(layer.getBounds(), { padding: [30, 30], duration: 1, maxZoom: 6 }); });
            }
            leafletCountries.push({ name: c.name, layer });
        }
        leafletPorts = [];
        const pins = mapPorts(S.project);
        pins.forEach(p => {
            const layer = L.circleMarker([p.lat, p.lon], { radius: 7, color: '#fffaf3', fillColor: '#414043', fillOpacity: 1, weight: 2, bubblingMouseEvents: false });
            layer.bindTooltip(p.name, { direction: 'top', offset: [0, -5], className: 'geo-port-tooltip' });
            layer.addTo(leafletMap);
            layer.on('mouseover', () => layer.setStyle({ radius: 10, fillColor: '#9c6e44' }));
            layer.on('mouseout', () => updateLeafletStyles());
            layer.on('click', () => { updateSelection(undefined, p.code); });
            leafletPorts.push({ port: p, layer });
        });
        leafletBaseBounds = L.latLngBounds(pins.map(p => [p.lat, p.lon]));
        leafletMap.fitBounds(leafletBaseBounds, { padding: [45, 45], maxZoom: S.project === 'hhi' ? 10 : 7, animate: false });
        updateLeafletStyles();
        // Fallback cartography remains interactive until raster map tiles have loaded.
        requestAnimationFrame(() => leafletMap?.invalidateSize());
    }
    catch (err) {
        destroyLeaflet();
    }
}
function initMap() {
    initLeafletMap();
    const svg = mapSvg();
    if (!svg || !S.project)
        return;
    let drag = null;
    let moved = false;
    svg.addEventListener('click', ev => { if (moved) {
        moved = false;
        return;
    } const target = ev.target; const port = target.closest('[data-port]'); const country = target.closest('[data-country]'); if (port) {
        updateSelection(undefined, port.dataset.port || '');
        return;
    } if (country && ['Peru', 'Chile', 'Ecuador', 'Colombia'].includes(country.dataset.country || '')) {
        updateSelection(country.dataset.country || '', undefined);
    } });
    svg.addEventListener('keydown', ev => { if ((ev.key === 'Enter' || ev.key === ' ') && ev.target.closest('[data-port],[data-country]')) {
        ev.preventDefault();
        ev.target.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    } });
    svg.addEventListener('pointerdown', ev => { if (ev.button !== 0)
        return; drag = { x: ev.clientX, y: ev.clientY, r: { ...mapRectFor(S.project) } }; moved = false; });
    svg.addEventListener('pointermove', ev => { if (!drag)
        return; const dx = ev.clientX - drag.x, dy = ev.clientY - drag.y; if (Math.hypot(dx, dy) > 5 && !moved) {
        moved = true;
        svg.setPointerCapture(ev.pointerId);
    } if (!moved)
        return; const rect = svg.getBoundingClientRect(); const r = drag.r; const f = Math.min(rect.width / r.w, rect.height / r.h); applyRect({ ...r, x: r.x - dx / f, y: r.y - dy / f }); });
    svg.addEventListener('pointerup', () => { drag = null; });
    svg.addEventListener('pointercancel', () => drag = null);
    svg.addEventListener('wheel', ev => { ev.preventDefault(); const r = mapRectFor(S.project); const factor = ev.deltaY > 0 ? 1.2 : 0.82; let w = Math.max(1.4, Math.min(100, r.w * factor)), h = Math.max(1.4, Math.min(115, r.h * factor)); const cr = svg.getBoundingClientRect(), cx = (ev.clientX - cr.left) / cr.width, cy = (ev.clientY - cr.top) / cr.height; animateMap(r, { x: r.x + (r.w - w) * cx, y: r.y + (r.h - h) * cy, w, h }, 260); }, { passive: false });
}
function initChartEvents(container = document) {
    container.querySelectorAll('[data-chart]').forEach(svg => {
        const key = svg.dataset.chart || '', def = CHARTS.get(key), wrap = svg.closest('.chart-card'), tip = wrap?.querySelector('.chart-pop'), cross = svg.querySelector('[data-crosshair]');
        if (!def || !wrap || !tip || !cross)
            return;
        svg.addEventListener('pointermove', ev => { const pt = svg.createSVGPoint(); pt.x = ev.clientX; pt.y = ev.clientY; const transform = svg.getScreenCTM(); if (!transform)
            return; const coord = pt.matrixTransform(transform.inverse()); const i = Math.max(0, Math.min(def.x.length - 1, Math.round((coord.x - 64) / (795 - 94) * (def.x.length - 1)))); const x = 64 + i * (795 - 94) / Math.max(1, def.x.length - 1); cross.setAttribute('x1', String(x)); cross.setAttribute('x2', String(x)); cross.setAttribute('visibility', 'visible'); const lines = def.series.map(s => `<span><i style="background:${s.color}"></i>${esc(s.name)} <b>${num(s.values[i], def.unit?.includes('USD') ? 0 : 2)}</b></span>`).join(''); tip.innerHTML = `<strong>${esc(def.x[i])}</strong>${lines}`; tip.hidden = false; const c = wrap.getBoundingClientRect(); tip.style.left = Math.max(10, Math.min(c.width - 180, ev.clientX - c.left + 15)) + 'px'; tip.style.top = Math.max(48, ev.clientY - c.top - 14) + 'px'; });
        svg.addEventListener('pointerleave', () => { cross.setAttribute('visibility', 'hidden'); tip.hidden = true; });
    });
}
function publicKeyTitle(c) { return c === 'hhi' ? 'Concentraci\u00f3n portuaria' : c === 'pacifico' ? 'Conectividad mar\u00edtima' : 'Ingresos portuarios'; }
function saveFile(blob, name) { const url = URL.createObjectURL(blob), el = document.createElement('a'); el.href = url; el.download = name; document.body.appendChild(el); el.click(); el.remove(); window.setTimeout(() => URL.revokeObjectURL(url), 10000); }
function exportPNG(key) {
    const def = CHARTS.get(key);
    if (!def)
        return;
    const canvas = document.createElement('canvas');
    canvas.width = 1600;
    canvas.height = 900;
    const ctx = canvas.getContext('2d');
    if (!ctx)
        return;
    ctx.fillStyle = '#fff';
    ctx.fillRect(0, 0, 1600, 900);
    ctx.fillStyle = '#242327';
    ctx.font = '600 43px Georgia, serif';
    ctx.fillText(def.title, 85, 94);
    ctx.fillStyle = '#6f6760';
    ctx.font = '25px Arial';
    ctx.fillText(def.unit || '', 85, 136);
    const all = def.series.flatMap(s => s.values), y0 = Math.min(...all), y1 = Math.max(...all), pad = Math.max((y1 - y0) * .12, Math.abs(y1) * .035, .15), min = Math.max(0, y0 - pad), max = y1 + pad, plot = { x: 160, y: 210, w: 1350, h: 520 };
    const cx = (i) => plot.x + i * plot.w / Math.max(1, def.x.length - 1), cy = (val) => plot.y + plot.h - (val - min) / (max - min) * plot.h;
    ctx.textAlign = 'right';
    ctx.font = '22px Arial';
    for (let i = 0; i <= 5; i++) {
        const val = min + (max - min) * i / 5, y = cy(val);
        ctx.strokeStyle = '#e6e1dd';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(plot.x, y);
        ctx.lineTo(plot.x + plot.w, y);
        ctx.stroke();
        ctx.fillStyle = '#6e6863';
        ctx.fillText(num(val, def.unit?.includes('USD') ? 0 : 1), plot.x - 18, y + 7);
    }
    ctx.textAlign = 'center';
    const tick = Math.max(1, Math.ceil(def.x.length / 9));
    for (let i = 0; i < def.x.length; i += tick) {
        ctx.fillText(def.x[i], cx(i), plot.y + plot.h + 46);
    }
    ctx.fillText(def.x.at(-1) || '', cx(def.x.length - 1), plot.y + plot.h + 46);
    for (const ser of def.series) {
        ctx.beginPath();
        ctx.strokeStyle = ser.color;
        ctx.lineWidth = 5;
        ctx.lineJoin = 'round';
        ser.values.forEach((val, i) => i === 0 ? ctx.moveTo(cx(i), cy(val)) : ctx.lineTo(cx(i), cy(val)));
        ctx.stroke();
        ctx.fillStyle = ser.color;
        ser.values.forEach((val, i) => { if (def.x.length > 36 && i % Math.ceil(def.x.length / 30) !== 0 && i !== def.x.length - 1)
            return; ctx.beginPath(); ctx.arc(cx(i), cy(val), 5, 0, Math.PI * 2); ctx.fill(); });
    }
    let i = 0;
    ctx.textAlign = 'left';
    ctx.font = '25px Arial';
    def.series.forEach(ser => { ctx.fillStyle = ser.color; ctx.fillRect(80 + i * 420, 836, 26, 11); ctx.fillStyle = '#514b45'; ctx.fillText(ser.name, 116 + i * 420, 846); i++; });
    canvas.toBlob(blob => { if (blob)
        saveFile(blob, def.file + '.png'); }, 'image/png');
}
function crc32(arr) { let crc = 0xffffffff; for (const b of arr) {
    crc ^= b;
    for (let i = 0; i < 8; i++)
        crc = (crc & 1) ? (crc >>> 1) ^ 0xedb88320 : (crc >>> 1);
} return (crc ^ 0xffffffff) >>> 0; }
function zipStore(files) {
    const parts = [];
    const central = [];
    let off = 0;
    const E = new TextEncoder();
    function u16(d, o, v) { d.setUint16(o, v, true); }
    function u32(d, o, v) { d.setUint32(o, v, true); }
    for (const f of files) {
        const name = E.encode(f.name), crc = crc32(f.data), loc = new Uint8Array(30 + name.length), d = new DataView(loc.buffer);
        u32(d, 0, 0x04034b50);
        u16(d, 4, 20);
        u16(d, 6, 0x0800);
        u16(d, 8, 0);
        u32(d, 14, crc);
        u32(d, 18, f.data.length);
        u32(d, 22, f.data.length);
        u16(d, 26, name.length);
        loc.set(name, 30);
        parts.push(loc, f.data);
        const c = new Uint8Array(46 + name.length), q = new DataView(c.buffer);
        u32(q, 0, 0x02014b50);
        u16(q, 4, 20);
        u16(q, 6, 20);
        u16(q, 8, 0x0800);
        u32(q, 16, crc);
        u32(q, 20, f.data.length);
        u32(q, 24, f.data.length);
        u16(q, 28, name.length);
        u32(q, 42, off);
        c.set(name, 46);
        central.push(c);
        off += loc.length + f.data.length;
    }
    const centralOffset = off;
    central.forEach(c => { parts.push(c); off += c.length; });
    const end = new Uint8Array(22);
    const q = new DataView(end.buffer);
    q.setUint32(0, 0x06054b50, true);
    q.setUint16(8, files.length, true);
    q.setUint16(10, files.length, true);
    q.setUint32(12, off - centralOffset, true);
    q.setUint32(16, centralOffset, true);
    parts.push(end);
    const result = new Uint8Array(off + end.length);
    let z = 0;
    for (const part of parts) {
        result.set(part, z);
        z += part.length;
    }
    return result;
}
function excelXML(x) { return x.replace(/[&<>"']/g, t => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[t] || t)); }
function sheetCol(i) { let s = ''; for (i++; i > 0; i = Math.floor((i - 1) / 26))
    s = String.fromCharCode(65 + (i - 1) % 26) + s; return s; }
function xlsxBlob(rows) {
    const X = new TextEncoder();
    const xml = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><worksheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main"><sheetViews><sheetView workbookViewId="0"/></sheetViews><sheetFormatPr defaultRowHeight="17"/><sheetData>${rows.map((r, ri) => `<row r="${ri + 1}">${r.map((v, ci) => `<c r="${sheetCol(ci)}${ri + 1}" ${typeof v === 'number' ? 't="n"' : 't="inlineStr"'}>${typeof v === 'number' ? `<v>${Number.isFinite(v) ? v : 0}</v>` : `<is><t>${excelXML(String(v))}</t></is>`}</c>`).join('')}</row>`).join('')}</sheetData></worksheet>`;
    const contents = `<?xml version="1.0" encoding="UTF-8"?><Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types"><Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/><Default Extension="xml" ContentType="application/xml"/><Override PartName="/xl/workbook.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.main+xml"/><Override PartName="/xl/worksheets/sheet1.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml"/></Types>`;
    const rels = `<?xml version="1.0" encoding="UTF-8"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="xl/workbook.xml"/></Relationships>`;
    const book = `<?xml version="1.0" encoding="UTF-8"?><workbook xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships"><sheets><sheet name="Datos" sheetId="1" r:id="rId1"/></sheets></workbook>`;
    const bookRels = `<?xml version="1.0" encoding="UTF-8"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/worksheet" Target="worksheets/sheet1.xml"/></Relationships>`;
    const files = [['[Content_Types].xml', contents], ['_rels/.rels', rels], ['xl/workbook.xml', book], ['xl/_rels/workbook.xml.rels', bookRels], ['xl/worksheets/sheet1.xml', xml]];
    return new Blob([zipStore(files.map(([name, data]) => ({ name, data: X.encode(data) })))], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
}
function exportExcel(key) { const def = CHARTS.get(key); if (!def)
    return; const rows = [['Fecha', ...def.series.map(s => s.name)], ...def.x.map((x, i) => [x, ...def.series.map(s => s.values[i])])]; saveFile(xlsxBlob(rows), def.file + '.xlsx'); }
function wheelHtml(id) { const active = CHAPTERS.findIndex(ch => ch.id === S.chapter), rot = -(-90 + active * 360 / CHAPTERS.length); return `<div class="wheel-frame"><div class="wheel-orbit"><div class="wheel-rings"></div><div class="wheel-center"><img src="./assets/branding/research-emblem.png" alt="Investigaci\u00f3n"/></div>${CHAPTERS.map((ch, i) => { const angle = (-90 + i * 360 / 7 + rot) * Math.PI / 180, x = Math.cos(angle) * 240, y = Math.sin(angle) * 240; return `<button class="wheel-card ${ch.id === S.chapter ? 'is-selected' : ''}" data-chapter="${ch.id}" style="transform:translate(-50%,-50%) translate(${x.toFixed(2)}px,${y.toFixed(2)}px)" title="${esc(ch.title)}"><img src="./assets/sections/${ch.image}" alt=""/><span>${esc(ch.title)}</span></button>`; }).join('')}</div></div>`; }
function wheelToolbar(id) { return `<div class="wheel-actions"><button data-step="-1" title="Secci\u00f3n anterior" aria-label="Anterior">${ico('left', 19)}</button><button data-wheel-show title="Abrir la rueda">${ico('reset', 18)}</button><button data-step="1" title="Secci\u00f3n siguiente" aria-label="Siguiente">${ico('right', 19)}</button></div><a class="paper-link" href="./docs/papers/${P[id].paper}" download>${ico('down', 15)} Art\u00edculo</a>`; }
function studyPage(id) { return `<main class="study-area"><div class="study-top"><a href="${anchorTo(id, 'mapa')}" class="back-link">${ico('back', 15)} Regresar al mapa</a>${locationLink(id)}</div><div id="study-space" class="study-space ${S.wheelOpen ? 'wheel-only' : 'reading'}"><div class="mobile-chapter-nav">${CHAPTERS.map(ch => `<button data-chapter="${ch.id}" class="${ch.id === S.chapter ? 'active' : ''}">${esc(ch.title)}</button>`).join('')}</div><div class="wheel-clipping">${wheelHtml(id)}${wheelToolbar(id)}</div><section id="study-content" class="study-content" aria-live="polite">${S.wheelOpen ? '' : chapterView(id, S.chapter)}</section></div></main>`; }
function renderSection(id, ch) {
    S.chapter = ch;
    S.wheelOpen = false;
    S.openLit = '';
    S.search = '';
    S.nbShow = 10;
    const space = document.getElementById('study-space'), reader = document.getElementById('study-content');
    space.classList.remove('wheel-only');
    space.classList.add('reading');
    reader.classList.remove('show');
    reader.innerHTML = chapterView(id, ch);
    requestAnimationFrame(() => reader.classList.add('show'));
    const title = CHAPTERS.find(c => c.id === ch)?.title || '';
    const w = document.querySelectorAll('.wheel-card');
    const active = CHAPTERS.findIndex(c => c.id === ch), rot = -(-90 + active * 360 / 7);
    w.forEach((btn, i) => { const angle = (-90 + i * 360 / 7 + rot) * Math.PI / 180, x = Math.cos(angle) * 240, y = Math.sin(angle) * 240; btn.style.transform = `translate(-50%, -50%) translate(${x.toFixed(2)}px, ${y.toFixed(2)}px)`; btn.classList.toggle('is-selected', i === active); });
    S.mapRect = null;
    CHARTS.clear();
    if (ch === 'resultados')
        reader.querySelectorAll('[data-chart]').forEach((node) => { });
    initChartEvents(reader);
    if (ch === 'metodos')
        initNotebook();
    history.replaceState({}, '', anchorTo(id, 'estudio', ch));
    window.scrollTo({ top: 0, behavior: 'smooth' });
}
function chapterView(id, chapter) {
    const titles = { introduccion: 'Introducci\u00f3n', marco: 'Marco te\u00f3rico', antecedentes: 'Antecedentes', metodos: 'Materiales y m\u00e9todos', resultados: 'Resultados', discusion: 'Discusi\u00f3n e implicancias regulatorias', conclusiones: 'Conclusiones' };
    const inner = chapter === 'introduccion' ? introContent(id) : chapter === 'marco' ? literatureSection(id, 'teoria') : chapter === 'antecedentes' ? literatureSection(id, 'antecedente') : chapter === 'metodos' ? methodsContent(id) : chapter === 'resultados' ? resultsContent(id) : chapter === 'discusion' ? discussionContent(id) : conclusionContent(id);
    return `<article class="chapter"><h1>${titles[chapter]}</h1>${inner}</article>`;
}
const INTRO = {
    pacifico: { paras: ['La llegada de Chancay a los servicios regulares de transporte de contenedores plantea una cuesti\u00f3n central para la costa del Pac\u00edfico sudamericano: c\u00f3mo evoluciona su conectividad frente a puertos que ya participan en las principales redes navieras.', 'La comparaci\u00f3n se construye a partir del Port Liner Shipping Connectivity Index (PLSCI) de UNCTAD. Se consideran catorce puertos de Per\u00fa, Chile, Colombia y Ecuador entre 2025 T1 y 2026 T3.', 'El an\u00e1lisis examina diferencias de nivel y tendencias relativas. La especificaci\u00f3n utiliza efectos fijos de puerto y trimestre, con trayectorias diferenciadas. La evoluci\u00f3n estimada no se presenta como un efecto causal de la apertura de Chancay.'], question: '\u00bfC\u00f3mo evolucion\u00f3 la conectividad de Chancay frente al Callao y los principales puertos del Pac\u00edfico sudamericano?', aim: ['Comparar el PLSCI de catorce puertos durante siete trimestres.', 'Estimar la trayectoria relativa de Chancay respecto del Callao.', 'Evaluar la estabilidad de los resultados y sus patrones espaciales.'] },
    hhi: { paras: ['La incorporaci\u00f3n de Chancay al tr\u00e1fico comercial de contenedores ampl\u00eda el conjunto de terminales que operan en la costa central peruana. El estudio examina la redistribuci\u00f3n de vol\u00famenes entre APM Terminals, DP World Callao y Chancay.', 'Para describir la estructura del tr\u00e1fico se calcula el \u00edndice Herfindahl-Hirschman y se compara su nivel antes y despu\u00e9s de la incorporaci\u00f3n comercial del nuevo terminal. Se complementa con una descomposici\u00f3n de la variaci\u00f3n y una especificaci\u00f3n de errores autorregresivos.', 'La concentraci\u00f3n del movimiento de contenedores es un indicador de estructura. Su variaci\u00f3n no permite, por s\u00ed sola, concluir que los precios, la calidad del servicio o el poder de mercado hayan cambiado.'], question: '\u00bfQu\u00e9 magnitud tuvo la variaci\u00f3n del HHI y qu\u00e9 parte se relaciona con la participaci\u00f3n de Chancay?', aim: ['Medir la concentraci\u00f3n del tr\u00e1fico portuario con criterios comparables.', 'Descomponer la variaci\u00f3n del HHI entre los componentes del conjunto.', 'Contrastar su cambio mediante una especificaci\u00f3n temporal.'] },
    peru: { paras: ['Los ingresos portuarios est\u00e1n vinculados con la intensidad de uso de las instalaciones, los servicios prestados y las condiciones bajo las que operan los terminales. Esta investigaci\u00f3n analiza los ingresos de APM Terminals Callao, DP World Callao y Paita.', 'Se re\u00fanen registros mensuales de OSITRAN y series complementarias del BCRP entre 2014 y 2026. La consistencia de las unidades y de la moneda de facturaci\u00f3n se revisa antes de estimar el modelo.', 'La estimaci\u00f3n utiliza cambios logar\u00edtmicos mensuales, efectos fijos y pendientes por concesionario. Se estudia la asociaci\u00f3n entre ingresos, contenedores y naves, evitando presentar las diferencias estimadas como efectos causales de la operaci\u00f3n de Chancay.'], question: '\u00bfC\u00f3mo se relaciona la evoluci\u00f3n de los ingresos con la actividad de cada terminal concesionado?', aim: ['Construir un panel mensual coherente de ingresos y actividad.', 'Estimar elasticidades de ingresos ante variaciones de TEU y naves.', 'Comparar las estimaciones por operador y evaluar su sensibilidad.'] }
};
function introContent(id) { const d = INTRO[id]; return `<div class="prose lead-prose">${d.paras.map(t => `<p>${esc(t)}</p>`).join('')}</div><div class="question-plate"><span>Pregunta de investigaci\u00f3n</span><p>${esc(d.question)}</p></div><h2>Objetivos</h2><div class="objective-grid">${d.aim.map((t, i) => `<div><span>${String(i + 1).padStart(2, '0')}</span><p>${esc(t)}</p></div>`).join('')}</div>`; }
const THEORY_TOPIC = [
    { match: /economides|economics of networks/i, fund: 'La econom\u00eda de redes explica c\u00f3mo el valor de participar en un sistema depende de la cantidad y calidad de sus conexiones. Las complementariedades, los costos de compatibilidad y las externalidades pueden influir en la organizaci\u00f3n del mercado.', usage: 'Ofrece una base para interpretar la posici\u00f3n de los puertos dentro de las redes regulares de transporte y distinguir conectividad de otros indicadores de actividad.' },
    { match: /katz|shapiro|network externalities/i, fund: 'Katz y Shapiro estudian las decisiones de los usuarios cuando la utilidad de una tecnolog\u00eda o un servicio aumenta con su base de participantes. La compatibilidad y las expectativas condicionan la adopci\u00f3n y la competencia.', usage: 'En el transporte mar\u00edtimo permite discutir por qu\u00e9 una conexi\u00f3n adicional puede modificar las alternativas de navieras y terminales.' },
    { match: /fujita|mori|making of major cities/i, fund: 'El modelo de aglomeraci\u00f3n vincula localizaci\u00f3n portuaria, acceso al intercambio y concentraci\u00f3n espacial de la actividad. Un nodo favorable puede atraer actividades complementarias y reforzar su posici\u00f3n territorial.', usage: 'Ayuda a situar la conectividad portuaria dentro del desarrollo espacial y la persistencia de corredores comerciales.' },
    { match: /baumol|panzar|willig|contestable markets/i, fund: 'La teor\u00eda de los mercados disputables sostiene que las condiciones de entrada y salida pueden limitar la conducta de los operadores establecidos, incluso en mercados con pocos participantes. Los costos hundidos y la respuesta de los incumbentes son decisivos.', usage: 'Permite separar concentraci\u00f3n observada de presi\u00f3n competitiva potencial, una distinci\u00f3n especialmente pertinente para los puertos.' },
    { match: /rey y tirole|foreclosure|exclusiones/i, fund: 'El an\u00e1lisis de exclusi\u00f3n vertical estudia c\u00f3mo el control de infraestructuras o insumos puede modificar los incentivos de acceso y las alternativas de los competidores. Los resultados dependen de los contratos y de la estructura de las relaciones comerciales.', usage: 'Proporciona un marco para discutir condiciones de acceso a instalaciones y servicios, sin inferir conductas excluyentes a partir de un solo indicador.' },
    { match: /de langen y pallis|entry barriers/i, fund: 'Las barreras de entrada en los puertos incluyen infraestructura espec\u00edfica, disponibilidad de suelo, concesiones, conectividad terrestre y relaciones con usuarios. Su importancia var\u00eda seg\u00fan el servicio y el mercado relevante.', usage: 'Ayuda a explicar por qu\u00e9 agregar capacidad portuaria no equivale necesariamente a lograr competencia efectiva.' },
    { match: /regulatory capture/i, fund: 'La captura regulatoria describe situaciones en las que los intereses de agentes regulados pueden influir sobre la informaci\u00f3n y las decisiones del regulador. La asimetr\u00eda informativa es un elemento central del problema.', usage: 'Sirve para discutir dise\u00f1o institucional, transparencia y supervisi\u00f3n de concesiones sin afirmar que exista captura en un caso concreto.' },
    { match: /notteboom y rodrigue|port regionalization/i, fund: 'La regionalizaci\u00f3n portuaria muestra que las conexiones entre terminales, zonas log\u00edsticas y corredores del interior ampl\u00edan el alcance del puerto m\u00e1s all\u00e1 del frente mar\u00edtimo.', usage: 'Permite interpretar la competitividad portuaria como parte de una red de transporte y no solo como una caracter\u00edstica de la infraestructura costera.' },
    { match: /armstrong y vickers/i, fund: 'La regulaci\u00f3n y la competencia pueden coexistir cuando los operadores comparten infraestructuras o prestan servicios relacionados. Los incentivos, las reglas de acceso y las posibilidades de entrada condicionan el resultado.', usage: 'Aporta criterios para evaluar estructura y acceso en un mercado con instalaciones de uso intensivo en capital.' },
    { match: /naldi y flamini/i, fund: 'El \u00edndice Herfindahl-Hirschman suma los cuadrados de las participaciones de mercado. Sus propiedades permiten estudiar de forma sistem\u00e1tica c\u00f3mo se modifica la concentraci\u00f3n cuando cambian el n\u00famero y el peso relativo de los participantes.', usage: 'Justifica el c\u00e1lculo y la descomposici\u00f3n del HHI del tr\u00e1fico portuario, sin confundir el indicador con una medici\u00f3n directa de precios.' },
    { match: /demsetz/i, fund: 'El estudio de las barreras a la entrada distingue las ventajas que realmente dificultan el acceso de nuevos competidores de las diferencias de eficiencia entre empresas. La regulaci\u00f3n requiere identificar el origen de esas ventajas.', usage: 'Orienta la discusi\u00f3n de estructura de mercado y acceso al sistema portuario.' },
    { match: /wan|zhang y li/i, fund: 'La competencia entre puertos est\u00e1 condicionada por conexiones terrestres, rutas mar\u00edtimas, costos generalizados y decisiones de las navieras. Las cuotas de tr\u00e1fico reflejan varias dimensiones de elecci\u00f3n.', usage: 'Aporta un marco para discutir sustituci\u00f3n de servicios y rivalidad entre terminales sin reducirla a participaciones agregadas.' },
    { match: /stigler|economic regulation/i, fund: 'La teor\u00eda econ\u00f3mica de la regulaci\u00f3n examina los incentivos de distintos grupos para influir en la intervenci\u00f3n p\u00fablica. Su aportaci\u00f3n es integrar econom\u00eda pol\u00edtica y organizaci\u00f3n industrial.', usage: 'Ayuda a estructurar el an\u00e1lisis de incentivos regulatorios y condiciones de mercado en los servicios portuarios.' },
    { match: /laffont y tirole.*1993|theory of incentives/i, fund: 'La regulaci\u00f3n de incentivos aborda el dise\u00f1o de contratos cuando el operador conoce mejor sus costos y su esfuerzo que la autoridad reguladora. Los mecanismos de remuneraci\u00f3n equilibran eficiencia, informaci\u00f3n y riesgo.', usage: 'Es pertinente para interpretar la facturaci\u00f3n de concesionarios dentro de un marco institucional y contractual.' },
    { match: /laffont y tirole.*1988|estructura de la regulacion/i, fund: 'El an\u00e1lisis de informaci\u00f3n asim\u00e9trica muestra c\u00f3mo las decisiones del regulador dependen de costos e incentivos que no observa plenamente. La estructura institucional altera el margen de actuaci\u00f3n de los operadores.', usage: 'Permite discutir mecanismos regulatorios junto a la evidencia de concentraci\u00f3n, sin derivar causalidad de las cuotas.' },
    { match: /laffont y tirole.*1994|acceso e incentivos/i, fund: 'El precio de acceso a una infraestructura compartida condiciona las decisiones de entrada y el equilibrio entre eficiencia y competencia. Los resultados dependen de costos, reglas y alternativas disponibles.', usage: 'Sustenta la necesidad de observar condiciones de acceso y tarifas cuando se interpreta la competencia portuaria.' },
    { match: /de langen \(2007\)|port competition and selection/i, fund: 'La elecci\u00f3n de puerto depende de costos generalizados, conexiones con el hinterland y servicios disponibles. Los mercados de influencia pueden superponerse y dar lugar a rivalidad por determinadas cargas.', usage: 'Ayuda a explicar la evoluci\u00f3n de ingresos y tr\u00e1fico sin suponer que todos los puertos compiten en un \u00fanico mercado homog\u00e9neo.' },
    { match: /talley|economic theory of the port/i, fund: 'Una teor\u00eda econ\u00f3mica del puerto relaciona demanda por servicios, capacidad, operaciones y costos dentro de una cadena log\u00edstica. El terminal presta servicios a usuarios con distintas necesidades.', usage: 'Orienta la selecci\u00f3n de variables operativas asociadas con los ingresos de concesionarios.' },
    { match: /motta|competition policy/i, fund: 'El an\u00e1lisis de pol\u00edtica de competencia estudia poder de mercado, barreras y efectos de las conductas en el bienestar. Los mercados relevantes y la evidencia de sustituci\u00f3n son centrales para una evaluaci\u00f3n aplicada.', usage: 'Permite diferenciar concentraci\u00f3n de competencia efectiva y situar los resultados en su contexto regulatorio.' },
    { match: /notteboom.*pallis.*rodrigue|port economics/i, fund: 'La econom\u00eda portuaria integra operaciones, concesiones, estrategias de navieras, cadenas log\u00edsticas y conectividad terrestre. Los ingresos representan una parte del funcionamiento econ\u00f3mico de los terminales.', usage: 'Aporta el marco sectorial para interpretar los registros operativos y la diversidad de servicios de los puertos peruanos.' }
];
function theoryInfo(p, id) { if (/pendiente/i.test(p.title))
    return { fund: 'La referencia se encuentra pendiente de verificaci\u00f3n documental.', usage: 'No se presenta como material revisado hasta contar con el documento comprobado.' }; const t = THEORY_TOPIC.find(x => x.match.test(p.title)); return { fund: t?.fund || 'La obra examina los mecanismos econ\u00f3micos que explican la organizaci\u00f3n de los mercados y la relaci\u00f3n entre sus participantes.', usage: t?.usage || 'Sirve como referencia conceptual para contextualizar las preguntas de esta investigaci\u00f3n.' }; }
function workQuartile(d) {
    let journal = (d.journal || '').toLowerCase().trim();
    const lookup = Object.entries(SJR).find(([j]) => journal.startsWith(j));
    const candidate = lookup?.[1];
    const quartile = candidate?.q || (d.quartile && !d.quartile.includes('*') ? d.quartile : null);
    const linkSjr = candidate?.link || `https://www.scimagojr.com/journalsearch.php?q=${encodeURIComponent((d.journal || d.title).replace(/,.*$/, ''))}`;
    return `<a class="quartile-link" href="${esc(linkSjr)}" target="_blank" rel="noopener noreferrer" title="Verificar el cuartil de la revista en SCImago">${quartile ? `SJR ${esc(quartile)}` : 'Consultar SJR'} ${ico('external', 12)}</a>`;
}
function summaryGeneral(d) {
    const x = d.sections || {};
    const first = (raw, max) => { const t = (raw || '').replace(/\s+/g, ' ').trim(); if (!t)
        return ''; const m = t.match(/^.*?[.!?](?=\s|$)/); const sent = m ? m[0] : t; if (sent.length <= max)
        return sent; const limit = sent.slice(0, max); return limit.replace(/\s+\S*$/, '').trim().replace(/[,;:-]+$/, '') + '.'; };
    const obj = (x.objetivo || '').trim();
    if (!obj)
        return first(d.summary || '', 420);
    let start = /^(medir|estimar|comparar|examinar|analizar|evaluar|construir|identificar|determinar|estudiar|investigar|explicar|describir|explorar|calcular)\b/i.test(obj) ? 'El estudio busca ' + obj.charAt(0).toLowerCase() + obj.slice(1) : obj;
    if (!/[.!?]$/.test(start))
        start += '.';
    const method = first(x.metodologia || '', 190);
    const result = first(x.resultados || x.conclusiones || '', 230);
    return [start, method, result].filter(Boolean).join(' ');
}
function litTabs(d) { return ['resumen', 'contexto', 'problema', 'objetivo', 'metodologia', 'resultados', 'conclusiones'].map((t, i) => `<button data-lit-tab="${t}" data-lit-id="${d.id}" class="lit-tab ${S.litTab === t ? 'active' : ''}">${['Resumen general', 'Contexto', 'Problema', 'Objetivo', 'Metodolog\u00eda', 'Resultados', 'Conclusiones'][i]}</button>`).join(''); }
function litParagraph(d, tab) { if (tab === 'resumen')
    return summaryGeneral(d); return d.sections?.[tab] || 'Este apartado no est\u00e1 desarrollado en la ficha original.'; }
function secureButtons(d) { return `<div class="work-actions">${d.poster ? `<a href="${docUrl(d.poster)}" target="_blank" rel="noopener noreferrer" class="outline-btn">${ico('down', 15)} P\u00f3ster</a>` : ''}${d.originalEncrypted ? `<button data-secure="${esc(d.id)}" data-kind="original" class="outline-btn">${ico('lock', 14)} Art\u00edculo original</button>` : d.source ? link(d.source, 'Art\u00edculo original', 'outline-btn') : ''}${d.esEncrypted ? `<button data-secure="${esc(d.id)}" data-kind="es" class="outline-btn">${ico('lock', 14)} Versi\u00f3n en espa\u00f1ol</button>` : ''}</div>`; }
function litCard(d, kind) {
    const summary = kind === 'antecedente' ? `<div class="lit-tabs">${litTabs(d)}</div><div class="lit-section-body">${esc(litParagraph(d, S.litTab))}</div>` : (() => { const k = theoryInfo(d, S.project); return `<div class="theory-copy"><h3>Fundamento</h3><p>${esc(k.fund)}</p><h3>Relaci\u00f3n con el estudio</h3><p>${esc(k.usage)}</p></div>`; })();
    return `<article class="lit-item ${S.openLit === d.id ? 'expanded' : ''}" data-work="${d.id}" style="--cover-image:url('${d.cover ? docUrl(d.cover) : ''}')"><button class="work-head" data-work-toggle="${d.id}" aria-expanded="${S.openLit === d.id ? 'true' : 'false'}"><span class="work-cover">${d.cover ? `<img src="${docUrl(d.cover)}" alt="Portada editorial" loading="lazy"/>` : `<span class="cover-placeholder">${ico('book', 26)}</span>`}</span><span class="work-id"><strong>${esc(d.title)}</strong><small>${esc(d.authors)}</small>${kind === 'antecedente' ? `<span class="work-journal">${esc(d.journal || '')} ${d.year ? '(' + esc(d.year) + ')' : ''}</span>` : ''}</span><span class="work-arrow">${ico(S.openLit === d.id ? 'close' : 'plus', 19)}</span></button>${kind === 'antecedente' ? `<div class="work-quartile">${workQuartile(d)}</div>` : ''}<div class="work-reveal"><div class="work-reveal-inner">${summary}${secureButtons(d)}</div></div></article>`;
}
function literatureSection(id, kind) { const works = DATA.literature.items.filter(d => d.project === id && d.kind === kind), q = S.search.toLowerCase(), filtered = works.filter(d => `${d.title} ${d.authors} ${d.journal || ''}`.toLowerCase().includes(q)); return `<div class="literature-area"><div class="search-area">${ico('search', 17)}<input id="literature-search" type="search" placeholder="Buscar autor, t\u00edtulo o revista" value="${esc(S.search)}" autocomplete="off"/></div><div id="literature-list" class="literature-list">${filtered.map(d => litCard(d, kind)).join('') || '<p class="no-results">Sin resultados para esta b\u00fasqueda.</p>'}</div></div>`; }
const SOURCE_LINKS = {
    pacifico: [{ name: 'UNCTADstat', desc: 'Port Liner Shipping Connectivity Index y series trimestrales.', url: 'https://unctadstat.unctad.org/datacentre/' }, { name: 'Autoridad Portuaria Nacional', desc: 'Estad\u00edsticas del sistema portuario peruano.', url: 'https://piep.apn.gob.pe/publicaciones-estadisticas/' }],
    hhi: [{ name: 'Autoridad Portuaria Nacional', desc: 'Movimiento de contenedores por terminal.', url: 'https://piep.apn.gob.pe/publicaciones-estadisticas/' }, { name: 'Banco Central de Reserva del Per\u00fa', desc: 'Series econ\u00f3micas de referencia.', url: 'https://estadisticas.bcrp.gob.pe/estadisticas/series/' }],
    peru: [{ name: 'OSITRAN', desc: 'Actividad e ingresos de terminales concesionados.', url: 'https://www.ositran.gob.pe/' }, { name: 'Banco Central de Reserva del Per\u00fa', desc: 'Tipo de cambio e \u00edndices de precios.', url: 'https://estadisticas.bcrp.gob.pe/estadisticas/series/' }]
};
function formula(id) {
    if (id === 'hhi')
        return `<math xmlns="http://www.w3.org/1998/Math/MathML" display="block"><mrow><msub><mi>HHI</mi><mi>t</mi></msub><mo>=</mo><mn>10000</mn><munderover><mo>\u2211</mo><mrow><mi>i</mi><mo>=</mo><mn>1</mn></mrow><msub><mi>N</mi><mi>t</mi></msub></munderover><msup><msub><mi>s</mi><mrow><mi>i</mi><mi>t</mi></mrow></msub><mn>2</mn></msup></mrow></math>`;
    if (id === 'pacifico')
        return `<math xmlns="http://www.w3.org/1998/Math/MathML" display="block"><mrow><mi mathvariant="normal">ln</mi><mo>(</mo><msub><mi>PLSCI</mi><mrow><mi>i</mi><mi>t</mi></mrow></msub><mo>)</mo><mo>=</mo><msub><mi>\u03b1</mi><mi>i</mi></msub><mo>+</mo><msub><mi>\u03bb</mi><mi>t</mi></msub><mo>+</mo><munder><mo>\u2211</mo><mrow><mi>j</mi><mo>\u2260</mo><mi>Callao</mi></mrow></munder><msub><mi>\u03b3</mi><mi>j</mi></msub><mo>(</mo><msub><mi>D</mi><mrow><mi>i</mi><mi>j</mi></mrow></msub><mo>\u00d7</mo><msub><mi>\u03c4</mi><mi>t</mi></msub><mo>)</mo><mo>+</mo><msub><mi>\u03b5</mi><mrow><mi>i</mi><mi>t</mi></mrow></msub></mrow></math>`;
    return `<math xmlns="http://www.w3.org/1998/Math/MathML" display="block"><mrow><mi>\u0394</mi><mi mathvariant="normal">ln</mi><mo>(</mo><msub><mi>R</mi><mrow><mi>i</mi><mi>t</mi></mrow></msub><mo>)</mo><mo>=</mo><msub><mi>\u03b1</mi><mi>i</mi></msub><mo>+</mo><msub><mi>\u03bb</mi><mi>t</mi></msub><mo>+</mo><msub><mi>\u03b2</mi><mi>i</mi></msub><mi>\u0394</mi><mi mathvariant="normal">ln</mi><mo>(</mo><msub><mi>TEU</mi><mrow><mi>i</mi><mi>t</mi></mrow></msub><mo>)</mo><mo>+</mo><msub><mi>\u03b8</mi><mi>i</mi></msub><mi>\u0394</mi><mi mathvariant="normal">ln</mi><mo>(</mo><msub><mi>Naves</mi><mrow><mi>i</mi><mi>t</mi></mrow></msub><mo>)</mo><mo>+</mo><msub><mi>\u03b4</mi><mi>i</mi></msub><msub><mi>Post</mi><mrow><mi>i</mi><mi>t</mi></mrow></msub><mo>+</mo><msub><mi>\u03b5</mi><mrow><mi>i</mi><mi>t</mi></mrow></msub></mrow></math>`;
}
function modelNote(id) { return id === 'pacifico' ? 'Efectos fijos de puerto y trimestre; tendencias espec\u00edficas por puerto con Callao como referencia.' : id === 'hhi' ? 'La participaci\u00f3n de cada terminal se expresa como fracci\u00f3n del tr\u00e1fico total del conjunto.' : 'Las variaciones mensuales de ingresos se relacionan con cambios de actividad; pendientes espec\u00edficas por terminal.'; }
function notebookCell(id) {
    const book = NOTEBOOKS[id];
    if (!book)
        return '<p>No se encontr\u00f3 el cuaderno.</p>';
    return `<div class="notebook-viewer"><div class="notebook-header"><span>Python / Jupyter</span><a href="./docs/notebooks/${id}.ipynb" download class="outline-btn">${ico('down', 14)} Descargar notebook</a></div>${book.cells.slice(0, S.nbShow).map((cell, i) => {
        const source = Array.isArray(cell.source) ? cell.source.join('') : cell.source;
        const first = source.split('\n').find(t => t.trim()) || '';
        if (cell.cell_type === 'markdown')
            return `<div class="markdown-cell"><span>MD</span><p>${esc(shorten(source.replace(/[#*`]/g, '').replace(/\n/g, ' ').trim(), 260))}</p></div>`;
        return `<details class="notebook-cell" ${S.nbOpen === i ? 'open' : ''}><summary><span>In [${i + 1}]</span>${esc(shorten(first.trim(), 102))}${ico('chevron', 15)}</summary><button class="copy-cell" data-copy-cell="${i}">${ico('copy', 13)} Copiar</button><pre><code>${esc(source)}</code></pre></details>`;
    }).join('')}${S.nbShow < book.cells.length ? `<button class="show-cells" data-show-more>Ver m\u00e1s celdas ${ico('plus', 16)}</button>` : ''}</div>`;
}
function initNotebook() { }
;
function methodsContent(id) {
    const steps = id === 'pacifico' ? ['Descarga de indicadores trimestrales de conectividad.', 'Preparaci\u00f3n del panel de catorce puertos.', 'Estimaci\u00f3n del modelo y comprobaciones de sensibilidad.'] : id === 'hhi' ? ['Reuni\u00f3n de estad\u00edsticas mensuales de contenedores.', 'C\u00e1lculo del HHI y de su descomposici\u00f3n.', 'Estimaci\u00f3n temporal y an\u00e1lisis de robustez.'] : ['Revisi\u00f3n de ingresos, TEU y naves por operador.', 'Homogeneizaci\u00f3n de monedas y construcci\u00f3n de las diferencias logar\u00edtmicas.', 'Estimaci\u00f3n del panel e inferencia estad\u00edstica.'];
    const extra = id === 'pacifico' ? [['Panel trimestral PLSCI', 'pacifico_panel_98.csv'], ['Coordenadas portuarias', 'pacifico_coordenadas_14.csv']] : id === 'peru' ? [['Panel mensual de terminales', 'peru_panel_453_resumen.csv']] : [];
    return `<div class="methods-flow">${steps.map((s, i) => `<div><span>${String(i + 1).padStart(2, '0')}</span><p>${esc(s)}</p></div>`).join('')}</div><h2>Fuentes de datos</h2><div class="source-links">${SOURCE_LINKS[id].map(s => `<a href="${s.url}" target="_blank" rel="noopener noreferrer"><strong>${esc(s.name)}</strong><small>${esc(s.desc)}</small>${ico('external', 17)}</a>`).join('')}</div><h2>Modelo econom\u00e9trico</h2><div class="model-panel"><div class="model-formula">${formula(id)}</div><p>${esc(modelNote(id))}</p></div><h2>Obtenci\u00f3n y estimaci\u00f3n en Python</h2><p class="section-description">El cuaderno conserva las consultas, la construcci\u00f3n de la base y las estimaciones. Cada bloque puede abrirse para consultar su c\u00f3digo.</p>${notebookCell(id)}${extra.length ? `<div class="data-downloads">${extra.map(([label, name]) => `<a href="./data/tables/${name}" download class="outline-btn">${ico('down', 15)} ${esc(label)}</a>`).join('')}</div>` : ''}`;
}
function resultsContent(id) {
    if (id === 'pacifico') {
        const chancay = portQuarter('PECHY'), callao = portQuarter('PECLL');
        return `<div class="stat-row"><div><span>Chancay, 2025 T1</span><strong>${num(chancay.start, 2)}</strong></div><div><span>Chancay, 2026 T3</span><strong>${num(chancay.end, 2)}</strong></div><div><span>Tendencia relativa frente al Callao</span><strong>7,41 %</strong><small>Por trimestre</small></div></div>${chartHtml('res-pacific', { title: 'Conectividad trimestral', x: DATA.ports.quarters.map(q => q.replace('T', ' T')), series: [{ name: 'Chancay', values: DATA.ports.quarters.map(q => chancay.quarterValues[q]), color: '#a4774c' }, { name: 'Callao', values: DATA.ports.quarters.map(q => callao.quarterValues[q]), color: '#45464d' }], unit: 'PLSCI de UNCTAD', file: 'plsc_chancay_callao' })}<div class="prose result-note"><p>El crecimiento de Chancay acort\u00f3 su distancia relativa de conectividad respecto del Callao, aunque el segundo puerto conserva un nivel considerablemente mayor. La pendiente estimada frente al promedio geom\u00e9trico de San Antonio, Valpara\u00edso, Buenaventura y Guayaquil es 9,03 % trimestral.</p><p>Las pruebas de sensibilidad conservaron el signo de la pendiente principal. No se detect\u00f3 autocorrelaci\u00f3n espacial residual significativa al nivel de 5 % con las matrices consideradas. La muestra cubre siete trimestres.</p></div>`;
    }
    if (id === 'hhi')
        return `<div class="stat-row"><div><span>HHI, 2024</span><strong>5 410,5</strong></div><div><span>HHI, 2025</span><strong>4 392,6</strong></div><div><span>Variaci\u00f3n relativa</span><strong>-18,8 %</strong></div></div>${chartHtml('res-hhi', { title: 'Concentraci\u00f3n del tr\u00e1fico', x: ['Jun-Oct 2024', 'Jun-Oct 2025'], series: [{ name: 'HHI', values: DATA.hhi.compare.map(d => d.hhi), color: '#a4774c' }], unit: 'Puntos HHI', file: 'hhi_callao_chancay' })}<div class="results-split"><div class="evidence-cell"><h3>Descomposici\u00f3n</h3><strong>87,4 %</strong><p>Cuota de Chancay en la variaci\u00f3n contabilizada.</p></div><div class="evidence-cell"><h3>Modelo AR(2)</h3><strong>-752,1</strong><p>Cambio estimado en puntos HHI.</p></div></div><p class="result-note">El resultado describe una redistribuci\u00f3n del tr\u00e1fico, no una prueba directa de menores precios o mayor competencia efectiva.</p>`;
    const coef = DATA.income.coefficients;
    const names = ['APM', 'DPW', 'PAITA'];
    const teu = names.map(n => coef.find(c => c.variable === `C(op)[${n}]:dln_teu`).value), nav = names.map(n => coef.find(c => c.variable === `C(op)[${n}]:dln_naves`).value);
    return `<div class="stat-row"><div><span>APM, elasticidad TEU</span><strong>0,208</strong></div><div><span>DP World, elasticidad TEU</span><strong>0,496</strong></div><div><span>Paita, elasticidad TEU</span><strong>0,657</strong></div></div>${chartHtml('res-income', { title: 'Elasticidades estimadas por terminal', x: ['APM', 'DP World', 'Paita'], series: [{ name: 'Contenedores', values: teu, color: '#a4774c' }, { name: 'Naves', values: nav, color: '#45464d' }], unit: 'Variaci\u00f3n proporcional estimada', file: 'elasticidades_portuarias' })}<div class="prose result-note"><p>Las elasticidades de ingresos respecto a contenedores difieren entre los tres operadores. Las elasticidades asociadas a naves son de 0,414 para APM, 0,491 para DP World y 0,444 para Paita; sus diferencias no resultan significativas bajo la inferencia principal.</p><p>Las interacciones del per\u00edodo comercial respecto a Paita tienen intervalos que incluyen cero. Las estimaciones expresan asociaciones de corto plazo y no identifican un impacto causal.</p></div>`;
}
const DISC = {
    pacifico: ['El crecimiento del PLSCI de Chancay es compatible con un proceso de integraci\u00f3n acelerado a las redes de l\u00edneas regulares, pero su nivel contin\u00faa siendo inferior al del Callao. Es importante distinguir cambio de posici\u00f3n y velocidad de convergencia.', 'Para la supervisi\u00f3n sectorial conviene seguir tambi\u00e9n las rutas, frecuencias y condiciones de servicio. El PLSCI es una medida de conectividad, no de facturaci\u00f3n, precios ni bienestar.'],
    hhi: ['La menor concentraci\u00f3n del tr\u00e1fico muestra una distribuci\u00f3n m\u00e1s amplia de los vol\u00famenes. El resultado no basta para definir el mercado relevante ni demuestra cambios en las tarifas efectivamente pagadas por los usuarios.', 'Una evaluaci\u00f3n regulatoria completa necesitar\u00eda datos sobre acceso, frecuencia, tiempos de espera y servicios sustituibles. La descomposici\u00f3n del HHI es informativa, pero no reemplaza esa evidencia.'],
    peru: ['La intensidad de la asociaci\u00f3n entre actividad e ingresos var\u00eda entre concesionarios, sobre todo al comparar los coeficientes de TEU. Los resultados no equivalen a variaciones de precios ni a efectos causales del ingreso de Chancay.', 'El control de unidades, registros faltantes y conversi\u00f3n monetaria resulta esencial para comparar series. La ampliaci\u00f3n de la muestra permitir\u00e1 observar si estas relaciones cambian durante el desarrollo comercial del nuevo puerto.']
};
const CONC = {
    pacifico: ['Chancay pas\u00f3 de 70,37 a 119,08 puntos PLSCI entre 2025 T1 y 2026 T3, mientras que Callao pas\u00f3 de 280,72 a 305,33.', 'La raz\u00f3n de conectividad Chancay/Callao aument\u00f3 a una tasa estimada de 7,41 % por trimestre. El resultado conserva su signo en las comprobaciones presentadas.', 'Los siete trimestres constituyen una etapa inicial y requieren seguimiento antes de valorar la persistencia de la tendencia.'],
    hhi: ['El HHI medio del conjunto Callao-Chancay se redujo de 5 410,5 a 4 392,6 puntos en los meses comparables de 2024 y 2025.', 'La descomposici\u00f3n atribuye 87,4 % de la variaci\u00f3n a la cuota de Chancay y el modelo con errores AR(2) estima un cambio de nivel de -752,1 puntos.', 'La concentraci\u00f3n del tr\u00e1fico no permite evaluar por s\u00ed misma las condiciones efectivas de competencia.'],
    peru: ['Las elasticidades estimadas respecto a contenedores fueron 0,208 para APM, 0,496 para DP World y 0,657 para Paita.', 'En las naves se encontraron elasticidades de 0,414, 0,491 y 0,444, respectivamente. Las interacciones del per\u00edodo comercial frente a Paita no resultaron concluyentes en la inferencia principal.', 'La comparabilidad de monedas y fuentes operativas es indispensable para interpretar estos resultados como asociaciones y no como efectos causales demostrados.']
};
function discussionContent(id) { return `<div class="prose lead-prose">${DISC[id].map(t => `<p>${esc(t)}</p>`).join('')}</div><div class="question-plate"><span>Alcance del estudio</span><p>Las comparaciones se interpretan dentro de la muestra, las variables y el per\u00edodo documentados en el art\u00edculo.</p></div>`; }
function conclusionContent(id) { return `<div class="conclusions">${CONC[id].map((t, i) => `<div><span>${String(i + 1).padStart(2, '0')}</span><p>${esc(t)}</p></div>`).join('')}</div>`; }
function modalClose() { document.getElementById('modal').innerHTML = ''; document.body.classList.remove('modal-open'); S.secureId = ''; }
function modalOpen(id, kind) { const d = DATA.literature.items.find(q => q.id === id); if (!d)
    return; S.secureId = id; S.secureKind = kind; document.getElementById('modal').innerHTML = `<div class="overlay" data-close-modal><div class="dialog" role="dialog" aria-modal="true" aria-label="Acceso acad\u00e9mico"><button data-close-modal class="dialog-close">${ico('close', 20)}</button><div class="dialog-lock">${ico('lock', 25)}</div><h2>Acceso acad\u00e9mico</h2><p>Documento para revisi\u00f3n docente y consulta acad\u00e9mica. Los derechos de las obras corresponden a sus autores y editoriales.</p><div class="dialog-work">${esc(d.title)}</div><form id="unlock-form"><label for="unlock-password">Contrase\u00f1a</label><input type="password" id="unlock-password" required autocomplete="off" placeholder="Contrase\u00f1a de acceso"/><span role="status" id="unlock-status"></span><button type="submit" class="primary-link">Abrir documento ${ico('arrow', 16)}</button></form><small>Con fines acad\u00e9micos. La clave no sustituye la autorizaci\u00f3n de distribuci\u00f3n.</small></div></div>`; document.body.classList.add('modal-open'); document.getElementById('unlock-password')?.focus(); }
async function unlockDocument() {
    const d = DATA.literature.items.find(q => q.id === S.secureId), path = S.secureKind === 'original' ? d?.originalEncrypted : d?.esEncrypted;
    const pass = document.getElementById('unlock-password')?.value || '';
    const status = document.getElementById('unlock-status');
    const btn = document.querySelector('#unlock-form [type="submit"]');
    if (!path || !status || !pass)
        return;
    status.textContent = 'Abriendo documento...';
    if (btn)
        btn.disabled = true;
    try {
        if (!crypto.subtle)
            throw new Error('Para acceder se necesita HTTPS.');
        const response = await fetch(docUrl(path));
        if (!response.ok)
            throw new Error('Documento no disponible.');
        const buf = new Uint8Array(await response.arrayBuffer());
        const format = new TextDecoder().decode(buf.slice(0, 5));
        if (format !== 'JORS1')
            throw new Error('Formato de archivo no reconocido.');
        const salt = buf.slice(5, 21), iv = buf.slice(21, 33), body = buf.slice(33);
        const keyData = await crypto.subtle.importKey('raw', new TextEncoder().encode(pass), 'PBKDF2', false, ['deriveKey']);
        const key = await crypto.subtle.deriveKey({ name: 'PBKDF2', salt, iterations: 210000, hash: 'SHA-256' }, keyData, { name: 'AES-GCM', length: 256 }, false, ['decrypt']);
        const out = await crypto.subtle.decrypt({ name: 'AES-GCM', iv }, key, body);
        saveFile(new Blob([out], { type: 'application/pdf' }), `${d?.id}-${S.secureKind === 'original' ? 'original' : 'espanol'}.pdf`);
        modalClose();
    }
    catch (err) {
        status.textContent = err instanceof DOMException && err.name === 'OperationError' ? 'Contrase\u00f1a incorrecta.' : err instanceof Error ? err.message : 'No se pudo abrir el documento.';
    }
    finally {
        if (btn)
            btn.disabled = false;
    }
}
function wireEvents() {
    document.addEventListener('click', ev => {
        const t = ev.target;
        const png = t.closest('[data-export-png]');
        if (png) {
            exportPNG(png.dataset.exportPng || '');
            return;
        }
        const xlsx = t.closest('[data-export-xlsx]');
        if (xlsx) {
            exportExcel(xlsx.dataset.exportXlsx || '');
            return;
        }
        const work = t.closest('[data-work-toggle]');
        if (work) {
            const id = work.dataset.workToggle || '';
            const old = S.openLit;
            S.openLit = old === id ? '' : id;
            S.litTab = 'resumen';
            document.querySelectorAll('[data-work]').forEach(el => { const active = el.dataset.work === S.openLit; el.classList.toggle('expanded', active); el.querySelector('[data-work-toggle]')?.setAttribute('aria-expanded', String(active)); const label = el.querySelector('.work-arrow'); if (label)
                label.innerHTML = ico(active ? 'close' : 'plus', 19); el.querySelectorAll('.lit-tab').forEach(el => el.classList.toggle('active', el.dataset.litTab === 'resumen')); if (active) {
                const text = el.querySelector('.lit-section-body');
                const d = DATA.literature.items.find(w => w.id === id);
                if (text && d)
                    text.textContent = litParagraph(d, 'resumen');
            } });
            return;
        }
        const tab = t.closest('[data-lit-tab]');
        if (tab) {
            S.litTab = tab.dataset.litTab || 'resumen';
            const card = tab.closest('[data-work]');
            card?.querySelectorAll('.lit-tab').forEach(el => el.classList.toggle('active', el === tab));
            const d = DATA.literature.items.find(w => w.id === tab.dataset.litId);
            const body = card?.querySelector('.lit-section-body');
            if (body && d) {
                body.classList.remove('flash');
                void body.offsetWidth;
                body.textContent = litParagraph(d, S.litTab);
                body.classList.add('flash');
            }
            return;
        }
        const section = t.closest('[data-chapter]');
        if (section && S.project) {
            renderSection(S.project, section.dataset.chapter);
            return;
        }
        const step = t.closest('[data-step]');
        if (step && S.project) {
            const index = CHAPTERS.findIndex(ch => ch.id === S.chapter);
            renderSection(S.project, CHAPTERS[(index + CHAPTERS.length + Number(step.dataset.step)) % CHAPTERS.length].id);
            return;
        }
        const wheel = t.closest('[data-wheel-show]');
        if (wheel) {
            const panel = document.getElementById('study-space');
            if (panel) {
                S.wheelOpen = !S.wheelOpen;
                panel.classList.toggle('wheel-only', S.wheelOpen);
                panel.classList.toggle('reading', !S.wheelOpen);
                if (!S.wheelOpen && S.project)
                    renderSection(S.project, S.chapter);
            }
            return;
        }
        const port = t.closest('[data-port-pick]');
        if (port && S.project) {
            updateSelection(undefined, port.dataset.portPick);
            return;
        }
        const reset = t.closest('[data-map-reset]');
        if (reset && S.project) {
            S.country = '';
            if (leafletLive()) {
                if (leafletBaseBounds)
                    leafletMap.flyToBounds(leafletBaseBounds, { padding: [45, 45], duration: 1, maxZoom: 10 });
                updateMapClasses();
                return;
            }
            const from = { ...mapRectFor(S.project) };
            animateMap(from, MAP[S.project], 700);
            updateMapClasses();
            return;
        }
        const resetCountry = t.closest('[data-map-reset-country]');
        if (resetCountry && S.project) {
            updateSelection('', undefined);
            return;
        }
        const zoom = t.closest('[data-map-zoom]');
        if (zoom && S.project) {
            if (leafletLive()) {
                Number(zoom.dataset.mapZoom) > 1 ? leafletMap.zoomIn(1, { animate: true }) : leafletMap.zoomOut(1, { animate: true });
                return;
            }
            const curr = { ...mapRectFor(S.project) }, k = Number(zoom.dataset.mapZoom) || 1, w = Math.max(1.1, Math.min(92, curr.w / k)), h = Math.max(1.1, Math.min(111, curr.h / k));
            animateMap(curr, { x: curr.x + (curr.w - w) / 2, y: curr.y + (curr.h - h) / 2, w, h }, 350);
            return;
        }
        const secure = t.closest('[data-secure]');
        if (secure) {
            modalOpen(secure.dataset.secure || '', secure.dataset.kind === 'es' ? 'es' : 'original');
            return;
        }
        if (t.matches('[data-close-modal]') || t.closest('[data-close-modal].dialog-close')) {
            modalClose();
            return;
        }
        if (t.closest('[data-show-more]') && S.project) {
            S.nbShow += 10;
            const a = document.querySelector('.notebook-viewer');
            if (a)
                a.outerHTML = notebookCell(S.project);
            return;
        }
        const copy = t.closest('[data-copy-cell]');
        if (copy && S.project) {
            const nb = NOTEBOOKS[S.project], index = Number(copy.dataset.copyCell);
            const src = nb?.cells[index]?.source;
            if (src) {
                navigator.clipboard.writeText(Array.isArray(src) ? src.join('') : src).then(() => { copy.textContent = 'Copiado'; setTimeout(() => copy.innerHTML = ico('copy', 13) + ' Copiar', 1200); }).catch(() => { });
            }
            return;
        }
    });
    document.addEventListener('input', ev => { const target = ev.target; if (target.id === 'literature-search' && S.project) {
        const focusStart = target.selectionStart;
        S.search = target.value;
        const list = document.getElementById('literature-list');
        const kind = S.chapter === 'marco' ? 'teoria' : 'antecedente';
        const d = DATA.literature.items.filter(x => x.project === S.project && x.kind === kind && `${x.title} ${x.authors} ${x.journal}`.toLowerCase().includes(S.search.toLowerCase()));
        S.openLit = '';
        if (list)
            list.innerHTML = d.map(d => litCard(d, kind)).join('') || '<p class="no-results">No se encontraron coincidencias.</p>';
    } });
    document.addEventListener('change', ev => { const target = ev.target; const id = target.id; if (id === 'quarter-select') {
        S.quarter = target.value;
        rerenderPartial();
    }
    else if (id === 'hhi-select') {
        S.hhiType = target.value;
        rerenderPartial();
    }
    else if (id === 'operator-select') {
        S.operator = target.value;
        rerenderPartial();
        updateMapClasses();
    }
    else if (id === 'income-metric-select') {
        S.metric = target.value;
        rerenderPartial();
    } });
    document.addEventListener('submit', ev => { if (ev.target.id === 'unlock-form') {
        ev.preventDefault();
        void unlockDocument();
    } });
    document.addEventListener('keydown', ev => { if (ev.key === 'Escape' && S.secureId)
        modalClose(); });
}
function afterRender() { if (S.view === 'dashboard') {
    initMap();
    initChartEvents();
} if (S.view === 'study') {
    initChartEvents();
    if (!S.wheelOpen)
        document.getElementById('study-content')?.classList.add('show');
} }
window.addEventListener('hashchange', () => { const prev = S.view; const next = location.hash.includes('/estudio') ? 'study' : location.hash.includes('/mapa') ? 'dashboard' : 'home'; if (prev !== next && next === 'study')
    S.wheelOpen = true; render(); window.scrollTo({ top: 0, behavior: 'instant' }); });
wireEvents();
render();
