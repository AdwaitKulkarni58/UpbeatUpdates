var express = require("express");
var router = express.Router();
var bcrypt = require("bcrypt");
var mongoose = require("mongoose");
require("dotenv").config();

const connect = () => {
  try {
    mongoose.connect(process.env.DATABASE_URL);
    console.log("Connected to the database");
  } catch (err) {
    console.log(err);
  }
};

connect();

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  savedArticles: [
    {
      title: {
        type: String,
        required: true,
      },
      description: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
      source: {
        type: String,
        required: true,
      },
    },
    {
      _id: true,
    },
  ],
});

const User = mongoose.model("User", userSchema);

/* GET users listing. */
router.get("/", function (req, res) {
  res.send("respond with a resource");
});

/* POST user login. */
router.post("/login", async function (req, res) {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email: email });

    if (user) {
      const match = await bcrypt.compare(password, user.password);
      if (!match) {
        return res.status(400).json({ msg: "Invalid Credentials" });
      }
      res.send("Login successful");
    } else {
      const salt = await bcrypt.genSalt(10);
      const pass = await bcrypt.hash(password, salt);

      const newUser = new User({
        email: email,
        password: pass,
      });

      newUser.save();
      res.send(`Registration successful for ${email}`);
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

/* PUT email and password */
router.put("/:email", async (req, res) => {
  const { email, password } = req.body;
  const { email: oldEmail } = req.params;

  try {
    const user = await User.findOne({ email: oldEmail });

    if (user) {
      const salt = await bcrypt.genSalt(10);
      const pass = await bcrypt.hash(password, salt);

      user.email = email;
      user.password = pass;

      user.save();

      res.send(email);
    } else {
      res.status(400).json({ msg: "User not found" });
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

/* POST saved article */
router.post("/:email/articles", async (req, res) => {
  const { email } = req.params;
  const { article } = req.body;
  console.log(`Saving article for email: ${email}`);

  if (
    !article ||
    !article.title ||
    !article.description ||
    !article.url ||
    !article.source
  ) {
    return res.status(400).json({ msg: "Invalid article data" });
  }
  try {
    const user = await User.findOne({ email });
    user.savedArticles.push(article);
    await user.save();

    const savedArticle = user.savedArticles[user.savedArticles.length - 1];
    res.status(201).json({ article: savedArticle });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

/* GET saved articles */
router.get("/:email/articles", async (req, res) => {
  const { email } = req.params;
  try {
    const user = await User.findOne({ email: email });
    if (user) {
      res.status(200).json(user.savedArticles);
    } else {
      res.status(404).json({ msg: "User not found" });
    }
  } catch (err) {
    res.status(500).send("Server error");
  }
});

/* DELETE all saved articles */
router.delete("/:email/articles", async (req, res) => {
  const { email } = req.params;
  try {
    const user = await User.findOne({ email: email });
    if (user) {
      user.savedArticles = [];
      await user.save();
      res.status(200).json({ msg: "All articles deleted successfully" });
    } else {
      res.status(404).json({ msg: "User not found" });
    }
  } catch (err) {
    res.status(500).send("Server error");
  }
});

/* DELETE saved article */
router.delete("/:email/articles/:id", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.params.email });
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    // Find the index of the article to be deleted
    const articleIndex = user.savedArticles.findIndex(
      (article) => article._id.toString() === req.params.id
    );

    if (articleIndex === -1) {
      return res.status(404).json({ msg: "Article not found" });
    }

    user.savedArticles.splice(articleIndex, 1);

    await user.save();

    res.status(200).json({ msg: "Article deleted successfully" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

/* DELETE user account */
router.delete("/:email", async (req, res) => {
  const { email } = req.params;
  try {
    await User.deleteOne({ email: email });
    res.send(`Account for ${email} deleted successfully`);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;
