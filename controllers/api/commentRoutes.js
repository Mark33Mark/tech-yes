
const router        = require( "express" ).Router();
const { Comment, Post, User }   = require( "../../models" );
const withAuth      = require( "../../utilities/auth" );


router.get('/:id', withAuth, async (req, res) => {

    const postID = req.url.replace("/","");

    try {
        const postData = await Post.findOne({
            where: 
            {
            id: postID,
            },
            include:
            [
                {
                    model:User,
                        attributes:
                        [
                            "name",
                            "email",
                        ],
                },
                {
                    model: Comment,
                        attributes: 
                        [
                            "post_id",
                        ]
                },
            ]
        });
        
        if (!postData) {
            res.status(404).json({ message: `I can't find a post with id ${id}` });
            return;
        }
        
        let post = postData.get({ plain: true });

        res.render( "comment", 
        { 
            post,
            logged_in: req.session.logged_in,
        });

        } catch (err) {
        res.status(500).json(err);
        }
    });


    
router.post( "/", withAuth, async ( req, res ) => {
    
    try {        
        // if (req.session) {
        const savedComment = await Comment.create({
            comment: req.body.comment,
            post_id: req.body.post_id,
            user_id: req.session.user_id,
        });

        if (!savedComment) {
            res.status(404).json({ message: `Oops, there's a problem. I can't save your comment.` });
            return;
        }
            res.json( savedComment );
        // }
    } catch ( err ) {
        res.status( 400 ).json( err );
    }
});


router.get( "/made/:id", withAuth, async (req, res) => {

    const postID = req.url.slice(req.url.lastIndexOf("/")+1);

    try {
        const commentsFound = await Comment.findAll({
        where: 
            {
                post_id: postID,
            },
        include:
            [
                {
                    model:Post,
                        attributes:
                        [
                            "id",
                            "title",
                            "post",
                            "user_id",
                            "updated_at",
                        ],
                },
                {
                    model:User,
                        attributes:
                        [
                            "name",
                            "email",
                        ],
                },
            ]
        });

        if ( !commentsFound ) {
            res.status(404).json({ message: `I couldn"t find a comment with id ${postID}` });
            return;
        }

        let comments = commentsFound.map(( comments ) => comments.get({ plain: true }));

        res.render( "view-comments", 
        { 
            comments,
            logged_in: req.session.logged_in,

        });

    } catch( err ) {
        res.status( 500 ).json( err );
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