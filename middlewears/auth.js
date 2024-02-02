const isLogin = async(req,res,next) =>{
    if(req.session.email){
        next()
    }else{
        res.redirect('/')
    }
}

const isLogout = async(req,res,next)=>{
    if(req.session.email){
        res.redirect('/home')
    }else{
        next()
    }
}

module.exports = {isLogin, isLogout}