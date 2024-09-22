# The React Quiz

## Description

A Simple Quiz app that provides a series of multi choice questions with a point scoring and timer mechanism.

> [!NOTE]
> Tutorial initiated project, sourced from The Ultimate React Course

## Tech Stack

- React
- Vite for development environment
- [JSON Server][1] for fake REST API

## What I learnt

- `useReducer` Hook and how to manage a more complex state beyond useState
- Different approach to dealing with "status" (loading, error, finish etc) because of the `Reducer` function
- Using `useEffect` hook to create a countdown timer based on the amount of questions in the quiz

## Todo list

- [ ] Collect all answers in an array so a user can review their answers or navigate back to them
- [ ] Send the high score to the fake data API (JSON server) so a user can retrieve the high score every time they init the app

[1]: https://www.npmjs.com/package/json-server/v/0.17.4
