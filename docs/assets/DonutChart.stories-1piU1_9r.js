import{j as d}from"./jsx-runtime-D_zvdyIk.js";import{r as B}from"./index-D4lIrffr.js";import{D as p}from"./DonutChart-D3T2M0Do.js";const H=[{title:"Groceries",value:420},{title:"Rent",value:1500},{title:"Utilities",value:180},{title:"Dining out",value:260},{title:"Transport",value:140}],M={component:p,title:"Visualization/DonutChart",decorators:[e=>d.jsx("div",{className:"div-input-stories",children:d.jsx(e,{})})],render:e=>{const[g,A]=B.useState(e.selected??null);return d.jsx(p,{...e,selected:g,onSelect:i=>{var m;A(i===g?null:i),(m=e.onSelect)==null||m.call(e,i)}})}},r={args:{data:H}},t={args:{...r.args,selected:"Rent"}},a={args:{...r.args,centerLabel:"Total spent",centerValue:"$2,500"}},s={args:{...r.args,centerLabel:"Total spent",centerValue:"$2,500",withLegend:!0,legendTitle:"Categories"}},n={args:{...r.args,colorRange:["#13294b","#bba035","#8a9a5b","#c65d4a","#5b7c99"],withLegend:!0}},o={args:{...r.args,centerLabel:"Total spent",centerValue:"$2,500",withLegend:!0,valueFormatter:e=>`$${e.toLocaleString()}`}},c={args:{...r.args,size:120,centerLabel:"Total",centerValue:"$2,500"}},l={args:{data:[{title:"Everything",value:100}],centerLabel:"Total spent",centerValue:"$2,500"}},u={args:{...r.args,onSelect:e=>{console.log("selected",e)}}};var S,b,L;r.parameters={...r.parameters,docs:{...(S=r.parameters)==null?void 0:S.docs,source:{originalSource:`{
  args: {
    data: spending
  }
}`,...(L=(b=r.parameters)==null?void 0:b.docs)==null?void 0:L.source}}};var h,$,f;t.parameters={...t.parameters,docs:{...(h=t.parameters)==null?void 0:h.docs,source:{originalSource:`{
  args: {
    ...Default.args,
    selected: "Rent"
  }
}`,...(f=($=t.parameters)==null?void 0:$.docs)==null?void 0:f.source}}};var v,D,T;a.parameters={...a.parameters,docs:{...(v=a.parameters)==null?void 0:v.docs,source:{originalSource:`{
  args: {
    ...Default.args,
    centerLabel: "Total spent",
    centerValue: "$2,500"
  }
}`,...(T=(D=a.parameters)==null?void 0:D.docs)==null?void 0:T.source}}};var C,V,x;s.parameters={...s.parameters,docs:{...(C=s.parameters)==null?void 0:C.docs,source:{originalSource:`{
  args: {
    ...Default.args,
    centerLabel: "Total spent",
    centerValue: "$2,500",
    withLegend: true,
    legendTitle: "Categories"
  }
}`,...(x=(V=s.parameters)==null?void 0:V.docs)==null?void 0:x.source}}};var w,R,W;n.parameters={...n.parameters,docs:{...(w=n.parameters)==null?void 0:w.docs,source:{originalSource:`{
  args: {
    ...Default.args,
    colorRange: ["#13294b", "#bba035", "#8a9a5b", "#c65d4a", "#5b7c99"],
    withLegend: true
  }
}`,...(W=(R=n.parameters)==null?void 0:R.docs)==null?void 0:W.source}}};var j,z,E;o.parameters={...o.parameters,docs:{...(j=o.parameters)==null?void 0:j.docs,source:{originalSource:`{
  args: {
    ...Default.args,
    centerLabel: "Total spent",
    centerValue: "$2,500",
    withLegend: true,
    valueFormatter: num => \`$\${num.toLocaleString()}\`
  }
}`,...(E=(z=o.parameters)==null?void 0:z.docs)==null?void 0:E.source}}};var F,O,y;c.parameters={...c.parameters,docs:{...(F=c.parameters)==null?void 0:F.docs,source:{originalSource:`{
  args: {
    ...Default.args,
    size: 120,
    centerLabel: "Total",
    centerValue: "$2,500"
  }
}`,...(y=(O=c.parameters)==null?void 0:O.docs)==null?void 0:y.source}}};var _,G,N;l.parameters={...l.parameters,docs:{...(_=l.parameters)==null?void 0:_.docs,source:{originalSource:`{
  args: {
    data: [{
      title: "Everything",
      value: 100
    }],
    centerLabel: "Total spent",
    centerValue: "$2,500"
  }
}`,...(N=(G=l.parameters)==null?void 0:G.docs)==null?void 0:N.source}}};var U,k,q;u.parameters={...u.parameters,docs:{...(U=u.parameters)==null?void 0:U.docs,source:{originalSource:`{
  args: {
    ...Default.args,
    onSelect: title => {
      console.log("selected", title);
    }
  }
}`,...(q=(k=u.parameters)==null?void 0:k.docs)==null?void 0:q.source}}};const P=["Default","WithSelection","WithCenterLabel","WithLegend","CustomColors","CustomFormatter","SmallSize","SingleSlice","OnSelect"];export{n as CustomColors,o as CustomFormatter,r as Default,u as OnSelect,l as SingleSlice,c as SmallSize,a as WithCenterLabel,s as WithLegend,t as WithSelection,P as __namedExportsOrder,M as default};
