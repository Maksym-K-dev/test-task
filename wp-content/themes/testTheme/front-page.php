<?php
/**
 * The template for displaying all pages
 *
 * This is the template that displays all pages by default.
 * Please note that this is the WordPress construct of pages
 * and that other 'pages' on your WordPress site may use a
 * different template.
 *
 * @link https://developer.wordpress.org/themes/basics/template-hierarchy/
 *
 * @package test
 */

if( !defined( 'ABSPATH' ) ) exit;

get_header();

$title = get_field('title_page');
$top_row_text = get_field('content_text_top_row');
$bottom_row_text = get_field('content_text_bottom_row');
$top_row_image_desk = get_field('top_row_image_desk');
$top_row_image_mobile = get_field('top_row_image_mobile');
$bottom_row_image_desk = get_field('bottom_row_image_desk');
$bottom_row_image_mobile = get_field('bottom_row_image_mobile');

$slider_path = get_stylesheet_directory() . '/assets/images/Desktop-Design/Swiper-items/';
$slider_url  = get_stylesheet_directory_uri() . '/assets/images/Desktop-Design/Swiper-items/';

// Get all image JPG, PNG, WEBP
$images = glob($slider_path . '*.{jpg,jpeg,png,webp}', GLOB_BRACE);
?>





<main>
    <?php ?>
    <section class="about-brand">
        <div class="about-brand__container">
            <div class="about-brand__block">
                <div class="about-brand__content">
                    <?php if(!empty($title)) {
                        echo '<h2>' . esc_html($title) . '</h2>';
                    } ?>
                    <div class="about-brand__row">
                        <div class="about-brand__desc">
                            <?php
                            if(!empty($top_row_text)) {
                                echo '<p>' . esc_html($top_row_text) . '</p>';
                            }
                            ?>
                        </div>
                            <div class="about-brand__img">
                                <?php render_acf_image('top_row_image_desk', 'top_row_image_mobile'); ?>
                            </div>
                    </div>
                    <div class="about-brand__row">
                        <div class="about-brand__desc">
                            <?php
                            if(!empty($bottom_row_text)) {
                                echo '<p>' . esc_html($bottom_row_text) . '</p>';
                            }
                            ?>
                        </div>
                        <div class="about-brand__img">
                            <?php render_acf_image('bottom_row_image_desk', 'bottom_row_image_mobile'); ?>
                        </div>
                    </div>
                </div>
                <div class="about-brand__swiper">
                    <div class="about-brand__slider swiper">
                            <?php
                            if (!empty($images)) { ?>
                        <div class="swiper-wrapper">
                            <?php
                            foreach ($images as $image) {
                                $filename = basename($image);
                                ?>
                                <div class="swiper-slide about-brand__slide">
                                    <img src="<?php echo esc_url($slider_url . $filename); ?>" alt="<?php echo esc_attr($filename); ?>">
                                </div>
                                <?php
                            }
                            } ?>
                        </div>
                        <div class="about-brand__scrollbar swiper-scrollbar"></div>
                        <div class="about-brand__nav swiper-nav">
                            <div class="swiper-button-prev"></div>
                            <div class="swiper-button-next"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

</main>




<?php   get_footer();