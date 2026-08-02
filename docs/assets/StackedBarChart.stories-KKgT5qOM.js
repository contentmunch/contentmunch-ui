import{j as n}from"./jsx-runtime-D_zvdyIk.js";import{r as e}from"./index-D4lIrffr.js";import{S as u}from"./StackedBarChart-Cs0UuPfJ.js";import"./transform-DzJepInR.js";const D={title:"Visualization/BarChart",component:u,parameters:{layout:"fullscreen"}},t=()=>{const a=[[{Title:"Scholars Rooftop",Renewal:8,New:5,Extension:0,Vacant:0,Total:13},{Title:"Scholars Rock",Renewal:50,New:44,Extension:0,Vacant:0,Total:94},{Title:"Huntington Gardens",Renewal:25,New:4,Extension:0,Vacant:4,Total:33},{Title:"Covenanter Hill",Renewal:114,New:79,Extension:0,Vacant:3,Total:196},{Title:"MeadowCreek",Renewal:165,New:56,Extension:2,Vacant:6,Total:229},{Title:"Scholars Quad",Renewal:40,New:29,Extension:0,Vacant:3,Total:72},{Title:"Cov Affordable",Renewal:7,New:2,Extension:0,Vacant:2,Total:11},{Title:"Porto Flats",Renewal:25,New:15,Extension:0,Vacant:6,Total:46},{Title:"Cape Dutch Villas",Renewal:20,New:3,Extension:0,Vacant:1,Total:24},{Title:"Verona Park",Renewal:5,New:2,Extension:0,Vacant:1,Total:8},{Title:"HighGrove",Renewal:36,New:15,Extension:0,Vacant:7,Total:58},{Title:"SummerHouse",Renewal:67,New:58,Extension:0,Vacant:5,Total:130}],[{Title:"Cape Dutch Villas",Renewal:16,New:7,Extension:1,Vacant:2,Total:26},{Title:"Covenanter Hill",Renewal:99,New:96,Extension:1,Vacant:1,Total:197},{Title:"HighGrove",Renewal:23,New:22,Extension:1,Vacant:2,Total:48},{Title:"MeadowCreek",Renewal:154,New:74,Extension:1,Vacant:4,Total:233},{Title:"Scholars Quad",Renewal:36,New:36,Extension:0,Vacant:2,Total:74},{Title:"Scholars Rooftop",Renewal:5,New:8,Extension:0,Vacant:0,Total:13}],[{Title:"Cape Dutch Villas",Renewal:43,New:22,Extension:0,Vacant:35,Total:126},{Title:"Covenanter Hill",Renewal:56,New:33,Extension:1,Vacant:10,Total:100},{Title:"HighGrove",Renewal:60,New:30,Extension:8,Vacant:2,Total:100},{Title:"MeadowCreek",Renewal:70,New:17,Extension:6,Vacant:7,Total:100},{Title:"Scholars Quad",Renewal:80,New:12,Extension:2,Vacant:6,Total:100},{Title:"Scholars Rooftop",Renewal:52.5,New:30,Extension:7,Vacant:10.5,Total:100},{Title:"Porto Flats",Renewal:62.5,New:20,Extension:7,Vacant:10.5,Total:100},{Title:"Verona Park",Renewal:32.5,New:50,Extension:7,Vacant:10.5,Total:100}],[{Title:"Cape Dutch Villas",Renewal:43,New:22,Extension:0,Vacant:35,Total:126}],[{Title:"Cape Dutch Villas",Renewal:43,New:22,Extension:0,Vacant:35,Total:126},{Title:"Covenanter Hill",Renewal:56,New:33,Extension:1,Vacant:10,Total:100}]],[V,x]=e.useState(0),[l,d]=e.useState(!0),[o,h]=e.useState(!0),[s,R]=e.useState(!1),[i,E]=e.useState({titleField:"Title",totalField:"Total",stackFields:["Renewal","New","Extension","Vacant"],values:a[0]}),N=()=>{const c=(V+1)%a.length;E({...i,values:a[c]}),x(c)},g=()=>{d(!l)},p=()=>{R(!s)};return n.jsxs(n.Fragment,{children:[n.jsx(u,{data:i,toPercentage:l,withLegend:o,showOnlyValues:s}),n.jsx("button",{onClick:g,children:l?"To Data":"To Percent"}),"    ",n.jsx("button",{onClick:p,children:s?"Show Percentage":"Show only values"}),"    ",n.jsx("button",{onClick:N,children:"Change Data"}),"    ",n.jsx("button",{onClick:()=>{h(!o)},children:o?"Without Legend":"With Legend"})]})};t.__docgenInfo={description:"",methods:[],displayName:"Default"};var w,r,T;t.parameters={...t.parameters,docs:{...(w=t.parameters)==null?void 0:w.docs,source:{originalSource:`() => {
  const initValue: FieldValue[][] = [[{
    "Title": "Scholars Rooftop",
    "Renewal": 8,
    "New": 5,
    "Extension": 0,
    "Vacant": 0,
    "Total": 13
  }, {
    "Title": "Scholars Rock",
    "Renewal": 50,
    "New": 44,
    "Extension": 0,
    "Vacant": 0,
    "Total": 94
  }, {
    "Title": "Huntington Gardens",
    "Renewal": 25,
    "New": 4,
    "Extension": 0,
    "Vacant": 4,
    "Total": 33
  }, {
    "Title": "Covenanter Hill",
    "Renewal": 114,
    "New": 79,
    "Extension": 0,
    "Vacant": 3,
    "Total": 196
  }, {
    "Title": "MeadowCreek",
    "Renewal": 165,
    "New": 56,
    "Extension": 2,
    "Vacant": 6,
    "Total": 229
  }, {
    "Title": "Scholars Quad",
    "Renewal": 40,
    "New": 29,
    "Extension": 0,
    "Vacant": 3,
    "Total": 72
  }, {
    "Title": "Cov Affordable",
    "Renewal": 7,
    "New": 2,
    "Extension": 0,
    "Vacant": 2,
    "Total": 11
  }, {
    "Title": "Porto Flats",
    "Renewal": 25,
    "New": 15,
    "Extension": 0,
    "Vacant": 6,
    "Total": 46
  }, {
    "Title": "Cape Dutch Villas",
    "Renewal": 20,
    "New": 3,
    "Extension": 0,
    "Vacant": 1,
    "Total": 24
  }, {
    "Title": "Verona Park",
    "Renewal": 5,
    "New": 2,
    "Extension": 0,
    "Vacant": 1,
    "Total": 8
  }, {
    "Title": "HighGrove",
    "Renewal": 36,
    "New": 15,
    "Extension": 0,
    "Vacant": 7,
    "Total": 58
  }, {
    "Title": "SummerHouse",
    "Renewal": 67,
    "New": 58,
    "Extension": 0,
    "Vacant": 5,
    "Total": 130
  }], [{
    "Title": "Cape Dutch Villas",
    "Renewal": 16,
    "New": 7,
    "Extension": 1,
    "Vacant": 2,
    "Total": 26
  }, {
    "Title": "Covenanter Hill",
    "Renewal": 99,
    "New": 96,
    "Extension": 1,
    "Vacant": 1,
    "Total": 197
  }, {
    "Title": "HighGrove",
    "Renewal": 23,
    "New": 22,
    "Extension": 1,
    "Vacant": 2,
    "Total": 48
  }, {
    "Title": "MeadowCreek",
    "Renewal": 154,
    "New": 74,
    "Extension": 1,
    "Vacant": 4,
    "Total": 233
  }, {
    "Title": "Scholars Quad",
    "Renewal": 36,
    "New": 36,
    "Extension": 0,
    "Vacant": 2,
    "Total": 74
  }, {
    "Title": "Scholars Rooftop",
    "Renewal": 5,
    "New": 8,
    "Extension": 0,
    "Vacant": 0,
    "Total": 13
  }], [{
    "Title": "Cape Dutch Villas",
    "Renewal": 43,
    "New": 22,
    "Extension": 0,
    "Vacant": 35,
    "Total": 126
  }, {
    "Title": "Covenanter Hill",
    "Renewal": 56,
    "New": 33,
    "Extension": 1,
    "Vacant": 10,
    "Total": 100
  }, {
    "Title": "HighGrove",
    "Renewal": 60,
    "New": 30,
    "Extension": 8,
    "Vacant": 2,
    "Total": 100
  }, {
    "Title": "MeadowCreek",
    "Renewal": 70,
    "New": 17,
    "Extension": 6,
    "Vacant": 7,
    "Total": 100
  }, {
    "Title": "Scholars Quad",
    "Renewal": 80,
    "New": 12,
    "Extension": 2,
    "Vacant": 6,
    "Total": 100
  }, {
    "Title": "Scholars Rooftop",
    "Renewal": 52.5,
    "New": 30,
    "Extension": 7,
    "Vacant": 10.5,
    "Total": 100
  }, {
    "Title": "Porto Flats",
    "Renewal": 62.5,
    "New": 20,
    "Extension": 7,
    "Vacant": 10.5,
    "Total": 100
  }, {
    "Title": "Verona Park",
    "Renewal": 32.5,
    "New": 50,
    "Extension": 7,
    "Vacant": 10.5,
    "Total": 100
  }], [{
    "Title": "Cape Dutch Villas",
    "Renewal": 43,
    "New": 22,
    "Extension": 0,
    "Vacant": 35,
    "Total": 126
  }], [{
    "Title": "Cape Dutch Villas",
    "Renewal": 43,
    "New": 22,
    "Extension": 0,
    "Vacant": 35,
    "Total": 126
  }, {
    "Title": "Covenanter Hill",
    "Renewal": 56,
    "New": 33,
    "Extension": 1,
    "Vacant": 10,
    "Total": 100
  }]];
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [toPercent, setToPercent] = useState(true);
  const [withLegend, setWithLegend] = useState(true);
  const [showOnlyValues, setShowOnlyValues] = useState(false);
  const [barData, setBarData] = useState<StackedBarChartData>({
    "titleField": "Title",
    "totalField": "Total",
    "stackFields": ["Renewal", "New", "Extension", "Vacant"],
    "values": initValue[0]
  });
  const handleButtonClicked = () => {
    const currentIndex = (selectedIndex + 1) % initValue.length;
    setBarData({
      ...barData,
      values: initValue[currentIndex]
    });
    setSelectedIndex(currentIndex);
  };
  const togglePercent = () => {
    setToPercent(!toPercent);
  };
  const toggleShowOnlyValues = () => {
    setShowOnlyValues(!showOnlyValues);
  };
  return <>
            <StackedBarChart data={barData} toPercentage={toPercent} withLegend={withLegend} showOnlyValues={showOnlyValues} />
            <button onClick={togglePercent}>{toPercent ? "To Data" : "To Percent"}</button>
            &nbsp;&nbsp;&nbsp;&nbsp;
            <button onClick={toggleShowOnlyValues}>{showOnlyValues ? "Show Percentage" : "Show only values"}</button>
            &nbsp;&nbsp;&nbsp;&nbsp;
            <button onClick={handleButtonClicked}>Change Data</button>
            &nbsp;&nbsp;&nbsp;&nbsp;
            <button onClick={() => {
      setWithLegend(!withLegend);
    }}>{withLegend ? "Without Legend" : "With Legend"}
            </button>
        </>;
}`,...(T=(r=t.parameters)==null?void 0:r.docs)==null?void 0:T.source}}};const P=["Default"];export{t as Default,P as __namedExportsOrder,D as default};
