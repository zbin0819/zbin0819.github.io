
function setCookie(name, value, expires, path) {
	var oDate = new Date();
	oDate.setDate(oDate.getDate() + expires);
	document.cookie = name + '=' + encodeURIComponent(value) + ';expires=' + oDate + ';path=' + path;
}
function getCookie(name) {
	var aCookie = document.cookie.split('; ');
	for(var i =0; i < aCookie.length; i++) {
		var aTemp = aCookie[i].split('=');
		if(aTemp[0] === name) {
			return decodeURIComponent(aTemp[1]);
		}
	}
}
function removeCookie(name, path) {
	document.cookie = name + '=;expires=-1;path=' + path;
}