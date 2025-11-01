import{j as r}from"./jsx-runtime-D_zvdyIk.js";import{r as u}from"./index-D4lIrffr.js";import{P as m}from"./Modal-B-b7lQqb.js";import{B as P}from"./Button-BkaHsfYs.js";/* empty css              */import"./Accordion-BM04ENdR.js";import"./Backdrop-D2_qdi5T.js";import"./Badge-C4f3BP5R.js";import"./IconBadge-DbgwSAYf.js";import"./Icon-Bj0efVpV.js";import"./DropdownButton-C7SCo1-M.js";import"./DropdownNavButton-DBNpuUc1.js";import"./ShareButton-DQHbe9ZX.js";import"./CopyButton-CglhABFg.js";import"./CsvButton-BxnVT3qS.js";import"./SortButton-DZ_VRFkt.js";import"./NavigateButton-D9M7PrA7.js";import"./Checkbox-5z5XHYHK.js";/* empty css              */import"./Label-WHfwOnzY.js";import"./CsvInput-DO_SapQN.js";/* empty css                   */import"./Spinner-Bp0FQ2cK.js";import"./ImageInput-i5bs7LB5.js";import"./Input-CoNMfJH2.js";import"./Radio-CwoovTdW.js";import"./Select-DOUcZvk3.js";import"./Textarea-DdbyrZTi.js";import"./TextInputDropdown-BodNs6_R.js";import"./Li-Baj5Z8kA.js";import"./Paper-7Qt7Ew3B.js";import"./Progress-CdK5Z50d.js";import"./Hr-DywUS52c.js";import"./ItemSlider-GOT6HZYo.js";import"./RangeSlider-Bl7iMCYB.js";/* empty css               */import"./Slider-CI6O3bQt.js";import"./Featured-D1GSdbLo.js";import"./Star-2LGqRjU-.js";import"./Tabs-u1GNT-dE.js";import"./Table-DvKBYHrs.js";const it={component:m,title:"Data Display/Pill"},i=()=>{const[l,s]=u.useState(["Pill 1"]),c=()=>{const t=[...l];t.push("Pill "+(t.length+1)),s(t)},a=t=>{const o=[...l],d=o.indexOf(t);o.splice(d,1),s(o)};return r.jsxs("div",{className:"muncher-pill-story",children:[r.jsx(P,{variant:"tertiary",onClick:c,children:"Add pills"}),r.jsx("br",{}),r.jsx("br",{}),l.map(t=>r.jsx(m,{pillCloseHandler:()=>a(t),children:t},t))]})};i.__docgenInfo={description:"",methods:[],displayName:"Default"};var n,e,p;i.parameters={...i.parameters,docs:{...(n=i.parameters)==null?void 0:n.docs,source:{originalSource:`() => {
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
