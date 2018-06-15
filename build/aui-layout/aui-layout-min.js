YUI.add("aui-layout",function(e,t){var n=e.getClassName("layout","node"),r=12,i=992,s=".col",o=".layout-col-content",u=".layout-row-container-row",a=".row";e.Layout=e.Base.create("layout",e.Base,[],{_useProgressiveEnhancement:!1,initializer:function(t){if(!t||!t.rows)this._useProgressiveEnhancement=!0;this._eventHandles=[this.after("rowsChange",e.bind(this._afterRowsChange,this)),this.after("layout-row:colsChange",e.bind(this._afterLayoutColsChange,this)),this.after("layout-col:valueChange",e.bind(this._afterLayoutValueChange,this)),e.on("windowresize",e.bind(this._afterLayoutWindowResize,this))],e.Array.invoke(this.get("rows"),"addTarget",this),this._uiSetRows(this.get("rows"))},destructor:function(){(new e.EventHandle(this._eventHandles)).detach(),this.get("node").remove()},addRowWithSpecifiedColNumber:function(t){var n=[],i,s,o=this.get("rows").concat();t=t||1;for(i=0;i<t;i++)n.push(new e.LayoutCol({size:r/t}));s=new e.LayoutRow({cols:n}),o.splice(o.length,0,s),this.set("rows",o)},addRow:function(t,n){var r=this.get("rows").concat();e.Lang.isUndefined(t)&&(t=r.length),n||(n=new e.LayoutRow),r.splice(t,0,n),this.set("rows",r)},draw:function(t){var r=t.one("."+n),i=this.get("node");this._useProgressiveEnhancement&&r?(this._set("node",r),this._setProgressiveEnhancementLayout(t)):t.setHTML(i),this._handleResponsive(e.config.win.innerWidth)},moveRow:function(e,t){this.removeRow(t),this.addRow(e,t)},normalizeColsHeight:function(t){var n=this,r,i,o=0;t.each(function(t){i=t.all(s),n.get("isColumnMode")?t.getData("layout-row").get("equalHeight")&&(e.Array.invoke(i,"setStyle","height","auto"),i.each(function(e){r=e.get("clientHeight"),r>o&&(o=r)}),e.Array.invoke(i,"setStyle","height",o+"px"),o=0):e.Array.invoke(i,"setStyle","height","auto")})},removeRow:function(t){e.Lang.isNumber(t)?this._removeRowByIndex(t):e.instanceOf(t,e.LayoutRow)&&this._removeRowByReference(t)},_afterLayoutColsChange:function(t){var n=t.target;this.normalizeColsHeight(new e.NodeList(n.get("node").one(a)))},_afterLayoutValueChange:function(t){var n=t.target,r;r=e.Array.filter(n.getTargets(),function(e){if(e.name==="layout-row")return e}),this.normalizeColsHeight(new e.NodeList(r[0].get("node").one(a)))},_afterRowsChange:function(t){e.Array.invoke(t.prevVal,"removeTarget",this),e.Array.invoke(t.newVal,"addTarget",this),this._uiSetRows(this.get("rows"))},_afterLayoutWindowResize:function(e){var t=e.target.get("innerWidth");this._handleResponsive(t)},_createLayoutCols:function(t){var n=/col-\w+-\d+/,r,i=/\d$/,s=[];return t.each(function(t){r=t.get("className").match(n)[0],s.push(new e.LayoutCol({size:e.Number.parse(r.match(i)[0]),value:{content:t.one(o).getHTML()}}))}),s},_handleResponsive:function(e){var t=e>=i;this.get("isColumnMode")!==t&&(this._set("isColumnMode",t),this.normalizeColsHeight(this.get("node").all(a)))},_removeRowByIndex:function(e){var t=this.get("rows").concat();t.splice(e,1),this.set("rows",t)},_removeRowByReference:function(t){var n,r=this.get("rows").concat();n=e.Array.indexOf(r,t),n>=0&&this._removeRowByIndex(n)},_setProgressiveEnhancementLayout:function(t){var n=this,r=[],i,o=[],f=t.all(a);f.each(function(t){r=n._createLayoutCols(t.all(s)),i=new e.LayoutRow({cols:r,node:t.ancestor(u)}),r=[],o.push(i)}),this.set("rows",o)},_setRows:function(t){var n,r=[],i;for(n=0;n<t.length;n++)i=t[n],e.instanceOf(i,e.LayoutRow)||(i=new e.LayoutRow(i)),r.push(i);return r},_uiSetRows:function(t){var n=this.get("node");n.empty(),e.each(t,function(e){n.append(e.get("node"))})}},{ATTRS:{isColumnMode:{readOnly:!0,validator:e.Lang.isBoolean,value:!1},node:{validator:e.Lang.isNode,valueFn:function(){return e.Node.create('<div class="'+n+'"></div>')},writeOnce:"initOnly"},rows:{setter:"_setRows",validator:e.Lang.isArray,value:[]}}})},"3.1.0-deprecated.44",{requires:["aui-layout-col","aui-layout-row","aui-node-base","base-build","datatype-number-parse","event-resize"]});
