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
//when you do a get request for an ID - then router.get probably looks like this:
// router.get('/:user.id')
router.get('/', (req, res) => {
  console.log ("WTF-designs");
  // Get all of the designs from the database
  const sqlText = `SELECT * FROM "designs"`;
  pool.query(sqlText)
      .then((result) => {
        console.log(result.rows);
          res.send(result.rows);
      })
      .catch((error) => {
          console.log(`Error making database query-designs ${sqlText}`, error);
          res.sendStatus(500);
      });
});
//end of the get for UserList
//----everything below here is "pasted" from the user.router.js file when I copied and pasted this whole file in here

// -TN-Handles the logic for creating a new user. The one extra wrinkle here is
// -TN-that we hash the password before inserting it into the database.
// router.post('/register', (req, res, next) => {
//   const username = req.body.username;
//   const hashedPassword = encryptLib.encryptPassword(req.body.password);
// -TN-Because Brads DB has two additional fields, he needs to add firstname and lastname to this DB post
//-TN-this is done 3 lines down and 7 lines down from this row in the code
//   const sqlText = `
//     INSERT INTO "user"
//       ("firstname", "lastname","username", "password")
//       VALUES
//       ($1, $2, $3, $4);
//   `;
//   const sqlValues = [firstname, lastname, username, hashedPassword];

//   pool.query(sqlText, sqlValues)
//     .then(() => {
//       res.sendStatus(201)
//     })
//     .catch((dbErr) => {
//       console.log('POST /api/user/register error: ', dbErr);
//       res.sendStatus(500);
//     });
// });

// -TN-Handles the logic for logging in a user. When this route receives
// -TN-a request, it runs a middleware function that leverages the Passport
// -TN-library to instantiate a session if the request body's username and
// -TN-password are correct.
  // -TN-You can find this middleware function in /server/strategies/user.strategy.js.
// router.post('/login', userStrategy.authenticate('local'), (req, res) => {
//   res.sendStatus(200);
// });

// // -TN-Clear all server session information about this user:
// router.post('/logout', (req, res, next) => {
//   // -TN-Use passport's built-in method to log out the user.
//   req.logout((err) => {
//     if (err) { 
//       return next(err); 
//     }
//     res.sendStatus(200);
//   });
// });


module.exports = router;
