import{j as m}from"./jsx-runtime-D_zvdyIk.js";import{r as Q}from"./index-D4lIrffr.js";/* empty css                    */import{E as g}from"./EditableText-nV5HvF4d.js";/* empty css              */import"./Input-ChOmFMv_.js";import"./Label-WHfwOnzY.js";import"./Icon-1_RwmGu3.js";import"./Spinner-Bp0FQ2cK.js";const se={component:g,title:"Input/EditableText",decorators:[e=>m.jsx("div",{className:"div-input-stories",children:m.jsx(e,{})})],render:e=>{const[K,M]=Q.useState(e.value);return m.jsx(g,{...e,value:K,onEditComplete:d=>{var u;M(d),(u=e.onEditComplete)==null||u.call(e,d)}})}},r={args:{name:"title",value:"Click to edit me",placeholder:"Type a value"}},t={args:{...r.args,value:"",emptyText:"No title set"}},a={args:{...r.args,label:"Title",required:!0}},o={args:{...a.args,label:"Title of the page",labelPosition:"side"}},s={args:{...a.args,icon:"type"}},n={args:{...s.args,error:"Title cannot be empty"}},i={args:{...s.args,information:"This value is shown on the dashboard"}},c={args:{...r.args,readOnly:!0}},l={args:{...r.args,displayLoader:!0}},p={args:{...r.args,onEditComplete:e=>{console.log("edit complete",e)}}};var h,b,f;r.parameters={...r.parameters,docs:{...(h=r.parameters)==null?void 0:h.docs,source:{originalSource:`{
  args: {
    name: "title",
    value: "Click to edit me",
    placeholder: "Type a value"
  }
}`,...(f=(b=r.parameters)==null?void 0:b.docs)==null?void 0:f.source}}};var y,E,T;t.parameters={...t.parameters,docs:{...(y=t.parameters)==null?void 0:y.docs,source:{originalSource:`{
  args: {
    ...Default.args,
    value: "",
    emptyText: "No title set"
  }
}`,...(T=(E=t.parameters)==null?void 0:E.docs)==null?void 0:T.source}}};var W,S,v;a.parameters={...a.parameters,docs:{...(W=a.parameters)==null?void 0:W.docs,source:{originalSource:`{
  args: {
    ...Default.args,
    label: 'Title',
    required: true
  }
}`,...(v=(S=a.parameters)==null?void 0:S.docs)==null?void 0:v.source}}};var x,O,C;o.parameters={...o.parameters,docs:{...(x=o.parameters)==null?void 0:x.docs,source:{originalSource:`{
  args: {
    ...WithLabel.args,
    label: 'Title of the page',
    labelPosition: 'side'
  }
}`,...(C=(O=o.parameters)==null?void 0:O.docs)==null?void 0:C.source}}};var L,D,I;s.parameters={...s.parameters,docs:{...(L=s.parameters)==null?void 0:L.docs,source:{originalSource:`{
  args: {
    ...WithLabel.args,
    icon: "type"
  }
}`,...(I=(D=s.parameters)==null?void 0:D.docs)==null?void 0:I.source}}};var j,N,R;n.parameters={...n.parameters,docs:{...(j=n.parameters)==null?void 0:j.docs,source:{originalSource:`{
  args: {
    ...WithIcon.args,
    error: "Title cannot be empty"
  }
}`,...(R=(N=n.parameters)==null?void 0:N.docs)==null?void 0:R.source}}};var k,q,P;i.parameters={...i.parameters,docs:{...(k=i.parameters)==null?void 0:k.docs,source:{originalSource:`{
  args: {
    ...WithIcon.args,
    information: "This value is shown on the dashboard"
  }
}`,...(P=(q=i.parameters)==null?void 0:q.docs)==null?void 0:P.source}}};var _,w,z;c.parameters={...c.parameters,docs:{...(_=c.parameters)==null?void 0:_.docs,source:{originalSource:`{
  args: {
    ...Default.args,
    readOnly: true
  }
}`,...(z=(w=c.parameters)==null?void 0:w.docs)==null?void 0:z.source}}};var A,B,F;l.parameters={...l.parameters,docs:{...(A=l.parameters)==null?void 0:A.docs,source:{originalSource:`{
  args: {
    ...Default.args,
    displayLoader: true
  }
}`,...(F=(B=l.parameters)==null?void 0:B.docs)==null?void 0:F.source}}};var G,H,J;p.parameters={...p.parameters,docs:{...(G=p.parameters)==null?void 0:G.docs,source:{originalSource:`{
  args: {
    ...Default.args,
    onEditComplete: (value: string) => {
      console.log("edit complete", value);
    }
  }
}`,...(J=(H=p.parameters)==null?void 0:H.docs)==null?void 0:J.source}}};const te=["Default","Empty","WithLabel","WithLabelOnTheSide","WithIcon","WithError","WithInfo","ReadOnly","WithSpinner","OnEditComplete"];export{r as Default,t as Empty,p as OnEditComplete,c as ReadOnly,n as WithError,s as WithIcon,i as WithInfo,a as WithLabel,o as WithLabelOnTheSide,l as WithSpinner,te as __namedExportsOrder,se as default};
