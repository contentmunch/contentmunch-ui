import{j as c}from"./jsx-runtime-D_zvdyIk.js";import{r as L}from"./index-D4lIrffr.js";/* empty css                    */import{C as u}from"./Combobox-BCgM-GMI.js";import"./TextInputDropdown-BbXzNnkM.js";import"./Input-ChOmFMv_.js";/* empty css              */import"./Label-WHfwOnzY.js";import"./Icon-1_RwmGu3.js";import"./Spinner-Bp0FQ2cK.js";const d=[{id:1,name:"Apple",inSeason:!0},{id:2,name:"Banana",inSeason:!0},{id:3,name:"Cherry",inSeason:!1},{id:4,name:"Grape",inSeason:!0},{id:5,name:"Grapefruit",inSeason:!1},{id:6,name:"Mango",inSeason:!1},{id:7,name:"Orange",inSeason:!0},{id:8,name:"Papaya",inSeason:!1},{id:9,name:"Pineapple",inSeason:!0},{id:10,name:"Watermelon",inSeason:!0}],B={component:u,title:"Input/Combobox",decorators:[e=>c.jsx("div",{className:"div-input-stories",children:c.jsx(e,{})})],render:e=>{const[m,r]=L.useState(e.selectedId);return c.jsx(u,{...e,selectedId:m,onSelect:a=>{var l;r(a),(l=e.onSelect)==null||l.call(e,a)}})}},s={args:{name:"fruit",items:d,selectedId:null}},t={args:{...s.args,selectedId:7}},n={args:{...s.args,items:[],emptyMessage:"No matching fruit"}},o={args:{...s.args,items:d,emptyMessage:"No in-season fruit matches",filter:(e,m)=>{var r;return(((r=d.find(a=>a.id===e.id))==null?void 0:r.inSeason)??!1)&&e.name.toLowerCase().includes(m.trim().toLowerCase())}}},i={args:{...s.args,onSelect:e=>{console.log("selected",e)}}};var p,f,g;s.parameters={...s.parameters,docs:{...(p=s.parameters)==null?void 0:p.docs,source:{originalSource:`{
  args: {
    name: "fruit",
    items: fruits,
    selectedId: null
  }
}`,...(g=(f=s.parameters)==null?void 0:f.docs)==null?void 0:g.source}}};var S,h,x;t.parameters={...t.parameters,docs:{...(S=t.parameters)==null?void 0:S.docs,source:{originalSource:`{
  args: {
    ...Default.args,
    selectedId: 7
  }
}`,...(x=(h=t.parameters)==null?void 0:h.docs)==null?void 0:x.source}}};var y,C,I;n.parameters={...n.parameters,docs:{...(y=n.parameters)==null?void 0:y.docs,source:{originalSource:`{
  args: {
    ...Default.args,
    items: [],
    emptyMessage: "No matching fruit"
  }
}`,...(I=(C=n.parameters)==null?void 0:C.docs)==null?void 0:I.source}}};var N,D,M;o.parameters={...o.parameters,docs:{...(N=o.parameters)==null?void 0:N.docs,source:{originalSource:`{
  args: {
    ...Default.args,
    items: fruits,
    emptyMessage: "No in-season fruit matches",
    // matches on name AND only shows fruit currently in season
    filter: (item, query) => (fruits.find(f => f.id === item.id)?.inSeason ?? false) && item.name.toLowerCase().includes(query.trim().toLowerCase())
  }
}`,...(M=(D=o.parameters)==null?void 0:D.docs)==null?void 0:M.source}}};var j,w,b;i.parameters={...i.parameters,docs:{...(j=i.parameters)==null?void 0:j.docs,source:{originalSource:`{
  args: {
    ...Default.args,
    onSelect: id => {
      console.log("selected", id);
    }
  }
}`,...(b=(w=i.parameters)==null?void 0:w.docs)==null?void 0:b.source}}};const R=["Default","WithSelection","NoMatches","CustomFilter","OnSelect"];export{o as CustomFilter,s as Default,n as NoMatches,i as OnSelect,t as WithSelection,R as __namedExportsOrder,B as default};
