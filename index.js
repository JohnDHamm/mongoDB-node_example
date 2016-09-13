'use strict';

const { MongoClient } = require('mongodb');

const MONGODB_URL = 'mongodb://localhost:27017/test';

const [,,...args] = process.argv;

const name = RegExp(`^${args.join(' ')}`, 'i') // 'i' is case insensitive

MongoClient
	.connect(MONGODB_URL) // returns a promise
	.then (db => {
		db.collection('restaurants')
			.find({name}) // es6 same as {name: name}
			.sort({name: 1})
			.toArray() // promise
			.then((restaurants) => {
				restaurants.forEach(restaurant => {
					if (restaurant.name) {
						console.log(`${restaurant.name} ${restaurant.address.building} ${restaurant.address.street}`)
					}
				})
			})
			.then(() => db.close())

		// .forEach((restaurant) => {  //could do something with each iteration as it comes in
		// 	console.log(restaurant)
		// },
		// 	() => db.close()
		// )


	})
	.catch(console.error) //if mongod server not running

