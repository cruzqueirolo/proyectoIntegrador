module.exports = function(sequelize, DataTypes) {
    let alias = "User";
    
    let cols = {
        id: {
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
        },
        email: {
            type: DataTypes.STRING
        },
        contrasenia: {
            type: DataTypes.STRING
        },
        fecha: {
            type: DataTypes.DATE,
        },
        dni: {
            type: DataTypes.INTEGER
        },
        fotoPerfil: {
            type: DataTypes.STRING
        },
        createdAt: {
            type: DataTypes.DATE,
            allowNull: true,
            field: 'created_at'
        },
        updatedAt: {
            type: DataTypes.DATE,
            allowNull: true,
            field: 'updated_at'
        },
        deletedAt: {
            type: DataTypes.DATE,
            allowNull: true,
            field: 'deleted_at'
        }
    };

    let config = {
        tableName: "usuarios",
        timestamps: true, // This ensures createdAt, updatedAt, and deletedAt are handled automatically
        underscored: true, // This ensures timestamps use snake_case instead of camelCase
        paranoid: true // This ensures the deletedAt field is used for soft deletes
    };

    const User = sequelize.define(alias, cols, config);

    // User.associate = function(models) {
    //     User.hasMany(models.Producto, {
    //         as: "productos",
    //         foreignKey: "idUsuario"
    //     });

    //     User.hasMany(models.Comentario, {
    //         as: "comentarios",
    //         foreignKey: "idAutor"
    //     });
    // }

    return User;
};
