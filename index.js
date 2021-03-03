const express = require('express'); // importing the library
//   ^ require in the express library.
const bodyParser = require('body-parser');
const app = express();

// makes it so every route handler inside the app will be body parsed
app.use(bodyParser.urlencoded({ extended: true }));
/*
  app is an object that describes all the different things that the web server can do. You customize the app object to tell it what kind of requests it should expect to receive & what it should do whenever it does receive a request
*/

// ROUTE HANDLER - tells webserver what it should do whenever it receives a network request coming from the browser

/*
**vocab
req (request) - an object that represents the incoming request from a browser into the web server. Information coming the user will always be found inside this req object

res (response) - represents the outgoing response from the server back to the browser. Communicating with the user or sending information back to the browser is done with the res object
*/
app.get('/', (req, res) => {
  res.send(`
    <div>
      <form method="POST">
        <input name="email" placeholder="email" />
        <input name="password" placeholder="password" />
        <input name="passwordConfirmation" placeholder="password confirmation" />
        <button>Sign Up</button>
      </form>
    </div>
  `);
  /*
    1. where is the get method on app.get. where does .send send to?
  */
});

// self-made Middleware function
/*
const bodyParser = (req, res, next) => {
  if (req.method === 'POST') {
    // check that this is a POST request
    req.on('data', (data) => {
      const parsed = data.toString('utf8').split('&');
      const formData = {};
      for (let pair of parsed) {
        const [key, value] = pair.split('=');
        formData[key] = value;
      }
      req.body = formData;
      next();
    });
  } else {
    // next comes from express. signals to express to move on
    next();
  }
};
*/

app.post('/', (req, res) => {
  console.log(req.body);
  res.send('Account created!!!');
});

app.listen(3000, () => {
  console.log('Listening');
});

/*
1. a a computer has ports. the os know where the ports are?
2. a computer can make network requests through it's network adapter? 
3. express is an object that holds methods to do networking?
*/
