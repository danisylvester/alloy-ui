YUI.add("aui-alert",function(e,t){var n=e.getClassName,r=n("close"),i=n("alert","info"),s=n("alert","dismissable");e.Alert=e.Base.create("alert",e.Widget,[e.WidgetCssClass,e.WidgetStdMod,e.WidgetTransition],{CONTENT_TEMPLATE:null,_eventHandle:null,renderUI:function(){this._uiSetCloseable(this.get("closeable")),this.get("useARIA")&&(this.plug(e.Plugin.Aria),this.aria.setAttribute("hidden",!1,this.get("boundingBox")))},bindUI:function(){this.on("closeableChange",this._onCloseableChange),this.after("visibleChange",this._afterVisibleChange)},_afterVisibleChange:function(t){!t.newVal&&this.get("destroyOnHide")&&e.soon(e.bind("destroy",this))},_onClickBoundingBox:function(e){e.target.test("."+r)&&(this.hide(),this.get("useARIA")&&!this.get("destroyOnHide")&&this.aria.setAttribute("hidden",!0,this.get("boundingBox")))},_onCloseableChange:function(e){this._uiSetCloseable(e.newVal)},_uiSetCloseable:function(e){var t=this.get("boundingBox"),n=this.get("closeableNode");t.toggleClass(s,e),n.remove(),this._eventHandle&&this._eventHandle.detach(),e&&(t.insert(n,0),this._eventHandle=t.on("click",this._onClickBoundingBox,this))}},{ATTRS:{closeable:{validator:e.Lang.isBoolean,value:!0},closeableNode:{valueFn:function(){return e.Node.create('<button type="button" class="close">\u00d7</button>')}},cssClass:{value:i},destroyOnHide:{validator:e.Lang.isBoolean,value:!1},useARIA:{validator:e.Lang.isBoolean,value:!0,writeOnce:"initOnly"}},CSS_PREFIX:"alert",HTML_PARSER:{closeableNode:"."+r}})},"3.1.0-deprecated.44",{requires:["aui-aria","aui-classnamemanager","aui-widget-cssclass","aui-widget-transition","timers","widget","widget-stdmod"],skinnable:!0});
