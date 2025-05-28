import{j as x}from"./jsx-runtime-D_zvdyIk.js";import{I as W}from"./Input-CrnQviid.js";import"./index-D4lIrffr.js";/* empty css              */import"./Label-WHfwOnzY.js";import"./Icon-Bj0efVpV.js";const Me={component:W,title:"Input/Input",decorators:[b=>x.jsx("div",{className:"div-input-stories",children:x.jsx(b,{})})],render:b=>x.jsx(W,{...b})},e={args:{name:"query",type:"text",placeholder:"Type your query"}},r={args:{...e.args,label:"Search",required:!0}},s={args:{...e.args,label:"Search the string",required:!0,labelPosition:"side"}},a={args:{...r.args,icon:"muncher"}},o={args:{...r.args,hoverIcon:"muncher",onHoverIconClick:()=>{console.log("hover icon clicked")}}},t={args:{...a.args,error:"Provide value for Search"}},n={args:{...e.args,type:"color"}},c={args:{...e.args,type:"date"}},p={args:{...e.args,type:"datetime-local"}},m={args:{...e.args,type:"email",placeholder:"Email",icon:"mail"}},l={args:{...e.args,type:"month"}},u={args:{...e.args,type:"number",placeholder:"Phone number",icon:"phone"}},i={args:{...e.args,type:"number",step:.5,placeholder:"Floating point number"}},g={args:{...e.args,type:"password",placeholder:"Type password"}},d={args:{...e.args,type:"range"}},h={args:{...e.args,type:"search"}},y={args:{...e.args,type:"tel"}},S={args:{...e.args,type:"time"}},f={args:{...e.args,type:"url",placeholder:"type url"}},D={args:{...e.args,type:"week"}},T={args:{...e.args,onEnterPress:()=>{console.log("Enter pressed")}}};var v,E,I;e.parameters={...e.parameters,docs:{...(v=e.parameters)==null?void 0:v.docs,source:{originalSource:`{
  args: {
    name: "query",
    type: "text",
    placeholder: "Type your query"
  }
}`,...(I=(E=e.parameters)==null?void 0:E.docs)==null?void 0:I.source}}};var P,k,q;r.parameters={...r.parameters,docs:{...(P=r.parameters)==null?void 0:P.docs,source:{originalSource:`{
  args: {
    ...Default.args,
    label: 'Search',
    required: true
  }
}`,...(q=(k=r.parameters)==null?void 0:k.docs)==null?void 0:q.source}}};var w,L,j;s.parameters={...s.parameters,docs:{...(w=s.parameters)==null?void 0:w.docs,source:{originalSource:`{
  args: {
    ...Default.args,
    label: 'Search the string',
    required: true,
    labelPosition: 'side'
  }
}`,...(j=(L=s.parameters)==null?void 0:L.docs)==null?void 0:j.source}}};var C,F,H;a.parameters={...a.parameters,docs:{...(C=a.parameters)==null?void 0:C.docs,source:{originalSource:`{
  args: {
    ...TextWithLabel.args,
    icon: "muncher"
  }
}`,...(H=(F=a.parameters)==null?void 0:F.docs)==null?void 0:H.source}}};var N,O,R;o.parameters={...o.parameters,docs:{...(N=o.parameters)==null?void 0:N.docs,source:{originalSource:`{
  args: {
    ...TextWithLabel.args,
    hoverIcon: "muncher",
    onHoverIconClick: () => {
      console.log("hover icon clicked");
    }
  }
}`,...(R=(O=o.parameters)==null?void 0:O.docs)==null?void 0:R.source}}};var M,U,_;t.parameters={...t.parameters,docs:{...(M=t.parameters)==null?void 0:M.docs,source:{originalSource:`{
  args: {
    ...TextWithIcon.args,
    error: "Provide value for Search"
  }
}`,...(_=(U=t.parameters)==null?void 0:U.docs)==null?void 0:_.source}}};var z,A,B;n.parameters={...n.parameters,docs:{...(z=n.parameters)==null?void 0:z.docs,source:{originalSource:`{
  args: {
    ...Default.args,
    type: 'color'
  }
}`,...(B=(A=n.parameters)==null?void 0:A.docs)==null?void 0:B.source}}};var G,J,K;c.parameters={...c.parameters,docs:{...(G=c.parameters)==null?void 0:G.docs,source:{originalSource:`{
  args: {
    ...Default.args,
    type: 'date'
  }
}`,...(K=(J=c.parameters)==null?void 0:J.docs)==null?void 0:K.source}}};var Q,V,X;p.parameters={...p.parameters,docs:{...(Q=p.parameters)==null?void 0:Q.docs,source:{originalSource:`{
  args: {
    ...Default.args,
    type: 'datetime-local'
  }
}`,...(X=(V=p.parameters)==null?void 0:V.docs)==null?void 0:X.source}}};var Y,Z,$;m.parameters={...m.parameters,docs:{...(Y=m.parameters)==null?void 0:Y.docs,source:{originalSource:`{
  args: {
    ...Default.args,
    type: 'email',
    placeholder: "Email",
    icon: "mail"
  }
}`,...($=(Z=m.parameters)==null?void 0:Z.docs)==null?void 0:$.source}}};var ee,re,ae;l.parameters={...l.parameters,docs:{...(ee=l.parameters)==null?void 0:ee.docs,source:{originalSource:`{
  args: {
    ...Default.args,
    type: 'month'
  }
}`,...(ae=(re=l.parameters)==null?void 0:re.docs)==null?void 0:ae.source}}};var se,oe,te;u.parameters={...u.parameters,docs:{...(se=u.parameters)==null?void 0:se.docs,source:{originalSource:`{
  args: {
    ...Default.args,
    type: 'number',
    placeholder: "Phone number",
    icon: "phone"
  }
}`,...(te=(oe=u.parameters)==null?void 0:oe.docs)==null?void 0:te.source}}};var ne,ce,pe;i.parameters={...i.parameters,docs:{...(ne=i.parameters)==null?void 0:ne.docs,source:{originalSource:`{
  args: {
    ...Default.args,
    type: 'number',
    step: 0.5,
    placeholder: "Floating point number"
  }
}`,...(pe=(ce=i.parameters)==null?void 0:ce.docs)==null?void 0:pe.source}}};var me,le,ue;g.parameters={...g.parameters,docs:{...(me=g.parameters)==null?void 0:me.docs,source:{originalSource:`{
  args: {
    ...Default.args,
    type: 'password',
    placeholder: "Type password"
  }
}`,...(ue=(le=g.parameters)==null?void 0:le.docs)==null?void 0:ue.source}}};var ie,ge,de;d.parameters={...d.parameters,docs:{...(ie=d.parameters)==null?void 0:ie.docs,source:{originalSource:`{
  args: {
    ...Default.args,
    type: 'range'
  }
}`,...(de=(ge=d.parameters)==null?void 0:ge.docs)==null?void 0:de.source}}};var he,ye,Se;h.parameters={...h.parameters,docs:{...(he=h.parameters)==null?void 0:he.docs,source:{originalSource:`{
  args: {
    ...Default.args,
    type: 'search'
  }
}`,...(Se=(ye=h.parameters)==null?void 0:ye.docs)==null?void 0:Se.source}}};var fe,De,Te;y.parameters={...y.parameters,docs:{...(fe=y.parameters)==null?void 0:fe.docs,source:{originalSource:`{
  args: {
    ...Default.args,
    type: 'tel'
  }
}`,...(Te=(De=y.parameters)==null?void 0:De.docs)==null?void 0:Te.source}}};var be,xe,We;S.parameters={...S.parameters,docs:{...(be=S.parameters)==null?void 0:be.docs,source:{originalSource:`{
  args: {
    ...Default.args,
    type: 'time'
  }
}`,...(We=(xe=S.parameters)==null?void 0:xe.docs)==null?void 0:We.source}}};var ve,Ee,Ie;f.parameters={...f.parameters,docs:{...(ve=f.parameters)==null?void 0:ve.docs,source:{originalSource:`{
  args: {
    ...Default.args,
    type: 'url',
    placeholder: 'type url'
  }
}`,...(Ie=(Ee=f.parameters)==null?void 0:Ee.docs)==null?void 0:Ie.source}}};var Pe,ke,qe;D.parameters={...D.parameters,docs:{...(Pe=D.parameters)==null?void 0:Pe.docs,source:{originalSource:`{
  args: {
    ...Default.args,
    type: 'week'
  }
}`,...(qe=(ke=D.parameters)==null?void 0:ke.docs)==null?void 0:qe.source}}};var we,Le,je;T.parameters={...T.parameters,docs:{...(we=T.parameters)==null?void 0:we.docs,source:{originalSource:`{
  args: {
    ...Default.args,
    onEnterPress: () => {
      console.log("Enter pressed");
    }
  }
}`,...(je=(Le=T.parameters)==null?void 0:Le.docs)==null?void 0:je.source}}};const Ue=["Default","TextWithLabel","TextWithLabelOnTheSide","TextWithIcon","TextWithHoverIcon","WithError","Color","Date","DateTime","Email","Month","Number","Float","Password","Range","Search","Tel","Time","Url","Week","EnterPressed"];export{n as Color,c as Date,p as DateTime,e as Default,m as Email,T as EnterPressed,i as Float,l as Month,u as Number,g as Password,d as Range,h as Search,y as Tel,o as TextWithHoverIcon,a as TextWithIcon,r as TextWithLabel,s as TextWithLabelOnTheSide,S as Time,f as Url,D as Week,t as WithError,Ue as __namedExportsOrder,Me as default};
