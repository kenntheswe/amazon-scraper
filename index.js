const express = require("express");
const request = require("request-promise");

const app = express();
const PORT = process.env.PORT || 5555;

const apiKey = process.env.API_KEY;
const baseUrl = `https://api.scraperapi.com?api_key=${apiKey}&autoparse=true`;

app.use(express.json());

app.get("/", (req, res) => {  res.send("Welcome to Amazon Scraper API");
})

// GET product information
app.get("/products/:productId", async (req, res) => {
  const { productId } = req.params;

  try {
    const response = await request(`${baseUrl}&url=https://www.amazon.com/dp/${productId}`);

    res.json(JSON.parse(response));
  } catch (error) {
    res.json(error);
  }
});

// GET product reviews
app.get("/products/:productId/reviews", async (req, res) => {
  const { productId } = req.params;

  try {
    const response = await request(`${baseUrl}&url=https://www.amazon.com/product-review/${productId}`);

    res.json(JSON.parse(response));
  } catch (error) {
    res.json(error);
  }
});

// GET product offers
app.get("/products/:productId/offers", async (req, res) => {
  const { productId } = req.params;

  try {
    const response = await request(`${baseUrl}&url=https://www.amazon.com/gp/offer-listing/${productId}`);

    res.json(JSON.parse(response));
  } catch (error) {
    res.json(error);
  }
});

// GET product search results
app.get("/search/:searchQuery", async (req, res) => {
  const { searchQuery } = req.params;

  try {
    const response = await request(`${baseUrl}&url=https://www.amazon.com/s?k=${searchQuery}`);

    res.json(JSON.parse(response));
  } catch (error) {
    res.json(error);
  }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
