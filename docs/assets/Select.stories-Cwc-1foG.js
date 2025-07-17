import{j as S}from"./jsx-runtime-D_zvdyIk.js";import{S as o}from"./Select-DOUcZvk3.js";import"./index-D4lIrffr.js";import"./Label-WHfwOnzY.js";import"./Icon-Bj0efVpV.js";/* empty css              */const J={component:o,title:"Input/Select",render:t=>S.jsx(o,{...t})},e={args:{name:"select",label:"select what",required:!0,options:[{label:"JavaScript",value:"js"},{label:"Python",value:"py"},{label:"Java",value:"java"}],onChange:t=>{console.log(t.target.value)}}},r={args:{...e.args,multiple:!0}},a={args:{...e.args,error:"Provide value for select"}},s={args:{...e.args,value:"py"}};var n,l,u;e.parameters={...e.parameters,docs:{...(n=e.parameters)==null?void 0:n.docs,source:{originalSource:`{
  args: {
    name: "select",
    label: "select what",
    required: true,
    options: [{
      label: "JavaScript",
      value: "js"
    }, {
      label: "Python",
      value: "py"
    }, {
      label: "Java",
      value: "java"
    }],
    onChange: e => {
      console.log(e.target.value);
    }
  }
}`,...(u=(l=e.parameters)==null?void 0:l.docs)==null?void 0:u.source}}};var c,p,i;r.parameters={...r.parameters,docs:{...(c=r.parameters)==null?void 0:c.docs,source:{originalSource:`{
  args: {
    ...Default.args,
    multiple: true
  }
}`,...(i=(p=r.parameters)==null?void 0:p.docs)==null?void 0:i.source}}};var m,g,d;a.parameters={...a.parameters,docs:{...(m=a.parameters)==null?void 0:m.docs,source:{originalSource:`{
  args: {
    ...Default.args,
    error: "Provide value for select"
  }
}`,...(d=(g=a.parameters)==null?void 0:g.docs)==null?void 0:d.source}}};var v,f,h;s.parameters={...s.parameters,docs:{...(v=s.parameters)==null?void 0:v.docs,source:{originalSource:`{
  args: {
    ...Default.args,
    value: "py"
  }
}`,...(h=(f=s.parameters)==null?void 0:f.docs)==null?void 0:h.source}}};const P=["Default","Multiple","WithError","WithValue"];export{e as Default,r as Multiple,a as WithError,s as WithValue,P as __namedExportsOrder,J as default};
