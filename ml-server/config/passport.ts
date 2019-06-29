import { Strategy as LocalStrategy } from 'passport-local';
import { PassportStatic, use } from 'passport';
import { User, UserModel } from '../models';

export const passportInit = (passport: PassportStatic) => {
    passport.serializeUser((user: User, done) => {
        done(null, user.id)
    })

    passport.deserializeUser((id, done) => {
        UserModel.findById(id, (err, user) => {
            done(err, user)
        })
    })

    use('local-signup', new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true
    }, (req: any, email: string, password: string, done) => {
        process.nextTick(() => {
            // find a user whose email is the same as the forms email
            // we are checking to see if the user trying to login already exists
            UserModel.findOne({ 'local.email' :  email }, function(err, user) {
                // if there are any errors, return the error
                if (err)
                    return done(err);
    
                // check to see if theres already a user with that email
                if (user) {
                    return done(null, false, {message: 'email already taken'});
                } else {
    
                    // if there is no user with that email
                    // create the user
                    var newUser = new UserModel();
    
                    // set the user's local credentials
                    newUser.local.email = email;
                    newUser.local.password = newUser.generateHash(password);
    
                    // save the user
                    newUser.save(function(err) {
                        if (err)
                            throw err;
                        return done(null, newUser);
                    });
                }
    
            });
        })
    }))

    use('local-login' , new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true
    }, (req, email, password, done) => { // callback with email and password from our form
        // find a user whose email is the same as the forms email
        // we are checking to see if the user trying to login already exists
        UserModel.findOne({ 'local.email' :  email }, function(err, user) {
            // if there are any errors, return the error before anything else
            if (err)
                return done(err);

            // if no user is found, return the message
            if (!user)
                return done(null, false); // req.flash is the way to set flashdata using connect-flash

            // if the user is found but the password is wrong
            if (!user.validPassword(password, user.local.password))
                return done(null, false); // create the loginMessage and save it to session as flashdata

            // all is well, return successful user
            return done(null, user);
        });
    }))
}