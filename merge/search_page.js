function loadCollapseBehaviour() {
	var IDs = $("[id^='collapse_']").map(function() { return this.id; }).get();

	var s = "";
	var s2 = "";

	for(var i = 0 ; i < IDs.length ; i++){
	   s='#' + IDs[i];
	   
	   $(s).on("click",function() {
	        var s = $(this).attr('id');
	        var s2 = "";

	        for (var i = 0 ; i < IDs.length ; i++) {
	        	s2='#accordion_' + IDs[i];
	  			$(s2).collapse('hide');
	        }
	        s2 = '#accordion_' + s;
	        $(s2).collapse('show');
	   });
	}
}

function loadCancelFilterBehaviour() {
	var IDs = $("[id^='collapse_']").map(function() { return this.id; }).get();
	$(".cancel_filter").on("click",function() {
	        var s2 = "";
	        for (var i = 0 ; i < IDs.length ; i++) {
	        	s2='#accordion_' + IDs[i];
	  			$(s2).collapse('hide');
	        }
	});
}

function loadApplyFilterBehaviour() {
	$('.apply_filter').click(function(){
   		window.location.href='search_page_filter.html';
	})
}