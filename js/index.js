// function to open in new tab
function openInNewTab(url) {
  var win = window.open(url, '_blank');
  win.focus();
}

// main
$(document).ready(function () {
  $('select').on('change', function() {
// check media query to change display of certain views
    if (window.matchMedia("(min-width: 480px)").matches === true) {
      $('.nyt-logo').css({"height": "6em"});
      $('.nyt-logo').css({"width": "6em"});
      $('.nyt-logo').css({"margin": "0"});
      $('header').css({"height": "12em"}); 
      $('header').css({"margin-top": "0"}); 
      $('header').css({"margin-bottom": "0"}); 
      $('header').css({"justify-content": "center"}); 
      $('.select-container').css({"margin-top": "0"}); 
    } else if (window.matchMedia("(min-width: 1000px)").matches === true) {
// TODO: desktop conditions
    } else if (window.matchMedia("(max-width: 480px)").matches === true) {
// change margins when something is selected
      $('header').css({"margin-top":"2em"});
      $('footer').css({"margin-top":"2em"});
      $('.nyt-logo').css({"width": "40%"});
      $('.nyt-logo').css({"max-width": "10em"});
    } else {
      console.log('Something went wrong.');
    }
// clear old stories if changing twice
    $('.story-cell').remove();
    $('.story-text').remove();
// store selection value
    var selection = $(this).val();
    var url = "https://api.nytimes.com/svc/topstories/v2/home.json";
    url += '?' + $.param({
      'api-key': "eb429d0d01c04f9a8c944a8366666c40"
    });
// get NYT data
    $.ajax({
      url: url,
      method: 'GET',
    }).done(function(data) {
// iterate over each 'results' object
      $.each(data.results, function(key, value) {
// compare the story's section, with what was selected in the dropdown
        if (data.results[key].section === selection) {
          var storyUrl = data.results[key].url;
// append div for each relevant story
          $('.stories').append('<div class="story-cell" onclick="openInNewTab(\'' + storyUrl + '\');" style="cursor: pointer;"><p class="story-text">' + data.results[key].abstract + '</p></div>');
// if there is a photo, set the background image of the div
          if (typeof data.results[key].multimedia[4] !== 'undefined') {
            var imageUrl = data.results[key].multimedia[4].url;
            $(".stories").children(":last-child").css('background-image', 'url(' + imageUrl + ')');
// if there isn't a photo, remove the div
          } else {
            $(".stories").children(":last-child").remove();
          }
        }
      });
// restore margins if default selected
      if ( selection === 'default') {
          if (window.matchMedia("(min-width: 480px)").matches === true) {
            $('.nyt-logo').css({"height": "auto"});
            $('.nyt-logo').css({"width": "22em"});
            $('.nyt-logo').css({"margin-left": "12em"});
            $('header').css({"height": "auto"}); 
            $('header').css({"margin-top": "15em"}); 
            $('header').css({"justify-content": "flex-start"});
            $('.select-container').css({"margin-bottom": "2.5em"}); 
          } else if (window.matchMedia("(min-width: 1000px)").matches === true) {
// TODO: desktop conditions
          } else if (window.matchMedia("(max-width: 480px)").matches === true) {
            $('header').css({"margin-top":"15em"});
            $('footer').css({"margin-top":"10em"});
            $('.nyt-logo').css({"width":"70%"});
            $('.nyt-logo').css({"max-width":"14em"});
          } else {
            console.log('Something went wrong.');
          }
      } 
    }).fail(function() {
      alert('Something went wrong');
    });
  });
});