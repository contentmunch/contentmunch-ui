import{j as o}from"./jsx-runtime-D_zvdyIk.js";import{r as ce}from"./index-D4lIrffr.js";const $=(e,c,r,a)=>{const n=(a-90)*Math.PI/180;return{x:e+r*Math.cos(n),y:c+r*Math.sin(n)}},le=(e,c,r,a,n,g)=>{const u=Math.min(g,n+359.99),s=$(e,c,r,u),d=$(e,c,r,n),h=$(e,c,a,u),m=$(e,c,a,n),f=u-n>180?1:0;return[`M ${s.x} ${s.y}`,`A ${r} ${r} 0 ${f} 0 ${d.x} ${d.y}`,`L ${m.x} ${m.y}`,`A ${a} ${a} 0 ${f} 1 ${h.x} ${h.y}`,"Z"].join(" ")},ie=(e,c,r,a,n)=>{const g=e.reduce((s,d)=>s+d.value,0);if(g<=0)return[];let u=0;return e.map(s=>{const d=s.value/g,h=u,m=u+d*360;return u=m,{title:s.title,value:s.value,color:s.color,percent:d,startAngle:h,endAngle:m,path:le(c,r,a,n,h,m)}})},ue=["#4e79a7","#59a14f","#f28e2c","#e15759","#261759","#acd643","#daf2dc"],de=220,me=.62,C=({data:e,selected:c,onSelect:r,centerLabel:a,centerValue:n,valueFormatter:g,colorRange:u,size:s=de,innerRadiusRatio:d=me,withLegend:h,legendTitle:m})=>{const f=u??ue,j=s/2,N=s/2,ne=N*d,se=e.map((t,l)=>({title:t.title,value:t.value,color:t.color??f[l%f.length]})),w=ie(se,j,j,N,ne),oe=(t,l)=>g?g(t,l):String(t),V=(t,l,p)=>p||`${t.title} (${oe(t.value,l)})`;return o.jsxs("div",{className:"muncher-donut-chart",children:[o.jsxs("div",{className:"muncher-donut-chart-graphic",style:{width:s,height:s},children:[o.jsx("svg",{viewBox:`0 0 ${s} ${s}`,className:"muncher-donut-chart-svg",children:w.map((t,l)=>{var p;return o.jsx("path",{d:t.path,fill:t.color,className:"muncher-donut-slice"+(c===t.title?" is-selected":""),onClick:()=>r==null?void 0:r(t.title),children:o.jsx("title",{children:V(t,l,(p=e[l])==null?void 0:p.legend)+` -- ${(t.percent*100).toFixed(0)}%`})},t.title)})}),(a||n)&&o.jsxs("div",{className:"muncher-donut-chart-center",children:[a&&o.jsx("span",{className:"muncher-donut-chart-center-label",children:a}),n&&o.jsx("span",{className:"muncher-donut-chart-center-value",children:n})]})]}),h&&o.jsxs("ul",{className:"muncher-donut-chart-legend",children:[m&&o.jsx("li",{className:"muncher-donut-chart-legend-title",children:m}),w.map((t,l)=>{var p;return o.jsxs("li",{className:"muncher-donut-chart-legend-item"+(c===t.title?" is-selected":""),onClick:()=>r==null?void 0:r(t.title),children:[o.jsx("span",{className:"muncher-donut-chart-legend-swatch",style:{backgroundColor:t.color}}),o.jsx("span",{className:"muncher-donut-chart-legend-text",children:V(t,l,(p=e[l])==null?void 0:p.legend)})]},t.title)})]})]})};C.__docgenInfo={description:"",methods:[],displayName:"DonutChart",props:{data:{required:!0,tsType:{name:"Array",elements:[{name:"DonutChartData"}],raw:"DonutChartData[]"},description:""},selected:{required:!1,tsType:{name:"union",raw:"string | null",elements:[{name:"string"},{name:"null"}]},description:""},onSelect:{required:!1,tsType:{name:"signature",type:"function",raw:"(title: string) => void",signature:{arguments:[{type:{name:"string"},name:"title"}],return:{name:"void"}}},description:""},centerLabel:{required:!1,tsType:{name:"string"},description:""},centerValue:{required:!1,tsType:{name:"string"},description:""},valueFormatter:{required:!1,tsType:{name:"signature",type:"function",raw:"(num: number, index: number) => string",signature:{arguments:[{type:{name:"number"},name:"num"},{type:{name:"number"},name:"index"}],return:{name:"string"}}},description:""},colorRange:{required:!1,tsType:{name:"Array",elements:[{name:"string"}],raw:"string[]"},description:""},size:{required:!1,tsType:{name:"number"},description:`pixel size of the svg viewBox (square); defaults to 220, same as the
original fixed-size version`,defaultValue:{value:"220",computed:!1}},innerRadiusRatio:{required:!1,tsType:{name:"number"},description:"inner radius as a fraction of the outer radius, 0-1; defaults to .62",defaultValue:{value:"0.62",computed:!1}},withLegend:{required:!1,tsType:{name:"boolean"},description:""},legendTitle:{required:!1,tsType:{name:"string"},description:""}}};const pe=[{title:"Groceries",value:420},{title:"Rent",value:1500},{title:"Utilities",value:180},{title:"Dining out",value:260},{title:"Transport",value:140}],fe={component:C,title:"Visualization/DonutChart",decorators:[e=>o.jsx("div",{className:"div-input-stories",children:o.jsx(e,{})})],render:e=>{const[c,r]=ce.useState(e.selected??null);return o.jsx(C,{...e,selected:c,onSelect:a=>{var n;r(a===c?null:a),(n=e.onSelect)==null||n.call(e,a)}})}},i={args:{data:pe}},b={args:{...i.args,selected:"Rent"}},v={args:{...i.args,centerLabel:"Total spent",centerValue:"$2,500"}},x={args:{...i.args,centerLabel:"Total spent",centerValue:"$2,500",withLegend:!0,legendTitle:"Categories"}},T={args:{...i.args,colorRange:["#13294b","#bba035","#8a9a5b","#c65d4a","#5b7c99"],withLegend:!0}},L={args:{...i.args,centerLabel:"Total spent",centerValue:"$2,500",withLegend:!0,valueFormatter:e=>`$${e.toLocaleString()}`}},y={args:{...i.args,size:120,centerLabel:"Total",centerValue:"$2,500"}},S={args:{data:[{title:"Everything",value:100}],centerLabel:"Total spent",centerValue:"$2,500"}},D={args:{...i.args,onSelect:e=>{console.log("selected",e)}}};var q,E,R;i.parameters={...i.parameters,docs:{...(q=i.parameters)==null?void 0:q.docs,source:{originalSource:`{
  args: {
    data: spending
  }
}`,...(R=(E=i.parameters)==null?void 0:E.docs)==null?void 0:R.source}}};var A,_,I;b.parameters={...b.parameters,docs:{...(A=b.parameters)==null?void 0:A.docs,source:{originalSource:`{
  args: {
    ...Default.args,
    selected: "Rent"
  }
}`,...(I=(_=b.parameters)==null?void 0:_.docs)==null?void 0:I.source}}};var F,O,W;v.parameters={...v.parameters,docs:{...(F=v.parameters)==null?void 0:F.docs,source:{originalSource:`{
  args: {
    ...Default.args,
    centerLabel: "Total spent",
    centerValue: "$2,500"
  }
}`,...(W=(O=v.parameters)==null?void 0:O.docs)==null?void 0:W.source}}};var M,U,k;x.parameters={...x.parameters,docs:{...(M=x.parameters)==null?void 0:M.docs,source:{originalSource:`{
  args: {
    ...Default.args,
    centerLabel: "Total spent",
    centerValue: "$2,500",
    withLegend: true,
    legendTitle: "Categories"
  }
}`,...(k=(U=x.parameters)==null?void 0:U.docs)==null?void 0:k.source}}};var z,B,G;T.parameters={...T.parameters,docs:{...(z=T.parameters)==null?void 0:z.docs,source:{originalSource:`{
  args: {
    ...Default.args,
    colorRange: ["#13294b", "#bba035", "#8a9a5b", "#c65d4a", "#5b7c99"],
    withLegend: true
  }
}`,...(G=(B=T.parameters)==null?void 0:B.docs)==null?void 0:G.source}}};var P,Z,H;L.parameters={...L.parameters,docs:{...(P=L.parameters)==null?void 0:P.docs,source:{originalSource:`{
  args: {
    ...Default.args,
    centerLabel: "Total spent",
    centerValue: "$2,500",
    withLegend: true,
    valueFormatter: num => \`$\${num.toLocaleString()}\`
  }
}`,...(H=(Z=L.parameters)==null?void 0:Z.docs)==null?void 0:H.source}}};var J,K,Q;y.parameters={...y.parameters,docs:{...(J=y.parameters)==null?void 0:J.docs,source:{originalSource:`{
  args: {
    ...Default.args,
    size: 120,
    centerLabel: "Total",
    centerValue: "$2,500"
  }
}`,...(Q=(K=y.parameters)==null?void 0:K.docs)==null?void 0:Q.source}}};var X,Y,ee;S.parameters={...S.parameters,docs:{...(X=S.parameters)==null?void 0:X.docs,source:{originalSource:`{
  args: {
    data: [{
      title: "Everything",
      value: 100
    }],
    centerLabel: "Total spent",
    centerValue: "$2,500"
  }
}`,...(ee=(Y=S.parameters)==null?void 0:Y.docs)==null?void 0:ee.source}}};var te,re,ae;D.parameters={...D.parameters,docs:{...(te=D.parameters)==null?void 0:te.docs,source:{originalSource:`{
  args: {
    ...Default.args,
    onSelect: title => {
      console.log("selected", title);
    }
  }
}`,...(ae=(re=D.parameters)==null?void 0:re.docs)==null?void 0:ae.source}}};const $e=["Default","WithSelection","WithCenterLabel","WithLegend","CustomColors","CustomFormatter","SmallSize","SingleSlice","OnSelect"];export{T as CustomColors,L as CustomFormatter,i as Default,D as OnSelect,S as SingleSlice,y as SmallSize,v as WithCenterLabel,x as WithLegend,b as WithSelection,$e as __namedExportsOrder,fe as default};
