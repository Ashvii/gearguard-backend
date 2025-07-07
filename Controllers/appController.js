const applications = require("../usermodel/appModel");

//add applications
exports.addapplicationContoller = async (req, res) => {

    const { fullname, jobtitle, qualification, email, phone, coverletter } = req.body

    console.log(fullname, jobtitle, qualification, email, phone, coverletter);

    const resume = req.file.filename
    console.log(resume);

    try {

        const existingApplication = await applications.findOne({jobtitle,email})

        if(existingApplication){
            res.status(400).json('already applied')
        }
        else{
            const  newApplicant = new applications({
               fullname, jobtitle, qualification, email, phone, coverletter,resume
            })
            await newApplicant.save()
            res.status(200).json(newApplicant)
        }


    }
    catch (error) {
        res.status(500).json(error)

    }
}


//request to get all application
exports.getAllApplicationController =  async(req,res)=>{

    try{

        const allapplication  = await applications.find()
        res.status(200).json(allapplication)

    }
    catch (error) {

        res.status(500).json(error)

    }
}