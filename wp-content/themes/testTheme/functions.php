<?php
if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

// Enqueue Styles & Scripts
function testTheme_enqueue_assets() {
    $theme_version = wp_get_theme()->get( 'Version' );

    wp_enqueue_style(
        'testTheme-main',
        get_template_directory_uri() . '/assets/css/style.min.css',
        array(),
        $theme_version
    );

    wp_enqueue_style(
        'testTheme-templates-style',
        get_template_directory_uri() . '/assets/css/templates/task-style.min.css',
        array(),
        $theme_version
    );

    wp_enqueue_style(
        'swiper',
        'https://cdn.jsdelivr.net/npm/swiper@10/swiper-bundle.min.css',
        array(),
        '10.0.0'
    );

    wp_enqueue_script(
        'testTheme-main',
        get_template_directory_uri() . '/assets/js/main.min.js',
        array('jquery'),
        $theme_version,
        true
    );

    wp_enqueue_script(
        'swiper',
        'https://cdn.jsdelivr.net/npm/swiper@10/swiper-bundle.min.js',
        array(),
        '10.0.0',
        true
    );
}
add_action( 'wp_enqueue_scripts', 'testTheme_enqueue_assets' );

function render_acf_image($desktop_field, $mobile_field) {
    $desktop_img = get_field($desktop_field);
    $mobile_img  = get_field($mobile_field);

    if (!$desktop_img && !$mobile_img) {
        return;
    }

    echo '<picture>';
    if ($mobile_img) {
        echo '<source media="(max-width:768px)" srcset="' . esc_url($mobile_img['url']) . '">';
    }
    if ($desktop_img) {
        echo '<img src="' . esc_url($desktop_img['url']) . '" alt="' . esc_attr($desktop_img['alt']) . '">';
    }
    echo '</picture>';
}


