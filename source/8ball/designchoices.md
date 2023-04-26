# Design Decisions - 8 Ball

### Settings Menu
For ease of use, we made the settings menu openable by either ESC or the icon in the top left, and closable by ESC, the same icon, or the X on the top right of the popup. The settings menu houses everything that the user can change about their experience with the 8ball, including biases in the responses, text-to-speech and sound effects, and the timing of the shaking animation.

### Text to Speech
We chose to implement text-to-speech using Javascript. The user can pick what voice they want from a dropdown menu in the settings menu. We had issues with browser support and general issues with certain voices only working for some users, so the dropdown menu is initially empty and then populated on pageload with only verifiably available voices. The default voice is 'Bahh' where available, and TTS is enabled by default.

### Thunder Audio
There are four possible thunder sound effects. By default, they are disabled. They may be enabled by clicking the checkbox in settings.

### Lightning Bolts & Other Animations
A lightning .png is rotatated and flashed on the face of the 8ball to give it a mystical appearance. Half the lightning is on a 1 second interval, and the other half is on a 1.7 second interval. As 17 is prime, this lowers the chance of overlap and creates a steady but not repetitive flow of lightning. The ball shaking is animated for a length of time dependent on the settings (default 2s median with 600ms range).

### Response Generation
Input strings are deterministically hashed to determine whether the output should be negative or positive. If a bias is enabled in the settings, that overrides the hash. In effect, though, hashing enables the 8ball to appear more confident—it will never switch between positive and negative responses for the same prompt unless the bias is changed.

### Stylistic Choices
We chose to create an aura of mystery and mysticism around our 8ball. The background is cloudy, and lightning bolts shoot across the ball. The fonts are chosen to seem magical. Off-white colors were chosen to make the app seem less sterile.

### Mobile & Cross-Browser Support
The application was designed primarly for Chrome, but works well in _most_ other browers. Generally, other browsers seem to have fewer available TTS voices. Safari has issues with colors created through CSS filters not being the same as on Chrome. Mobile support is very browser dependant. Google browsers work best on mobile, as safari seems to measure screen size differently. Other than the background image, however, everything works correctly. 

### Stylistic Choices
We chose to adhere to AirBnB style guidelines (except using tabs) as enforced by ESLint. 

### Documentation
We documented our Javascript using JSDocs.
