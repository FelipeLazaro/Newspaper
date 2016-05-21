<?php
   /* Template Name: page-rating-template.php */
get_header();

//set the template id, used to get the template specific settings
$template_id = 'page';

$loop_sidebar_position = td_util::get_option('tds_' . $template_id . '_sidebar_pos'); //sidebar right is default (empty)

//get theme panel variable for page comments side wide
$td_enable_or_disable_page_comments = td_util::get_option('tds_disable_comments_pages');

//read the custom single post settings - this setting overids all of them
$td_page = get_post_meta($post->ID, 'td_page', true);
if (!empty($td_page['td_sidebar_position'])) {
    $loop_sidebar_position = $td_page['td_sidebar_position'];
}

// sidebar position used to align the breadcrumb on sidebar left + sidebar first on mobile issue
$td_sidebar_position = '';
if($loop_sidebar_position == 'sidebar_left') {
	$td_sidebar_position = 'td-sidebar-left';
}

/**
 * detect the page builder
 */
$td_use_page_builder = false;
if (method_exists('WPBMap', 'getShortCodes')) {
    $short_codes_buffer = array();
    $td_page_builder_short_codes = array_keys(WPBMap::getShortCodes());
    if (is_array($td_page_builder_short_codes) && !empty($td_page_builder_short_codes)) {
        foreach ($td_page_builder_short_codes as $short_code_name){
            // we have to add [ before the shortcode name, else it may target simple words that match with the shortcode name
            $short_codes_buffer[] = '[' .  $short_code_name;
        }
    }
    if (!empty($short_codes_buffer) && td_util::strpos_array($post->post_content, $short_codes_buffer) === true) {
        $td_use_page_builder = true;
    }
}

?>
<div class="td-main-content-wrap">
	<script>
        	$(function() {
		        $("#RatingMxM").wdgMxMRating({
		            'idTorneo':<?php echo $torneo ?>,
		            'idPartido':<?php echo $partido ?>,
		            'idEquipo': <?php echo $local ?>,
		            'idEquipo2':<?php echo $visitante ?>
		        }); 
            	$("#TIMwdg_sport_result").WdgSportResult({
					'idtorneo':<?php echo $torneo ?>,
					'idteam':<?php echo $partido ?>
					//'urlFeed': "http://static-televisadeportes.esmas.com/sportsdata/futbol/data/"+<?php echo $torneo ?>+"/"+<?php echo $partido ?>+"/header.js"
    			});        
        });
    </script>	
<?php get_header('mxm'); ?>

<script src="http://deportes.televisa.com/deportes/local/clientlibs/master/js/getDataLayer.js"></script>
<script src="http://i2.esmas.com/deportes30/mxm/js/wdg.rate.player.rating.min.js"></script>
<link rel="stylesheet" href="http://i2.esmas.com/deportes30/mxm/css/wdg.rate.player.rating.css" type="text/css">
<style>
.wdg_rating_main_01 p{
margin: 0px !important;
line-height: 100% !important;
   
}

#LocalTIMTitular  p , #VisitTIMTitular  p , #equipoLocal p, #equipoVisit p, .header_team p, .header_team_2 p {
	border-style: none;
	 padding:0px !important;
	 margin: 0px !important;
}
body p {
font : normal normal 100% Trebuchet MS,Arial,sans-serif;
}

.conteiner_two p {
	line-height:26px;
}
.wdg_rate_player_01 .clickRating {
	top :13px;
}

.wdg_rate_player_01 .vote_block {
	border-bottom:none;
}
.wdg_rate_player_01 , .wdg_rating_main_01{
	width : auto !important;
}
</style>
<div class="td-main-content-wrap">
	<div class="td-container <?php echo $td_sidebar_position; ?>">
		<div class="parentlargeMxM"><div style="margin: auto;" id="ban01_955x90"> <img src="https://tpc.googlesyndication.com/simgad/8786538036387429265"></div></div>
		<div class="nav_smnu_sports_01" data-enhance="false" id="TIMnav_smnu_sports"></div>
    <div class="td-pb-row">
        
		<div class="td-pb-span8 td-main-content" role="main">
				
		 <div class="td-page-content">
			<div class="c1 left">
				<section class="wdg_rating_main_01" id="RatingMxMBest"></section>
				<section class="wdg_mxm_rating_01" id="RatingMxM"></section>
			</div>
			<script type="text/javascript" src="http://i2.esmas.com/deportes30/mxm/js/TIM_wdg_ticker.js"></script>							
			<!-- End Rating -->		
		
		</div>		
		</div>		
		
		<div class="td-pb-span4 td-main-sidebar" role="complementary">
            <div class="td-ss-main-sidebar">
							
				<div class="c3">
					<div class="c3_2 left">
						<div class="wdgcuboMxM bottom_space"><img src="https://tpc.googlesyndication.com/simgad/2234560520319533254" border="0" width="300" height="250" alt="" class="img_ad"></div>
					</div>
					<div class="c3_4 left">
						<div class="wdg_goalsanoted_01">
						    <div class="str_pleca_01 collapsable">
						        <div class="str_pleca_01_title">
						            <h3 class="background-color-pleca1"><a class="textcolor-title3">Goles anotados</a></h3>
						        </div>
						    </div>
						    <div class="scroll-carrusel">
						        <div class="scroll">
						           	<div id="TIMAlineacionGoles"></div>
						            <div id="TIMWdgPenales"></div>
						        </div>
						    </div>
						  <div class="degraded"></div>
						</div>
					    <div id="ExpulsionTIM"></div>
					</div>
					
					<iframe frameborder="0" id="sg" src="http://www.surveygizmo.com/s3/2788792/Am-rica-vs-Guadalajara"  width="100%"></iframe>
					<script src="http://i2.esmas.com/gsa/js/jquery.iframeresizer.min.js"></script>
<script type="text/javascript">
     $('#sg').iFrameResize();
</script>

					<div class="c3_1 hide-tablet"></div>
					<div class="c3_3 hide-tablet"></div>
				</div>
			</div>
		</div>
				
        </div> <!-- /.td-pb-row -->
    </div> <!-- /.td-container -->
</div> <!-- /.td-main-content-wrap -->
    <?php
get_footer();