const express = require("express"),
	  router = express.Router(),
	  passport = require("passport"),
	  {fresher, sop, senior, junior, User} = require("../models/model.js"),
	  middle = require("../middleware/middle.js");


router.get("/template", (req, res)=>{
	res.render("template")
})

router.get("/", (req, res)=>{
	res.render("index")
})

router.get("/fresher", (req, res)=>{
	fresher.find({}, (err, courses)=>{
		if(err){
			console.log(err.message)
			res.redirect("/")
			return
		}
		
		res.render("courses/fresher/index", {course:courses, level:"100"})
	})
	
})

router.get("/sop", (req, res)=>{
	sop.find({}, (err, courses)=>{
		if(err){
			console.log(err.message)
			res.redirect("/")
			return
		}
		
		res.render("courses/fresher/index", {course:courses, level:"200"})
	})
	
})

router.get("/junior", (req, res)=>{
	junior.find({}, (err, courses)=>{
		if(err){
			console.log(err.message)
			res.redirect("/")
			return
		}
		
		res.render("courses/fresher/index", {course:courses, level:"300"})
	})
	
})

router.get("/senior", (req, res)=>{
	senior.find({}, (err, courses)=>{
		if(err){
			console.log(err.message)
			res.redirect("/")
			return
		}
		
		res.render("courses/fresher/index", {course:courses, level:"400"})
	})
	
})

// profile route
router.get("/profile", middle.isLoggedIn, (req, res)=>{
	res.render("profile/index")
})


// login form
router.get("/login", (req, res)=>{
	res.render("login")
})
// login logic
router.post("/login", passport.authenticate("local", 
{
    successRedirect: "/",
    failureRedirect: "/login",
    failureFlash: true,
    successFlash: `Welcome Back`
}), (req, res) => {
});
// **********************

// signup form
router.get("/signup", (req, res)=>{
	res.render("usernew")
})
// signup logic
router.post("/signup", middle.verifyMatric, (req, res)=>{
	const newUser = new User({username: req.body.username});
    newUser.firstname = req.body.firstname;
	newUser.lastname = req.body.lastname;
	newUser.matric = req.body.matric;
	newUser.phone = req.body.phone;
    User.register(newUser, req.body.password, (err, user)=>{
        if(err){
            console.log(err);
            return res.render("usernew", {error: err.message});
        }
		
        passport.authenticate("local")(req, res, function(){
           req.flash("success", "Account Successfully Created! Nice to meet you " + req.body.firstname);
           res.redirect("/"); 
        });
    });
})

// logout logic
router.get("/logout", (req, res) => {
    req.logout();
    req.flash("success", "Successfully Signed Out! See You Later");
    res.redirect("/");
});


module.exports = router;



