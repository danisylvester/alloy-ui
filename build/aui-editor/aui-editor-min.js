AUI.add("aui-editor-tools-plugin",function(B){var F=B.Lang,G="justify",E={div:true,h1:true,h2:true,h3:true,h4:true,h5:true,h6:true,p:true},C='<div style="text-align: {0};">{1}</div>';var D={};B.namespace("Plugin");B.mix(B.Plugin.ExecCommand.COMMANDS,{justify:function(J,I){var N=this;var O=N.get("host");var H=O.getInstance();var M=new H.Selection();var L=M.getSelected();var K=false;if(M.isCollapsed||!L.size()){var A=M.anchorTextNode;L=[A];K=true;}B.each(L,function(R){var P=R.get("tagName");var Q=R.ancestor();var S=null;if(P){P=P.toLowerCase();}if(!R.test("body")&&R.getComputedStyle("textAlign")==I){return;}if(E[P]||R.getComputedStyle("display")=="block"){S=R;}else{if(!Q.get("childNodes").item(1)){P=Q.get("tagName").toLowerCase();if(E[P]||Q.getComputedStyle("display")=="block"){S=Q;}}else{if(K){O.execCommand("inserthtml",F.sub(C,[I,H.Selection.CURSOR]));M.focusCursor(true,true);return;}else{S=B.Node.create(F.sub(C,[I,""]));Q.insert(S,R);S.append(R);}}}S.setStyle("textAlign",I);});},justifycenter:function(){var A=this;var H=A.get("host");return H.execCommand(G,"center");},justifyleft:function(){var A=this;var H=A.get("host");return H.execCommand(G,"left");},justifyright:function(){var A=this;var H=A.get("host");return H.execCommand(G,"right");},subscript:function(){var A=this;var H=A.get("host");return H.execCommand("wrap","sub");},superscript:function(){var A=this;var H=A.get("host");return H.execCommand("wrap","sup");},wraphtml:function(K,M){var A=this;var J=A.get("host");var L=J.getInstance();var I=new L.Selection();var H=I.getSelected();if(!I.isCollapsed&&H.size()){H.each(function(P){var O=P.ancestor();var Q=B.Node.create(M);if(Q.html()!=""){if(Q.html()=="{0}"){Q.html("");}else{function N(R){var S=null;var T=R.get("childNodes");T.some(function(U){if(U.get("innerHTML")=="{0}"){S.html("");S=U;return true;}return N(U);});if(S){Q=S;return true;}return false;}N(Q);}}O.insert(Q,P);Q.append(P);});}else{J.execCommand("inserthtml",F.sub(M,[L.Selection.CURSOR]));if(M.indexOf("{0}")!=-1){I.focusCursor(true,true);}}}});B.Plugin.EditorTools=D;},"@VERSION@",{requires:["aui-base","editor-base"]});AUI.add("aui-editor-menu-plugin",function(M){var D=M.Lang,K=D.isString,G=M.ClassNameManager.getClassName,F="editormenu",I="editormenuplugin",R="menu",E="content",B=G(F,E,"list"),N=G(F,E,"text"),C=G(F,E,"item"),H="<{1}{2}>{0}</{1}>",P='<ul class="'+B+'"></ul>',J='<li class="'+N+'"><span>{0}</span></li>',Q='<li class="'+C+'">'+H+"</li>";function O(T){var A="";if(T.attributes){for(var U in T.attributes){A+=" "+U+'="'+T.attributes[U]+'"';}}if(T.styles){A=' style="';for(var U in T.styles){A+=U+": "+T.styles[U]+";";}A+='"';}return A;}var L=M.Component.create({NAME:F,EXTENDS:M.OverlayContext,ATTRS:{headerContent:{value:"",setter:function(T){var A=this;A._headerContent=T;return"";}},host:{value:false},items:{value:null}},prototype:{renderUI:function(){var A=this;L.superclass.renderUI.apply(A,arguments);var Y=A.get("host");var U=A.get("contentBox");var W=A._headerContent;var V=A.get("items");var X=M.Node.create(P);M.each(V,function(b){var a="";if(K(b)){a+=D.sub(J,[b]);}else{var Z=O(b);a+=D.sub(Q,[b.label,b.tag,Z]);}var c=M.Node.create(a);c.setData(F,b);X.append(c);});var T=new M.Panel({collapsible:false,headerContent:W,icons:[{icon:"close",handler:{fn:A.hide,context:A}}]}).render(U);T.bodyNode.append(X);A._menuList=X;},bindUI:function(){var A=this;L.superclass.bindUI.apply(A,arguments);var U=A.get("host");var T=A._menuList;T.delegate("click",function(a){var W=this;var Z=a.currentTarget,Y=Z.getData(F);var V=O(Y),X=D.sub(H,["{0}",Y.tag,V]);U.execCommand("wraphtml",X);U.focus();W.hide();},"."+C,A);},_uiSetHeight:function(V){var A=this;var T=A.get("boundingBox");var U=A._menuList;T.setStyle("height","auto");U.setStyle("height",V);},_uiSetWidth:function(V){var A=this;var T=A.get("boundingBox");var U=A._menuList;T.setStyle("width","auto");U.setStyle("width",V);}}});var S=M.Component.create({NAME:I,NS:R,EXTENDS:M.Plugin.Base,ATTRS:{host:{value:false}},prototype:{add:function(T){var A=this;var U=A.get("host");return new L(M.mix({host:U},T)).render();}}});M.namespace("Plugin").EditorMenuPlugin=S;},"@VERSION@",{requires:["aui-base","editor-base","aui-overlay-context","aui-panel","aui-editor-tools-plugin"]});AUI.add("aui-editor-toolbar-plugin",function(R){var AB=R.Lang,T=AB.isFunction,w=R.ClassNameManager.getClassName,f="editortoolbar",z="toolbar",V="alignment",g="color",i="content",O="font",u="indent",J="input",k="insert",e="insertimage",l="list",v="mouseout",W="select",C="source",L="styles",r="subscript",q="text",s={backcolor:true,forecolor:true,format:true,insertimage:true,source:true,styles:true},Y=["b","big","font","em","i","small","s","strike","strong","sub","sup","u"],P=w("button","holder"),F=w("field","label"),S=w("field","label","secondary"),Q=w("field",J),X=w("field",J,"text"),AA=w("field",J,"numeric"),B=w(f,W,"fontname"),t=w(f,W,"fontsize"),G=w(f,C,"textarea"),D=w("state","active"),I=w(f),Z=w(f,i),n=w(f,e,i),K=w(f,e,i,"target"),p=w(f,e,i,"align"),H="<select>"+'<option value="">none</option>'+'<option value="1px solid">1px</option>'+'<option value="2px solid">2px</option>'+'<option value="3px solid">3px</option>'+'<option value="4px solid">4px</option>'+'<option value="5px solid">5px</option>'+"</select>",N="<a></a>",d="<img />",a='<input type="text" class="'+Q+" "+X+" "+AA+'" />',E='<textarea class="'+G+'"></textarea>',y='<div class="'+I+'"><div class="'+Z+'"></div></div>',x='<select class="'+B+'">{0}</select>',U='<option selected="selected"></option>'+"<option>Arial</option>"+"<option>Arial Black</option>"+"<option>Comic Sans MS</option>"+"<option>Courier New</option>"+"<option>Lucida Console</option>"+"<option>Tahoma</option>"+"<option>Times New Roman</option>"+"<option>Trebuchet MS</option>"+"<option>Verdana</option>",o='<select class="'+t+'">{0}</select>',h='<option selected="selected"></option>'+'<option value="1">10</option>'+'<option value="2">13</option>'+'<option value="3">16</option>'+'<option value="4">18</option>'+'<option value="5">24</option>'+'<option value="6">32</option>'+'<option value="7">48</option>';
function AC(A){return j(A)+'<input type="text" class="'+Q+" "+X+'" />';}function j(AD,A){return'<label class="'+F+(A?" "+A:"")+'">'+AD+"</label>";}function M(AE,AD){var A=new R.OverlayContext(R.merge({trigger:AE,showOn:"click",hideOn:"click",align:{node:AE,points:["tl","bl"]}},AD)).render();return A;}function c(AI,AF,AE,AJ){var AH=AF.button;var AD=AH.get("boundingBox");var A=new R.ColorPicker(R.merge({trigger:AD,align:{node:AD,points:["tl","bl"]}},AE));if(AE&&AE.plugins){for(var AG=0;AG<AE.plugins.length;AG++){A.plug(AE.plugins[AG],AE);}}A.render(R.getBody());A.on("colorChange",function(AM){var AK=this;var AL=A.get("rgb");AI.execCommand(AJ,AL.hex);AI.focus();});}var b=R.Component.create({NAME:f,NS:z,EXTENDS:R.Plugin.Base,ATTRS:{groups:{value:[{type:q},{type:V},{type:u},{type:l}]}},prototype:{initializer:function(){var AQ=this;var AS=AQ.get("host");var A=AS.frame.get("container");var AF=AQ.get("groups");var AH=R.Node.create(y);var AK=AH.one("."+Z);A.placeBefore(AH);var AP={boundingBox:AH,contentBox:AK};var AR=[];for(var AI=0;AI<AF.length;AI++){var AO=AF[AI];var AJ=GROUPS[AO.type];var AD=[];for(var AG=0;AG<AJ.children.length;AG++){if(!AJ.children[AG].select){AD.push(AJ.children[AG]);}}if(AD.length>0){var AN=new R.Toolbar(R.merge(AJ.config,AO.toolbar,{children:AD})).render(AK);AN.on("buttonitem:click",function(AV){var AU=this;var AT=AV.target.get("icon").split("-");if(!s[AT[0]]){AU.execCommand(AT[0],(AT[1]?AT[1]:""));AU.focus();}},AS);AR.push(AN);}var AM=AJ.generate;if(AM&&T(AM.init)){AM.init.call(AQ,AS,AP);}for(var AG=0;AG<AJ.children.length;AG++){var AL=AJ.children[AG].icon;if(AM&&T(AM[AL])){var AE=(AO.config?AO.config[AL]:null);AP.button=(AM[AL].select?null:AN.item(AG));AM[AL].call(AQ,AS,AP,AE);}}}AP.toolbars=AR;},_updateToolbar:function(A,AH){var AJ=this;if(A.changedNode){var AE=A.commands;var AK=AH.toolbars;if(AK){for(var AG=0;AG<AK.length;AG++){AK[AG].each(function(AM){var AN=false;if(AE[AM.get("icon")]){AN=true;}AM.StateInteraction.set("active",AN);});}}var AD=A.fontFamily;var AI=AH._fontNameOptions;var AL=A.fontSize;var AF=AH._fontSizeOptions;if(AI){AI.item(0).set("selected",true);AI.each(function(AM){var AN=AM.get("value").toLowerCase();if(AN===AD.toLowerCase()){AM.set("selected",true);}});}if(AF){AL=AL.replace("px","");AF.item(0).set("selected",true);AF.each(function(AN){var AO=AN.get("value").toLowerCase();var AM=AN.get("text");if(AM===AL){AN.set("selected",true);}});}}}}});b.STRINGS={ALIGN:"Align",ALIGN_BLOCK:"Block",ALIGN_LEFT:"Left",ALIGN_INLINE:"Inline",ALIGN_RIGHT:"Right",BACKCOLOR:"Background Color",BOLD:"Bold",BORDER:"Border",CREATE_LINK:"Create Link",DESCRIPTION:"Description",FORECOLOR:"Foreground Color",IMAGE_URL:"Image URL",INDENT:"Indent",INSERT:"Insert",INSERT_IMAGE:"Insert Image",INSERT_ORDERED_LIST:"Insert Numbered List",INSERT_UNORDERED_LIST:"Insert Bulleted List",ITALIC:"Italic",JUSTIFY_LEFT:"Justify Left",JUSTIFY_CENTER:"Justify Center",JUSTIFY_RIGHT:"Justify Right",LINK_URL:"Link URL",OPEN_IN_NEW_WINDOW:"Open in new window",OUTDENT:"Outdent",PADDING:"Padding",REMOVE_FORMAT:"Format Source",SIZE:"Size",SOURCE:"Source",SUBSCRIPT:"Subscript",SUPERSCRIPT:"Superscript",LINE_THROUGH:"Line Through",UNDERLINE:"Underline"};var m='<div class="'+n+'">'+"<ul>"+"<li>"+AC(b.STRINGS.IMAGE_URL)+"</li>"+"<li>"+j(b.STRINGS.SIZE)+a+"<span>x</span>"+a+"</li>"+"<li>"+j(b.STRINGS.PADDING)+a+j(b.STRINGS.BORDER,S)+H+"</li>"+"<li>"+j(b.STRINGS.ALIGN)+'<div class="'+p+'"></div>'+"</li>"+"<li>"+AC(b.STRINGS.DESCRIPTION)+"</li>"+"<li>"+AC(b.STRINGS.LINK_URL)+"</li>"+"</ul>"+'<span class="'+K+'"><input type="checkbox" /><label>'+b.STRINGS.OPEN_IN_NEW_WINDOW+"</label></span>"+'<div class="'+P+'"></div>'+"</div>";GROUPS=[];GROUPS[V]={children:[{icon:"justifyleft",title:b.STRINGS.JUSTIFY_LEFT},{icon:"justifycenter",title:b.STRINGS.JUSTIFY_CENTER},{icon:"justifyright",title:b.STRINGS.JUSTIFY_RIGHT}]};GROUPS[g]={children:[{icon:"forecolor",title:b.STRINGS.FORECOLOR},{icon:"backcolor",title:b.STRINGS.BACKCOLOR}],generate:{forecolor:function(AF,AE,AD){var A=this;c(AF,AE,AD,"forecolor");},backcolor:function(AF,AE,AD){var A=this;c(AF,AE,AD,"backcolor");}}},GROUPS[O]={children:[{icon:"fontname",select:true},{icon:"fontsize",select:true}],generate:{init:function(AF,AE){var A=this;var AD=AE.contentBox;R.delegate("change",function(AI){var AG=this;var AK=AI.currentTarget;var AH=AK.get("className");var AJ=AH.substring(AH.lastIndexOf("-")+1);var AL=AK.get("value");AF.execCommand(AJ,AL);AF.focus();},AD,"select");AF.after("nodeChange",function(AH){var AG=this;switch(AH.changedType){case"keyup":case"mousedown":AG._updateToolbar(AH,AE);break;}},A);},fontname:function(AI,AH,AG){var A=this;var AD=AH.contentBox;var AF=null;if(AG&&AG.optionHtml){AF=AB.sub(x,[AG.optionHtml]);}else{AF=AB.sub(x,[U]);}AD.append(AF);var AE=AD.all("."+B+" option");AH._fontNameOptions=AE;},fontsize:function(AI,AH,AG){var A=this;var AD=AH.contentBox;var AF=null;if(AG&&AG.optionHtml){AF=AB.sub(o,[AG.optionHtml]);}else{AF=AB.sub(o,[h]);}AD.append(AF);var AE=AD.all("."+t+" option");AH._fontSizeOptions=AE;}}};GROUPS[u]={children:[{icon:"indent",title:b.STRINGS.INDENT},{icon:"outdent",title:b.STRINGS.OUTDENT}]};GROUPS[k]={children:[{icon:"insertimage",title:b.STRINGS.INSERT_IMAGE},{icon:"createlink",title:b.STRINGS.CREATE_LINK}],generate:{insertimage:function(AK,AP,AE){var AQ=this;var AJ=AP.button;var AG=AJ.get("boundingBox");var AH=M(AG,AE);var AN=AH.get("contentBox");var A=new R.Panel({collapsible:false,headerContent:b.STRINGS.INSERT_IMAGE,icons:[{icon:"close",handler:{fn:AH.hide,context:AH}}]}).render(AN);AN=A.bodyNode;if(AE&&AE.dataBrowser){AE.dataBrowser.render(AN);}else{var AD=AK.getInstance();var AF=AK.frame._iframe;var AO=null;var AL=R.Node.create(m);AN.append(AL);var AR=AL.one("."+K+" input");var AM=new R.Toolbar({children:[{icon:"circle-check",label:b.STRINGS.INSERT}]});AM.item(0).on("click",function(AW){var AS=this;var AU=R.Node.create(N);var AT=R.Node.create(d);var AV=null;AL.all("input").each(function(Aa,AY){switch(AY){case 0:AT.attr("src",Aa.val());
break;case 1:var AZ=parseInt(Aa.val());if(!isNaN(AZ)){AT.attr("width",AZ);}break;case 2:var AX=parseInt(Aa.val());if(!isNaN(AX)){AT.attr("height",AX);}break;case 3:var Ab=parseInt(Aa.val());if(!isNaN(Ab)){AT.setStyle("padding",Ab+"px");}break;case 4:AT.attr("title",Aa.val());AT.attr("alt",Aa.val());break;case 5:AV=Aa.val();break;}});AL.all("select").each(function(AY,AX){switch(AX){case 0:AT.setStyle("border",AY.val());break;}});AI.some(function(AZ,AY){var AX=this;var Aa=AZ.StateInteraction.get("active");if(Aa){AT.setStyle("display","");switch(AY){case 0:AT.attr("align","left");break;case 1:AT.attr("align","");break;case 2:AT.attr("align","center");AT.setStyle("display","block");break;case 3:AT.attr("align","right");break;}return true;}});if(AV!=null){AU.attr("href",AV);if(AR.attr("checked")){AU.attr("target","_blank");}AU.append(AT);AT=AU;}if(AO&&AO.anchorNode){AO.anchorNode.append(AT);}AH.hide();},AQ);AM.render(AL.one("."+P));var AI=new R.Toolbar({activeState:true,children:[{icon:"align-left",title:b.STRINGS.ALIGN_LEFT},{icon:"align-inline",title:b.STRINGS.ALIGN_INLINE},{icon:"align-block",title:b.STRINGS.ALIGN_BLOCK},{icon:"align-right",title:b.STRINGS.ALIGN_RIGHT}]});AI.on("buttonitem:click",function(AU){var AS=this;var AT=AU.target;AS.each(function(AW){var AV=this;if(AW!=AT){AW.StateInteraction.set("active",false);}});});AI.render(AL.one("."+p));AH.on("hide",function(AT){var AS=this;AS.all("input").each(function(AV){var AU=this;AV.val("");});AS.all("select").each(function(AV){var AU=this;AV.attr("selectedIndex",0);});AI.each(function(AV){var AU=this;AV.StateInteraction.set("active",false);});AR.attr("checked",false);},AL);AF.on(v,function(AT){var AS=this;var AU=AS.getInstance();AO=new AU.Selection();},AK);}},createlink:function(AF,AE,AD){var A=this;AF.plug(R.Plugin.CreateLinkBase);}}};GROUPS[l]={children:[{icon:"insertunorderedlist",title:b.STRINGS.INSERT_UNORDERED_LIST},{icon:"insertorderedlist",title:b.STRINGS.INSERT_ORDERED_LIST}],generate:{init:function(AD){var A=this;AD.plug(R.Plugin.EditorLists);}}};GROUPS[C]={children:[{icon:"format",title:b.STRINGS.REMOVE_FORMAT},{icon:"source",title:b.STRINGS.SOURCE}],generate:{format:function(AG,AE,AD){var A=this;var AH=AG.frame;var AF=AE.button;AF.on("click",function(AL){var AI=this;var AM=AI.getInstance();var AK=new AM.Selection();var AJ=AK.getSelected();if(!AK.isCollapsed&&AJ.size()){AJ.each(function(AS){var AN=this;AS.removeAttribute("style");var AQ=AS.get("innerHTML");AQ=AQ.replace(/<([a-zA-Z0-9]*)\b[^>]*>/g,"<$1>");for(var AP=0;AP<Y.length;AP++){var AO=new RegExp("(<"+Y[AP]+">|<\\/"+Y[AP]+">)","ig");AQ=AQ.replace(AO,"");}AS.set("innerHTML",AQ);var AR=AS.get("parentNode");if(!AR.test("body")){AR.removeAttribute("style");}});}},AG);},source:function(AG,AJ,AE){var AK=this;var AD=AG.frame;var A=AD.get("container");var AH=AJ.contentBox;var AF=AJ.button;var AI=R.Node.create(E);AI.hide();A.append(AI);AF._visible=false;AF.on("click",function(AO){var AL=this;if(AF._visible){AG.set("content",AI.val());AI.hide();AI.val("");AD.show();}else{var AN=AD._iframe;AI.val(AG.getContent());var AM=(AN.get("offsetHeight")-parseInt(AI.getComputedStyle("paddingTop"))-parseInt(AI.getComputedStyle("paddingBottom")));AI.setStyle("height",AM+"px");AD.hide();AI.show();}AF._visible=!AF._visible;AH.all("select").attr("disabled",AF._visible);AH.all("button").attr("disabled",AF._visible);AF.get("contentBox").attr("disabled",false);},AG);}}};GROUPS[L]={children:[{icon:"styles"}],generate:{styles:function(AH,AF,AE){var A=this;var AG=AF.button;var AD=AG.get("boundingBox");AH.plug(R.Plugin.EditorMenuPlugin);AH.menu.add(R.merge({trigger:AD,showOn:"click",hideOn:"click",align:{node:AD,points:["tl","bl"]}},AE));}}};GROUPS[r]={children:[{icon:"subscript",title:b.STRINGS.SUBSCRIPT},{icon:"superscript",title:b.STRINGS.SUPERSCRIPT}]};GROUPS[q]={children:[{icon:"bold",title:b.STRINGS.BOLD},{icon:"italic",title:b.STRINGS.ITALIC},{icon:"underline",title:b.STRINGS.UNDERLINE},{icon:"strikethrough",title:b.STRINGS.LINE_THROUGH}]};R.namespace("Plugin").EditorToolbarPlugin=b;},"@VERSION@",{requires:["aui-base","editor-base","aui-toolbar","aui-overlay-context","aui-panel","aui-color-picker","aui-editor-menu-plugin","aui-editor-tools-plugin","aui-button-item","createlink-base","editor-lists","plugin"]});AUI.add("aui-editor",function(B){},"@VERSION@",{skinnable:true,use:["aui-editor-tools-plugin","aui-editor-menu-plugin","aui-editor-toolbar-plugin"]});