# Use different modality based on user's internet connection

## Context and Problem Statement

Without internet connection will Zoltar still be functional?

## Considered Options

* Offline array of possible responses
* No API?

## Decision Outcome

Chosen option: We will have 2 different answer selections from our fortune teller, one loaded from GPT API with sentiment 
analysis, and one local database which will be used if the API cannot load.

### Pros
* Works with or without internet connectivity 
* Best of both worlds?
* No negative impact on user experience

### Cons
* Use of API at all opens up prompt injection—but as long as we block meaningful code injection it would be the same-ish as people using inspect element.

**EDIT (06/13/23)**: The functionality for the GPT interface exists in our code with a feature flag, but we have it disabled (i.e. flag set to FALSE) in our final production build as we found that the API (using GPT 3.5, as the previous builds are not effective enough) is currently too slow to meaningfully integrate into our app. However, as the functionality is still there, we can (or would be able to, if we hypothetically continued development on this project) be able to re-able the feature when/if the API gets faster. Because this ADR gave us the foresight to have the offline fallback no matter what, our code still works normally with the feature flag set to false (i.e. all responses are generated locally).
