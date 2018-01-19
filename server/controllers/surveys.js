const mongoose = require('mongoose');
const Survey = mongoose.model('Survey');
const User = mongoose.model('User')

module.exports = {
	index: (request, response) => {
		Survey.find({})
			.then( surveys => {
				response.json(surveys);
			})
			.catch(console.log);
	},
	create: (request, response) => {
		console.log('About to make new Poll');

		let newSurvey = request.body;
		newSurvey._user = request.body.user._id
		console.log(newSurvey);
        Survey.create(newSurvey)
            .then( (survey) => {
                User.findById({_id: request.body.user._id})
                    .then((user) => {
                        user.surveys.push(survey)
                        user.save();
                    })
                response.json(survey);
                console.log('new survey!', survey);
            })
            .catch(error => console.log(error))
	},
	show: (request, response) => {
		Survey.find({}).populate('user').exec()
            .then( (surveys) => {
                response.json(surveys);
            })
            .catch(error => console.log(error))
	},
	getPoll : (request, response) => {

		Survey.findById(request.params.id)
            .then( (survey) => {
            	console.log('This is survey: ' + survey);
                response.json(survey);
            })
            .catch(error => console.log(error))
	},
	update: (request, response) => {
		Survey.findById(request.params.id)
	        .then( (survey) => {
				survey.pollOptions.id(request.body.idAns).vote = survey.pollOptions.id(request.body.idAns).vote + 1;
	            survey.save()
	            response.json(survey)
	        })
	        .then((saved)=>console.log(saved))
	        .catch(error => console.log(error))
	},
	destroy: (request, response) => {
		console.log('--- about to delete survey ---');
        Survey.findByIdAndRemove(request.params.id)
            .then(survey => {
                User.findById({_id: survey.user})
                    .then((user) => {
                        console.log('removing from bike array', user.surveys.indexOf(survey.id))
                        console.log('user', user)
                        console.log('survey', survey)
                        user.surveys.splice(user.surveys.indexOf(survey.id), 1);
                        user.save();
                    })
                response.json(survey)

            })
            .catch(error => console.log(error))
	}
};