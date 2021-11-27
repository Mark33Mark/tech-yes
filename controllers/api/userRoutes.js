const router = require('express').Router();
const { User } = require('../../models');
const fetch = require('fetch').fetchUrl;

router.post('/', async (req, res) => {
  try {
    const userData = await User.create(req.body);

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;

      res.status(200).json(userData);
    });
  } catch (err) {
    res.status(400).json(err);
  }
});



// Serve current Tech News to user when logged in to Dashboard 
// Needed to render current Tech news.
router.get('/key', ( req, res ) => {

  keyAPI = process.env.NEWS_API_KEY;
    
  // get date 7 days ago to parse into URL query.
  let currentDate = new Date();
  let pastDate = currentDate.getDate() - 7;

  currentDate.setDate(pastDate);

  let pDay    = currentDate.getDate(),
      pMonth  = currentDate.getMonth() + 1,
      pYear   = currentDate.getFullYear();


  fetch( 
    `https://newsapi.org/v2/everything?q=technology&from=${pYear}-${pMonth}-${pDay}&pageSize=50&sortBy=popularity&apiKey=${keyAPI}`, 
    function(error, meta, body)
      { 
        const data = body.toString(); 
        res.status(200).json( data ); 
      }
    );

  });

  

router.post('/login', async (req, res) => {
  try {
    const userData = await User.findOne({ where: { email: req.body.email } });

    if (!userData) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    const validPassword = await userData.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;
      
      res.json({ user: userData, message: 'You are now logged in!' });
    });

  } catch( err ) {
    res.status( 400 ).json( err );
  }
});

router.post('/logout', (req, res) => {
  
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;
