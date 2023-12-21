const Sequelize = require("sequelize");

module.exports = function(sequelize, DataTypes) {
    return sequelize.define('employee', {
        id: {
            autoIncrement: true,
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
        },
        emp_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            comment: "รหัสพนักงาน"
        },
        first_name: {
            type: DataTypes.STRING(255),
            allowNull: false,
            comment: "ชื่อ"
        },
        last_name: {
            type: DataTypes.STRING(255),
            allowNull: false,
            comment: "นามสกุล",
        },
        division: {
            type: DataTypes.STRING(255),
            allowNull: true,
            comment: "หน่วยงาน",
        },
        location: {
            type: DataTypes.STRING(255),
            allowNull: true,
            comment: "สถานที่",
        },
        company_name: {
            type: DataTypes.STRING(255),
            allowNull: true,
            comment: "ชื่อบริษัทแบบเต็ม",
        },
        company_short: {
            type: DataTypes.STRING(25),
            allowNull: true,
            comment: "ชื่อบริษัทแบบย่อ",
        },
        created_by: {
            type: DataTypes.STRING(50),
            allowNull: true,
            comment: "สร้างโดย",
        },
        updated_by: {
            type: DataTypes.STRING(255),
            allowNull: true,
            comment: "แก้ไขโดย",
        }
    }, {
        sequelize,
        tableName: 'employee',
        timestamps: true,
        underscored: true,
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