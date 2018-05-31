$(document).ready(function(){



	// Меню

	$(".header-switcher").click(function(){

		$(this).toggleClass("active");

		$(".header-menu").slideToggle(200);

	});



	// Переход в топ-меню

	$("a.scrollto").click(function () {

	    var elementClick = $(this).attr("href")

	    var destination = $(elementClick).offset().top;

	    jQuery("html:not(:animated),body:not(:animated)").animate({scrollTop: destination}, 600);

	    return false;

	});



	// Табы

	$(".course-tabs-list .tab1").click(function(e) {

		$(".course-tabs .active").removeClass("active");

		$(".tab1").addClass("active");

	});

	$(".course-tabs-list .tab2").click(function(e) {

		$(".course-tabs .active").removeClass("active");

		$(".tab2").addClass("active");

	});



	// Активация прокрутки карты при клике

	$(".map-overlay").click(function(){

		$(this).hide();

	})

	

	// Выравнивание блоков по высоте, ориентируясь на самый высокий

	var maxHeight = Math.max.apply(

	   null, 

	   $.map($(".review-item__text"), function(e){

	      return $(e).outerHeight();

	   })

	);

	$(".review-item__text").height(maxHeight);



	// Маска на телефон

	if($(".phone").length){

		$(".phone").mask("8 (999) 999 99 99");

	}



	// Плейсхолдер для IE

	$('input, textarea').placeholder();



	// Модальное окно -

	$('.teacher-block__play').click( function(event){ 

		event.preventDefault(); 

		$('#overlay').fadeIn(200);

		$(this).next(".teacher-block-video").fadeIn(150);

	});

	$('#overlay').click( function(){ 

		$('.teacher-block-video').fadeOut(200);

		$('#overlay').fadeOut(300);

	});



	// Модальное окно - обратный звонок

	$('.callback__btn').click( function(event){ 

		event.preventDefault(); 

		$('#overlay').fadeIn(200);

		$(".modal-window").fadeIn(150);

	});

	$('.modal__close, #overlay').click( function(){ 

		$('.modal-window').fadeOut(200);

		$('#overlay').fadeOut(300);

	});

	

	$('.sform').submit(function(e) {

		e.preventDefault();

		var f = $(this);

		$('.ierror', f).removeClass('ierror');



		var name = $('input[name=name]', f).val();

		var phone = $('input[name=phone]', f).val();

		var utm_source = $('#utm_source').val();
		var analytics = $('input[name=analytics]').val();



		var error = false;

		if(name == '') {

			$('input[name=name]', f).addClass('ierror');

			error = true;

		}

		if(phone == '') {

			$('input[name=phone]', f).addClass('ierror');

			error = true;

		}

		if(error) {

			return false;

		}

		$('button[type=submit]', f).attr('disabled', true);

		$('button[type=submit]', f).text('Заявка отправляется');

		

		var query = 'act=sender';

			query += '&name=' + encodeURIComponent(name);

			query += '&phone=' + encodeURIComponent(phone);

			query += '&utm_source=' + encodeURIComponent(utm_source);



		$.ajax({

			type: "POST",

			data: query,

			url: "./sender.php",

			dataType: "json",

			success: function(data) {

				if(data.result == 'ok') {

					$('input[type=text]', f).val('');
					ga ('send', 'event', 'leads', 'send', analytics );

				
console.log(data);
	location.href = 'success.html';

				} else {

					alert('Ошибка! Повторите позже.');

				}

			}

		});

		return false;

	});

}) 
$('.sertificate-container').each(function() {
		$(this).magnificPopup({
	        delegate: 'a',
	        type: 'image',
	        removalDelay: 600,
	        mainClass: 'mfp-fade',
	        closeMarkup: '<div title="Закрыть (Esc)" class="mfp-close">&#215;</div>',
	        gallery: {
	        	enabled: true,
	        	arrowMarkup: '<div title="%title%" class="mfp-arrow mfp-arrow-%dir%"></div>',
	        }
	     });
	});

	$('.callback-popup, .callback-popup2, .callback-popup3, .callback-popup4').magnificPopup({
		type: 'inline',
		midClick: true,
		removalDelay: 600,
		mainClass: 'mfp-fade',
		closeMarkup: '<div title="Закрыть (Esc)" class="mfp-close">&#215;</div>',
	});