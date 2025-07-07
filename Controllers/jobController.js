const jobs = require("../usermodel/jobModel");

exports.addjobController = async (req, res) => {

    console.log("=== HEADERS ===", req.headers);
    console.log("=== BODY RAW ===", req.body);

    if (!req.body || typeof req.body !== 'object') {
        return res.status(400).json({ error: "Invalid or missing body" });
    }

    const { title, location, jtype, salary, qualification, experience, description } = req.body;

    // If title is undefined here, it's a body-parsing issue
    console.log(title, location, jtype, salary, qualification, experience, description);

    try {
        const existingJob = await jobs.findOne({ title, location });

        if (existingJob) {
            return res.status(400).json({ message: 'Job already exists' });
        }

        const newJob = new jobs({
            title,
            location,
            jtype,
            salary,
            qualification,
            experience,
            description
        });

        await newJob.save();
        res.status(201).json(newJob);

    } catch (error) {
        console.error("🔥 ERROR in addjobController:", error);
        return res.status(500).json({
            message: "Server Error",
            error: error.message || error
        });
    }
}

//to get all jobs
exports.getAllJobController = async(req,res)=>{

    const Searchkey = req.query.search
    console.log(Searchkey);
    
    try{

        const AllJobs = await jobs.find({title:{$regex:Searchkey,$options:"i"}})
        res.status(200).json(AllJobs)

    }catch(error){
        res.status(500).json(error)
    }
}

//delete a job
exports.deleteAJobController = async(req,res)=>{

    const {id} = req.params

    try{

        await jobs.findByIdAndDelete({_id:id})
        res.status(200).json('delete successfull')


    }catch(error){

        res.status(500).json(error)
        
    }
}