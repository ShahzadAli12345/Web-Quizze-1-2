const express = require("express");
const app = express();


//decode body data
app.use(express.urlencoded({ extended: true }));
//static assets
app.use(express.static("public"));


//Our Fake Databse
let recepies = [
  {
    id: "1",
    title: "Benefits of organic food",
    text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Lorem ipsum dolor sit amet consectetur adipisicing elit. Lorem ipsum dolor sit amet consectetur adipisicing elit. Lorem ipsum dolor sit amet consectetur adipisicing elit. Lorem ipsum dolor sit amet consectetur adipisicing elit. Lorem ipsum dolor sit amet consectetur adipisicing elit. Lorem ipsum dolor sit amet consectetur adipisicing elit.",
    img: "https://media.istockphoto.com/photos/paleo-diet-healthy-food-background-picture-id1301565375?b=1&k=20&m=1301565375&s=170667a&w=0&h=D-u_kxPS9SL5MWmhN0xbwfNxPmqbqzhyjYvypM7V7xU=",
  },
  {
    id: "2",
    title: "Pasta Mania",
    text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Lorem ipsum dolor sit amet consectetur adipisicing elit. Lorem ipsum dolor sit amet consectetur adipisicing elit. Lorem ipsum dolor sit amet consectetur adipisicing elit. Lorem ipsum dolor sit amet consectetur adipisicing elit. Lorem ipsum dolor sit amet consectetur adipisicing elit. Lorem ipsum dolor sit amet consectetur adipisicing elit.",
    img: "https://media.istockphoto.com/photos/vegetarian-dishes-picture-id1313418058?b=1&k=20&m=1313418058&s=170667a&w=0&h=-BZRud6u510emxg26hpFdOtsPSjOEsB0OCsIue_cdi8=",
  },
  {
    id: "3",
    title: "Jombo Beef Steak",
    text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Lorem ipsum dolor sit amet consectetur adipisicing elit. Lorem ipsum dolor sit amet consectetur adipisicing elit. Lorem ipsum dolor sit amet consectetur adipisicing elit. Lorem ipsum dolor sit amet consectetur adipisicing elit. Lorem ipsum dolor sit amet consectetur adipisicing elit. Lorem ipsum dolor sit amet consectetur adipisicing elit.",
    img: "https://media.istockphoto.com/photos/barbecue-rib-eye-steak-or-rump-steak-dry-aged-wagyu-entrecote-steak-picture-id1079920024?b=1&k=20&m=1079920024&s=170667a&w=0&h=FZconGrzfpDXhzoV0qaUFKxVBObMowMD5tr2sIN0or0=",
  },
];


//templating engine
app.set("view engine", "ejs");

//home route
app.get("/", (req, res) => {
  console.log(recepies[1]);
  res.render("home");
});

//training page route
app.get("/training", (req, res) => {
  res.render("training");
});

//recepies page route
app.get("/recepies", (req, res) => {
  res.render("recepies/recepies", { recepies });
});

//render create new recepie form
app.get("/recepie/new", (req, res) => {
  res.render("recepies/new");
});

//create new recepie in database
app.get("/add-recepie", (req, res) => {
  const title = req.query.title;
  const text = req.query.text;
  const img = req.query.img;
  const id = req.query.id;

  recepies.push({ title, text, img, id });
  // console.log("Scuuessfully created");

  res.redirect("/recepies");
});

//create new recepie via POST request
app.post("/add-recepie", (req, res) => {
  // console.log(req.body);
  const { id, title, text, img } = req.body;
  recepies.push({ title, text, img, id });

  res.redirect("/recepies");
});

//more details route
app.get("/recepie/:id", (req, res) => {//localhost:8080/recepie/3
  // console.log(req.params);
  // const id = req.params.id;
  const { id } = req.params; //get id by click

  const foundRecepie = recepies.find((r) => {
    return r.id === id; //match id and its detaile
  });

  // console.log(foundRecepie);
  res.render("recepies/show", { foundRecepie });
});

//render edit form
app.get("/recepie-edit/:id", (req, res) => {
  const { id } = req.params;

  const foundRecepie = recepies.find((r) => {
    return r.id === id;
  });

  res.render("recepies/edit", { foundRecepie });
});

//update route
app.post("/recepie-update/:id", (req, res) => {
  const { id } = req.params;

  arrayindex = recepies.findIndex((obj => obj.id == id));

  recepies[arrayindex].id = id;
  recepies[arrayindex].title = req.body.title;
  recepies[arrayindex].text = req.body.text;
  recepies[arrayindex].img = req.body.img;


  const foundRecepie = recepies.find((r) => {
    return r.id === id;
  });

 res.redirect("/recepies");
  res.send("Updated Successfully");
});

//delete route
app.get("/recepie-delete/:id", (req, res) => {
  const { id } = req.params
  arrayindex = recepies.findIndex((obj => obj.id == id));

  recepies.splice(arrayindex, 1);  //del 1 item  
  res.render("recepies/recepies", { recepies });
  res.send("Deletd Successfully");

});

//making the SERVER
app.listen(8080, () => {
  console.log("SERVER LISTENING AT PORT 8080");
});
