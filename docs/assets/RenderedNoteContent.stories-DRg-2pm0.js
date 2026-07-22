import{j as t}from"./jsx-runtime-D_zvdyIk.js";import{R as o}from"./RenderedNoteContent-CiMChHNS.js";import"./index-D4lIrffr.js";const c=`<article xmlns="http://www.w3.org/1999/xhtml">
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
</article>`,h={component:o,title:"Content/RenderedNoteContent",render:a=>t.jsx("div",{className:"note-content-story",children:t.jsx(o,{...a})})},e={args:{xhtml:c}};var r,s,n;e.parameters={...e.parameters,docs:{...(r=e.parameters)==null?void 0:r.docs,source:{originalSource:`{
  args: {
    xhtml: sampleXhtml
  }
}`,...(n=(s=e.parameters)==null?void 0:s.docs)==null?void 0:n.source}}};const m=["Default"];export{e as Default,m as __namedExportsOrder,h as default};
