# book-record-management

This is an application called as Book Record Management/ API

## Endpoint

## /users
POST : Create A new user
GET : Get all list of users

## /users/{iD}
GET : Get a user by their iD
PUT : Update a user by iD
Delete : Delete a user by their ID(Check if the user still has an issued book And also check if any fine is to be collected from the user)

## /users/subscription-details/{id}
GET : get user subscribtion details
1. Date of subscribtion
2. Valid Till ?
3. Fine if any?

## /books
GET : Get all books
POST : Add a new book

## /books/{id}
GET : Get a book by id
POST : Update a book by ID

## /books/issued
GET : Get all issued books

## /books/issued/withFine
GET : Get all issued books with Fine

## Subscription Type
Basic (3 months)
Standard (6 month)
Premium (12 months)

If user has an issued book and then the issued book is to be returned at on 09-12-22
If user missed the date to return, then user gets a fine of Rs. 50/-

If user has an issued book and then the issued book is to be returned at on 09-12-22
If user missed the date to return, the users subscribtion also got expired, then the user need to pay fine of Rs. 150/-


<!-- 
MVC architecture
    >> Modal View Controller
    >> Modal and Controller are respect to backend
    >>view wrt f/e 
    >> controller : Brain or logic of our route 
 -->

 <!-- modal : it speaks abt the structure of the MongoDB collection -->