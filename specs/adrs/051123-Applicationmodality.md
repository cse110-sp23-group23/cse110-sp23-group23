# Use different modality based on user's internet connection

## Context and Problem Statement

Without internet connection will the Zoltar still be functional?

## Considered Options

* Alternate array-based database for answers.
* 2D less powerful fortune teller model.
* Loading screen to buffer when deciding users' interface.

## Decision Outcome

Chosen option: We will have 2 different answer selections from our fortune teller, one loaded from GPT API with sentiment 
analysis, and one local database that will be used if the API cannot load.
