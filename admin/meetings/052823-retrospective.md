# Sprint 1 Retrospective - v0.1.0

# 2D

<img width="447" alt="demo " src="https://github.com/cse110-sp23-group23/cse110-sp23-group23/assets/120541745/e817c797-f1f8-4e7b-b9a2-87f041b1c239">


## Issues Resolved

### Adding Audio Elements 
#### How / What?: We added an eerie background noise, along with lightning sound effects on occasion.
#### Why?: The background noises are meant to add to the character of the Zoltar machine as slightly ominous. Additionally, the lightning sounds make the machine a bit more foreboding, and make it seem like it is truly working and _generating_ a fortune.

### Zoltar machine screen image
#### How / What? : Added image for Machine screen image: Found image of Zoltar machine, placed into 2D main html, referenced in 2D main js.
#### Why? : The app needs a frontend in order to generate the tickets, and make it seem as if Zoltar/ the Zoltar machine is doing so. Having an image of the machine in the 2D version adds user immersion, as if they are actually using a machine.

### Ticket Display (NEEL)
#### How / What? :
#### Why?:

### Ticket generation functionality (XIOANAN)
#### How / What?:
#### Why?:

### Loading screen time expiration from 3D 
#### How / What?: If it takes more than 20 seconds to load dependencies on the loading page, then the user is given a direct link to the 2D version of Zoltar.
#### Why?: This feature was implemented to account for long asset loading times (like with Three.js) on slower hardware and for any dependency failures on the 3D version. 

## Looking Ahead: 
We would like to implement an image bank for the tickets, in which each ticket has its own unique image on the back. After discussing, it is also a possibility that we may implement user input and have a similar response functionality to our [Magic 8 Ball](https://cse110-sp23-group23.github.io/cse110-sp23-group23/source/8ball/). We will also make it our mission to add succinct comments similar to our 3d scripts. 

# 3D

<img width="663" alt="3dDemo" src="https://github.com/cse110-sp23-group23/cse110-sp23-group23/assets/120541745/b7a7e97c-6bcc-494d-9bb4-68c271d09830">

## Issues Resolved

### Resizing issues (ERIC)
#### How / What?:
#### Why?:

### Make card slide out 
#### How / What?: While generating a ticket, the ticket slides out from the dispenser instead of appearing.
#### Why?: It makes the simulating process more real and smooth to add a animation for the ticket sliding out, so that the user could have a more immersive and concrete experience.

### Loading screen time expiration -> 2D (CHRIS)
#### How / What?:
#### Why?:

### Audiofade not consistent
#### How / What?: After pressing any key on the Zoltar splash screen, the audio somestimes fades in but sometimes does not.
#### Why?: When the audio didn't fade in, it would play a full volume instantly which could be disturb the user experience. 

### Firefox with JSON import (LUKE) 
#### How/What?: Could not successfully load assets in Firefox browser, problem with compatability with JSON import. 
#### Why?: The website would not load in firefox. Solving this issue makes the UX for firefox users, otherwise they probably just would you use another fortune telling website. 

## Looking Ahead: 
We are looking to implement flipping collected tickets, discarding individual tickets, and clearing all of the collected tickets. We also plan on implementing GPT AI and a user input system for a better UX involving sentiment analysis and basic LLM capabilities... We have not ironed out the details, the general control flow is:
- paper spit out of the machine, user inputs and puts it back in -> GPT -> Zoltar outputs
