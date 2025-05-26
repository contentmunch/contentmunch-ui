import{j as e}from"./jsx-runtime-D_zvdyIk.js";import{r as z}from"./index-D4lIrffr.js";import{I as i,d as D}from"./Icon-CHNZMfZ6.js";import{I as E}from"./Input-a0f0R9I3.js";import{B as T}from"./Button-D0_I9hGM.js";/* empty css              */import"./Label-WHfwOnzY.js";const R={component:i,title:"Visual/Icons",argTypes:{color:{control:"color"}},render:s=>e.jsx("div",{children:e.jsx(i,{...s})})},a=()=>{const[s,w]=z.useState("");return e.jsxs("div",{className:"icon-search-story",children:[e.jsx(E,{name:s,onChange:r=>w(r.target.value),icon:"search"}),Object.keys(D).filter(r=>r.search(new RegExp(s.replace(/\s*/g,""),"i"))>-1).map(r=>e.jsx(T,{size:"small",rounded:!0,title:r,variant:"tertiary",children:e.jsx(i,{iconString:r})},r))]})},n={args:{name:"muncher",size:"small"}},t={args:{...n.args,size:"medium",weight:1}},o={args:{...t.args,weight:2}},c={args:{name:"muncher",size:"small",orientation:"left"},render:s=>e.jsx("div",{children:e.jsx(i,{...s,children:e.jsx("p",{children:"Text"})})})};a.__docgenInfo={description:"",methods:[],displayName:"Search"};var m,u,d;a.parameters={...a.parameters,docs:{...(m=a.parameters)==null?void 0:m.docs,source:{originalSource:`() => {
  const [query, setQuery] = useState("");
  return <div className="icon-search-story">
            <Input name={query} onChange={e => setQuery(e.target.value)} icon={"search"} />
            {Object.keys(drawings).filter(key => key.search(new RegExp(query.replace(/\\s*/g, ""), "i")) > -1).map(key => <Button key={key} size="small" rounded={true} title={key} variant={"tertiary"}>
                        <Icon iconString={key} />
                    </Button>)}

        </div>;
}`,...(d=(u=a.parameters)==null?void 0:u.docs)==null?void 0:d.source}}};var p,l,g;n.parameters={...n.parameters,docs:{...(p=n.parameters)==null?void 0:p.docs,source:{originalSource:`{
  args: {
    name: 'muncher',
    size: 'small'
  }
}`,...(g=(l=n.parameters)==null?void 0:l.docs)==null?void 0:g.source}}};var h,x,y;t.parameters={...t.parameters,docs:{...(h=t.parameters)==null?void 0:h.docs,source:{originalSource:`{
  args: {
    ...Default.args,
    size: 'medium',
    weight: 1
  }
}`,...(y=(x=t.parameters)==null?void 0:x.docs)==null?void 0:y.source}}};var f,j,I;o.parameters={...o.parameters,docs:{...(f=o.parameters)==null?void 0:f.docs,source:{originalSource:`{
  args: {
    ...Medium.args,
    weight: 2
  }
}`,...(I=(j=o.parameters)==null?void 0:j.docs)==null?void 0:I.source}}};var S,v,k;c.parameters={...c.parameters,docs:{...(S=c.parameters)==null?void 0:S.docs,source:{originalSource:`{
  args: {
    name: 'muncher',
    size: 'small',
    orientation: 'left'
  },
  render: args => <div><Icon {...args}><p>Text</p></Icon></div>
}`,...(k=(v=c.parameters)==null?void 0:v.docs)==null?void 0:k.source}}};const b=["Search","Default","Medium","Dark","IconWithText"];export{o as Dark,n as Default,c as IconWithText,t as Medium,a as Search,b as __namedExportsOrder,R as default};
