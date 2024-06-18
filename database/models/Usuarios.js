module.exports = function(sequelize, dataTypes) {
   
    let alias = "Usuarios";
    
    let cols = {
        id: {
            autoIncrement: true,
            primaryKey: true,
            type: dataTypes.INTEGER
        },
        email: {
            type: dataTypes.STRING
        },
        usuario:{
            type: dataTypes.STRING
        },
        contrasenia: {
            type: dataTypes.STRING
        },
        fecha: {
            type: dataTypes.DATE,
        },
        dni: {
            type: dataTypes.INTEGER
        },
        fotoPerfil: {
            type: dataTypes.STRING
        },
        createdAt: {
            type: dataTypes.DATE
        },
        updatedAt: {
            type: dataTypes.DATE
        },
        deletedAt: {
            type: dataTypes.DATE
        }
    };

    let config = {
        tableName: "usuarios",
        timestamps: true, // This ensures createdAt, updatedAt, and deletedAt are handled automatically
        underscored: false
    };

    const Usuarios = sequelize.define(alias, cols, config);

    Usuarios.associate = function(models) {
        Usuarios.hasMany(models.Productos, {
            as: "productos",
            foreignKey: "idUsuario"
        });

        //Usuarios.hasMany(models.Comentario, {
        //    as: "comentarios",
        //    foreignKey: "idAutor"
        //});
    }

    return Usuarios;
};
