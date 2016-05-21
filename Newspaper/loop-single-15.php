<?php
/*
Single Post Template: Template 15
*/

if (have_posts()) {
    the_post();

    $td_mod_single = new td_module_single($post);
    ?>
	<div class="td-post-header">
		<header class="td-post-title">
			<div class="td-module-meta-info">
				<?php echo $td_mod_single->get_author();?>
				<?php echo $td_mod_single->get_date(false);?>
				<?php echo $td_mod_single->get_comments();?>
				<?php echo $td_mod_single->get_views();?>
			</div>
		</header>	
	</div>		
    <article id="post-<?php echo $td_mod_single->post->ID;?>" class="<?php echo join(' ', get_post_class());?>" 
	<?php echo $td_mod_single->get_item_scope();?>>
		
        <div class="td-post-header">
					
			<!-- Pinta la categoria-->
            <?php 
				//echo $td_mod_single->get_category(); 
			?>

			
            <header class="td-post-title">
				<!-- Pinta el titulo-->
                <?php echo $td_mod_single->get_title();?>							

				<div class='topDotted'>
					<div class='headerTags rightDotted'>
						<!-- Se cargan las etiquetas-->
						<div class="td-post-source-tags">							
							<?php echo $td_mod_single->get_the_tags();?>
						</div>
					</div>
					<div class='headerSocial'>
						<!-- Se cargan las redes sociales-->
						<div class="td-post-source-tags">
							<?php echo $td_mod_single->get_social_sharing_top();?>
						</div>
					</div>	

				</div>
                

            </header>

        </div>

       	
        <div class="">

        <?php
        // override the default featured image by the templates (single.php and home.php/index.php - blog loop)
        if (!empty(td_global::$load_featured_img_from_template)) {
            echo $td_mod_single->get_image(td_global::$load_featured_img_from_template);
        } else {
            echo $td_mod_single->get_image('td_696x0');
        }
        ?>
		
		<p class="td-post-sub-title">
		<?php
			// Obtiene el valor de la plantilla que se haya seleccionado para este curso
			echo get_post_meta($post->ID, 'subtitulo', true);
		?>
		</p>
		</div>
		
		<div class="td-post-content topDotted paddingNota td-containerText">
        <?php echo $td_mod_single->get_content();?>
        </div>
		
		<?php 
			$datoExperto = get_post_meta($post->ID, 'dato_experto', true);
			if($datoExperto =='1'){			
			
				$dato_experto_1 = get_post_meta($post->ID, 'dato_experto_1', true);
				$dato_experto_2 = get_post_meta($post->ID, 'dato_experto_2', true);
				$dato_experto_3 = get_post_meta($post->ID, 'dato_experto_3', true);
				$dato_experto_4 = get_post_meta($post->ID, 'dato_experto_4', true);
		?>
		<!-- Div Dato experto-->
		<div id='datoExperto'>
			<div class='tituloExperto'>-DATO EXPERTO</div>
			<div style='margin: 20px 0px'>	
				<div class="divCuadro heightCuadro rightDotted">
					<div class="numeros">1</div>
					<div class="underlined"></div>
					<div class="datoText"><?php echo $dato_experto_1?></div>
				</div>
				<div class="divCuadro heightCuadro">
					<div class="numeros">2</div>
					<div class="underlined"></div>
					<div class="datoText"><?php echo $dato_experto_2?></div>
					
				</div>
			</div>	
			<div>	
				<div class="divCuadro heightCuadro rightDotted topDotted">
					<div class="numeros">3</div>
					<div class="underlined"></div>
					<div class="datoText"><?php echo $dato_experto_3?></div>
					
				</div>
				<div class="divCuadro heightCuadro topDotted">
					<div class="numeros">4</div>
					<div class="underlined"></div>
					<div class="datoText"><?php echo $dato_experto_4?></div>
				</div>
			</div>
		</div>
		<?php
			}
		?>	
		<!-- Se cargan las redes sociales-->
		<div class="td-post-source-tags" style="text-align: right">
			<?php echo $td_mod_single->get_social_sharing_top();?>
		</div>
        <footer>
            <?php echo $td_mod_single->get_post_pagination();?>
            <?php echo $td_mod_single->get_review();?>
			
			

            
            <?php echo $td_mod_single->get_next_prev_posts();?>
            
	        <?php echo $td_mod_single->get_item_scope_meta();?>
        </footer>

    </article> <!-- /.post -->

    <?php echo $td_mod_single->related_posts();?>

<?php
} else {
    //no posts
    echo td_page_generator::no_posts();
}