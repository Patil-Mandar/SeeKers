const mongoose = require('mongoose')
const Profile = require('../models/profile')
const Job = require('../models/job')
const listOfData = require('./seedHelper')

mongoose.connect('mongodb://localhost:27017/JobRecommendationSystem')
    .then(data => console.log('Database connected'))
    .catch(err => console.log('Database connection failed'))

function getRandomSubarray(arr, size) {
    var shuffled = arr.slice(0), i = arr.length, min = i - size, temp, index;
    while (i-- > min) {
        index = Math.floor((i + 1) * Math.random());
        temp = shuffled[index];
        shuffled[index] = shuffled[i];
        shuffled[i] = temp;
    }
    return shuffled.slice(min);
}

const seedDB = async () => {
    // await Profile.deleteMany({})
    await Job
    .deleteMany({})

    for(let i=0;i<10000;i++){
    //     let prof = new Profile({
    //         id:i,
    //         name:'Maruti Patil',
    //         mailID:'mandar@patil.org',
    //         gender: getRandomSubarray(listOfData.genders,1)[0],
    //         age:18 + Math.floor(Math.random() *20),
    //         degree: getRandomSubarray(listOfData.degrees,1)[0],
    //         major:getRandomSubarray(listOfData.majors,1)[0],
    //         jobExperience: Math.floor(Math.random() * 5),
    //         skills:getRandomSubarray(listOfData.skills,5+Math.floor(Math.random() * 9)),
    //         college:getRandomSubarray(listOfData.colleges,1)[0],
    //         currentLocation:getRandomSubarray(listOfData.locations,1)[0],
    //         jobHistory: [1,2]
    //     })
    //     // await prof.save()
        let job = new Job({
            id:i,
            company:getRandomSubarray(listOfData.companies,1)[0],
            jobTitle:'Junior Software Developer Intern',
            category:getRandomSubarray(listOfData.categories,1)[0],
            type:getRandomSubarray(listOfData.types,1)[0],
            mode:getRandomSubarray(listOfData.modes,1)[0],
            salary:10000 + 10000*Math.floor(Math.random() * 5),
            minAge:18 + Math.floor(Math.random() * 2),
            minExperience:Math.floor(Math.random() * 2),
            reqDegree:getRandomSubarray(listOfData.degrees,5 + Math.floor(Math.random() * 3)),
            reqMajor:getRandomSubarray(listOfData.majors,5 + Math.floor(Math.random() * 4)),
            reqSkills:getRandomSubarray(listOfData.skills,1 + Math.floor(Math.random() * 1)),
            goodToHaveSkills:getRandomSubarray(listOfData.skills,1 + Math.floor(Math.random() * 7)),
            location:getRandomSubarray(listOfData.locations,1)[0]
        })
        await job.save()
    }
    console.log('done')
}

seedDB()