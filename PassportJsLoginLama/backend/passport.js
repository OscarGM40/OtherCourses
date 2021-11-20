const GoogleStrategy = require('passport-google-oauth20').Strategy;
const GitHubStrategy = require('passport-github2').Strategy;
// const FacebookStrategy = require('passport-facebook').Strategy;
// const TwitterStrategy = require('passport-twitter').Strategy;
const passport = require('passport');

               /* GOOGLE STRATEGY SETUP */
const GOOGLE_CLIENT_ID=process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET=process.env.GOOGLE_CLIENT_SECRET;

passport.use(new GoogleStrategy({
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: "/auth/google/callback"
      },
      // si todo sale bien en 'profile' esta la info del usuario 
      function(accessToken, refreshToken, profile, cb) {
         // console.log(profile);
         return cb(null, profile);
         }
      )
);

                        /* GITHUB STRATEGY SETUP */
const GITHUB_CLIENT_ID=process.env.GITHUB_CLIENT_ID;
const GITHUB_CLIENT_SECRET=process.env.GITHUB_CLIENT_SECRET;

passport.use(new GitHubStrategy({
   clientID: GITHUB_CLIENT_ID,
   clientSecret: GITHUB_CLIENT_SECRET,
   callbackURL: "/auth/github/callback"
 },
 function(accessToken, refreshToken, profile, done) {
     return done(null, profile);
 }
));

                        /* FACEBOOK STRATEGY SETUP(only https) */
// const FACEBOOK_CLIENT_ID=""
// const FACEBOOK_CLIENT_SECRET=""

/* passport.use(new FacebookStrategy({
   clientID: FACEBOOK_CLIENT_ID,
   clientSecret: FACEBOOK_CLIENT_SECRET,
   callbackURL: "/auth/facebook/callback"
 },
 function(accessToken, refreshToken, profile, done) {
     return done(null, profile);
 }
)); */

// dado que vamos a usar sesiones debo serializar y deserializar el usuario(esto es asi simplemente porque passport no lo hace por nosotros)

passport.serializeUser(function(user, cb) {
   cb(null, user);
});

passport.deserializeUser(function(obj, cb) {
   cb(null, obj);
}
);


