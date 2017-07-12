// fotostrana console

$( document ).ready(function() {
	console.log( "ready!" );
	//pageInit();
	$('#search-btn').click(function(e){
		e.preventDefault();
		// console.log( $('#param').val());
		// console.log( $('#method').val());
		// console.log( $('#search-image').val());
		var method = $('#method').val(), 
		param = $('#param').val();
		callApi(method, param);
	});
});
 // здесь необходимо прописать настройки вашего приложения
 var APP_ID = "1573562";
 var APP_CLIENT_KEY = "283b8166bdcbc65939cfacb29f7977aa";

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