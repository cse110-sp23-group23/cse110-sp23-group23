# Sprint 1 Retrospective - v0.1.0

# 2D

<img width="447" alt="demo " src="https://github.com/cse110-sp23-group23/cse110-sp23-group23/assets/120541745/e817c797-f1f8-4e7b-b9a2-87f041b1c239">

## Issues Resolved

### Adding Audio Elements 
#### How / What?: We added an eerie background noise, along with lightning sound effects on occasion.
#### Why?: The background noises are meant to add to the character of the Zoltar machine as slightly ominous. Additionally, the lightning sounds make the machine a bit more foreboding, and make it seem like it is truly working and _generating_ a fortune.

### Zoltar machine screen image
#### How / What?: Added image for Machine screen image: Found image of Zoltar machine, placed into 2D main html, referenced in 2D main js.
#### Why? : The app needs a frontend in order to generate the tickets, and make it seem as if Zoltar/ the Zoltar machine is doing so. Having an image of the machine in the 2D version adds user immersion, as if they are actually using a machine.

### Ticket Display
#### How / What?: Added ticket display functionality as a pop-up screen to show the fortune (linked to ticket generation functionality)
#### Why?: Adds a level of interaction to Zoltar. Benefits the UX by making the user feel as if the Zoltar machine is generating a ticket live and showing as a popup.

### Ticket generation functionality
#### How / What?: Generating the ticket with random fortune text; the fortune text is stored in a JSON file. Using a random index to get the fortune text from the JSON file.
#### Why?: It provides a service to the front-end, to generate what should be displayed on the ticket. 

### Loading screen time expiration from 3D 
#### How / What?: If it takes more than 20 seconds to load dependencies on the loading page, then the user is given a direct link to the 2D version of Zoltar.
#### Why?: This feature was implemented to account for long asset loading times (like with Three.js) on slower hardware and for any dependency failures on the 3D version. 

## Looking Ahead: 
We would like to implement an image bank for the tickets, in which each ticket has its own unique image on the back. After discussing, it is also a possibility that we may implement user input and have a similar response functionality to our [Magic 8 Ball](https://cse110-sp23-group23.github.io/cse110-sp23-group23/source/8ball/). We will also make it our mission to add succinct comments similar to our 3d scripts. 

# 3D

<img width="663" alt="3dDemo" src="https://github.com/cse110-sp23-group23/cse110-sp23-group23/assets/120541745/b7a7e97c-6bcc-494d-9bb4-68c271d09830">

## Issues Resolved

### Resizing issues
#### How / What?: Resizing window would cause incorrect behavior such as black bars appearing on the borders of screen and click listeners being offset. 
#### Why?: If the user were to resize their window, this would cause the website to malfunction. This is a crucial issue to fix because it would cause the user to have a bad experience. 

### Make card slide out 
#### How / What?: While generating a ticket, the ticket slides out from the dispenser instead of appearing.
#### Why?: It makes the simulating process more real and smooth to add a animation for the ticket sliding out, so that the user could have a more immersive and concrete experience.

### Loading screen time expiration -> 2D
#### How / What?: While Zoltar is loading, if the assets are not able to load after a certain amount of time, an option pops up to switch to a 2D version of Zoltar. This is done buy using an initialization function with a timer where if the timer runs out, the option is taken out of its hidden state.
#### Why?: This allows people with a poor internet connection and/or a slower device to access the site in a usable state for them.

### Audiofade not consistent
#### How / What?: After pressing any key on the Zoltar splash screen, the audio somestimes fades in but sometimes does not.
#### Why?: When the audio didn't fade in, it would play a full volume instantly which could be disturb the user experience. 

### Firefox with JSON import
#### How / What?: Could not successfully load assets in Firefox browser, problem with compatability with JSON import. 
#### Why?: The website would not load in firefox. Solving this issue makes the UX for firefox users, otherwise they probably just would you use another fortune telling website. 

## Looking Ahead: 
We are looking to implement more functionality with the saved ticket list. Namely, we want to implement flipping tickets over (to see the back image), discarding individual tickets from the list, and clearing all tickets from the list. We are also in the process of implementing GPT API to generated unique responses from user input for a better UX involving sentiment analysis and basic LLM capabilities. Our control flow currently is: paper spit out of the machine, user inputs and puts it back in, call to GPT, Zoltar outputs response. We also plan to implement the same image bank for the front and back of the ticket mentioned above in the 2D section. Furthermore, we hope to voice lines, other sound effects, and more animations.
