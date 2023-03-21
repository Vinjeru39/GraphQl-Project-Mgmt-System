const path = require("path");
const express = require("express");
const colors = require("colors");
const cors = require("cors");
// require("dotenv").config();
const { graphqlHTTP } = require("express-graphql");
const schema = require("./schema/schema");
const connectDB = require("./config/db");

const port = process.env.port || 5000;

const app = express();

connectDB();

app.use(cors());

app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: true, // Initially was -> (process.env.NODE_ENV = "development"),
    //But with the above it only serves the static folders in development mode
  })
);

// Serve frontend -> Added for serving
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../client/build")));

  app.get(
    "*",
    (
      req,
      res //* for any route aprt from our api routes up there ofcourse
    ) =>
      res.sendFile(
        path.resolve(__dirname, "../", "client", "build", "index.html")
      )
  );
} else {
  app.get("/", (req, res) => res.send("Please set to production"));
}

app.listen(port, console.log(`Server running on port ${port}`));
