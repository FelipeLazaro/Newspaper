(function() {
    $.fn.wdgTicker = function(options) {
        var cubo = 1;
        var setting = $.extend({
            'tickermaster': 0,
            'tickertournament': 0,
            'micrositios': 0,
            'campania': 0,
        }, options);
        var globalThis = this;
		
        var global = {
            arrayTorneos: [],
            init: function() {
                var tickerid = setting.tickermaster,
                    itemDrop = '';
                $.ajax({
                        url: 'http://static-televisadeportes.esmas.com/sportsdata/futbol/data/tickers/Ticker_' + setting.tickermaster + '.js',
                        type: 'GET',
                        dataType: 'jsonp',
                        jsonpCallback: 'mainwtdata',
                        cache: false
                    })
                    .done(function(data) {
                        for (var i = 0; i < data.ticker.widgets.widgets.length; i++) {
                            var tickerHome = data.ticker.widgets.widgets[0].id,
                                tickerId = (data.ticker.widgets.widgets[i].id !== '' && data.ticker.widgets.widgets[i].id !== undefined) ? data.ticker.widgets.widgets[i].id : '',
                                tickerTitle = (data.ticker.widgets.widgets[i].title !== '' && data.ticker.widgets.widgets[i].title !== undefined) ? data.ticker.widgets.widgets[i].title : '';
                            itemDrop += '<option value="' + tickerId + '">' + tickerTitle + '</option>';
                        };
                        $('#mxm_list').html(itemDrop);
                        $('#mxm_list').change(function() {
                            global.cargafeed($(this).val());
                        });
                        global.cargafeed(tickerHome);
                    })
                    .fail(function() {
                        console.log("Error al cargar el feed TickerMaster");
                    })
            },
            cargafeed: function(tickerHome) {
                //console.log(tickerHome);
                $.ajax({
                        url: 'http://static-televisadeportes.esmas.com/sportsdata/futbol/data/tickers/TickerFutbol_' + tickerHome + '.js',
                        type: 'GET',
                        dataType: 'jsonp',
                        jsonpCallback: 'wdata',
                        cache: false
                    })
                    .done(function(data) {
                        global.cajaWidgets(data.matches.match, tickerHome);
                        global.torneosButton(data.matches.match);
                    })
                    .fail(function() {
                        console.log("Error al cargar el feed Ticker_#");
                    });
            },
            givemeMes: function(mes) {
                switch (mes) {
                    case 1:
                        return "Ene";
                        break;
                    case 2:
                        return "Feb";
                        break;
                    case 3:
                        return "Mar";
                        break;
                    case 4:
                        return "Abr";
                        break;
                    case 5:
                        return "May";
                        break;
                    case 6:
                        return "Jun";
                        break;
                    case 7:
                        return "Jul";
                        break;
                    case 8:
                        return "Ago";
                        break;
                    case 9:
                        return "Sept";
                        break;
                    case 10:
                        return "Oct";
                        break;
                    case 11:
                        return "Nov";
                        break;
                    case 12:
                        return "Dic";
                        break;
                }
            },
            cajaWidgets: function(arrayPartidos, tickerHome) {
                var ItemView = "",
                    rowNum = 0,
                    envivoTicker;
                for (var i = 0; i < arrayPartidos.length; i++) {
                    var matchperiod = (arrayPartidos[i].period !== '' && arrayPartidos[i].period !== undefined) ? arrayPartidos[i].period : '',
                        matchtime = (arrayPartidos[i].period !== '' && arrayPartidos[i].period !== undefined) ? arrayPartidos[i].period : '',
                        matchguid = (arrayPartidos[i].MatchGuid !== '' && arrayPartidos[i].MatchGuid !== undefined) ? arrayPartidos[i].MatchGuid : '',
                        matchtimestamp = (arrayPartidos[i].TimeStamp !== '' && arrayPartidos[i].TimeStamp !== undefined) ? arrayPartidos[i].TimeStamp : '',
                        logoteam1 = (arrayPartidos[i].equipos.local.urlLogoClub !== '' && arrayPartidos[i].equipos.local.urlLogoClub !== undefined) ? arrayPartidos[i].equipos.local.urlLogoClub : '',
                        aliasteam1 = (arrayPartidos[i].equipos.local.aliasTeam !== '' && arrayPartidos[i].equipos.local.aliasTeam !== undefined) ? arrayPartidos[i].equipos.local.aliasTeam : '',
                        golteam1 = (arrayPartidos[i].equipos.local.goals !== '' && arrayPartidos[i].equipos.local.goals !== undefined && matchperiod !== 'P') ? arrayPartidos[i].equipos.local.goals : '-',
                        penalteam1 = (arrayPartidos[i].equipos.local.penales !== '' && arrayPartidos[i].equipos.local.penales !== undefined) ? arrayPartidos[i].equipos.local.penales : '',
                        matchdate = (arrayPartidos[i].MatchDate !== '' && arrayPartidos[i].MatchDate !== undefined) ? arrayPartidos[i].MatchDate : '',
                        matchAlldate = matchdate.split('-'),
                        matchmes = matchAlldate[2] + ' ' + global.givemeMes(parseInt(matchAlldate[1])),
                        matchhour = (arrayPartidos[i].MatchHour2 !== '' && arrayPartidos[i].MatchHour2 !== undefined) ? arrayPartidos[i].MatchHour2 : '',
                        matcminute = (arrayPartidos[i].time !== '' && arrayPartidos[i].time !== undefined && arrayPartidos[i].time !== 0) ? arrayPartidos[i].time + '\'' : '',
                        logoteam2 = (arrayPartidos[i].equipos.visit.urlLogoClub !== '' && arrayPartidos[i].equipos.visit.urlLogoClub !== undefined) ? arrayPartidos[i].equipos.visit.urlLogoClub : '',
                        aliasteam2 = (arrayPartidos[i].equipos.visit.aliasTeam !== '' && arrayPartidos[i].equipos.visit.aliasTeam !== undefined) ? arrayPartidos[i].equipos.visit.aliasTeam : '',
                        golteam2 = (arrayPartidos[i].equipos.visit.goals !== '' && arrayPartidos[i].equipos.visit.goals !== undefined && matchperiod !== 'P') ? arrayPartidos[i].equipos.visit.goals : '-',
                        penalteam2 = (arrayPartidos[i].equipos.visit.penales !== '' && arrayPartidos[i].equipos.visit.penales !== undefined) ? arrayPartidos[i].equipos.visit.penales : '',
                        tudiriges = (arrayPartidos[i].tudiriges !== '' && arrayPartidos[i].tudiriges !== undefined) ? arrayPartidos[i].tudiriges : '',
                        matchurl = (arrayPartidos[i].Website !== '' && arrayPartidos[i].Website !== undefined) ? arrayPartidos[i].Website : '',
                        matchurlTxt = (arrayPartidos[i].txtLink !== '' && arrayPartidos[i].txtLink !== undefined) ? arrayPartidos[i].txtLink : '',
                        matchurlVideo = (arrayPartidos[i].EventUrl !== '' && arrayPartidos[i].EventUrl !== undefined) ? arrayPartidos[i].EventUrl : '',
                        matchurlResumen = (arrayPartidos[i].ResumenTransmision !== '' && arrayPartidos[i].ResumenTransmision !== undefined) ? arrayPartidos[i].ResumenTransmision : '',
                        matchTudiriges = (arrayPartidos[i].tudiriges !== '' && arrayPartidos[i].tudiriges !== undefined) ? arrayPartidos[i].tudiriges : '',
                        matchTorneo = (arrayPartidos[i].TournamentId !== '' && arrayPartidos[i].TournamentId !== undefined) ? arrayPartidos[i].TournamentId : '',
                        matchstatus = (matchurlTxt === "Minuto a minuto") ? 'MxM' : matchurlTxt;
                    if (matchperiod === 'D') {
                        matchperiod = 'Descanso';
                    } else if (matchperiod === 'F') {
                        matchperiod = 'Final';
                    } else if (matchperiod === 'S') {
                        matchperiod = 'Suspendido';
                    }
                    ItemView += '<section class="hd_mxmcard" id="' + matchtime + '" data-guid="' + matchguid + '" data-ticker="' + tickerHome + '">';
                    ItemView += '<div class="hd_mxmcard_mainw">';
                    ItemView += '<div class="hd_mxmcard_content">';
                    ItemView += '<div class="mxm_cont team1">';
                    ItemView += '<div class="teamw">';
                    ItemView += ' <img src="' + logoteam1 + '" alt="logo">';
                    ItemView += '<span>' + aliasteam1 + '</span>';
                    ItemView += '</div>';
                    ItemView += '<div class="goalw">';
                    ItemView += '<span class="t1goles">' + golteam1 + '</span>';
                    ItemView += (penalteam1 !== 0) ? '<span class="penales t1pnls">' + penalteam1 + '</span>' : '';
                    ItemView += '</div>';
                    ItemView += '</div>';
                    ItemView += '<div class="mxm_cont time">';
                    ItemView += '<div class="info_previow">';
                    ItemView += (matchperiod == 'P') ? '<span class="mxmc_date">' + matchmes + '</span><span class="mxmc_hour">' + matchhour + '</span>' : '<span class="mxmc_date">' + matchperiod + '</span>';
                    ItemView += '<span class="mxmc_min">' + matcminute + '</span>';
                    ItemView += '</div>';
                    ItemView += '</div>';
                    ItemView += '<div class="mxm_cont team2">';
                    ItemView += '<div class="teamw">';
                    ItemView += '<img src="' + logoteam2 + '" alt="logo">';
                    ItemView += '<span>' + aliasteam2 + '</span>';
                    ItemView += '</div>  ';
                    ItemView += '<div class="goalw">';
                    ItemView += '<span class="t2goles">' + golteam2 + '</span>';
                    ItemView += (penalteam2 !== 0) ? '<span class="penales t2pnls">' + penalteam2 + '</span>' : '';
                    ItemView += '</div>';
                    ItemView += '</div>';
                    ItemView += '</div>';
                    ItemView += '<div class="hd_mxmcard_asidew">';
                    if(matchurlVideo && matchperiod !== 'Final'){

                        ItemView += '<div class="hd_mxmcard_actions hd_envivo">';
                        ItemView += '<a href="' + matchurlVideo + '">';
                        ItemView += '<div class="liveimg">';
                        ItemView += '<div class="liveflag lflag1" style="background:url(' + logoteam1 + ')"></div>';
                        ItemView += '<div class="liveflag lflag2" style="background:url(' + logoteam2 + ')"></div>';
                        ItemView += '<i class="tvsa-play"></i>';
                        ItemView += '</div>';
                        ItemView += (matchTudiriges === 0) ? '<span>En Vivo</span>' : '<span><img src="http://i2.esmas.com/img/deportes/tudirigeswhite.svg" alt="logodiriges">tu diriges</span>';
                        ItemView += '</a>';
                        ItemView += '</div>';
                    }
                    if(matchurlResumen && matchperiod == 'Final'){
                        ItemView += '<div class="hd_mxmcard_actions hd_envivo">';
                        ItemView += '<a href="' + matchurlResumen + '">';
                        ItemView += '<div class="liveimg">';
                        ItemView += '<div class="liveflag lflag1" style="background:url(' + logoteam1 + ')"></div>';
                        ItemView += '<div class="liveflag lflag2" style="background:url(' + logoteam2 + ')"></div>';
                        ItemView += '<i class="tvsa-play"></i>';
                        ItemView += '</div>';
                        ItemView += '<span>Resumen</span>';
                        ItemView += '</a>';
                        ItemView += '</div>';
                    }

                    ItemView += (matchurl) ? '<div class="hd_mxmcard_actions"><a href="' + matchurl + '"><span class="txt_actions">' + matchstatus + '</span></a></div>' : '';
                    ItemView += '</div>';
                    ItemView += '</div>';
                    ItemView += '</section>';
                }
                $('#hd_select_content1').html(ItemView);
                $("#hd_page_uno section.hd_mxmcard:nth-child(5n)").each(function() {
                    rowNum++;
                    $(this).after("<div class='hd_banner-wrapp' id='banner_" + rowNum + "'></div>")
                });

                $('#hd_page_uno').scroll(function() {
                    if ($('#banner_' + cubo).length && $(window).width() < 623) {
                        console.log('Función Banner');
                        var bottomVisible = $('#hd_page_uno').height();
                        var nextBanner = $('#banner_' + cubo).offset().top;
                        if (bottomVisible >= nextBanner) {
                            global.bannerInit();
                        }
                    }
                });

                envivoTicker= setInterval(function() {
                    if($('#hd_btn_wrap1').hasClass('open') === true){
                        global.actualizaWidget();
                    }
                    else{
                        clearInterval(envivoTicker);    
                    }
                    
                }, 60000);



            },
            torneosButton: function(arrayIdTorneos) {
                var checkTorneos = '',
                    urlTorneo = '',
                    ItemButton = '';
                for (var i = 0; i < arrayIdTorneos.length - 1; i++) {
                    if (arrayIdTorneos[i].TournamentId == arrayIdTorneos[i + 1].TournamentId) {
                        checkTorneos = 1;
                        urlTorneo = (arrayIdTorneos[i].WebsiteTournament !== undefined && arrayIdTorneos[i].WebsiteTournament !== '') ? arrayIdTorneos[i].WebsiteTournament : '';
                    } else {
                        checkTorneos = 0;
                        break;
                    }
                };
                if (checkTorneos == 1) {
                    ItemButton += '<div class="btnmasresults_w">';
                    ItemButton += '<div class="btnmasresults">';
                    ItemButton += '<a href="' + urlTorneo + '">';
                    ItemButton += '<span>Ir al calendario completo</span>';
                    ItemButton += '</a>';
                    ItemButton += '</div>';
                    ItemButton += '</div>';
                    $('#hd_select_content1').append(ItemButton);
                }
            },
            actualizaWidget: function() {
                var  arregloGuid = [];
                 $('#hd_page_uno section.hd_mxmcard').each(function() {
                    arregloGuid.push(this.id);
                });

                for (var i = 0; i < arregloGuid.length; i++) {
                    //if (arregloGuid[i] !== 'F') {
                        torneo = $('#hd_page_uno section.hd_mxmcard#' + arregloGuid[i] + ' ').attr('data-ticker');
                    //}
                }

                

                if ($('#hd_page_uno section.hd_mxmcard').length !== 0) {
                    $.ajax({
                            url: 'http://static-televisadeportes.esmas.com/sportsdata/futbol/data/tickers/TickerFutbol_' + torneo + '.js',
                            type: 'GET',
                            dataType: 'jsonp',
                            jsonpCallback: 'wdata',
                            cache: false
                        })
                        .done(function(data) {
                            arraynewPartidos = data.matches.match;
                            for (var i = 0; i < arraynewPartidos.length; i++) {
                                var htmlvivo= '',
                                    selectGuid = arraynewPartidos[i].MatchGuid,
                                    selectorMatch = $('#hd_page_uno').find("[data-guid='" + selectGuid + "']"),
                                    GolesActualLocal = String(selectorMatch.find('.t1goles').text()),
                                    GolesActualVisit = String(selectorMatch.find('.t2goles').text()),
                                    GolesNewLocal = String(arraynewPartidos[i].equipos.local.goals),
                                    GolesNewVisit = String(arraynewPartidos[i].equipos.visit.goals),
                                    PenalesActualLocal = String(selectorMatch.find('.t1pnls').text()),
                                    PenalesActualVisit = String(selectorMatch.find('.t2pnls').text()),
                                    PenalesNewLocal = String(arraynewPartidos[i].equipos.local.penales),
                                    PenalesNewVisit = String(arraynewPartidos[i].equipos.visit.penales),
                                    minActual = String(selectorMatch.find('.mxmc_min').text()),
                                    minNew = String((arraynewPartidos[i].time !== 0 && arraynewPartidos[i].time !== '') ? arraynewPartidos[i].time + '\'' : ''),
                                    tiempoActual = String(selectorMatch.find('.mxmc_date').text()),
                                    tiempoNew = String(arraynewPartidos[i].period),
                                    statusActual = String(selectorMatch.find('.hd_mxmcard_actions span.txt_actions').text()),
                                    statusNew = (arraynewPartidos[i].txtLink === "Minuto a minuto") ? 'MXM' : arraynewPartidos[i].txtLink,
                                    imgLocal = (arraynewPartidos[i].equipos.local.urlLogoClub),
                                    imgVisit = (arraynewPartidos[i].equipos.visit.urlLogoClub),
                                    vivoActual = selectorMatch.find('.hd_mxmcard_actions.hd_envivo').length,
                                    vivoNew = (arraynewPartidos[i].EventUrl) ? arraynewPartidos[i].EventUrl : '',
                                    resumenActual = selectorMatch.find('.hd_mxmcard_actions.hd_envivo').length,
                                    resumenNew = (arraynewPartidos[i].ResumenTransmision) ? arraynewPartidos[i].ResumenTransmision : '',
                                    txtvideo = String(selectorMatch.find('.hd_mxmcard_actions.hd_envivo span').text()),
                                    tudirigesNew = arraynewPartidos[i].tudiriges;

                                    if (tiempoNew === 'D') {
                                        tiempoNew = 'Descanso';
                                    } else if (tiempoNew === 'F') {
                                        tiempoNew = 'Final';
                                    } else if (tiempoNew === 'S') {
                                        tiempoNew = 'Suspendido';
                                    }


                                //if (tiempoNew !== "Final") {
                                    if (tiempoActual !== tiempoNew && tiempoNew !== 'P') {
                                        selectorMatch.find('.mxmc_date').text(tiempoNew);
                                        selectorMatch.find('.mxmc_hour').text('');
                                    }
                                    if (statusActual !== statusNew) {
                                        selectorMatch.find('.hd_mxmcard_actions span.txt_actions').html(statusNew);
                                    }
                                    if (tiempoNew !== "P") {
                                        
                                        if (GolesActualLocal !== GolesNewLocal) {
                                            selectorMatch.find('.t1goles').text(GolesNewLocal);
                                        }
                                        if (GolesActualVisit !== GolesNewVisit) {
                                            selectorMatch.find('.t2goles').text(GolesNewVisit);
                                        }
                                        if (PenalesActualLocal !== PenalesNewLocal) {
                                            selectorMatch.find('.t1pnls').text(PenalesNewLocal);
                                        }
                                        if (PenalesActualVisit !== PenalesNewVisit) {
                                            selectorMatch.find('.t2pnls').text(PenalesNewVisit);
                                        }
                                        if (minActual !== minNew) {
                                            selectorMatch.find('.mxmc_min').text(minNew);
                                        }
                                        if(vivoActual === 0 && vivoNew !== '' && tiempoNew !== "Final"){
                                        htmlvivo += '<div class="hd_mxmcard_actions hd_envivo">';
                                        htmlvivo += '<a href="' + vivoNew + '">';
                                        htmlvivo += '<div class="liveimg">';
                                        htmlvivo += '<div class="liveflag lflag1" style="background:url(' + imgLocal + ')"></div>';
                                        htmlvivo += '<div class="liveflag lflag2" style="background:url(' + imgVisit + ')"></div>';
                                        htmlvivo += '<i class="tvsa-play"></i>';
                                        htmlvivo += '</div>';
                                        htmlvivo += (tudirigesNew === 0) ? '<span>En vivo</span>' : '<span><img src="http://i2.esmas.com/img/deportes/tudirigeswhite.svg" alt="logodiriges">tu diriges</span>';
                                        htmlvivo += '</a>';
                                        htmlvivo += '</div>';
                                        selectorMatch.find('.hd_mxmcard_asidew').prepend(htmlvivo);

                                        }
                                    }
                                //}
                                if(tiempoNew == "Final") {
                                    if(resumenActual === 0 && resumenNew !== ''){
                                        htmlvivo += '<div class="hd_mxmcard_actions hd_envivo">';
                                        htmlvivo += '<a href="' + resumenNew + '">';
                                        htmlvivo += '<div class="liveimg">';
                                        htmlvivo += '<div class="liveflag lflag1" style="background:url(' + imgLocal + ')"></div>';
                                        htmlvivo += '<div class="liveflag lflag2" style="background:url(' + imgVisit + ')"></div>';
                                        htmlvivo += '<i class="tvsa-play"></i>';
                                        htmlvivo += '</div>';
                                        htmlvivo += '<span>Resumen</span>';
                                        htmlvivo += '</a>';
                                        htmlvivo += '</div>';
                                        selectorMatch.find('.hd_mxmcard_asidew').prepend(htmlvivo);
                                    }else if(resumenActual ===1 && txtvideo=='En Vivo'){
                                        String(selectorMatch.find('.hd_mxmcard_actions.hd_envivo span').text('Resumen'));
                                        String(selectorMatch.find('.hd_mxmcard_actions.hd_envivo a').attr('href', resumenNew));

                                    }

                                }
                            };
                        })
                        .fail(function() {
                            console.log("Error para la actualización feed Ticker_#");
                        });
                }
            },
            bannerInit: function(idCubo) {
                var idCubo = "banner_" + cubo;
                googletag.cmd.push(function() {
                    /*var mapping01 = googletag.sizeMapping().
                    addSize([980, 140], []).
                    addSize([740, 140], []).
                    addSize([320, 140], [320, 50]).
                    build();
                    var adUnit = "es.esmas.dep/home";
                    bannerTemp = bannerName + adId;
                    googletag.defineSlot("/5644/" + adUnit, [300, 250], idCubo).defineSizeMapping(mapping01).addService(googletag.pubads()).setTargeting("position", "atf");
                    googletag.enableServices();
                    googletag.display(idCubo);*/
                    cubo++;
                });
            },
        }
		global.init();
        /*$(document).on("mxmrequest", function(event) {
            console.log('mxmrequest');
                global.init();
        });*/
    };
    if ($('#header-multimenu').length !== 0 || $('#header_micrositios').length !== 0) 
    {
        $("#hd_page_uno").wdgTicker({
            'tickermaster': 1,
            'micrositios': 0,
            'campania': 0
			
        });
		
    }
    if(window.location.pathname.indexOf("/gol-por-mexico/") !== -1)
    {
        $('head').append('<link rel="stylesheet" href="http://i2.esmas.com/deportes-cq5/micrositiosCss.css" type="text/css"/>');
    }
})(jQuery);