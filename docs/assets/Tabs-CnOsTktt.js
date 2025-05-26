import{j as a}from"./jsx-runtime-D_zvdyIk.js";import{r as o}from"./index-D4lIrffr.js";import{B as m}from"./Button-D0_I9hGM.js";const u=({handleTabSelected:n,children:i})=>{const[s,d]=o.useState(0),{tabs:t}=i,c=e=>{d(e),n&&n(e)};return a.jsxs("section",{className:"muncher-tabs",children:[a.jsx("header",{children:t.map((e,r)=>a.jsxs("div",{className:"muncher-tab-header--item",children:[a.jsx(m,{variant:"transparent",active:s===r,size:"small",title:e.headerTitle,onClick:()=>{c(r)},children:e.header}),r!==t.length-1?a.jsx("span",{className:"spacer",children:"|"}):""]},"muncher-tab-header"+r))}),t.map((e,r)=>a.jsx("section",{className:s===r?"muncher-tab muncher-tab--active":"muncher-tab",children:e.body},"muncher-tab-"+r))]})};u.__docgenInfo={description:"",methods:[],displayName:"Tabs",props:{children:{required:!0,tsType:{name:"signature",type:"object",raw:`{
    tabs: {
        header: string,
        headerTitle?: string,
        body: ReactNode
    }[]
}`,signature:{properties:[{key:"tabs",value:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
    header: string,
    headerTitle?: string,
    body: ReactNode
}`,signature:{properties:[{key:"header",value:{name:"string",required:!0}},{key:"headerTitle",value:{name:"string",required:!1}},{key:"body",value:{name:"ReactNode",required:!0}}]}}],raw:`{
    header: string,
    headerTitle?: string,
    body: ReactNode
}[]`,required:!0}}]}},description:""},handleTabSelected:{required:!1,tsType:{name:"signature",type:"function",raw:"(index: number) => void",signature:{arguments:[{type:{name:"number"},name:"index"}],return:{name:"void"}}},description:""}}};export{u as T};
