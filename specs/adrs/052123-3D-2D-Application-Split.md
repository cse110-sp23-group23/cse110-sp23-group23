

# Splitting Core Application functionality into 3D and 2D versions

## Context and Problem Statement

If a user has issues loading the 3 dimensional version due to asset loading times, computer hardware requirements, etc, 
the 2D version would be a seperate version of the Zoltar application that is more lightweight and accessible. Additionally,
should any of our 3D version dependencies fail, this additionally would account for such downtime. The option for this version
would become available to users if the 3D version fails to load within a to-be-determined timeout period.


## Decision Drivers

* Potential issues with load time/ hardware requirements
* Failsafe for 3D version issues


### Consequences

* Good, because it will ensure redundancy in functionality, and more reliable uptime for our core fortune telling functions.
* Good, because it will result in better accessibility for a wider range of users
* Bad, because users could become confused as to the different versions. Depending on the redirect system, users may also 
link the 2D version to others, when the 3D version is intended to be tried first.


<!-- This is an optional element. Feel free to remove. -->
## Validation

Unit testing could include:

* Ensuring the 2D version isn't loaded before the 3D version
* Checking that a redirect/ option for the 2D version becomes available only upon a timeout.
* Ensuring that the 2D version is accessible once a redirect is available.
* Core functionality between the 2D and 3D version remains the same

<!-- This is an optional element. Feel free to remove. -->
## More Information

We will be running the development of both versions in parallel with a part of the team working on the 2D version and another part working on the 3D version. The assignees for each version have yet to be determined as of 5/21/2023.
