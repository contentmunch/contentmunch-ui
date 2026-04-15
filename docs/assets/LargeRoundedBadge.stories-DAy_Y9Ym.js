import{j as e}from"./jsx-runtime-D_zvdyIk.js";import{B as x}from"./Badge-DyX1sYip.js";import"./index-D4lIrffr.js";import{I as S}from"./Icon-BMbTJVVA.js";const N=({variant:a,completed:j,children:R})=>e.jsx("div",{className:"muncher-badge--large-rounded",children:e.jsx(x,{variant:a||"tertiary",rounded:!0,children:j?e.jsx("div",{className:"badge-content",children:e.jsx(S,{name:"simple-check"})}):R})});N.__docgenInfo={description:"",methods:[],displayName:"LargeRoundedBadge",props:{variant:{required:!1,tsType:{name:"union",raw:"'primary' | 'secondary' | 'tertiary' | 'transparent' | 'danger'",elements:[{name:"literal",value:"'primary'"},{name:"literal",value:"'secondary'"},{name:"literal",value:"'tertiary'"},{name:"literal",value:"'transparent'"},{name:"literal",value:"'danger'"}]},description:""},completed:{required:!1,tsType:{name:"boolean"},description:""},children:{required:!0,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:""}}};const B={component:x,title:"Data Display/Badge",render:a=>e.jsx(N,{...a})},r={args:{children:e.jsxs("div",{className:"badge-content",children:[e.jsx("p",{children:"Step"}),e.jsx("p",{className:"emphasized",children:"1"})]})}},s={args:{completed:!0}},n={args:{variant:"secondary",children:e.jsxs("div",{className:"badge-content",children:[e.jsx("p",{children:"Step"}),e.jsx("p",{className:"emphasized",children:"2"})]})}},d={args:{variant:"primary",children:e.jsxs("div",{className:"badge-content",children:[e.jsx("p",{children:"Step"}),e.jsx("p",{className:"emphasized",children:"3"})]})}};var t,c,o;r.parameters={...r.parameters,docs:{...(t=r.parameters)==null?void 0:t.docs,source:{originalSource:`{
  args: {
    children: <div className="badge-content"><p>Step</p><p className="emphasized">1</p></div>
  }
}`,...(o=(c=r.parameters)==null?void 0:c.docs)==null?void 0:o.source}}};var i,p,m;s.parameters={...s.parameters,docs:{...(i=s.parameters)==null?void 0:i.docs,source:{originalSource:`{
  args: {
    completed: true
  }
}`,...(m=(p=s.parameters)==null?void 0:p.docs)==null?void 0:m.source}}};var l,u,g;n.parameters={...n.parameters,docs:{...(l=n.parameters)==null?void 0:l.docs,source:{originalSource:`{
  args: {
    variant: "secondary",
    children: <div className="badge-content"><p>Step</p><p className="emphasized">2</p></div>
  }
}`,...(g=(u=n.parameters)==null?void 0:u.docs)==null?void 0:g.source}}};var h,v,y;d.parameters={...d.parameters,docs:{...(h=d.parameters)==null?void 0:h.docs,source:{originalSource:`{
  args: {
    variant: "primary",
    children: <div className="badge-content"><p>Step</p><p className="emphasized">3</p></div>
  }
}`,...(y=(v=d.parameters)==null?void 0:v.docs)==null?void 0:y.source}}};const _=["LargeRounded","LargeRoundedCompleted","LargeRoundedSecondary","LargeRoundedPrimary"];export{r as LargeRounded,s as LargeRoundedCompleted,d as LargeRoundedPrimary,n as LargeRoundedSecondary,_ as __namedExportsOrder,B as default};
