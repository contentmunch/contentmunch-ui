import{j as r}from"./jsx-runtime-D_zvdyIk.js";import{r as u}from"./index-D4lIrffr.js";import{P as m}from"./Modal-BK2YQsvl.js";import{B as P}from"./Button-CpAfKxsB.js";/* empty css              */import"./Accordion-CM44lgGc.js";import"./Backdrop-B_dFhGSg.js";import"./Badge-DyX1sYip.js";import"./IconBadge-CG_KZ77b.js";import"./Icon-DWgwKqug.js";import"./DropdownButton-irs1yMoW.js";import"./DropdownNavButton-BJB-Par7.js";import"./ShareButton-D4uVI09L.js";import"./CopyButton-NCIA0cYb.js";import"./CsvButton-CcqnLXak.js";import"./SortButton-CwNwS8YJ.js";import"./NavigateButton-CHfsgaD2.js";import"./Checkbox-B1IiCnS1.js";/* empty css              */import"./Label-WHfwOnzY.js";import"./CsvInput-BUCDBCxB.js";/* empty css                   */import"./Spinner-Bp0FQ2cK.js";import"./ImageInput-Q2UbUr4V.js";import"./Input-CU0Ukopi.js";import"./PasswordInput-DLEEGNXC.js";import"./Radio-Z5_Dey7K.js";import"./Select-VwfkfcsP.js";import"./Textarea-BFEtmDz2.js";import"./TextInputDropdown-Dxsf3l-H.js";import"./Li-BgKAorpe.js";import"./Paper-7Qt7Ew3B.js";import"./Progress-CdK5Z50d.js";import"./Hr-DywUS52c.js";import"./ItemSlider-B1in37N9.js";import"./RangeSlider-Bl7iMCYB.js";/* empty css               */import"./Slider-CI6O3bQt.js";import"./Featured-D1GSdbLo.js";import"./Star-2LGqRjU-.js";import"./Tabs-CD4dBFt4.js";import"./Table-ClAac2-u.js";import"./Card-sHLkWQUK.js";import"./FlippableCard-DWER4QIe.js";import"./ScrollFab-CfuR9W6e.js";import"./RenderedNoteContent-DC26_sZC.js";const nt={component:m,title:"Data Display/Pill"},i=()=>{const[l,s]=u.useState(["Pill 1"]),c=()=>{const t=[...l];t.push("Pill "+(t.length+1)),s(t)},a=t=>{const o=[...l],d=o.indexOf(t);o.splice(d,1),s(o)};return r.jsxs("div",{className:"muncher-pill-story",children:[r.jsx(P,{variant:"tertiary",onClick:c,children:"Add pills"}),r.jsx("br",{}),r.jsx("br",{}),l.map(t=>r.jsx(m,{pillCloseHandler:()=>a(t),children:t},t))]})};i.__docgenInfo={description:"",methods:[],displayName:"Default"};var p,n,e;i.parameters={...i.parameters,docs:{...(p=i.parameters)==null?void 0:p.docs,source:{originalSource:`() => {
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
