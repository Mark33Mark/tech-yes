const router = require('express').Router();
const { Comment, Post, User } = require('../models');
const withAuth = require('../utilities/auth');



router.get('/', async (req, res) => {
  try {
    // Get all projects and JOIN with user data
    const postData = await Post.findAll({
      attributes: 
      [
          "id",
          "post",
          "title",
          "updated_at",
      ],
      include: 
      [
        {
          model: User,
          attributes: ['name'],
        },
        {
          model: Comment,
          attributes: 
          [
            "post_id",
          ]
        },
      ],
    });

    // Serialize data so the template can read it
    const posts = postData.map((post) => post.get({ plain: true }));
    
    // Pass serialized data and session flag into template
    res.render('homepage', { 
      posts, 
      logged_in: req.session.logged_in,
    });

  } catch (err) {
    res.status(500).json(err);
  }
});



router.get('/dashboard', withAuth, async (req, res) => {
  try {
    const userData = await User.findAll({
      where: 
      { 
        id:req.session.user_id, 
      },
      attributes: 
      { 
        exclude: ['password'] 
      },
      include: 
      [
        {model: Post,
          attributes:
          [
            "id",
            "post",
            "title",
            "updated_at"
          ],
        },
      ]
    });

    let user = userData.map(( post ) => post.get({ plain: true }));
    user = user[0];

    res.render( "user-post", { 
      user, 
      layout: "dashboard",
      logged_in: req.session.logged_in,
    });

  } catch (err) {
    res.status(500).json(err);
  }
});



router.get('/login', (req, res) => {

  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/dashboard');
    return;
  }

  res.render('login');
});



router.get('/join', (req, res) => {

  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/dashboard');
    return;
  }

  res.render('join');
});

module.exports = router;
