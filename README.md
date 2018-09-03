# Instanews 'Top Stories' NYT App

#### Author: Jarid Warren [ <jaridwarren@gmail.com> ]

'Top Stories' application leveraging the [New York Times API](https://developer.nytimes.com/top_stories_v2.json) to dynamically generate the day's top news. Fully responsive design that reconfigures when a story-type is selected.

### Desktop & Mobile View Demo

<img src="./assets/images/readme-images/demo.gif" width="564.5"><img src="./assets/images/readme-images/mobile-demo.gif" width="289.25">

## Motivation

This project was used to practice ES6 and jQuery's `ajax()` to fetch JSON data and format it according to the design of the webpage. As the design is being dynamically altered, Instanews was a good opportunity to practice CSS transitions as well.

## Technology

- <img src="./assets/images/readme-images/js.svg" width="15"> JavaScript ES6 / <img src="./assets/images/readme-images/jquery.svg" width="40"> jQuery
- <img src="./assets/images/readme-images/npm.svg" width="20"> NPM / <img src="./assets/images/readme-images/gulp.svg" width="10"> Gulp
- <img src="./assets/images/readme-images/sass.svg" width="20"> Sass / <img src="./assets/images/readme-images/css3.svg" width="12"> CSS3
- <img src="./assets/images/readme-images/html5.svg" width="12"> HTML5

## Code Sample

The following is how stories are dynamically appended to the DOM after fetching JSON data from the NYT.

```javascript
$('.stories').append(
  `<a href="${data.results[key].url}" target="_blank" class="story-cell">
    <p class='story-text'>${data.results[key].abstract}</p></a>`
);
// set the background image of the new story
$('.stories')
  .children(':last-child')
  .css('background-image', `url("${data.results[key].multimedia[4].url}")`);
```

## Setup

Download or clone repo, then run the following commands in terminal:

**Initialize NPM:**

`> npm init`

**Install Gulp:**

`> npm install`

**Convert Sass files to CSS:**

`> gulp sass`

**Call Babel & Uglify on JS files:**

`> gulp scripts`

**Launch Browser-Sync to automatically update changes:**

`> gulp browser-sync`

**Watch changes to Sass/JS and automatically run scripts/sass:**

`> gulp watch` or `gulp`

## @TODO

- change layout to CSS grid from flexbox
