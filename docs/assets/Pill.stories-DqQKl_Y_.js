import{j as r}from"./jsx-runtime-D_zvdyIk.js";import{r as u}from"./index-D4lIrffr.js";import{P as m}from"./Modal-BjJc4Jd_.js";import{B as P}from"./Button-D0_I9hGM.js";/* empty css              */import"./Accordion-adXFHUjo.js";import"./Backdrop-D2_qdi5T.js";import"./Badge-Df-lAKnA.js";import"./IconBadge-C0tCXxCy.js";import"./Icon-CHNZMfZ6.js";import"./DropdownButton-BLBggSmK.js";import"./DropdownNavButton-Ckq-GtnH.js";import"./ShareButton-D9vcPlly.js";import"./CopyButton-d_Bg3DmW.js";import"./CsvButton-CMo5RmuL.js";import"./SortButton-DHajaYO9.js";import"./NavigateButton-DeYCrt2E.js";import"./Checkbox-FouZdwqt.js";/* empty css              */import"./Label-WHfwOnzY.js";import"./CsvInput-BnZ6FCbz.js";/* empty css                   */import"./Spinner-4q3HTBHQ.js";import"./ImageInput-y4Xqbcij.js";import"./Input-a0f0R9I3.js";import"./Radio-BQVbHaeg.js";import"./Select-BsGojEN0.js";import"./Textarea-CBtX3awZ.js";import"./TextInputDropdown-CnePYBC2.js";import"./Li-68urSc6I.js";import"./Paper-7Qt7Ew3B.js";import"./Progress-F0Al1TCL.js";import"./ItemSlider-CxJOSSBJ.js";import"./RangeSlider-uoU-No3-.js";/* empty css               */import"./Slider-gR4y9MCq.js";import"./Tabs-CnOsTktt.js";import"./Table-CJgflf45.js";const $={component:m,title:"Data Display/Pill"},i=()=>{const[l,s]=u.useState(["Pill 1"]),c=()=>{const t=[...l];t.push("Pill "+(t.length+1)),s(t)},a=t=>{const o=[...l],d=o.indexOf(t);o.splice(d,1),s(o)};return r.jsxs("div",{className:"muncher-pill-story",children:[r.jsx(P,{variant:"tertiary",onClick:c,children:"Add pills"}),r.jsx("br",{}),r.jsx("br",{}),l.map(t=>r.jsx(m,{pillCloseHandler:()=>a(t),children:t},t))]})};i.__docgenInfo={description:"",methods:[],displayName:"Default"};var n,e,p;i.parameters={...i.parameters,docs:{...(n=i.parameters)==null?void 0:n.docs,source:{originalSource:`() => {
  const [pills, setPills] = useState(["Pill 1"]);
  const addPills = () => {
    const currentPills = [...pills];
    currentPills.push("Pill " + (currentPills.length + 1));
    setPills(currentPills);
  };
  const removePill = (pill: string) => {
    const currentPills = [...pills];
    const index = currentPills.indexOf(pill);
    currentPills.splice(index, 1);
    setPills(currentPills);
  };
  return <div className="muncher-pill-story">

            <Button variant={"tertiary"} onClick={addPills}>Add pills</Button>
            <br /><br />
            {pills.map(pill => <Pill key={pill} pillCloseHandler={() => removePill(pill)}>{pill}</Pill>)}

        </div>;
}`,...(p=(e=i.parameters)==null?void 0:e.docs)==null?void 0:p.source}}};const tt=["Default"];export{i as Default,tt as __namedExportsOrder,$ as default};
