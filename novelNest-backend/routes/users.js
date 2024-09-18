const express = require('express');

const router = express.Router();

/* GET users listing. */
router.get('/users', function(req, res, next) {
	res.send('respond with users list');
});

// Routes
/* router.post('/login', (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) throw err;
    if (!user) res.status(400).json('No User Exists');
    else {
      req.logIn(user, (err) => {
        if (err) throw err;
        res.json({ ...user.toObject(), password: '' });
      });
    }
  })(req, res, next);
}); */

/* router.post('/registerwithoutlogin', isAuthenticated, isAdmin, (req, res) => {
  let newUser;
  try {
    User.findOne({ email: req.body.email }, async (err, doc) => {
      if (err) throw err;
      if (doc) {
        res.status(400).json('User already exists');
      }
      if (!doc) {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        req.body.password = hashedPassword;
        if (req.body.firstname)
          req.body.firstname = _.upperFirst(req.body.firstname);
        if (req.body.lastname)
          req.body.lastname = _.upperFirst(req.body.lastname);
        newUser = new User({
          ...req.body,
        });
        await newUser.save();
        res.status(200).json('successful');
      }
    });
  } catch (e) {
    console.log(e);
    res.status(400).json({ error: 'Unsuccessful' });
  }
});

router.post('/signup', isAuthenticated, isAdmin, (req, res) => {
  let newUser;
  try {
    User.findOne({ email: req.body.email }, async (err, doc) => {
      if (err) throw err;
      if (doc) {
        res.status(400).json('User already exists');
      }
      if (!doc) {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        req.body.password = hashedPassword;

        newUser = new User({
          ...req.body,
        });
        await newUser.save();
        res.status(200).json('successful');
      }
    });
  } catch (e) {
    console.log(e);
    res.status(400).json({ error: 'Unsuccessful' });
  }
});

router.get('/details', isAuthenticated, (req, res) => {
  res.send({
    ...req.user.toObject(),
    password: '',
  }); // The req.user stores the entire user that has been authenticated inside of it.
});

router.get('/logout', isAuthenticated, (req, res) => {
  req.logout();
  res.json('logged out');
});

router.post('/updateprofile', isAuthenticated, async (req, res) => {
  if (req.body.email || req.body.role || req.body.admin || req.body._id) {
    res.status(500).json('Invalid Operation!');
  }
  if (req.body.password) {
    req.body.password = await bcrypt.hash(req.body.password, 10);
    req.body.passwordupdated = true;
  }
  try {
    await User.updateOne({ _id: req.user._id }, { ...req.body });
  } catch (err) {
    res.status(404).send(err);
  }
  res.status(200).json('Data updated');
}); */

module.exports = router;
