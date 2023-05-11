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
