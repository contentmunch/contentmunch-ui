import{j as n}from"./jsx-runtime-D_zvdyIk.js";import{r as s}from"./index-D4lIrffr.js";import{T as c}from"./TextInputDropdown-BodNs6_R.js";import"./Input-CoNMfJH2.js";/* empty css              */import"./Label-WHfwOnzY.js";import"./Icon-Bj0efVpV.js";import"./Spinner-Bp0FQ2cK.js";const v={component:c,title:"Input/TextInputDropdown",decorators:[t=>n.jsx("div",{className:"muncher-input-drop-down-story",children:n.jsx(t,{})})]},e=t=>{const[l,o]=s.useState(!1),[u,r]=s.useState("");return n.jsxs("div",{className:"muncher-dropdown-story",children:[n.jsx("span",{children:"a long text "}),n.jsxs(c,{...t,showContent:l,setShowContent:o,handleInputChange:i=>{r(i)},value:u,label:"country",required:!0,error:"This is an error",children:[n.jsx("p",{children:"Drop down content"}),n.jsx("p",{children:"Drop down content"}),n.jsx("p",{children:"Drop down content"}),n.jsx("p",{children:"Drop down content"}),n.jsx("p",{onClick:()=>{r("Tese"),o(!1)},children:"Drop down content"})]})]})};e.__docgenInfo={description:"",methods:[],displayName:"Default"};var p,a,d;e.parameters={...e.parameters,docs:{...(p=e.parameters)==null?void 0:p.docs,source:{originalSource:`args => {
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
}`,...(d=(a=e.parameters)==null?void 0:a.docs)==null?void 0:d.source}}};const S=["Default"];export{e as Default,S as __namedExportsOrder,v as default};
