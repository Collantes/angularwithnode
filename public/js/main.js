function logout(){
            
    window.location.href = '/logout';
}


$(function() {
    $( document ).ready(function() {
        setTimeout(function(){
           $("#message").fadeOut(); 
            
        },4000);
        
  $.validate({
    form : '#MaterialListAddForm',
    validateOnBlur : false, 
    errorMessagePosition : 'top',
    scrollToTopOnError : false,
    onError : function(){
      return false;  
    },
    onSuccess : function() {
        
        $('button[type="submit"]').prop('disabled',true);
       
    }  
     
 });
 
   $.validate({
    form : '#MaterialListEditForm',
    validateOnBlur : false, 
    errorMessagePosition : 'top',
    scrollToTopOnError : false,
    onError : function(){
      return false;  
    },
    onSuccess : function() {
        
        $('button[type="submit"]').prop('disabled',true);
       
    }  
     
 });
 
  $.validate({
    form : '#LaborPriceAddForm',
    validateOnBlur : false, 
    errorMessagePosition : 'top',
    scrollToTopOnError : false,
    onError : function(){
      return false;  
    },
    onSuccess : function() {
       $('button[type="submit"]').prop('disabled',true); 
       
    }  
     
 });
 
 $.validate({
    form : '#LaborPriceEditForm',
    validateOnBlur : false, 
    errorMessagePosition : 'top',
    scrollToTopOnError : false,
    onError : function(){
      return false;  
    },
    onSuccess : function() {
       
       $('button[type="submit"]').prop('disabled',true); 
       
    }  
     
 });
        
    });
    
    

//setTimeout('$("#someDivId").hide()',1500);


    //$('#side-menu').metisMenu();

});

//Loads the correct sidebar on window load,
//collapses the sidebar on window resize.
// Sets the min-height of #page-wrapper to window size
$(function() {
    $(window).bind("load resize", function() {
        topOffset = 150;
        width = (this.window.innerWidth > 0) ? this.window.innerWidth : this.screen.width;
        if (width < 768) {
            $('div.navbar-collapse').addClass('collapse')
            topOffset = 100; // 2-row-menu
        } else {
            $('div.navbar-collapse').removeClass('collapse')
        }

        height = (this.window.innerHeight > 0) ? this.window.innerHeight : this.screen.height;
        height = height - topOffset;
        if (height < 1) height = 1;
        if (height > topOffset) {
            $("#page-wrapper").css("min-height", (height) + "px");
        }
    })
})
