$(document).ready(function() {
	$('.ch_post_create').keyup(function(event) {
    if (event.keyCode == '13') {
       var val = $(this).val();

       var chat_item = $('<div />', {'class': 'chat_item'});
       var ch_name = $('<div />', {'class': 'ch_name', 'text': 'Сережа:'});
       var ch_post = $('<div />', {'class': 'ch_post', 'text': val});

       $('.chat_post_block').before(chat_item.append(ch_name, ch_post));
       $(this).val('');
    }
    return false;
	});
});