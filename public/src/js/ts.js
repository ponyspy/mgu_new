$(document).ready(function() {
	var lng = 'ru';
	var ru_text = '<p>Новая дистанционная программа обучения русскому языку как иностранному для начинающих по курсу «Проще, легче, быстрее!» откроется в самое ближайшее время. Програма адресована иностранным учащимся самых разных возрастных и социальных категорий.</p>
	<p>Оставьте нам свой e-mail, и мы будем держать вас в курсе событий!</p>'

	var en_text = '<p>A new distance learning course of Russian as a foreign language for beginners "Simpler, easier, faster!" will start soon! The course is designed for learners of different ages and occupation.</p>
	<p>Leave your email address here, and we will inform you about the course of events!</p>'

	$('.toggle_lng').click(function(event) {
		$(this).data('clicked', !$(this).data('clicked'));

		if ($(this).data('clicked')) {
			$(this).text('ru');
			$('.text_block').empty().append(en_text);
			lng = 'en';
		}
		else {
			$(this).text('en');
			$('.text_block').empty().append(ru_text);
			lng = 'ru'
		}
	});


	var validate = {
		email: 	function (email) {
			var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
			return re.test(email);
		}
	}

	var formSubmit = function (event) {
		$(this).off();
		var email = $('.email_form').val();
		if (!validate.email(email)) {
			$('.email_form').addClass('invalid');
			$('.submit').on('click', formSubmit);
			return false;
		}

		$.post('/email_init', {lng: lng, email: email}).done(function(data) {
			// $('.submit').on('click', formSubmit);
			switch(data) {
				case 'used':
					var txt = lng == 'ru' ? 'Ваш email уже есть в базе.' : 'Your email address is already in the database.';
					$('.submit_block').empty().text(txt);
				break;
				case 'ok':
					var txt = lng == 'ru' ? 'Спасибо!' : 'Thank you!';
					$('.submit_block').empty().text(txt);
				break;
			}
		});
	}

	$('.submit').on('click', formSubmit);


});