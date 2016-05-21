<?php
   /* Template Name: mxm-template */
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
			$("#TIMwdg_sport_result").WdgSportResult({
				'idtorneo':<?php echo $torneo ?>, 
				'idteam':<?php echo $partido ?>
				//'urlFeed': "http://static-televisadeportes.esmas.com/sportsdata/futbol/data/"+<?php echo $torneo ?>+"/"+<?php echo $partido ?>+"/header.js"
    		});
			$("#contenidoMxM").wdgMxmLive({
				'idjornada': <?php echo $torneo ?>, 
				'idmatch':<?php echo $partido ?>,
				'title': 'El Partido Minuto por Minuto'
    		});
			
    		$('#comparativa').compareStadisticTeams({
			    'idTorneo':<?php echo $torneo ?>, 
			    'idMatch': <?php echo $partido ?>
			});    	
		});
</script>
<?php get_header('mxm'); ?>
<div class="td-container <?php echo $td_sidebar_position; ?>">
    <div class="td-pb-row">
       <div class="td-pb-span8 td-main-content" role="main">
            <div class="td-ss-main-content">
				<div class="td-page-content">
					<section class="td_mxm_acciones_02"> 
						<div class="main"><div class="nav_smnu_sports_01" data-enhance="false" id="TIMnav_smnu_sports"></div>
						<div class="topTitle">
							<div class="articleBranchTitle artBranch01">
								<div class="art_branch_01"><a data-enhance="false" title="">futbol</a></div>
							</div>
						</div>
						<div class="c1">
							<div class="c1_1">
							<div class="containerOne parsys"><div class="wdg_mxm_live_04 probando" data-enhance="false" id="contenidoMxM"></div><div class="c1_4" id="simbologiaMxM"></div></div>
							</div>
						</div>
					</section>
					</div>
					<?php
					if($td_enable_or_disable_page_comments == 'show_comments') {
						comments_template('', true);
					}?>
                </div>
             </div>
			<div class="td-pb-span4 td-main-sidebar" role="complementary">
				<div class="td-ss-main-sidebar">
					
					<a class="twitter-timeline"  href="https://twitter.com/TD_Deportes" data-widget-id="732267715960807424">TWITTER</a>
								<script>
								!function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0],p=/^http:/.test(d.location)?'http':'https';if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src=p+"://platform.twitter.com/widgets.js";fjs.parentNode.insertBefore(js,fjs);}}(document,"script","twitter-wjs");
								</script>  
					
					<div class="wdgJsIncludeMix parbase section">
						<div class="banner300x600"><img src="https://tpc.googlesyndication.com/simgad/13566391013144122944"></div>
					</div>
					
					<iframe frameborder="0" id="sg" src="http://www.surveygizmo.com/s3/2788792/Am-rica-vs-Guadalajara"  width="100%"></iframe>
					<script src="http://i2.esmas.com/gsa/js/jquery.iframeresizer.min.js"></script>
						<script type="text/javascript">
						$('#sg').iFrameResize();
					</script>

					<?php //get_sidebar(); ?>
				</div>
			</div>
                  
        </div> <!-- /.td-pb-row -->
    </div> <!-- /.td-container -->
</div> <!-- /.td-main-content-wrap -->
    <?php
get_footer();