$(document).ready(function() {
	$('.success').click(function() {

		var archtype = Raphael('lesson1', 200, 200);

		var text = archtype.text(60, 60, 'cool').attr({
				'fill':'black',
				'font-size':'12pt',
				'font-family': 'sans-serif'
		});
	});

	$('.fail').click(function() {

	});


$('.circle').each(function(index) {
		var archtype = Raphael(this, 200, 200);

		archtype.customAttributes.arc = function (xloc, yloc, value, total, R) {
				var alpha = 360 / total * value,
						a = (90 - alpha) * Math.PI / 180,
						x = xloc + R * Math.cos(a),
						y = yloc - R * Math.sin(a),
						path;
				if (total == value) {
						path = [
								["M", xloc, yloc - R],
								["A", R, R, 0, 1, 1, xloc - 0.01, yloc - R]
						];
				} else {
						path = [
								["M", xloc, yloc - R],
								["A", R, R, 0, +(alpha > 180), 1, x, y]
						];
				}
				return {
						path: path
				};
		};


		var success = +$(this).attr('l_success');
		var fail = success + +$(this).attr('l_fail');
		var text = $(this).attr('l_title');

		var arc_main = archtype.path().attr({
				"fill": "white",
				"stroke": "#c4c9c8",
				"stroke-width": 8,
				arc: [60, 60, 100, 100, 50]
		});

		var arc_fail = archtype.path().attr({
				"stroke-width": 8,
				"stroke": "#3699c9",
				arc: [60, 60, 0, 100, 50]
		});

		var arc_success = archtype.path().attr({
				"stroke-width": 8,
				"stroke": "#3699c9",
				arc: [60, 60, 0, 100, 50]
		});

		var text = archtype.text(60, 60, text).attr({
				'fill':'black',
				'font-size':'12pt',
				'font-family': 'sans-serif'
		});

		arc_fail.animate({
				arc: [60, 60, fail, 100, 50]
		}, 1000, "bounce");

		arc_success.animate({
				arc: [60, 60, success, 100, 50]
		}, 1200, "bounce");


		var hoverArc = function(event) {
				arc_success.attr({"stroke": event.data.color_success});
				arc_fail.attr({"stroke": event.data.color_fail});
		}

		$(arc_main[0]).on('mouseenter', {color_fail:'red', color_success:'green'}, hoverArc);
		$(arc_main[0]).on('mouseleave', {color_fail:'#3699c9', color_success:'#3699c9'}, hoverArc);

	});
});