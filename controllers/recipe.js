const Recipe = require('./../models/recipe')
const moment = require('moment')

exports.create = (userId, recipe, callback) => { 
    console.log(recipe)
    recipe._user = userId
    let newRecipe = new Recipe(recipe)
    newRecipe._createdAt = moment()
    newRecipe.save((err) => {
        callback(err, 'new recipe saved')
    
    })  
}

exports.find = (object, callback) => {
    // console.log(object)
    if (object.filter) {
        object.filter = JSON.parse(object.filter)
    }
    if (object.sort) {
        object.sort = JSON.parse(object.sort)
    }
    let filter = object.filter
    let sort = object.sort
    let select = object.select
    Recipe
    .find(filter)
    .select(select)
    .sort(sort)
    .exec((err, foods) => {
        console.log(foods)
        callback(err, foods)
    })
}

 
exports.update = (recipeId, newFields, callback)  => {
    Recipe.findOne({ _id: recipeId}, (err, recipe) => {
        // console.log(user)
        recipe.set(newFields)
        recipe.save((err) => {
            // console.log(user) 
           console.log('Recipe successfully updated !')
           callback(err)
       })
    })

}

exports.delete = (recipeId, callback) => {
// console.log(userId)
    if (!recipeId) {
        return callback('right field necessary')
    }
    Recipe.findOne({  _id: recipeId }, (err, recipe) => { 
        recipe.remove((err) => {
            callback(err)
            console.log('recipe removed')
            
        })
    })  
}

