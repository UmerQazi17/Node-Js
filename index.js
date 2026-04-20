import express from 'express';
import path from 'path';
import urlRoute from './routes/url.js';
import connectToMongodb from './connection.js';
import URL from './models/url.js';
import staticRoute from './routes/staticRouter.js';
const app = express();

connectToMongodb("mongodb://localhost:27017/short-url")
.then(() => console.log("Mongodb Connected!"));

// EJS (Server-side Rendering)
app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/:shortId' ,async (req,res) => {
  const shortId = req.params.shortId;
  const entry = await URL.findOneAndUpdate({
    shortId
  }, {$push : {
    visitHistory : { timestamp : Date.now()}
  }});
  if (!entry) return res.status(404).json({ error: "Short URL not found" });
  res.redirect(entry.redirectUrl);
}); 
app.use('/url', urlRoute);
app.use('/', staticRoute);

app.listen(8000, () => console.log("Server Up!"));