import $  from 'cheerio';
import S  from 'string';

import getFormData from './form-data.js';

module.exports = function (input) {
	console.log('parsing search html');

	var formdata = getFormData(input);

	var page = $.load(input);

	var totalResults = page('.REPORT_TOTALCOUNT').text();
	var items = page('.REPORT_TABLE').children('tr');

	var nextPage = page('.PAGER_NONLINK').first().parent().next('td').text();

	var results = [];

	items.each(function(i, elem) {
		var output = {};

		var item = $(this);
		var table = item.children('td').children('table').last();

		var imageSrc = table.find('.LINK_MLN img').attr('src');

		var detailElement = table.children().children().eq(1);

		var specsElement = detailElement.children('table').first();
		var descElement = detailElement.children('table').last();

		var specs = {};
		var pendingKey;

		specsElement.find('td').each(function () {
			var spec = $(this);
			var text = spec.text();

			if (S(text).contains(':')) {
				pendingKey = S(text).strip(':', ',').s;
			}

			else if (pendingKey) {
				specs[pendingKey] = text;
			}
		});

		output.id = table.find('.LINK_MLN').text();
		output.desc = S(descElement.text()).strip('\n').s.trim();
		output.specs = specs;
		output.image = 'http://www.rmls.com' + imageSrc;

		if (output.id) results.push(output)
	});

	return {
		next: nextPage || '',
		houses: results,
		form: formdata
	};
};