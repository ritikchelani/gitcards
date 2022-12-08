const router = require("express").Router();
const { User, validate } = require("../models/user");
const bcrypt = require("bcrypt");


router.get("/",(req,res)=>{
	User.find({})
	.then(r=>{
		res.status(200).json(r)
	})
	.catch(err=>{
		console.log(err);
		res.status(500).json({
			error: err
		});
	})
})

router.post("/", async (req, res) => {
	try {
		const { error } = validate(req.body);
		if (error)
			return res.status(400).send({ message: error.details[0].message });

		const UserAb = await User.findOne({ email: req.body.email });
		if (UserAb)
			return res.status(400).send({ message: "User with given email already Exist!" });

		const salt = await bcrypt.genSalt(Number(process.env.SALT));
		const hashPassword = await bcrypt.hash(req.body.password, salt);

		await new User({ ...req.body, password: hashPassword }).save();
		res.status(201).send({ message: "User created successfully" });
	} catch (error) {
		res.status(500).send({ message: "Internal Server Error" });
	}
});



module.exports = router;