import{j as v}from"./jsx-runtime-D_zvdyIk.js";import{S as s}from"./Select-BsGojEN0.js";import"./index-D4lIrffr.js";import"./Label-WHfwOnzY.js";import"./Icon-CHNZMfZ6.js";/* empty css              */const b={component:s,title:"Input/Select",render:o=>v.jsx(s,{...o})},e={args:{name:"select",label:"select what",required:!0,options:["Option1","Option2","Option3"],onChange:o=>{console.log(o.target.value)}}},r={args:{...e.args,multiple:!0}},a={args:{...e.args,error:"Provide value for select"}},t={args:{...e.args,value:"Option2"}};var n,l,c;e.parameters={...e.parameters,docs:{...(n=e.parameters)==null?void 0:n.docs,source:{originalSource:`{
  args: {
    name: "select",
    label: "select what",
    required: true,
    options: ["Option1", "Option2", "Option3"],
    onChange: e => {
      console.log(e.target.value);
    }
  }
}`,...(c=(l=e.parameters)==null?void 0:l.docs)==null?void 0:c.source}}};var p,i,u;r.parameters={...r.parameters,docs:{...(p=r.parameters)==null?void 0:p.docs,source:{originalSource:`{
  args: {
    ...Default.args,
    multiple: true
  }
}`,...(u=(i=r.parameters)==null?void 0:i.docs)==null?void 0:u.source}}};var m,g,d;a.parameters={...a.parameters,docs:{...(m=a.parameters)==null?void 0:m.docs,source:{originalSource:`{
  args: {
    ...Default.args,
    error: "Provide value for select"
  }
}`,...(d=(g=a.parameters)==null?void 0:g.docs)==null?void 0:d.source}}};var f,O,h;t.parameters={...t.parameters,docs:{...(f=t.parameters)==null?void 0:f.docs,source:{originalSource:`{
  args: {
    ...Default.args,
    value: "Option2"
  }
}`,...(h=(O=t.parameters)==null?void 0:O.docs)==null?void 0:h.source}}};const q=["Default","Multiple","WithError","WithValue"];export{e as Default,r as Multiple,a as WithError,t as WithValue,q as __namedExportsOrder,b as default};
