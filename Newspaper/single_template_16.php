<?php
// Template 15 - post-final-15.psd - featured image float left
//get the global sidebar position from td_single_template_vars.php

locate_template('includes/wp_booster/td_single_template_vars.php', true);

get_header();

global $loop_sidebar_position, $td_sidebar_position, $post;

$td_mod_single = new td_module_single($post);

$torneo = get_post_meta($post->ID, 'torneo', true);
$partido = get_post_meta($post->ID, 'partido', true);
?>

<!--<style type='text/css'>
	.headerTags{
		display: inline-block;
		width: 49%;
	}
	.headerSocial{
		display: inline-block;
		width: 49%;
		vertical-align: top;
		padding-top: 5px;
		text-align: center;
	}

	.topDotted{
		border-top: dotted 2px #E4E4E4;
		padding: 10px 0px;
	}

	.rightDotted{
		border-right: dotted 2px #E4E4E4;
	}

	.td-social-facebook, .td-social-twitter{
		width: 35px !important;
		height: 35px !important;
		overflow: hidden;
	}
	.td-social-sharing-buttons{
		min-width: 36px !important;
		height: 35px !important;
	}
	.entry-title2{
		font-size: 28px !important;
		font-weight: bolder;
	}

	.paddingNota{
		padding-left: 10px
	}

	.tituloExperto{
		border-bottom: 1px solid #d3d3d3; color: #800;
		text-decoration: none;
		width: 160px;
		color: #a70a0b;
		display: block;
		padding: 0 0 5px 0px;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		font-family: "raleway-heavy";
		font-size: 20px;
		text-transform: uppercase;
		clear: both;
		margin-top: 15px;
	}

	.numeros{
	    padding: 10px 0 0 42px;
		font-size: 30px;
		font-style: italic;
		color: #d3d3d3;
		font-weight: normal;
		margin-bottom: 1px;
	}
	.heightCuadro{
		height: auto !important;
		max-height: 300px !important;
	    position: relative;
		float: left;
		width: 300px;
		padding: 0 5px 4px;
	}
	.underlined{
	    height: 2px;
		border-bottom: 1px solid #CCC;
		width: 30px;
		margin-left: 34px;
	}
	.divCuadro{
		display: inline-block;
		width: 49%;
	}
	.datoText{
	    padding: 20px 34px 11px 34px;
		font-size: 14px;
		font-style: italic;
		font-weight: normal;
		min-height: 108px;
		color: #515151;
	}
	.td-containerText{
		color: #232323;
	}
	.td-post-sub-title {
		color: #232323;
		font-size: 19px;
		font: normal normal 100% Trebuchet MS,Arial,sans-serif;
	}

	.td-post-content p{

		font-size: 13px;
		line-height: 17px;
		margin-bottom: 12px

	}
	#comparativa .nav{
		display: none;
	}

	.timeline-Header-title {
		color: #a70a0b !important;
		font-size: 22px !important;
	}

</style>-->

<div class="td-main-content-wrap">
	<script>
			$(function() {
				$("#TIMwdg_sport_result").WdgSportResult({
					'idtorneo':<?php echo $torneo ?>,
					'idteam':<?php echo $partido ?>
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

	<div class="nav_smnu_sports_01" data-enhance="false" id="TIMnav_smnu_sports"></div>
</div>

<div class="td-main-content-wrap">
    <div class="td-container td-post-template-1 <?php echo $td_sidebar_position; ?>">
        <!--<div class="td-crumb-container"><?php echo td_page_generator::get_single_breadcrumbs($td_mod_single->title); ?></div>-->
        <div class="td-pb-row">
            <?php

            //the default template
            switch ($loop_sidebar_position) {
                default:
                    ?>
                        <div class="td-pb-span8 td-main-content" role="main">
                            <div class="td-ss-main-content">
                                <?php
                                locate_template('loop-single-14.php', true);

                                ?>
                            </div>
                        </div>
                        <div class="td-pb-span4 td-main-sidebar" role="complementary">
                            <div class="td-ss-main-sidebar">
								<div>
									<img src='<?php echo get_stylesheet_directory_uri().'/'?>images/pagebuilder/bannerPublicidad.png' >
								</div>

								<!--<div id="comparativa" class="wdg_stadistics_01" data-enhance="false" style="display: block;"></div>
								<link rel="stylesheet" href="http://i2.esmas.com/deportes30/mxm/css/wdg_stadistics_01.css">
								<script type="text/javascript" src="http://i2.esmas.com/deportes30/mxm/js/wdg_stadistics_01.js"></script>-->

								<a class="twitter-timeline"  href="https://twitter.com/TD_Deportes" data-widget-id="732267715960807424">TWITTER</a>
								<script>
								!function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0],p=/^http:/.test(d.location)?'http':'https';if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src=p+"://platform.twitter.com/widgets.js";fjs.parentNode.insertBefore(js,fjs);}}(document,"script","twitter-wjs");
								</script>
                            </div>
                        </div>
                    <?php
                    break;

                case 'sidebar_left':
                    ?>
                    <div class="td-pb-span8 td-main-content <?php echo $td_sidebar_position; ?>-content" role="main">
                        <div class="td-ss-main-content">
                            <?php
                            locate_template('loop-single-14.php', true);
                            comments_template('', true);
                            ?>
                        </div>
                    </div>
	                <div class="td-pb-span4 td-main-sidebar" role="complementary">
		                <div class="td-ss-main-sidebar">
			                <?php get_sidebar(); ?>
		                </div>
	                </div>
                    <?php
                    break;

                case 'no_sidebar':
                    ?>
                    <div class="td-pb-span12 td-main-content" role="main">
                        <div class="td-ss-main-content">
                            <?php
                            locate_template('loop-single-14.php', true);
                            comments_template('', true);
                            ?>
                        </div>
                    </div>
                    <?php
                    break;

            }
            ?>
        </div> <!-- /.td-pb-row -->
    </div> <!-- /.td-container -->
</div> <!-- /.td-main-content-wrap -->

<?php

get_footer();
