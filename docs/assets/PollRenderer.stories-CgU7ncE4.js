import{j as n}from"./jsx-runtime-D_zvdyIk.js";import{P as l,a as R}from"./PollRenderer-CFS6BgSb.js";import{N as h}from"./NoteWidgetClientProvider-Mpl7UKIW.js";import"./index-D4lIrffr.js";import"./Button-CpAfKxsB.js";const y=r=>{let e=r.tally??{counts:{},totalResponses:0},s=r.hasResponded??!1;return{getPoll:async()=>({...r,tally:e,hasResponded:s}),submitPollResponse:async(P,g,f)=>{if(s)throw new R;const a={...e.counts};for(const d of f)a[d]=(a[d]??0)+1;return e={counts:a,totalResponses:e.totalResponses+1},s=!0,e}}},E={component:l,title:"Content/PollRenderer"},o={render:()=>n.jsx(h,{poll:y({title:"What should we cook next?",options:["Soup","Salad","Stir-fry"],type:"SINGLE"}),children:n.jsx(l,{"data-poll-nid":"hq/abcd"})})},t={render:()=>n.jsx(h,{poll:y({title:"What should we cook next?",options:["Soup","Salad","Stir-fry"],type:"SINGLE",hasResponded:!0,tally:{counts:{Soup:7,Salad:3,"Stir-fry":2},totalResponses:12}}),children:n.jsx(l,{"data-poll-nid":"hq/efgh"})})};var i,p,c;o.parameters={...o.parameters,docs:{...(i=o.parameters)==null?void 0:i.docs,source:{originalSource:`{
  render: () => <NoteWidgetClientProvider poll={makeMockClient({
    title: "What should we cook next?",
    options: ["Soup", "Salad", "Stir-fry"],
    type: "SINGLE"
  })}>
            <PollRenderer data-poll-nid="hq/abcd" />
        </NoteWidgetClientProvider>
}`,...(c=(p=o.parameters)==null?void 0:p.docs)==null?void 0:c.source}}};var u,m,S;t.parameters={...t.parameters,docs:{...(u=t.parameters)==null?void 0:u.docs,source:{originalSource:`{
  render: () => <NoteWidgetClientProvider poll={makeMockClient({
    title: "What should we cook next?",
    options: ["Soup", "Salad", "Stir-fry"],
    type: "SINGLE",
    hasResponded: true,
    tally: {
      counts: {
        Soup: 7,
        Salad: 3,
        "Stir-fry": 2
      },
      totalResponses: 12
    }
  })}>
            <PollRenderer data-poll-nid="hq/efgh" />
        </NoteWidgetClientProvider>
}`,...(S=(m=t.parameters)==null?void 0:m.docs)==null?void 0:S.source}}};const j=["Voting","AlreadyVoted"];export{t as AlreadyVoted,o as Voting,j as __namedExportsOrder,E as default};
