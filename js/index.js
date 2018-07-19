// function to open a url in new tab
function openInNewTab(url) {
  var win = window.open(url, '_blank');
  win.focus();
}

// main
$(document).ready(function () {
  $('select').on('change', function() {
    // clear old stories 
    $('.story-cell').remove();
    $('.story-text').remove();
// store selected value
    var selectedStory = $(this).val();
// restore margins if default selected
    if ( selectedStory === 'default') {
        if (window.matchMedia("(max-width: 480px)").matches === true) {
          $('header').css({"height": "85vh"});
          $('.nyt-logo').css({"width":"70%"});
          $('.nyt-logo').css({"max-width":"14em"});
        } else if (window.matchMedia("(min-width: 480px)").matches === true) {
          $('.nyt-logo').css({"width":"220px"});
          $('.nyt-logo').css({"height":"220px"});
          $('.nyt-logo').css({"max-width":"220px"});
          $('header').css({"height": "85vh"}); 
        } else if (window.matchMedia("(min-width: 600px)").matches === true) {
// TODO: tablet conditions
        } else if (window.matchMedia("(min-width: 1000px)").matches === true) {
// TODO: desktop conditions
        } else {
          console.log('Something went wrong.');
        }
    } 
    else {
// if we didn't select default, we'll continue to 
// check media queries to change display of certain views,
// then fetch data
      if (window.matchMedia("(max-width: 480px)").matches === true) {
        $('header').css({"height":"40vh"});
        $('.nyt-logo').css({"width": "40%"});
        $('.nyt-logo').css({"max-width": "10em"});
      } else if (window.matchMedia("(min-width: 480px)").matches === true) {
        $('.nyt-logo').css({"height": "6em"});
        $('.nyt-logo').css({"width": "6em"});
        $('.nyt-logo').css({"max-width": "150px"});
        $('header').css({"height": "25vh"});  
      } else if (window.matchMedia("(max-width: 600px)").matches === true) {
// TODO: tablet conditions
      } else if (window.matchMedia("(min-width: 1000px)").matches === true) {
// TODO: desktop conditions
      } else {
        console.log('Something went wrong.');
      }
// get correct API url for the selected story type
      var url = "https://api.nytimes.com/svc/topstories/v2/" + selectedStory + ".json";
      url += '?' + $.param({
        'api-key': "eb429d0d01c04f9a8c944a8366666c40"
      });
// get NYT data
      $.ajax({
        url: url,
        method: 'GET',
      }).done(function(data) {
// iterate over each 'results' object
        var count = 0;
        $.each(data.results, function(key, value) {
          var storyUrl = data.results[key].url;
  // check to see if the story has an image
          if (typeof data.results[key].multimedia[4] !== 'undefined') {
  // only print the first 12 stories with pictures
            count += 1;
            if (count < 13) {
              $('.stories')
              .append('<div class="story-cell" onclick="openInNewTab(\''
              + storyUrl 
              + '\');" style="cursor: pointer;"><p class="story-text">' 
              + data.results[key].abstract 
              + '</p></div>');
  // set the background image of the new story
              var imageUrl = data.results[key].multimedia[4].url;
              $(".stories").children(":last-child").css('background-image', 'url(' + imageUrl + ')');
            }
          } 
        });
      }).fail(function() {
      alert('Something went wrong');
      });
    }  
  });
});