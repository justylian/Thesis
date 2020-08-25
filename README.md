# Ambient Travel Experience System for the Smart Home Bedroom | Thesis

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 8.2.0.


**Overview**
![alt text](guide/thesis-presentation.png)

![](guide/thesis1.mp4)
![](guide/thesis2.mp4)




## Development server


1) Exit Chrome & Run 'batch.command' file 
**or** 
2) Run (Mac) `'open -a Google\ Chrome --args --disable-web-security --user-data-dir  --allow-file-access-from-files'` or (Windows) `'chrome.exe --user-data-dir="C://Chrome dev session" --disable-web-security' `
and then
in "node" folder `node app.js`
`ng serve --host 0.0.0.0 --disableHostCheck`

Then navigate to `http://localhost:4200/` on desktop and 'YourIP:4200' on mobile.



## Configurable JSONs

    timeline.json -> Information about past & future destinations. City, Country, Date and your resources. Leave citiesFuture as it is, only citiesPast is editable.
    upcoming.json -> Information about future destination not submited by other device. Flights, dates, Accommodation, Notes etc.
    times.json:   -> Timings (Image Slideshow & InfoBubble timeouts)

## User Guide 
1) **LEAP MOTION**
Gestures:
1.1) **TAP ON SCREEN**: Tap on Z Axis towards negatives (back of the leap device) with 1 finger
1.2) **TAP ON LEAP**: Tap closely to the leap device with on finger.
1.3) **SWIPE LEFT/RIGHT**: Swipe hand with all fingers extended towards one direction




2) **MOUSE**
* States (Start-up Screen): 
```
Choose State         -> Tap on state
```
* Initial: 
```
Start Slideshow      -> Tap on future destination
Next on Slideshow    -> Tap on last past destination
Play/Pause Slideshow -> Tap on image
Play/Pause Music     -> Tap on player
Back                 -> Hover on middle-top of screen to reveal button
```
* Upcoming: 
```
Show Place                     -> Tap on Photo
Next Place (Photos on screen)  -> Tap on image
Next Place (Map on screen)     -> Tap on Header "Places"
Handle Map                     -> Scroll/Drag on map
Back                           -> Hover on middle-top of screen to reveal button
```
* Away: 
```
Back                 -> Hover on middle-top of screen to reveal button
```


## Files Guide

**Services**
```
- appstate       -> Defines routes ( Mobile & Default/Desktop)
- choice         -> Defines selected state (Initial, Upcoming & Away)
- countryinfo    -> Returns basic info for input country 
- dominantcolor  -> Returns background image's dominant color and defines suitable shadows
- images         -> Retrieval of images for the Points-of-interest collected (Pixabay)
- initial        -> Current city on slideshow focus
- leap           -> Manages hand gestures through Leap Motion
- places         -> Returns Wikipedia summary about selected place (Wikipedia)
- poi            -> Returns Points-of-interest for selected city (Geonames)
- socket         -> Connection with socket, delivering city and country selected
- upcoming       -> Communication between three basic APIs (Images, Points-of-interest & Places)
- weather        -> Weather history of future destination (Meteostat)

```
**Components**
* Initial
```
- images        -> Slideshow of images including the information on them.
- map           -> The map that appears on the destination changes and revolves, also includes pins with each location.
- infobubble    -> Bubble with information about the future destination
- music         -> Music player 
- timeline      -> Timeline of past and future destinations


```
* Upcoming
```
- infotable  -> All the information needed for the future trip
- mapbox     -> Map showing pinned locations and the selected city
- places     -> Places pinned on map slideshowed with images and information about each place

```
* Away
```
- mapaway     -> Revolving map showing person's location, distance and current weather
- imagesaway  -> Image sent from the traveller
- messages    -> Message sent from the traveller

```
**Routes**

* Mobile
``
Automated first screen for less than 1920px width.
``
* Desktop/Default
``
Automated first screen for more than 1920px width.
``

**Resources**
```
- images  -> Images used for past destinations and icons
- font    -> Font types
- js      -> External JavaScript libraries
- json    -> JSONs for main data
- music   -> Sounds of each city

```
**External Imported Libraries-APIs**
```
Geonames
Wikipedia
Pixabay
Mapbox
RESTcountries
Meteostat
```







## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
