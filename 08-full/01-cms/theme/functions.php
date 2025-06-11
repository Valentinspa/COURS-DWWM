<?php
// Ajouter la prise en charge des images mises en avant
add_theme_support( 'post-thumbnails' );

// Ajouter automatiquement le titre du site dans l'en-tête du site
add_theme_support( 'title-tag' );

add_action( 'wp_enqueue_scripts', 'dwwm_register_assets' );

function dwwm_register_assets()
{
    wp_enqueue_style( "dwwm", get_stylesheet_uri());
}
?>