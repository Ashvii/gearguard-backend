const breakdown = require("../usermodel/breakdownModel");
const users = require("../usermodel/userModel");
const jwt = require("jsonwebtoken")

//register
exports.registerController = async (req, res) => {

    //logic
    const { username, email, password } = req.body
    console.log(username, email, password);

    try {

        const existingUser = await users.findOne({ email })


        if (existingUser) {
            res.status(400).json('Already user Exist')
        }
        else {
            const newUser = new users({

                username,
                email,
                password,

            })
            await newUser.save()
            res.status(200).json(newUser)

        }

    } catch (error) {
        res.status(500).json(error)
    }


}

//login
exports.loginController = async (req, res) => {

    const { email, password } = req.body
    console.log(email, password);

    try {

        const existingUser = await users.findOne({ email })

        if (existingUser) {

            if (existingUser.password == password) {

                const token = jwt.sign({ userMail: existingUser.email },process.env.secret)

                res.status(200).json({ existingUser, token })

            } else {

                res.status(401).json("incorrect email or password")

            }

        } else {

            res.status(404).json("incorrect email or password")

        }

    } catch (error) {

        res.status(500).json(error)

    }

}

//complaint


exports.breakdownController = async (req, res) => {


    const { fname, lname, email, phone, message } = req.body;
    console.log(fname, lname, email, phone, message);

    try {
        const existingUser = await users.findOne({ email });

        if (!existingUser) {
            return res.status(404).json({ message: "User not found. Please register first." });
        }
        else {

            const newComplaint = new breakdown({
                fname,
                lname,
                email,
                phone,
                message, // added message field
                userId: existingUser._id,

            });

            await newComplaint.save();
            res.status(200).json(newComplaint);



        }


    } catch (error) {
        console.error("Breakdown complaint error:", error);
        res.status(500).json({ message: "Server error", error });
    }
};

//-------------------------------------------------- admin -------------------------------------------------------------------------------------

//get all complaints
exports.getAllComplaintsAdminController = async(req , res)=>{

    try {

        const allExistingComplaints = await breakdown.find()
        res.status(200).json(allExistingComplaints)

    } catch (error){

        res.status(500).json(error)

    }
}

exports.getAllUsersController =  async(req,res)=>{

    const email = req.payload
    console.log(email);
    

    try{
        
        const allusers = await users.find({email:{$ne:email}})
        res.status(200).json(allusers)

    } catch (error) {

        res.status(500).json(error)

    }
}