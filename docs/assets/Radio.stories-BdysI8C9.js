import{j as n}from"./jsx-runtime-D_zvdyIk.js";import{R as t}from"./Radio-CwoovTdW.js";import{r as m}from"./index-D4lIrffr.js";/* empty css              */import"./Label-WHfwOnzY.js";const k={title:"Input/Radio",component:t,decorators:[e=>n.jsx("div",{style:{width:"95vw"},children:n.jsx(e,{})})]},s=()=>{const[e,a]=m.useState(""),r=o=>{a(e===o?"":o)};return n.jsxs("div",{children:[n.jsx(t,{name:"question-option",checked:e==="Image Processing",onChange:()=>r("Image Processing"),label:"Image Processing"}),n.jsx(t,{name:"question-option",checked:e==="File Storage",onChange:()=>r("File Storage"),label:"File Storage"}),n.jsx(t,{name:"question-option",checked:e==="Distributed Image Streaming",onChange:()=>r("Distributed Image Streaming"),label:"Distributed Image Streaming"})]})};s.__docgenInfo={description:"",methods:[],displayName:"Default"};var i,c,d;s.parameters={...s.parameters,docs:{...(i=s.parameters)==null?void 0:i.docs,source:{originalSource:`() => {
  const [checkedAnswer, setCheckedAnswer] = useState<string>("");
  const handleAnswerChecked = (answer: string) => {
    if (checkedAnswer === answer) {
      setCheckedAnswer("");
    } else {
      setCheckedAnswer(answer);
    }
  };
  return <div>
            <Radio name="question-option" checked={checkedAnswer === "Image Processing"} onChange={() => handleAnswerChecked("Image Processing")} label="Image Processing" />
            <Radio name="question-option" checked={checkedAnswer === "File Storage"} onChange={() => handleAnswerChecked("File Storage")} label="File Storage" />
            <Radio name="question-option" checked={checkedAnswer === "Distributed Image Streaming"} onChange={() => handleAnswerChecked("Distributed Image Streaming")} label="Distributed Image Streaming" />

        </div>;
}`,...(d=(c=s.parameters)==null?void 0:c.docs)==null?void 0:d.source}}};const w=["Default"];export{s as Default,w as __namedExportsOrder,k as default};
