!function(){try{var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{},t=(new e.Error).stack;t&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[t]="d22d31a6-0bba-48b3-91e3-d4303a0e2940",e._sentryDebugIdIdentifier="sentry-dbid-d22d31a6-0bba-48b3-91e3-d4303a0e2940")}catch(e){}}();"use strict";(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[9974],{19974:function(e,t,o){o.d(t,{Eh:function(){return X},VY:function(){return S},ee:function(){return N},fC:function(){return W},h_:function(){return B},x8:function(){return U},xz:function(){return Y}});var n=o(13491),r=o(52983),a=o(12527),u=o(81213),c=o(62331),l=o(56368),i=o(29520),s=o(3636),d=o(74009),p=o(55697),f=o(74077),v=o(88702),h=o(37956),g=o(96782),E=o(23196),m=o(50726),b=o(87006);let C="Popover",[P,_]=(0,c.b)(C,[p.D7]),w=(0,p.D7)(),[O,R]=P(C),D=(0,r.forwardRef)((e,t)=>{let{__scopePopover:o,...a}=e,u=R("PopoverAnchor",o),c=w(o),{onCustomAnchorAdd:l,onCustomAnchorRemove:i}=u;return(0,r.useEffect)(()=>(l(),()=>i()),[l,i]),(0,r.createElement)(p.ee,(0,n.Z)({},c,a,{ref:t}))}),y=(0,r.forwardRef)((e,t)=>{let{__scopePopover:o,...c}=e,l=R("PopoverTrigger",o),i=w(o),s=(0,u.e)(t,l.triggerRef),d=(0,r.createElement)(h.WV.button,(0,n.Z)({type:"button","aria-haspopup":"dialog","aria-expanded":l.open,"aria-controls":l.contentId,"data-state":K(l.open)},c,{ref:s,onClick:(0,a.M)(e.onClick,l.onOpenToggle)}));return l.hasCustomAnchor?d:(0,r.createElement)(p.ee,(0,n.Z)({asChild:!0},i),d)}),A="PopoverPortal",[F,k]=P(A,{forceMount:void 0}),x="PopoverContent",M=(0,r.forwardRef)((e,t)=>{let o=k(x,e.__scopePopover),{forceMount:a=o.forceMount,...u}=e,c=R(x,e.__scopePopover);return(0,r.createElement)(v.z,{present:a||c.open},c.modal?(0,r.createElement)(I,(0,n.Z)({},u,{ref:t})):(0,r.createElement)(Z,(0,n.Z)({},u,{ref:t})))}),I=(0,r.forwardRef)((e,t)=>{let o=R(x,e.__scopePopover),c=(0,r.useRef)(null),l=(0,u.e)(t,c),i=(0,r.useRef)(!1);return(0,r.useEffect)(()=>{let e=c.current;if(e)return(0,m.Ry)(e)},[]),(0,r.createElement)(b.Z,{as:g.g7,allowPinchZoom:!0},(0,r.createElement)(T,(0,n.Z)({},e,{ref:l,trapFocus:o.open,disableOutsidePointerEvents:!0,onCloseAutoFocus:(0,a.M)(e.onCloseAutoFocus,e=>{var t;e.preventDefault(),i.current||null===(t=o.triggerRef.current)||void 0===t||t.focus()}),onPointerDownOutside:(0,a.M)(e.onPointerDownOutside,e=>{let t=e.detail.originalEvent,o=0===t.button&&!0===t.ctrlKey,n=2===t.button||o;i.current=n},{checkForDefaultPrevented:!1}),onFocusOutside:(0,a.M)(e.onFocusOutside,e=>e.preventDefault(),{checkForDefaultPrevented:!1})})))}),Z=(0,r.forwardRef)((e,t)=>{let o=R(x,e.__scopePopover),a=(0,r.useRef)(!1),u=(0,r.useRef)(!1);return(0,r.createElement)(T,(0,n.Z)({},e,{ref:t,trapFocus:!1,disableOutsidePointerEvents:!1,onCloseAutoFocus:t=>{var n,r;null===(n=e.onCloseAutoFocus)||void 0===n||n.call(e,t),t.defaultPrevented||(a.current||null===(r=o.triggerRef.current)||void 0===r||r.focus(),t.preventDefault()),a.current=!1,u.current=!1},onInteractOutside:t=>{var n,r;null===(n=e.onInteractOutside)||void 0===n||n.call(e,t),t.defaultPrevented||(a.current=!0,"pointerdown"!==t.detail.originalEvent.type||(u.current=!0));let c=t.target;(null===(r=o.triggerRef.current)||void 0===r?void 0:r.contains(c))&&t.preventDefault(),"focusin"===t.detail.originalEvent.type&&u.current&&t.preventDefault()}}))}),T=(0,r.forwardRef)((e,t)=>{let{__scopePopover:o,trapFocus:a,onOpenAutoFocus:u,onCloseAutoFocus:c,disableOutsidePointerEvents:d,onEscapeKeyDown:f,onPointerDownOutside:v,onFocusOutside:h,onInteractOutside:g,...E}=e,m=R(x,o),b=w(o);return(0,i.EW)(),(0,r.createElement)(s.M,{asChild:!0,loop:!0,trapped:a,onMountAutoFocus:u,onUnmountAutoFocus:c},(0,r.createElement)(l.XB,{asChild:!0,disableOutsidePointerEvents:d,onInteractOutside:g,onEscapeKeyDown:f,onPointerDownOutside:v,onFocusOutside:h,onDismiss:()=>m.onOpenChange(!1)},(0,r.createElement)(p.VY,(0,n.Z)({"data-state":K(m.open),role:"dialog",id:m.contentId},b,E,{ref:t,style:{...E.style,"--radix-popover-content-transform-origin":"var(--radix-popper-transform-origin)","--radix-popover-content-available-width":"var(--radix-popper-available-width)","--radix-popover-content-available-height":"var(--radix-popper-available-height)","--radix-popover-trigger-width":"var(--radix-popper-anchor-width)","--radix-popover-trigger-height":"var(--radix-popper-anchor-height)"}}))))}),V=(0,r.forwardRef)((e,t)=>{let{__scopePopover:o,...u}=e,c=R("PopoverClose",o);return(0,r.createElement)(h.WV.button,(0,n.Z)({type:"button"},u,{ref:t,onClick:(0,a.M)(e.onClick,()=>c.onOpenChange(!1))}))}),z=(0,r.forwardRef)((e,t)=>{let{__scopePopover:o,...a}=e,u=w(o);return(0,r.createElement)(p.Eh,(0,n.Z)({},u,a,{ref:t}))});function K(e){return e?"open":"closed"}let W=e=>{let{__scopePopover:t,children:o,open:n,defaultOpen:a,onOpenChange:u,modal:c=!1}=e,l=w(t),i=(0,r.useRef)(null),[s,f]=(0,r.useState)(!1),[v=!1,h]=(0,E.T)({prop:n,defaultProp:a,onChange:u});return(0,r.createElement)(p.fC,l,(0,r.createElement)(O,{scope:t,contentId:(0,d.M)(),triggerRef:i,open:v,onOpenChange:h,onOpenToggle:(0,r.useCallback)(()=>h(e=>!e),[h]),hasCustomAnchor:s,onCustomAnchorAdd:(0,r.useCallback)(()=>f(!0),[]),onCustomAnchorRemove:(0,r.useCallback)(()=>f(!1),[]),modal:c},o))},N=D,Y=y,B=e=>{let{__scopePopover:t,forceMount:o,children:n,container:a}=e,u=R(A,t);return(0,r.createElement)(F,{scope:t,forceMount:o},(0,r.createElement)(v.z,{present:o||u.open},(0,r.createElement)(f.h,{asChild:!0,container:a},n)))},S=M,U=V,X=z}}]);