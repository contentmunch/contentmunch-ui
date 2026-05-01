import{j as r}from"./jsx-runtime-D_zvdyIk.js";import{r as u}from"./index-D4lIrffr.js";import{P as m}from"./Modal-DPSjyOZx.js";import{B as P}from"./Button-C9pFy32U.js";/* empty css              */import"./Accordion-CM44lgGc.js";import"./Backdrop-B_dFhGSg.js";import"./Badge-DyX1sYip.js";import"./IconBadge-CU9Wdp9v.js";import"./Icon-MeoOlEZu.js";import"./DropdownButton-CmU7SL_W.js";import"./DropdownNavButton-emYMPrug.js";import"./ShareButton-DFN8u6Mg.js";import"./CopyButton-DAAe2ncC.js";import"./CsvButton-eS4wG_96.js";import"./SortButton-CKd0mk4a.js";import"./NavigateButton-BVjV2mEA.js";import"./Checkbox-3yzDZ_xH.js";/* empty css              */import"./Label-WHfwOnzY.js";import"./CsvInput-DqrEjMQW.js";/* empty css                   */import"./Spinner-Bp0FQ2cK.js";import"./ImageInput-DvcALeTn.js";import"./Input-D885GhmD.js";import"./PasswordInput-BvGIc5V_.js";import"./Radio-CzMvCZtD.js";import"./Select-BnlZ9dDK.js";import"./Textarea-C755UQ6c.js";import"./TextInputDropdown-CA9TIJuK.js";import"./Li-Bv5Nm2gt.js";import"./Paper-7Qt7Ew3B.js";import"./Progress-CdK5Z50d.js";import"./Hr-DywUS52c.js";import"./ItemSlider-CzlMoEL-.js";import"./RangeSlider-Bl7iMCYB.js";/* empty css               */import"./Slider-CI6O3bQt.js";import"./Featured-D1GSdbLo.js";import"./Star-2LGqRjU-.js";import"./Tabs-De-YnFzz.js";import"./Table-SDCTU_wQ.js";import"./Card-sHLkWQUK.js";import"./FlippableCard-DWER4QIe.js";import"./ScrollFab-GbrxF394.js";const pt={component:m,title:"Data Display/Pill"},i=()=>{const[l,s]=u.useState(["Pill 1"]),c=()=>{const t=[...l];t.push("Pill "+(t.length+1)),s(t)},a=t=>{const o=[...l],d=o.indexOf(t);o.splice(d,1),s(o)};return r.jsxs("div",{className:"muncher-pill-story",children:[r.jsx(P,{variant:"tertiary",onClick:c,children:"Add pills"}),r.jsx("br",{}),r.jsx("br",{}),l.map(t=>r.jsx(m,{pillCloseHandler:()=>a(t),children:t},t))]})};i.__docgenInfo={description:"",methods:[],displayName:"Default"};var p,n,e;i.parameters={...i.parameters,docs:{...(p=i.parameters)==null?void 0:p.docs,source:{originalSource:`() => {
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
}`,...(e=(n=i.parameters)==null?void 0:n.docs)==null?void 0:e.source}}};const nt=["Default"];export{i as Default,nt as __namedExportsOrder,pt as default};
