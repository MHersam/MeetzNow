# Meetznow.io - Poll-Service Documentation
## Classes
#### **Comment**: A class designed for the comments of a poll. A basic class consisting of attributes and a constructor.
#### **Participant**: A class designed for the participants of a poll. A basic class consisting of attributes and a constructor.
#### **Poll**: A class designed for the polls. A class consisting of attributes, a constructor and validation inside the constructor. The validation consists of the elimitaion of duplicate time slots and a check if the time slots correspond to the displayed dates.
#### **Timeslot**: A class designed for the time slots of a poll. A basic class consisting of attributes and a constructor.
#### **TimeslotFinder**: A class designed for the algorithm that calculates the time slots with the best attendance. Consists of multiple methods:
* timeslotSetup() - Sets up the time slots and converts them from an array to a matrix, also executes the other methods on the already set up time slots.
* cutSlotsForOneDay() - Creates a new time slot array for a given day that contains all of the time slots for that day, created from the intersections of the time slots of the poll's participants.
* findBestSlotsForOneDay() - Checks the the possible attendace of the users to the newly calculated time slots and saves them in a map.
* returnResult() - runs timeslotSetup() and returns the resulting map.

## Handlers
The documentation of the API and the Backend-communication packages contains the exact definition of the requests and the responses of the calls, so they will not be mentioned here. Only the functional apects of the handlers will be described.
#### **CreatePollHandler** - Creates an instance of a poll with the data in request. The poll is the validated in the constructor in the poll class and the it is sent to the database service to be saved.
#### **FindBestTimeslotsHandler** - Calculates the attendance of a poll.
#### **SavePollHandler** - Updates and changes an already created and saved poll.
#### **CreateCommentHandler** - Sends the comment to the database service to be created and saved.
#### **ParticipateInPollHandler** - Creates an instance of a participant, validates his time slots and eliminates duplicates, then sends the participant to the database service to be saved.
#### **UpdateCommentHandler** - Creates an instance of the comment that has to be updated and then sends the comment to the database service to be updated.
#### **UpdateParticipantHandler** - Validates the time slots of the user, eliminates the duplicates and sends the participant to the database service to be updated.