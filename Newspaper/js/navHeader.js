printHeader = true;
urljson = "";

jQuery(function(){   


    var headerNavigation = { 

        inicia: function(){      
            headerNavigation.generaURL();
        },
        generaURL: function(){

            var LinkHeaderUS = "http://deportes.televisa.com/content/televisa/deportes/us/headerdeportesus.header.js";
            var LinkHeader = "http://deportes.televisa.com/content/televisa/deportes/headerdeportes.header.js";

            if (typeof (printHeader) != "undefined"){
                headerNavigation.consultaData((!printHeader) ? LinkHeaderUS : LinkHeader );
            }else{
                headerNavigation.consultaData(LinkHeader);
            }

        },
        consultaData: function(URL){
            jQuery.ajax({
                dataType: "jsonp",
                type: "GET",
                url: URL,
                jsonpCallback: "headerDeportes",
                success: function(data){
                    headerNavigation.generaHTML(data);                    
                },
                error: function(result){
                    console.info(result);
                },
                complete: function(){
                }
            });
           
        },        
        generaHTML: function(data){
            var titulo = data.title ? data.title.value : "Deportes";
            urljson = data.urljson ? data.urljson.value : "";
            var valorSearch= data.searchoption ? data.searchoption[0]["value"] : "";
            var linkHome = data.pathHome ? data.pathHome.link : "#";
            var subTitle = data.subtitle ? true : false;
            var collapsed = data.collapsed ? "social-colapsed" : "";
            var background = data.image ? 'style="background-image:url('+data.image.value+')!important;"' : "";
            var caliente = data.caliente ? data.caliente.value : "";
            var backtype = data.backtype ? data.backtype[0]["value"] : "";
            var imagen = data.backtype ? data.backtype[0]["imagen"] : "";
            var color = data.backtype ? data.backtype[0]["color"] : "";
            var html = "";
            var titlevod = data.titlevod ? data.titlevod.value : "On demand";
            var urlvod = data.urlvod ? data.urlvod.value : "http://deportes.televisa.com/video/";
            var notitle = (data.title || data.subtitle) ? "" : "notitles";

            html += '<div class="subwrapper '+notitle+' " style="width:100% !important;">';                
            /*html += '<section class="superior" '+background+'>';//section superior
            html += '<div class="titlewrapper">';
            html += '<div class="fixedwrapp-container">';
            html += '<a href="'+linkHome+'"><div class="header-multimenu__tvsaLogo_wrap"><div class="header-multimenu__tvsaLogo"></div></div></a>';
            html += subTitle ? '<div class="fixedwrapp subTitulo">' : '<div class="fixedwrapp">'; 
            html += '<a href="'+linkHome+'">';
            html += '<div class="tvsaLogo_mobile_container"><div class="tvsaLogo_mobile"></div></div>';
            html += '<h1> '+titulo+' </h1>';
            html += '</a>';
            html += subTitle ? '<h2>'+data.subtitle.value+'</h2>' : "";            
            html += '<div class="ham-mobile-container">';
            html += '<button class="cmn-toggle-switch cmn-toggle-switch__htla">';
            html += '<span>Hamburguer menu icon</span>';
            html += '</button>';
            html += '<span>MENÚ</span>';
            html += '</div>';
            //Begin Search
            if(valorSearch== "true")
            {
                html += '<div class="gigysearch_wrapp ">';
                html += '<div class="gigysearch_wrapp__search">';
                html += '<a href="" class="tvsa__search"><i class="tvsa-search"></i><i class="tvsa-error"></i></a>';
                html += '<div class="tvsa_search_container">';
                html += '<input id="searchDesktop" name="busqueda" type="text" x-webkit-speech="" placeholder="Busca en Televisa Deportes" autocomplete="off">';
                html += '</div>';
                html += '</div>';
                html += '<div class=" gigya_login__target" id="login_gigya"><span class="gigya-header-login show"><a href="#" class="ui-gy-login__content nosession"></a></span></div>';
                html += '</div>';
            }
            ///End Search
            html += '</div>';
            html += '</div>';                                                   
            html += '</div>';
            html += '</section>';*/
            //section inferior
            html += '<section class="inferior">';
            html += '<nav class="dh_nav">';
            html += '<ul>';
            html += '<li class="hd_btn_wrap" id="hd_btn_wrap1">';
            html += '<a href="" class="hd_pagebtn" id="hd_pagebtn_uno"><i class="tvsa-close iconito"></i>';
            html += '<div class="dh_nav_mobile_opt "><span>MxM</span></div>';
            html += '<div class="dh_nav_desk_opt">MxM</div>';
            html += '</a>';
            html += '</li>';
            html += '<li class="hd_btn_wrap" id="hd_btn_wrap2">';
            html += '<a href="" class="hd_pagebtn" id="hd_pagebtn_dos"><i class="tvsa-close iconito"></i>';
            html += '<div class="dh_nav_mobile_opt "><span>Torneos</span></div>';
            html += '<div class="dh_nav_desk_opt">Torneos</div>';
            html += '</a>';
            html += '</li>';
            //Programs validation to US version
            if (typeof (printHeader) != "undefined"){
                if (printHeader == true) {
                    html += '<li class="hd_btn_wrap" id="hd_btn_wrap3" data-json="'+urljson+'">';
                    html += '<a href="" class="hd_pagebtn" id="hd_pagebtn_tres"><i class="tvsa-close iconito"></i>';
                    html += '<div class="dh_nav_mobile_opt"><span>Agenda TD</span></div>';
                    html += '<div class="dh_nav_desk_opt">Agenda TD</div>';
                    html += '</a>';
                    html += '</li>';
                    html += '<li class="hd_btn_wrap" id="hd_btn_wrap4">';
                    html += '<a href="" class="hd_pagebtn" id="hd_pagebtn_cuatro"><i class="tvsa-close iconito"></i>';
                    html += '<div class="dh_nav_mobile_opt "><span>Video</span></div>';
                    // add new Video
                    html += '<div class="dh_nav_desk_opt">Video</div>';
                    
                    html += '</a>';
                    html += '</li>';
                }else{
                    html += '<li class="hd_btn_wrap" id="hd_btn_wrap3" onclick="eventGOVIdeosUS()">';
                    html += '<a href="http://deportes.televisa.com/us/video/" class="hd_pagebtn" id="hd_pagebtn_tres"><i class="tvsa-close iconito"></i>';
                    html += '<div class="dh_nav_mobile_opt"><span>VIDEOS</span></div>';
                    html += '<div class="dh_nav_desk_opt">VIDEOS</div>';
                    html += '</a>';
                    html += '</li>';
                };
            }
            html += '</ul>';
            html += '</nav>';
            html += '</section>';
            //section inferior
            html += '<div class="hd_page_wrapper">';
            //MXM
            html += (caliente == "true")? '<section class="hd_page caliente" id="hd_page_uno">' : '<section class="hd_page" id="hd_page_uno">';
            //Drop Torneos
            html += '<div id="cortadorpage">';
            html += '<div class="hd_selectsuperw">';
            html += (caliente == "true")? '<div class="hd_banner-wrapp hide-tablet hide-desktop"></div>' : '';
            html += (caliente == "true")? '<div class="hd_banner-wrapp hide-mobile"></div>' : '';
            html += '<div class="hd_select_wrapper">';
            html += '<i class="tvsa-caret-down"></i>';
            html += '<select name="lista_mxm" id="mxm_list"></select>';
            html += '</div>';
            html += '</div>';
           //Fin Drop Torneos
            html += '<div class="hd_select_content" id="hd_select_content1"></div>';
            html += '<div class="btn_pagecolapse">';
            html += '<div class="btnpc_mostrar"><div class="btntxtwrap"><i class="tvsa-double-caret-down"></i><span>Mostrar más resultados</span></div></div>';
            html += '<div class="btnpc_ocultar"><div class="btntxtwrap"><i class="tvsa-double-caret-up"></i><span>Ocultar más resultados</span></div></div>';
            html += '</div></div>';
            html += '</section>';
            //Fin MXM
            html += '<section class="hd_page" id="hd_page_dos">';
            html += '<section class="hd-cardcontainer">';
            html += headerNavigation.listaTorneos(data);
            html += '</section>';
            html += '</section>';
            //Programs validation to US version
            if (typeof (printHeader) != "undefined"){
                if (printHeader == true) {
                    html += '<section class="hd_page" id="hd_page_tres">';
                    html += '<section class="hd-cardcontainer">';
                    html += '<div class="prime-loader">';
                    html += '<svg class="prime-loader__circular" viewBox="25 25 50 50">';
                    html += '<circle class="prime-loader__path" cx="50" cy="50" r="20" fill="none" stroke-width="2" stroke-miterlimit="10"/>';
                    html += '</svg>';
                    html += '</div>';
                    html += '</section>';
                    html += '<div class="hd-botonvermas__container">';
                    html += '<div class="hd-botonvermas">';
                    html += '<a href="http://deportes.televisa.com/programacion/">';
                    html += '<span>Ver más</span>';
                    html += '</a>';
                    html += '</div>';
                    html += '</div>';
                    html += '</section>';
                    html += '<section class="hd_page" id="hd_page_cuatro">';
                    html += '<div class="hd_videocards__superWrapper">';
                    html += '<div id="hd_vivocards__overflow" class="hd_videocards__overflow">';
                    html += '</div>';
                    html += '</div>';
                    html += '<section class="hd-cardcontainer">';
                    html += '<div class="hd_videocards__wrapper" id="odcards_container" data-gsanum="20" data-gsaclient="deportes" data-gsasite="deportes">';
                    html += '<div class="hd_videocards__title"><span>'+titlevod+'</span></div>';
                    html += '<div class="prime-loader"><svg class="prime-loader__circular" viewBox="25 25 50 50"><circle class="prime-loader__path" cx="50" cy="50" r="20" fill="none" stroke-width="2" stroke-miterlimit="10"></circle></svg></div>';
                    html += '</div>';
                    html += '<div class="hd-botonvermas__container"><div class="hd-botonvermas"><a href="'+urlvod+'"><span>Ver más</span></a></div>';
                    html += '</div>';
                    html += '</section>';
                    html += '</section>';
                };
            }

            html += '</div>';
            html += '</div>';
            html += '<div class="wrapper-posicionador principal">';
            html += '<div class="menu-wrapper ">';
            html += '<nav class="main-nav">';
            html += '<ul class="main-menu actual">';
            html += '<li class="actual deportes"><a href="'+linkHome+'""><i class="tvsa-home td"></i>INICIO</a></li>';
            html += headerNavigation.listasHamHTML(data);
            html += '<li class="redes">';
            html += '<div class="centrador-redes">';
            html += headerNavigation.listaSocialesHamburguer(data);
            html += '</div>';
            html += '<div class="apps_container">';
            html += '<span class="android"><a href="https://play.google.com/store/apps/details?id=com.televisa.deportes.android" target="_blank" rel="nofollow"><i class="tvsa-android "></i></a></span><span class="apple"><a href="https://itunes.apple.com/mx/app/televisa-deportes/id289679193" target="_blank" rel="nofollow"><i class="tvsa-apple "></i></a></span>';
            html += '</div>';
            html += '</li>';
            html += '</ul>';
            html += '</nav>';
            html += '</div>'; //end menu-wrapper
            html += '<div class="redes">';
            html += '<div class="centrador-redes">';
            html += headerNavigation.listaSocialesHamburguer(data);
            html += '</div>';
            html += '<div class="apps_container">';
            html += '<span class="android"><a href="https://play.google.com/store/apps/details?id=com.televisa.deportes.android" target="_blank" rel="nofollow"><i class="tvsa-android "></i></a></span><span class="apple"><a href="https://itunes.apple.com/mx/app/televisa-deportes/id289679193" target="_blank" rel="nofollow"><i class="tvsa-apple "></i></a></span>';
            html += '</div>';
            html += '</div>';
            html += '</div>'; //end wrapper-posicionador

            if( jQuery('#bodyBackground').length ) {
                if(backtype == "none" )
                    {
                        jQuery("#bodyBackground").attr("style", "display:none;" );
                    }
                else if(backtype == "imagen" ) // si hay imagen guardados agregar background
                    {
                        jQuery("#bodyBackground").attr("style", "background-image:url("+imagen+");" );
                    } 
                else if(backtype == "color")
                    {
                        jQuery("body").attr("style", "background-color:#"+color+";");
                    }
                else if( color && imagen && backtype == "both")
                    {
                        jQuery("#bodyBackground").attr("style", "background-color:#"+color+"; background-image:url("+imagen+");");
                    }
            }

            jQuery("#header-multimenu").html(html).promise().done(function(){
                loadPluginMM();
                jQuery('#header-multimenu').headerMultimenu();
                var input = jQuery('#searchDesktop');
                var tourl = headerNavigation.actioForm(data);
                input.keyup(function(e) {
                    if (e.keyCode == 13) {
                        var fin = input.val().trim().toLowerCase().replace(/ /g, '+').replace(/á/g, 'a').replace(/é/g, 'e').replace(/í/g, 'i').replace(/ó/g, 'o').replace(/ú/g, 'u').replace(/ñ/g, 'n'),
                            to = tourl + '.' + fin + '/';
                            window.open(to);
                    }else{
                         if (e.which  == 13) {
                            var fin = input.val().trim().toLowerCase().replace(/ /g, '+').replace(/á/g, 'a').replace(/é/g, 'e').replace(/í/g, 'i').replace(/ó/g, 'o').replace(/ú/g, 'u').replace(/ñ/g, 'n'),
                            to = tourl + '.' + fin + '/';
                            window.open(to);
                         }
                    }
                });
				var width=window.innerWidth;
				
				if(width>955)
				{
					jQuery('#hd_btn_wrap1').addClass("open");
					jQuery('#header-multimenu').addClass("mxmShow");
					jQuery('#hd_page_uno').addClass("colapsed");
					jQuery('#hd_page_uno').addClass("open");
					jQuery('#header-multimenu').addClass("pusher");
					jQuery('#header-multimenu').addClass("subov1");
					jQuery('.inferior').addClass("supblack");
					
					if(jQuery('#hd_page_uno').hasClass("colapsed") || jQuery('#hd_page_uno').hasClass("colapsed2"))
					{
						setTimeout(
						function()
						{
							jQuery("body").removeClass("fixPage");
							jQuery("html").removeClass("fixPage");
						},400)
					}
					else
					{
						jQuery("body").addClass("fixPage");
						jQuery("html").addClass("fixPage")
					}
				}
				

            });  
        },
        actioForm: function(data){
                var cheked= data.searchoption ? data.searchoption[0]["value"] : "false";
                var linkType = data.searchoption[0]["searchLinkType"] ? data.searchoption[0]["searchLinkType"] : "";
                var linkInternal = data.searchoption[0]["searchInternalLink"] ? data.searchoption[0]["searchInternalLink"] : "";
                var linkExternal = data.searchoption[0]["searchExternalLink"] ? data.searchoption[0]["searchExternalLink"] : "";
                var link = "";

                if(cheked == "true"){
                    if(linkType == "internal"){
                        link = linkInternal;
                    }else if(linkType == "external"){
                        link = linkExternal;
                    }
                }
                return link;
        },

        listasMenuHTML: function(data){            
            var li = "";      
            if(data.menu){
                jQuery.each(data.menu, function(index,value){
                    var background = false;
                    if(value.urlImage != "" && value.checkImage == "true"){
                        background = true;
                    }

                    var link = (value.value != "" ) ? value.value : "#"; 
                    if(value.items){                    

                        if(background){
                            if(value.imageMode == "static"){
                                li += '<li class="nav imag"><a href="'+link+'" target="_self"><img src="'+value.urlImage+'" alt=""></a>';    
                            }else{
                                li += '<li class="nav imag hover"><a href="'+link+'" target="_self"><img src="'+value.urlImage+'" alt=""></a>';
                            }                            
                        }else{
                            li += '<li class="nav"><a href="'+link+'" target="_self"><span>'+value.text+'</span></a>';
                        }

                       li += '<nav class="colapsed-nav simple-nav">';
                       li += '<ul>';
                       li += recursiva(value.items);                   
                       li += '</ul>';
                       li += '</nav>';
                       li += "</li>";

                    }else{   
                        if(background){
                            if(value.imageMode == "static"){
                                li += '<li class="imag"><a href="'+ link +'" target="_self"><img src="'+value.urlImage+'" alt=""></a></li>';
                            }else{
                                li += '<li class="imag hover"><a href="'+ link +'" target="_self"><img src="'+value.urlImage+'" alt=""></a></li>';
                            }
                        }else{
                            li += '<li><a href="'+ link +'" target="_self"><span>'+value.text+'</span></a></li>';
                        }

                    }                    
                });   
            }      

            function recursiva(data){
                var lista = "";
            
                    jQuery.each(data, function(index,value){
                        var link = (value.value != "") ? value.value : "#";    
                        var background = false;
                        if(value.urlImage != "" && value.checkImage == "true"){
                            background = true;
                        }                 
                        if(value.text != "Agregar"){
                            if(background){
                                if(value.imageMode == "static"){
                                    lista += '<li class="imag"><a href="'+link+'" target="_self"><img src="'+value.urlImage+'" alt=""></a></li>'; 
                                }else{
                                    lista += '<li class="imag"><a href="'+link+'" target="_self"><img src="'+value.urlImage+'" alt=""></a></li>'; 
                                }
                            }else{
                                lista += '<li><a href="'+link+'" target="_self"><span>'+value.text+'</span></a></li>';       
                            }                              
            
                        }
                   });
                return lista;
            };
            return li;
        },
        listasHamHTML: function(data){
             var li = "";
             
            jQuery.each(data.hamburguer, function(index,value){
                var link = (value.value != "" ) ? value.value : "#"; 
                var background = false;
                
                if(value.urlImage != "" && value.checkImage == "true"){
                    background = true;
                }

                if(value.items){   
                    
                    if(background){
                        li += '<li class="ver-mas"><a href="#" class="submenu-switch"><img src="'+value.urlImage+'" alt=""></a>';
                    }else{
                        li += '<li class="ver-mas"><a href="#" class="submenu-switch">'+value.text+'</a>';
                    }
                    li += '<ul class="submenu">';

                    if(background){
                        li += '<li class="actual deportes back"><a href="#"><img src="'+value.urlImage+'" alt=""></a></li>';
                    }else{
                        li += '<li class="actual deportes back"><a href="#">'+value.text+'</a></li>';                    
                    } 

                    li += recursiva(value.items);
                    li += '</ul>';
                    li += "</li>";


                }else{               
                    if(background){
                        li += '<li><a href="'+ link +'" target="_self"><img src="'+value.urlImage+'" alt=""></a></li>';
                    }else{
                        li += '<li><a href="'+ link +'" target="_self"><span>'+value.text+'</span></a></li>';
                    }


                }                    
            });            
            function recursiva(data){
                var lista = "";
                    jQuery.each(data, function(index,value){
                        var link = (value.value != "") ? value.value : "#";
                        var background = false;
                        if(value.urlImage != "" && value.checkImage == "true"){
                            background = true;
                        } 

                        if(value.items){
                            if(background){
                                lista += '<li class="ver-mas"><a href="#" class="submenu-switch"><img src="'+value.urlImage+'" alt=""></a>';
                            }else{
                                lista += '<li class="ver-mas"><a href="#" class="submenu-switch">'+value.text+'</a>';
                            }
                            lista += '<ul class="submenu">';
                            if (background){
                                lista += '<li class="actual deportes back"><a href="#"><img src="'+value.urlImage+'" alt=""></a></li>';
                            }else{
                                lista += '<li class="actual deportes back"><a href="#">'+value.text+'</a></li>';
                            }
                            lista += recursiva(value.items);
                            lista += '</ul>';
                        }else{
                            if(value.text != "Agregar"){
                                if(background){
                                    lista += '<li><a href="'+link+'" target="_self"><img src="'+value.urlImage+'" alt=""></a></li>';   
                                }else{
                                    lista += '<li><a href="'+link+'" target="_self"><span>'+value.text+'</span></a></li>';       
                                }
                                
                            }
                        }
                   });
                return lista;
            };
            return li;

        },
        listasSocialHTML: function(data){
            var lista = "";

            if (data.collapsed){
                if (data.social){
                    jQuery.each(data.social, function(index,value){                    
                        if (value.site == "tvsa-videocamera" || value.site == "tvsa-camera"){
                            lista += '<li><a href="'+ value.link +'" target="_self"><i class="'+ value.site+' td"></i><span>'+value.titleSocial+'</span></a></li>';
                        }                    
                    });

                    lista += '<li class="nav nav-social noHorizontal">';
                    lista += '<a href="#" target="_self"><i class="tvsa-share td"></i></a>';
                    lista += '<nav class="colapsed-nav simple-nav social-nav open"><ul>';

                    jQuery.each(data.social, function(index,value){
                        if(value.site != "tvsa-videocamera" && value.site != "tvsa-camera"){
                            lista += '<li class="social"><a href="'+ value.link +'" target="_self"><i class="'+value.site+' td"></i></a></li>';
                        }
                    });
                    lista += '</ul></nav></li>';
                }
            }else{
                if (data.social){
                    jQuery.each(data.social, function(index,value){                        
                        if (value.site == "tvsa-videocamera" || value.site == "tvsa-camera"){
                            lista += '<li><a href="'+ value.link +'" target="_self"><i class="'+ value.site+' td"></i><span>'+value.titleSocial+'</span></a></li>';
                        }
                        if(value.site != "tvsa-videocamera" && value.site != "tvsa-camera"){
                            lista += '<li class="social"><a href="'+ value.link +'" target="_self"><i class="'+value.site+' td"></i></a></li>';
                        }
                    });
                }
            }
            return lista;
        },
        listaSocialesHamburguer: function(data){
            var lista = "";

                if (data.social){
                    jQuery.each(data.social, function(index,value){                                                
                        if(value.site != "tvsa-videocamera" && value.site != "tvsa-camera"){                            
                            lista += '<span class=""><a href="'+value.link+'" target="_blank" rel="nofollow"><i class="'+value.site+'"></i></a></span>';
                        }
                    });
                }

            return lista;
        },
        listaTorneos: function(data){
            var listatorneo = "";
            if(data.tournaments){
                jQuery.each(data.tournaments, function(index, val) {

                    var title = (val.text !== '' && val.text !== 'undefined') ? val.text : '';
                    listatorneo += '<article class="hd-torneocard">';
                    listatorneo += '<div class="hd-torneocard__iconwrapper"><div class="hd-torneocard__icon">';
                    listatorneo += (val.urlImage !== '' && val.urlImage !== 'undefined') ? '<img src="http://deportes.televisa.com'+val.urlImage+'">' : '';
                    listatorneo += '</div></div>';
                    listatorneo += '<div class="hd-torneocard__data">';
                    listatorneo += '<p class="hd-torneocard__title">'+title+'</p>';
                    listatorneo += '<ul class="hd-torneocard__controls">';
                    listatorneo += recursiva(val.items);                  
                    listatorneo += '</ul>';
                    listatorneo += '</div>';
                    listatorneo += '</article>';
                });
            }
            function recursiva(data){
                    var lista = "";
                    if(data)
                    {
                        jQuery.each(data, function(index,value){
                            var link = (value.value != "") ? value.value : "#";    
                            var background = false;
                            if(value.text != "Agregar"){
                                lista += '<li class="hd-torneocard__controlitem"><a href="'+value.value+'" target="_self">'+value.text+'</a></li>';                        
                            }
                       });
                    return lista;
                    }
                        
            };
            
            return listatorneo;

        },
    };
    
    headerNavigation.inicia();
});

// ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                             h1n4 functions
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/*FUNCTIONS H1N4*/
function load_js( srcs ){
  var newscript = document.createElement('script');
  newscript.type = 'text/javascript';
  newscript.async = true;
  newscript.src = srcs;
  (document.getElementsByTagName('body')[0]).appendChild(newscript);
}
/*
window.onload = function() {
      if (!window.jQuery) {   
        load_js('http://i2.esmas.com/finalpage/libs/jquery/1.8.2/jquery.min.js');
        var miIntervaloChecador = setInterval(function(){      
          if (window.jQuery) {
              //load_js('http://static-televisadeportes.esmas.com/sportsdata/futbol/ticker/js/TIM_wdg_ticker.js');
              jQuery('#header-multimenu').headerMultimenu();
              clearInterval(miIntervaloChecador);
          }
        },1000);
      }else{
          //load_js('http://static-televisadeportes.esmas.com/sportsdata/futbol/ticker/js/TIM_wdg_ticker.js');
          jQuery('#header-multimenu').headerMultimenu();
      }
};*/
function loadPluginMM(){
  ;(function ($, window, undefined ) {
        //Declaración del Plugin
        var pluginName = 'headerMultimenu',
            elemento,
        
            document = window.document,
            defaults = {
              variable: "valor",
            };
        //Construcción del plugin
        function Plugin( element, options ) {
          plugin = this;
          plugin.element = element;

          plugin.options = $.extend( {}, defaults, options) ;

          plugin._defaults = defaults;
          plugin._name = pluginName;
          
          plugin.building();
        }
        //Inicialización del plugin
        Plugin.prototype.init = function () {
            //Variables globales
            mainwrapper= plugin.element;
            breakMobile=  624;
            breakDesktop= 948;   

            //Variables para HamburgerMenu
            menuwrapper = $(mainwrapper).find('.menu-wrapper');
            mbuttonParent = $(mainwrapper).find('.ham-mobile-container');
            mbutton = $(mainwrapper).find('.cmn-toggle-switch');
            submenuSwitch = $(mainwrapper).find('.submenu-switch');
            mainmenu = $(mainwrapper).find('.main-menu');
            submenu = $(mainwrapper).find('.submenu');
            subBackSwitch = $(mainwrapper).find(".back a");    
            menuArea = $(mainwrapper).find('.main-nav');
            evm = $('html').hasClass('touch')? "touchstart":"click";
            var openPos;

            //Variables para HeaderFixing
            globalNavigation = $('#nav_header_televisa');
            fixedTarget = $(mainwrapper).find('.fixedwrapp');
            fixedTarget2 = $(mainwrapper).find('.wrapper-posicionador');
            body = $("body");
            topActual = body.scrollTop(); 
            lastWidth = $(window).width();

            //variables search
            searchBoton = $(".tvsa__search");
            searchContainer = $(".tvsa_search_container");
            searchContainerInput = $(".tvsa_search_container input");
            page1 = $("#hd_page_uno");
            page2 = $("#hd_page_dos");
            page3 = $("#hd_page_tres");
            page4 = $("#hd_page_cuatro");
            btwrap1 =$("#hd_btn_wrap1");
            sl1 =$("#hd_select_content1"); 
            sup =$(".inferior");
            cb =$(".btn_pagecolapse");
            plugin.detect_device();
            plugin.events();
            plugin.revisoSmartbanner();
        };
        //Eventos del Plugin
        Plugin.prototype.events = function () {
        
            /* if(plugin.element.getAttribute('data-mxmop')!=="false"){
                if(  $(sup).length !== 0   ){
                  if( $(window).width() > 955) {
                     cargoMxm1(); 
                  }
                  if($(window).width() > 955 && !$(sl1).hasClass('gpo_caliente')){
                     $(btwrap1).addClass('open'); 
                     $(page1).addClass("colapsed"); 
                     $(mainwrapper).addClass("pusher"); 
                     $(mainwrapper).addClass("subov1");         
                     $(page1).addClass("open");
                     $(sup).addClass("supblack"); 
                     plugin.revisoColapsed();
                  }
                  if($(window).width() > 955 && $(sl1).hasClass('gpo_caliente') ){
                      $(btwrap1).addClass('open'); 
                      $(page1).addClass("colapsed2"); 
                      $(mainwrapper).addClass("pusher2"); 
                      $(mainwrapper).addClass("subov2");
                      $(page1).addClass("open"); 
                      $(sup).addClass("supblack"); 
                      plugin.revisoColapsed();
                  } 
                }
            }*/
            //Abriendo Menu Hamburger        
            $(document).on('click', mbuttonParent.selector, function(event) {
                fixedTarget.removeClass("fixed");
                event.preventDefault();
                mbutton.toggleClass('active');     
                           
                if(mbutton.hasClass('active')){
                  openPos = $("body").scrollTop();    
                  plugin.abreMenu();
                }
                else{
                  plugin.resetMenu();
                  $("body").scrollTop(openPos);
                }
            });
            //Avance Submenús Hamburger
            $(document).on('click', submenuSwitch.selector, function(event) {
                event.preventDefault();
                $(this).closest('ul').addClass('menuhhide');
                $(this).siblings(submenu).addClass('actual');
                $(this).siblings(submenu).removeClass('menuhhide');
            });
            //Regreso Submenús Hamburger
            $(document).on('click', subBackSwitch.selector, function(event) {
                event.preventDefault();
                $(this).closest('ul.menuhhide').removeClass('menuhhide');
                $(this).closest(submenu).removeClass('actual');
            });
            //Abriendo Search
            $(document).on('click', searchBoton.selector, function(event) {
                   event.preventDefault();
                   if($(searchContainer).hasClass('open')){
                       plugin.resetSearch();
                   }else{
                       $(searchContainer).addClass("open");
                       $("body").addClass('searchopen');
                       $(searchBoton).addClass("open");
                       $(searchContainerInput).focus();     
                   }    
            });
            //Abriendo paginas
            $(document).on('click', "#hd_pagebtn_uno,#hd_pagebtn_dos,#hd_pagebtn_tres,#hd_pagebtn_cuatro", function(event) {
                    event.preventDefault();
                    event.stopPropagation();
                    plugin.revisoSmartbanner();
                    if( $(event.currentTarget).closest(".hd_btn_wrap").hasClass('open') ){
                         plugin.resetPages();
                         $(".hd_page").removeClass('openfull');
                          $(document).trigger("stopvivoInterval");
						  jQuery('#header-multimenu').removeClass("mxmShow");
						  jQuery('#header-multimenu').removeClass("widgetsShow");
						  
                    }else{
                         plugin.resetPages();
                         if( $(event.currentTarget).is("#hd_pagebtn_uno") ){
								var width=window.innerWidth;
								
							if(width>955)
							{
								 jQuery('#header-multimenu').removeClass("widgetsShow");
								
								jQuery('#hd_btn_wrap1').addClass("open");
								jQuery('#header-multimenu').addClass("mxmShow");
								jQuery('#hd_page_uno').addClass("colapsed");
								jQuery('#hd_page_uno').addClass("open");
								jQuery('#header-multimenu').addClass("pusher");
								jQuery('#header-multimenu').addClass("subov1");
								jQuery('.inferior').addClass("supblack");
								
								if(jQuery('#hd_page_uno').hasClass("colapsed") || jQuery('#hd_page_uno').hasClass("colapsed2"))
								{
									setTimeout(
									function()
									{
										jQuery("body").removeClass("fixPage");
										jQuery("html").removeClass("fixPage");
									},400)
									
								}
								else
								{
									jQuery("body").addClass("fixPage");
									jQuery("html").addClass("fixPage");
								}
							}
							else
							{
							   cargoMxm1();
							   $("#hd_page_uno").addClass('openfull').addClass("open");
							}
                         }
                         if( $(event.currentTarget).is("#hd_pagebtn_dos") ){
                           cargoTorneos();
                           $("#hd_page_dos").addClass('openfull').addClass("open");
						    jQuery('#header-multimenu').removeClass("mxmShow");
						    jQuery('#header-multimenu').addClass("widgetsShow");
							
                         }
                         if( $(event.currentTarget).is("#hd_pagebtn_tres") ){
                           cargoProgramacion();
                           $("#hd_page_tres").addClass('openfull').addClass("open");
						   jQuery('#header-multimenu').removeClass("mxmShow");
						    jQuery('#header-multimenu').addClass("widgetsShow");
                         }
                         if( $(event.currentTarget).is("#hd_pagebtn_cuatro") ){
                            cargoVideos();
                            $("#hd_page_cuatro").addClass('openfull').addClass("open");
							jQuery('#header-multimenu').removeClass("mxmShow");
						    jQuery('#header-multimenu').addClass("widgetsShow");
                         }
                         $(sup).addClass("supblack");
                         $(".hd_btn_wrap").addClass('dh_close');
                         $(event.currentTarget).closest(".hd_btn_wrap").addClass('open');
                         $(event.currentTarget).closest(".hd_btn_wrap").removeClass('dh_close');
                         calculoViewportHeight();
                         $("body").addClass("fixPage"); 
                         plugin.revisoColapsed();
                    }
                    plugin.revisoPage();
					
            });
     
            $(document).on('click', cb.selector, function(event) {
                 
                $("#hd_page_uno").removeClass("pagefix"); 
                $("#hd_page_uno").removeClass("openfull"); 
                $(page1).scrollTop(0);    
                plugin.revisoSmartbanner();
               
                slopen = $(".hd_select_content:visible");
                 if( $(page1).hasClass('colapsed') && !$(slopen).hasClass('gpo_caliente')  ){
                    $(page1).removeClass('colapsed');
                    $(page1).addClass('openfull');
                    calculoViewportHeight(); 
                    $(mainwrapper).removeClass("pusher"); 
                    $(mainwrapper).removeClass("subov1"); 
					console.log("entre");
					jQuery('#header-multimenu').removeClass("mxmShow");
					 jQuery('#header-multimenu').addClass("widgetsShow");

                 }else if( !$(slopen).hasClass('gpo_caliente')){
                     $(page1).addClass('colapsed');
                     $(mainwrapper).addClass("pusher"); 
                     setTimeout(function(){
                        $(mainwrapper).addClass("subov1");
                     },400); 
					 console.log("entre2");
					 jQuery('#header-multimenu').removeClass("widgetsShow");
					 jQuery('#header-multimenu').addClass("mxmShow");
					 
                 }
                 if( $(page1).hasClass('colapsed2') && $(slopen).hasClass('gpo_caliente') ){
                    $(page1).removeClass('colapsed2');
                    $(page1).addClass('openfull');
                    calculoViewportHeight();
                    $(mainwrapper).removeClass("pusher2"); 
                    $(mainwrapper).removeClass("subov2"); 
                    
                 }else if( $(slopen).hasClass('gpo_caliente')){
                    $(page1).addClass('colapsed2');
                    $(mainwrapper).addClass("pusher2"); 
                    setTimeout(function(){
                        $(mainwrapper).addClass("subov2"); 
                    },400); 
								
                 }
                  plugin.revisoColapsed();                
                 
            });
            //On outerclicks 
            $(document).on(evm, 'html', function(event) {
                //Outerclick para menú Hamburger
                if($(menuwrapper.selector).hasClass('open')){
                  event.stopPropagation();             
                  if ($(event.target).closest(mbuttonParent).length === 0 && $(event.target).closest(menuArea).length === 0 && $(event.target).closest(".redes").length === 0) {
                      plugin.resetMenu();
                  }                        
                               
                }
                //Outerclick para Search
                if($(searchContainer).hasClass('open')){
                  event.stopPropagation();  
                    if ($(event.target).closest(searchBoton).length === 0 && $(event.target).closest(searchContainer).length === 0 ) {
                        //if( $(window).width() > 955) {
                          setTimeout(function(){
                             plugin.resetSearch();
                          },500);
                        //}
                    }   
                }

            });        
            $("#searchform").submit(function () {
                 var name = $.trim($(searchContainerInput).val());
                 if (name  === '') {
                     return false;
                }
            });

            $('#mxm_list').change(function(){
                //Abro colapsado si cambian la opción
                $(page1).removeClass('colapsed');
                $(page1).removeClass('colapsed2');
                $(page1).addClass('openfull');
                $(mainwrapper).removeClass("pusher"); 
                $(mainwrapper).removeClass("pusher2"); 
                $(mainwrapper).removeClass("subov1");
                $(mainwrapper).removeClass("subov2");
                $(page1).scrollTop(0);
                plugin.revisoColapsed();
            });

            function metricasBotonera(section){
              //uid_call('deportes.botonera-header.'+section+'', 'clickin');
              //_gaq.push(['_trackEvent', 'deportes', 'botonera-header.'+section+'']);
            }

            function cargoMxm1(){
              $(document).trigger("mxmrequest");
              $(document).trigger("stopvivoInterval");
              metricasBotonera("mxm");
            }
            function cargoProgramacion(){
              $(document).trigger("agendarequest");
              $(document).trigger("stopvivoInterval");
              metricasBotonera("agenda-tv");
            }
            function cargoTorneos(){
              $(document).trigger("torneosrequest");
              $(document).trigger("stopvivoInterval");
              metricasBotonera("torneos");
            }
            function cargoVideos(){
                $(document).trigger("videosrequest");
                $(document).trigger("envivorequest");
                $("#hd_page_cuatro > .prime-loader").hide(); 
                metricasBotonera("videos");         
            }

            //Revisando scroll para HeaderFixing
            $(window).scroll(function(event){
                plugin.headerFixing();
                topActual = body.scrollTop();
            });

            //Scroll en el page
            $(page1).scroll(function(event){   
                if($(this).hasClass('openfull')){
                  $("#hd_page_uno").addClass("pagefix");   
                }                                                                     
            });
            
           //On window resize
            $(window).resize(function() {
                if(this.resizeTO) clearTimeout(this.resizeTO);
                 this.resizeTO = setTimeout(function() {
                     if($(window).width()!=lastWidth){
                        plugin.resetMenu();          
                        lastWidth = $(window).width();
                     }                               
                }, 250);                          
            });
            function calculoViewportHeight(){ 
                var viewportHeight = window.innerHeight;
                var heightcalc = viewportHeight - $(".subwrapper").height();
                $(".hd_page.open").height(heightcalc);  
            }
            viewport = document.querySelector("meta[name=viewport]");
            viewport.setAttribute('content', 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0');
        };
        //Constructor del HTML
        Plugin.prototype.building = function(){
           mainwrapper= plugin.element;
           //Aquí irá el código de construcción del Html
           var state=0;
           state = ( typeof window.state == 'undefined' ) ? 0 : window.state;
           $(mainwrapper).addClass("loaded");
           plugin.init();             
        };
        ////////////////////////////////////////////////////////////
        ////Funciones de Menú Hamburger
        ////////////////////////////////////////////////////////////
        //Funcion para abrir menú
        Plugin.prototype.abreMenu = function(){
            menuwrapper.addClass('open');
            fixedTarget2.addClass('open');          
             if($(window).width() < 955 ){
                $("body").addClass("fixDesk");
                $("html").addClass("fixDesk");
             }   
        };
        //Función para cerrar y resetear el menú 
        Plugin.prototype.resetMenu = function(){
             $(".main-nav ul.actual").scrollTop(0);
             $(document).unbind('touchmove');
             $("body").removeClass("fixDesk");
             $("html").removeClass("fixDesk");       
              fixedTarget2.removeClass('open');
              menuwrapper.removeClass('open');
              mainmenu.removeClass('menuhhide');
              submenu.removeClass('menuhhide');
              submenu.removeClass('actual');
              mbutton.removeClass('active');
        };
         Plugin.prototype.resetSearch = function(){
             $("body").removeClass('searchopen');
             $(searchContainer).removeClass("open");
             $(searchBoton).removeClass("open");
             $(searchContainerInput).val('');
             $(searchContainerInput).blur();
         };
         Plugin.prototype.resetPages = function(){
             $(sup).removeClass("supblack");
             $(".hd_btn_wrap").removeClass('open');
             $(".hd_btn_wrap").removeClass('dh_close');
             $(".hd_page").scrollTop(0);
             $(".hd_page").removeClass("open");
             $("body").removeClass("fixPage");
             $("html").removeClass("fixPage");
             $(page1).removeClass("colapsed"); 
             $(page1).removeClass("colapsed2"); 
             $(mainwrapper).removeClass("pusher"); 
             $(mainwrapper).removeClass("pusher2");
             $(mainwrapper).removeClass("subov1");
             $(mainwrapper).removeClass("subov2");
         };
          Plugin.prototype.revisoColapsed = function(){
                if( $(page1).hasClass('colapsed') || $(page1).hasClass('colapsed2') ){
                  setTimeout(function(){ 
                     $("body").removeClass('fixPage'); 
                     $("html").removeClass('fixPage');    
                  },400);              
                }else{
                  $("body").addClass("fixPage");
                  $("html").addClass("fixPage");
                }
         };
         Plugin.prototype.revisoSmartbanner = function(){          
             if($("html").css("margin-top") != "0px" ){
                $(mainwrapper).addClass("smartopen"); 
              }else{
               $(mainwrapper).removeClass('smartopen'); 
              }
         };
         Plugin.prototype.revisoPage = function(){ 
              if( $(".hd_page").hasClass('open')) {
                  $(mainwrapper).removeClass('subov');
               }else{
                  $(mainwrapper).addClass('subov');
               }
          };
                
        ////////////////////////////////////////////////////////////
        ////Funciones para el Header
        ////////////////////////////////////////////////////////////
        //Función para el Header Fixed
        Plugin.prototype.headerFixing = function () {
            if ( $(window).scrollTop() > $(mainwrapper).offset().top ){                  
                  fixedTarget.addClass("fixed");
                  fixedTarget2.addClass("fixed");
            }else{
                  fixedTarget.removeClass("fixed");
                  fixedTarget2.removeClass("fixed");
            }            
        };
   
        //Detecto device del usuario para agregar clase touch
        Plugin.prototype.detect_device  = function() {
              var dispositivo = navigator.userAgent.toLowerCase();

              if( dispositivo.search(/iphone|ipod|ipad|android/) > -1 ){
                  $("html").addClass("touch");
              }
               
              if( dispositivo.search(/crios/) > -1 ){
                  $("html").addClass("ioschrome");
              }
              if( dispositivo.search(/android/) > -1 ){
                  $("html").addClass("android");
              }
        };
       

        $.fn[pluginName] = function ( options ) {
          return this.each(function () {
            if (!$.data(this, 'plugin_' + pluginName)) {
              $.data(this, 'plugin_' + pluginName, new Plugin( this, options ));
            }
          });
        };
  }(jQuery, window));
}
/*END FUNCTIONS H1N4*/
////VIDEO CARD ON DEMAND PLUGIN////

jQuery(document).on( "videosrequest", function() {
  if(jQuery("#hd_videocard_od").length === 0 ){
    jQuery('#hd_videocard_od').videocard_od();
  }
});
jQuery(document).on( "feedSLoading", function() {
  jQuery("#odcards_container").append('<div class="odcards_error_message"><span>Seguimos cargando el contenido</span></div>');
});
jQuery(document).on( "feedFail", function() {
  jQuery("#odcards_container .prime-loader").hide();
  jQuery("#odcards_container .odcards_error_message" ).html('Lo sentimos, el contenido no está disponible por el momento.');
  
});
(function($) {
  $.fn.videocard_od = function(){
    var comp = {
      self: this,
      container: $("#odcards_container"),
      data: [],
      validojson: function(){
        var tmpJsonFile = "headerdeportes.videos.js";
        if(comp.container.data('us')){
        tmpJsonFile = "us/headerdeportesus.videos.js";
        }
        $.ajax({
                url:("/content/televisa/deportes/"+tmpJsonFile),
          dataType: "jsonp",
          jsonp: false,
          jsonpCallback:"showVideoOnDemand",
          success: function(response) {
            if(response.settings){
              //ARMAR CON GSA
              if (typeof $.fn.gsa === 'undefined' && typeof $.gsa === 'undefined'){
                $.ajax({
                  url: "http://i2.esmas.com/js/libs/gsa/gsa.api.js",
                  dataType: "script",
                  success: function(){
                    if($("#odcards_container").find("#hd_videocard_od").length === 0){
                    comp.loadData(response);
                  }                   
                  }
                });
              }
              else{
                if($("#odcards_container").find("#hd_videocard_od").length === 0){
                    comp.loadData(response);
                } 
              }
            }else{
              comp.container.addClass('loaded');
              jQuery("#odcards_container .prime-loader").hide();
                //ARMAR CON JSON
              var results = response.vod;
              $.each(results, function(i, result){  
                  var durationedited = "";                
                if(result.duracion.substring(0,2) === "00"){
                  durationedited = result.duracion.substring(3);
                }else{
                  durationedited = result.duracion;
                }
                var item = {
                  url: result.url,
                  urlImagen: result.urlImagen,
                  duracion: durationedited,
                  titulo: result.titulo ,
                  altimg: result.titulo ,
                };        
                comp.renderItem(item);
              });
               
            }
          },
          error: function(a, b, c){
            console.log(a);
            console.log(b);
            console.log(c);
            $.ajax({
                    //url:("../../../assets/dmf3-redeportes/js/videoondemand-gsa.json"),
                    //url: "http://content-staging-sports.televisa.com/content/televisa/deportes/"+tmpJsonFile,
                    url: "http://deportes.televisa.com/content/televisa/deportes/"+tmpJsonFile,
              dataType: "jsonp",
              jsonp: false,
              jsonpCallback:"showVideoOnDemand",
              success: function(response) {
                if(response.settings){
                  //ARMAR CON GSA
                  if (typeof $.fn.gsa === 'undefined' && typeof $.gsa === 'undefined'){
                    $.ajax({
                      url: "http://i2.esmas.com/js/libs/gsa/gsa.api.js",
                      dataType: "script",
                      success: function(){
                        if($("#odcards_container").find("#hd_videocard_od").length === 0){
                        comp.loadData(response);
                      }                   
                      }
                    });
                  }
                  else{
                    if($("#odcards_container").find("#hd_videocard_od").length === 0){
                        comp.loadData(response);
                    } 
                  }
                }else{
                  comp.container.addClass('loaded');
                  jQuery("#odcards_container .prime-loader").hide();
                    //ARMAR CON JSON
                  var results = response.vod;
                  $.each(results, function(i, result){  
                      var durationedited = "";                
                    if(result.duracion.substring(0,2) === "00"){
                      durationedited = result.duracion.substring(3);
                    }else{
                      durationedited = result.duracion;
                    }
                    var item = {
                      url: result.url,
                      urlImagen: result.urlImagen,
                      duracion: durationedited,
                      titulo: result.titulo ,
                      altimg: result.titulo ,
                    };        
                    comp.renderItem(item);
                  });      
                }

              },
              error: function(a, b, c){
                  var errormsge = '<div class="odcards_error_message2"><span>Lo sentimos, el contenido no está disponible por el momento.</span></div>'; 
                  if($(".odcards_error_message2").length === 0 && $(".odcards_error_message").length === 0 ){
                    comp.container.append(errormsge);
                    comp.container.addClass('loaded');
                } 
                
              }
            });           
          }   
        });
      },  
      createItem: function(item){
        var template = '<article id="hd_videocard_od">';
        template += '<a href="'+item.url+'">';
        template += '<div class="videocard__lateral">';
        template += '<div class="videodatew">';
        template += '<img src="'+item.urlImagen+'" alt="'+item.altimg+'">';
        template += '</div>';
        template += '<i class="tvsa-play2"></i> ';
        template += '<div class="videodatew__duration">';
        template += '<span>'+item.duracion+'</span>';
        template += '</div>';
        template += '</div>';
        template += '<div class="videocard__main">';
        template += '<span>'+item.titulo+'</span>';
        template += '<div class="lineaseparadora"></div>';
        template += '</div>';
        template += '</a>';
        template += '</article>';
        return template;
      },
      renderItem: function(item){
        comp.container.append(comp.createItem(item));
      },
      loadData: function(response){
      var pathgsa = response.settings[0].pathGsa; 
      var lastChar = pathgsa.substr(pathgsa.length - 1);  
      if( lastChar == "/" ){
        pathgsa = pathgsa.substr(0, pathgsa.length - 1);
      }
         
        $.gsa({
           GSA_query : "site:"+pathgsa,
          //GSA_query : "site:http://deportes.televisa.com/"+response.settings[0].pathGsa.split("content/televisa/deportes/")[1],
          //GSA_query : "site:http://deportes.televisa.com/"+response.settings[0].pathGsa.substring(26),
          GSA_num : comp.container.data("gsanum"),
          GSA_client : comp.container.data("gsaclient"),
          GSA_site : comp.container.data("gsasite"),
          GSA_requiredfields : 'tipo:video',
          GSA_start : 0,
          GSA_ie: 'UTF-8',
          GSA_oe : 'UTF-8',
          //GSA_partialfields : response.settings[0].tags.replace(/deportes:/gi, "tags:").replace(/,/gi, " |"),
          GSA_partialfields : "tags:"+response.settings[0].tags.replace(/,/gi, "|tags:"),
          GSA_sort : 'D:S:d1 ',
          GSA_module : 'articles_latest',
          GSA_StillLoading_Time: 5000,
            GSA_fail_Time:10000,
            GSA_onStillLoading: 'feedSLoading',
            GSA_onFail: 'feedFail',
            GSA_onSucces: 'feedsuccess',

        }, function(data){

          comp.container.addClass('loaded');
          jQuery("#odcards_container .prime-loader").hide();
          if (data.RES) {
            comp.container.find(".nohaycontent").remove();
            var results = $.gsa.results(data);
            $.each(results, function(i, result){
              var durationedited = "";
              if(result.duration.substring(0,2) === "00"){
                durationedited = result.duration.substring(3);
              }else{
                durationedited = result.duration;
              }         
              var item = {
                url: result.U,
                urlImagen: result['136x77'],
                duracion: durationedited,
                titulo: result.title ,
                altimg: result.T ,
              };
              comp.renderItem(item);
            });
          }else{
            comp.container.find(".nohaycontent").remove();
            comp.container.append('<div class="nohaycontent" style="text-align:center;height: 50px;color: gray;">Lo sentimos, el contenido no está disponible por el momento.</div>');
          }
        });
      },  
      init: function(){
        comp.validojson();
      }
    };
    comp.init();
    return this;
  };

})(jQuery);
////VIDEO CARD EN VIVO PLUGIN////

var envivoInterval;
var responseactual =[];
jQuery(document).on( "stopvivoInterval", function() {
   clearInterval(envivoInterval);
});

jQuery(document).on( "envivorequest", function() {
  
  jQuery('#hd_videocard_envivo').videocard_envivo();
  clearInterval(envivoInterval);
  envivoInterval = setInterval(function(){  
    jQuery('#hd_videocard_envivo').videocard_envivo();
  }, 60000);   
});


(function($) {
  $.fn.videocard_envivo = function(){
    renderVivoObject =[];
    renderPrevObject =[];
    renderObjects =[];
    objetosRendereados = 0;
    var comp = {
      self: this,
      container: $("#hd_vivocards__overflow"),
      data: [],
      validojson: function(){
        $.ajax({
                url:("/bin/commons/videos/vivo.json"),
          dataType: "jsonp",
          jsonp: false,
          jsonpCallback:"showVideoEnVivo",
          cache: false,
          success: function(response) {
              comp.functionSuccess(response);
          },
          error: function(a, b, c){
            $.ajax({
               url: "http://deportes.televisa.com/bin/commons/videos/vivo.json",
              //url: "http://content-staging-sports.televisa.com/bin/commons/videos/vivo.json",
              dataType: "jsonp",
              jsonp: false,
              jsonpCallback:"showVideoEnVivo",
              cache: false,
              success: function(response) {
                comp.functionSuccess(response);               
              },
              error: function(a, b, c){                
                console.log("Error al leer el feed Video cards en vivo");
                            
              }
            }); 
               
                      
          },
        });
      },
      functionSuccess: function(response){
                  inicioElems();
                  function inicioElems(){                               
                  responseactual = response;
                  comp.container.addClass('loaded');
                  jQuery("#vivocards_container .prime-loader").hide();
                  var results = response.videos;
                  var cardenvivo = false;
                  $.each(results, function(i, result){  
                        var fechaedited = result.fecha;            
                          var fechaFormat = '';
                          var horaFormat = '';
                          if(result.fecha !== ''){
                            var parts =fechaedited.split('-');
                            var mydate = new Date(parts[0],parseInt(parts[1]-1),parseInt(parts[2]));
                            var d = new Date(mydate);
                            var month = ["Ene","Feb","Mar","Abr","May","Jun","Jul","Ago","Sep","Oct","Nov","Dic"];
                            var mes = month[d.getMonth()];
                            var dia = d.getUTCDate();
                            fechaFormat =  dia+' '+mes;
                          }
                          if(result.hora !== ''){
                           horaFormat = result.hora;
                          }
                         
                        $.ajax({
                              url:("http://amp.televisa.com/tvenvivofiles/"+ result.idVideo +"/playerstate.txt"),
                              cache: false,
                              success: function(response2){
                               if(response2 === "on"){
                                 renderVivoObject[i] = item;                   
                               }else if(response2 === "pre"){
                                renderPrevObject[i] = item;            
                                 } 
                                 comp.checarRecibidos(response);
                               },
                              error: function(){
                                 comp.checarRecibidos(response);
                                }
                        });

                          var item = {  
                             fecha: fechaFormat,
                             hora: horaFormat,
                             texto: result.texto ,
                             urlVideo: result.urlVideo
                          };

                    }); 
                  
                    if(response.videos.length === 0){
                        comp.container.removeClass('minheight');
                        $(".hd_videocards__superWrapper").removeClass('minheight');
                    }
                    }
                    function isEmpty( el ){
                      return !$.trim(el.html());
                  } 
      },
      checarRecibidos:function(response){
        objetosRendereados++;
        if(objetosRendereados===response.videos.length){ 
          comp.renderGroupItems(renderVivoObject,renderPrevObject);
        }
      },
      renderGroupItems: function(array1,array2){
        if(array1.length > 0 || array2.length > 0 ){
          $("#hd_vivocards__overflow").empty(); 
          if(array1.length > 0){
            pintovivos();
            pintoproximos();
            $("#vivocards_container").show();
          }else{ 
            pintoproximos();
          }         
          $("#proximocards_container").show();
        }
        function pintoproximos(){
            comp.container.append('<div id="proximocards_container" class="hd_videocards__wrapper"><div class="hd_videocards__title"><span>Próximos</span></div></div>');
            pintocard(array2,"proximo",false);          
        }
        function pintovivos(){
            comp.container.prepend('<div id="vivocards_container" class="hd_videocards__wrapper"><div class="hd_videocards__title"><span>En vivo</span></div></div>');
            pintocard(array1,"vivo",true);        
        }
        function pintocard(array,id,vivoval){
          $.each(array, function(index, item) {
            if(item!==undefined){
              comp.container.find("#"+id+"cards_container").append(comp.createItem(item,vivoval));            }
          }); 
        }
      },
      createItem: function(item,vivoval){
        var template;
        if(vivoval === true){
          template = '<article id="hd_vivocard--envivo" class="hd_videocard hd_vivocard">';
          template += '<a href="'+item.urlVideo+'">';
          template += '<div class="videocard__lateral">'; 
          template += '<i class="tvsa-play2"></i> '; 
          template += '</div>';
          template += '<div class="videocard__main">';
          template += '<div class="vertc">';
          template += '<span>'+item.texto+'</span>';
          template += '</div>';
          template += '</div>';
          template += '</a>';
          template += '</article>';
          return template;
        }else{
          template = '<article id="hd_vivocard--proximo" class="hd_videocard hd_vivocard">';
          if(item.urlVideo !== ''){
            template += '<a href="'+item.urlVideo+'">';
          }
          if((item.fecha !== '') || (item.hora !== '')){
            template += '<div class="videocard__lateral">'; 
            template += '<div class="videodatew">'; 
            template += '<span>'+item.fecha+'</span>'; 
            template += '<span>'+item.hora+'</span>'; 
            template += '</div>';
            template += '</div>';
          }
          template += '<div class="videocard__main">';
          template += '<div class="vertc">';
          template += '<span>'+item.texto+'</span>';
          template += '</div>';
          template += '</div>';
          if(item.urlVideo !== ''){
            template += '</a>';
          }
          template += '</article>';
          return template;
          }
      },
      init: function(){
        comp.validojson();
      }
    };
    comp.init();
    return this;
  };

})(jQuery);
// ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                             tinysort
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
(function (root,tinysort) {
    'use strict';

    if (typeof define==='function'&&define.amd) {
        define('tinysort',singleton);
    } else {
        root.tinysort = tinysort;
    }
    function singleton(){
        return tinysort;
    }
}(this,(function() {
    'use strict';

    var fls = !1
        ,undef
        ,nll = null
        ,win = window
        ,doc = win.document
        ,parsefloat = parseFloat
        ,regexLastNr = /(-?\d+\.?\d*)\s*$/g     // regex for testing strings ending on numbers
        ,regexLastNrNoDash = /(\d+\.?\d*)\s*$/g // regex for testing strings ending on numbers ignoring dashes
        ,plugins = []
        ,numCriteria = 0
        ,criteriumIndex = 0
        ,defaults = {               // default settings

            selector: nll           // order: asc, desc or rand

            ,order: 'asc'           // order: asc, desc or rand

            ,attr: nll              // order by attribute value
            ,data: nll              // use the data attribute for sorting
            ,useVal: fls            // use element value instead of text

            ,place: 'org'           // place ordered elements at position: start, end, org (original position), first, last
            ,returns: fls           // return all elements or only the sorted ones (true/false)

            ,cases: fls             // a case sensitive sort orders [aB,aa,ab,bb]
            ,forceStrings:fls       // if false the string '2' will sort with the value 2, not the string '2'

            ,ignoreDashes:fls       // ignores dashes when looking for numerals

            ,sortFunction: nll      // override the default sort function

            ,useFlex:fls
            ,emptyEnd:fls
        }
    ;

    /**
     * TinySort is a small and simple script that will sort any nodeElment by it's text- or attribute value, or by that of one of it's children.
     * @memberof tinysort
     * @public
     * @param {NodeList|HTMLElement[]|String} nodeList The nodelist or array of elements to be sorted. If a string is passed it should be a valid CSS selector.
     * @param {Object} [options] A list of options.
     * @param {String} [options.selector] A CSS selector to select the element to sort to.
     * @param {String} [options.order='asc'] The order of the sorting method. Possible values are 'asc', 'desc' and 'rand'.
     * @param {String} [options.attr=null] Order by attribute value (ie title, href, class)
     * @param {String} [options.data=null] Use the data attribute for sorting.
     * @param {String} [options.place='org'] Determines the placement of the ordered elements in respect to the unordered elements. Possible values 'start', 'end', 'first', 'last' or 'org'.
     * @param {Boolean} [options.useVal=false] Use element value instead of text.
     * @param {Boolean} [options.cases=false] A case sensitive sort (orders [aB,aa,ab,bb])
     * @param {Boolean} [options.forceStrings=false] If false the string '2' will sort with the value 2, not the string '2'.
     * @param {Boolean} [options.ignoreDashes=false] Ignores dashes when looking for numerals.
     * @param {Function} [options.sortFunction=null] Override the default sort function. The parameters are of a type {elementObject}.
     * @param {Boolean} [options.useFlex=true] If one parent and display flex, ordering is done by CSS (instead of DOM)
     * @param {Boolean} [options.emptyEnd=true] Sort empty values to the end instead of the start
     * @returns {HTMLElement[]}
     */
    function tinysort(nodeList,options){
        if (isString(nodeList)) nodeList = doc.querySelectorAll(nodeList);
        if (nodeList.length===0) {
            console.warn('No elements to sort');
        }

        var fragment = doc.createDocumentFragment()
            /** both sorted and unsorted elements
             * @type {elementObject[]} */
            ,elmObjsAll = []
            /** sorted elements
             * @type {elementObject[]} */
            ,elmObjsSorted = []
            /** unsorted elements
             * @type {elementObject[]} */
            ,elmObjsUnsorted = []
            /** sorted elements before sort
             * @type {elementObject[]} */
            ,elmObjsSortedInitial
            /** @type {criteriumIndex[]} */
            ,criteria = []
            /** @type {HTMLElement} */
            ,parentNode
            ,isSameParent = true
            ,isFlex = nodeList.length&&(options===undef||options.useFlex!==false)&&getComputedStyle(nodeList[0].parentNode,null).display.indexOf('flex')!==-1
        ;

        initCriteria.apply(nll,Array.prototype.slice.call(arguments,1));
        initSortList();
        sort();
        applyToDOM();

        /**
         * Create criteria list
         */
        function initCriteria(){
            if (arguments.length===0) {
                addCriterium({}); // have at least one criterium
            } else {
                loop(arguments,function(param){
                    addCriterium(isString(param)?{selector:param}:param);
                });
            }
            numCriteria = criteria.length;
        }

        /**
         * A criterium is a combination of the selector, the options and the default options
         * @typedef {Object} criterium
         * @property {String} selector - a valid CSS selector
         * @property {String} order - order: asc, desc or rand
         * @property {String} attr - order by attribute value
         * @property {String} data - use the data attribute for sorting
         * @property {Boolean} useVal - use element value instead of text
         * @property {String} place - place ordered elements at position: start, end, org (original position), first
         * @property {Boolean} returns - return all elements or only the sorted ones (true/false)
         * @property {Boolean} cases - a case sensitive sort orders [aB,aa,ab,bb]
         * @property {Boolean} forceStrings - if false the string '2' will sort with the value 2, not the string '2'
         * @property {Boolean} ignoreDashes - ignores dashes when looking for numerals
         * @property {Function} sortFunction - override the default sort function
         * @property {boolean} hasSelector - options has a selector
         * @property {boolean} hasFilter - options has a filter
         * @property {boolean} hasAttr - options has an attribute selector
         * @property {boolean} hasData - options has a data selector
         * @property {number} sortReturnNumber - the sort function return number determined by options.order
         */

        /**
         * Adds a criterium
         * @memberof tinysort
         * @private
         * @param {Object} [options]
         */
        function addCriterium(options){
            var hasSelector = !!options.selector
                ,hasFilter = hasSelector&&options.selector[0]===':'
                ,allOptions = extend(options||{},defaults)
            ;
            criteria.push(extend({
                // has find, attr or data
                hasSelector: hasSelector
                ,hasAttr: !(allOptions.attr===nll||allOptions.attr==='')
                ,hasData: allOptions.data!==nll
                // filter
                ,hasFilter: hasFilter
                ,sortReturnNumber: allOptions.order==='asc'?1:-1
            },allOptions));
        }

        /**
         * The element object.
         * @typedef {Object} elementObject
         * @property {HTMLElement} elm - The element
         * @property {number} pos - original position
         * @property {number} posn - original position on the partial list
         */

        /**
         * Creates an elementObject and adds to lists.
         * Also checks if has one or more parents.
         * @memberof tinysort
         * @private
         */
        function initSortList(){
            loop(nodeList,function(elm,i){
                if (!parentNode) parentNode = elm.parentNode;
                else if (parentNode!==elm.parentNode) isSameParent = false;
                var criterium = criteria[0]
                    ,hasFilter = criterium.hasFilter
                    ,selector = criterium.selector
                    ,isPartial = !selector||(hasFilter&&elm.matchesSelector(selector))||(selector&&elm.querySelector(selector))
                    ,listPartial = isPartial?elmObjsSorted:elmObjsUnsorted
                    ,elementObject = {
                        elm: elm
                        ,pos: i
                        ,posn: listPartial.length
                    }
                ;
                elmObjsAll.push(elementObject);
                listPartial.push(elementObject);
            });
            elmObjsSortedInitial = elmObjsSorted.slice(0);
        }

        /**
         * Sorts the sortList
         */
        function sort(){
            elmObjsSorted.sort(sortFunction);
        }

        /**
         * Sort all the things
         * @memberof tinysort
         * @private
         * @param {elementObject} a
         * @param {elementObject} b
         * @returns {number}
         */
        function sortFunction(a,b){
            var sortReturnNumber = 0;
            if (criteriumIndex!==0) criteriumIndex = 0;
            while (sortReturnNumber===0&&criteriumIndex<numCriteria) {
                /** @type {criterium} */
                var criterium = criteria[criteriumIndex]
                    ,regexLast = criterium.ignoreDashes?regexLastNrNoDash:regexLastNr;
                //
                loop(plugins,function(plugin){
                    var pluginPrepare = plugin.prepare;
                    if (pluginPrepare) pluginPrepare(criterium);
                });
                //
                if (criterium.sortFunction) { // custom sort
                    sortReturnNumber = criterium.sortFunction(a,b);
                } else if (criterium.order=='rand') { // random sort
                    sortReturnNumber = Math.random()<0.5?1:-1;
                } else { // regular sort
                    var isNumeric = fls
                        // prepare sort elements
                        ,valueA = getSortBy(a,criterium)
                        ,valueB = getSortBy(b,criterium)
                        ,noA = valueA===''||valueA===undef
                        ,noB = valueB===''||valueB===undef
                    ;
                    if (valueA===valueB) {
                        sortReturnNumber = 0;
                    } else if (criterium.emptyEnd&&(noA||noB)) {
                        sortReturnNumber = noA&&noB?0:noA?1:-1;
                    } else {
                        if (!criterium.forceStrings) {
                            // cast to float if both strings are numeral (or end numeral)
                            var  valuesA = isString(valueA)?valueA&&valueA.match(regexLast):fls// todo: isString superfluous because getSortBy returns string|undefined
                                ,valuesB = isString(valueB)?valueB&&valueB.match(regexLast):fls
                            ;
                            if (valuesA&&valuesB) {
                                var  previousA = valueA.substr(0,valueA.length-valuesA[0].length)
                                    ,previousB = valueB.substr(0,valueB.length-valuesB[0].length);
                                if (previousA==previousB) {
                                    isNumeric = !fls;
                                    valueA = parsefloat(valuesA[0]);
                                    valueB = parsefloat(valuesB[0]);
                                }
                            }
                        }
                        if (valueA===undef||valueB===undef) {
                            sortReturnNumber = 0;
                        } else {
                            sortReturnNumber = valueA<valueB?-1:(valueA>valueB?1:0);
                        }
                    }
                }
                loop(plugins,function(o){
                    var pluginSort = o.sort;
                    if (pluginSort) sortReturnNumber = pluginSort(criterium,isNumeric,valueA,valueB,sortReturnNumber);
                });
                sortReturnNumber *= criterium.sortReturnNumber; // lastly assign asc/desc
                if (sortReturnNumber===0) criteriumIndex++;
            }
            if (sortReturnNumber===0) sortReturnNumber = a.pos>b.pos?1:-1;
            return sortReturnNumber;
        }

        /**
         * Applies the sorted list to the DOM
         * @memberof tinysort
         * @private
         */
        function applyToDOM(){
            var hasSortedAll = elmObjsSorted.length===elmObjsAll.length;
            if (isSameParent&&hasSortedAll) {
                if (isFlex) {
                    elmObjsSorted.forEach(function(elmObj,i){
                        elmObj.elm.style.order = i;
                    });
                } else {
                    if (parentNode) parentNode.appendChild(sortedIntoFragment());
                    else console.warn('parentNode has been removed');
                }
            } else {
                var criterium = criteria[0]
                    ,place = criterium.place
                    ,placeOrg = place==='org'
                    ,placeStart = place==='start'
                    ,placeEnd = place==='end'
                    ,placeFirst = place==='first'
                    ,placeLast = place==='last'
                ;
                if (placeOrg) {
                    elmObjsSorted.forEach(addGhost);
                    elmObjsSorted.forEach(function(elmObj,i) {
                        replaceGhost(elmObjsSortedInitial[i],elmObj.elm);
                    });
                } else if (placeStart||placeEnd) {
                    var startElmObj = elmObjsSortedInitial[placeStart?0:elmObjsSortedInitial.length-1]
                        ,startParent = startElmObj.elm.parentNode
                        ,startElm = placeStart?startParent.firstChild:startParent.lastChild;
                    if (startElm!==startElmObj.elm) startElmObj = {elm:startElm};
                    addGhost(startElmObj);
                    placeEnd&&startParent.appendChild(startElmObj.ghost);
                    replaceGhost(startElmObj,sortedIntoFragment());
                } else if (placeFirst||placeLast) {
                    var firstElmObj = elmObjsSortedInitial[placeFirst?0:elmObjsSortedInitial.length-1];
                    replaceGhost(addGhost(firstElmObj),sortedIntoFragment());
                }
            }
        }

        /**
         * Adds all sorted elements to the document fragment and returns it.
         * @memberof tinysort
         * @private
         * @returns {DocumentFragment}
         */
        function sortedIntoFragment(){
            elmObjsSorted.forEach(function(elmObj){
                fragment.appendChild(elmObj.elm);
            });
            return fragment;
        }

        /**
         * Adds a temporary element before an element before reordering.
         * @memberof tinysort
         * @private
         * @param {elementObject} elmObj
         * @returns {elementObject}
         */
        function addGhost(elmObj){
            var element = elmObj.elm
                ,ghost = doc.createElement('div')
            ;
            elmObj.ghost = ghost;
            element.parentNode.insertBefore(ghost,element);
            return elmObj;
        }

        /**
         * Inserts an element before a ghost element and removes the ghost.
         * @memberof tinysort
         * @private
         * @param {elementObject} elmObjGhost
         * @param {HTMLElement} elm
         */
        function replaceGhost(elmObjGhost,elm){
            var ghost = elmObjGhost.ghost
                ,ghostParent = ghost.parentNode;
            ghostParent.insertBefore(elm,ghost);
            ghostParent.removeChild(ghost);
            delete elmObjGhost.ghost;
        }

        /**
         * Get the string/number to be sorted by checking the elementObject with the criterium.
         * @memberof tinysort
         * @private
         * @param {elementObject} elementObject
         * @param {criterium} criterium
         * @returns {String}
         * @todo memoize
         */
        function getSortBy(elementObject,criterium){
            var sortBy
                ,element = elementObject.elm;
            // element
            if (criterium.selector) {
                if (criterium.hasFilter) {
                    if (!element.matchesSelector(criterium.selector)) element = nll;
                } else {
                    element = element.querySelector(criterium.selector);
                }
            }
            // value
            if (criterium.hasAttr) sortBy = element.getAttribute(criterium.attr);
            else if (criterium.useVal) sortBy = element.value||element.getAttribute('value');
            else if (criterium.hasData) sortBy = element.getAttribute('data-'+criterium.data);
            else if (element) sortBy = element.textContent;
            // strings should be ordered in lowercase (unless specified)
            if (isString(sortBy)) {
                if (!criterium.cases) sortBy = sortBy.toLowerCase();
                sortBy = sortBy.replace(/\s+/g,' '); // spaces/newlines
            }
            return sortBy;
        }

        /*function memoize(fnc) {
            var oCache = {}
                , sKeySuffix = 0;
            return function () {
                var sKey = sKeySuffix + JSON.stringify(arguments); // todo: circular dependency on Nodes
                return (sKey in oCache)?oCache[sKey]:oCache[sKey] = fnc.apply(fnc,arguments);
            };
        }*/

        /**
         * Test if an object is a string
         * @memberOf tinysort
         * @method
         * @private
         * @param o
         * @returns {boolean}
         */
        function isString(o){
            return typeof o==='string';
        }

        return elmObjsSorted.map(function(o) {
            return o.elm;
        });
    }

    /**
     * Traverse an array, or array-like object
     * @memberOf tinysort
     * @method
     * @private
     * @param {Array} array The object or array
     * @param {Function} func Callback function with the parameters value and key.
     */
    function loop(array,func){
        var l = array.length
            ,i = l
            ,j;
        while (i--) {
            j = l-i-1;
            func(array[j],j);
        }
    }

    /**
     * Extend an object
     * @memberOf tinysort
     * @method
     * @private
     * @param {Object} obj Subject.
     * @param {Object} fns Property object.
     * @param {boolean} [overwrite=false]  Overwrite properties.
     * @returns {Object} Subject.
     */
    function extend(obj,fns,overwrite){
        for (var s in fns) {
            if (overwrite||obj[s]===undef) {
                obj[s] = fns[s];
            }
        }
        return obj;
    }

    function plugin(prepare,sort,sortBy){
        plugins.push({prepare:prepare,sort:sort,sortBy:sortBy});
    }

    // matchesSelector shim
    win.Element&&(function(ElementPrototype) {
        ElementPrototype.matchesSelector = ElementPrototype.matchesSelector
        ||ElementPrototype.mozMatchesSelector
        ||ElementPrototype.msMatchesSelector
        ||ElementPrototype.oMatchesSelector
        ||ElementPrototype.webkitMatchesSelector
        ||function (selector) {
            var that = this, nodes = (that.parentNode || that.document).querySelectorAll(selector), i = -1;
            //jscs:disable requireCurlyBraces
            while (nodes[++i] && nodes[i] != that);
            //jscs:enable requireCurlyBraces
            return !!nodes[i];
        };
    })(Element.prototype);

    // extend the plugin to expose stuff
    extend(plugin,{
        loop: loop
    });

    return extend(tinysort,{
        plugin: plugin
        ,defaults: defaults
    });
})()));
//End tinysort
// ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                             generateProgramsJSON
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//Begin generateProgramsJSON
var pathJSON = "";
var errorFlag = false;
var numberJSONSOK = 0;

var widthScreen = jQuery(window).width();
var nextDate  = 0;
var elementsJSON = new Object();
var dateJSON = new Object();
elementsJSON.channels = new Array();
jsonDates = new Array();
jsonURL = new Array();
var consultas = [];
var urls=[];
var searchJSONTries = 7;
elementsJSON.channels[0] = "CANAL2";
elementsJSON.channels[1] = "CANAL4";
elementsJSON.channels[2] = "CANAL5";
elementsJSON.channels[3] = "CANAL9";
elementsJSON.channels[4] = "SKY";
elementsJSON.channels[5] = "TDN";
elementsJSON.channels[6] = "WEB";

//Draw JSONs
jQuery(document).on(" agendarequest  ", function() {
    urljson = jQuery("#hd_btn_wrap3").data("json");
    drawJSONInfo();
});

function formatDate(date){
    var dias_semana = new Array("Domingo","Lunes","Martes","Miercoles","Jueves","Viernes","Sabado");
    var meses = new Array ("Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre", "Diciembre");
    var res = date.split("-");
    //Get the dates day
    var fechacard = new Date(res[0], eval(res[1]-1), res[2]);
    fechacard.getDay();
    //Generate dates text
    var generateDateCard = dias_semana[fechacard.getDay()] + " " + res[2] + " de " + meses[fechacard.getMonth()] + " de " + res[0];
    //Return formated date
    return generateDateCard;
}

function formatSchedule(schedule){
    var res = schedule.split(":");
    //Generate schedules text
    var scheduleWithoutSecs = res[0] + ":" + res[1];
    //Return formated schedule
    return scheduleWithoutSecs;
}

function formatedChannelName(channel){
    var channels = new Array("Canal 2","Canal 4","Canal 5","Canal 9");
    switch (channel) {
    case "CANAL2":
        return channels[0];
    case "CANAL4":
        return channels[1];
    case "CANAL5":
        return channels[2];
    case "CANAL9":
        return channels[3];
    case "SKY":
        return channel;
    case "TDN":
        return channel;
    case "WEB":
        return channel;
    }
}

function transformYearTwoDigits(year){
    var lenghtString = year.length;
    return year.substr(2, lenghtString);
}

function getYearNextDates(month, year, day){
    if (month == "12") {
        getMonthNextDates(month, year, day);
    }else{
        dateJSON.nextYear = year;
        getMonthNextDates(month, year, day);
    };
}

function getMonthNextDates(month, year, day){
  var lengthDay = 0;
  if (dateJSON.month == "01" || dateJSON.month == "03" || dateJSON.month == "05" || dateJSON.month == "07" || dateJSON.month == "08" || dateJSON.month == "10" || dateJSON.month == "12") {
      if (day == 31) {
          //Check month
          month = parseInt(month) + 1;
          if (month <= 9) {
            dateJSON.nextMonth = "0" + month.toString();
          }else{
            dateJSON.nextMonth = month.toString();
          }; 
          if (month == 12) {
            dateJSON.nextYear = year + 1;
          };
          dateJSON.nextDay = "01";
          dateJSON.month = dateJSON.nextMonth;
      }else{
          if (isNaN(day)){
              dateJSON.nextMonth = month;
              lengthDay = lengthDay.length;
              var numberDay = day.substr(1, lengthDay);
              numberDay = parseInt(numberDay) + 1;
              if (numberDay < 10) {
                  if (numberDay != 1) {
                      dateJSON.nextDay = "0" + numberDay.toString();
                  };
              };
          }else{
              dateJSON.nextMonth = month;
              dateJSON.nextDay = parseInt(day) + 1;
              if (dateJSON.nextDay < 10 && dateJSON.nextDay != 1) {
                  day = dateJSON.nextDay;
                  dateJSON.nextDay = "0" + day.toString();
              };
          }
          
      };
  }else if(dateJSON.month == "04" || dateJSON.month == "06" || dateJSON.month == "09" || dateJSON.month == "11"){
      if (day == 30) {
          month = parseInt(month) + 1; 
          if (month <= 9) {
            dateJSON.nextMonth = "0" + month.toString();
          }else{
            dateJSON.nextMonth = month.toString();
          }; 
          dateJSON.nextDay = "01";
          dateJSON.month = dateJSON.nextMonth;
      }else{

          if (isNaN(day)){
              dateJSON.nextMonth = month;
              lengthDay = lengthDay.length;
              var numberDay = day.substr(1, lengthDay);
              numberDay = parseInt(numberDay) + 1;
              if (numberDay < 10) {
                  if (numberDay != 1) {
                      dateJSON.nextDay = "0" + numberDay.toString();
                  };
              };
          }else{
              dateJSON.nextMonth = month;
              dateJSON.nextDay = parseInt(day) + 1;
              if (dateJSON.nextDay < 10 && dateJSON.nextDay != 1) {
                  day = dateJSON.nextDay;
                  dateJSON.nextDay = "0" + day.toString();
              };
          }
      };
  }else if(dateJSON.month == "02"){
      var lengthDay = 0;
      var residue = year%4;
      if (residue == 0) {
          if (day == 29) {
              month = parseInt(month) + 1; 
              if (month <= 9) {
                dateJSON.nextMonth = "0" + month.toString();
              }else{
                dateJSON.nextMonth = month.toString();
              }; 
              dateJSON.nextDay = "01";
              dateJSON.month = dateJSON.nextMonth;
          }else{
              if (isNaN(day)){
                  dateJSON.nextMonth = month;
                  lengthDay = lengthDay.length;
                  var numberDay = day.substr(1, lengthDay);
                  numberDay = parseInt(numberDay) + 1;
                  if (numberDay < 10) {
                      if (numberDay != 1) {
                          dateJSON.nextDay = "0" + numberDay.toString();
                      };
                  };
              }else{
                  dateJSON.nextMonth = month;
                  dateJSON.nextDay = parseInt(day) + 1;
                  if (dateJSON.nextDay < 10 ) {
                      if (dateJSON.nextDay != 1) {
                          day = dateJSON.nextDay;
                          dateJSON.nextDay = "0" + day.toString();
                      };
                      
                  };
              }
          };
      }else{
          if (day == 28) {
              month = parseInt(month) + 1; 
              if (month <= 9) {
                dateJSON.nextMonth = "0" + month.toString();
              }else{
                dateJSON.nextMonth = month.toString();
              }; 
              dateJSON.nextDay = "01";
              dateJSON.month = dateJSON.nextMonth;
          }else{
              
              if (isNaN(day)){
                  dateJSON.nextMonth = month;
                  lengthDay = lengthDay.length;
                  var numberDay = day.substr(1, lengthDay);
                  numberDay = parseInt(numberDay) + 1;
                  if (numberDay < 10) {
                      if (numberDay != 1) {
                          dateJSON.nextDay = "0" + numberDay.toString();
                      };
                  };
              }else{
                  dateJSON.nextMonth = month;
                  dateJSON.nextDay = parseInt(day) + 1;
                  if (dateJSON.nextDay < 10 ) {
                      if (dateJSON.nextDay != 1) {
                          dateJSON.nextDay = "0" + dateJSON.nextDay.toString();
                          day = dateJSON.nextDay;
                          dateJSON.nextDay = "0" + day.toString();
                      };
                      
                  };
              }
          };
      };
  };

  return getNextDate(dateJSON.nextYear, dateJSON.nextMonth, dateJSON.nextDay);
}

function getNextDate(year, month, day, datesNumber){
    //Generate next date
    jsonDates[nextDate] = year + month + day;
    //Generate next URL
    jsonURL[nextDate] = urljson + jsonDates[nextDate].toString() + "/master.js?callback=?";
}

function formatDateMobile(fullDate){
    var arrayDate = fullDate.split("-");

    //Generate formated date
    dateJSON.MobileMonth = arrayDate[1];
    dateJSON.MobileDay = arrayDate[2];

    //Generate the formated year
    dateJSON.MobileYear = transformYearTwoDigits(arrayDate[0]);
}

function generateURLJSONMobile(){

    //Get todays date
    var f = new Date();
    dateJSON.MobileDay = f.getDate();
    dateJSON.MobileMonth = (f.getMonth() +1);
        
    //Check days and months
    if (dateJSON.MobileDay == 1 || dateJSON.MobileDay == 2 || dateJSON.MobileDay == 3 || dateJSON.MobileDay == 4 || dateJSON.MobileDay == 5 || dateJSON.MobileDay == 6 || dateJSON.MobileDay == 7 || dateJSON.MobileDay == 8 || dateJSON.MobileDay == 9) {
        dateJSON.MobileDay = "0" + dateJSON.MobileDay.toString();
    };
    if (dateJSON.MobileMonth == 1 || dateJSON.MobileMonth == 2 || dateJSON.MobileMonth == 3 || dateJSON.MobileMonth == 4 || dateJSON.MobileMonth == 5 || dateJSON.MobileMonth == 6 || dateJSON.MobileMonth == 7 || dateJSON.MobileMonth == 8 || dateJSON.MobileMonth == 9) {
        dateJSON.MobileMonth = "0" + dateJSON.MobileMonth.toString();
    };

    dateJSON.MobileYear = transformYearTwoDigits(f.getFullYear().toString());

    //Generate todays jsons date
    jsonDates[0] = dateJSON.MobileYear + dateJSON.MobileMonth + dateJSON.MobileDay;

    jsonURL[nextDate] = urljson + jsonDates[0].toString() + "/master.js?callback=?";
}

function drawJSONInfo(){
    if ( widthScreen > 955) {
        jsonsProgramsNumber = 4;

        //Generate URLs for json for desk version 
        generateURLJSON();
    }else{
        jsonsProgramsNumber = 1;

        //Generate URLs for json for desk version 
        generateURLJSONMobile();
    };

    for (var i = 0; i < searchJSONTries; i++) {
        urls[i] = jsonURL[i];
        if ( widthScreen > 955) {
            if (numberJSONSOK <= jsonsProgramsNumber) {
                if (numberJSONSOK >= 4) {
                    break;
                };
                peticionJSON (urls[i],i);
            };
        }else{
            peticionJSON (urls[i],i);
            break;
        };
        
        
    }
}


function peticionJSON(url,i){ 
  setTimeout(function(){
        jQuery.ajax({
            dataType: "jsonp",
            jsonp: false,
            crossDomain: true,
            cache:true,
            type: "GET",
            url: url,
            jsonpCallback: "programacion",
            success: function(data){
                if (numberJSONSOK <= 4) {
                  pintaHTML(data,i);
                  numberJSONSOK = numberJSONSOK + 1;
                };
            },
            error: function(e) {
                console.log(e.message);
            }
          
         })
    },(i+1)*1200);        
}

function pintaHTML(respuesta, i){
 consultas.push(respuesta); 

  if(respuesta.PROGRAMACION.FECHA!=undefined || respuesta.PROGRAMACION.FECHA!=null){
      elementsJSON.dateTransmision = respuesta.PROGRAMACION.FECHA;
      //Receive formated date
      elementsJSON.dateTransmision = formatDate(elementsJSON.dateTransmision);
      //Clean elementsJSON.textHTML
      elementsJSON.textHTML = "";
      //Generate and open section card container
      elementsJSON.textHTML += '<section id="prgramsBlock'+i+'" class="hd-programacard__container">';
      elementsJSON.textHTML += '<p class="hd-programacard__containertitle">' + elementsJSON.dateTransmision + '</p>';

      for (var blockChannels = 0; blockChannels <= 6; blockChannels++) {
        //Begin channels validation
        if(eval("respuesta.PROGRAMACION." + elementsJSON.channels[blockChannels])!=undefined){
          if (eval("respuesta.PROGRAMACION." + elementsJSON.channels[blockChannels])!=null) {
            jQuery.resultsElements = eval("respuesta.PROGRAMACION." + elementsJSON.channels[blockChannels] + ".SHOWS");
            //Get info jsons elements
            for (i in jQuery.resultsElements) {
              elementsJSON.title = eval("respuesta.PROGRAMACION." + elementsJSON.channels[blockChannels] + ".SHOWS[i].title");
              elementsJSON.schedule = eval("respuesta.PROGRAMACION." + elementsJSON.channels[blockChannels] + ".SHOWS[i].horario");
              elementsJSON.description = eval("respuesta.PROGRAMACION." + elementsJSON.channels[blockChannels] + ".SHOWS[i].descripcion");
              elementsJSON.logo = eval("respuesta.PROGRAMACION." + elementsJSON.channels[blockChannels] + ".logo");
              elementsJSON.channelName = formatedChannelName(elementsJSON.channels[blockChannels]);
              elementsJSON.timestamp = eval("respuesta.PROGRAMACION." + elementsJSON.channels[blockChannels] + ".SHOWS[i].timestamp");
              elementsJSON.urlOfficialSite = eval("respuesta.PROGRAMACION." + elementsJSON.channels[blockChannels] + ".SHOWS[i].url_officialSite");
              
              //Receive formated schedule
              elementsJSON.schedule = formatSchedule(elementsJSON.schedule);
              //Generete programcards HTML
              if (elementsJSON.urlOfficialSite == "") {
                  elementsJSON.textHTML += '<article class="hd-programacard disabled" timestamp="' + elementsJSON.timestamp + '">';
              }else{
                  elementsJSON.textHTML += '<a href="' + elementsJSON.urlOfficialSite + '" class="hd-programacard disabled" timestamp="' + elementsJSON.timestamp + '">';
              };
              elementsJSON.textHTML += '<div class="hd-programacard__time">' + elementsJSON.schedule + '</div>';
              elementsJSON.textHTML += '<div class="hd-programacard__data">';
              elementsJSON.textHTML += '<p class="hd-programacard__title">' + elementsJSON.title + '</p>';
              elementsJSON.textHTML += '<p class="hd-programacard__subtitle">' + elementsJSON.description + '</p>';
              elementsJSON.textHTML += '<p class="hd-programacard__channel">' + elementsJSON.channelName + '</p>';
              elementsJSON.textHTML += '</div>';
              elementsJSON.textHTML += '<div class="hd-programacard__iconcontainer">';
              elementsJSON.textHTML += '<img src="' + elementsJSON.logo + '">';
              elementsJSON.textHTML += '</div>';
              if (elementsJSON.urlOfficialSite == "") {
                  elementsJSON.textHTML += '</article>';
              }else{
                  elementsJSON.textHTML += '</a>';
              };
              
            }; 
          };
       }
    };
    //Generate and close section card container
    elementsJSON.textHTML += '</section>';

  }//FECHA
  //Save at main HTML var
  jQuery( "#hd_page_tres .hd-cardcontainer" ).append(elementsJSON.textHTML);

  //Make sort
  for (var valTiny = 0; valTiny <= searchJSONTries; valTiny++) {
      tinysort('section#prgramsBlock'+valTiny.toString()+'>article',{attr:'timestamp'});
  };
  //Draw sections
  jQuery( "section#hd_page_tres div.prime-loader" ).css("display", "none");
}

    function generateURLJSON(){
        //Get todays date
        var f = new Date();
        dateJSON.day = f.getDate();
        dateJSON.month = (f.getMonth() +1);
        
        //Check days and months
        if (dateJSON.day == 1 || dateJSON.day == 2 || dateJSON.day == 3 || dateJSON.day == 4 || dateJSON.day == 5 || dateJSON.day == 6 || dateJSON.day == 7 || dateJSON.day == 8 || dateJSON.day == 9) {
            dateJSON.day = "0" + dateJSON.day.toString();
        };
        if (dateJSON.month == 1 || dateJSON.month == 2 || dateJSON.month == 3 || dateJSON.month == 4 || dateJSON.month == 5 || dateJSON.month == 6 || dateJSON.month == 7 || dateJSON.month == 8 || dateJSON.month == 9) {
            dateJSON.month = "0" + dateJSON.month.toString();
        };

        dateJSON.year = transformYearTwoDigits(f.getFullYear().toString());

        //Generate todays jsons date
        jsonDates[nextDate] = dateJSON.year + dateJSON.month + dateJSON.day;

        jsonURL[nextDate] = urljson + jsonDates[0].toString() + "/master.js?callback=?";

        for (var generateDate = 1; generateDate < searchJSONTries; generateDate++ ){
            nextDate = nextDate + 1;
            if (dateJSON.nextDay == undefined) {
                dateJSON.nextDay = dateJSON.day;
            };
            getYearNextDates(dateJSON.month, dateJSON.year, dateJSON.nextDay);
        };

    }

function eventGOVIdeosUS(){
  window.location.href='http://deportes.televisa.com/us/video/';
}