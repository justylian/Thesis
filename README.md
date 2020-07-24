# Ambient Travel Experience System for the Smart Home Bedroom | Thesis

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 8.2.0.

## Summary
Design and development of a multimodal system which creates an interactive experience for the imminent and past travels of the user using ambient technologies. The project is divided in three states.
1. Recollection of memories from past excursions through the projection of personal media (Photographs, Notes & Music).
2. Assistance for the trip planning procedure with recommendations and tips.
3. Creation of a communication channel connecting the absent users with people staying at the Smart Home.
The project was completed for the Ambient Intelligence Programme (AmI) in the HCI Laboratory of the Institute of Computer Science in the Foundation for Research and Technology - Hellas (ICS, FORTH).

Multimodality:
-Large-scale projector on the bedroom's wall
-Leap Motion sensor
-Mobile screen for the typing needs of the user
-Smart lighting
-Sound system

Technologies used:
Angular 8, Typescript, Javascript, SCSS, HTML5, Node.js Adobe Illustrator, Adobe XD.

**Screens**

![](guide/THESISREC.gif)


![alt text](guide/Screenshot14.png)

![alt text](guide/Screenshot1.png)

![alt text](guide/Screenshot2.png)

![alt text](guide/Screenshot3.png)

![alt text](guide/Screenshot4.png)

![alt text](guide/Screenshot5.png)

![alt text](guide/Screenshot6.png)

![alt text](guide/Screenshot7.png)

![alt text](guide/Screenshot8.png)

![alt text](guide/Screenshot9.png)

![alt text](guide/Screenshot10.png)

![alt text](guide/Screenshot11.png)

![alt text](guide/Screenshot12.png)

![alt text](guide/Screenshot13.png)

![alt text](guide/Screenshot15.png)

![alt text](guide/Screenshot16.png)

![alt text](guide/Screenshot17.png)

![alt text](guide/Screenshot18.png)

![alt text](guide/Screenshot19.png)

![alt text](guide/Screenshot20.png)

![alt text](guide/Screenshot21.png)




**States**
1) Initial
```
State set at least a week before the scheduled trip. Includes slideshow of past trips, if there are any, and future destination selected.
```
2) Upcoming
```
State set a week or less from scheduled trip. Includes all the information needed, notes and recommended places that the user may be interested in.
```

3) Away

```
State as the user is still away on the trip. Includes messages sent from the one away, a photo and information about their location.
```
## Development server


1) Exit Chrome & Run 'batch.command' file 
**or** 
2) Run (Mac) `'open -a Google\ Chrome --args --disable-web-security --user-data-dir'` or (Windows) `'chrome.exe --user-data-dir="C://Chrome dev session" --disable-web-security' `
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

![alt text](guide/states.png)
![alt text](guide/initial.png)
![alt text](guide/upcoming.png)
![alt text](guide/away.png)


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
