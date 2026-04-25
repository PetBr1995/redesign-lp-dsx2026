import{j as e}from"./motion-Cx7ga7Cx.js";import{r as i}from"./react-D7I_-qrL.js";import{H as n,C as a}from"./HeaderMask-B8MFDcuU.js";const u=({className:l="",ctaLink:s="/vendas"})=>{const[o,r]=i.useState(!1);i.useEffect(()=>{const t=p=>p.key==="Escape"&&r(!1);return window.addEventListener("keydown",t),()=>window.removeEventListener("keydown",t)},[]);const c=()=>r(!1),d=()=>r(t=>!t);return e.jsxs(e.Fragment,{children:[e.jsxs("section",{className:`
          fixed top-0 left-0 right-0
          z-50
          bg-black/20
          backdrop-blur-sm
          border-b border-white/10
          h-[75px] p-2
          flex items-center justify-between
          sm:justify-around
          ${l}
        `,children:[e.jsx("a",{href:"/#home",children:e.jsxs("picture",{children:[e.jsx("source",{srcSet:"/optimized/step1/DSX-2026-icon-1.avif",type:"image/avif"}),e.jsx("source",{srcSet:"/optimized/step1/DSX-2026-icon-1.webp",type:"image/webp"}),e.jsx("img",{src:"/DSX-2026-icon-1.png",alt:"logo",className:"h-[32px] sm:h-[40px] w-auto"})]})}),e.jsxs("div",{className:"hidden sm:flex justify-center items-center gap-1",children:[e.jsx(n,{titulo:"Seja patrocinador",textColor:"#ffffff",backgroundColor:"#000000",link:"/patrocinador",font:"bold"}),e.jsx(a,{titulo:"Compre agora",link:s})]}),e.jsx("button",{type:"button",className:"cursor-pointer sm:hidden inline-flex items-center justify-center p-2 rounded-md text-white","aria-label":"Abrir menu","aria-expanded":o,onClick:d,children:e.jsx("svg",{width:"26",height:"26",viewBox:"0 0 24 24",fill:"none",children:e.jsx("path",{d:"M4 7h16M4 12h16M4 17h16",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round"})})})]}),e.jsx("div",{className:`
          fixed inset-0 z-40
          bg-black/60
          transition-opacity duration-200
          ${o?"opacity-100 pointer-events-auto":"opacity-0 pointer-events-none"}
        `,onClick:c}),e.jsx("div",{className:`
          fixed top-0 left-0 right-0 z-50
          bg-black
          border-b border-white/10
          pt-0  /* empurra pra baixo do header */
          transition-transform duration-250 ease-out
          ${o?"translate-y-0":"-translate-y-full"}
        `,children:e.jsxs("div",{className:"p-4 flex flex-wrap gap-3 items-stretch justify-center",children:[e.jsx(n,{titulo:"Seja patrocinador",textColor:"#ffffff",backgroundColor:"#000000",link:"/patrocinador",font:"bold"}),e.jsx(a,{titulo:"Compre agora",link:s})]})})]})};export{u as default};
