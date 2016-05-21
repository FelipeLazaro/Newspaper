var boxBannerPlayer = true;
            function cleanKeywords(text) {
              var acentos = '√¿¡ƒ¬»…À ÃÕœŒ“”÷‘Ÿ⁄‹€„‡·‰‚ËÈÎÍÏÌÔÓÚÛˆÙ˘˙¸˚—Ò«Á'; 
              var original = 'AAAAAEEEEIIIIOOOOUUUUaaaaaeeeeiiiioooouuuunncc';
              for (var i = 0; i < acentos.length; i++) {
                text = text.replace(acentos.charAt(i), original.charAt(i));
              }
              text.toLowerCase();
              return text;
            }
	    function clearSpaces(arrText) {
                for (var i = arrText.length - 1; i >= 0; i--) {
                    arrText[i] = arrText[i].replace(/\s/g, "-");
                }
                return arrText;
            }
            var metaKeywords = document.getElementsByName('Keywords');
            var contentKeywords = metaKeywords[0].getAttribute('content').toString();
            contentKeywords = cleanKeywords(contentKeywords);
            contentKeywords = contentKeywords.split(", ");
            function emptyCube() {    
                googletag.pubads().addEventListener('slotRenderEnded', function(event) {
                   if (event.slot === slot1) {
                        if(event.isEmpty == false) {
                            boxBannerPlayer = true;
                        } else {
                            boxBannerPlayer = false;
                        }
                    }
                });
            }
            var idDFPObject="", idDFP ="";
            var tagNames=clearSpaces(contentKeywords);
	    //Los adUnits dependen de cada vertical, en este caso el script es de deportes
            var adUnit = "/5644/es.esmas.dep/fotogalerias";
            //Este es el nombre del div en el que se genera el cubo que se carga entre todos
            var nuevoAd= "ban02_300x250";
            //Esta variable se ocupara para dar referencia al cubo y refrescarlo
            var slot1, slotH, slotI, slotJ, slotK="";
            var rendered= false;
            var googletag = googletag || {};
                googletag.cmd = googletag.cmd || [];
            (function() {
                var gads = document.createElement("script");
                gads.async = true;
                gads.type = "text/javascript";
                var useSSL = "https:" == document.location.protocol;
                gads.src = (useSSL ? "https:" : "http:") +
                "//www.googletagservices.com/tag/js/gpt.js";
                var node = document.getElementsByTagName("script")[0];
                node.parentNode.insertBefore(gads, node);
            })();
            googletag.cmd.push(function() {
               /* var mappingHeader = googletag.sizeMapping().
                addSize([980,140], [728,90]). //Desktop and landscape.
                addSize([740,140], [728,90]). // /Ipad.
                addSize([320,140], [320,50]). // Iphones.
                build();
                var mappingSuper = googletag.sizeMapping().
                addSize([980,140],  [[955, 90],[955,75],[955,70],[970,90]]). //Desktop and landscape.
                addSize([740, 140], [728,90]). // /Ipad.
                addSize([320, 140], [320,50]). // Iphones.
                build();
                emptyCube();*/
                slot1 = googletag.defineSlot(adUnit, [300,250],"ban02_300x250").addService(googletag.pubads()).setTargeting("position","middle-btf");
          
                //la siguiente variable es un tipo arreglo con las palabras clave de cada fotogaleria ej. ["futbol-internacionl","ascenso","brasil-2014"] sin espacios, acentos, ni may√∫sculas
                googletag.pubads().setTargeting('keywords', tagNames);
                googletag.enableServices();
                googletag.display("ban02_300x250");
               
            });
            var interBanner = function() {
              googletag.cmd.push(function() {
                 googletag.pubads().refresh([slot1]);
              });
            }