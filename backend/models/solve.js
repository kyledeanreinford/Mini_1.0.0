const mongoose = require("mongoose");

const url = process.env.MONGODB_URI;

console.log(`connecting to`, url);

mongoose
  .connect(url, {
    useUnifiedTopology: true,
    useCreateIndex: true,
    useNewUrlParser: true,
    useFindAndModify: false,
  })
  .then((result) => {
    console.log(`connected to MongoDB`);
  })
  .catch((err) => {
    console.log(err);
  });

const solveSchema = new mongoose.Schema({
  name: String,
  time: String,
  date: String,
});

solveSchema.set("toJSON", {
  transform: (document, returnedObj) => {
    returnedObj.id = returnedObj._id.toString();
    delete returnedObj._id;
    delete returnedObj.__v;
  },
});

module.exports = mongoose.model("Solve", solveSchema);
