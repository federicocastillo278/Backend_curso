import express from "express";

const app = express();
app.use(express.json());

app.use((req, res, next) => {
  console.log(`middleware → ${req.method} ${req.url}`);
  next();
});

const amigos = [
  { id: 1, name: 'Franco', age: 18 },
  { id: 2, name: 'Marcelo', age: 19 },
  { id: 3, name: 'Sebastian', age: 19 },
];

const mascotas = [
  { id: 1, tipo_de_mascota: "perro", name: "Max", raza: "Golden Retriver" },
  { id: 2, tipo_de_mascota: "perro", name: "Roco", raza: "Beagle" },
  { id: 3, tipo_de_mascota: "gato", name: "Rama", raza: "Anaranjado" },
];
app.get('/', (req, res) => {
  res.send('Bienvenido a esta página');
});

app.get('/amigos', (req, res) => {
  res.json(amigos);
});

app.get('/mascotas', (req, res) => {
  res.json(mascotas);
});

app.delete('/amigos', (req, res) => {
  const id = req.body.id;

  const index = amigos.findIndex(amigo => amigo.id === id);

  if (index !== -1) {
    amigos.splice(index, 1);
  }

  res.json(amigos);
});

app.post('/amigos', (req, res) => {
  const newamigo = req.body;
  console.log('Nuevos amigos agregado:', newamigo);

  // newamigo.id = Math.floor(Math.random() * 1000); 
  // Esto se uso para darle un "ID" random cuando no podiamos agregar usuarios nuevos
  if (Array.isArray(newamigo)) {
    amigos.push(...newamigo);
  } else {
    amigos.push(newamigo);
  }

  res.status(201).json(amigos);
});

app.put('/amigos', (req, res) => {
  const id = req.body.id;
  const datosActualizados = req.body;

  const index = amigos.findIndex(amigo => amigo.id === id);

  if (index !== -1) {
    amigos[index] = datosActualizados;
  }

  res.json(amigos);
});

app.delete('/amigos', (req, res) => {
  const id = req.body.id;

  const index = amigos.findIndex(amigo => amigo.id === id);

  if (index !== -1) {
    amigos.splice(index, 1);
  }

  res.json(amigos);
});


app.post('/mascotas', (req, res) => {
  const newmascota = req.body;
  console.log('Nueva mascota agregada:', newmascota);

  // newamigo.id = Math.floor(Math.random() * 1000); 
  // Esto se uso para darle un "ID" random cuando no podiamos agregar usuarios nuevos

  mascotas.push(newmascota)

  res.status(201).json(newmascota);
});

app.put('/mascotas', (req, res) => {
  const id = req.body.id;
  const datosActualizados = req.body;

  const index = mascotas.findIndex(mascota => mascota.id === id);

  if (index !== -1) {
    mascotas[index] = datosActualizados;
  }

  res.json(mascotas);
});

app.delete('/mascotas', (req, res) => {
  const id = req.body.id;

  const index = mascotas.findIndex(mascota => mascota.id === id);

  if (index !== -1) {
    mascotas.splice(index, 1);
  }

  res.json(mascotas);
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor Express corriendo en http://localhost:${PORT}`);
});

// Usar control-shit-P para buscar una extension
// Escribir "Thunder Client: New Request" para abrir, New Resquet
// Cambiar la URL para modificar la ruta .../amigos
//cambiar de GET a POST y despues poner SEND para agregar los nuevos datos