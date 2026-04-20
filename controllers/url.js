import shortid from 'shortid';
import URL from '../models/url.js';

async function handleGenerateNewShortUrl(req, res) {
  const body = req.body;                    
  if (!body.url) return res.status(400).json({ error: "url is required" });

  const shortId = shortid.generate();       
  await URL.create({
    shortId: shortId,
    redirectUrl: body.url,                 
    visitHistory: []
  });
  return res.render("home", {
    id: shortId
  });
}

async function handleGetAnalytics(req,res) {
  const shortId = req.params.shortId;
  const result = await URL.findOne({ shortId });
  return res.json({ totalVisits : result.visitHistory.length, analytics : result.visitHistory});
}
export  { handleGenerateNewShortUrl, handleGetAnalytics };