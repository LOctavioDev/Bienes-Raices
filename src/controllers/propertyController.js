const formProperty = (req, res) => {
    res.render('properties/create.pug', {
        page: 'New Property',
        showHeader: true
    })
}

export {formProperty};