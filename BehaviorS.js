//BehaviorS.js based on JLof's hack http://groups.google.com/group/behaviour/msg/314d641ef34cd864
//September 10, 2006//R. Rajesh Jeba Anbiah//http://rajeshanbiah.blogspot.com/2006/09/behaviorsjs-alternative-to-behaviourjs.html
var BehaviorS = {
    sig : 'v1.0b1/2006-09-10/http://rajeshanbiah.blogspot.com/2006/09/behaviorsjs-alternative-to-behaviourjs.html',
	digDepth : 2,
	alwaysDigToDepth : false,
	handleMultipleDefinitions : false,
	autoExtractCaptureEvents : false,
	captureEvents : {}, 
	rules : {}, 
	
	invoke : function (rule, nd, e) {
        try {
            BehaviorS.rules[rule](nd, e);
            return true;
        }
        catch (err) {
            return false;
        };
    },
	
	handle : function (e) {
        if (!e) e = window.event;
        var nd = e.srcElement || e.target;
		BehaviorS.invoke("*:**", nd, e);
        BehaviorS.invoke("*:*", nd, e);
        BehaviorS.invoke("*:" + e.type, nd, e);
        //check for rule until digDepth. the detection with found is obviously buggy as it depends on try catch.
        for (var i = 0, found = false; 
					!found && nd && i < BehaviorS.digDepth; 
										++i, nd = nd.parentNode) {
			var classNames = nd.className.split(/\s+/g);
			for(var j=0, len=classNames.length; j<len; ++j) {
				if (classNames[j]) //Gave up moving this check to for above; IE bugging on previous line!!
					found = BehaviorS.invoke("." + classNames[j] + ":" + e.type, nd, e) || found;
			}
            found = BehaviorS.invoke("#" + nd.id + ":" + e.type, nd, e) || found;
            found = BehaviorS.invoke(nd.nodeName + ":" + e.type, nd, e) || found;
			//if alwaysDigToDepth=true, scan upto digDepth even one element is found.
			found = !BehaviorS.alwaysDigToDepth && found;
        }
    },
	
	_init : function () {
        if (arguments.callee.done) return;
        arguments.callee.done = true;
		BehaviorS.invoke("*:**", document.body, window.event);
        BehaviorS.invoke("*:DOMContentLoaded", document.body, window.event);
		//init handlers...
		var o = document.body;
		for(ev in BehaviorS.captureEvents) {
			if (o.attachEvent) {
				/*if (ev=="submit" || ev=="blur" || ev=="focus") {
					document.forms[0].attachEvent("on" + ev, BehaviorS.handle);
				*/
				if (ev=="focus")
						o.attachEvent("onfocusin", BehaviorS.handle);
					else if (ev=="blur")
						o.attachEvent("onfocusout", BehaviorS.handle);
				   else
					o.attachEvent("on" + ev, BehaviorS.handle);
				}
			 else
				o.addEventListener(ev, BehaviorS.handle, true);
		}
	},
	
	start : function () {
		if (BehaviorS.handleMultipleDefinitions) {
			var tmp_rules = BehaviorS.rules;
			BehaviorS.rules = {};
			for(t in tmp_rules) {
				var rules = t.split(/\s*,\s*/g);
				for(var i=0, len=rules.length; i<len; ++i)
					BehaviorS.rules[rules[i]] = tmp_rules[t];
			}
		}
		if (BehaviorS.autoExtractCaptureEvents) {
			for(r in BehaviorS.rules) {
				var ev = r.split(/:/g)[1];
				if (ev!="*" && ev!="beforeLoaded" && ev!="DOMContentLoaded" && ev!="loaded")
					BehaviorS.captureEvents[ev] = 1; //dummy value, kinda hash table
			}
		}
        BehaviorS.invoke("BODY:beforeLoaded", document, window.event);
        if (document.addEventListener)
				document.addEventListener("DOMContentLoaded", BehaviorS._init, null);
        if (/KHTML|WebKit/i.test(navigator.userAgent)) {
            var _timer = setInterval(function () {
                if (/loaded|complete/.test(document.readyState)) {
                    clearInterval(_timer);
                    delete _timer;
                    BehaviorS._init();
                }
            }
            , 10);
        }
		/*@cc_on @*/
		/*@if (@_win32)
		var proto = "javascript:void(0)";
		if (location.protocol == "https:") proto = "src=//0";
		document.write("<scr"+"ipt id=__ie_onload defer src=" + proto + "><\/scr"+"ipt>");
		var script = document.getElementById("__ie_onload");
		script.onreadystatechange = function () {
			if (this.readyState == "complete") {
				BehaviorS._init();
			}
		};
		/*@end @*/
        window.onload = function () {
            BehaviorS.invoke("BODY:loaded", document.body, window.event);
            BehaviorS._init();
        }
	}
};