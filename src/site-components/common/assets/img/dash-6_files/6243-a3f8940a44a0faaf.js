!function(){try{var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{},t=(new e.Error).stack;t&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[t]="5e508ffb-2c46-4803-b35b-62d50fdbd93e",e._sentryDebugIdIdentifier="sentry-dbid-5e508ffb-2c46-4803-b35b-62d50fdbd93e")}catch(e){}}();"use strict";(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[6243],{22393:function(e,t,r){r.d(t,{y:function(){return l}});var o=r(46888),n=r(84540);let l={[o.FILTERS_NAMES.term]:{title:"common:search"},[o.FILTERS_NAMES.sort]:{title:"common:sortBy",values:{[n.FILTERS_VALUES.sort.recent]:"common:recent",[n.FILTERS_VALUES.sort.relevance]:"common:popular"}},[o.FILTERS_NAMES.format]:{title:"common:format",values:{[n.FILTERS_VALUES.format.collections]:"common:collections",[n.FILTERS_VALUES.format.search]:"common:assets",[n.FILTERS_VALUES.format.author]:"common:authors"}},[o.FILTERS_NAMES.type]:{title:"common:assetType",values:{[n.FILTERS_VALUES.type.icon]:"common:icons",[n.FILTERS_VALUES.type.photo]:"common:photos",[n.FILTERS_VALUES.type.psd]:"common:psd",[n.FILTERS_VALUES.type.vector]:"common:vectors",[n.FILTERS_VALUES.type.video]:"common:videos",[n.FILTERS_VALUES.type.template]:"common:templates",[n.FILTERS_VALUES.type.mockup]:"common:mockups",[n.FILTERS_VALUES.type.illustration]:"common:illustrations",[n.FILTERS_VALUES.type["3d"]]:"common:3DModels",[n.FILTERS_VALUES.type.font]:"common:fonts"}},[o.FILTERS_NAMES.license]:{title:"common:license",values:{[n.FILTERS_VALUES.license.free]:"common:free",[n.FILTERS_VALUES.license.premium]:"common:premium"}},[o.FILTERS_NAMES.resolution]:{title:"common:resolution",values:{[n.FILTERS_VALUES.resolution["4k"]]:"4K",[n.FILTERS_VALUES.resolution["1080"]]:"1080p",[n.FILTERS_VALUES.resolution["720"]]:"720p"}},[o.FILTERS_NAMES.aspectRatio]:{title:"common:aspectRatio",values:{[n.FILTERS_VALUES.aspectRatio["16:9"]]:"16:9",[n.FILTERS_VALUES.aspectRatio["9:16"]]:"9:16"}},[o.FILTERS_NAMES.duration]:{title:"common:duration"},[o.FILTERS_NAMES.fps]:{title:"common:fps",values:{[n.FILTERS_VALUES.fps.gt60]:"60 +"}},[o.FILTERS_NAMES.topic]:{title:"videosSearch:filters:topic:title",values:{[n.FILTERS_VALUES.topic.background]:"videosSearch:filters:topic:items:backgroundMisc",[n.FILTERS_VALUES.topic.nature]:"videosSearch:filters:topic:items:nature",[n.FILTERS_VALUES.topic.travel]:"videosSearch:filters:topic:items:travelPlaces",[n.FILTERS_VALUES.topic.business]:"videosSearch:filters:topic:items:businessTechnology",[n.FILTERS_VALUES.topic.people]:"videosSearch:filters:topic:items:peopleEmotions",[n.FILTERS_VALUES.topic.events]:"videosSearch:filters:topic:items:events",[n.FILTERS_VALUES.topic.food]:"videosSearch:filters:topic:items:foodDrink",[n.FILTERS_VALUES.topic.sport]:"videosSearch:filters:topic:items:sports"}},[o.FILTERS_NAMES.videoOrientation]:{title:"regularSearch:filters:orientation:title",values:{[n.FILTERS_VALUES.videoOrientation.horizontal]:"regularSearch:filters:orientation:items:horizontal",[n.FILTERS_VALUES.videoOrientation.vertical]:"regularSearch:filters:orientation:items:vertical"}},[o.FILTERS_NAMES.videoType]:{title:"common:videoType",values:{[n.FILTERS_VALUES.videoType.footage]:"common:footage",[n.FILTERS_VALUES.videoType.motionGraphics]:"common:motionGraphics"}},[o.FILTERS_NAMES.shape]:{title:"common:style",values:{[n.FILTERS_VALUES.shape.fill]:"common:fill",[n.FILTERS_VALUES.shape.outline]:"common:outline",[n.FILTERS_VALUES.shape.linealColor]:"common:linealColor",[n.FILTERS_VALUES.shape.handDrawn]:"common:handDrawn"}},[o.FILTERS_NAMES.color]:{title:"common:color",values:{[n.FILTERS_VALUES.color.blue]:"common:blue",[n.FILTERS_VALUES.color.cyan]:"common:cyan",[n.FILTERS_VALUES.color.gray]:"common:gray",[n.FILTERS_VALUES.color.green]:"common:green",[n.FILTERS_VALUES.color.orange]:"common:orange",[n.FILTERS_VALUES.color.red]:"common:red",[n.FILTERS_VALUES.color.white]:"common:white",[n.FILTERS_VALUES.color.yellow]:"common:yellow",[n.FILTERS_VALUES.color.pink]:"common:pink",[n.FILTERS_VALUES.color.purple]:"common:purple",[n.FILTERS_VALUES.color.black]:"common:solidBlack"}},[o.FILTERS_NAMES.iconColor]:{title:"common:color",values:{[n.FILTERS_VALUES.iconColor.gradient]:"common:gradient",[n.FILTERS_VALUES.iconColor.solidBlack]:"common:solidBlack",[n.FILTERS_VALUES.iconColor.multicolor]:"common:color",[n.FILTERS_VALUES.iconColor.azure]:"common:azure",[n.FILTERS_VALUES.iconColor.blue]:"common:blue",[n.FILTERS_VALUES.iconColor.chartreuse]:"common:chartreuse",[n.FILTERS_VALUES.iconColor.cyan]:"common:cyan",[n.FILTERS_VALUES.iconColor.gray]:"common:gray",[n.FILTERS_VALUES.iconColor.green]:"common:green",[n.FILTERS_VALUES.iconColor.magenta]:"common:magenta",[n.FILTERS_VALUES.iconColor.orange]:"common:orange",[n.FILTERS_VALUES.iconColor.red]:"common:red",[n.FILTERS_VALUES.iconColor.rose]:"common:rose",[n.FILTERS_VALUES.iconColor.springGreen]:"common:springGreen",[n.FILTERS_VALUES.iconColor.violet]:"common:violet",[n.FILTERS_VALUES.iconColor.white]:"common:white",[n.FILTERS_VALUES.iconColor.yellow]:"common:yellow"}},[o.FILTERS_NAMES.tool]:{title:"regularSearch:filters:tool:title",values:{[n.FILTERS_VALUES.tool.midjourney]:"regularSearch:filters:tool:items:midjourney",[n.FILTERS_VALUES.tool.stablediffusion]:"regularSearch:filters:tool:items:stableDiffusion",[n.FILTERS_VALUES.tool.dalle]:"regularSearch:filters:tool:items:dalle",[n.FILTERS_VALUES.tool.freepik]:"regularSearch:filters:tool:items:freepik"}},[o.FILTERS_NAMES.orientation]:{title:"regularSearch:filters:orientation:title",values:{[n.FILTERS_VALUES.orientation.landscape]:"regularSearch:filters:orientation:items:horizontal",[n.FILTERS_VALUES.orientation.portrait]:"regularSearch:filters:orientation:items:vertical",[n.FILTERS_VALUES.orientation.square]:"regularSearch:filters:orientation:items:square",[n.FILTERS_VALUES.orientation.panoramic]:"regularSearch:filters:orientation:items:panoramic"}},[o.FILTERS_NAMES.hasPrompt]:{title:"regularSearch:filters:prompt:title",values:{[n.FILTERS_VALUES.hasPrompt.default]:"regularSearch:filters:prompt:value"}},[o.FILTERS_NAMES.quickEdit]:{title:"regularSearch:filters:quickEdit:title",values:{[n.FILTERS_VALUES.quickEdit.default]:"regularSearch:filters:quickEdit:value"}},[o.FILTERS_NAMES.freepikChoice]:{title:"regularSearch:filters:freepikChoice:title",tooltip:"regularSearch:filters:freepikChoice:tooltip",values:{[n.FILTERS_VALUES.freepikChoice.default]:"regularSearch:filters:freepikChoice:value"}},[o.FILTERS_NAMES.fileType]:{title:"regularSearch:filters:fileType:title",values:{[n.FILTERS_VALUES.fileType.jpg]:"regularSearch:filters:fileType:items:jpg",[n.FILTERS_VALUES.fileType.ai]:"regularSearch:filters:fileType:items:ai",[n.FILTERS_VALUES.fileType.eps]:"regularSearch:filters:fileType:items:eps",[n.FILTERS_VALUES.fileType.svg]:"regularSearch:filters:fileType:items:svg",[n.FILTERS_VALUES.fileType.png]:"regularSearch:filters:fileType:items:png"}},[o.FILTERS_NAMES.freeSvg]:{title:"common:license",values:{[n.FILTERS_VALUES.freeSvg.free]:"iconsSearch:filters.freeSvg.free"}},[o.FILTERS_NAMES.style]:{title:"regularSearch:filters:style:title",tooltip:"regularSearch:filters:style:tooltip",values:{[n.FILTERS_VALUES.style.watercolor]:"regularSearch:filters:style:items:watercolor",[n.FILTERS_VALUES.style.flat]:"regularSearch:filters:style:items:flat",[n.FILTERS_VALUES.style.cartoon]:"regularSearch:filters:style:items:cartoon",[n.FILTERS_VALUES.style.geometric]:"regularSearch:filters:style:items:geometric",[n.FILTERS_VALUES.style.gradient]:"regularSearch:filters:style:items:gradient",[n.FILTERS_VALUES.style.isometric]:"regularSearch:filters:style:items:isometric",[n.FILTERS_VALUES.style.threeD]:"regularSearch:filters:style:items:threeD",[n.FILTERS_VALUES.style.handDrawn]:"regularSearch:filters:style:items:handDrawn"}},[o.FILTERS_NAMES.people]:{title:"regularSearch:filters:people:title",tooltip:"regularSearch:filters:people:tooltip",values:{[n.FILTERS_VALUES.people.include]:"regularSearch:filters:people:items:withPeople",[n.FILTERS_VALUES.people.exclude]:"regularSearch:filters:people:items:noPeople"}},[o.FILTERS_NAMES.peopleRange]:{title:"regularSearch:filters:peopleRange:title",values:{[n.FILTERS_VALUES.peopleRange.number1]:"1",[n.FILTERS_VALUES.peopleRange.number2]:"2",[n.FILTERS_VALUES.peopleRange.number3]:"3",[n.FILTERS_VALUES.peopleRange.number4]:"regularSearch:filters:peopleRange:items:number4"}},[o.FILTERS_NAMES.peopleAge]:{title:"regularSearch:filters:peopleAge:title",values:{[n.FILTERS_VALUES.peopleAge.infant]:"regularSearch:filters:peopleAge:items:infant",[n.FILTERS_VALUES.peopleAge.child]:"regularSearch:filters:peopleAge:items:child",[n.FILTERS_VALUES.peopleAge.teen]:"regularSearch:filters:peopleAge:items:teen",[n.FILTERS_VALUES.peopleAge.young]:"regularSearch:filters:peopleAge:items:young",[n.FILTERS_VALUES.peopleAge.adult]:"regularSearch:filters:peopleAge:items:adult",[n.FILTERS_VALUES.peopleAge.senior]:"regularSearch:filters:peopleAge:items:senior",[n.FILTERS_VALUES.peopleAge.elder]:"regularSearch:filters:peopleAge:items:elder"}},[o.FILTERS_NAMES.peopleGender]:{title:"regularSearch:filters:peopleGender:title",values:{[n.FILTERS_VALUES.peopleGender.male]:"regularSearch:filters:peopleGender:items:male",[n.FILTERS_VALUES.peopleGender.female]:"regularSearch:filters:peopleGender:items:female"}},[o.FILTERS_NAMES.peopleEthnicity]:{title:"regularSearch:filters:peopleEthnicity:title",values:{[n.FILTERS_VALUES.peopleEthnicity.southAsian]:"regularSearch:filters:peopleEthnicity:items:southAsian",[n.FILTERS_VALUES.peopleEthnicity.middleEastern]:"regularSearch:filters:peopleEthnicity:items:middleEastern",[n.FILTERS_VALUES.peopleEthnicity.eastAsian]:"regularSearch:filters:peopleEthnicity:items:eastAsian",[n.FILTERS_VALUES.peopleEthnicity.black]:"regularSearch:filters:peopleEthnicity:items:black",[n.FILTERS_VALUES.peopleEthnicity.hispanic]:"regularSearch:filters:peopleEthnicity:items:hispanic",[n.FILTERS_VALUES.peopleEthnicity.white]:"regularSearch:filters:peopleEthnicity:items:white",[n.FILTERS_VALUES.peopleEthnicity.multiracial]:"regularSearch:filters:peopleEthnicity:items:multiracial"}},[o.FILTERS_NAMES.aiGenerated]:{title:"regularSearch:filters:aiGenerated:title",tooltip:"regularSearch:filters:aiGenerated:tooltip",values:{[n.FILTERS_VALUES.aiGenerated.excluded]:"regularSearch:filters:aiGenerated:items:exclude",[n.FILTERS_VALUES.aiGenerated.only]:"regularSearch:filters:aiGenerated:items:only"}},[o.FILTERS_NAMES.editableStroke]:{title:"iconsSearch:filters:editableStroke:title",values:{[n.FILTERS_VALUES.editableStroke.default]:"iconsSearch:filters:editableStroke:value"}},[o.FILTERS_NAMES.iconType]:{title:"iconsSearch:filters:iconType:title",values:{[n.FILTERS_VALUES.iconType.standard]:"iconsSearch:filters:iconType:standard",[n.FILTERS_VALUES.iconType.animated]:"iconsSearch:filters:iconType:animated",[n.FILTERS_VALUES.iconType.sticker]:"iconsSearch:filters:iconType:sticker"}}}},15881:function(e,t,r){r.d(t,{vr:function(){return p.vr},AU:function(){return p.AU},Mi:function(){return o.M},FILTERS_CONFIG:function(){return o.O},EF:function(){return d},FILTERS_NAMES:function(){return E.FILTERS_NAMES},FILTERS_VALUES:function(){return p.FILTERS_VALUES},lh:function(){return f.lh},wF:function(){return m.wF},V1:function(){return f.V1},i1:function(){return m.i1},tv:function(){return _.tv},Z1:function(){return _.Z1},nO:function(){return _.nO},AC:function(){return m.AC},E$:function(){return m.E$},iD:function(){return _.iD},oq:function(){return h.o},Jn:function(){return f.Jn}});var o=r(66531),n=r(7753),l=r(7959),i=r(97458),a=r(88295),c=r(22538),s=r(55111),u=r(43585),S=r(97837),E=r(46888);let d={[E.FILTERS_NAMES.type]:u.Z,[E.FILTERS_NAMES.sort]:e=>(0,i.jsx)("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"-49 141 512 512",width:16,height:16,"aria-hidden":!0,...e,children:(0,i.jsx)("path",{d:"M127.073 166h-96c-30.327 0-55 24.673-55 55v96c0 30.327 24.673 55 55 55h96c30.327 0 55-24.673 55-55v-96c0-30.327-24.673-55-55-55m5 151c0 2.757-2.243 5-5 5h-96c-2.757 0-5-2.243-5-5v-96c0-2.757 2.243-5 5-5h96c2.757 0 5 2.243 5 5zm-5 105h-96c-30.327 0-55 24.673-55 55v96c0 30.327 24.673 55 55 55h96c30.327 0 55-24.673 55-55v-96c0-30.327-24.673-55-55-55m5 151c0 2.757-2.243 5-5 5h-96c-2.757 0-5-2.243-5-5v-96c0-2.757 2.243-5 5-5h96c2.757 0 5 2.243 5 5zm263.175-72.53-42.175 42.175V251.356l42.175 42.175c4.882 4.882 11.279 7.322 17.678 7.322s12.796-2.44 17.678-7.322c9.763-9.763 9.763-25.593 0-35.355l-84.853-84.853c-9.764-9.764-25.592-9.764-35.355 0l-84.853 84.852c-9.763 9.763-9.763 25.593 0 35.355 9.764 9.764 25.592 9.764 35.355 0l42.175-42.174v291.289l-42.175-42.175c-9.764-9.764-25.592-9.764-35.355 0s-9.763 25.593 0 35.355l84.853 84.853c4.881 4.882 11.279 7.322 17.677 7.322s12.796-2.44 17.678-7.322l84.853-84.853c9.763-9.763 9.763-25.593 0-35.355-9.764-9.763-25.593-9.763-35.356 0"})}),[E.FILTERS_NAMES.license]:a.Z,[E.FILTERS_NAMES.resolution]:l.Z,[E.FILTERS_NAMES.fps]:e=>(0,i.jsxs)("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 512 512",width:16,height:16,"aria-hidden":!0,...e,children:[(0,i.jsxs)("g",{fill:"currentColor",clipPath:"url(#fps_svg__a)",children:[(0,i.jsx)("path",{d:"M25 302c-13.81 0-25-11.19-25-25V65C0 29.16 29.16 0 65 0h242c13.81 0 25 11.19 25 25s-11.19 25-25 25H65c-8.27 0-15 6.73-15 15v212c0 13.81-11.19 25-25 25"}),(0,i.jsx)("path",{fillRule:"evenodd",d:"M447 512H245c-35.84 0-65-29.16-65-65V275c0-35.84 29.16-65 65-65h202c35.84 0 65 29.16 65 65v172c0 35.84-29.16 65-65 65M245 260c-8.27 0-15 6.73-15 15v172c0 8.27 6.73 15 15 15h202c8.27 0 15-6.73 15-15V275c0-8.27-6.73-15-15-15z",clipRule:"evenodd"}),(0,i.jsx)("path",{d:"M90 382c0 13.81 11.19 25 25 25s25-11.19 25-25V170c0-8.27 6.73-15 15-15h242c13.81 0 25-11.19 25-25s-11.19-25-25-25H155c-35.84 0-65 29.16-65 65z"})]}),(0,i.jsx)("defs",{children:(0,i.jsx)("clipPath",{id:"fps_svg__a",children:(0,i.jsx)("path",{d:"M0 0h512v512H0z"})})})]}),[E.FILTERS_NAMES.topic]:e=>(0,i.jsx)("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"-49 141 512 512",width:16,height:16,"aria-hidden":!0,...e,children:(0,i.jsx)("path",{d:"M127 372H31c-30.327 0-55-24.673-55-55v-96c0-30.327 24.673-55 55-55h96c30.327 0 55 24.673 55 55v96c0 30.327-24.673 55-55 55M31 216c-2.757 0-5 2.243-5 5v96c0 2.757 2.243 5 5 5h96c2.757 0 5-2.243 5-5v-96c0-2.757-2.243-5-5-5zm352 156h-96c-30.327 0-55-24.673-55-55v-96c0-30.327 24.673-55 55-55h96c30.327 0 55 24.673 55 55v96c0 30.327-24.673 55-55 55m-96-156c-2.757 0-5 2.243-5 5v96c0 2.757 2.243 5 5 5h96c2.757 0 5-2.243 5-5v-96c0-2.757-2.243-5-5-5zM127 628H31c-30.327 0-55-24.673-55-55v-96c0-30.327 24.673-55 55-55h96c30.327 0 55 24.673 55 55v96c0 30.327-24.673 55-55 55M31 472c-2.757 0-5 2.243-5 5v96c0 2.757 2.243 5 5 5h96c2.757 0 5-2.243 5-5v-96c0-2.757-2.243-5-5-5zm352 156h-96c-30.327 0-55-24.673-55-55v-96c0-30.327 24.673-55 55-55h96c30.327 0 55 24.673 55 55v96c0 30.327-24.673 55-55 55m-96-156c-2.757 0-5 2.243-5 5v96c0 2.757 2.243 5 5 5h96c2.757 0 5-2.243 5-5v-96c0-2.757-2.243-5-5-5z"})}),[E.FILTERS_NAMES.videoType]:e=>(0,i.jsxs)("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 512 512",width:16,height:16,"aria-hidden":!0,...e,children:[(0,i.jsx)("path",{d:"M422 25H90c-35.8 0-65 29.2-65 65v332c0 35.8 29.2 65 65 65h332c35.8 0 65-29.2 65-65V90c0-35.8-29.2-65-65-65m15 397c0 8.3-6.7 15-15 15H90c-8.3 0-15-6.7-15-15V90c0-8.3 6.7-15 15-15h332c8.3 0 15 6.7 15 15z"}),(0,i.jsx)("path",{d:"M175 226c28.1 0 51-22.9 51-51s-22.9-51-51-51-51 22.9-51 51 22.9 51 51 51m0-52c.6 0 1 .4 1 1s-.4 1-1 1-1-.4-1-1 .4-1 1-1M312 225h50c13.8 0 25-11.2 25-25v-50c0-13.8-11.2-25-25-25h-50c-13.8 0-25 11.2-25 25v50c0 13.8 11.2 25 25 25M191.7 282.3c-9.8-9.8-25.6-9.8-35.4 0l-35 35c-9.8 9.8-9.8 25.6 0 35.4l35 35c4.9 4.9 11.3 7.3 17.7 7.3s12.8-2.4 17.7-7.3l35-35c9.8-9.8 9.8-25.6 0-35.4zM358.2 292.8c-4.6-7.3-12.6-11.8-21.2-11.8s-16.6 4.4-21.2 11.8l-35 56c-4.8 7.7-5.1 17.4-.7 25.4 4.4 7.9 12.8 12.9 21.9 12.9h70c9.1 0 17.5-4.9 21.9-12.9 4.4-7.9 4.2-17.7-.7-25.4z"})]}),[E.FILTERS_NAMES.duration]:e=>(0,i.jsxs)("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"-49 141 512 512",width:16,height:16,"aria-hidden":!0,...e,children:[(0,i.jsx)("path",{d:"M207 653c-68.38 0-132.667-26.629-181.02-74.98C-22.371 529.667-49 465.38-49 397s26.629-132.667 74.98-181.02C74.333 167.629 138.62 141 207 141s132.667 26.629 181.02 74.98C436.371 264.333 463 328.62 463 397s-26.629 132.667-74.98 181.02C339.667 626.371 275.38 653 207 653m0-462C93.411 191 1 283.411 1 397s92.411 206 206 206 206-92.411 206-206-92.411-206-206-206"}),(0,i.jsx)("path",{d:"M217.129 271.5c-13.807 0-25 11.193-25 25v96.566L108.5 441.35c-11.958 6.903-16.725 22.606-9.15 34.15 8.775 13.375 22.4 14.875 34.15 9.15l96.129-55.5.059-.037c7.438-4.331 12.441-12.385 12.441-21.613v-111c0-13.807-11.193-25-25-25"})]}),[E.FILTERS_NAMES.color]:s.Z,[E.FILTERS_NAMES.shape]:e=>(0,i.jsxs)("svg",{xmlns:"http://www.w3.org/2000/svg",width:16,height:16,viewBox:"0 0 17 14","aria-hidden":!0,...e,children:[(0,i.jsx)("path",{fillRule:"evenodd",d:"M14.462 13.408a.55.55 0 0 1-.254-.063l-2.873-1.499-2.873 1.5a.55.55 0 0 1-.577-.042.54.54 0 0 1-.218-.532l.55-3.175L5.891 7.35a.54.54 0 0 1 .304-.927l3.211-.464 1.437-2.888a.548.548 0 0 1 .982 0l1.436 2.888 3.212.464a.54.54 0 0 1 .304.927l-2.324 2.248.548 3.175a.542.542 0 0 1-.54.636Z",clipRule:"evenodd"}),(0,i.jsx)("path",{fillRule:"evenodd",d:"M9.732 12.125a.6.6 0 0 1-.283-.07l-3.197-1.668-3.198 1.669a.61.61 0 0 1-.642-.046.6.6 0 0 1-.242-.592l.61-3.534L.195 5.382A.602.602 0 0 1 .532 4.35l3.574-.516L5.705.62a.61.61 0 0 1 1.093 0l1.599 3.215 3.575.516a.602.602 0 0 1 .338 1.032L9.722 7.884l.61 3.534a.603.603 0 0 1-.6.707M6.252 9.1q.148 0 .283.07l2.388 1.245-.456-2.639a.6.6 0 0 1 .175-.535l1.932-1.87-2.67-.384a.61.61 0 0 1-.459-.331L6.251 2.254 5.058 4.655a.61.61 0 0 1-.46.33l-2.669.386L3.861 7.24c.143.139.209.34.175.535l-.456 2.64 2.388-1.247a.6.6 0 0 1 .283-.07Z",clipRule:"evenodd"})]}),[E.FILTERS_NAMES.aspectRatio]:n.Z,[E.FILTERS_NAMES.fileType]:c.Z,[E.FILTERS_NAMES.freeSvg]:a.Z,[E.FILTERS_NAMES.editableStroke]:S.Z,[E.FILTERS_NAMES.iconType]:u.Z};var p=r(84540),m=r(64282),h=r(68834),f=r(43096),_=r(51958)},41382:function(e,t,r){r.d(t,{Q:function(){return n}});var o=r(22393);let n=e=>e in o.y},46669:function(e,t,r){r.d(t,{n:function(){return l}});var o=r(22393),n=r(41382);let l=(e,t)=>{if(!(0,n.Q)(e)||!("values"in o.y[e]))return t;let r=o.y[e].values;return t in r?r[t]:t}},51958:function(e,t,r){r.d(t,{tv:function(){return l},Z1:function(){return i},nO:function(){return a.n},iD:function(){return c}});var o=r(22393),n=r(41382);let l=e=>{var t;return(0,n.Q)(e)?null===(t=o.y[e])||void 0===t?void 0:t.tooltip:e},i=e=>(0,n.Q)(e)?o.y[e].title:e;var a=r(46669);let c=(e,t)=>t&&"relevance"===e?"searchBar:mostRelevant":(0,a.n)("sort",e)},7753:function(e,t,r){var o=r(97458);t.Z=e=>(0,o.jsx)("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 512 512",width:16,height:16,"aria-hidden":!0,...e,children:(0,o.jsx)("path",{d:"M437 137.4h-62.4V75c0-35.84-29.16-65-65-65H75c-35.84 0-65 29.16-65 65v362c0 35.84 29.16 65 65 65h362c35.84 0 65-29.16 65-65V202.4c0-35.84-29.16-65-65-65M75 60h234.6c8.27 0 15 6.73 15 15v62.4H75c-5.16 0-10.18.62-15 1.77V75c0-8.27 6.73-15 15-15m0 392c-1.03 0-2.04-.11-3.02-.31C65.15 450.29 60 444.23 60 437V202.4c0-8.27 6.73-15 15-15h249.6V437c0 8.27-6.73 15-15 15zm377-15c0 8.27-6.73 15-15 15h-64.17c1.14-4.82 1.77-9.84 1.77-15V187.4H437c8.27 0 15 6.73 15 15z"})})},7959:function(e,t,r){var o=r(97458);t.Z=e=>(0,o.jsx)("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"-49 141 512 512",width:16,height:16,"aria-hidden":!0,...e,children:(0,o.jsx)("path",{d:"M452.093 315.351a25 25 0 0 0-23.203-2.632L348 344.372V336c0-30.327-24.673-55-55-55h-53.596l-52.606-78.872A25 25 0 0 0 166 191H-24c-13.807 0-25 11.193-25 25s11.193 25 25 25h176.624l26.679 40H6c-30.327 0-55 24.673-55 55v212c0 30.327 24.673 55 55 55h287c30.327 0 55-24.673 55-55v-8.372l80.89 31.653A25 25 0 0 0 463 548V336a25 25 0 0 0-10.907-20.649M413 511.372l-80.89-31.653A25 25 0 0 0 298 503v45c0 2.757-2.243 5-5 5H6c-2.757 0-5-2.243-5-5V336c0-2.757 2.243-5 5-5h287c2.757 0 5 2.243 5 5v45a25 25 0 0 0 34.11 23.281L413 372.628z"})})},83598:function(e,t,r){var o=r(97458);t.Z=e=>(0,o.jsx)("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"-49 141 512 512",width:16,height:16,"aria-hidden":!0,...e,children:(0,o.jsx)("path",{d:"m242.355 397 127.987-127.987c9.763-9.763 9.763-25.592 0-35.355s-25.592-9.763-35.355 0L207 361.644 79.013 233.658c-9.764-9.763-25.592-9.763-35.355 0s-9.763 25.592 0 35.355l127.986 127.986L43.658 524.986c-9.763 9.763-9.763 25.592 0 35.355s25.592 9.763 35.355 0l127.986-127.986 127.987 127.987c9.764 9.763 25.592 9.763 35.355 0s9.763-25.592 0-35.355z"})})},88295:function(e,t,r){var o=r(97458);t.Z=e=>(0,o.jsx)("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"-49 141 512 512",width:16,height:16,"aria-hidden":!0,...e,children:(0,o.jsx)("path",{d:"M428 216a24.9 24.9 0 0 0-16.773 6.462l-93.73 84.821-93.729-84.82c-9.523-8.617-24.026-8.618-33.55.001l-93.723 84.818s-94.847-85.773-94.957-85.86A24.9 24.9 0 0 0-14 216c-13.808 0-25 11.193-25 25v272c0 35.841 29.159 65 65 65h362c35.841 0 65-29.159 65-65V241c0-13.807-11.192-25-25-25m-40 312H26c-8.271 0-15-6.729-15-15V297.344l68.72 62.192c9.521 8.617 24.027 8.618 33.551 0l93.723-84.819 93.729 84.82c4.761 4.309 10.768 6.463 16.774 6.463s12.014-2.154 16.774-6.464L403 297.34V513c0 8.272-6.729 15-15 15"})})},58785:function(e,t,r){var o=r(97458);t.Z=e=>(0,o.jsxs)("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"-49 141 512 512",width:16,height:16,"aria-hidden":!0,...e,children:[(0,o.jsx)("path",{d:"M207 653c-68.38 0-132.668-26.629-181.02-74.98C-22.371 529.667-49 465.38-49 397s26.629-132.667 74.98-181.02C74.332 167.629 138.62 141 207 141s132.668 26.629 181.02 74.98C436.371 264.333 463 328.62 463 397s-26.629 132.667-74.98 181.02C339.668 626.371 275.38 653 207 653m0-462C93.411 191 1 283.411 1 397s92.411 206 206 206 206-92.411 206-206-92.411-206-206-206"}),(0,o.jsx)("path",{d:"M207 473c-13.807 0-25-11.193-25-25V256c0-13.807 11.193-25 25-25s25 11.193 25 25v192c0 13.807-11.193 25-25 25m0 80c-16.542 0-30-13.458-30-30s13.458-30 30-30 30 13.458 30 30-13.458 30-30 30"})]})},22538:function(e,t,r){var o=r(97458);t.Z=e=>(0,o.jsx)("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"-49 141 512 512",width:16,height:16,"aria-hidden":!0,...e,children:(0,o.jsx)("path",{d:"m405.678 258.322-100-100A25 25 0 0 0 288 151H66c-35.841 0-65 29.159-65 65v362c0 35.841 29.159 65 65 65h282c35.841 0 65-29.159 65-65V276a25 25 0 0 0-7.322-17.678M348 593H66c-8.271 0-15-6.729-15-15V216c0-8.271 6.729-15 15-15h197v75c0 13.808 11.192 25 25 25h75v277c0 8.271-6.729 15-15 15"})})},55111:function(e,t,r){var o=r(97458);t.Z=e=>(0,o.jsxs)("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"-49 141 512 512",width:16,height:16,"aria-hidden":!0,...e,children:[(0,o.jsx)("path",{d:"M167.089 650.914c-4.536 0-9.105-.476-13.645-1.441-56.47-12.026-107.823-43.382-144.599-88.29C-28.457 515.63-49 458.063-49 399.088c0-68.289 26.568-132.516 74.81-180.849 48.235-48.325 112.398-75.014 180.669-75.151l.517-.001c140.513 0 255.305 114.153 256 254.707q.01 2.073-.012 4.143c-.358 32.797-13.529 63.552-37.085 86.599-23.434 22.927-54.399 35.553-87.193 35.553H267c-19.299 0-35 15.701-35 35v26.805c0 19.708-8.786 38.123-24.105 50.523-11.715 9.482-26.076 14.497-40.806 14.497m39.907-457.827h-.417C93.223 193.314 1 285.726 1 399.088c0 96.65 68.492 181.385 162.858 201.48 6.102 1.303 10.498-1.332 12.578-3.016 2.078-1.682 5.564-5.434 5.564-11.66v-26.805c0-46.869 38.131-85 85-85h71.706c40.521 0 73.844-32.612 74.281-72.698v-.002q.018-1.668.01-3.343c-.559-113.096-92.941-204.957-206.001-204.957"}),(0,o.jsx)("path",{d:"M71 429.088c-16.542 0-30-13.458-30-30s13.458-30 30-30 30 13.458 30 30-13.458 30-30 30m136-136c-16.542 0-30-13.458-30-30s13.458-30 30-30 30 13.458 30 30-13.458 30-30 30m96.151 39.849c-16.542 0-30-13.458-30-30s13.458-30 30-30 30 13.458 30 30-13.458 30-30 30m-192.302 0c-16.542 0-30-13.458-30-30s13.458-30 30-30 30 13.458 30 30-13.458 30-30 30"})]})},43585:function(e,t,r){var o=r(97458);t.Z=e=>(0,o.jsx)("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"-49 141 512 512",width:16,height:16,"aria-hidden":!0,...e,children:(0,o.jsx)("path",{d:"M437.838 214.25h-200c-13.807 0-25 11.193-25 25v59.933L142.151 176.75a25 25 0 0 0-43.3 0l-144.339 250a25 25 0 0 0 21.651 37.5h121.15a135 135 0 0 0-3.475 30.5c0 74.439 60.561 135 135 135s135-60.561 135-135c0-10.486-1.202-20.696-3.475-30.5h77.475c13.807 0 25-11.193 25-25v-200c0-13.807-11.193-25-25-25m-418.374 200 101.037-175 72.383 125.369c-29.306 8.107-54.642 25.865-72.352 49.631zm209.374 165.5c-46.869 0-85-38.131-85-85s38.131-85 85-85 85 38.131 85 85-38.131 85-85 85m184-165.5h-75.693c-18.103-24.293-44.173-42.314-74.307-50.161V264.25h150z"})})},97837:function(e,t,r){var o=r(97458);t.Z=e=>(0,o.jsx)("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 512 512",width:16,height:16,"aria-hidden":!0,...e,children:(0,o.jsx)("path",{d:"M474 268.1H39c-20.7 0-37.5-16.8-37.5-37.5s16.8-37.5 37.5-37.5h435c20.7 0 37.5 16.8 37.5 37.5s-16.8 37.5-37.5 37.5M462 433.4H50c-27.6 0-50-22.4-50-50s22.4-50 50-50h412c27.6 0 50 22.4 50 50s-22.4 50-50 50M486.3 128.6H26.5c-13.8 0-25-11.2-25-25s11.2-25 25-25h459.8c13.8 0 25 11.2 25 25s-11.2 25-25 25"})})},90602:function(e,t,r){r.d(t,{C:function(){return n},y8:function(){return o}});let o=[...Object.values({ai:"AI_SEARCH",deviceLimitBlock:"DEVICE_LIMIT_BLOCK",removeBackground:"REMOVE_BACKGROUND",unity:"UNITY",SIDEBAR:"SIDEBAR",BRAZE:"BRAZE",CREDITS:"CREDITS",devHubBillingHistory:"DEV_HUB_BILLING_HISTORY",darkMode:"DARK_MODE",bgRemover:"BG_REMOVER_WITH_IMAGE_RESIZING",iconAiGenerator:"ICON_AI_GENERATOR",pinCreation:"PIN_CREATION",iconAnimatedEditor:"ICON_ANIMATED_EDITOR",newSearchByImage:"NEW_SEARCH_BY_IMAGE",newTalkSales:"NEW_TALK_SALES",changeEthnicity:"CHANGE_ETHNICITY",campaigns:"CAMPAIGNS"}),...Object.values({test:"TEST_ENABLED"})],n={AI_SEARCH:!0,DEVICE_LIMIT_BLOCK:!0,REMOVE_BACKGROUND:!1,UNITY:!1,SIDEBAR:!1,BRAZE:!1,CREDITS:!0,DEV_HUB_BILLING_HISTORY:!0,DARK_MODE:!1,BG_REMOVER_WITH_IMAGE_RESIZING:!0,ICON_AI_GENERATOR:!0,ICON_ANIMATED_EDITOR:!0,PIN_CREATION:!0,NEW_SEARCH_BY_IMAGE:!0,NEW_TALK_SALES:!1,CHANGE_ETHNICITY:!0,CAMPAIGNS:!1}},3553:function(e,t,r){r.d(t,{vF:function(){return S},du:function(){return f},Kg:function(){return E.K},Lx:function(){return p},RN:function(){return m},Aw:function(){return d.A}});var o=r(7616),n=r(52983),l=r(90602),i=r(60943);let a=async()=>{s();let e=c();return u(l.C,e)},c=()=>l.y8.reduce((e,t)=>(e[t]=localStorage.getItem(t),e),{}),s=()=>{let e=new URLSearchParams(window.location.search);e.has("ff")&&e.getAll("ff").forEach(e=>{let t=l.y8.find(t=>t===e);t&&localStorage.setItem(t,"1")})},u=(e,t,r)=>{let o=l.y8.reduce((e,r)=>(null!=t[r]&&(e[r]="1"===t[r]),e),{});return{...i.Rk,...e,...r,...o}},S=()=>{let e=(0,n.useRef)(!1),t=(0,o.b9)(i.uA);return(0,n.useEffect)(()=>{e.current||(a().then(e=>{t(e)}),e.current=!0)},[t]),null};r(18189);var E=r(93827),d=r(45634);let p=()=>(0,d.A)("ICON_AI_GENERATOR"),m=()=>(0,d.A)("BG_REMOVER_WITH_IMAGE_RESIZING"),h=new Set(["ai"]),f=e=>h.has(e)},60943:function(e,t,r){r.d(t,{Rk:function(){return a},do:function(){return c},uA:function(){return i}});var o=r(24399),n=r(73139),l=r(90602);let i=(0,o.cn)(null),a=l.y8.reduce((e,t)=>(e[t]=!1,e),{});(0,o.cn)(e=>null!==e(i));let c=(0,n.xu)(e=>(0,o.cn)(t=>{var r;return(null===(r=t(i))||void 0===r?void 0:r[e])===!0}))},18189:function(e,t,r){r.d(t,{W:function(){return l}});var o=r(83648),n=r(52983);let l=(e,t)=>{let{query:r}=(0,o.useRouter)();(0,n.useEffect)(()=>{void 0!==r[e]&&localStorage.setItem(t,"1")},[t,r,e])}},93827:function(e,t,r){r.d(t,{K:function(){return n}});var o=r(45634);let n=()=>(0,o.A)("CREDITS")},45634:function(e,t,r){r.d(t,{A:function(){return l}});var o=r(7616),n=r(60943);let l=e=>(0,o.Dv)((0,n.do)(e))},48496:function(e,t,r){r.d(t,{t:function(){return a}});var o=r(7616),n=r(52983),l=r(47153),i=r(21595);let a=()=>{let e=(0,o.b9)(i.Qq);return(0,n.useCallback)(t=>{l.s.set(t),e(t)},[e])}},41286:function(e,t,r){r.d(t,{Q:function(){return S}});var o=r(52983),n=r(93827),l=r(11032),i=r(46587),a=r(59181),c=r(61647);let s=async e=>{try{let t=await fetch("".concat(a.m,"/api/user/wallet/").concat(e),(0,i.S)());if(!t.ok)throw Error("Error fetching user wallet");let r=await t.json();return(0,c.Me)(r)}catch(e){throw e&&e instanceof Error&&console.error(JSON.stringify({fatal_error:e.message})),Error("Error fetching user wallet")}};var u=r(48496);let S=e=>{let t=(0,u.t)(),r=(0,n.K)();return(0,o.useCallback)(async()=>{try{let e=l.f.get();if(!r||!(null==e?void 0:e.wallet_id))return;let o=await s(e.wallet_id);t(o)}catch(t){e&&e()}},[r,e,t])}},61647:function(e,t,r){r.d(t,{HG:function(){return n},Me:function(){return s},dM:function(){return l}});var o=r(1850);let n={ANONYMOUS:"ANONYMOUS",REGISTERED:"REGISTERED","BASIC-M":"BASIC-M","BASIC-Y":"BASIC-Y","PREMIUMT-M":"PREMIUMT-M","PREMIUMT-Y":"PREMIUMT-Y","MAGNIFIC-M":"MAGNIFIC-M","MAGNIFIC-Y":"MAGNIFIC-Y"},l={ACTIVE:"active",UNPAID:"unpaid",FROZEN:"frozen",CANCELLED:"cancelled"},i=o.z.object({can_access_to_addons:o.z.boolean(),can_access_to_checkout:o.z.boolean(),can_create_team:o.z.boolean(),can_downgrade_product:o.z.boolean(),can_download_resource_premium:o.z.boolean(),can_upgrade_frequency:o.z.boolean(),can_upgrade_product:o.z.boolean(),can_use_ia:o.z.boolean(),has_subscriptions:o.z.boolean(),is_anonymous:o.z.boolean(),is_enterprise:o.z.boolean(),is_from_coupon:o.z.boolean(),is_owner_teams:o.z.boolean(),is_teams:o.z.boolean(),is_whitelist:o.z.boolean()}).transform(e=>({canAccessToAddons:e.can_access_to_addons,canAccessToCheckout:e.can_access_to_checkout,canCreateTeam:e.can_create_team,canDowngradeProduct:e.can_downgrade_product,canDownloadResourcePremium:e.can_download_resource_premium,canUpgradeFrequency:e.can_upgrade_frequency,canUpgradeProduct:e.can_upgrade_product,canUseIA:e.can_use_ia,hasSubscriptions:e.has_subscriptions,isAnonymous:e.is_anonymous,isEnterprise:e.is_enterprise,isFromCoupon:e.is_from_coupon,isOwnerTeams:e.is_owner_teams,isTeams:e.is_teams,isWhitelist:e.is_whitelist})),a=o.z.object({"freepik-remove-bg":o.z.number().optional().default(0),"freepik-tools-integration-remove-bg":o.z.number().optional().default(0),"freepik-tools-integration-ethnicity":o.z.number().optional().default(0),"freepik-icons-generation":o.z.number().optional().default(0),"freepik-icons-svgdownload":o.z.number().optional().default(0)}).transform(e=>({removeBackground:e["freepik-remove-bg"],removeBackgroundIntegrationTool:e["freepik-tools-integration-remove-bg"],iconGeneration:e["freepik-icons-generation"],iconGenerationSvgDownload:e["freepik-icons-svgdownload"],ethnicityIntegrationTool:e["freepik-tools-integration-ethnicity"]})),c=o.z.preprocess(e=>void 0===n[e]?(console.error("Unknown product: ".concat(e,", defaulting to REGISTERED")),n.REGISTERED):e,o.z.nativeEnum(n));o.z.object({wallet_id:o.z.string(),status:o.z.nativeEnum(l),credits_available:o.z.number(),total_credits_of_plan:o.z.number(),total_credits_available:o.z.number(),credits_addons_available:o.z.number(),product:c,spend_per_tool:a,permissions:i,auto_refill:o.z.boolean(),addons_exiration_date:o.z.string().nullable()}).transform(e=>{let{wallet_id:t,credits_available:r,total_credits_of_plan:o,total_credits_available:n,credits_addons_available:l,product:i,auto_refill:a,addons_exiration_date:c,spend_per_tool:s,permissions:u,status:S}=e;return{status:S,walletId:t,autoRefill:a,creditsAddonsAvailable:l,creditsAvailable:r,totalCreditsAvailable:n,totalCreditsOfPlan:o,addonsExpirationDate:c,product:i,permissions:u,spendPerTool:s}});let s=e=>o.z.object({walletId:o.z.string(),status:o.z.nativeEnum(l),autoRefill:o.z.boolean(),creditsAddonsAvailable:o.z.number(),creditsAvailable:o.z.number(),totalCreditsAvailable:o.z.number(),totalCreditsOfPlan:o.z.number(),addonsExpirationDate:o.z.string().nullable(),product:c,permissions:o.z.object({canAccessToAddons:o.z.boolean().optional().default(!1),canAccessToCheckout:o.z.boolean().optional().default(!1),canCreateTeam:o.z.boolean().optional().default(!1),canDowngradeProduct:o.z.boolean().optional().default(!1),canDownloadResourcePremium:o.z.boolean().optional().default(!1),canUpgradeFrequency:o.z.boolean().optional().default(!1),canUpgradeProduct:o.z.boolean().optional().default(!1),canUseIa:o.z.boolean().optional().default(!1),canUseIA:o.z.boolean().optional().default(!1),hasSubscriptions:o.z.boolean().optional().default(!1),isAnonymous:o.z.boolean().optional().default(!1),isEnterprise:o.z.boolean().optional().default(!1),isFromCoupon:o.z.boolean().optional().default(!1),isOwnerTeams:o.z.boolean().optional().default(!1),isTeams:o.z.boolean().optional().default(!1),isWhitelist:o.z.boolean().optional().default(!1)}).transform(e=>({...e,canUseIA:e.canUseIa||e.canUseIA})),spendPerTool:o.z.object({removeBackground:o.z.number(),removeBackgroundIntegrationTool:o.z.number(),iconGeneration:o.z.number(),iconGenerationSvgDownload:o.z.number(),ethnicityIntegrationTool:o.z.number()}),storedAt:o.z.number().optional()}).parse(e)},47153:function(e,t,r){r.d(t,{s:function(){return l}});var o=r(61647);let n="user/wallet",l={get:()=>{try{let e=localStorage.getItem(n);if(!e)return null;let t=JSON.parse(e);return(0,o.Me)(t)}catch(e){return console.error("Something went wrong while getting the user wallet",e),null}},set:e=>{e.storedAt=Date.now(),localStorage.setItem(n,JSON.stringify(e))},remove:()=>{localStorage.removeItem(n)}}},21595:function(e,t,r){r.d(t,{Nf:function(){return c},O7:function(){return a},Qq:function(){return l},UH:function(){return s},_5:function(){return i}});var o=r(24399),n=r(41843);let l=(0,o.cn)(null),i=(0,o.cn)(e=>{let t=e(l);return t?t.product:null}),a=(0,o.cn)(e=>{let t=e(l);return t?t.status:null}),c=(0,o.cn)(e=>{var t,r;let o=e(n.Zn),i=o&&"id"in o?o:null,a=e(l);return null!==(r=null!==(t=null==i?void 0:i.wallet_id)&&void 0!==t?t:null==a?void 0:a.walletId)&&void 0!==r?r:null}),s=(0,o.cn)(e=>{let t=e(l);if(!t)return!1;let{totalCreditsAvailable:r,totalCreditsOfPlan:o}=t;return 0===r&&o>0})},42011:function(e,t,r){r.d(t,{d:function(){return l}});var o=r(7616),n=r(41843);let l=()=>!!(0,o.Dv)(n.PQ)},26305:function(e,t,r){r.d(t,{J$:function(){return u},WH:function(){return S},fs:function(){return c},nW:function(){return l}});var o=r(1850);let n={a:"avatar",cce:"cc_will_expire",d:"downloads",dr:"download_limit_renew",e:"email",fbfi:"first_buy_fr",id:"id",l:"login",ld:"limit_downloads",nl:"newsletter",pm:"premium",pmt:"premiumtest",rcfi:"renewal_canceled_flaticon",rcfp:"renewal_canceled_freepik",rcpp:"renewal_canceled_plus",rn:"real_name",ug:"user_age",utfi:"user_type_fi",utfr:"user_type_fr",pch:"purchases",w:"wallet_id",cid:"creator_id",cn:"creator_name"},l=Object.entries(n).reduce((e,t)=>{let[r,o]=t;return{...e,[o]:r}},{}),i=o.z.object({id:o.z.string(),status:o.z.string(),product:o.z.string()}),a=o.z.object({avatar:o.z.string().optional().nullable(),email:o.z.string(),id:o.z.number(),login:o.z.string(),real_name:o.z.string().nullable(),premium:o.z.boolean().default(!1),premiumtest:o.z.boolean().default(!1),cc_will_expire:o.z.boolean().default(!1),downloads:o.z.number(),renewal_canceled_freepik:o.z.boolean().default(!1),renewal_canceled_flaticon:o.z.boolean().default(!1),renewal_canceled_plus:o.z.boolean().default(!1),limit_downloads:o.z.number(),user_age:o.z.string().optional(),user_type_fr:o.z.string().optional(),newsletter:o.z.boolean().default(!1),download_limit_renew:o.z.number().optional().nullable(),purchases:o.z.array(i).optional(),wallet_id:o.z.string().optional().nullable(),creator_id:o.z.number().optional().nullable(),creator_name:o.z.string().optional().nullable()}),c=o.z.object({success:o.z.literal(!0),data:a,csrfToken:o.z.string()}).transform(e=>{let{data:t}=e;return t});o.z.object({data:o.z.array(i),csrfToken:o.z.string().optional()}).transform(e=>{let{data:t}=e;return t});let s=Object.keys(a.shape).reduce((e,t)=>({...e,[l[t]]:a.shape[t]}),{}),u=o.z.object(s).transform(e=>Object.entries(e).reduce((e,t)=>{let[r,o]=t;return{...e,[n[r]]:o}},{})),S=o.z.object({expiry:o.z.number().refine(e=>e>Date.now()),value:o.z.string()})},11032:function(e,t,r){r.d(t,{f:function(){return a}});var o=r(26305);let n="session/user",l="downloads/consumed",i="downloads/limit",a=(()=>{let e;let t=()=>{let t=Date.now();return e&&e.expiry>t?e.value:null},r=()=>{try{let t=localStorage.getItem(n);if(!t)return null;let r=o.WH.parse(JSON.parse(t)),l=o.J$.parse(JSON.parse(r.value));return e={value:l,expiry:r.expiry},l}catch(e){return null}},a=()=>{var e;return null!==(e=t())&&void 0!==e?e:r()},c=t=>{if("id"in t){let r=Date.now()+36e5;e={value:t,expiry:r};let l=Object.keys(t).reduce((e,r)=>(e[o.nW[r]]=t[r],e),{});localStorage.setItem(n,JSON.stringify({value:JSON.stringify(l),expiry:r}))}localStorage.setItem(l,"".concat(t.downloads)),localStorage.setItem(i,"".concat(t.limit_downloads))};return{get:a,getValue:e=>{let t=a();return t?t[e]:null},remove:()=>{localStorage.removeItem(n),localStorage.removeItem(l),localStorage.removeItem(i),sessionStorage.removeItem("user/purchases")},set:c,update:e=>{let t=a();t&&c({...t,...e})}}})()}}]);