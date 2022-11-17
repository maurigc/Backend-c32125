const authLogueo = (req, res, next) => {
    if(req.session.logged){
        next()
    }else{
        res.redirect("/api/")
    }
}


export { authLogueo };