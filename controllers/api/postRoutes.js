
const router = require('express').Router();
const { Post, User } = require('../../models');
const withAuth = require('../../utilities/auth');


router.get( "/", withAuth, async ( req, res ) => {
  try{
    const userName = await User.findOne({ 
      attributes:[ "name", ],
      where: 
      { 
        id: req.session.user_id,
      }
    });
  
  let user = userName.get({ plain: true });
  res.render( "new-post", 
  { 
    user,
    layout: "dashboard", 
    logged_in: req.session.logged_in,
  });
  } catch ( err ) {
    res.status(500).json(err);
  }

});



router.get( "/:id", withAuth, async ( req, res ) => {
  
  const postID = req.url.replace("/","");

  try{
    const postData = await Post.findOne({ 
      attributes:
      [
        "id",
        "post",
        "title",
        "updated_at"
      ],
      include:
      [
        {
          model: User,
          attributes: ['name'],
        },
      ],
      where: 
      { 
        id: postID, 
      }
    });

    let post = postData.get({ plain: true });

    res.render( "update-post", 
    { 
      post,
      layout: "dashboard",
      logged_in: req.session.logged_in,
  });

  } catch (err) {
    res.status(500).json(err);
  }

});

// OMG - I lost a lot of time working out 
// a solution here - the update would keep
// travelling through to catch(err). Solved it
// running console.log that showed me updatePost 
// returns an array.
router.put('/:id', withAuth, async (req, res) => {

  const postID = req.body.id;

  try {

    const [updatePost] = await Post.update( req.body,
      { where: { id: postID} 
    });

      if(updatePost > 0) {
        console.log("OK");
        res.status(200).end();
      } else {
        console.log("BAD");
        res.status(404).end();
      }

  } catch (err) {
    console.log("BAD ERROR");
    res.status(500).json(err);
  }
});



router.post('/', withAuth, async (req, res) => {
  try {
    const newProject = await Post.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(newProject);
  } catch (err) {
    res.status(400).json(err);
  }
});




router.delete('/:id',  withAuth, async (req, res) => {

  const postID = req.url.replace("/","");
  console.log("post ID = " + postID);

  try {
    const postData = await Post.destroy({
      where: {
        // id: req.params.id,
        id: postID,
      },
    });

    if (!postData) {
      res.status(404).json({ message: 'No project found with this id!' });
      return;
    }

    res.status(200).json(postData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
