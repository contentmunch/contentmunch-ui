import{j as W}from"./jsx-runtime-D_zvdyIk.js";import{I as v}from"./Input-CoNMfJH2.js";import"./index-D4lIrffr.js";/* empty css              */import"./Label-WHfwOnzY.js";import"./Icon-Bj0efVpV.js";import"./Spinner-Bp0FQ2cK.js";const Be={component:v,title:"Input/Input",decorators:[x=>W.jsx("div",{className:"div-input-stories",children:W.jsx(x,{})})],render:x=>W.jsx(v,{...x})},e={args:{name:"query",type:"text",placeholder:"Type your query"}},r={args:{...e.args,label:"Search",required:!0}},s={args:{...e.args,label:"Search the string",required:!0,labelPosition:"side"}},a={args:{...r.args,icon:"muncher"}},o={args:{...r.args,hoverIcon:"muncher",onHoverIconClick:()=>{console.log("hover icon clicked")}}},t={args:{...a.args,error:"Provide value for Search"}},n={args:{...e.args,type:"color"}},c={args:{...e.args,type:"date"}},p={args:{...e.args,type:"datetime-local"}},m={args:{...e.args,type:"email",placeholder:"Email",icon:"mail"}},l={args:{...e.args,type:"month"}},u={args:{...e.args,type:"number",placeholder:"Phone number",icon:"phone"}},i={args:{...e.args,type:"number",step:.5,placeholder:"Floating point number"}},g={args:{...e.args,type:"password",placeholder:"Type password"}},d={args:{...e.args,type:"range"}},h={args:{...e.args,type:"search"}},y={args:{...e.args,type:"tel"}},S={args:{...e.args,type:"time"}},f={args:{...e.args,type:"url",placeholder:"type url"}},D={args:{...e.args,type:"week"}},T={args:{...e.args,onEnterPress:()=>{console.log("Enter pressed")}}},b={args:{...e.args,displayLoader:!0}};var E,I,P;e.parameters={...e.parameters,docs:{...(E=e.parameters)==null?void 0:E.docs,source:{originalSource:`{
  args: {
    name: "query",
    type: "text",
    placeholder: "Type your query"
  }
}`,...(P=(I=e.parameters)==null?void 0:I.docs)==null?void 0:P.source}}};var k,q,w;r.parameters={...r.parameters,docs:{...(k=r.parameters)==null?void 0:k.docs,source:{originalSource:`{
  args: {
    ...Default.args,
    label: 'Search',
    required: true
  }
}`,...(w=(q=r.parameters)==null?void 0:q.docs)==null?void 0:w.source}}};var L,j,C;s.parameters={...s.parameters,docs:{...(L=s.parameters)==null?void 0:L.docs,source:{originalSource:`{
  args: {
    ...Default.args,
    label: 'Search the string',
    required: true,
    labelPosition: 'side'
  }
}`,...(C=(j=s.parameters)==null?void 0:j.docs)==null?void 0:C.source}}};var F,H,N;a.parameters={...a.parameters,docs:{...(F=a.parameters)==null?void 0:F.docs,source:{originalSource:`{
  args: {
    ...TextWithLabel.args,
    icon: "muncher"
  }
}`,...(N=(H=a.parameters)==null?void 0:H.docs)==null?void 0:N.source}}};var O,R,M;o.parameters={...o.parameters,docs:{...(O=o.parameters)==null?void 0:O.docs,source:{originalSource:`{
  args: {
    ...TextWithLabel.args,
    hoverIcon: "muncher",
    onHoverIconClick: () => {
      console.log("hover icon clicked");
    }
  }
}`,...(M=(R=o.parameters)==null?void 0:R.docs)==null?void 0:M.source}}};var U,_,z;t.parameters={...t.parameters,docs:{...(U=t.parameters)==null?void 0:U.docs,source:{originalSource:`{
  args: {
    ...TextWithIcon.args,
    error: "Provide value for Search"
  }
}`,...(z=(_=t.parameters)==null?void 0:_.docs)==null?void 0:z.source}}};var A,B,G;n.parameters={...n.parameters,docs:{...(A=n.parameters)==null?void 0:A.docs,source:{originalSource:`{
  args: {
    ...Default.args,
    type: 'color'
  }
}`,...(G=(B=n.parameters)==null?void 0:B.docs)==null?void 0:G.source}}};var J,K,Q;c.parameters={...c.parameters,docs:{...(J=c.parameters)==null?void 0:J.docs,source:{originalSource:`{
  args: {
    ...Default.args,
    type: 'date'
  }
}`,...(Q=(K=c.parameters)==null?void 0:K.docs)==null?void 0:Q.source}}};var V,X,Y;p.parameters={...p.parameters,docs:{...(V=p.parameters)==null?void 0:V.docs,source:{originalSource:`{
  args: {
    ...Default.args,
    type: 'datetime-local'
  }
}`,...(Y=(X=p.parameters)==null?void 0:X.docs)==null?void 0:Y.source}}};var Z,$,ee;m.parameters={...m.parameters,docs:{...(Z=m.parameters)==null?void 0:Z.docs,source:{originalSource:`{
  args: {
    ...Default.args,
    type: 'email',
    placeholder: "Email",
    icon: "mail"
  }
}`,...(ee=($=m.parameters)==null?void 0:$.docs)==null?void 0:ee.source}}};var re,ae,se;l.parameters={...l.parameters,docs:{...(re=l.parameters)==null?void 0:re.docs,source:{originalSource:`{
  args: {
    ...Default.args,
    type: 'month'
  }
}`,...(se=(ae=l.parameters)==null?void 0:ae.docs)==null?void 0:se.source}}};var oe,te,ne;u.parameters={...u.parameters,docs:{...(oe=u.parameters)==null?void 0:oe.docs,source:{originalSource:`{
  args: {
    ...Default.args,
    type: 'number',
    placeholder: "Phone number",
    icon: "phone"
  }
}`,...(ne=(te=u.parameters)==null?void 0:te.docs)==null?void 0:ne.source}}};var ce,pe,me;i.parameters={...i.parameters,docs:{...(ce=i.parameters)==null?void 0:ce.docs,source:{originalSource:`{
  args: {
    ...Default.args,
    type: 'number',
    step: 0.5,
    placeholder: "Floating point number"
  }
}`,...(me=(pe=i.parameters)==null?void 0:pe.docs)==null?void 0:me.source}}};var le,ue,ie;g.parameters={...g.parameters,docs:{...(le=g.parameters)==null?void 0:le.docs,source:{originalSource:`{
  args: {
    ...Default.args,
    type: 'password',
    placeholder: "Type password"
  }
}`,...(ie=(ue=g.parameters)==null?void 0:ue.docs)==null?void 0:ie.source}}};var ge,de,he;d.parameters={...d.parameters,docs:{...(ge=d.parameters)==null?void 0:ge.docs,source:{originalSource:`{
  args: {
    ...Default.args,
    type: 'range'
  }
}`,...(he=(de=d.parameters)==null?void 0:de.docs)==null?void 0:he.source}}};var ye,Se,fe;h.parameters={...h.parameters,docs:{...(ye=h.parameters)==null?void 0:ye.docs,source:{originalSource:`{
  args: {
    ...Default.args,
    type: 'search'
  }
}`,...(fe=(Se=h.parameters)==null?void 0:Se.docs)==null?void 0:fe.source}}};var De,Te,be;y.parameters={...y.parameters,docs:{...(De=y.parameters)==null?void 0:De.docs,source:{originalSource:`{
  args: {
    ...Default.args,
    type: 'tel'
  }
}`,...(be=(Te=y.parameters)==null?void 0:Te.docs)==null?void 0:be.source}}};var xe,We,ve;S.parameters={...S.parameters,docs:{...(xe=S.parameters)==null?void 0:xe.docs,source:{originalSource:`{
  args: {
    ...Default.args,
    type: 'time'
  }
}`,...(ve=(We=S.parameters)==null?void 0:We.docs)==null?void 0:ve.source}}};var Ee,Ie,Pe;f.parameters={...f.parameters,docs:{...(Ee=f.parameters)==null?void 0:Ee.docs,source:{originalSource:`{
  args: {
    ...Default.args,
    type: 'url',
    placeholder: 'type url'
  }
}`,...(Pe=(Ie=f.parameters)==null?void 0:Ie.docs)==null?void 0:Pe.source}}};var ke,qe,we;D.parameters={...D.parameters,docs:{...(ke=D.parameters)==null?void 0:ke.docs,source:{originalSource:`{
  args: {
    ...Default.args,
    type: 'week'
  }
}`,...(we=(qe=D.parameters)==null?void 0:qe.docs)==null?void 0:we.source}}};var Le,je,Ce;T.parameters={...T.parameters,docs:{...(Le=T.parameters)==null?void 0:Le.docs,source:{originalSource:`{
  args: {
    ...Default.args,
    onEnterPress: () => {
      console.log("Enter pressed");
    }
  }
}`,...(Ce=(je=T.parameters)==null?void 0:je.docs)==null?void 0:Ce.source}}};var Fe,He,Ne;b.parameters={...b.parameters,docs:{...(Fe=b.parameters)==null?void 0:Fe.docs,source:{originalSource:`{
  args: {
    ...Default.args,
    displayLoader: true
  }
}`,...(Ne=(He=b.parameters)==null?void 0:He.docs)==null?void 0:Ne.source}}};const Ge=["Default","TextWithLabel","TextWithLabelOnTheSide","TextWithIcon","TextWithHoverIcon","WithError","Color","Date","DateTime","Email","Month","Number","Float","Password","Range","Search","Tel","Time","Url","Week","EnterPressed","WithSpinner"];export{n as Color,c as Date,p as DateTime,e as Default,m as Email,T as EnterPressed,i as Float,l as Month,u as Number,g as Password,d as Range,h as Search,y as Tel,o as TextWithHoverIcon,a as TextWithIcon,r as TextWithLabel,s as TextWithLabelOnTheSide,S as Time,f as Url,D as Week,t as WithError,b as WithSpinner,Ge as __namedExportsOrder,Be as default};
