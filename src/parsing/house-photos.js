import $  from 'cheerio';

module.exports = function (input) {
	console.log('parsing house photos html');

	var photos = [];
	var page = $.load(input);

	var elements = page('input[name="ListImage"]');

	elements.each(function(i, elem) {
		var item = $(this);
		photos.push(item.attr('value'));
	});
	
	return photos;
};