require("dotenv").config();
const express = require("express");
const session = require("express-session");

const cors = require("cors");
const app = express();

// APP ALLOWS WHICH ORIGIN, TYPE OF REQUESTS, ALLOWED TO SUBMIT E.G FORM-DATA, MEDIA TYPE ETC.
//

app.use(
  cors({
    credentials: true,
    origin: [
      "https://abg-api.onrender.com",
      "http://localhost:3306",
      "http://localhost:3000",
      "http://localhost:8100",
      "capacitor://localhost",
      "ionic://localhost",
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Origin", "X-Requested-With", "Content-Type", "Accept"],
  })
);

//SESSION
app.use(
  session({
    secret: process.env.NODE_APP_SECRET_KEY,
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false, // Set to true if using HTTPS
      maxAge: 1000 * 60 * 60 * 24, // 1 day
    },
  })
);

// ABLE TO PARSE JSON DATA FROM BODY REQUESTS OJECT
app.use(express.json());

// API ROUTES
app.use(
  `/api/${process.env.NODE_APP_API_USERS}`,
  require("./routes/usersRoutes")
);

app.use(
  `/api/${process.env.NODE_APP_API_POSITIONS}`,
  require("./routes/positionsRoutes")
);

app.use(
  `/api/${process.env.NODE_APP_API_REQUESTS}`,
  require("./routes/requestsRoutes")
);

app.use(
  `/api/${process.env.NODE_APP_API_RESULTS}`,
  require("./routes/resultsRoutes")
);

app.use(
  `/api/${process.env.NODE_APP_API_EMAILS}`,
  require("./routes/emailsRoutes")
);

// ABLE TO PARSE application/x-www-form-urlencoded
//This middleware function parses incoming requests with URL-encoded payloads
// (i.e., data sent via application/x-www-form-urlencoded content type).
app.use(express.urlencoded({ extended: true }));

// CHECKS IF RUNNING
app.use((err, request, response, next) => {
  console.error(err);
  response.status(500).json({ status: "failed to run server API" });
});

// SERVER WILL LISTEN TO
app.listen(process.env.NODE_APP_PORT || 3000, () =>
  console.log(`server running on PORT ${process.env.NODE_APP_PORT}`)
);
