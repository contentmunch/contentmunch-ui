import{j as t}from"./jsx-runtime-D_zvdyIk.js";import{r as a}from"./index-D4lIrffr.js";import{R as u}from"./RangeSlider-uoU-No3-.js";import{D as V}from"./DropdownButton-BLBggSmK.js";/* empty css               */import"./Button-D0_I9hGM.js";const M={component:u,title:"Slider/Dropdown Range Slider"},e=l=>{const[i,c]=a.useState(!1),[n,d]=a.useState(20),[r,p]=a.useState(600);return t.jsx("div",{className:"slider-stories",children:t.jsx(V,{showContent:i,setShowContent:c,element:"slider(min: "+n+" max: "+r+")",children:t.jsx(u,{...l,min:1,max:1e3,minValue:n,maxValue:r,setMinValue:d,setMaxValue:p,numberFormatter:x=>new Intl.NumberFormat("en-UK",{style:"currency",currency:"GBP"}).format(x)})})})};e.__docgenInfo={description:"",methods:[],displayName:"Default"};var s,o,m;e.parameters={...e.parameters,docs:{...(s=e.parameters)==null?void 0:s.docs,source:{originalSource:`args => {
  const [showContent, setShowContent] = useState(false);
  const [minValue, setMinValue] = useState(20);
  const [maxValue, setMaxValue] = useState(600);
  return <div className="slider-stories">
            <DropdownButton showContent={showContent} setShowContent={setShowContent} element={"slider(min: " + minValue + " max: " + maxValue + ")"}>
                <RangeSlider {...args} min={1} max={1000} minValue={minValue} maxValue={maxValue} setMinValue={setMinValue} setMaxValue={setMaxValue} numberFormatter={num => new Intl.NumberFormat('en-UK', {
        style: 'currency',
        currency: 'GBP'
      }).format(num)} />
            </DropdownButton>
        </div>;
}`,...(m=(o=e.parameters)==null?void 0:o.docs)==null?void 0:m.source}}};const g=["Default"];export{e as Default,g as __namedExportsOrder,M as default};
