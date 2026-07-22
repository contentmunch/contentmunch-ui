import{j as s}from"./jsx-runtime-D_zvdyIk.js";import{R as a}from"./Modal-7y1buZan.js";import"./index-D4lIrffr.js";/* empty css              */import"./Accordion-CM44lgGc.js";import"./Backdrop-B_dFhGSg.js";import"./Badge-DyX1sYip.js";import"./IconBadge-D9jC50y4.js";import"./Icon-1_RwmGu3.js";import"./Button-CpAfKxsB.js";import"./DropdownButton-irs1yMoW.js";import"./DropdownNavButton-BJB-Par7.js";import"./ShareButton-CaP10xHi.js";import"./CopyButton-OOLUmhKo.js";import"./CsvButton-5VEuvKyO.js";import"./SortButton-DiZOgp43.js";import"./NavigateButton-D8qkO0to.js";import"./Checkbox-B1IiCnS1.js";/* empty css              */import"./Label-WHfwOnzY.js";import"./CsvInput-CsqwqRpP.js";/* empty css                   */import"./Spinner-Bp0FQ2cK.js";import"./ImageInput-D-cOjKP2.js";import"./Input-Cqf7JKmc.js";import"./PasswordInput-C25rVnwy.js";import"./Radio-Z5_Dey7K.js";import"./Select-DPMYrMY0.js";import"./Textarea-BFEtmDz2.js";import"./TextInputDropdown-stBR8hbx.js";import"./Li-BXwfRjCs.js";import"./Paper-7Qt7Ew3B.js";import"./Progress-CdK5Z50d.js";import"./Hr-DywUS52c.js";import"./ItemSlider-DXHSwitA.js";import"./RangeSlider-Bl7iMCYB.js";/* empty css               */import"./Slider-CI6O3bQt.js";import"./Featured-D1GSdbLo.js";import"./Star-2LGqRjU-.js";import"./Tabs-CD4dBFt4.js";import"./Table-BlH6J0Ay.js";import"./Card-sHLkWQUK.js";import"./FlippableCard-DWER4QIe.js";import"./ScrollFab-6zpsM4ZS.js";const g=`<article xmlns="http://www.w3.org/1999/xhtml">
<h1>Access Token and Refresh Token</h1>
<h2>1. What is an Access Token?</h2>
<ul>
<li><strong>Purpose:</strong> Grants access to protected resources</li>
<li><strong>Lifespan:</strong> Short-lived (e.g., 15 minutes)</li>
</ul>
<blockquote><p>Short-lived tokens reduce blast radius if compromised.</p></blockquote>
<table>
<thead><tr><th>Benefit</th><th>Access Token</th><th>Refresh Token</th></tr></thead>
<tbody><tr><td>Short-lived</td><td>✅</td><td>❌</td></tr></tbody>
</table>
<pre><code>const token = jwtService.generate(userId);</code></pre>
</article>`,n=(i,t=560,e=360)=>`data:image/svg+xml;utf8,${encodeURIComponent(`
        <svg xmlns="http://www.w3.org/2000/svg" width="${t}" height="${e}">
            <rect width="${t}" height="${e}" fill="#f0f4f8"/>
            <rect x="20" y="20" width="${t-40}" height="40" fill="#d9e2ec"/>
            <text x="${t/2}" y="45" font-family="sans-serif" font-size="16" fill="#334" text-anchor="middle">${i}</text>
            <g stroke="#c8d4e0" stroke-width="1">
                <line x1="20" y1="90" x2="${t-20}" y2="90"/>
                <line x1="20" y1="${e-50}" x2="${t-20}" y2="${e-50}"/>
            </g>
        </svg>
    `)}`,x=`<article xmlns="http://www.w3.org/1999/xhtml">
<p>Click either image below to enlarge it -- this exercises the same
click-to-zoom path a headless-API consumer gets for free just by rendering
this component, with no extra wiring on their end.</p>

<span class="media-image-wrap media-image-wrap--medium">
<img class="media-image" alt="July 2026 calendar" role="button" tabindex="0" aria-label="Enlarge image"
     src="${n("July 2026")}"/>
<span class="media-image-caption">
<span class="muncher-icon"><svg class="muncher-icon--small" stroke="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg></span>
<span data-link-text>Calendar for tithi</span>
</span>
</span>

<p>This second one has no caption at all -- the lightbox still works, it just
skips the caption pill.</p>

<span class="media-image-wrap media-image-wrap--small">
<img class="media-image" alt="Uncaptioned placeholder" role="button" tabindex="0" aria-label="Enlarge image"
     src="${n("No caption",320,200)}"/>
</span>
</article>`,nt={component:a,title:"Content/RenderedNoteContent",render:i=>s.jsx("div",{className:"note-content-story",children:s.jsx(a,{...i})})},r={args:{xhtml:g}},o={args:{xhtml:x}};var m,l,p;r.parameters={...r.parameters,docs:{...(m=r.parameters)==null?void 0:m.docs,source:{originalSource:`{
  args: {
    xhtml: sampleXhtml
  }
}`,...(p=(l=r.parameters)==null?void 0:l.docs)==null?void 0:p.source}}};var c,d,h;o.parameters={...o.parameters,docs:{...(c=o.parameters)==null?void 0:c.docs,source:{originalSource:`{
  args: {
    xhtml: imagesXhtml
  }
}`,...(h=(d=o.parameters)==null?void 0:d.docs)==null?void 0:h.source}}};const mt=["Default","WithImages"];export{r as Default,o as WithImages,mt as __namedExportsOrder,nt as default};
