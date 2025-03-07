const express = require('express');
const encryptLib = require('../modules/encryption');
const pool = require('../modules/pool');
const userStrategy = require('../strategies/user.strategy');


const router = express.Router();

// If the request came from an authenticated user, this route
// sends back an object containing that user's information.
// Otherwise, it sends back an empty object to indicate there
// is not an active session.
// router.get('/', (req, res) => {
//   if (req.isAuthenticated()) {
//     res.send(req.user);
//   } else {
//     res.send({});
//   }
// });

//Get request for UserList - Feb9 6pm
router.get('/all', (req, res) => {
  console.log ("WTF");
  // Get all of the users from the database
  const sqlText = `SELECT * FROM "user"`;
  pool.query(sqlText)
      .then((result) => {
        console.log(result.rows);
          res.send(result.rows);
      })
      .catch((error) => {
          console.log(`Error making database query ${sqlText}`, error);
          res.sendStatus(500);
      });
});
//end of the get for UserList

// Handles the logic for creating a new user. The one extra wrinkle here is
// that we hash the password before inserting it into the database.
router.post('/register', (req, res, next) => {
  console.log("dude!");
  const firstname =req.body.firstname;
  const lastname = req.body.lastname;
  const username = req.body.username;
  const hashedPassword = encryptLib.encryptPassword(req.body.password);

  console.log(firstname,lastname,username,hashedPassword);

// Because Brads DB has two additional fields, he needs to add firstname and lastname to this DB post
//this is done 3 lines down and 7 lines down from this row in the code
  const sqlText = `
    INSERT INTO "user"
      ("first_name", "last_name","username", "password","user_is_admin")
      VALUES
      ($1, $2, $3, $4, $5);
  `;
  const sqlValues = [firstname, lastname, username, hashedPassword, 'FALSE'];

  pool.query(sqlText, sqlValues)
    .then(() => {
      res.sendStatus(201)
    })
    .catch((dbErr) => {
      console.log('POST /api/user/register error: ', dbErr);
      res.sendStatus(500);
    });
});

// Handles the logic for logging in a user. When this route receives
// a request, it runs a middleware function that leverages the Passport
// library to instantiate a session if the request body's username and
// password are correct.
  // You can find this middleware function in /server/strategies/user.strategy.js.
router.post('/login', userStrategy.authenticate('local'), (req, res) => {
  res.sendStatus(200);
});

// Clear all server session information about this user:
router.post('/logout', (req, res, next) => {
  // Use passport's built-in method to log out the user.
  req.logout((err) => {
    if (err) { 
      return next(err); 
    }
    res.sendStatus(200);
  });
});


module.exports = router;
