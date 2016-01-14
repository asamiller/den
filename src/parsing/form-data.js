import $ from 'cheerio';

module.exports = function (input) {
	var page = $.load(input);
	var formFields = page('input[type="hidden"]');

	var data = {};
	
	formFields.each(function(i, elem) {
		data[$(this).attr('name')] = $(this).attr('value');
	});

	return data;
};