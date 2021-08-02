require('dotenv').config();
const mongoose  = require("mongoose");
const mySecret = process.env['MONGO_URI'];
const { Schema } = mongoose;

mongoose.connect(mySecret,{ useNewUrlParser: true, useUnifiedTopology:true});
 
const personSchema = new Schema({
  name: String,
  age: Number,
  favoriteFoods: [String],
})

let Person = mongoose.model('person', personSchema);

// instantiate an array, testing methods. 
let arrayOfPeople = [
  { name: "Colin", age: 28, favoriteFoods: ["chinese", "mexican"] },
  { name: "Breez", age: 28, favoriteFoods: ["Chick-Fil-A", "Mac-n-Cheese"] },
  { name: "Levi", age: 28, favoriteFoods: ["hamburger", "Hot Dogs"] },
];

//instantiate a hard coded variable to create a new person using the 
// above schema and modeling. 

const createAndSavePerson = (done) => {
  let colin = new Person({
    name: "Colin",
    age: 28,
    favoriteFoods: ["pasta", "soup"]
  })
  //taking the variable, and calling the built in method, Save()
  colin.save(function (err, data) {
    if (err) {
      return console.error(err);
    }
    return done(null, data);
  })
};


//Create allows for a multitude of objects to be created using one array
// instead of using array.map(), create will automatically handle the request

const createManyPeople = (arrayOfPeople, done) => {
  Person.create(arrayOfPeople, function (err, data) {
    if (err) {
      console.error(err)
    }
    return done(null, data)
  })
  
};

// Find is a handy tool, using find with the specific target 
// and target name would work.
const findPeopleByName = (personName, done) => {
  Person.find({ name: personName }, function (err, data) {
    if (err) {
      console.err(err)
    }
    return done(null, data)
  })

};

const findOneByFood = (food, done) => {

  //using $in operator in Mongo to access elements inside of an array.
  // Object key: {operator: Item to find}
// FCC Solution: 
  // var findOneByFood = function(food, done) {
  // Person.findOne({favoriteFoods: food}, function (err, data) {
  //   if (err) return console.log(err);
  //   done(null, data);

  Person.findOne({ favoriteFoods: { $in: [food] } },
    function (err, data) {
    if (err) {
      return console.error(err);
    }
    return done(null, data);
  });
};

// Similar feature as the previous one, _id is a specific instance
// for each object in a database in MongoDB. Matching the instance with
// the original key works well in this instance. 
const findPersonById = (personId, done) => {
  Person.findOne({ _id: personId }, function (err, data) {
    if (err) {
      console.error(err);
    }
    return done(null, data);
  });
};

const findEditThenSave = (personId, done) => {
  
  const foodToAdd = "hamburger";
  // use the findbyID method on the schema to locate person,
  // return the data as a variable called person. 
  Person.findById(personId, (err, person) => {
    if (err) console.error(err);

    // Edit the array with pushing the new value
    person.favoriteFoods.push(foodToAdd);
    // Save and update the person, passing in the data as New Person. 
    person.save((err, updatedPerson) => {
      if (err) console.error(err);
      return done(null, updatedPerson)
    })
  })
};

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;

  done(null /*, data*/);
};

const removeById = (personId, done) => {
  done(null /*, data*/);
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";

  done(null /*, data*/);
};

const queryChain = (done) => {
  const foodToSearch = "burrito";

  done(null /*, data*/);
};

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
