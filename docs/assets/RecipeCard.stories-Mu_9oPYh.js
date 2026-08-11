import{j as e}from"./jsx-runtime-D_zvdyIk.js";import{R as f}from"./RecipeCard-C_IDVxmv.js";import"./index-D4lIrffr.js";import"./Icon-1_RwmGu3.js";const w=""+new URL("hero-placeholder-CmmDO3S9.jpg",import.meta.url).href,S=""+new URL("notes-placeholder-BNNmKmoF.jpg",import.meta.url).href,i={title:"Chicken Tikka Masala",renderedContent:`<article xmlns="http://www.w3.org/1999/xhtml"><p><span data-media-image-src="ip/ipwb" class="media-image-wrap media-image-wrap--medium" data-media-image-size="medium" data-media-image-role="hero"><img alt="Chicken Tikka Masala" class="media-image" src="${w}" /></span></p>
<p>A weeknight favorite — rich, warmly spiced, and forgiving if you don't have every spice exactly measured. Great with basmati rice or naan.
<span data-media-image-src="pk/pkay" class="media-image-wrap media-image-wrap--medium" data-media-image-size="medium"><img alt="Chicken Tikka Masala with basmati rice" class="media-image" src="${S}" /><span class="media-image-caption"><span class="muncher-icon"><svg class="muncher-icon--small" stroke="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg></span><span data-link-text="true">Chicken tikka masala with basmati rice</span></span></span></p>
<h2 id="notes">Notes</h2>
<ul>
<li>Marinating overnight makes a real difference in flavor.</li>
<li>Swap heavy cream for coconut milk for a dairy-free version.</li>
</ul></article>`},s={servings:4,prepMinutes:20,cookMinutes:35,ingredients:[{name:"boneless chicken thighs",amount:1.5,unit:"fl oz"},{name:"plain yogurt",amount:.5,unit:"cup"},{name:"garam masala",amount:2,unit:"tsp"},{name:"ground cumin",amount:1,unit:"tsp"},{name:"garlic, minced",amount:3,unit:"clove"},{name:"ginger, grated",amount:1,unit:"tsp"},{name:"butter",amount:3,unit:"tsp"},{name:"onion, diced",amount:1,unit:"whole"},{name:"crushed tomatoes",amount:1,unit:"can"},{name:"heavy cream",amount:.5,unit:"cup"},{name:"cilantro, chopped",amount:2,unit:"tsp"}],instructions:[{text:"Marinate the chicken in yogurt, half the garam masala, cumin, and turmeric for at least 20 minutes (overnight is better)"},{text:"Sear the chicken in a hot pan until browned but not fully cooked through; set aside"},{text:"In the same pan, melt the butter and sauté the onion until soft, then add garlic and ginger for 1 minute"},{text:"Stir in the remaining spices, then the crushed tomatoes. Simmer 10 minutes"},{text:"Return the chicken to the pan, add the cream, and simmer until the chicken is cooked through and the sauce thickens"},{text:"Finish with cilantro and serve over rice"}]},j={component:f,title:"Content/RecipeCard"},a={args:{note:i,recipe:s}},t={args:{note:i,recipe:s},decorators:[v=>e.jsx("div",{style:{maxWidth:"20rem"},children:e.jsx(v,{})})]},r={args:{note:{title:"Scrambled Eggs",renderedContent:""},recipe:{servings:2,ingredients:[{name:"eggs",amount:2}],instructions:[{text:"Scramble the eggs."}]}}},n={parameters:{layout:"fullscreen"},render:()=>e.jsxs("div",{className:"recipe-story-page",children:[e.jsxs("div",{className:"recipe-story-head",children:[e.jsx("h1",{children:"Chicken Tikka Masala"}),e.jsx("span",{className:"recipe-story-pill recipe-story-pill--category",children:"Indian Curry"}),e.jsx("span",{className:"recipe-story-pill recipe-story-pill--effort",children:"Standard"})]}),e.jsx(f,{note:i,recipe:s})]})};var o,c,m;a.parameters={...a.parameters,docs:{...(o=a.parameters)==null?void 0:o.docs,source:{originalSource:`{
  args: {
    note: sampleNote,
    recipe: sampleRecipe
  }
}`,...(m=(c=a.parameters)==null?void 0:c.docs)==null?void 0:m.source}}};var l,p,d;t.parameters={...t.parameters,docs:{...(l=t.parameters)==null?void 0:l.docs,source:{originalSource:`{
  args: {
    note: sampleNote,
    recipe: sampleRecipe
  },
  decorators: [Story => <div style={{
    maxWidth: "20rem"
  }}>
                <Story />
            </div>]
}`,...(d=(p=t.parameters)==null?void 0:p.docs)==null?void 0:d.source}}};var u,h,g;r.parameters={...r.parameters,docs:{...(u=r.parameters)==null?void 0:u.docs,source:{originalSource:`{
  args: {
    note: {
      title: "Scrambled Eggs",
      renderedContent: ""
    },
    recipe: {
      servings: 2,
      ingredients: [{
        name: "eggs",
        amount: 2
      }],
      instructions: [{
        text: "Scramble the eggs."
      }]
    }
  }
}`,...(g=(h=r.parameters)==null?void 0:h.docs)==null?void 0:g.source}}};var k,y,x;n.parameters={...n.parameters,docs:{...(k=n.parameters)==null?void 0:k.docs,source:{originalSource:`{
  parameters: {
    layout: 'fullscreen'
  },
  render: () => <div className="recipe-story-page">
            <div className="recipe-story-head">
                <h1>Chicken Tikka Masala</h1>
                <span className="recipe-story-pill recipe-story-pill--category">Indian Curry</span>
                <span className="recipe-story-pill recipe-story-pill--effort">Standard</span>
            </div>

            <RecipeCard note={sampleNote} recipe={sampleRecipe} />
        </div>
}`,...(x=(y=n.parameters)==null?void 0:y.docs)==null?void 0:x.source}}};const M=["Default","NarrowSidebar","MinimalData","FullRecipePage"];export{a as Default,n as FullRecipePage,r as MinimalData,t as NarrowSidebar,M as __namedExportsOrder,j as default};
