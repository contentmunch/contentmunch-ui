import{j as o}from"./jsx-runtime-D_zvdyIk.js";import{r as p}from"./index-D4lIrffr.js";import{B as c}from"./Backdrop-D2_qdi5T.js";import{B as d}from"./Button-D0_I9hGM.js";const h={title:"Feedback/Backdrop",component:c,parameters:{layout:"fullscreen"}},e=l=>{const[r,t]=p.useState(!1);return o.jsxs(o.Fragment,{children:[o.jsxs(d,{onClick:()=>{t(!0)},...l,children:[" ",r?"Click anywhere in the backdrop":"Click to see backdrop"]}),o.jsx(c,{show:r,backdropClickHandler:()=>{t(!1)}})]})};e.__docgenInfo={description:"",methods:[],displayName:"Default"};var s,a,n;e.parameters={...e.parameters,docs:{...(s=e.parameters)==null?void 0:s.docs,source:{originalSource:`args => {
  const [show, setShow] = useState(false);
  return <>
            <Button onClick={() => {
      setShow(true);
    }} {...args}> {show ? "Click anywhere in the backdrop" : "Click to see backdrop"}</Button>
            <Backdrop show={show} backdropClickHandler={() => {
      setShow(false);
    }} />
        </>;
}`,...(n=(a=e.parameters)==null?void 0:a.docs)==null?void 0:n.source}}};const f=["Default"];export{e as Default,f as __namedExportsOrder,h as default};
