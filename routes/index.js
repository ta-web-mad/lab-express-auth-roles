module.exports= app =>{

app.use('/admin', require('./admin.routes'))
app.use('/', require('./base.routes'));
app.use('/', require('./auth.routes'));
app.use('/students', require('./students.routes'));

}


