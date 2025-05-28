import{j as r}from"./jsx-runtime-D_zvdyIk.js";import{r as u}from"./index-D4lIrffr.js";import{P as m}from"./Modal-daK-ByqW.js";import{B as P}from"./Button-D0_I9hGM.js";/* empty css              */import"./Accordion-BAL25zEv.js";import"./Backdrop-D2_qdi5T.js";import"./Badge-C4f3BP5R.js";import"./IconBadge-DbgwSAYf.js";import"./Icon-Bj0efVpV.js";import"./DropdownButton-cwUtJBMT.js";import"./DropdownNavButton-B-U7hGyZ.js";import"./ShareButton-CBr-oeFd.js";import"./CopyButton-DMKqbDY8.js";import"./CsvButton-DAfnVPW-.js";import"./SortButton-BsojetdZ.js";import"./NavigateButton-TE2GEId6.js";import"./Checkbox-IzRmPKi_.js";/* empty css              */import"./Label-WHfwOnzY.js";import"./CsvInput-B8hZigt2.js";/* empty css                   */import"./Spinner-C5UyzrgJ.js";import"./ImageInput-i5bs7LB5.js";import"./Input-CrnQviid.js";import"./Radio-BhT_AO0L.js";import"./Select-PGJddS0o.js";import"./Textarea-BnQ0y7Hb.js";import"./TextInputDropdown-G2zKcrVM.js";import"./Li-Baj5Z8kA.js";import"./Paper-7Qt7Ew3B.js";import"./Progress-CdK5Z50d.js";import"./Hr-DywUS52c.js";import"./ItemSlider-CY4lkIzh.js";import"./RangeSlider-Bl7iMCYB.js";/* empty css               */import"./Slider-CI6O3bQt.js";import"./Featured-D1GSdbLo.js";import"./Star-2LGqRjU-.js";import"./Tabs-BJUVEgeP.js";import"./Table-CXZY2o-y.js";const it={component:m,title:"Data Display/Pill"},i=()=>{const[l,s]=u.useState(["Pill 1"]),c=()=>{const t=[...l];t.push("Pill "+(t.length+1)),s(t)},a=t=>{const o=[...l],d=o.indexOf(t);o.splice(d,1),s(o)};return r.jsxs("div",{className:"muncher-pill-story",children:[r.jsx(P,{variant:"tertiary",onClick:c,children:"Add pills"}),r.jsx("br",{}),r.jsx("br",{}),l.map(t=>r.jsx(m,{pillCloseHandler:()=>a(t),children:t},t))]})};i.__docgenInfo={description:"",methods:[],displayName:"Default"};var n,e,p;i.parameters={...i.parameters,docs:{...(n=i.parameters)==null?void 0:n.docs,source:{originalSource:`() => {
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
