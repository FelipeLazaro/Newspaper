<?php
/*
    Our portfolio:  http://themeforest.net/user/tagDiv/portfolio
    Thanks for using our theme !
    tagDiv - 2015
*/


/**
 * Load the speed booster framework + theme specific files
 */

// load the deploy mode
require_once('td_deploy_mode.php');

// load the config
require_once('includes/td_config.php');
add_action('td_global_after', array('td_config', 'on_td_global_after_config'), 9); //we run on 9 priority to allow plugins to updage_key our apis while using the default priority of 10

// load the wp booster
require_once('includes/wp_booster/td_wp_booster_functions.php');


require_once('includes/td_css_generator.php');
require_once('includes/shortcodes/td_misc_shortcodes.php');
require_once('includes/widgets/td_page_builder_widgets.php'); // widgets





/* ----------------------------------------------------------------------------
 * Woo Commerce
 */

// breadcrumb
add_filter('woocommerce_breadcrumb_defaults', 'td_woocommerce_breadcrumbs');
function td_woocommerce_breadcrumbs() {
	return array(
		'delimiter' => ' <i class="td-icon-right td-bread-sep"></i> ',
		'wrap_before' => '<div class="entry-crumbs" itemprop="breadcrumb">',
		'wrap_after' => '</div>',
		'before' => '',
		'after' => '',
		'home' => _x('Home', 'breadcrumb', 'woocommerce'),
	);
}

// use own pagination
if (!function_exists('woocommerce_pagination')) {
	// pagination
	function woocommerce_pagination() {
		echo td_page_generator::get_pagination();
	}
}

// Override theme default specification for product 3 per row


// Number of product per page 8
add_filter('loop_shop_per_page', create_function('$cols', 'return 4;'));

if (!function_exists('woocommerce_output_related_products')) {
	// Number of related products
	function woocommerce_output_related_products() {
		woocommerce_related_products(array(
			'posts_per_page' => 4,
			'columns' => 4,
			'orderby' => 'rand',
		)); // Display 4 products in rows of 1
	}
}




/* ----------------------------------------------------------------------------
 * bbPress
 */
// change avatar size to 40px
function td_bbp_change_avatar_size($author_avatar, $topic_id, $size) {
	$author_avatar = '';
	if ($size == 14) {
		$size = 40;
	}
	$topic_id = bbp_get_topic_id( $topic_id );
	if ( !empty( $topic_id ) ) {
		if ( !bbp_is_topic_anonymous( $topic_id ) ) {
			$author_avatar = get_avatar( bbp_get_topic_author_id( $topic_id ), $size );
		} else {
			$author_avatar = get_avatar( get_post_meta( $topic_id, '_bbp_anonymous_email', true ), $size );
		}
	}
	return $author_avatar;
}
add_filter('bbp_get_topic_author_avatar', 'td_bbp_change_avatar_size', 20, 3);
add_filter('bbp_get_reply_author_avatar', 'td_bbp_change_avatar_size', 20, 3);
add_filter('bbp_get_current_user_avatar', 'td_bbp_change_avatar_size', 20, 3);



//add_action('shutdown', 'test_td');

function test_td () {
    if (!is_admin()){
        td_api_base::_debug_get_used_on_page_components();
    }

}


/**
 * tdStyleCustomizer.js is required
 */
if (TD_DEBUG_LIVE_THEME_STYLE) {
    add_action('wp_footer', 'td_theme_style_footer');
    function td_theme_style_footer() {
        ?>
        <div id="td-theme-settings" class="td-theme-settings-small">
            <div class="td-skin-header">One click demos</div>
            <div class="td-skin-content">
                <div class="td-set-theme-style"><a href="http://demo.tagdiv.com/newspaper/" class="td-set-theme-style-link">DEFAULT</a></div>
                <div class="td-set-theme-style"><a href="http://demo.tagdiv.com/newspaper_fashion/" class="td-set-theme-style-link">FASHION</a></div>
                <div class="td-set-theme-style"><a href="http://demo.tagdiv.com/newspaper_tech/" class="td-set-theme-style-link" data-value="">TECH</a></div>
                <div class="td-set-theme-style"><a href="http://demo.tagdiv.com/newspaper_video/" class="td-set-theme-style-link">VIDEO</a></div>
                <div class="td-set-theme-style"><a href="http://demo.tagdiv.com/newspaper_sport/" class="td-set-theme-style-link">SPORT</a></div>
                <div class="td-set-theme-style"><a href="http://demo.tagdiv.com/newspaper_classic_blog/" class="td-set-theme-style-link">CLASSIC BLOG</a></div>
	            <div class="td-set-theme-style"><a href="http://demo.tagdiv.com/newspaper_travel/" class="td-set-theme-style-link">TRAVEL<span>New</span></a></div>
	            <div class="td-set-theme-style"><a href="http://demo.tagdiv.com/newspaper_health/" class="td-set-theme-style-link">HEALTH<span>New</span></a></div>
	            <div class="td-set-theme-style"><a href="http://demo.tagdiv.com/newspaper_cars/" class="td-set-theme-style-link">CARS<span>New</span></a></div>
            </div>
            <div class="clearfix"></div>
            <div class="td-set-hide-show"><a href="#" id="td-theme-set-hide">HIDE</a></div>
        </div>
    <?php
    }
}

