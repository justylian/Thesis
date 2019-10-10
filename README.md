# Thesis 

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 8.2.0.

## Summary
**Description**
Ambient Trip Planner for the Ambient Intelligence (AmI) Home Bedroom.


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

Run 'batch.command' file 
**or** 
'socket-server/node index.js' then 'thesis-app/ng serve --host 0.0.0.0 -o' and finally (Mac) 'open -a Google\ Chrome --args --disable-web-security --user-data-dir' or (Windows) 'chrome.exe --user-data-dir="C://Chrome dev session" --disable-web-security' . Then naviugate to `http://localhost:4200/` on desktop and 'YourIP:4200' on mobile.

## Configurable JSONs

    timeline.json: Information about past destinations. City, Country, Date and your resources
    upcoming.json: Information about future destination. Flights, dates etc.
    times.json: Timings(Image Slideshow & InfoBubble)

## User Guide 
1) LEAP
-TAP ON LEAP
-TAP IN SCREEN
-SLIDE
2) MOUSE


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
Initial
```
- images        -> Slideshow of images including the information on them.
- map           -> The map that appears on the destination changes and revolves, also includes pins with each location.
- infobubble    -> Bubble with information about the future destination
- music         -> Music player 
- timeline      -> Timeline of past and future destinations


```
Upcoming
```
- infotable  -> All the information needed for the future trip
- mapbox     -> Map showing pinned locations and the selected city
- places     -> Places pinned on map slideshowed with images and information about each place

```
Away
```
- mapaway     -> Revolving map showing person's location, distance and current weather
- imagesaway  -> Image sent from the traveller
- messages    -> Message sent from the traveller

```
**Routes**

Mobile
**Environments**
```


```
**Resources**
```
- images
- font
- js
- json
- music

```
**External Imported Libraries-APIs**
```


```






<!--![alt text](guide/states.png)
![alt text](guide/initial.png)
![alt text](guide/upcoming.png)
![alt text](guide/away.png)-->

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
