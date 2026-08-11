import{j as e}from"./jsx-runtime-D_zvdyIk.js";import{r as d}from"./index-D4lIrffr.js";import{I as a}from"./ImageInput-CfbNIjEX.js";/* empty css                   */import"./Icon-1_RwmGu3.js";const I={component:a,title:"Input/Image Input",render:r=>e.jsx(a,{...r})},s={args:{name:"file",label:"upload image",required:!0,multiple:!0,setFiles:()=>{}}},g=()=>{const[r,u]=d.useState([]);return e.jsxs("div",{children:[e.jsx(a,{name:"single-file",label:"upload one image",multiple:!1,setFiles:u}),e.jsxs("p",{children:[r.length," file(s): ",r.map(c=>c.name).join(", ")]})]})},t={render:()=>e.jsx(g,{})};var i,l,n;s.parameters={...s.parameters,docs:{...(i=s.parameters)==null?void 0:i.docs,source:{originalSource:`{
  args: {
    name: "file",
    label: "upload image",
    required: true,
    multiple: true,
    setFiles: () => {}
  }
}`,...(n=(l=s.parameters)==null?void 0:l.docs)==null?void 0:n.source}}};var o,m,p;t.parameters={...t.parameters,docs:{...(o=t.parameters)==null?void 0:o.docs,source:{originalSource:`{
  render: () => <SingleFileDemo />
}`,...(p=(m=t.parameters)==null?void 0:m.docs)==null?void 0:p.source}}};const v=["Default","SingleFileReceivedBySetFiles"];export{s as Default,t as SingleFileReceivedBySetFiles,v as __namedExportsOrder,I as default};
