/*
 * Tabs 3 - New Wave Tabs
 *
 * Copyright (c) 2007 Klaus Hartl (stilbuero.de)
 * Dual licensed under the MIT (MIT-LICENSE.txt)
 * and GPL (GPL-LICENSE.txt) licenses.
 *
 * http://docs.jquery.com/UI/Tabs
 */

(function($){$.ui=$.ui||{};$.fn.tabs=function(){var method=typeof arguments[0]=='string'&&arguments[0];var args=method&&Array.prototype.slice.call(arguments,1)||arguments;return this.each(function(){if(method){var tabs=$.data(this,'ui-tabs');tabs[method].apply(tabs,args)}else new $.ui.tabs(this,args[0]||{})})};$.ui.tabs=function(el,options){var self=this;this.element=el;this.options=$.extend({selected:0,unselect:options.selected===null,event:'click',disabled:[],cookie:null,spinner:'Loading&#8230;',cache:false,idPrefix:'ui-tabs-',ajaxOptions:{},fx:null,tabTemplate:'<li><a href="#{href}"><span>#{label}</span></a></li>',panelTemplate:'<div></div>',navClass:'ui-tabs-nav',selectedClass:'ui-tabs-selected',unselectClass:'ui-tabs-unselect',disabledClass:'ui-tabs-disabled',panelClass:'ui-tabs-panel',hideClass:'ui-tabs-hide',loadingClass:'ui-tabs-loading'},options);this.options.event+='.ui-tabs';this.options.cookie=$.cookie&&$.cookie.constructor==Function&&this.options.cookie;$(el).bind('setData.ui-tabs',function(event,key,value){self.options[key]=value;this.tabify()}).bind('getData.ui-tabs',function(event,key){return self.options[key]});$.data(el,'ui-tabs',this);this.tabify(true)};$.extend($.ui.tabs.prototype,{tabId:function(a){return a.title&&a.title.replace(/\s/g,'_').replace(/[^A-Za-z0-9\-_:\.]/g,'')||this.options.idPrefix+$.data(a)},ui:function(tab,panel){return{instance:this,options:this.options,tab:tab,panel:panel}},tabify:function(init){this.$lis=$('li:has(a[href])',this.element);this.$tabs=this.$lis.map(function(){return $('a',this)[0]});this.$panels=$([]);var self=this,o=this.options;this.$tabs.each(function(i,a){if(a.hash&&a.hash.replace('#',''))self.$panels=self.$panels.add(a.hash);else if($(a).attr('href')!='#'){$.data(a,'href.ui-tabs',a.href);$.data(a,'load.ui-tabs',a.href);var id=self.tabId(a);a.href='#'+id;var $panel=$('#'+id);if(!$panel.length){$panel=$(o.panelTemplate).attr('id',id).addClass(o.panelClass).insertAfter(self.$panels[i-1]||self.element);$panel.data('destroy.ui-tabs',true)}self.$panels=self.$panels.add($panel)}else o.disabled.push(i+1)});if(init){$(this.element).hasClass(o.navClass)||$(this.element).addClass(o.navClass);this.$panels.each(function(){var $this=$(this);$this.hasClass(o.panelClass)||$this.addClass(o.panelClass)});for(var i=0,index;index=o.disabled[i];i++)this.disable(index);this.$tabs.each(function(i,a){if(location.hash){if(a.hash==location.hash){o.selected=i;if($.browser.msie||$.browser.opera){var $toShow=$(location.hash),toShowId=$toShow.attr('id');$toShow.attr('id','');setTimeout(function(){$toShow.attr('id',toShowId)},500)}scrollTo(0,0);return false}}else if(o.cookie){var index=parseInt($.cookie('ui-tabs'+$.data(self.element)),10);if(index&&self.$tabs[index]){o.selected=index;return false}}else if(self.$lis.eq(i).hasClass(o.selectedClass)){o.selected=i;return false}});var n=this.$lis.length;while(this.$lis.eq(o.selected).hasClass(o.disabledClass)&&n){o.selected=++o.selected<this.$lis.length?o.selected:0;n--}if(!n)o.unselect=true;this.$panels.addClass(o.hideClass);this.$lis.removeClass(o.selectedClass);if(!o.unselect){this.$panels.eq(o.selected).show().removeClass(o.hideClass);this.$lis.eq(o.selected).addClass(o.selectedClass)}var href=!o.unselect&&$.data(this.$tabs[o.selected],'load.ui-tabs');if(href)this.load(o.selected,href);if(!(/^click/).test(o.event))this.$tabs.bind('click',function(e){e.preventDefault()})}var hideFx,showFx,baseFx={'min-width':0,duration:1},baseDuration='normal';if(o.fx&&o.fx.constructor==Array)hideFx=o.fx[0]||baseFx,showFx=o.fx[1]||baseFx;else hideFx=showFx=o.fx||baseFx;var resetCSS={display:'',overflow:'',height:''};if(!$.browser.msie)resetCSS.opacity='';function hideTab(clicked,$hide,$show){$hide.animate(hideFx,hideFx.duration||baseDuration,function(){$hide.addClass(o.hideClass).css(resetCSS);if($.browser.msie&&hideFx.opacity)$hide[0].style.filter='';if($show)showTab(clicked,$show,$hide)})}function showTab(clicked,$show,$hide){if(showFx===baseFx)$show.css('display','block');$show.animate(showFx,showFx.duration||baseDuration,function(){$show.removeClass(o.hideClass).css(resetCSS);if($.browser.msie&&showFx.opacity)$show[0].style.filter='';$(self.element).triggerHandler("show.ui-tabs",[self.ui(clicked,$show[0])])})}function switchTab(clicked,$li,$hide,$show){$li.addClass(o.selectedClass).siblings().removeClass(o.selectedClass);hideTab(clicked,$hide,$show)}this.$tabs.unbind(o.event).bind(o.event,function(){var $li=$(this).parents('li:eq(0)'),$hide=self.$panels.filter(':visible'),$show=$(this.hash);if(($li.hasClass(o.selectedClass)&&!o.unselect)||$li.hasClass(o.disabledClass)||$(self.element).triggerHandler("select.ui-tabs",[self.ui(this,$show[0])])===false){this.blur();return false}self.options.selected=self.$tabs.index(this);if(o.unselect){if($li.hasClass(o.selectedClass)){self.options.selected=null;$li.removeClass(o.selectedClass);self.$panels.stop();hideTab(this,$hide);this.blur();return false}else if(!$hide.length){self.$panels.stop();var a=this;self.load(self.$tabs.index(this),function(){$li.addClass(o.selectedClass).addClass(o.unselectClass);showTab(a,$show)});this.blur();return false}}if(o.cookie)$.cookie('ui-tabs'+$.data(self.element),self.options.selected,o.cookie);self.$panels.stop();if($show.length){var a=this;self.load(self.$tabs.index(this),function(){switchTab(a,$li,$hide,$show)})}else throw'jQuery UI Tabs: Mismatching fragment identifier.';if($.browser.msie)this.blur();return false})},add:function(url,label,index){if(url&&label){index=index||this.$tabs.length;var o=this.options;var $li=$(o.tabTemplate.replace(/#\{href\}/,url).replace(/#\{label\}/,label));$li.data('destroy.ui-tabs',true);var id=url.indexOf('#')==0?url.replace('#',''):this.tabId($('a:first-child',$li)[0]);var $panel=$('#'+id);if(!$panel.length){$panel=$(o.panelTemplate).attr('id',id).addClass(o.panelClass).addClass(o.hideClass);$panel.data('destroy.ui-tabs',true)}if(index>=this.$lis.length){$li.appendTo(this.element);$panel.appendTo(this.element.parentNode)}else{$li.insertBefore(this.$lis[index]);$panel.insertBefore(this.$panels[index])}this.tabify();if(this.$tabs.length==1){$li.addClass(o.selectedClass);$panel.removeClass(o.hideClass);var href=$.data(this.$tabs[0],'load.ui-tabs');if(href)this.load(index,href)}$(this.element).triggerHandler("add.ui-tabs",[this.ui(this.$tabs[index],this.$panels[index])])}else throw'jQuery UI Tabs: Not enough arguments to add tab.';},remove:function(index){if(index&&index.constructor==Number){var o=this.options,$li=this.$lis.eq(index).remove(),$panel=this.$panels.eq(index).remove();if($li.hasClass(o.selectedClass)&&this.$tabs.length>1)this.click(index+(index<this.$tabs.length?1:-1));this.tabify();$(this.element).triggerHandler("remove.ui-tabs",[this.ui($li.find('a')[0],$panel[0])])}},enable:function(index){var self=this,o=this.options,$li=this.$lis.eq(index);$li.removeClass(o.disabledClass);if($.browser.safari){$li.css('display','inline-block');setTimeout(function(){$li.css('display','block')},0)}o.disabled=$.map(this.$lis.filter('.'+o.disabledClass),function(n,i){return self.$lis.index(n)});$(this.element).triggerHandler("enable.ui-tabs",[this.ui(this.$tabs[index],this.$panels[index])])},disable:function(index){var self=this,o=this.options;this.$lis.eq(index).addClass(o.disabledClass);o.disabled=$.map(this.$lis.filter('.'+o.disabledClass),function(n,i){return self.$lis.index(n)});$(this.element).triggerHandler("disable.ui-tabs",[this.ui(this.$tabs[index],this.$panels[index])])},select:function(index){if(typeof index=='string')index=this.$tabs.index(this.$tabs.filter('[href$='+index+']')[0]);this.$tabs.eq(index).trigger(this.options.event)},load:function(index,callback){var self=this,o=this.options,$a=this.$tabs.eq(index),a=$a[0];var url=$a.data('load.ui-tabs');if(!url){typeof callback=='function'&&callback();return}if(o.spinner){var $span=$('span',a),label=$span.html();$span.html('<em>'+o.spinner+'</em>')}var finish=function(){self.$tabs.filter('.'+o.loadingClass).each(function(){$(this).removeClass(o.loadingClass);if(o.spinner)$('span',this).html(label)});self.xhr=null};var ajaxOptions=$.extend({},o.ajaxOptions,{url:url,success:function(r,s){$(a.hash).html(r);finish();typeof callback=='function'&&callback();if(o.cache)$.removeData(a,'load.ui-tabs');$(self.element).triggerHandler("load.ui-tabs",[self.ui(self.$tabs[index],self.$panels[index])]);o.ajaxOptions.success&&o.ajaxOptions.success(r,s)}});if(this.xhr){this.xhr.abort();finish()}$a.addClass(o.loadingClass);setTimeout(function(){self.xhr=$.ajax(ajaxOptions)},0)},url:function(index,url){this.$tabs.eq(index).data('load.ui-tabs',url)},destroy:function(){var o=this.options;$(this.element).unbind('.ui-tabs').removeClass(o.navClass).removeData('ui-tabs');this.$tabs.each(function(){var href=$.data(this,'href.ui-tabs');if(href)this.href=href;$(this).unbind('.ui-tabs').removeData('href.ui-tabs').removeData('load.ui-tabs')});this.$lis.add(this.$panels).each(function(){if($.data(this,'destroy.ui-tabs'))$(this).remove();else $(this).removeClass([o.selectedClass,o.unselectClass,o.disabledClass,o.panelClass,o.hideClass].join(' '))})}})})(jQuery);