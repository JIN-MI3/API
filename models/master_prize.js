const Sequelize = require("sequelize");

module.exports = function(sequelize, DataTypes) {
    return sequelize.define('master_prize', {
        id: {
            autoIncrement: true,
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
        },
        prizes: {
            type: DataTypes.STRING(255),
            allowNull: false,
            comment: "ชื่อรางวัล"
        },
        total: {
            type: DataTypes.INTEGER,
            allowNull: false,
            comment: "จำนวนรางวัลทั้งหมด"
        },
        created_by: {
            type: DataTypes.STRING(255),
            allowNull: false,
            comment: "สร้างโดยใคร",
        },
        created_at: {
            type: DataTypes.DATE,
            allowNull: false,
            comment: "วันที่ข้อมูลถูกสร้าง",
        },
        updated_by: {
            type: DataTypes.STRING(255),
            allowNull: false,
            comment: "แก้ไขโดยใคร",
        },
        updated_at: {
            type: DataTypes.DATE,
            allowNull: false,
            comment: "วันที่ข้อมูลถูกแก้ไข",
        }
    }, {
        sequelize,
        tableName: 'master_prize',
        timestamps: false,
        indexes: [
            {
                name: "PRIMARY",
                unique: true,
                using: "BTREE",
                fields: [
                    { name: "id"},
                ]
            },
        ],
    });
};


