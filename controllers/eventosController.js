const db = require('../config/pgConfig');

exports.getEvents = (req, res) => {
    const query = 'SELECT * FROM eventsmanager.evento';

    db.query(query, (err, results) => {
        if (err) {
            return res.status(500).json({ message: 'Error en el servidor' });
        }

        if (results.rowCount === 0) {
            return res.status(404).json({ message: 'No se encontraron registros de eventos' });
        }

        return res.status(200).json(results.rows);
    });
};

exports.getEventsById = (req, res) => {
    const { idEvent } = req.body || {};

    if (!idEvent) {
        return res.status(400).json({ message: 'El id del evento es necesario' });
    }

    const query = 'SELECT * FROM eventsmanager.evento WHERE id = $1';

    db.query(query, [idEvent], (err, results) => {
        if (err) {
            return res.status(500).json({ message: 'Error en el servidor' });
        }

        if (results.rowCount === 0) {
            return res.status(404).json({ message: 'No se encontraron registros' });
        }

        return res.status(200).json(results.rows);
    });
};

exports.deleteEvent = (req, res) => {
    const { idEvent } = req.body || {};

    if (!idEvent) {
        return res.status(400).json({ message: 'El id del evento es necesario' });
    }

    const query = 'DELETE FROM eventsmanager.evento WHERE id = $1';

    db.query(query, [idEvent], (err, results) => {
        if (err) {
            return res.status(500).json({ message: 'Error en el servidor' });
        }

        if (results.rowCount === 0) {
            return res.status(404).json({ message: 'No se pudo eliminar el evento' });
        }

        return res.status(200).json({ message: 'Evento eliminado correctamente' });
    });
};

exports.updateEvent = (req, res) => {
    const { nombre, fecha, asistentes, latitud, longitud, idEvent } = req.body || {};

    if (!nombre || !fecha || !asistentes || !latitud || !longitud || !idEvent) {
        return res.status(400).json({ message: 'Todos los datos son necesarios' });
    }

    const query = 'UPDATE eventsmanager.evento SET nombre = $1, fecha = $2, asistentes = $3, latitud = $4, longitud = $5 WHERE id = $6';

    db.query(query, [nombre, fecha, asistentes, latitud, longitud, idEvent], (err, results ) => {
        if (err) {
            return res.status(500).json({ message: 'Error en el servidor' });
        }

        if (results.rowCount === 0) {
            return res.status(404).json({ message: 'No se pudo actualizar el evento' });
        }

        return res.status(200).json({ message: 'El evento se actualizó correctamente' });
    });
};

exports.addEvent = (req, res) => {
    const { nombre, fecha, asistentes, latitud, longitud } = req.body || {};

    if (!nombre || !fecha || !asistentes || !latitud || !longitud) {
        return res.status(400).json({ message: 'Todos los datos son necesarios' });
    }

    const query = 'INSERT INTO eventsmanager.evento (nombre, fecha, asistentes, latitud, longitud) VALUES ($1, $2, $3, $4, $5)';
    db.query(query, [nombre, fecha, asistentes, latitud, longitud], (err, results) => {
        if (err) {
            return res.status(500).json({ message: 'Error en el servidor' });
        }

        if (results.rowCount === 0) {
            return res.status(400).json({ message: 'No se pudo crear el evento' });
        }

        return res.status(201).json({ message: 'El evento se creó correctamente' });
    });
};