//td_util::update_option('tdx_remote_http', '');
//die;
//if (!is_admin()) {
//	$result = tdx_remote_http::get_page('http://reddit.com');
//	echo $result;
//	die;
//}


//print_r(td_remote_video::youtube_api_get_videos_info(array('JgI8DyDCESw', 'f5qepzrQm9U', 'UGdRyPN3IRk')));
//
//print_r(td_remote_video::vimeo_api_get_videos_info(array('141710401', '135900733', '135911266')));
//die;


// Add the hook action
add_action('transition_post_status', 'send_new_post', 10, 3);

// Listen for publishing of a new post
function send_new_post($new_status, $old_status, $post) {	
	//Primera publicación
	if('publish' === $new_status && 'publish' !== $old_status && $post->post_type === 'post') {	  
		require_once ABSPATH . '/wp-admin/includes/post.php';
		list( $permalink, $postname ) = get_sample_permalink( $post_id );
		$post_url =  str_replace( '%postname%', $postname, $permalink );
				
		//Enviar a Netstorage		
		$tmp_file = save_tmp_file_by_curl($post_url);
		akamaiUpload($tmp_file);		
	}
	// Republicación
	if('publish' === $new_status && 'publish' == $old_status && $post->post_type === 'post') {
	  $post_url = get_permalink( $post_id );
		
		//Enviar a Netstorage
		$tmp_file = save_tmp_file_by_curl($post_url);
		akamaiUpload($tmp_file);
		
		//flush
		send_flush_akamai($post_url);		
	}
	//Cambiar status publicado a borrador: 	
	if('draft' === $new_status && 'publish' == $old_status && $post->post_type === 'post') {
	  $post_url = get_permalink( $post_id );
		
		//flush
		send_flush_akamai($post_url);
		
		//Eliminar de Netstorage
		//echo 'Enviar a borrador: '.$post_url;die;
		
	}
	//Cambiar status publicado a privado: 	
	if('private' === $new_status && 'publish' == $old_status && $post->post_type === 'post') {
	  $post_url = get_permalink( $post_id );
		
		//flush
		send_flush_akamai($post_url);
	  
		//Eliminar de Netstorage
		//echo 'Enviar a privado: '.$post_url;die;
		
	}
}


function save_tmp_file_by_curl($post_url){

	$post_path = parse_url($post_url, PHP_URL_PATH);
	$tmp_path = '/tmp'.$post_path;
	mkdir($tmp_path, 0755, true);
	// create a new cURL resource
	$ch = curl_init();

	// set URL and other appropriate options
	curl_setopt($ch, CURLOPT_URL, $post_url);
	curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1); 
	curl_setopt($ch, CURLOPT_HEADER, 0);

	// grab URL and pass it to the browser
	$out = curl_exec($ch);

	// close cURL resource, and free up system resources
	curl_close($ch);
	
	file_put_contents($tmp_path.'index.html',$out);
	return $tmp_path.'index.html';
}

