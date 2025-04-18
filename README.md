# ElevaTDDr

## 📝 Project Description

ElevaTDDr is an interactive elevator simulator designed to demonstrate and learn real-time event handling principles. The project is a web application that visually simulates elevator operation in a multi-story building.

### 🎯 Main Project Goals

- Learning TDD (Test-Driven Development) principles
- Visualization of elevator control algorithms

### 📚 Documentation

- [TDD Test Cases](README-TDD.md) - detailed description of test cases and development process

## User Stories
-   [ ] User can see a cross section diagram of a building with four floors,
an elevator shaft, the elevator, and an up button on the first floor, up and 
down buttons on the second and third floors, and a down button on the fourth
floor.
-   [ ] User can see the elevator control panel with a button for each of the
floors to the side of the diagram.
-   [ ] User can click the up and down button on any floor to call the 
elevator.
-   [ ] User can expect that clicking the up and down buttons on any floor
to request the elevator will be queued and serviced in the sequence they were
clicked.
-   [ ] User can see the elevator move up and down the shaft to the floor it
was called to.
-   [ ] User can click the elevator control panel to select the floor it
should travel to.
-   [ ] User can expect the elevator to pause for 5 seconds waiting for a
floor button on the control panel to be clicked. If a floor button isn't
clicked within that time the elevator will process the next call request.
-   [ ] User can expect the elevator to return to the first floor when there
are no requests to process.
-   [ ] User can see a warning sound if the number of elevator requests
exceeds the maximum number allowed. This limit is left to the developer.
-   [ ] User can hear a sound when the elevator arrives at a floor.
-   [ ] User can see an occupant randomly arrive at a floor to indicate when
the user should click the up or down elevator call button on that floor.
-   [ ] User can specify the time interval between new occupants arriving to
call an elevator.
