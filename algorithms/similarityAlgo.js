const cosineSimilarity = require('simple-cosine-similarity') //for string similarity
const similarity = require('cosine-similarity') //for numeric similarity


//finds similarity between 2 users
const userSimilarity = (user1, user2) => {
  let totalSimilarity = 0

  //similarity between string type factor
  let stringFactors = ['gender', 'degree', 'major', 'college', 'currentLocation']
  for (let factor of stringFactors) {
    totalSimilarity += cosineSimilarity(user1[factor], user2[factor])
    //think about the 3rd arg
  }
  totalSimilarity += cosineSimilarity(
    user1.skills.join(' '),
    user2.skills.join(' ')
  )

  //similarity between integer type factor
  totalSimilarity += similarity(
    Object.assign({}, [user1['age'], ...user1['jobHistory']]),
    Object.assign({}, [user2['age'], ...user2['jobHistory']])
  )


  //average similarity
  return totalSimilarity / 7
}

//finds similarity between 2 jobs
const jobSimilarity = (job1, job2) => {
  let totalSimilarity = 0

  //similarity between string type factor
  let stringFactors = ['company', 'category', 'type', 'mode', 'location']
  for (let factor of stringFactors) {
    totalSimilarity += cosineSimilarity(job1[factor], job2[factor])
    //here too
  }
  for (let factor of ['reqDegree', 'reqMajor', 'reqSkills', 'goodToHaveSkills']) {
    totalSimilarity += cosineSimilarity(
      job1[factor].join(' '),
      job2[factor].join(' ')
    )
  }

  //similarity between integer type factor
  totalSimilarity += similarity(
    Object.assign({}, [job1['salary'], job1['minAge'], job1['minExperience']]),
    Object.assign({}, [job2['salary'], job2['minAge'], job2['minExperience']])
  )

  //average similarity
  return totalSimilarity / 10
}

//find similarity between user and job
const userJobSimilarity = (user, job) => {
  let totalSimilarity = 0
  totalSimilarity += cosineSimilarity(
    job.goodToHaveSkills.join(' ') + job.reqSkills.join(' '),
    user.skills.join(' ')
  )
  totalSimilarity += cosineSimilarity(job.location, user.currentLocation)

  return totalSimilarity / 2
}



module.exports.similarity = { userSimilarity, jobSimilarity, userJobSimilarity }