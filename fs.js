// fotostrana console

$( document ).ready(function() {
	console.log( "ready!" );
	//pageInit();
	$('#search-btn').click(function(e){
		e.preventDefault();
		
		var method = $('#method').val(), 
		param = $('#param').val();
		//console.log(eval(method));
		sh(method);
	});
});
 // здесь необходимо прописать настройки вашего приложения

 var APP_CLIENT_KEY = "283b8166bdcbc65939cfacb29f7977aa";
 var APP_ID = 'imglookup';
 var USER_ID = "50474019";

 var out = $("#output");
 var errorCallBack = function() { console.log("API Error!"); };
 var dumpData = function(ds){
 	$(err).append(ds.error);
 	$(out).append(ds.response);
 };
 $.urlParam = function(name){
 	var results = new RegExp('[\\?&]' + name + '=([^&#]*)').exec(window.location.href);
 	return results[1] || 0;
 }

 function sh(params){
 	var reader = new fsapi(APP_CLIENT_KEY, APP_ID, USER_ID);
  
  // var params = {
  //   method: 'User.getFriendsAny',
  //   userId: USER_ID,
  //   rand: 2,
  //   timestamp: 1
  // };
  
  var rr = reader.url( params );
 }

 // берем URL библиотеки работы с API из GET параметров
 // var fsapi_url = $.urlParam('fsapi');

 function callApi(method, param ) {
 	var fsapi_url = $.urlParam('fsapi');
 	$.getScript(fsapi_url, function(){
   // после успешного выполнения библиотеки инициализируем API и выполняем запрос
   var client = new fsapi(APP_ID, APP_CLIENT_KEY);
   client.init(errorCallBack);
   client.api(method, param, dumpData);  }); 	
 	
 }


 function fsapi(key, appId, userId){
	if (!key || !appId || !userId)
		throw new Error('key, appId, userId must be defined');
	this._key = key;
	this._appId = appId;
	this._userId = userId;	
}

Object.defineProperty(fsapi.prototype, 'key', {
	enumerable: true,
	get: function () { return (this._key); }
});
Object.defineProperty(fsapi.prototype, 'appId', {
	enumerable: true,
	get: function () { return (this._appId); }
});
Object.defineProperty(fsapi.prototype, 'userId', {
	enumerable: true,
	get: function () { return (this._userId); }
});

/**
 * Generate user request to API
 *
 * @param {Array} Request array.
 * @return {String} return complite url.
 */
 fsapi.prototype.url = function(params) {

	// определяем дефолтные параметры	 
	if(!params.appId) params.appId = this._appId;	 
	if(!params.timestamp) params.timestamp =  Date.now();
	if(!params.format) params.format = 1;
	if(!params.rand) params.rand = Math.random();	 

    var p_string = this._userId; // идентификатор пользователя    
	
	// отсортируем массив по алфавитному порядку ключей
	var sa = Object.keys(params).sort();
	
	for (var key in sa) {
		var kv = sa[key];		
		p_string += kv + '=' + params[kv];	  
	}

	p_string += this._key;
    // генерируем md5-хэш
    var sig = md5(p_string);
    console.log(p_string);
    // reference
    // 105appId=TestExternalformat=1method=User.getFriendsAnyrand=2timestamp=1userId=105SECRETKEY
    // 105appId=TestExternalformat=1method=User.getFriendsAnyrand=2timestamp=1userId=105SECRETKEY
    // начинаем составлять URL запроса
    var result = 'http://fotostrana.ru/apifs.php?sig=' + sig;

    for (key in sa) {
		var kv = sa[key];		
		result += '&' + kv + '=' + params[kv];	  
	}

    // возвращаем полный путь запроса к API (включая сигнатуру)
    return result;     
 };