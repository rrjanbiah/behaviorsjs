function stopEvent(event) {
 if(event.preventDefault)
      { event.preventDefault(); event.stopPropagation(); }
    else
      event.returnValue = false;
}

//In pure optimized way... (so multiple definition isn't possible)
BehaviorS.rules = {
    '*:**' : function (nd, e) {
        //all including DOMContentLoaded. Not needed usually
    },
    '*:DOMContentLoaded' : function (nd, e) {
        alert('Rule "*:DOMContentLoaded" matched. See demo section for details.');
    },
    'BODY:beforeLoaded' : function (nd, e) {
        alert('Rule "BODY:beforeLoaded" matched. See demo section for details.');
    },
    'BODY:loaded' : function (nd, e) {
        alert('Rule "BODY:loaded" matched. See demo section for details.');
    },
    '*:*' : function (nd, e) {
        document.getElementById("logger").innerHTML = "Node=" + nd.nodeName + " id=" + nd.id + " class=" + nd.className + " Event=" + e.type;
//stopEvent(e);
    },
    '*:blur' : function (nd, e) {
        alert(nd.nodeName + ' blur');
    },
    '*:focus' : function (nd, e) {
       // alert(nd.nodeName + ' focus');
    },
    'FORM:submit' : function (nd, e) {
        stopEvent(e);
        alert('FORM:submit');
    },
    'FORM:activate' : function (nd, e) {
        stopEvent(e);
        alert('FORM:activate');
    }
};

BehaviorS.captureEvents = { 'activate': 1, 'mouseover' : 1, 'mouseout' : 1, 'click' : 1, 'focus': 1, 'blur': 1 };
//BehaviorS.digDepth = 5;
BehaviorS.alwaysDigToDepth = true;
BehaviorS.start();
