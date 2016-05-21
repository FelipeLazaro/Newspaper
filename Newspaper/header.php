<!doctype html >
<!--[if IE 8]>    <html class="ie8" lang="en"> <![endif]-->
<!--[if IE 9]>    <html class="ie9" lang="en"> <![endif]-->
<!--[if gt IE 8]><!--> <html <?php language_attributes(); ?>> <!--<![endif]-->
<head>
    <title><?php wp_title('|', true, 'right'); ?></title>
    <meta charset="<?php bloginfo( 'charset' );?>" />
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="pingback" href="<?php bloginfo( 'pingback_url' ); ?>" />
    <meta property="fb:pages" content="869407789872332" />
    <meta name="Keywords" content="Televisa, Televisa Deportes, En vivo, Video, Minuto a minuto, Tabla general, Futbol, Futbol Mexicano, Futbol Mexico, Futbol Internacional, UEFA, Conmebol, Concacaf, AFC, Liga Espanola, Ligue 1, Calcio, Serie A, Bundesliga, Eredivisie, Liga Argentina, Premier League, Liga MX, Copa MX, Concachampions, FIFA, Mundial de Clubes, Supercopa, Champions League, Europa League, Copa Libertadores, America, Atlas, Chiapas, Chivas, Cruz Azul, Leon, Dorados, Morelia, Pachuca, Puebla, Pumas, Queretaro, Rayados, Santos, Tigres, Tijuana, Toluca, Veracruz, Xolos, futbol americano, NFL, beisbol, MLB, basquetbol, NBA, Fórmula Uno, golf, tenis, Juegos Olímpicos, Guadalajara"/> 
    <?php
    wp_head(); /** we hook up in wp_booster @see td_wp_booster_functions::hook_wp_head */
    ?>
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/2.2.2/jquery.min.js"></script>
	<link type="text/css" href="<?php echo get_template_directory_uri();?>/css/master.min.css" rel="stylesheet">
<link type="text/css" href="<?php echo get_template_directory_uri();?>/css/TIM_wdg_ticker.css" rel="stylesheet">
<script src="<?php echo get_template_directory_uri();?>/js/navHeader.js" type="text/javascript"></script>

</head>

<body <?php body_class() ?> itemscope="itemscope" itemtype="<?php echo td_global::$http_or_https?>://schema.org/WebPage">
<script type="text/javascript">

window.onload = function() {
      if (!window.jQuery) {   
        load_js('http://i2.esmas.com/finalpage/libs/jquery/1.8.2/jquery.min.js');
        var miIntervaloChecador = setInterval(function(){      
          if (window.jQuery) {
              load_js('<?php echo get_template_directory_uri();?>/js/TIM_wdg_ticker.js');
              jQuery('#header-multimenu').headerMultimenu();
              clearInterval(miIntervaloChecador);
          }
        },1000);
      }else{
          load_js('<?php echo get_template_directory_uri();?>/js/TIM_wdg_ticker.js');
          jQuery('#header-multimenu').headerMultimenu();
      }
};

</script>



<?php //this is closing in the footer.php file ?>

<?php /* scroll to top */?>
<div class="td-scroll-up"><i class="td-icon-menu-up"></i></div>

<div id="td-outer-wrap">

    <div class="td-transition-content-and-menu td-mobile-nav-wrap">
        <?php locate_template('parts/menu-mobile.php', true);?>
    </div>

    <?php //this is closing in the footer.php file ?>
    <div class="td-transition-content-and-menu td-content-wrap">


<?php
td_api_header_style::_helper_show_header();
?>


<!--
<header id="header-multimenu" class="loaded">
<div class="subwrapper notitles "></div>
<div class="wrapper-posicionador principal"></div>
</header>-->

<?php
do_action('td_wp_booster_after_header'); //used by unique articles


