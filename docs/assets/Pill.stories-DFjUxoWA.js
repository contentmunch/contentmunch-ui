import{j as r}from"./jsx-runtime-D_zvdyIk.js";import{r as u}from"./index-D4lIrffr.js";import{P as e}from"./Modal-Br5-4m9v.js";import{B as P}from"./Button-CpAfKxsB.js";/* empty css              */import"./Accordion-CM44lgGc.js";import"./Backdrop-B_dFhGSg.js";import"./Badge-DyX1sYip.js";import"./IconBadge-D9jC50y4.js";import"./Icon-1_RwmGu3.js";import"./DropdownButton-irs1yMoW.js";import"./DropdownNavButton-BJB-Par7.js";import"./ShareButton-DWJqYFpN.js";import"./CopyButton-gDr9QfLu.js";import"./CsvButton-5VEuvKyO.js";import"./SortButton-DiZOgp43.js";import"./NavigateButton-D8qkO0to.js";import"./Checkbox-BskGJgDm.js";/* empty css              */import"./Label-WHfwOnzY.js";import"./CsvInput-CsqwqRpP.js";/* empty css                   */import"./Spinner-Bp0FQ2cK.js";import"./ImageInput-CfbNIjEX.js";import"./Input-ChOmFMv_.js";import"./PasswordInput-3NFGWn6b.js";import"./Radio-C6hFXY9_.js";import"./Select-BdAqqra4.js";import"./Textarea-DeQ3dpPu.js";import"./TextInputDropdown-BbXzNnkM.js";import"./EditableText-nV5HvF4d.js";import"./Combobox-CDdqpILQ.js";import"./Li-BXwfRjCs.js";import"./Paper-7Qt7Ew3B.js";import"./Progress-CdK5Z50d.js";import"./Hr-DywUS52c.js";import"./ItemSlider-DXHSwitA.js";import"./RangeSlider-Bl7iMCYB.js";/* empty css               */import"./Slider-CI6O3bQt.js";import"./Featured-D1GSdbLo.js";import"./Star-2LGqRjU-.js";import"./Tabs-CD4dBFt4.js";import"./Table-BfQiluQk.js";import"./Card-sHLkWQUK.js";import"./FlippableCard-DWER4QIe.js";import"./ScrollFab-6zpsM4ZS.js";import"./index-DsJinFGm.js";import"./PollRenderer-CFS6BgSb.js";import"./NoteWidgetClientProvider-Mpl7UKIW.js";import"./FormRenderer-BbJyUDqw.js";import"./RecipeCard-C_IDVxmv.js";import"./PieChart-Byisgf4b.js";import"./transform-DzJepInR.js";import"./StackedBarChart-Cs0UuPfJ.js";import"./DonutChart-D3T2M0Do.js";const ht={component:e,title:"Data Display/Pill"},i=()=>{const[l,p]=u.useState(["Pill 1"]),c=()=>{const t=[...l];t.push("Pill "+(t.length+1)),p(t)},a=t=>{const o=[...l],d=o.indexOf(t);o.splice(d,1),p(o)};return r.jsxs("div",{className:"muncher-pill-story",children:[r.jsx(P,{variant:"tertiary",onClick:c,children:"Add pills"}),r.jsx("br",{}),r.jsx("br",{}),l.map(t=>r.jsx(e,{pillCloseHandler:()=>a(t),children:t},t))]})};i.__docgenInfo={description:"",methods:[],displayName:"Default"};var s,m,n;i.parameters={...i.parameters,docs:{...(s=i.parameters)==null?void 0:s.docs,source:{originalSource:`() => {
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
}`,...(n=(m=i.parameters)==null?void 0:m.docs)==null?void 0:n.source}}};const vt=["Default"];export{i as Default,vt as __namedExportsOrder,ht as default};
