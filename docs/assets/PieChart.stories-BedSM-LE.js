import{j as n}from"./jsx-runtime-D_zvdyIk.js";import{r as i}from"./index-D4lIrffr.js";import{P as D}from"./PieChart-Byisgf4b.js";import"./transform-DzJepInR.js";const v={title:"Visualization/PieChart",component:D,parameters:{layout:"fullscreen"}},a=()=>{const[l,s]=i.useState(0),[r,c]=i.useState([{title:"First",value:60,isSelected:!0,legend:"First (23: 60%)"},{title:"Second",value:1,isSelected:!1},{title:"Third",value:5,isSelected:!1}]),S=()=>{const e=[...r];e[1].value=e[1].value===1?10:1,c(e)},p=e=>{const t=[...r];t[e].isSelected?(t[e].isSelected=!1,s(-1)):(t.forEach(m=>{m.isSelected=!1}),s(e),t[e].isSelected=!0),c(t)};return n.jsxs(n.Fragment,{children:[n.jsx(D,{data:r,onClick:p,valueFormatter:e=>e+"%",withLegend:!0}),n.jsx("button",{onClick:S,children:"Change Data"}),l!==-1?n.jsxs("p",{children:["Selected: ",r[l].title]}):""]})};a.__docgenInfo={description:"",methods:[],displayName:"Default"};var d,u,o;a.parameters={...a.parameters,docs:{...(d=a.parameters)==null?void 0:d.docs,source:{originalSource:`() => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [pieData, setPieData] = useState<PieChartData[]>([{
    title: "First",
    value: 60,
    isSelected: true,
    legend: "First (23: 60%)"
  }, {
    title: "Second",
    value: 1,
    isSelected: false
  }, {
    title: "Third",
    value: 5,
    isSelected: false
  }]);
  const handleButtonClicked = () => {
    const currentData = [...pieData];
    currentData[1].value = currentData[1].value === 1 ? 10 : 1;
    setPieData(currentData);
  };
  const handleOnClick = (index: number) => {
    const currentData = [...pieData];
    if (currentData[index].isSelected) {
      currentData[index].isSelected = false;
      setSelectedIndex(-1);
    } else {
      currentData.forEach(value => {
        value.isSelected = false;
      });
      setSelectedIndex(index);
      currentData[index].isSelected = true;
    }
    setPieData(currentData);
  };
  return <>
            <PieChart data={pieData} onClick={handleOnClick} valueFormatter={num => {
      return num + "%";
    }} withLegend={true} />
            <button onClick={handleButtonClicked}>Change Data</button>
            {selectedIndex !== -1 ? <p>Selected: {pieData[selectedIndex].title}</p> : ""}
        </>;
}`,...(o=(u=a.parameters)==null?void 0:u.docs)==null?void 0:o.source}}};const k=["Default"];export{a as Default,k as __namedExportsOrder,v as default};
