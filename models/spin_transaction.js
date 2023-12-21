const Sequelize = require("sequelize");

module.exports = function (sequelize, DataTypes) {
    return sequelize.define('spin_transaction', {
        id: {
            autoIncrement: true,
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
        },
        fname: {
            type: DataTypes.STRING(255),
            allowNull: false,
            comment: "ชื่อเต็ม"
        },
        prize_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            comment: "ใช้สำหรับจอยข้อมูลกับ master prize"
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
        }
    }, {
        sequelize,
        tableName: 'spin_transaction',
        timestamps: false,
        indexes: [
            {
                name: "PRIMARY",
                unique: true,
                using: "BTREE",
                fields: [
                    { name: "id" },
                ]
            },
        ],
    });
};