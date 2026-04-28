import{j as n}from"./jsx-runtime-D_zvdyIk.js";import{r as w}from"./index-D4lIrffr.js";import{I as r,d as P}from"./Icon-D0iCBpgk.js";import{I as U}from"./Input-Br_N4g3K.js";import{B as I}from"./Button-C9pFy32U.js";/* empty css              */import"./Label-WHfwOnzY.js";import"./Spinner-Bp0FQ2cK.js";const se={component:r,title:"Visual/Icons",argTypes:{color:{control:"color"}},render:s=>n.jsx("div",{children:n.jsx(r,{...s})})},a=()=>{const[s,M]=w.useState(""),[c,u]=w.useState(),V=()=>{u(c==="asc"?"desc":"asc")},g=["arrow-left","arrow-right","arrow-up","arrow-down","compass","plus","minus","close","divide","equals","slash","disc","alert","check","info","help","meh","smile","frown","circle","dribble","clock","target","globe"],p=["chevron-left","chevron-right","skip-back","skip-forward","fast-forward","rewind","external-link","hamburger","repeat","shuffle","eye","hash","share","rss","muncher","code-pen","youtube"],h=["undo","redo","play","pause","refresh","reset","save","copy","clipboard","upload","download","send","log-in","log-out","power","settings","tool","toggle-left","toggle-right","search","filter","sort-asc","sort-desc","loading","edit","pencil","trash","archive","360","zoom-in","zoom-out","split-view","sidebar","maximize","minimize","print","move","max","rotate","scissor","sun"],f=["bold","italic","underline","align-left","align-center","align-right","align-justify","ordered-list","unordered-list","type","link","unlink","code","terminal","image","video","video-off","film","music","camera","camera-off","mic","mic-off","speaker","volume","mute","grid","layout","table","crop","paper-clip","bookmark","pen-tool","headphone","tv","monitor","phone","voicemail","mail","message","inbox"],b=["user","users","user-plus","user-minus","github","slack","twitter","facebook","instagram","linkedin","home","car","bike","truck","building","bed","bath","coffee","umbrella","package","box","file","folder","database","server","cloud","cloud-drizzle","cloud-lightning","map","book","briefcase","anchor","key","lock","unlock","credit-card","dollar","shopping-cart","calendar","watch","layers","mixer","tag"],v=["simple-check","star","thumbs-up","thumbs-down","heart","bell","bell-off","flag","trending-up","trending-down","bar-chart","pie-chart","dot","more","award","gift","bulb"],W=[g,p,h,f,b,v],m=new Set,R=new Set;for(const e of W)for(const o of e)m.has(o)&&R.add(o),m.add(o);const k=Object.keys(P),A=k.filter(e=>!m.has(e)),F=[{name:"circular",icons:g},{name:"navigation",icons:p},{name:"actions",icons:h},{name:"content",icons:f},{name:"entity",icons:b},{name:"signals",icons:v},{name:"miscellaneous",icons:A}],G=s.replace(/\s*/g,"").toLowerCase(),H=k.filter(e=>e.toLowerCase().includes(G)),J=F.map(e=>({name:e.name,icons:e.icons.filter(o=>H.includes(o))})).filter(e=>e.icons.length>0),K=e=>c?e.icons.sort((o,y)=>c==="desc"?y.localeCompare(o):o.localeCompare(y)):e.icons;return n.jsxs("div",{className:"icon-search-story",children:[n.jsxs("div",{className:"search-panel",children:[n.jsx(U,{name:"search-query",onChange:e=>M(e.target.value),icon:"search",placeholder:"Type Icon Name"}),n.jsx(I,{size:"small",variant:"tertiary",title:"Sort Icons",onClick:()=>V(),children:c==="desc"?n.jsx(r,{name:"sort-desc"}):n.jsx(r,{name:"sort-asc"})})]}),n.jsx("div",{className:"icon-buttons",children:J.map(e=>n.jsxs("div",{className:"icon-group",children:[n.jsx("div",{className:"group-title",children:e.name}),n.jsx("div",{className:"icon-grid",children:K(e).map(o=>n.jsx(I,{size:"small",title:o,variant:"tertiary",children:n.jsx(r,{iconString:o})},o))})]},e.name))})]})},t={args:{name:"muncher",size:"small"}},i={args:{...t.args,size:"medium",weight:1}},l={args:{...i.args,weight:2}},d={args:{name:"muncher"},render:s=>n.jsx("div",{children:n.jsx(r,{...s,children:n.jsx("p",{children:"Text"})})})};a.__docgenInfo={description:"",methods:[],displayName:"Search"};var x,S,N;a.parameters={...a.parameters,docs:{...(x=a.parameters)==null?void 0:x.docs,source:{originalSource:`() => {
  const [query, setQuery] = useState("");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">();
  const toggleSort = () => {
    if (sortOrder === "asc") {
      setSortOrder("desc");
    } else {
      setSortOrder("asc");
    }
  };
  const cirular: IconName[] = ["arrow-left", "arrow-right", "arrow-up", "arrow-down", "compass", "plus", "minus", "close", "divide", "equals", "slash", "disc", "alert", "check", "info", "help", "meh", "smile", "frown", "circle", "dribble", "clock", "target", "globe"];
  const navigation: IconName[] = ["chevron-left", "chevron-right", "skip-back", "skip-forward", "fast-forward", "rewind", "external-link", "hamburger", "repeat", "shuffle", "eye", "hash", "share", "rss", "muncher", "code-pen", "youtube"];
  const actions: IconName[] = ["undo", "redo", "play", "pause", "refresh", "reset", "save", "copy", "clipboard", "upload", "download", "send", "log-in", "log-out", "power", "settings", "tool", "toggle-left", "toggle-right", "search", "filter", "sort-asc", "sort-desc", "loading", "edit", "pencil", "trash", "archive", "360", "zoom-in", "zoom-out", "split-view", "sidebar", "maximize", "minimize", "print", "move", "max", "rotate", "scissor", "sun"];
  const content: IconName[] = ["bold", "italic", "underline", "align-left", "align-center", "align-right", "align-justify", "ordered-list", "unordered-list", "type", "link", "unlink", "code", "terminal", "image", "video", "video-off", "film", "music", "camera", "camera-off", "mic", "mic-off", "speaker", "volume", "mute", "grid", "layout", "table", "crop", "paper-clip", "bookmark", "pen-tool", "headphone", "tv", "monitor", "phone", "voicemail", "mail", "message", "inbox"];
  const entity: IconName[] = ["user", "users", "user-plus", "user-minus", "github", "slack", "twitter", "facebook", "instagram", "linkedin", "home", "car", "bike", "truck", "building", "bed", "bath", "coffee", "umbrella", "package", "box", "file", "folder", "database", "server", "cloud", "cloud-drizzle", "cloud-lightning", "map", "book", "briefcase", "anchor", "key", "lock", "unlock", "credit-card", "dollar", "shopping-cart", "calendar", "watch", "layers", "mixer", "tag"];
  const signals: IconName[] = ["simple-check", "star", "thumbs-up", "thumbs-down", "heart", "bell", "bell-off", "flag", "trending-up", "trending-down", "bar-chart", "pie-chart", "dot", "more", "award", "gift", "bulb"];
  const allCategories = [cirular, navigation, actions, content, entity, signals];
  const uniqueIcons = new Set<IconName>();
  const duplicates = new Set<IconName>();
  for (const set of allCategories) {
    for (const icon of set) {
      if (uniqueIcons.has(icon)) {
        duplicates.add(icon);
      }
      uniqueIcons.add(icon);
    }
  }
  const allIcons = Object.keys(drawings) as IconName[];
  const remainingIcons = allIcons.filter(icon => !uniqueIcons.has(icon));
  if (process.env.NODE_ENV === "development") {
    if (duplicates.size > 0) {
      console.warn("Duplicates:", [...duplicates].join(","));
    }
  }
  const categories = [{
    name: "circular",
    icons: cirular
  }, {
    name: "navigation",
    icons: navigation
  }, {
    name: "actions",
    icons: actions
  }, {
    name: "content",
    icons: content
  }, {
    name: "entity",
    icons: entity
  }, {
    name: "signals",
    icons: signals
  }, {
    name: "miscellaneous",
    icons: remainingIcons
  }] as const;
  const normalizedQuery = query.replace(/\\s*/g, "").toLowerCase();
  const filtered = allIcons.filter(icon => icon.toLowerCase().includes(normalizedQuery));
  const grouped = categories.map(cat => ({
    name: cat.name,
    icons: cat.icons.filter(icon => filtered.includes(icon))
  })).filter(group => group.icons.length > 0);
  const getSort = (group: {
    name: "circular" | "navigation" | "actions" | "content" | "entity" | "signals" | "miscellaneous";
    icons: IconName[];
  }) => {
    if (sortOrder) return group.icons.sort((a, b) => sortOrder === "desc" ? b.localeCompare(a) : a.localeCompare(b));else return group.icons;
  };
  return <div className="icon-search-story">
            <div className="search-panel">
                <Input name="search-query" onChange={e => setQuery(e.target.value)} icon={"search"} placeholder="Type Icon Name" />
                <Button size="small" variant={"tertiary"} title="Sort Icons" onClick={() => toggleSort()}>
                    {sortOrder === "desc" ? <Icon name="sort-desc" /> : <Icon name="sort-asc" />}
                </Button>

            </div>
            <div className="icon-buttons">
                {grouped.map(group => <div key={group.name} className="icon-group">
                        <div className="group-title">{group.name}</div>

                        <div className="icon-grid">
                            {getSort(group).map(icon => <Button key={icon} size="small" title={icon} variant="tertiary">
                                    <Icon iconString={icon} />
                                </Button>)}
                        </div>
                    </div>)}
            </div>
        </div>;
}`,...(N=(S=a.parameters)==null?void 0:S.docs)==null?void 0:N.source}}};var j,z,C;t.parameters={...t.parameters,docs:{...(j=t.parameters)==null?void 0:j.docs,source:{originalSource:`{
  args: {
    name: 'muncher',
    size: 'small'
  }
}`,...(C=(z=t.parameters)==null?void 0:z.docs)==null?void 0:C.source}}};var O,q,D;i.parameters={...i.parameters,docs:{...(O=i.parameters)==null?void 0:O.docs,source:{originalSource:`{
  args: {
    ...Default.args,
    size: 'medium',
    weight: 1
  }
}`,...(D=(q=i.parameters)==null?void 0:q.docs)==null?void 0:D.source}}};var T,B,Q;l.parameters={...l.parameters,docs:{...(T=l.parameters)==null?void 0:T.docs,source:{originalSource:`{
  args: {
    ...Medium.args,
    weight: 2
  }
}`,...(Q=(B=l.parameters)==null?void 0:B.docs)==null?void 0:Q.source}}};var E,_,L;d.parameters={...d.parameters,docs:{...(E=d.parameters)==null?void 0:E.docs,source:{originalSource:`{
  args: {
    name: 'muncher'
  },
  render: args => <div><Icon {...args}><p>Text</p></Icon></div>
}`,...(L=(_=d.parameters)==null?void 0:_.docs)==null?void 0:L.source}}};const ae=["Search","Default","Medium","Dark","IconWithText"];export{l as Dark,t as Default,d as IconWithText,i as Medium,a as Search,ae as __namedExportsOrder,se as default};
