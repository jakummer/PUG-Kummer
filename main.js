const express = require("express");
const db = require("./db.js");
const app = express();


app.set("view engine", "pug");

const DB = new db("data");

app.use(express.urlencoded({ extended: true }));

app.use(express.json());

 
app.get("/altaproductos", (req, res) => {
  res.render("formulario");
});

app.get("/productos", async (req, res) => {
  const productos = await DB.getAllProducts();
  res.render("productos", {productos});
 
});


app.post("/api/productos", async (req, res) => {
  console.log(req.body);
  const { nombre, precio, urlimagen } = req.body;
  const data = await DB.createProduct({ nombre, precio, urlimagen });
  return res.redirect("/altaproductos");
});


app.listen(8080, () => {
  console.log("Iniciado");
});


