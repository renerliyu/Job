
var cookieList = function(cookieName) {
	var cookie = $.cookie(cookieName);
	var items = cookie ? cookie.split(/,/) : new Array();
	return {
		"add": function(val) {
			items.push(val);
			$.cookie(cookieName, items.join(','));
		},
		"items": function() {
			return items;
		}
	}
}