import express from "express";
import axios from "axios";
import cheerio from "cheerio";

const app = express();

const newspapers = [
  {
    name: "thetimes",
    address: "https://www.thetimes.co.uk/environment/climate-change",
    base:''
  },
  {
    name: "guardian",
    address: "https://www.theguardian.com/environment/climate-crisis",
    base:''
  },
  {
    name: "telegraph",
    address: "https://www.telegraph.co.uk/climate-change",
    base:'https://www.telegraph.co.uk'
  },
];

const articles = [];

newspapers.forEach(newspaper => {
      axios
        .get(newspaper.address)
        .then((response) => {
          const html = response.data;
          const $ = cheerio.load(html);
          
          $('a:contains("climate")', html).each(function () {
            const title = $(this).text();
            const url = $(this).attr("href");

            articles.push({
              title,
              url:newspaper.base+url,
              source: newspaper.name
            });

          });
  })
})

app.get("/", (req, res) => {
  res.json("Welcome to my Climate Change News API");
});

app.get("/news", (req, res) => {
      res.json(articles);
});

// realmente es el name
app.get("/news/:newspaperId", (req,res) => {
  const newspaperId = req.params.newspaperId;

  const newspaperAddress = newspapers.filter(newspaper => newspaper.name === newspaperId)[0].address;

  const newspaperBase = newspapers.filter(newspaper => newspaper.name === newspaperId)[0].base;

  axios.get(newspaperAddress)
    .then(response => {
      const html = response.data;
      const $ = cheerio.load(html);

      const specificArticles = [];
      // fijate que es $('selector',html).function
      $('a:contains("climate")',html).each(function (){
        const title = $(this).text();
        const url = $(this).attr('href')
        specificArticles.push({
          title,
          url:newspaperBase+url,
          source:newspaperId
        })
      })
      res.json(specificArticles)
    })
    .catch(console.log)
})


const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.clear();
  console.log("Server on port " + PORT);
});
