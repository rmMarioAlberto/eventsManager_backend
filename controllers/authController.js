const db = require('../config/pgConfig');

exports.login = (req, res) => {
    const {correo, contra} = req.body;

    if (!correo || !contra) {
        return res.status(400).json({message: 'Todos los datos son necesarios'})
    }
    
    const query = 'SELECT * FROM user WHERE correo = $1 AND contra = $2'

    db.query(query, [correo,contra], (err,results) => {
        if(err){
            return res.status(400).json({message: 'Error en el servidor', err})
        }

        if(results.rowCount === 0){
            return res.status(200).json(results.rows);
        }
    })
};


exports.registro = (req,res) => {
    const {nombreUser, correo, contra} = req.body;
    
    if (!nombreUser || !correo || !contra) {
        return res.status(400).json({message : 'Todos los datos son necesarios'})
    }

    const query = 'INSERT INTO user (nombre, correo,contra) VALUES ($1,$2,$3)'
    
    db.query(query, [nombreUser, correo, contra], (err,results) => {
        if(err){
            return res.status(400).json({message : 'Error en el servidor', err})
        }

        if(results.fields > 0){
            return res.status(200).json({message: 'Usuario creado correctamente'})
        }
    })
}