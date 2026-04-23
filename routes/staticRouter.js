import express from 'express';
import URL from '../models/url.js';

const router = express.Router();

// router.get("/", async (req,res) => {
//   const allUrls = await URL.find({});
//   return res.render("home", {
//     urls : allUrls
//   });
// })
router.get("/", async (req, res) => {
  const allUrls = await URL.find({});
  console.log("allUrls:", allUrls);        // 👈 add this
  console.log("allUrls length:", allUrls.length);  // 👈 and this
  return res.render("home", {
    urls: allUrls
  });
});
export default router;