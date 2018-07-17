$(document).ready(function () {
  
  $('select').on('change', function() {
    // clear old stories if changing twice
    $('.story-cell').remove();
    $('.story-text').remove();

    // change margins when something is selected
    $('header').css({"margin-top":"3.5em"});
    $('footer').css({"margin-top":"1em"});

    // store selection value
    var selection = $(this).val();
    var url = "https://api.nytimes.com/svc/topstories/v2/home.json";
    url += '?' + $.param({
      'api-key': "eb429d0d01c04f9a8c944a8366666c40"
    });

    $.ajax({
      url: url,
      method: 'GET',
    }).done(function(data) {
      $.each(data.results, function(key, value) {
        if (data.results[key].section === selection) {
          $('.stories').append('<div class="story-cell"><p class="story-text">' + data.results[key].abstract + '</p></div>');
          //$(.story-cell).css({"background-image":"url()"});
        }
//TODO: check functionality of each selection 
//TODO: add background images to div

      });
    }).fail(function(err) {
      throw err;
    });
  
  });

});