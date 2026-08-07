import{j as l}from"./jsx-runtime-D_zvdyIk.js";import{r as F}from"./index-D4lIrffr.js";/* empty css                    */import{C as g}from"./Combobox-CDdqpILQ.js";import"./TextInputDropdown-BbXzNnkM.js";import"./Input-ChOmFMv_.js";/* empty css              */import"./Label-WHfwOnzY.js";import"./Icon-1_RwmGu3.js";import"./Spinner-Bp0FQ2cK.js";const u=[{id:1,name:"Apple",inSeason:!0},{id:2,name:"Banana",inSeason:!0},{id:3,name:"Cherry",inSeason:!1},{id:4,name:"Grape",inSeason:!0},{id:5,name:"Grapefruit",inSeason:!1},{id:6,name:"Mango",inSeason:!1},{id:7,name:"Orange",inSeason:!0},{id:8,name:"Papaya",inSeason:!1},{id:9,name:"Pineapple",inSeason:!0},{id:10,name:"Watermelon",inSeason:!0}],T={component:g,title:"Input/Combobox",decorators:[e=>l.jsx("div",{className:"div-input-stories",children:l.jsx(e,{})})],render:e=>{const[d,r]=F.useState(e.selectedId);return l.jsx(g,{...e,selectedId:d,onSelect:a=>{var p;r(a),(p=e.onSelect)==null||p.call(e,a)}})}},s={args:{name:"fruit",items:u,selectedId:null}},t={args:{...s.args,selectedId:7}},n={args:{...s.args,items:[],emptyMessage:"No matching fruit"}},o={args:{...s.args,items:u,emptyMessage:"No in-season fruit matches",filter:(e,d)=>{var r;return(((r=u.find(a=>a.id===e.id))==null?void 0:r.inSeason)??!1)&&e.name.toLowerCase().includes(d.trim().toLowerCase())}}},i={args:{...s.args,onSelect:e=>{console.log("selected",e)}}},c={args:{...s.args,selectedId:7,readOnly:!0}},m={args:{...s.args,selectedId:null,readOnly:!0}};var f,S,y;s.parameters={...s.parameters,docs:{...(f=s.parameters)==null?void 0:f.docs,source:{originalSource:`{
  args: {
    name: "fruit",
    items: fruits,
    selectedId: null
  }
}`,...(y=(S=s.parameters)==null?void 0:S.docs)==null?void 0:y.source}}};var h,I,O;t.parameters={...t.parameters,docs:{...(h=t.parameters)==null?void 0:h.docs,source:{originalSource:`{
  args: {
    ...Default.args,
    selectedId: 7
  }
}`,...(O=(I=t.parameters)==null?void 0:I.docs)==null?void 0:O.source}}};var x,C,D;n.parameters={...n.parameters,docs:{...(x=n.parameters)==null?void 0:x.docs,source:{originalSource:`{
  args: {
    ...Default.args,
    items: [],
    emptyMessage: "No matching fruit"
  }
}`,...(D=(C=n.parameters)==null?void 0:C.docs)==null?void 0:D.source}}};var N,M,j;o.parameters={...o.parameters,docs:{...(N=o.parameters)==null?void 0:N.docs,source:{originalSource:`{
  args: {
    ...Default.args,
    items: fruits,
    emptyMessage: "No in-season fruit matches",
    // matches on name AND only shows fruit currently in season
    filter: (item, query) => (fruits.find(f => f.id === item.id)?.inSeason ?? false) && item.name.toLowerCase().includes(query.trim().toLowerCase())
  }
}`,...(j=(M=o.parameters)==null?void 0:M.docs)==null?void 0:j.source}}};var w,E,R;i.parameters={...i.parameters,docs:{...(w=i.parameters)==null?void 0:w.docs,source:{originalSource:`{
  args: {
    ...Default.args,
    onSelect: id => {
      console.log("selected", id);
    }
  }
}`,...(R=(E=i.parameters)==null?void 0:E.docs)==null?void 0:R.source}}};var W,b,L;c.parameters={...c.parameters,docs:{...(W=c.parameters)==null?void 0:W.docs,source:{originalSource:`{
  args: {
    ...Default.args,
    selectedId: 7,
    readOnly: true
  }
}`,...(L=(b=c.parameters)==null?void 0:b.docs)==null?void 0:L.source}}};var q,v,A;m.parameters={...m.parameters,docs:{...(q=m.parameters)==null?void 0:q.docs,source:{originalSource:`{
  args: {
    ...Default.args,
    selectedId: null,
    readOnly: true
  }
}`,...(A=(v=m.parameters)==null?void 0:v.docs)==null?void 0:A.source}}};const U=["Default","WithSelection","NoMatches","CustomFilter","OnSelect","ReadOnlyWithSelection","ReadOnlyEmpty"];export{o as CustomFilter,s as Default,n as NoMatches,i as OnSelect,m as ReadOnlyEmpty,c as ReadOnlyWithSelection,t as WithSelection,U as __namedExportsOrder,T as default};
