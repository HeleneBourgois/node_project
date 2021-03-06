const Food = require('./../models/food')
const moment = require('moment')


exports.create = (userId, food, callback) => { 
    food._user = userId
    let newFood = new Food(food)
    newFood._createdAt = moment()
    newFood.save((err) => {
        callback(err, 'new food saved')
    
    })  
}

exports.find = (filter, callback) => {
    
    Food
    .find(filter)
    .exec((err, foods) => {
        callback(err, foods)
    })
}
    

exports.update = (foodId, newFields, callback)  => {
    Food.findOne({ _id: foodId}, (err, food) => {
        // console.log(user)
        food.set(newFields)
        food.save((err) => {
            // console.log(user) 
           console.log('Food successfully updated !')
           callback(err)
       })
    })

}

exports.delete = (foodId, callback) => {
// console.log(userId)
    if (!foodId) {
        return callback('right field necessary')
    }
    Food.findOne({  _id: foodId }, (err, food) => { 
        food.remove((err) => {
            callback(err)
            console.log('user removed')
            
        })
    })  
}


