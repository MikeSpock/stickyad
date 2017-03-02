(function() {
    var namespace = "stickyAd";
    window[namespace] = (function () {
        var ads = [];

        var handleScroll = function(){
            for(var i = 0; i<ads.length; i++){
                var ad = ads[i];
                refreshPosition(ad);
            }
        };

        function insertAfter(newElement,targetElement) {
            var parent = targetElement.parentNode;
            if (parent.lastChild == targetElement) {
                parent.appendChild(newElement);
            } else {
                parent.insertBefore(newElement, targetElement.nextSibling);
            }
        }

        function getOffsetTop(elem) {
                var offsetTop = 0;
                do {
                    if ( !isNaN( elem.offsetTop ) )
                    {
                        offsetTop += elem.offsetTop;
                    }
                } while( elem = elem.offsetParent );
                return offsetTop;
        }

        var wrap = function (toWrap, wrapper) {
            wrapper = wrapper || document.createElement('div');
            if (toWrap.nextSibling) {
                toWrap.parentNode.insertBefore(wrapper, toWrap.nextSibling);
            } else {
                toWrap.parentNode.appendChild(wrapper);
            }
            return wrapper.appendChild(toWrap);
        };

        var refreshPosition = function(ad){
            var origTop = getOffsetTop(ad.ghost);
            var scrollTop = (window.pageYOffset || document.documentElement.scrollTop)  - (document.documentElement.clientTop || 0);
            var stayWithinPadding = parseInt(window.getComputedStyle(ad.stayWithin, null).getPropertyValue("padding-bottom"));
            var stayWithinBottomEdge = getOffsetTop(ad.stayWithin) + ad.stayWithin.clientHeight - stayWithinPadding;

            if(origTop + scrollTop +ad.height >= stayWithinBottomEdge) {
               ad.element.style.top = origTop +  (stayWithinBottomEdge - (origTop + scrollTop +ad.height))+"px";

            } else {

                ad.element.style.top = origTop+"px";
            }
        };

        var add = function (config) {
            if (!config.element) throw Error("Invalid element provided " + namespace + ".add() config");
            var element = config.element;

            var ghost = document.createElement("div");
            ghost.style.height = element.clientHeight + "px";
            ghost.style.width = element.clientWidth + "px";
            ghost.style.position = "relative";
            ghost.style.textAlign = "left";

            wrap(element,ghost);

            element.style.position = "fixed";

            var offsetParent = element.offsetParent;

            var stickyAd = {
                element: element,
                ghost: ghost,
                stayWithin: config.stayWithin,
                stayWithinPadding: config.stayWithin.style.padd,
                width:element.clientWidth,
                height:element.clientHeight
            };

            ads.push(stickyAd);

        };

        document.addEventListener("scroll",function(){
            handleScroll();
        });

        return {
            add: add
        }
    })();
})();