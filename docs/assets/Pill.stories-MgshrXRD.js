import{j as r}from"./jsx-runtime-D_zvdyIk.js";import{r as u}from"./index-D4lIrffr.js";import{P as m}from"./Modal-Uo-rA2cu.js";import{B as P}from"./Button-BkaHsfYs.js";/* empty css              */import"./Accordion-BM04ENdR.js";import"./Backdrop-D2_qdi5T.js";import"./Badge-DyX1sYip.js";import"./IconBadge-DCEZrfT1.js";import"./Icon-D0iCBpgk.js";import"./DropdownButton-C7SCo1-M.js";import"./DropdownNavButton-DBNpuUc1.js";import"./ShareButton-DkBc46ci.js";import"./CopyButton-l1-x4D94.js";import"./CsvButton-C2UtSkfU.js";import"./SortButton-D7TMYxSg.js";import"./NavigateButton-DPWiEAhv.js";import"./Checkbox-5z5XHYHK.js";/* empty css              */import"./Label-WHfwOnzY.js";import"./CsvInput-3DtXy0s4.js";/* empty css                   */import"./Spinner-Bp0FQ2cK.js";import"./ImageInput-BiyCkPl1.js";import"./Input-Curz6p3m.js";import"./Radio-CwoovTdW.js";import"./Select-Coi8sNTT.js";import"./Textarea-DdbyrZTi.js";import"./TextInputDropdown-1KhHVwVR.js";import"./Li-Du6EX-4G.js";import"./Paper-7Qt7Ew3B.js";import"./Progress-CdK5Z50d.js";import"./Hr-DywUS52c.js";import"./ItemSlider-ESzP4Lrb.js";import"./RangeSlider-Bl7iMCYB.js";/* empty css               */import"./Slider-CI6O3bQt.js";import"./Featured-D1GSdbLo.js";import"./Star-2LGqRjU-.js";import"./Tabs-u1GNT-dE.js";import"./Table-DorHJup6.js";import"./Card-sHLkWQUK.js";import"./FlippableCard-DWER4QIe.js";import"./ScrollFab-DbnqjEC9.js";const st={component:m,title:"Data Display/Pill"},i=()=>{const[l,s]=u.useState(["Pill 1"]),c=()=>{const t=[...l];t.push("Pill "+(t.length+1)),s(t)},a=t=>{const o=[...l],d=o.indexOf(t);o.splice(d,1),s(o)};return r.jsxs("div",{className:"muncher-pill-story",children:[r.jsx(P,{variant:"tertiary",onClick:c,children:"Add pills"}),r.jsx("br",{}),r.jsx("br",{}),l.map(t=>r.jsx(m,{pillCloseHandler:()=>a(t),children:t},t))]})};i.__docgenInfo={description:"",methods:[],displayName:"Default"};var n,p,e;i.parameters={...i.parameters,docs:{...(n=i.parameters)==null?void 0:n.docs,source:{originalSource:`() => {
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
}`,...(e=(p=i.parameters)==null?void 0:p.docs)==null?void 0:e.source}}};const nt=["Default"];export{i as Default,nt as __namedExportsOrder,st as default};
