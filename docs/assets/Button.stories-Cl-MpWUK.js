import"./index-D4lIrffr.js";var v={exports:{}},s={};/**
 * @license React
 * react-jsx-runtime.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var E;function J(){if(E)return s;E=1;var t=Symbol.for("react.transitional.element"),u=Symbol.for("react.fragment");function a(c,e,n){var r=null;if(n!==void 0&&(r=""+n),e.key!==void 0&&(r=""+e.key),"key"in e){n={};for(var o in e)o!=="key"&&(n[o]=e[o])}else n=e;return e=n.ref,{$$typeof:t,type:c,key:r,ref:e!==void 0?e:null,props:n}}return s.Fragment=u,s.jsx=a,s.jsxs=a,s}var M;function A(){return M||(M=1,v.exports=J()),v.exports}var H=A();const p=({type:t="button",variant:u,size:a="medium",title:c,active:e,disabled:n,rounded:r,onClick:o,onMouseDown:_,onMouseEnter:S,onMouseLeave:k,children:N,...j})=>{const D="muncher-button"+(t&&t==="nav"?" muncher-button--nav":"")+(u?" muncher-button--"+u:"")+(a?" muncher-button--"+a:"")+(e?" muncher-button--active":"")+(r?" muncher-button--rounded":"");return H.jsx("button",{type:t&&t!=="nav"?t:"button",className:D,disabled:!!n,title:c,onClick:o,onMouseDown:_,onMouseEnter:S,onMouseLeave:k,...j,children:N})};p.__docgenInfo={description:"",methods:[],displayName:"Button",props:{variant:{required:!1,tsType:{name:"union",raw:"'primary' | 'secondary' | 'tertiary' | 'transparent' | 'danger'",elements:[{name:"literal",value:"'primary'"},{name:"literal",value:"'secondary'"},{name:"literal",value:"'tertiary'"},{name:"literal",value:"'transparent'"},{name:"literal",value:"'danger'"}]},description:""},size:{required:!1,tsType:{name:"union",raw:"'small' | 'medium' | 'large'",elements:[{name:"literal",value:"'small'"},{name:"literal",value:"'medium'"},{name:"literal",value:"'large'"}]},description:"",defaultValue:{value:"'medium'",computed:!1}},title:{required:!1,tsType:{name:"string"},description:"button title, corresponds to title on hover"},active:{required:!1,tsType:{name:"boolean"},description:""},disabled:{required:!1,tsType:{name:"boolean"},description:""},rounded:{required:!1,tsType:{name:"boolean"},description:"if true, the button edges are rounded"},children:{required:!1,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:""},type:{required:!1,tsType:{name:"union",raw:"'button' | 'submit' | 'reset' | 'nav'",elements:[{name:"literal",value:"'button'"},{name:"literal",value:"'submit'"},{name:"literal",value:"'reset'"},{name:"literal",value:"'nav'"}]},description:"",defaultValue:{value:"'button'",computed:!1}},onClick:{required:!1,tsType:{name:"signature",type:"function",raw:"(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void",signature:{arguments:[{type:{name:"ReactMouseEvent",raw:"React.MouseEvent<HTMLButtonElement, MouseEvent>",elements:[{name:"HTMLButtonElement"},{name:"MouseEvent"}]},name:"event"}],return:{name:"void"}}},description:"button click handler"},onMouseDown:{required:!1,tsType:{name:"signature",type:"function",raw:"(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void",signature:{arguments:[{type:{name:"ReactMouseEvent",raw:"React.MouseEvent<HTMLButtonElement, MouseEvent>",elements:[{name:"HTMLButtonElement"},{name:"MouseEvent"}]},name:"event"}],return:{name:"void"}}},description:"button mouse down handler"},onMouseEnter:{required:!1,tsType:{name:"signature",type:"function",raw:"(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void",signature:{arguments:[{type:{name:"ReactMouseEvent",raw:"React.MouseEvent<HTMLButtonElement, MouseEvent>",elements:[{name:"HTMLButtonElement"},{name:"MouseEvent"}]},name:"event"}],return:{name:"void"}}},description:""},onMouseLeave:{required:!1,tsType:{name:"signature",type:"function",raw:"(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void",signature:{arguments:[{type:{name:"ReactMouseEvent",raw:"React.MouseEvent<HTMLButtonElement, MouseEvent>",elements:[{name:"HTMLButtonElement"},{name:"MouseEvent"}]},name:"event"}],return:{name:"void"}}},description:""}}};const P={component:p,title:"Buttons/Button",render:t=>H.jsx(p,{...t,children:"Button"})},i={args:{title:"Default Button"}},l={args:{title:"Nav Button",type:"nav"}},m={args:{title:"Secondary Button",variant:"secondary"}},d={args:{title:"Tertiary Button",variant:"tertiary"}};var y,T,f;i.parameters={...i.parameters,docs:{...(y=i.parameters)==null?void 0:y.docs,source:{originalSource:`{
  args: {
    title: 'Default Button'
  }
}`,...(f=(T=i.parameters)==null?void 0:T.docs)==null?void 0:f.source}}};var R,B,g;l.parameters={...l.parameters,docs:{...(R=l.parameters)==null?void 0:R.docs,source:{originalSource:`{
  args: {
    title: 'Nav Button',
    type: 'nav'
  }
}`,...(g=(B=l.parameters)==null?void 0:B.docs)==null?void 0:g.source}}};var b,x,q;m.parameters={...m.parameters,docs:{...(b=m.parameters)==null?void 0:b.docs,source:{originalSource:`{
  args: {
    title: 'Secondary Button',
    variant: 'secondary'
  }
}`,...(q=(x=m.parameters)==null?void 0:x.docs)==null?void 0:q.source}}};var h,w,L;d.parameters={...d.parameters,docs:{...(h=d.parameters)==null?void 0:h.docs,source:{originalSource:`{
  args: {
    title: 'Tertiary Button',
    variant: 'tertiary'
  }
}`,...(L=(w=d.parameters)==null?void 0:w.docs)==null?void 0:L.source}}};const F=["Default","NavButton","Secondary","Tertiary"];export{i as Default,l as NavButton,m as Secondary,d as Tertiary,F as __namedExportsOrder,P as default};
