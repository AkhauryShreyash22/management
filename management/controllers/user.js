const user = require("../models/user.js");


async function add_user (req, res) {
    console.log(req.body);

    var params = req.body;

    var first_name = params.first_name;
    var last_name  = params.last_name;
    var email      = params.email;
    var mobile     = params.mobile;
    var password   = params.password;
    var rep_password = params.rep_password;
    var apiresponse;
    var openapi_response;
    try {
        if (!email) {
            throw new Error('Email is required')
        }
        if (!mobile) {
            throw new Error("Mobile is required");
        }

        if (password != rep_password) {
            throw new Error("Password and repeat password are not same");
        }

        const result = await user.create({
            'first_name': first_name,
            'last_name': last_name,
            'email': email,
            'mobile': mobile,
            'password': password
        });

        console.log(result._id)

        apiresponse = {
            'code' : "0000",
            'type'  : "OK",
            'severity' :"INFO",
            'message' : "Operation Completed Succesfully",
        };

        openapi_response = {'apiresponse': apiresponse};

    } catch (err) {
        var error = err.toString();
        error = error.replace("Error", "");
        apiresponse = {
            'code' : "0000",
            'type'  : "ERROR",
            'severity' :"ERROR",
            'message' : error
        };

        openapi_response = {'apiresponse': apiresponse};
    };

    return res.json(openapi_response);
}

async function list_user (req, res) {
    console.log(req.query);

    var params = req.query;

    var user_id = params.user_id;

    console.log(user_id)

    var apiresponse;
    var openapi_response;

    try {
        var user_list;
        if (user_id) {
            user_list = await user.findById(user_id);
        }
        if (!user_id) {
            user_list = await user.find({});
        }

        if (!user_list) {
            throw new Error("User Not Found");
        }
        apiresponse = {
            'code' : "0000",
            'type'  : "OK",
            'severity' :"INFO",
            'message' : "Operation Completed Succesfully",
        };

        openapi_response = {'apiresponse': apiresponse, 'user': user_list};        
    } catch (err) {
        var error = err.toString();
        error = error.replace("Error", "");
        apiresponse = {
            'code' : "0000",
            'type'  : "ERROR",
            'severity' :"ERROR",
            'message' : error
        };

        openapi_response = {'apiresponse': apiresponse};
    };

    return res.json(openapi_response);
}

async function delete_user (req, res) {
    var params = req.query;

    var id = params.id;

    var apiresponse;
    var openapi_response;

    try {
        if (!id) {
            throw new Error("Please specify Id");
        }
        await user.findByIdAndDelete(id);
        
        apiresponse = {
            'code' : "0000",
            'type'  : "OK",
            'severity' :"INFO",
            'message' : "Operation Completed Succesfully",
        };

        openapi_response = {'apiresponse': apiresponse};
    } catch (err) {
        var error = err.toString();
        error = error.replace("Error", "");
        apiresponse = {
            'code' : "0000",
            'type'  : "ERROR",
            'severity' :"ERROR",
            'message' : error
        };

        openapi_response = {'apiresponse': apiresponse};
    };

    return res.json(openapi_response);
}

module.exports = {
    add_user,
    list_user,
    delete_user
}