const app = require('./app')

app.set('PORT', process.env.PORT || 6060)

app.listen(app.get('PORT'), () => {
  console.log(`Server is running on http://localhost:${app.get('PORT')}`);
});