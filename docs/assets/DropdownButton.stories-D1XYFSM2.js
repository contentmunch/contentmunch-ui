import{j as t}from"./jsx-runtime-D_zvdyIk.js";import{r as c}from"./index-D4lIrffr.js";/* empty css                               */import{D as s}from"./DropdownButton-cwUtJBMT.js";import"./Button-D0_I9hGM.js";const h={component:s,title:"Buttons/Dropdown Button"},o=a=>{const[p,d]=c.useState(!1);return t.jsxs("div",{className:"muncher-dropdown-story",children:[t.jsx("span",{children:"a long text "}),t.jsx(s,{element:t.jsx("p",{children:"drop down"}),...a,showContent:p,setShowContent:d,children:t.jsx("p",{children:"Drop down content little longer"})})]})};o.__docgenInfo={description:"",methods:[],displayName:"Default"};var n,e,r;o.parameters={...o.parameters,docs:{...(n=o.parameters)==null?void 0:n.docs,source:{originalSource:`args => {
  const [showContent, setShowContent] = useState(false);
  return <div className="muncher-dropdown-story">
            <span>a long text&nbsp;</span>
            <DropdownButton element={<p>drop down</p>} {...args} showContent={showContent} setShowContent={setShowContent}>
                <p>Drop down content little longer</p>
            </DropdownButton>
        </div>;
}`,...(r=(e=o.parameters)==null?void 0:e.docs)==null?void 0:r.source}}};const x=["Default"];export{o as Default,x as __namedExportsOrder,h as default};
