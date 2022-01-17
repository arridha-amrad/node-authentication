import passport from "passport";
import PassportFacebook from "passport-facebook";

const FacebookStrategy = PassportFacebook.Strategy

passport.use(new FacebookStrategy({
   clientID: process.env.FACEBOOK_OAUTH_CLIENT_ID!,
   clientSecret: process.env.FACEBOOK_OAUTH_CLIENT_SECRET!,
   callbackURL: "http://localhost:5000/api/facebook/callback",
   enableProof: true,
   profileFields: ['displayName', "picture", 'email']
},
   function (_, __, profile, cb) {
      return cb(null, profile)
   }
));