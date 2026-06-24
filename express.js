import express from "express";

const app = express();
app.use(express.json());

app.use((req, res, next) => {
  console.log(`middleware → ${req.method} ${req.url}`);
  next(); 
});

const amigos = [
    { id: 1, name: 'Franco', age: 18},
    { id: 2, name: 'Marcelo', age: 19},
    { id: 3, name: 'Sebastian', age: 19},
  ];
app.get('/', (req, res) => {
  res.send('Bienvenido a esta página');
});

app.get('/amigos', (req, res) => {
  res.json(amigos); 
});

app.post('/amigos', (req, res) => {
  const newamigo = req.body;
  console.log('Nuevo amigo agregado:', newamigo);

  // newamigo.id = Math.floor(Math.random() * 1000); 
  // Esto se uso para darle un "ID" random cuando no podiamos agregar usuarios nuevos
  
  amigos.push(newamigo)

  res.status(201).json(newamigo);
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor Express corriendo en http://localhost:${PORT}`);
});

// Usar control-shit-P para buscar una extension
// Escribir "Thunder Client: New Request" para abrir, New Resquet
// Cambiar la URL para modificar la ruta .../amigos
//cambiar de GET a POST y despues poner SEND para agregar los nuevos datos