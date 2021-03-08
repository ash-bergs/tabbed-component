# tabbed-component
Building a tabbed view component in Vanilla JS, and then moving on to doing it in a React way


I will begin this project by building a tabbed component, that can be clicked through like a brochure, in Vanilla JS and HTML. 

Functionality: 

- getDomFallback

- unique.js: Basically it's the cheap version of UUID. 

The unique.js file is responsible for generating a unique string that will be used to associate DOM elements with each other. This way, we don't have to worry that every tab component has a unique ID. This will fill the `id` property. 