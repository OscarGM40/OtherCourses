const GoogleStrategy = require('passport-google-oauth20').Strategy;
const passport = require('passport');

const GOOGLE_CLIENT_ID="191220571886-ibr2dltqpqrqgfeq5d43c7b2iaivhu8g.apps.googleusercontent.com";
const GOOGLE_CLIENT_SECRET="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"

passport.use(new GoogleStrategy({
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:3000/auth/google/callback"
      },
      // si todo sale bien en 'profile' esta la info del usuario 
      function(accessToken, refreshToken, profile, cb) {
         console.log(profile);
         return cb(null, profile);
         }
      )
);

// dado que vamos a usar sesiones debo serializar y deserializar el usuario(esto es asi simplemente porque passport no lo hace por nosotros)

passport.serializeUser(function(user, cb) {
   cb(null, user);
});

passport.deserializeUser(function(obj, cb) {
   cb(null, obj);
}
);


