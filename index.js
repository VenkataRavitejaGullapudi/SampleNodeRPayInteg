const express = require("express");
const Razorpay = require("razorpay")

const app = express();
app.use(express.static("./public"))
app.use(express.json());

app.get("/",(req,res)=>{
    res.render("index.html")
})

app.post("/order", async (req, res) => {
  const amount = req.body.amount;

  var instance = new Razorpay({
    key_id: "rzp_test_FzRvyF57OPWLEm",
    key_secret: "i9SmxlevrDo7K9WSSw9xYezv",
  });
  console.log("amount",amount)
  const myOrder = await instance.orders.create({
    amount: amount * 100,
    currency: "INR",
    receipt: "receipt#1",
    notes: {
      key1: "value3",
      key2: "value2",
    },
  });

  res.status(200).json({
      success:true,
      amount,
      order:myOrder
  })
});

app.listen("4000", () => {
  console.log("App is live at 4000");
});
