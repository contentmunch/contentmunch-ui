import{j as D}from"./jsx-runtime-D_zvdyIk.js";import{I as x}from"./Input-BljPyPnE.js";import"./index-D4lIrffr.js";/* empty css              */import"./Label-WHfwOnzY.js";import"./Icon-CHNZMfZ6.js";const He={component:x,title:"Input/Input",decorators:[b=>D.jsx("div",{className:"div-input-stories",children:D.jsx(b,{})})],render:b=>D.jsx(x,{...b})},e={args:{name:"query",type:"text",placeholder:"Type your query"}},r={args:{...e.args,label:"Search",required:!0}},s={args:{...e.args,label:"Search the string",required:!0,labelPosition:"side"}},a={args:{...r.args,icon:"muncher"}},o={args:{...r.args,hoverIcon:"muncher",onHoverIconClick:()=>{console.log("hover icon clicked")}}},t={args:{...a.args,error:"Provide value for Search"}},c={args:{...e.args,type:"color"}},n={args:{...e.args,type:"date"}},p={args:{...e.args,type:"datetime-local"}},m={args:{...e.args,type:"email",placeholder:"Email",icon:"mail"}},l={args:{...e.args,type:"month"}},u={args:{...e.args,type:"number",placeholder:"Phone number",icon:"phone"}},i={args:{...e.args,type:"number",step:.5,placeholder:"Floating point number"}},g={args:{...e.args,type:"password",placeholder:"Type password"}},d={args:{...e.args,type:"range"}},h={args:{...e.args,type:"search"}},y={args:{...e.args,type:"tel"}},S={args:{...e.args,type:"time"}},f={args:{...e.args,type:"url",placeholder:"type url"}},T={args:{...e.args,type:"week"}};var W,v,I;e.parameters={...e.parameters,docs:{...(W=e.parameters)==null?void 0:W.docs,source:{originalSource:`{
  args: {
    name: "query",
    type: "text",
    placeholder: "Type your query"
  }
}`,...(I=(v=e.parameters)==null?void 0:v.docs)==null?void 0:I.source}}};var k,q,w;r.parameters={...r.parameters,docs:{...(k=r.parameters)==null?void 0:k.docs,source:{originalSource:`{
  args: {
    ...Default.args,
    label: 'Search',
    required: true
  }
}`,...(w=(q=r.parameters)==null?void 0:q.docs)==null?void 0:w.source}}};var E,P,L;s.parameters={...s.parameters,docs:{...(E=s.parameters)==null?void 0:E.docs,source:{originalSource:`{
  args: {
    ...Default.args,
    label: 'Search the string',
    required: true,
    labelPosition: 'side'
  }
}`,...(L=(P=s.parameters)==null?void 0:P.docs)==null?void 0:L.source}}};var j,C,F;a.parameters={...a.parameters,docs:{...(j=a.parameters)==null?void 0:j.docs,source:{originalSource:`{
  args: {
    ...TextWithLabel.args,
    icon: "muncher"
  }
}`,...(F=(C=a.parameters)==null?void 0:C.docs)==null?void 0:F.source}}};var H,N,O;o.parameters={...o.parameters,docs:{...(H=o.parameters)==null?void 0:H.docs,source:{originalSource:`{
  args: {
    ...TextWithLabel.args,
    hoverIcon: "muncher",
    onHoverIconClick: () => {
      console.log("hover icon clicked");
    }
  }
}`,...(O=(N=o.parameters)==null?void 0:N.docs)==null?void 0:O.source}}};var R,M,U;t.parameters={...t.parameters,docs:{...(R=t.parameters)==null?void 0:R.docs,source:{originalSource:`{
  args: {
    ...TextWithIcon.args,
    error: "Provide value for Search"
  }
}`,...(U=(M=t.parameters)==null?void 0:M.docs)==null?void 0:U.source}}};var _,z,A;c.parameters={...c.parameters,docs:{...(_=c.parameters)==null?void 0:_.docs,source:{originalSource:`{
  args: {
    ...Default.args,
    type: 'color'
  }
}`,...(A=(z=c.parameters)==null?void 0:z.docs)==null?void 0:A.source}}};var B,G,J;n.parameters={...n.parameters,docs:{...(B=n.parameters)==null?void 0:B.docs,source:{originalSource:`{
  args: {
    ...Default.args,
    type: 'date'
  }
}`,...(J=(G=n.parameters)==null?void 0:G.docs)==null?void 0:J.source}}};var K,Q,V;p.parameters={...p.parameters,docs:{...(K=p.parameters)==null?void 0:K.docs,source:{originalSource:`{
  args: {
    ...Default.args,
    type: 'datetime-local'
  }
}`,...(V=(Q=p.parameters)==null?void 0:Q.docs)==null?void 0:V.source}}};var X,Y,Z;m.parameters={...m.parameters,docs:{...(X=m.parameters)==null?void 0:X.docs,source:{originalSource:`{
  args: {
    ...Default.args,
    type: 'email',
    placeholder: "Email",
    icon: "mail"
  }
}`,...(Z=(Y=m.parameters)==null?void 0:Y.docs)==null?void 0:Z.source}}};var $,ee,re;l.parameters={...l.parameters,docs:{...($=l.parameters)==null?void 0:$.docs,source:{originalSource:`{
  args: {
    ...Default.args,
    type: 'month'
  }
}`,...(re=(ee=l.parameters)==null?void 0:ee.docs)==null?void 0:re.source}}};var ae,se,oe;u.parameters={...u.parameters,docs:{...(ae=u.parameters)==null?void 0:ae.docs,source:{originalSource:`{
  args: {
    ...Default.args,
    type: 'number',
    placeholder: "Phone number",
    icon: "phone"
  }
}`,...(oe=(se=u.parameters)==null?void 0:se.docs)==null?void 0:oe.source}}};var te,ce,ne;i.parameters={...i.parameters,docs:{...(te=i.parameters)==null?void 0:te.docs,source:{originalSource:`{
  args: {
    ...Default.args,
    type: 'number',
    step: 0.5,
    placeholder: "Floating point number"
  }
}`,...(ne=(ce=i.parameters)==null?void 0:ce.docs)==null?void 0:ne.source}}};var pe,me,le;g.parameters={...g.parameters,docs:{...(pe=g.parameters)==null?void 0:pe.docs,source:{originalSource:`{
  args: {
    ...Default.args,
    type: 'password',
    placeholder: "Type password"
  }
}`,...(le=(me=g.parameters)==null?void 0:me.docs)==null?void 0:le.source}}};var ue,ie,ge;d.parameters={...d.parameters,docs:{...(ue=d.parameters)==null?void 0:ue.docs,source:{originalSource:`{
  args: {
    ...Default.args,
    type: 'range'
  }
}`,...(ge=(ie=d.parameters)==null?void 0:ie.docs)==null?void 0:ge.source}}};var de,he,ye;h.parameters={...h.parameters,docs:{...(de=h.parameters)==null?void 0:de.docs,source:{originalSource:`{
  args: {
    ...Default.args,
    type: 'search'
  }
}`,...(ye=(he=h.parameters)==null?void 0:he.docs)==null?void 0:ye.source}}};var Se,fe,Te;y.parameters={...y.parameters,docs:{...(Se=y.parameters)==null?void 0:Se.docs,source:{originalSource:`{
  args: {
    ...Default.args,
    type: 'tel'
  }
}`,...(Te=(fe=y.parameters)==null?void 0:fe.docs)==null?void 0:Te.source}}};var be,De,xe;S.parameters={...S.parameters,docs:{...(be=S.parameters)==null?void 0:be.docs,source:{originalSource:`{
  args: {
    ...Default.args,
    type: 'time'
  }
}`,...(xe=(De=S.parameters)==null?void 0:De.docs)==null?void 0:xe.source}}};var We,ve,Ie;f.parameters={...f.parameters,docs:{...(We=f.parameters)==null?void 0:We.docs,source:{originalSource:`{
  args: {
    ...Default.args,
    type: 'url',
    placeholder: 'type url'
  }
}`,...(Ie=(ve=f.parameters)==null?void 0:ve.docs)==null?void 0:Ie.source}}};var ke,qe,we;T.parameters={...T.parameters,docs:{...(ke=T.parameters)==null?void 0:ke.docs,source:{originalSource:`{
  args: {
    ...Default.args,
    type: 'week'
  }
}`,...(we=(qe=T.parameters)==null?void 0:qe.docs)==null?void 0:we.source}}};const Ne=["Default","TextWithLabel","TextWithLabelOnTheSide","TextWithIcon","TextWithHoverIcon","WithError","Color","Date","DateTime","Email","Month","Number","Float","Password","Range","Search","Tel","Time","Url","Week"];export{c as Color,n as Date,p as DateTime,e as Default,m as Email,i as Float,l as Month,u as Number,g as Password,d as Range,h as Search,y as Tel,o as TextWithHoverIcon,a as TextWithIcon,r as TextWithLabel,s as TextWithLabelOnTheSide,S as Time,f as Url,T as Week,t as WithError,Ne as __namedExportsOrder,He as default};
