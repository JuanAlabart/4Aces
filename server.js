const express = require("express");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
const credentials = require("./mail.json"); // Cargar credenciales desde mail.json

const app = express();
const PORT = 3000;

// Middleware para procesar datos del formulario
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Ruta para servir archivos estáticos (como consultas.html)
app.use(express.static(__dirname));

// Ruta para manejar el envío del formulario
app.post("/send-email", async (req, res) => {
  const { nombre, correo, mensaje } = req.body;

  if (!nombre || !correo || !mensaje) {
    return res.status(400).send("Todos los campos son obligatorios.");
  }

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: credentials.email,
        pass: credentials.password,
      },
    });

    const mailOptions = {
      from: correo,
      to: credentials.email,
      subject: `Consulta de ${nombre}`,
      text: `Has recibido un mensaje de ${nombre} (${correo}):\n\n${mensaje}`,
    };

    await transporter.sendMail(mailOptions);
    res.status(200).send("Correo enviado exitosamente.");
  } catch (error) {
    console.error("Error al enviar el correo:", error);
    res.status(500).send("Hubo un error al enviar el correo.");
  }
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});