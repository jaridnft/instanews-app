$(document).ready(function() {
  // hide loader to start
  $(".loader").hide();
  // execute the following code when select menu is changed
  $("select").on("change", function() {
    // clear old stories
    $(".story-cell").remove();
    $(".story-text").remove();
    // store selected value
    let selectedStory = $(this).val();
    // restore margins and don't do ajax request if default selected
    if (selectedStory === "default") {
      $("header").removeClass("toggle");
    } else {
      $("header").addClass("toggle");
      let url = `https://api.nytimes.com/svc/topstories/v2/${selectedStory}.json`;
      url += `?${$.param({ "api-key": "eb429d0d01c04f9a8c944a8366666c40" })}`;
      // get NYT data
      $.ajax({
        url: url,
        method: "GET",
        // show loading gif only while ajax request is in process
        beforeSend: function() {
          $(".loader").show();
        },
        complete: function() {
          $(".loader").hide();
        }
      })
        .done(data => {
          // iterate over each 'results' object
          let count = 0;
          $.each(data.results, (key, value) => {
            // check to see if the story has an image
            if (typeof data.results[key].multimedia[4] !== "undefined") {
              // only print the first 12 stories with pictures
              count += 1;
              if (count < 13) {
                $(".stories").append(
                  `<a href="${
                    data.results[key].url
                  }" target="_blank" class="story-cell"><p class='story-text'>${
                    data.results[key].abstract
                  }</p></a>`
                );
                // set the background image of the new story
                $(".stories")
                  .children(":last-child")
                  .css(
                    "background-image",
                    `url("${data.results[key].multimedia[4].url}")`
                  );
              }
            }
          });
          // display abstract when you hover
          $(".story-text").hide();
          $(".story-cell").hover(
            function() {
              $(this)
                .children()
                .slideToggle();
            },
            function() {
              $(this)
                .children()
                .slideToggle();
            }
          );
        })
        .fail(() => alert("Something went wrong, please refresh."));
    }
  });
});
