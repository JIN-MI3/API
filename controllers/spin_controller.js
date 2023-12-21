const multer = require('multer');
const xlsx = require('xlsx');

const { QueryTypes } = require("sequelize");
const sequelize = require("../configs/connect_database");
const { master_prize,  spin_transaction, employee } = require("../models")
const { OP } = require("sequelize");

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });


exports.getStart = async (req, res) => {
    data = {
        name: "make",
        age: 25
    };

    return res.status(200).json({
        status: true,
        data: data,
        message: "Welcome to Spin BKS API!!",
    });
    
    /* 
        หลักการ response API
        1. จะต้องบอก status code --> HTTP CODE
        2. จะต้องบอก status --> true or false
            - เพราะว่าบางครั้ง เงื่อนไขที่ใช้งานถึงจะ error แต่เป็น จริง
            - ส่วน false ใช้สำหรับที่เป็นเงื่อนไขจริงๆ
    */

};

exports.uploadList = upload.single('excelFile');

exports.processUpload = async (req, res, next) => {
    try {
        console.log(req.file);

        // Check if a file was uploaded
        if (!req.file) {
            return res.status(400).json({
            status: false,
            message: 'No file uploaded.',
            });
        }


        // Parse the uploaded Excel file
        const workbook = xlsx.read(req.file.buffer, { type: 'buffer' });

        // Assume the data is in the first sheet
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];

        // Convert sheet data to JSON
        const jsonData = xlsx.utils.sheet_to_json(sheet);

        //Truncate Table
        await employee.destroy({
            truncate: true,
            cascade: false,
        })
        .then(() => {
            // Process each row in the JSON data
            jsonData.forEach(row => {
                const empId = row.emp_id;
                const firstName = row.fname;
                const lastName = row.lname;
                const division = row.division;
                const location = row.location;
                const company_name = row.company_name;
                const company_short = row.company_short;


                //Insert data to table
                // console.log(`Emp ID: ${empId}, First Name: ${firstName}, Last Name: ${lastName}, Division: ${division}, Location: ${location}`);

                employee.create({
                    emp_id: empId,
                    first_name: firstName,
                    last_name: lastName,
                    division: division,
                    location: location,
                    company_name: company_name,
                    // company_short: company_short,
                    created_by: "admin",
                })
            });
        })
        .catch((error) => {
            next(error)
        });


        return res.status(200).json({
            status: true,
            message: "File uploaded and processed successfully.",
        });

    } catch (error) {
        next(error)
    }
    
};

exports.getPrizelist = async (req, res, next) => {
    try {
        let { page, size } = req.query
        
        page = parseInt(page) || 1;
        size = parseInt(size) || 10;

        const offset = (page - 1) * size;

        const payload = await master_prize.findAndCountAll({
            raw: true,
            limit: size,
            offset: offset,
        });

        const totalItems = payload.count;
        const totalPages = Math.ceil(totalItems / size);
        const nextPages = page < totalPages;

        return res.status(200).json({
            status: true,
            data: payload.rows,
            currentPage: page,
            totalItems: totalItems,
            totalPages: totalPages,
            nextPages,
            message: "get success",
        });

    } catch (error) {
        next(error);
    }
};

