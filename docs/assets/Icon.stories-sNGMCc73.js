import{j as e}from"./jsx-runtime-D_zvdyIk.js";import{r as w}from"./index-D4lIrffr.js";import{I as s,d as J}from"./Icon-BMbTJVVA.js";import{I as K}from"./Input-Bdbt_LlF.js";import{B as y}from"./Button-BkaHsfYs.js";/* empty css              */import"./Label-WHfwOnzY.js";import"./Spinner-Bp0FQ2cK.js";const oe={component:s,title:"Visual/Icons",argTypes:{color:{control:"color"}},render:a=>e.jsx("div",{children:e.jsx(s,{...a})})},r=()=>{const[a,L]=w.useState(""),[d,u]=w.useState("asc"),M=()=>{u(d==="asc"?"desc":"asc")},p=["arrow-left","arrow-right","arrow-up","arrow-down","chevron-left","chevron-right","skip-back","skip-forward","fast-forward","rewind","external-link","compass","hamburger","repeat","shuffle","eye","slash","plus","minus","divide","hash","share","rss","muncher","code-pen","youtube"],g=["undo","redo","play","pause","refresh","reset","save","copy","clipboard","upload","download","send","log-in","log-out","power","settings","tool","toggle-left","toggle-right","search","filter","sort-asc","sort-desc","loading","edit","pencil","trash","archive","360","zoom-in","zoom-out","split-view","sidebar","maximize","minimize","print","move","max","rotate","scissor","sun"],h=["bold","italic","underline","align-left","align-center","align-right","align-justify","ordered-list","unordered-list","type","link","unlink","code","terminal","image","video","video-off","film","music","camera","camera-off","mic","mic-off","speaker","volume","mute","grid","layout","table","crop","paper-clip","bookmark","pen-tool","headphone","tv","monitor","phone","voicemail","mail","message","inbox"],f=["user","users","user-plus","user-minus","github","slack","twitter","facebook","instagram","linkedin","home","car","bike","truck","building","bed","bath","coffee","umbrella","package","box","file","folder","database","server","cloud","cloud-drizzle","cloud-lightning","globe","map","book","briefcase","anchor","key","lock","unlock","credit-card","dollar","shopping-cart","calendar","clock","watch","layers","mixer","disc","target","tag"],b=["alert","info","help","check","simple-check","close","star","thumbs-up","thumbs-down","heart","bell","bell-off","flag","smile","frown","meh","trending-up","trending-down","bar-chart","pie-chart","dot","more","award","gift","bulb"],V=[p,g,h,f,b],m=new Set,W=new Set;for(const n of V)for(const o of n)m.has(o)&&W.add(o),m.add(o);const v=Object.keys(J),R=v.filter(n=>!m.has(n)),A=[{name:"navigation",icons:p},{name:"actions",icons:g},{name:"content",icons:h},{name:"entity",icons:f},{name:"signals",icons:b},{name:"miscellaneous",icons:R}],F=a.replace(/\s*/g,"").toLowerCase(),G=v.filter(n=>n.toLowerCase().includes(F)),H=A.map(n=>({name:n.name,icons:n.icons.filter(o=>G.includes(o))})).filter(n=>n.icons.length>0);return e.jsxs("div",{className:"icon-search-story",children:[e.jsxs("div",{className:"search-panel",children:[e.jsx(K,{name:"search-query",onChange:n=>L(n.target.value),icon:"search",placeholder:"Type Icon Name"}),e.jsx(y,{size:"small",variant:"tertiary",title:"Sort Icons",onClick:()=>M(),children:d==="desc"?e.jsx(s,{name:"sort-desc"}):e.jsx(s,{name:"sort-asc"})})]}),e.jsx("div",{className:"icon-buttons",children:H.map(n=>e.jsxs("div",{className:"icon-group",children:[e.jsx("div",{className:"group-title",children:n.name}),e.jsx("div",{className:"icon-grid",children:n.icons.sort((o,k)=>d==="desc"?k.localeCompare(o):o.localeCompare(k)).map(o=>e.jsx(y,{size:"small",title:o,variant:"tertiary",children:e.jsx(s,{iconString:o})},o))})]},n.name))})]})},t={args:{name:"muncher",size:"small"}},i={args:{...t.args,size:"medium",weight:1}},c={args:{...i.args,weight:2}},l={args:{name:"muncher",size:"small",orientation:"left"},render:a=>e.jsx("div",{children:e.jsx(s,{...a,children:e.jsx("p",{children:"Text"})})})};r.__docgenInfo={description:"",methods:[],displayName:"Search"};var x,I,S;r.parameters={...r.parameters,docs:{...(x=r.parameters)==null?void 0:x.docs,source:{originalSource:`() => {
  const [query, setQuery] = useState("");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const toggleSort = () => {
    if (sortOrder === "asc") {
      setSortOrder("desc");
    } else {
      setSortOrder("asc");
    }
  };
  const navigation: IconName[] = ["arrow-left", "arrow-right", "arrow-up", "arrow-down", "chevron-left", "chevron-right", "skip-back", "skip-forward", "fast-forward", "rewind", "external-link", "compass", "hamburger", "repeat", "shuffle", "eye", "slash", "plus", "minus", "divide", "hash", "share", "rss", "muncher", "code-pen", "youtube"];
  const actions: IconName[] = ["undo", "redo", "play", "pause", "refresh", "reset", "save", "copy", "clipboard", "upload", "download", "send", "log-in", "log-out", "power", "settings", "tool", "toggle-left", "toggle-right", "search", "filter", "sort-asc", "sort-desc", "loading", "edit", "pencil", "trash", "archive", "360", "zoom-in", "zoom-out", "split-view", "sidebar", "maximize", "minimize", "print", "move", "max", "rotate", "scissor", "sun"];
  const content: IconName[] = ["bold", "italic", "underline", "align-left", "align-center", "align-right", "align-justify", "ordered-list", "unordered-list", "type", "link", "unlink", "code", "terminal", "image", "video", "video-off", "film", "music", "camera", "camera-off", "mic", "mic-off", "speaker", "volume", "mute", "grid", "layout", "table", "crop", "paper-clip", "bookmark", "pen-tool", "headphone", "tv", "monitor", "phone", "voicemail", "mail", "message", "inbox"];
  const entity: IconName[] = ["user", "users", "user-plus", "user-minus", "github", "slack", "twitter", "facebook", "instagram", "linkedin", "home", "car", "bike", "truck", "building", "bed", "bath", "coffee", "umbrella", "package", "box", "file", "folder", "database", "server", "cloud", "cloud-drizzle", "cloud-lightning", "globe", "map", "book", "briefcase", "anchor", "key", "lock", "unlock", "credit-card", "dollar", "shopping-cart", "calendar", "clock", "watch", "layers", "mixer", "disc", "target", "tag"];
  const signals: IconName[] = ["alert", "info", "help", "check", "simple-check", "close", "star", "thumbs-up", "thumbs-down", "heart", "bell", "bell-off", "flag", "smile", "frown", "meh", "trending-up", "trending-down", "bar-chart", "pie-chart", "dot", "more", "award", "gift", "bulb"];
  const allCategories = [navigation, actions, content, entity, signals];
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
                            {group.icons.sort((a, b) => sortOrder === "desc" ? b.localeCompare(a) : a.localeCompare(b)).map(icon => <Button key={icon} size="small" title={icon} variant="tertiary">
                                    <Icon iconString={icon} />
                                </Button>)}
                        </div>
                    </div>)}
            </div>
        </div>;
}`,...(S=(I=r.parameters)==null?void 0:I.docs)==null?void 0:S.source}}};var z,N,j;t.parameters={...t.parameters,docs:{...(z=t.parameters)==null?void 0:z.docs,source:{originalSource:`{
  args: {
    name: 'muncher',
    size: 'small'
  }
}`,...(j=(N=t.parameters)==null?void 0:N.docs)==null?void 0:j.source}}};var C,O,q;i.parameters={...i.parameters,docs:{...(C=i.parameters)==null?void 0:C.docs,source:{originalSource:`{
  args: {
    ...Default.args,
    size: 'medium',
    weight: 1
  }
}`,...(q=(O=i.parameters)==null?void 0:O.docs)==null?void 0:q.source}}};var D,T,B;c.parameters={...c.parameters,docs:{...(D=c.parameters)==null?void 0:D.docs,source:{originalSource:`{
  args: {
    ...Medium.args,
    weight: 2
  }
}`,...(B=(T=c.parameters)==null?void 0:T.docs)==null?void 0:B.source}}};var Q,E,_;l.parameters={...l.parameters,docs:{...(Q=l.parameters)==null?void 0:Q.docs,source:{originalSource:`{
  args: {
    name: 'muncher',
    size: 'small',
    orientation: 'left'
  },
  render: args => <div><Icon {...args}><p>Text</p></Icon></div>
}`,...(_=(E=l.parameters)==null?void 0:E.docs)==null?void 0:_.source}}};const se=["Search","Default","Medium","Dark","IconWithText"];export{c as Dark,t as Default,l as IconWithText,i as Medium,r as Search,se as __namedExportsOrder,oe as default};
