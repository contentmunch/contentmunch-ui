import{j as e}from"./jsx-runtime-D_zvdyIk.js";import"./index-D4lIrffr.js";import{S as t}from"./Step-CBuguM2M.js";import"./Badge-DyX1sYip.js";import"./Icon-jOqH0-QP.js";const p=({children:a})=>e.jsx("div",{className:"muncher-step--container",children:a});p.__docgenInfo={description:"",methods:[],displayName:"StepContainer",props:{children:{required:!0,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:""}}};const r=()=>e.jsx("div",{className:"muncher-step--line"});r.__docgenInfo={description:"",methods:[],displayName:"StepLine"};const g={component:p,title:"Data Display/Step",render:a=>e.jsx(p,{...a})},n={args:{children:e.jsxs(e.Fragment,{children:[e.jsx(t,{active:!0,label:"You are here",children:"1"}),e.jsx(r,{}),e.jsx(t,{children:"2"}),e.jsx(r,{}),e.jsx(t,{children:"3"})]})}},s={args:{children:e.jsxs(e.Fragment,{children:[e.jsx(t,{completed:!0,children:"1"}),e.jsx(r,{}),e.jsx(t,{active:!0,label:"You are here",children:"2"}),e.jsx(r,{}),e.jsx(t,{children:"3"})]})}};var o,i,c;n.parameters={...n.parameters,docs:{...(o=n.parameters)==null?void 0:o.docs,source:{originalSource:`{
  args: {
    children: <>
                <Step active={true} label="You are here">1</Step>
                <StepLine />
                <Step>2</Step>
                <StepLine />
                <Step>3</Step>
            </>
  }
}`,...(c=(i=n.parameters)==null?void 0:i.docs)==null?void 0:c.source}}};var d,l,S;s.parameters={...s.parameters,docs:{...(d=s.parameters)==null?void 0:d.docs,source:{originalSource:`{
  args: {
    children: <>
                <Step completed={true}>1</Step>
                <StepLine />
                <Step active={true} label="You are here">2</Step>
                <StepLine />
                <Step>3</Step>
            </>
  }
}`,...(S=(l=s.parameters)==null?void 0:l.docs)==null?void 0:S.source}}};const v=["StepContainerStep1","StepContainerStep2"];export{n as StepContainerStep1,s as StepContainerStep2,v as __namedExportsOrder,g as default};
