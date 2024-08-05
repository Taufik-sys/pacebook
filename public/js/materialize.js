$(function(){
    $('.eye-password').hide();
    $('.eye-confirm-password').hide();
 
    $('.eye-slash-password').click(function(){
     $(this).hide();
     $('.eye-password').show();
     $('#password').attr('type','text');
    })
    $('.eye-password').click(function(){
     $(this).hide();
     $('.eye-slash-password').show();
     $('#password').attr('type','password');
    })
 
    $('.eye-slash-confirm-password').click(function(){
     $(this).hide();
     $('.eye-confirm-password').show();
     $('#confirm_password').attr('type','text');
    })
    $('.eye-confirm-password').click(function(){
     $(this).hide();
     $('.eye-slash-confirm-password').show();
     $('#confirm_password').attr('type','password');
    })

   });

   $('.dropdown-trigger').dropdown({
    alignment:right
});
 
 
 
 
 