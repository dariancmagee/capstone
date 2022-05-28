const router = require("express").Router();
const jsonwebtoken = require('jsonwebtoken');
const { User, validate } = require("../models/user");
const Favorites = require("../models/userFavorites");
const bcrypt = require("bcrypt");

router.post("/", async (req, res) => {
	try {
		const { error } = validate(req.body);
		if (error)
			return res.status(400).send({ message: error.details[0].message });

		const user = await User.findOne({ email: req.body.email });
		if (user)
			return res
				.status(409)
				.send({ message: "User with given email already Exist!" });

		const salt = await bcrypt.genSalt(Number(process.env.SALT));
		const hashPassword = await bcrypt.hash(req.body.password, salt);

		await new User({ ...req.body, password: hashPassword }).save();
		res.status(201).send({ message: "User created successfully" });
	} catch (error) {
		res.status(500).send({ message: "Internal Server Error" });
	}
});


router.post('/favorites/', async (req, res) => {
 try {
	 const {token} = req.body;
	 console.log(token);
	const decoded = jsonwebtoken.verify(token, process.env.JWTPRIVATEKEY);
	 const favorites = await Favorites.find({id: decoded._id});
	 res.send(favorites);
 } catch (error) {
	 console.log(error);
	 res.status(400).send();
 }
});
router.post('/addtoFavorites', async (req, res) => {
try {
	console.log(req.body)
	console.log(process.env.JWTPRIVATEKEY);
	const {id, equipment, token, photo, bodyPart} = req.body;
	const decoded = jsonwebtoken.verify(token, process.env.JWTPRIVATEKEY);
	
	const user = await User.findOne({_id: decoded._id });
		if (user) {
			console.log({user})
		}
	console.log({decoded});
	let favoritesAdded = [];
	const addedFavorites = await Favorites.findOne({id: decoded._id});
	favoritesAdded  = addedFavorites?.favorites || [];
	if(!addedFavorites) {
		const favorites = new Favorites({
			id: decoded._id,
			favorites:  [...favoritesAdded, {id, photo, bodyPart, equipment}]
		})
		await favorites.save();
		res.send(favorites);
	} else {
		addedFavorites.favorites = [...favoritesAdded, {id, photo, bodyPart, equipment}];
		await addedFavorites.save();
		res.send(addedFavorites);
	}
} catch (error) {
	console.log(error);
}
})

module.exports = router;
