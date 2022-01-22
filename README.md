# Questions Answers API Endpoint

# Questions

## GET

`/qa/questions/:product_id`

Parameters

- `product_id` will tell the db which questions you want
- `page` parameter that will tell it how many pages to return
- `count` parameter that will tell it how many questions per page

## POST

`/qa/questions`

Takes a `JSON` object containing the following:

- `name` of at least 3 characters and a maximum of 60
- `email` of at least 3 characters and a maximum of 60
- `body` of at least 3 characters and a maximum of 1000

## PUT

`/qa/questions/:question_id/helpful`

Takes a `question_id` and updates that question by incrementing it helpfulness by 1

## PUT

`/qa/questions/:question_id/report`

Takes a `question_id` and updates that question by setting it's reported value to true

# Answers

## GET

`/qa/questions/:question_id/answers`

Parameters

- `question_id` will tell the db which answers you want
- `page` parameter that will tell it how many pages to return
- `count` parameter that will tell it how many anwswers per page

## POST

`/qa/questions/:question_id/answers`

Takes a `question_id` and adds an answer to that question

## PUT

`/qa/answers/:answer_id/helpful`

Updates `answer_id` by incrementing it's helpfullness 1

## PUT

`/qa/answers/:answer_id/report`

Update `answer_id` by setting it's reported value to true
