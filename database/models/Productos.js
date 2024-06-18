module.exports = function (sequelize,dataTypes) {

    let alias = 'Productos';

    let cols = {
        id:{
            autoIncrement: true,
            primaryKey: true,
            type: dataTypes.INTEGER
        },
        idUsuario:{
            type: dataTypes.INTEGER
        },
        nombreProducto:{
            type: dataTypes.STRING
        },
        descripcion:{
            type: dataTypes.STRING
        },
        imagen:{
            type: dataTypes.STRING
        },
        createdAt:{
            type: dataTypes.DATE
        },
        updatedAt:{
            type: dataTypes.DATE
        },
        deletedAt:{
            type: dataTypes.DATE
        }
        };

    let config = {
        tableName: 'productos',
        timestamps: true,
        underscored: false
    };

    const Productos = sequelize.define(alias,cols,config);

    Productos.associate = function(models){
        Productos.belongsTo(models.Usuarios,{
            as: "user",
            foreignKey: "idUsuario"
        })
    };

    return Productos
};
