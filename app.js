const express = require("express");
const app = express();
const axios = require("axios").default;

require("dotenv").config();

// config
app.use(express.static(__dirname + "/public"))
app.use(express.urlencoded({extended: true}));

// mongoose.connect(process.env.DATABASE_LINK, {
// 	useNewUrlParser: true,
// 	useCreateIndex: true,
// 	useUnifiedTopology: true
// }).then(()=>{
// 	console.log("connected to DB!")
// }).catch(err => {
// 	console.log("Error", err.message)
// })

const sendinblue = axios.create({
  baseURL: "https://api.sendinblue.com/v3",
  headers: {
    "api-key": process.env.SENDINBLUE_API_KEY,
  },
  timeout: 15000,
});

// app.set("view engine", "ejs");
// app.use(methodOverride('_method'));



// passport & connect-flash config
// app.use(require("express-session")({
//     secret: "good",
//     resave: false,
//     saveUninitialized: false
//   }))
  
//   // flash config
//   app.use(flash());
  
//   app.use(passport.initialize());
//   app.use(passport.session());
//   passport.use(new LocalStrategy(User.authenticate()));
//   passport.serializeUser(User.serializeUser());
//   passport.deserializeUser(User.deserializeUser())
//   // ********************
  
//   // Passing global Values Into Routes
//   app.use(function(req, res, next){
//     res.locals.currentUser = req.user;
//     res.locals.success = req.flash("success");
//     res.locals.error = req.flash("error");
//     next();
//   });

// route handlers


app.post("/order", (req, res) => {
  // const contactEmail = req.sanitize(req.body.contactEmail);
  // const contactName = req.sanitize(req.body.contactName);
  // const contactMessage = req.sanitize(req.body.contactMessage);
  // const contactSubject = req.sanitize(req.body.contactSubject);
  const customerName = req.body.fullname;
  const customerPhone = req.body.customerPhoneNumber;
  const customerEmail = req.body.customerEmail;
  const pickupAddress = req.body.pickupAddress;
  const deliveryAddress = req.body.deliveryAddress;

  res.sendFile(__dirname + "/public/confirmation.html");
  sendinblue
    .post("/smtp/email", {
      sender: {
        name: "E-Laundromat",
        email: "elaudromatlaundry@gmail.com",
      },
      to: [{ email: customerEmail }],
      htmlContent: `<h3>Order Confirmation</h3><p> Your order has been recieved and is being processed. Thank You for washing with E-Laudromat. A pickup person would be with you within 2 hours</p>`,
      textContent: `Your order has been received and is being processed. Thank You for washing with E-Laudromat`,
      subject: "Order Confirmation",
      replyTo: { email: "elaudromatlaundry@gmail.com", name: "E-laundromat" },
    })
    .then(() => {
      sendinblue
      .post("/smtp/email", {
      sender: {
        name: "E-Laudromart Customer",
        email: "elaudromatlaundry@gmail.com",
      },
      to: [{ email: "elaudromatlaundry@gmail.com" }],
      htmlContent: `<h2>Order Made</h2><p> An Order has been made on the E-Laundromat Platform</p>
      <div>
      <h4>Order Details</h4>
      <p>Client name : ${customerName}</p>
      <p>Phone Number : ${customerPhone}</p>
      <p>Email : ${customerEmail}</p>
      <p>Delivery Adress: ${pickupAddress}</p>
      <P>Pickup Adress ${deliveryAddress}</P>
      </div>`,
      textContent: ` An Order has been made on the E-Laundromat Platform`,
      subject: "Order Made",
      replyTo: { email: customerEmail, name: "E-laudromart Client" },
    })
      // req.flash(
      //   "success",
      //   "Your message has been sent, we will get back to you shortly."
      // );
      // res.redirect("/contact");
    })
    .catch((error) => {
      // req.flash(
      //   "error",
      //   "Error: Your message failed to send!! Please try again later."
      // );
      // res.redirect("/contact");
      console.log(error);
    });
});

let sendMail = ()=>{
  sendinblue
    .post("/smtp/email", {
      sender: {
        name: "E-Laudromart",
        email: "elaudromart@gmail.com",
      },
      to: [{ email: 'oladejiabdullah17@gmail.com' }],
      htmlContent: `<h3>Order Confirmation</h3><p>Goodday, Your order has been recieved and is being processed</p>`,
      textContent: `Goodday, Your order has been recieved and is being processed`,
      subject: "No subject",
      replyTo: { email: "elaudromatlaundry@gmail.com", name: 'E-laudromart' },
    }).then(()=>{
      console.log("function executed")
    }).catch((error)=>{
      console.log(error.request)
    })
}

// sendMail()

// Server starter
let serverPort = process.env.PORT || 8081

app.listen(serverPort, ()=>{
    console.log(`system is running on ${serverPort}`)
})

