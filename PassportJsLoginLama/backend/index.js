const app = require('express')();
const cookieSession = require('cookie-session');
const passport = require('passport');
const cors = require('cors');
require('./passport')
const authRoutes = require('./routes/auth.routes');

app.use(require('express').json());

// al usar passport con la sesión hay que crear una cookie(de nombre 'session'),darla una duración e inicializar passport con la sesión(initialize() + session())
app.use(cookieSession({
   name: 'session',
   keys: ['key1', 'key2'],
   maxAge: 24 * 60 * 60 * 1000 // 24 hours
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(cors({
   origin: 'http://localhost:3000',
   methods: ['GET', 'POST', 'PUT', 'DELETE'],
   credentials: true,
}));

app.use('/auth', authRoutes);

const port = process.env.PORT || 5000;

app.listen(port, () => {
   console.clear();
   console.log(`Server is running on port ${port}`);
})