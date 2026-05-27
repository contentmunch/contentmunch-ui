import{j as r}from"./jsx-runtime-D_zvdyIk.js";import{r as u}from"./index-D4lIrffr.js";import{P as m}from"./Modal-Blxr-pUI.js";import{B as P}from"./Button-C9pFy32U.js";/* empty css              */import"./Accordion-CM44lgGc.js";import"./Backdrop-B_dFhGSg.js";import"./Badge-DyX1sYip.js";import"./IconBadge-C7DPK5AP.js";import"./Icon-B5gmrxWx.js";import"./DropdownButton-CmU7SL_W.js";import"./DropdownNavButton-emYMPrug.js";import"./ShareButton-B94nNf3C.js";import"./CopyButton-DfJBwlp2.js";import"./CsvButton-BKDEeRKE.js";import"./SortButton-BWanC7u1.js";import"./NavigateButton--AqCwhXZ.js";import"./Checkbox-3yzDZ_xH.js";/* empty css              */import"./Label-WHfwOnzY.js";import"./CsvInput-3QkM_kWZ.js";/* empty css                   */import"./Spinner-Bp0FQ2cK.js";import"./ImageInput-CImqC9J-.js";import"./Input-fALgErRF.js";import"./PasswordInput-BmsmHE76.js";import"./Radio-CzMvCZtD.js";import"./Select-CjJ5W3-J.js";import"./Textarea-C755UQ6c.js";import"./TextInputDropdown-Dr9tafDY.js";import"./Li-7QrkK_92.js";import"./Paper-7Qt7Ew3B.js";import"./Progress-CdK5Z50d.js";import"./Hr-DywUS52c.js";import"./ItemSlider-CowES14l.js";import"./RangeSlider-Bl7iMCYB.js";/* empty css               */import"./Slider-CI6O3bQt.js";import"./Featured-D1GSdbLo.js";import"./Star-2LGqRjU-.js";import"./Tabs-De-YnFzz.js";import"./Table-D37WOioq.js";import"./Card-sHLkWQUK.js";import"./FlippableCard-DWER4QIe.js";import"./ScrollFab-CHTW2hkm.js";const pt={component:m,title:"Data Display/Pill"},i=()=>{const[l,s]=u.useState(["Pill 1"]),c=()=>{const t=[...l];t.push("Pill "+(t.length+1)),s(t)},a=t=>{const o=[...l],d=o.indexOf(t);o.splice(d,1),s(o)};return r.jsxs("div",{className:"muncher-pill-story",children:[r.jsx(P,{variant:"tertiary",onClick:c,children:"Add pills"}),r.jsx("br",{}),r.jsx("br",{}),l.map(t=>r.jsx(m,{pillCloseHandler:()=>a(t),children:t},t))]})};i.__docgenInfo={description:"",methods:[],displayName:"Default"};var p,n,e;i.parameters={...i.parameters,docs:{...(p=i.parameters)==null?void 0:p.docs,source:{originalSource:`() => {
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
