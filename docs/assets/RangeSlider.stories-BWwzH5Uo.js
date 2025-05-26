import{j as a}from"./jsx-runtime-D_zvdyIk.js";import{r}from"./index-D4lIrffr.js";/* empty css                            */import{R as m}from"./RangeSlider-uoU-No3-.js";/* empty css               */const S={component:m,title:"Slider/Range Slider"},e=o=>{const[u,l]=r.useState(20),[i,c]=r.useState(600);return a.jsx("div",{className:"slider-story",children:a.jsx(m,{...o,min:1,max:1e3,minValue:u,maxValue:i,setMinValue:l,setMaxValue:c,numberFormatter:d=>new Intl.NumberFormat("en-UK",{style:"currency",currency:"GBP"}).format(d)})})};e.__docgenInfo={description:"",methods:[],displayName:"Default"};var t,s,n;e.parameters={...e.parameters,docs:{...(t=e.parameters)==null?void 0:t.docs,source:{originalSource:`args => {
  const [minValue, setMinValue] = useState(20);
  const [maxValue, setMaxValue] = useState(600);
  return <div className="slider-story">
            <RangeSlider {...args} min={1} max={1000} minValue={minValue} maxValue={maxValue} setMinValue={setMinValue} setMaxValue={setMaxValue} numberFormatter={num => new Intl.NumberFormat('en-UK', {
      style: 'currency',
      currency: 'GBP'
    }).format(num)} />
        </div>;
}`,...(n=(s=e.parameters)==null?void 0:s.docs)==null?void 0:n.source}}};const M=["Default"];export{e as Default,M as __namedExportsOrder,S as default};
