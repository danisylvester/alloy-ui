YUI.add("aui-tooltip-deprecated",function(e,t){var n=e.Lang,r=n.isString,i=n.isUndefined,s=n.isBoolean,o="bl",u="tr",a="",f="attr",l="title",c="currentNode",h="section",p="trigger",d="bodyContent",v="tooltip",m=e.Component.create({NAME:v,ATTRS:{anim:{value:{show:!1}},align:{value:{node:null,points:[o,u]}},showOn:{value:"mouseover"},hideOn:{value:"mouseout"},hideClass:{value:!1},hideDelay:{value:500},title:{value:!1,validator:s}},EXTENDS:e.OverlayContextPanel,prototype:{bindUI:function(){var e=this;m.superclass.bindUI.apply(e,arguments)},show:function(){var e=this,t=e.get(d);m.superclass.show.apply(e,arguments),e.get(l)&&e._loadBodyContentFromTitle(e.get(c))},_loadBodyContentFromTitle:function(e){var t=this,n=t.get(p);t._titles||(t._titles=n.attr(l),n.attr(l,a));if(e){var r=n.indexOf(e),i=t._titles[r];t.set(d,i)}},_afterBodyChange:function(e){var t=this;m.superclass._afterBodyChange.apply(this,arguments),t.refreshAlign()}}});e.Tooltip=m},"3.1.0-deprecated.45",{requires:["aui-overlay-context-panel-deprecated"],skinnable:!0});