//funcion para crear subir archivos netstorage
function akamaiUpload($fileO){
	$fileD = str_replace('/tmp','/test/wexplode_deportes',$fileO);
	$ftp_akamai_server_mxm	= "storagemas.upload.akamai.com";
	$ftp_akamai_login_mxm    = "awsfeeds";
	$ftp_akamai_passwd_mxm	= "M1DdLe3F3D5-";	
			
	if(filesize($fileO))
	{
		$ftp=ftp_connect($ftp_akamai_server_mxm);
		$login_result=ftp_login($ftp, $ftp_akamai_login_mxm, $ftp_akamai_passwd_mxm);

		recursive_mkdir_ftp($ftp,$fileD);
		ftp_chdir($ftp,'/');

		ftp_put($ftp,$fileD,$fileO,FTP_ASCII);

		ftp_close($ftp);
                echo "UPLOADdd: ".$fileO."<br>";
	}
	else
	{
		echo "ERROR: ".$fileO."<br>";;
	}
}

//funcion para crear carpetas recursivo en akamai
function recursive_mkdir_ftp($ftp,$path){
	$dirs=explode('/',$path);
	$count=count($dirs)-1;
	$dir='';

	for($i=0;$i<$count;$i++){
		if($i==0){
			$dir.=$dirs[$i];
		}
		else{
			$dir.='/'.$dirs[$i];
		}
	}
			
	if(!@ftp_chdir($ftp, $dir)){
		ftp_chdir($ftp, '/');
		$folders = explode('/', $dir);
	
		for($i=0;$i<count($folders);$i++){
			if(!@ftp_chdir($ftp, $folders[$i])){
				ftp_mkdir($ftp, $folders[$i]);
				ftp_chdir($ftp, $folders[$i]);
			}
		}
	}	
	return true;
}

//Inicio Proceso de flush Akamai 
function send_flush_akamai( $post_url ) {
	/*	
		echo 'send flush: -- '. $post_url; die;
		$userakamai = 'esmas.akamai@esmas.com';
        $pakamai = 'Tr3M-D3s.Gxy';	
		$urlparts = parse_url($post_url);
		$values[]['data'] = $urlparts['scheme'].'://'.$urlparts['host']; //Home
		$values[]['data'] = $post_url;
		foreach($values as $value){
								$urls[] = '"'.$value["data"].'"'; //Url
		}
		$json = '{"objects":['.implode(',',$urls).']}';
		//Envia Flush
		$result = shell_exec('curl https://api.ccu.akamai.com/ccu/v2/queues/default -H "Content-Type:application/json" -d \''.$json.'\' -u '.$userakamai.':'.$pakamai);
		$log_urls = implode(',',$urls);
		$resultjson = json_decode($result,true);
		shell_exec("echo ".date("d:m:Y h:i:s")." httpStatus:".$resultjson["httpStatus"]." estimatedSeconds:".$resultjson["estimatedSeconds"]." progressUri:".$resultjson["progressUri"]." Urls:".$log_urls." >> ".PATH_LOGS_APP."smaria_log_flush.".date("Ym"));	  
	*/	
} 
//Fin Proceso de flush Akamai  


### Seccion notas SEF

// Funcionalidad combos para seleccionar partido al agregar o editar un post
add_action( 'admin_head', 'Partidos_Torneo' ); 

