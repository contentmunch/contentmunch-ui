import{j as e}from"./jsx-runtime-D_zvdyIk.js";import{r as v}from"./index-D4lIrffr.js";import{T as u}from"./Table-BrOKf22v.js";import{I as o}from"./Icon-CHNZMfZ6.js";import"./SortButton-DHajaYO9.js";import"./Button-D0_I9hGM.js";import"./CsvButton-CMo5RmuL.js";import"./Select-D0snmrlN.js";import"./Label-WHfwOnzY.js";/* empty css              */import"./CsvInput-D5GBPbN9.js";/* empty css                   */import"./Spinner-C5UyzrgJ.js";const F={title:"Data Display/Table",component:u,decorators:[n=>e.jsx("div",{style:{width:"95vw"},children:e.jsx(n,{})})]},s=()=>e.jsx(u,{excludePagination:!0,excludeDownload:!0,children:{header:[{name:"Id",title:"Id"},{name:"Name",title:"First name and Last name"},{name:"Email",title:"Email Address",visibility:"large-screen"},{name:"Phone",title:"Phone Number",visibility:"large-screen"},{name:"Eligibility",title:"Eligibility"},{name:e.jsx(o,{name:"plus"}),csvExclude:!0},{name:"Employee",title:" Employee",visibility:"hidden"}],rows:[[{value:"1",content:e.jsx("a",{href:"google.com",children:"1"})},{value:"James Dean",content:"James Dean"},{value:"jamesdean@gmail.com",content:e.jsx("a",{href:"mailto:jamesdean@gmail.com",children:"jamesdean@gmail.com"})},{value:"123456",content:e.jsx("a",{href:"test:123456",children:"123-456"})},{value:"false",csv:"no",content:"No"},{value:"1",content:e.jsx(o,{name:"plus"})},{value:"employee",csv:"yes",content:"Yes"}],[{value:"2",content:e.jsx("a",{href:"google.com",children:"2"})},{value:"Dean Smith",content:"Dean Smith"},{value:"dean@gmail.com",content:e.jsx("a",{href:"mailto:dean@gmail.com",children:"dean@gmail.com"})},{value:"111456",content:e.jsx("a",{href:"test:111456",children:"111-456"})},{value:"true",csv:"yes",content:"Yes"},{value:"1",content:e.jsx(o,{name:"plus"})},{value:"employee",csv:"yes",content:"Yes"}],[{value:"3",content:e.jsx("a",{href:"google.com",children:"3"})},{value:"James Buckner",content:"James Buckner"},{value:"james@gmail.com",content:e.jsx("a",{href:"mailto:james@gmail.com",children:"james@gmail.com"})},{value:"123777",content:e.jsx("a",{href:"test:123777",children:"123-777"})},{value:"true",csv:"yes",content:"Yes"},{value:"1",content:e.jsx(o,{name:"plus"})},{value:"employee",csv:"yes",content:"Yes"}],[{value:"4",content:e.jsx("a",{href:"google.com",children:"4"})},{value:"Robert Muller",content:"Robert Muller"},{value:"muller@gmail.com",content:e.jsx("a",{href:"mailto:muller@gmail.com",children:"muller@gmail.com"})},{value:"112576",content:e.jsx("a",{href:"test:112576",children:"112-576"})},{value:"true",csv:"yes",content:"Yes"},{value:"1",content:e.jsx(o,{name:"plus"})},{value:"employee",csv:"yes",content:"Yes"}],[{value:"5",content:e.jsx("a",{href:"google.com",children:"5"})},{value:"Herman Miller",content:"Herman Miller"},{value:"millern@gmail.com",content:e.jsx("a",{href:"mailto:millern@gmail.com",children:"millern@gmail.com"})},{value:"116754",content:e.jsx("a",{href:"test:116754",children:"116-754"})},{value:"false",csv:"yes",content:"No"},{value:"1",content:e.jsx(o,{name:"plus"})},{value:"employee",csv:"no",content:"No"}]]}}),N=()=>{const n=Math.floor(1e5+Math.random()*9e5).toString();return{value:n,content:e.jsx("a",{href:"tel:"+n,children:n})}},i=()=>{const n=["Lorem","ipsum","dolor","sit","amet","consectetur","adipiscing","elit","Ut","at","libero","eu","risus","blandit","semper","Duis","euismod","aliquam","lectus","id","rhoncus","Cras","eget","nisi","quis","mi","feugiat","viverra","Nunc","vehicula","eu","dolor","nec","laoreet","Integer","ut","felis","sit","amet","libero","feugiat","sagittis","In","hac","habitasse","platea","dictumst","Nam","viverra","lectus","pulvinar","feugiat","iaculis","In","non"],d=()=>{const t=[];return n.forEach((a,m)=>{t.push([{value:m.toString(),content:e.jsx("a",{href:"google.com",children:m.toString()})},{value:a,content:a},{value:a+"@gmail.com",content:e.jsx("a",{href:"mailto:"+a+"@gmail.com",children:a+"@gmail.com"})},N()])}),t};return e.jsx(u,{children:{header:[{name:"Id",title:"Id",sort:(t,a)=>+t-+a},{name:"Name",title:"First name and Last name"},{name:"Email",title:"Email Address",visibility:"large-screen"},{name:"Phone",title:"Phone Number",visibility:"large-screen"}],rows:d()}})},r=()=>{const n=["Lorem","ipsum","dolor","sit","amet","consectetur","adipiscing","elit","Ut","at","libero","eu","risus","blandit","semper","Duis","euismod","aliquam","lectus","id","rhoncus","Cras","eget","nisi","quis","mi","feugiat","viverra","Nunc","vehicula","eu","dolor","nec","laoreet","Integer","ut","felis","sit","amet","libero","feugiat","sagittis","In","hac","habitasse","platea","dictumst","Nam","viverra","lectus","pulvinar","feugiat","iaculis","In","non"],[d,t]=v.useState(!1),[a,m]=v.useState(""),S=()=>{const c=[];return n.forEach((l,g)=>{c.push([{value:g.toString(),content:e.jsx("a",{href:"google.com",children:g.toString()})},{value:l,content:l},{value:l+"@gmail.com",content:e.jsx("a",{href:"mailto:"+l+"@gmail.com",children:l+"@gmail.com"})},N()])}),c};return e.jsx(u,{includeUpload:!0,handleOnUpload:()=>{t(!0),setTimeout(()=>{t(!1),m("Upload Successful")},1e3)},isUploading:d,uploadSuccessMessage:a,children:{header:[{name:"Id",title:"Id",sort:(c,l)=>+c-+l},{name:"Name",title:"First name and Last name"},{name:"Email",title:"Email Address",visibility:"large-screen"},{name:"Phone",title:"Phone Number",visibility:"large-screen"}],rows:S()}})};s.__docgenInfo={description:"",methods:[],displayName:"Default"};i.__docgenInfo={description:"",methods:[],displayName:"Pageable"};r.__docgenInfo={description:"",methods:[],displayName:"WithUploadTemplate"};var h,p,f;s.parameters={...s.parameters,docs:{...(h=s.parameters)==null?void 0:h.docs,source:{originalSource:`() => <Table excludePagination={true} excludeDownload={true}>{{
    header: [{
      name: "Id",
      title: "Id"
    }, {
      name: "Name",
      title: "First name and Last name"
    }, {
      name: "Email",
      title: "Email Address",
      visibility: "large-screen"
    }, {
      name: "Phone",
      title: "Phone Number",
      visibility: "large-screen"
    }, {
      name: "Eligibility",
      title: "Eligibility"
    }, {
      name: <Icon name="plus" />,
      csvExclude: true
    }, {
      name: "Employee",
      title: " Employee",
      visibility: "hidden"
    }],
    rows: [[{
      value: "1",
      content: <a href="google.com">1</a>
    }, {
      value: "James Dean",
      content: "James Dean"
    }, {
      value: "jamesdean@gmail.com",
      content: <a href="mailto:jamesdean@gmail.com">jamesdean@gmail.com</a>
    }, {
      value: "123456",
      content: <a href="test:123456">123-456</a>
    }, {
      value: "false",
      csv: "no",
      content: "No"
    }, {
      value: "1",
      content: <Icon name="plus" />
    }, {
      value: "employee",
      csv: "yes",
      content: "Yes"
    }], [{
      value: "2",
      content: <a href="google.com">2</a>
    }, {
      value: "Dean Smith",
      content: "Dean Smith"
    }, {
      value: "dean@gmail.com",
      content: <a href="mailto:dean@gmail.com">dean@gmail.com</a>
    }, {
      value: "111456",
      content: <a href="test:111456">111-456</a>
    }, {
      value: "true",
      csv: "yes",
      content: "Yes"
    }, {
      value: "1",
      content: <Icon name="plus" />
    }, {
      value: "employee",
      csv: "yes",
      content: "Yes"
    }], [{
      value: "3",
      content: <a href="google.com">3</a>
    }, {
      value: "James Buckner",
      content: "James Buckner"
    }, {
      value: "james@gmail.com",
      content: <a href="mailto:james@gmail.com">james@gmail.com</a>
    }, {
      value: "123777",
      content: <a href="test:123777">123-777</a>
    }, {
      value: "true",
      csv: "yes",
      content: "Yes"
    }, {
      value: "1",
      content: <Icon name="plus" />
    }, {
      value: "employee",
      csv: "yes",
      content: "Yes"
    }], [{
      value: "4",
      content: <a href="google.com">4</a>
    }, {
      value: "Robert Muller",
      content: "Robert Muller"
    }, {
      value: "muller@gmail.com",
      content: <a href="mailto:muller@gmail.com">muller@gmail.com</a>
    }, {
      value: "112576",
      content: <a href="test:112576">112-576</a>
    }, {
      value: "true",
      csv: "yes",
      content: "Yes"
    }, {
      value: "1",
      content: <Icon name="plus" />
    }, {
      value: "employee",
      csv: "yes",
      content: "Yes"
    }], [{
      value: "5",
      content: <a href="google.com">5</a>
    }, {
      value: "Herman Miller",
      content: "Herman Miller"
    }, {
      value: "millern@gmail.com",
      content: <a href="mailto:millern@gmail.com">millern@gmail.com</a>
    }, {
      value: "116754",
      content: <a href="test:116754">116-754</a>
    }, {
      value: "false",
      csv: "yes",
      content: "No"
    }, {
      value: "1",
      content: <Icon name="plus" />
    }, {
      value: "employee",
      csv: "no",
      content: "No"
    }]]
  }}</Table>`,...(f=(p=s.parameters)==null?void 0:p.docs)==null?void 0:f.source}}};var b,y,x;i.parameters={...i.parameters,docs:{...(b=i.parameters)==null?void 0:b.docs,source:{originalSource:`() => {
  const names = ["Lorem", "ipsum", "dolor", "sit", "amet", "consectetur", "adipiscing", "elit", "Ut", "at", "libero", "eu", "risus", "blandit", "semper", "Duis", "euismod", "aliquam", "lectus", "id", "rhoncus", "Cras", "eget", "nisi", "quis", "mi", "feugiat", "viverra", "Nunc", "vehicula", "eu", "dolor", "nec", "laoreet", "Integer", "ut", "felis", "sit", "amet", "libero", "feugiat", "sagittis", "In", "hac", "habitasse", "platea", "dictumst", "Nam", "viverra", "lectus", "pulvinar", "feugiat", "iaculis", "In", "non"];
  const rows = (): Col[][] => {
    const data: Col[][] = [];
    names.forEach((name, index) => {
      data.push([{
        value: index.toString(),
        content: <a href="google.com">{index.toString()}</a>
      }, {
        value: name,
        content: name
      }, {
        value: name + "@gmail.com",
        content: <a href={"mailto:" + name + "@gmail.com"}>{name + "@gmail.com"}</a>
      }, generatePhone()]);
    });
    return data;
  };
  return <Table>{{
      header: [{
        name: "Id",
        title: "Id",
        sort: (a, b) => +a - +b
      }, {
        name: "Name",
        title: "First name and Last name"
      }, {
        name: "Email",
        title: "Email Address",
        visibility: "large-screen"
      }, {
        name: "Phone",
        title: "Phone Number",
        visibility: "large-screen"
      }],
      rows: rows()
    }}</Table>;
}`,...(x=(y=i.parameters)==null?void 0:y.docs)==null?void 0:x.source}}};var j,I,E;r.parameters={...r.parameters,docs:{...(j=r.parameters)==null?void 0:j.docs,source:{originalSource:`() => {
  const names = ["Lorem", "ipsum", "dolor", "sit", "amet", "consectetur", "adipiscing", "elit", "Ut", "at", "libero", "eu", "risus", "blandit", "semper", "Duis", "euismod", "aliquam", "lectus", "id", "rhoncus", "Cras", "eget", "nisi", "quis", "mi", "feugiat", "viverra", "Nunc", "vehicula", "eu", "dolor", "nec", "laoreet", "Integer", "ut", "felis", "sit", "amet", "libero", "feugiat", "sagittis", "In", "hac", "habitasse", "platea", "dictumst", "Nam", "viverra", "lectus", "pulvinar", "feugiat", "iaculis", "In", "non"];
  const [isUploading, setIsUploading] = useState(false);
  const [uploadSuccessMessage, setUploadSuccessMessage] = useState("");
  const rows = (): Col[][] => {
    const data: Col[][] = [];
    names.forEach((name, index) => {
      data.push([{
        value: index.toString(),
        content: <a href="google.com">{index.toString()}</a>
      }, {
        value: name,
        content: name
      }, {
        value: name + "@gmail.com",
        content: <a href={"mailto:" + name + "@gmail.com"}>{name + "@gmail.com"}</a>
      }, generatePhone()]);
    });
    return data;
  };
  return <Table includeUpload={true} handleOnUpload={() => {
    setIsUploading(true);
    setTimeout(() => {
      setIsUploading(false);
      setUploadSuccessMessage("Upload Successful");
    }, 1000);
  }} isUploading={isUploading} uploadSuccessMessage={uploadSuccessMessage}>{{
      header: [{
        name: "Id",
        title: "Id",
        sort: (a, b) => +a - +b
      }, {
        name: "Name",
        title: "First name and Last name"
      }, {
        name: "Email",
        title: "Email Address",
        visibility: "large-screen"
      }, {
        name: "Phone",
        title: "Phone Number",
        visibility: "large-screen"
      }],
      rows: rows()
    }}</Table>;
}`,...(E=(I=r.parameters)==null?void 0:I.docs)==null?void 0:E.source}}};const R=["Default","Pageable","WithUploadTemplate"];export{s as Default,i as Pageable,r as WithUploadTemplate,R as __namedExportsOrder,F as default};
