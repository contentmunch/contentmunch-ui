import{j as r}from"./jsx-runtime-D_zvdyIk.js";import{r as u}from"./index-D4lIrffr.js";import{P as m}from"./Modal-mb9qVz0K.js";import{B as P}from"./Button-BkaHsfYs.js";/* empty css              */import"./Accordion-BM04ENdR.js";import"./Backdrop-D2_qdi5T.js";import"./Badge-DyX1sYip.js";import"./IconBadge-DTaOskek.js";import"./Icon-jOqH0-QP.js";import"./DropdownButton-C7SCo1-M.js";import"./DropdownNavButton-DBNpuUc1.js";import"./ShareButton-C76Sz5TR.js";import"./CopyButton-BqbC6GBZ.js";import"./CsvButton-CjR-LMJ7.js";import"./SortButton-BoWTfGGG.js";import"./NavigateButton-37BKuc2P.js";import"./Checkbox-5z5XHYHK.js";/* empty css              */import"./Label-WHfwOnzY.js";import"./CsvInput-DxaEnt4I.js";/* empty css                   */import"./Spinner-Bp0FQ2cK.js";import"./ImageInput-DDLFht1q.js";import"./Input-B6rsKqga.js";import"./Radio-CwoovTdW.js";import"./Select-rdoP1vA5.js";import"./Textarea-DdbyrZTi.js";import"./TextInputDropdown-Dnv-192A.js";import"./Li-BKLUzAiZ.js";import"./Paper-7Qt7Ew3B.js";import"./Progress-CdK5Z50d.js";import"./Hr-DywUS52c.js";import"./ItemSlider-BfwChkzT.js";import"./RangeSlider-Bl7iMCYB.js";/* empty css               */import"./Slider-CI6O3bQt.js";import"./Featured-D1GSdbLo.js";import"./Star-2LGqRjU-.js";import"./Tabs-u1GNT-dE.js";import"./Table-C1aywLGj.js";const it={component:m,title:"Data Display/Pill"},i=()=>{const[l,s]=u.useState(["Pill 1"]),c=()=>{const t=[...l];t.push("Pill "+(t.length+1)),s(t)},a=t=>{const o=[...l],d=o.indexOf(t);o.splice(d,1),s(o)};return r.jsxs("div",{className:"muncher-pill-story",children:[r.jsx(P,{variant:"tertiary",onClick:c,children:"Add pills"}),r.jsx("br",{}),r.jsx("br",{}),l.map(t=>r.jsx(m,{pillCloseHandler:()=>a(t),children:t},t))]})};i.__docgenInfo={description:"",methods:[],displayName:"Default"};var n,e,p;i.parameters={...i.parameters,docs:{...(n=i.parameters)==null?void 0:n.docs,source:{originalSource:`() => {
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
}`,...(p=(e=i.parameters)==null?void 0:e.docs)==null?void 0:p.source}}};const lt=["Default"];export{i as Default,lt as __namedExportsOrder,it as default};
