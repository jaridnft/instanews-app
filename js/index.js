$(document).ready(function () {
  
  $('select').on('change', function() {
    var selection = $(this).val();
    var url = "https://api.nytimes.com/svc/topstories/v2/home.json";
    url += '?' + $.param({
      'api-key': "eb429d0d01c04f9a8c944a8366666c40"
    });
    
    $.ajax({
      url: url,
      method: 'GET',
    }).done(function(data) {
      $.each(data, function(key, value) {

//insert code here

      });
    }).fail(function(err) {
      throw err;
    });
  
  });

});