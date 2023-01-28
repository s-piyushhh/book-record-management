const { Router } = require("express");
const express = require("express");
// const { append } = require("express/lib/response");
const { users } = require("../data/users.json");
const { books } = require("../data/books.json");
const router = express.Router();
/*
Route: /users
Method : GET
*Descripytion : Get all users
Access : Public
Parameters : none
*/
router.get('/', (req, res) => {
    res.status(200).json({
        success: true,
        data: users
    });
});

/*
Route: /users/:id
/users/2
Method : GET
*Descripytion : Get single user by thier id
Access : Public
Parameters : id
*/
router.get('/:id', (req, res) => {
    const { id } = req.params;
    const user = users.find((each) => each.id === id);
    if (!user) {
        return res.status(404).json({
            success: false,
            message: "User Not Found"
        });
    } else {
        return res.status(200).json({
            success: true,
            data: user
        });
    }
});

/*
Route: /users/:id
Method : POST
*Descripytion : Create a new user
Access : Public
Parameters : none
*/
router.post("/", (req, res) => {
    const { id, name, surname, email, subscriptionType, subscriptionDate } = req.body;
    const user = users.find((each) => each.id === id);

    if (user) {
        return res.status(404).json({
            success: false,
            message: "User already Exist"
        });
    }
    users.push({
            id,
            name,
            surname,
            email,
            subscriptionType,
            subscriptionDate
        });
    return res.status(201).json({
        success: true,
        data: users,
    });
});

/*
Route: /users/:id
Method : PUT
*Descripytion : Updating a user data
Access : Public
Parameters : id
*/
router.put("/:id", (req, res) => {
    const { id } = req.params;
    const { data } = req.body;
    const user = users.find((each) => each.find === id);

    if (!user){
        return res.status(404).json({success: false,message: "user Not Found"});
    }
    const UpdatedUser = users.map((each) => {
        if (each.id === id) {
            return {
                ...each,
                ...data,
            };
        }
        return each;
    });
    return res.status(200).json({
        success: true,
        data: UpdatedUser,
    });
});

/*
Route: /users/:id
Method : DELETE
*Descripytion : deleting a user by their data
Access : Public
Parameters : id
*/
router.delete('/:id', (req, res) => {
    const { id } = req.params;
    const user = users.find((each) => each.id === id);

    if (!user) {
        return res.status(404).json({
            success: false,
            message: "User to be deleted is not to be found",
        });
    }
    const index = users.indexOf(user);
    users.splice(index, 1);
    
    return res.status(200).json({ success: true, data: users });
});




router.get("/subscription-details/:id", (req, res) => {
    const { id } = req.params;

    const user = users.find((each) => each.id === id);
    
    if (!user)
        return res.status(404).json({ success: false, message: "User Not Found" });
    
    const getDateInDays = (data = "") => {
        let date;
        if (data === "") {
            // current date
            date = new Date();
        } else {
            // getting a date o the basis of variable
            date = new Date(data);
        }
        let days = Math.floor(date / (1000 * 60 * 60 * 24));
        return days;
    };

    const subscriptionType = (date) => {
        if (user.subscriptionType === "Basic") {
            date = date + 90;
        } else if (user.subscriptionType === "Standard") {
            date = date + 180;
        } else if (user.subscriptionType === "Premium") {
            date = date + 365;
        }
        return date;
    };
    // subacription calc here
    // Jan 1, 1970
    let returnDate = getDateInDays(user.returnDate);
    let currentDate = getDateInDays();
    let subscriptionDate = getDateInDays(user.subscriptionDate);
    let subscriptionExpiration = subscriptionType(subscriptionDate);

    const data = {
        ...user,
        subscriptionExpired: subscriptionExpiration < currentDate,
        daysLeftForExpiration:
            subscriptionExpiration <= currentDate
                ? 0
                : subscriptionExpiration - currentDate,
        fine:
            returnDate < currentDate
                ? subscriptionExpiration <= currentDate
                    ? 200
                    : 100
                : 0,
    };
    return res.status(200).json({ success: true, data });
});

// default export
module.exports = router;