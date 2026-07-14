import{j as r}from"./jsx-runtime-D_zvdyIk.js";import{r as u}from"./index-D4lIrffr.js";import{P as m}from"./Modal-_UCf_ZAr.js";import{B as P}from"./Button-CpAfKxsB.js";/* empty css              */import"./Accordion-CM44lgGc.js";import"./Backdrop-B_dFhGSg.js";import"./Badge-DyX1sYip.js";import"./IconBadge-DujYxKaw.js";import"./Icon-CiIQ3jeZ.js";import"./DropdownButton-irs1yMoW.js";import"./DropdownNavButton-BJB-Par7.js";import"./ShareButton-DzvMaSVQ.js";import"./CopyButton-DNnjtXaP.js";import"./CsvButton-BWilwGSi.js";import"./SortButton-lVWI5bmR.js";import"./NavigateButton-3qsa3fQF.js";import"./Checkbox-B1IiCnS1.js";/* empty css              */import"./Label-WHfwOnzY.js";import"./CsvInput-kHhThWwS.js";/* empty css                   */import"./Spinner-Bp0FQ2cK.js";import"./ImageInput-DryIZTPu.js";import"./Input-BAzpnS8a.js";import"./PasswordInput-BU_uhHft.js";import"./Radio-Z5_Dey7K.js";import"./Select-CJYPA5Av.js";import"./Textarea-BFEtmDz2.js";import"./TextInputDropdown-D3HWwSiP.js";import"./Li-DwS-nIfI.js";import"./Paper-7Qt7Ew3B.js";import"./Progress-CdK5Z50d.js";import"./Hr-DywUS52c.js";import"./ItemSlider-Cti92gJL.js";import"./RangeSlider-Bl7iMCYB.js";/* empty css               */import"./Slider-CI6O3bQt.js";import"./Featured-D1GSdbLo.js";import"./Star-2LGqRjU-.js";import"./Tabs-CD4dBFt4.js";import"./Table-C8_IFVNM.js";import"./Card-sHLkWQUK.js";import"./FlippableCard-DWER4QIe.js";import"./ScrollFab-DScvexb_.js";import"./RenderedNoteContent-DC26_sZC.js";const nt={component:m,title:"Data Display/Pill"},i=()=>{const[l,s]=u.useState(["Pill 1"]),c=()=>{const t=[...l];t.push("Pill "+(t.length+1)),s(t)},a=t=>{const o=[...l],d=o.indexOf(t);o.splice(d,1),s(o)};return r.jsxs("div",{className:"muncher-pill-story",children:[r.jsx(P,{variant:"tertiary",onClick:c,children:"Add pills"}),r.jsx("br",{}),r.jsx("br",{}),l.map(t=>r.jsx(m,{pillCloseHandler:()=>a(t),children:t},t))]})};i.__docgenInfo={description:"",methods:[],displayName:"Default"};var p,n,e;i.parameters={...i.parameters,docs:{...(p=i.parameters)==null?void 0:p.docs,source:{originalSource:`() => {
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
}`,...(e=(n=i.parameters)==null?void 0:n.docs)==null?void 0:e.source}}};const et=["Default"];export{i as Default,et as __namedExportsOrder,nt as default};
