const notfound=(req,res) => {
    res.status(404).json(`Route not found try <a href='/api/v1/story'>postit</a>`)
}

module.exports =notfound