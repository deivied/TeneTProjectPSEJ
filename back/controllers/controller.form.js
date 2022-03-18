
const signUp = (User) => async (user) => {
    const userr = new User(user)
    try {
        const result = await userr.save();
        if (result) {
            return({
                status:'success',
                message:'user saved successfully',
                payload: result
            });
        }
    } catch (error) {
        return({
            status:'fail',
            message:'user fail to register',
            payload: error
        });
    }
}





module.exports = (User)=>{
    return ({
        signUp : signUp(User),
        // authenticate: authenticate(User),
        // getUserById : getUserById(User),
        // updateUser: updateUser(User),
        // deleteUser : deleteUser(User)

    });
};