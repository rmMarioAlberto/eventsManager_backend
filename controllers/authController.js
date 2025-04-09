const db = require('../config/pgConfig');

exports.login = (req, res) => {
    const { correo, contra } = req.body || {};

    if (!correo || !contra) {
        return res.status(400).json({ message: 'Todos los datos son necesarios' });
    }

    const query = 'SELECT * FROM eventsmanager.user WHERE correo = $1 AND contra = $2';

    db.query(query, [correo, contra], (err, results) => {
        if (err) {
            return res.status(400).json({ message: 'Error en el servidor', err });
        }

        if (results.rowCount === 0) {
            return res.status(401).json({ message: 'Credenciales inválidas' }); // 👈 Mejor feedback
        }

        return res.status(200).json({ message: 'Login exitoso', user: results.rows[0] });
    });
};


exports.registro = (req, res) => {
    const { nombreUser, correo, contra } = req.body || {};

    if (!nombreUser || !correo || !contra) {
        return res.status(400).json({ message: 'Todos los datos son necesarios' });
    }

    const query = 'INSERT INTO eventsmanager.user (nombre, correo, contra) VALUES ($1, $2, $3)';

    db.query(query, [nombreUser, correo, contra], (err, results) => {
        if (err) {
            return res.status(400).json({ message: 'Error en el servidor', err });
        }

        return res.status(200).json({ message: 'Usuario creado correctamente' });
    });
};
