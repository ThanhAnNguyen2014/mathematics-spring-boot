jQuery(document).ready(function ($) {
            $('.pc-ti-content:first').slideToggle(300);
            $('.pc-ti-content:first').parent().toggleClass( "_show" );
            $('.pc-ti-content:first').parent().find('.pc-ti-title').toggleClass( "_active" );

            $('.pc-ti-title').click(function(){
                $( this ).parent().toggleClass( "_show" );
                $( this ).toggleClass( "_active" );
                $( this ).parent().find('.pc-ti-content').slideToggle( 300 );
            });
        });