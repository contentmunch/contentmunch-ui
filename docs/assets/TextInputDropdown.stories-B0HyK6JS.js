import{j as n}from"./jsx-runtime-D_zvdyIk.js";import{r as s}from"./index-D4lIrffr.js";import{T as c}from"./TextInputDropdown-BhtbmAdu.js";import"./Input-BljPyPnE.js";/* empty css              */import"./Label-WHfwOnzY.js";import"./Icon-CHNZMfZ6.js";const j={component:c,title:"Input/TextInputDropdown",decorators:[t=>n.jsx("div",{className:"muncher-input-drop-down-story",children:n.jsx(t,{})})]},e=t=>{const[l,o]=s.useState(!1),[u,r]=s.useState("");return n.jsxs("div",{className:"muncher-dropdown-story",children:[n.jsx("span",{children:"a long text "}),n.jsxs(c,{...t,showContent:l,setShowContent:o,handleInputChange:i=>{r(i)},value:u,label:"country",required:!0,error:"This is an error",children:[n.jsx("p",{children:"Drop down content"}),n.jsx("p",{children:"Drop down content"}),n.jsx("p",{children:"Drop down content"}),n.jsx("p",{children:"Drop down content"}),n.jsx("p",{onClick:()=>{r("Tese"),o(!1)},children:"Drop down content"})]})]})};e.__docgenInfo={description:"",methods:[],displayName:"Default"};var a,p,d;e.parameters={...e.parameters,docs:{...(a=e.parameters)==null?void 0:a.docs,source:{originalSource:`args => {
  const [showContent, setShowContent] = useState(false);
  const [value, setValue] = useState("");
  return <div className="muncher-dropdown-story">
            <span>a long text&nbsp;</span>
            <TextInputDropdown {...args} showContent={showContent} setShowContent={setShowContent} handleInputChange={value => {
      setValue(value);
    }} value={value} label="country" required={true} error={"This is an error"}>
                <p>Drop down content</p>
                <p>Drop down content</p>
                <p>Drop down content</p>
                <p>Drop down content</p>
                <p onClick={() => {
        setValue("Tese");
        setShowContent(false);
      }}>Drop down content</p>

            </TextInputDropdown>
        </div>;
}`,...(d=(p=e.parameters)==null?void 0:p.docs)==null?void 0:d.source}}};const v=["Default"];export{e as Default,v as __namedExportsOrder,j as default};
