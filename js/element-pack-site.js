( function( $, yjzan ) {

	"use strict";

	var ElementPack = {

		init: function() {

			var widgets = {
				'bdt-audio-player.default' 				   : ElementPack.widgetAudioPlayer,
				'bdt-chart.default' 					   : ElementPack.widgetChart,
				'bdt-carousel.default' 					   : ElementPack.widgetCarousel,
				'bdt-carousel.bdt-alice' 				   : ElementPack.widgetCarousel,
				'bdt-carousel.bdt-vertical' 			   : ElementPack.widgetCarousel,
				'bdt-custom-carousel.default' 			   : ElementPack.widgetCustomCarousel,
				'bdt-custom-carousel.bdt-custom-content'   : ElementPack.widgetCustomCarousel,
				'bdt-slider.default' 					   : ElementPack.widgetSlider,
				'bdt-circle-menu.default' 				   : ElementPack.widgetCircleMenu,
				'bdt-contact-form.default' 				   : ElementPack.widgetSimpleContactForm,
				'bdt-cookie-consent.default' 			   : ElementPack.widgetCookieConsent,
				'bdt-helpdesk.default' 					   : ElementPack.widgetHelpDesk,
				'bdt-iconnav.default' 					   : ElementPack.widgetIconNav,
				'bdt-iframe.default' 					   : ElementPack.widgetIframe,
				'bdt-image-compare.default' 			   : ElementPack.widgetImageCompare,
				'bdt-image-magnifier.default' 			   : ElementPack.widgetImageMagnifier,
				'bdt-modal.default' 					   : ElementPack.widgetModal,
				'bdt-scrollnav.default' 				   : ElementPack.widgetScrollNav,
				'bdt-post-grid-tab.default' 			   : ElementPack.widgetPostGridTab,
				'bdt-price-table.default' 				   : ElementPack.widgetPriceTable,
				'bdt-price-table.bdt-partait' 			   : ElementPack.widgetPriceTable,
				'bdt-progress-pie.default' 				   : ElementPack.widgetProgressPie,
				'bdt-qrcode.default' 					   : ElementPack.widgetQRCode,
				'bdt-timeline.bdt-olivier' 				   : ElementPack.widgetTimeline,
				'bdt-threesixty-product-viewer.default'    : ElementPack.widgetTSProductViewer,
				'bdt-video-gallery.default' 			   : ElementPack.widgetVideoGallery,
			};

			$.each( widgets, function( widget, callback ) {
				yjzan.hooks.addAction( 'frontend/element_ready/' + widget, callback );
			});

			yjzan.hooks.addAction( 'frontend/element_ready/section', ElementPack.yjzanSection );
		},		
		
		//Audio Player object
		widgetAudioPlayer: function( $scope ) {

			var $audioPlayer         = $scope.find( '.bdt-audio-player > .jp-jplayer' ),
				audioPlayerContainer = $scope.find( '.bdt-audio-player > .jp-audio' ).attr('id'),
				$container 			 = $audioPlayer.next('.jp-audio').attr('id');
				

			if ( ! $audioPlayer.length ) {
				return;
			}

			$($audioPlayer).jPlayer({
				ready: function (event) {
					$(this).jPlayer("setMedia", {
						title : $audioPlayer.data('audio_title'),
						mp3   : $audioPlayer.data('audio_source'),
					});
					if($audioPlayer.data('autoplay')) {
						$(this).jPlayer("play", 1);
					}
				},
				play: function() {
					$(this).next('.jp-audio').removeClass('bdt-player-played');
					$(this).jPlayer("pauseOthers");
				},
				ended: function() {
			    	$(this).next('.jp-audio').addClass('bdt-player-played');
			  	},

				timeupdate: function(event) {
					if($audioPlayer.data('time_restrict')) {
						if ( event.jPlayer.status.currentTime > $audioPlayer.data('restrict_duration') ) {
							$(this).jPlayer('stop');
						}
					}
				},

				cssSelectorAncestor : '#' + $container,
				useStateClassSkin   : true,
				autoBlur            : $audioPlayer.data('smooth_show'),
				smoothPlayBar       : true,
				keyEnabled          : $audioPlayer.data('keyboard_enable'),
				remainingDuration   : true,
				toggleDuration      : true,
				volume              : $audioPlayer.data('volume_level')
			});

		},
		//Chart widget object
		widgetChart: function( $scope ) {

			var	$chart    	  = $scope.find( '.bdt-chart' ),
				$chart_canvas = $chart.find( '> canvas' ),
				settings      = $chart.data('settings');

			if ( ! $chart.length ) {
				return;
			}

			yjzanFrontend.waypoint( $chart_canvas, function() {
				var $this   = $( this ),
					ctx     = $this[0].getContext('2d'),
					myChart = new Chart(ctx, settings);
			}, {
				offset: 'bottom-in-view'
			} );
		},

		//Carousel object
		widgetCarousel: function( $scope ) {

			var $carousel 		   = $scope.find( '.bdt-carousel' );
				
			if ( ! $carousel.length ) {
				return;
			}

			ElementPack.swiperSlider($carousel);		    
		},

		//Carousel object
		widgetCustomCarousel: function( $scope ) {

			var $carousel 		   = $scope.find( '.bdt-custom-carousel' );
				
			if ( ! $carousel.length ) {
				return;
			}

			ElementPack.swiperSlider($carousel);		    
		},
		//Slider object
		widgetSlider: function( $scope ) {

			var $slider = $scope.find( '.bdt-slider' );
				
			if ( ! $slider.length ) {
				return;
			}

			ElementPack.swiperSlider($slider);		    
		},

		swiperSlider: function( $slider ) {

			var $sliderContainer = $slider.find('.swiper-container'),
				$settings 		 = $slider.data('settings');

		    var swiper = new Swiper($sliderContainer, $settings);

		    if ($settings['pauseOnHover']) {
			 	$($sliderContainer).hover(function() {
				    (this).swiper.autoplay.stop();
				}, function() {
				    (this).swiper.autoplay.start();
				});
			}
		},


		// loadSDK: function() {
		// 	// Don't load in parallel
		// 	if ( config.isLoading || config.isLoaded ) {
		// 		return;
		// 	}

		// 	config.isLoading = true;

		// 	jQuery.ajax( {
		// 		url: 'https://connect.facebook.net/en_US/sdk.js',
		// 		dataType: 'script',
		// 		cache: true,
		// 		success: function() {
		// 			FB.init( {
		// 				appId: $settings['app_id'],
		// 				version: 'v2.10',
		// 				xfbml: false
		// 			} );
		// 			config.isLoaded = true;
		// 			config.isLoading = false;
		// 			jQuery( document ).trigger( 'fb:sdk:loaded' );
		// 		}
		// 	} );
		// },


		//360 degree product viewer
		widgetTSProductViewer: function( $scope ) {

			var $TSPV      	   = $scope.find( '.bdt-threesixty-product-viewer' ),
				$settings      = $TSPV.data('settings'),
				$container     = $TSPV.find('> .bdt-tspv-container'), 
				$fullScreenBtn = $TSPV.find('> .bdt-tspv-fb');  

			if ( ! $TSPV.length ) {
				return;
			}
			

			if ($settings['source_type'] == 'remote') {
				$settings.source = SpriteSpin.sourceArray( $settings['source'], { frame: $settings['frame_limit'], digits: $settings['image_digits']} );
			}

			yjzanFrontend.waypoint( $container, function() {
				var $this = $( this );
				$this.spritespin($settings);

			}, {
				offset: 'bottom-in-view'
			} );

			

			//if ( ! $fullScreenBtn.length ) {
				$($fullScreenBtn).click(function(e) {
				    e.preventDefault();
				    $($container).spritespin('api').requestFullscreen();
			    });
			//}			

		},

		//Image Compare object
		widgetImageCompare: function( $scope ) {

			var $imageCompare         = $scope.find( '.bdt-image-compare > .twentytwenty-container' ),
				default_offset_pct    = $imageCompare.data('default_offset_pct'),
				orientation           = $imageCompare.data('orientation'),
				before_label          = $imageCompare.data('before_label'),
				after_label           = $imageCompare.data('after_label'),
				no_overlay            = $imageCompare.data('no_overlay'),
				move_slider_on_hover  = $imageCompare.data('move_slider_on_hover'),
				move_with_handle_only = $imageCompare.data('move_with_handle_only'),
				click_to_move         = $imageCompare.data('click_to_move');

			if ( ! $imageCompare.length ) {
				return;
			}

			$($imageCompare).twentytwenty({
			    default_offset_pct: default_offset_pct,
			    orientation: orientation,
			    before_label: before_label,
			    after_label: after_label,
			    no_overlay: no_overlay,
			    move_slider_on_hover: move_slider_on_hover,
			    move_with_handle_only: move_with_handle_only,
			    click_to_move: click_to_move
		  	});

		},

		// QR Code Object
		widgetQRCode: function($scope) {
			var $qrcode = $scope.find( '.bdt-qrcode' ),
				image   = $scope.find( '.bdt-qrcode-image' );

			if ( ! $qrcode.length ) {
				return;
			}
			var settings=$qrcode.data('settings');
				settings.image=image[0];

		   $($qrcode).qrcode(settings);
		},

		//Progress Iframe object
		widgetIframe: function( $scope ) {

			var $iframe        = $scope.find( '.bdt-iframe' );

			if ( ! $iframe.length ) {
				return;
			}

			ElementPack.lazyLoader($iframe);
		},


		lazyLoader:function( $scope ) {
			var $lazyload = $scope.find('.bdt-lazyload');

			$($lazyload).recliner({
				throttle : $lazyload.data('throttle'),
				threshold : $lazyload.data('threshold'),
				live : $lazyload.data('live')
			});
		},

		//Iconnav object
		widgetIconNav: function( $scope ) {

			var $iconnav        = $scope.find( 'div.bdt-icon-nav' ),
				$iconnavTooltip = $iconnav.find( '.bdt-icon-nav' );

			if ( ! $iconnav.length ) {
				return;
			}

			ElementPack.tippyTooltip($iconnavTooltip, $scope);
		},


		widgetHelpDesk: function( $scope ) {

			var $helpdesk = $scope.find( '.bdt-helpdesk' ),
				$helpdeskTooltip = $helpdesk.find('.bdt-helpdesk-icons');

			if ( ! $helpdesk.length ) {
				return;
			}

			ElementPack.tippyTooltip($helpdeskTooltip, $scope);
		},

		widgetModal: function( $scope ) {

			var $modal = $scope.find( '.bdt-modal' );
			
			if ( ! $modal.length ) {
				return;
			}


			$.each($modal, function(index, val) {
				
				var $this   	= $(this),
					$settings   = $this.data('settings'),
					modalShowed = false,
					modalID     = $settings['id'];
				
				if (!$settings['dev']) {
					modalShowed = localStorage.getItem( modalID );
				}
				
				if(!modalShowed){
					if ('exit' === $settings['layout']) {
						document.addEventListener("mouseleave", function(event){
							if(event.clientY <= 0 || event.clientX <= 0 || (event.clientX >= window.innerWidth || event.clientY >= window.innerHeight)) {
								bdtUIkit.modal($this).show();
							    localStorage.setItem( modalID , true );      
							}
							
						});
					} else if ('splash' === $settings['layout']) {
						setTimeout(function(){
						  bdtUIkit.modal($this).show();      
						  localStorage.setItem( modalID , true );      
						}, $settings['delayed'] );
					}	
				}
				
				if ( $(modalID).length ) {
					// global custom link for a tag
					$(modalID).on("click", function(event){
						event.preventDefault();       
						bdtUIkit.modal( $this ).show();
					});
				}

			});
		},

		widgetScrollNav: function( $scope ) {

			var $scrollnav = $scope.find( '.bdt-dotnav > li' );

			if ( ! $scrollnav.length ) {
				return;
			}

			ElementPack.tippyTooltip($scrollnav, $scope);
		},

		widgetPriceTable: function( $scope ) {

			var $priceTable = $scope.find( '.bdt-price-table' ),
				$featuresList = $priceTable.find( '.bdt-price-table-feature-inner' );

			if ( ! $priceTable.length ) {
				return;
			}

			ElementPack.tippyTooltip($featuresList, $scope);
		},

		tippyTooltip:function( $selector, $appendIn ) {
			var $tooltip = $selector.find('> .bdt-tippy-tooltip');
			
			$tooltip.each( function( index ) {
				tippy( this, {
					appendTo: $appendIn[0]
				});				
			});

		},

		// Circle Menu object
		widgetCircleMenu: function( $scope ) {
			var $circleMenu = $scope.find('.bdt-circle-menu'),
				$settings = $circleMenu.data('settings');

			if ( ! $circleMenu.length ) {
				return;
			}

            $($circleMenu[0]).circleMenu({
				direction           : $settings['direction'],
				item_diameter       : $settings['item_diameter'],
				circle_radius       : $settings['circle_radius'],
				speed               : $settings['speed'],
				delay               : $settings['delay'],
				step_out            : $settings['step_out'],
				step_in             : $settings['step_in'],
				trigger             : $settings['trigger'],
				transition_function : $settings['transition_function']
            });
		},

		// Contact Form object
		widgetSimpleContactForm: function( $scope ) {
			var $contactForm = $scope.find('.bdt-contact-form form');
			
			if ( ! $contactForm.length ) {
				return;
			}

			$contactForm.submit(function(){
				ElementPack.sendContactForm($contactForm);
				return false;
			});

        	return false;
            
		},

		// Contact Form object
		widgetCookieConsent: function( $scope ) {
			var $cookieConsent = $scope.find('.bdt-cookie-consent'),
				$settings      = $cookieConsent.data('settings'),
				editMode  = Boolean( yjzan.isEditMode() );;
			
			if ( ! $cookieConsent.length || editMode ) {
				return;
			}

			window.cookieconsent.initialise($settings);
            
		},

		elementPackGIC: function(token) {         		
			return new Promise(function(resolve, reject) {  
				if (grecaptcha === undefined) {
					bdtUIkit.notification({message: '<div bdt-spinner></div> Invisible captcha not defined!', timeout: false, status: 'warning'});
					reject();
				}

				var response = grecaptcha.getResponse();

				if (!response) {
					bdtUIkit.notification({message: '<div bdt-spinner></div> Could not get invisible captcha response!', timeout: false, status: 'warning'});
					reject();
				}

				var $contactForm=$('textarea.g-recaptcha-response').filter(function () {
					return $(this).val() === response;
					}).closest('form.bdt-contact-form-form');
				var contactFormAction = $contactForm.attr('action');
				if(contactFormAction && contactFormAction!=""){					
					ElementPack.sendContactForm($contactForm);
				} else {
					console.log($contactForm);
				}
				
				grecaptcha.reset();

			}); //end promise
		},

		sendContactForm: function($contactForm) {
			$.ajax({
				url:$contactForm.attr('action'),
				type:'POST',
				data:$contactForm.serialize(),
				beforeSend:function(){
					bdtUIkit.notification({message: '<div bdt-spinner></div> Sending message please wait...', timeout: false, status: 'primary'});
				},
				success:function(data){
					bdtUIkit.notification.closeAll();
					bdtUIkit.notification({message: data});
					$contactForm[0].reset();
				}
			});
			return false;
		},



		//Post Grid Tab object
		widgetPostGridTab: function( $scope ) {

			var $postGridTab = $scope.find( '.bdt-post-grid-tab' ),
			    gridTab      = $postGridTab.find('> .gridtab');

			if ( ! $postGridTab.length ) {
				return;
			}

			$(gridTab).gridtab($postGridTab.data('settings'));

			ElementPack.lazyLoader($postGridTab);

		},

		//Progress pie object
		widgetProgressPie: function( $scope ) {

			var $progressPie = $scope.find( '.bdt-progress-pie' );

			if ( ! $progressPie.length ) {
				return;
			}

			yjzanFrontend.waypoint( $progressPie, function() {
				var $this = $( this );
				
					$this.asPieProgress({
					  namespace: "pieProgress",
					  classes: {
					      svg     : "bdt-progress-pie-svg",
					      number  : "bdt-progress-pie-number",
					      content : "bdt-progress-pie-content"
					  }
					});
					
					$this.asPieProgress("start");

			}, {
				offset: 'bottom-in-view'
			} );

		},

		//Image Magnifier widget
		widgetImageMagnifier: function( $scope ) {

			var $imageMagnifier = $scope.find( '.bdt-image-magnifier' ),
				settings        = $imageMagnifier.data('settings'),
				magnifier       = $imageMagnifier.find('> .bdt-image-magnifier-image');

			if ( ! $imageMagnifier.length ) {
				return;
			}

			$(magnifier).ImageZoom(settings);

		},

		//Image Magnifier widget
		widgetImageMagnifierThumb: function( $scope ) {

			var $imageMagnifier     = $scope.find( '.bdt-image-magnifier > .bdt-image-magnifier-image' );

			if ( ! $imageMagnifier.length ) {
				return;
			}

			$($imageMagnifier).ImageZoom($imageMagnifier.data('settings'));

		},

		// Video Gallery
		widgetVideoGallery: function( $scope ) {

			var $video_gallery = $scope.find( '.rvs-container' );
				
			if ( ! $video_gallery.length ) {
				return;
			}

			$($video_gallery).rvslider();			
		},

		// Timeline
		widgetTimeline: function( $scope ) {

			var $timeline = $scope.find( '.bdt-timeline-skin-olivier' );
				
			if ( ! $timeline.length ) {
				return;
			}

			$($timeline).timeline({
				visibleItems : $timeline.data('visible_items'),
			});			
		},
		yjzanSection: function( $scope ) {
			var $target   = $scope,
				instance  = null,
				editMode  = Boolean( yjzan.isEditMode() );

			instance = new bdtWidgetTooltip( $target );
			instance.init();
		},
	};

	$( window ).on( 'yjzan/frontend/init', ElementPack.init );
	
	//Contact form recaptcha callback, if needed
	window.elementPackGICCB = ElementPack.elementPackGIC;

	window.bdtWidgetTooltip = function ( $selector ) {

		var self = this,
			$tooltip = $selector.find('.yjzan-widget.bdt-tippy-tooltip');


		self.init = function() {
			
			if ( ! $tooltip.length ) {
				return;
			}

			$tooltip.each( function( index ) {
				tippy( this, {
					appendTo: $tooltip[0]
				});				
			});

		};
		
	}

}( jQuery, window.yjzanFrontend ) );
