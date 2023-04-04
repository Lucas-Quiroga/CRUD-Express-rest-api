const express = require("express");
const morgan = require("morgan");
const app = express();

let products = [
  {
    id: 1,
    name: "laptop",
    price: 3000,
  },
];

//MIDDLEWARES
app.use(morgan("dev"));
app.use(express.json());

//METODOS HTTP CON LAS URLS DE LA API-REST

//obteniendo los productos
app.get("/products", (req, res) => {
  res.json(products);
});

//mandando un nuevo producto desde el cliente
app.post("/products", (req, res) => {
  const nuevoProducto = { ...req.body, id: products.length + 1 };
  products.push(nuevoProducto);
  res.send(nuevoProducto);
});

app.put("/products/:id", (req, res) => {
  //datos a actualizar que vienen del cliente
  const nuevaData = req.body; //{name: "mateo", price: 10}

  const buscandoProducto = products.find(
    (prod) => prod.id === parseInt(req.params.id)
  );

  if (!buscandoProducto)
    return res.status(404).json({
      message: "Producto no encontrado",
    });

  products = products.map((p) =>
    p.id === parseInt(req.params.id) ? { ...p, ...nuevaData } : p
  );

  res.json({
    message: "Producto actualizado",
  });
});

app.delete("/products/:id", (req, res) => {
  // console.log(req.params.id);
  const buscandoProducto = products.find(
    (prod) => prod.id === parseInt(req.params.id)
  );

  if (!buscandoProducto)
    return res.status(404).json({
      message: "Producto no encontrado",
    });

  products = products.filter((e) => e.id !== parseInt(req.params.id));

  res.sendStatus(204);
});

//buscando el producto al cual está en la URL
app.get("/products/:id", (req, res) => {
  console.log(req.params.id);
  const buscandoProducto = products.find(
    (prod) => prod.id === parseInt(req.params.id)
  );

  if (!buscandoProducto)
    return res.status(404).json({
      message: "Producto no encontrado",
    });
  console.log(buscandoProducto);
  res.json(buscandoProducto);
});

app.listen(3000);
console.log("server on port", 3000);
