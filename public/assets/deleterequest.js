$(document).ready(function(){
  $(".test").on('click', function(){
    var item = $(this).data('value');
      $.ajax({
        type: 'DELETE',
        url: '/deleteexpense/' + item,
        success: function(data){
          window.location.href = "/getexpenses";
        }
      });
  });
});