function Partidos_Torneo() { 
	global $post;
?>
	<script type="text/javascript" >
	jQuery(document).ready(function($) {			
		
		var selectTorneo = jQuery("#acf-field-torneo").html();
		var urlPost = jQuery("#editable-post-name").html();
		
		// se cargan los torneos activos cuando el campo torneos existe
		// de igual forma se revisa si el check de datos expertos esta activo para mostrar u ocultar los campos		
		if(selectTorneo){
							
			$.ajax({
				url: 'http://static-televisadeportes.esmas.com/sportsdata/futbol/data/torneos_activos.js',
				dataType: 'jsonp',
				jsonpCallback: 'tournaments',
				jsonp: 'tournaments',
			});
			//se revisa si el campo datos expertos esta activado se muestren los campos de texto
			if(jQuery("#acf-field-dato_experto-1").attr('checked')=='checked'){
				verCamposExpertos('1');
			}else{
				verCamposExpertos('0');
			}									
		}		
		
		// al seleccionar un torneo se hace un llamado para pintar las jornadas del torneo
		jQuery("#acf-field-torneo").change(function(){
			jQuery("#acf-field-jornada").html('<option>Debes seleccionar un Torneo</option>');
			jQuery("#acf-field-partido").html('<option>Debes seleccionar una Jornada</option>');
			
			var TorneoId = jQuery(this).val();
			if(TorneoId != 0){
				jQuery("#acf-field-jornada").html('<option>por favor espere...</option>');
				
				$.ajax({
					url: 'http://static-televisadeportes.esmas.com/sportsdata/futbol/data/'+TorneoId+'/jornadas/jornadalistadojsonp.js',
					dataType: 'jsonp',
					jsonpCallback: 'jornadalistado',
					jsonp: 'jornadalistado',
				});
			}			
			
		});
		
		// al seleccionar una jornada se cargan los partidos correspondientes
		jQuery("#acf-field-jornada").change(function(){
			
			var partidos = jQuery(this).find(':selected').attr('data-matches');
			partidos = jQuery.parseJSON(partidos);			
			var selectHtml = '<option value="0">Seleccione un partido</option>';
			jQuery.each(partidos, function( index, value ) {
				selectHtml += '<option value="'+value.idPartido+'">'+value.matchName+'</option>';
			});		
			
			jQuery("#acf-field-partido").html(selectHtml);
			//una vez cargados los partidos y si el campo se encuentra registrado se selecciona
			jQuery('#acf-field-partido option[value="<?php echo get_post_meta($post->ID, 'partido', true)?>"]').attr('selected', true).change();
			
		});
		
		//al seleccionar el partido, se modifica la URL del post
		jQuery("#acf-field-partido").change(function(){			
			var TorneoId = jQuery("#acf-field-torneo").val();
			jQuery("#editable-post-name").html(TorneoId+'_'+jQuery(this).val()+'_'+urlPost);	
			
		});
		
		//al hacer click en el campo dato experto se muestran / ocultan los campos de texto
		jQuery("#acf-field-dato_experto-1").click(function(){
			if(jQuery(this).attr('checked')=='checked'){
				verCamposExpertos('1');
			}
			else{
				verCamposExpertos('0');
			}
		});
		
	});		

	function verCamposExpertos(check){
		if(check=='1'){
			jQuery("#acf-dato_experto_1").slideDown( "slow" );
			jQuery("#acf-dato_experto_2").slideDown( "slow" );
			jQuery("#acf-dato_experto_3").slideDown( "slow" );
			jQuery("#acf-dato_experto_4").slideDown( "slow" );
		}
		else{
			jQuery("#acf-dato_experto_1").slideUp( "slow" );
			jQuery("#acf-dato_experto_2").slideUp( "slow" );
			jQuery("#acf-dato_experto_3").slideUp( "slow" );
			jQuery("#acf-dato_experto_4").slideUp( "slow" );
		}
	}
	
	// se listan los torneos
	function tournaments (data) {		
		var selectHtml = '<option value="0">Seleccione un torneo</option>';
		jQuery.each(data, function( index, value ) {
		  selectHtml += '<option value="'+value.id+'">'+value.name+'</option>';
		});		
		jQuery("#acf-field-torneo").html(selectHtml);		
		
		// una vez que se cargan los torneos y se encuentra el valor guardado previamente se selecciona el torneo 
		setTimeout(function(){								
			jQuery('#acf-field-torneo option[value="<?php echo get_post_meta($post->ID, 'torneo', true)?>"]').attr('selected', true).change();
		}, 1500);
		
	};
	
	// se listan las jornadas
	function jornadalistado(data){		
		var selectHtml = '';
		
		jQuery.each(data, function( index, value ) {
			var selected = '';
			if(value.actual==1){
				selected = 'selected="selected"';
				
				var selectPartidos = '<option value="0">Seleccione un partido</option>';
				jQuery.each(value.matches, function( index, value ) {
					selectPartidos += '<option value="'+value.idPartido+'">'+value.matchName+'</option>';
				});						
				jQuery("#acf-field-partido").html(selectPartidos);				
			}
			selectHtml += '<option value="'+value.weekid+'" '+selected+' data-matches=\''+JSON.stringify(value.matches)+'\'>'+value.shortname+'</option>';
		});		
		jQuery("#acf-field-jornada").html(selectHtml);		
		//una vez cargadas las jornadas y si el campo se encuentra registrado se selecciona	
		jQuery('#acf-field-jornada option[value="<?php echo get_post_meta($post->ID, 'jornada', true)?>"]').attr('selected', true).change();
	}
	</script> 
	
<?php
}

### Termina Seccion notas SEF


function add_query_vars_filter( $vars ){
  $vars[] = "partido";
  $vars[] = "torneo";
  $vars[] = "local";
  $vars[] = "visitante";
  return $vars;
}
add_filter( 'query_vars', 'add_query_vars_filter' );
