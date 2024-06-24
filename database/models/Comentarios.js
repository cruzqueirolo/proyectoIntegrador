module.exports = function (sequelize, dataTypes) {
    let alias = 'Comentarios';

    let cols = {
        id: {
            autoIncrement: true,
            primaryKey: true,
            type: dataTypes.INTEGER
        },
        idProducto: {
            type: dataTypes.INTEGER,
            allowNull: false
        },
        idUsuario: {
            type: dataTypes.INTEGER,
            allowNull: false
        },
        comentario: {
            type: dataTypes.STRING,
            allowNull: false
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
        tableName: 'comentarios',
        timestamps: true,
        underscored: false,
    };

    const Comentarios = sequelize.define(alias, cols, config);

    Comentarios.associate = function (models) {
        Comentarios.belongsTo(models.Productos, {
            foreignKey: 'idProducto',
            as: 'producto'
        });
        Comentarios.belongsTo(models.Usuarios, {
            foreignKey: 'idUsuario',
            as: 'usuario'
        });
    };

    return Comentarios;
};
