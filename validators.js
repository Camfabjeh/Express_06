const userSchema = Joi.object({
  firstname: Joi.string().max(255).required(),
  lastname: Joi.string().max(255).required(),
  email: Joi.string().email().max(255).required(),
  city: Joi.string().max(255).required(),
  language: Joi.string().max(255).required(), 
  title: Joi.string().max(255).required(),
  director: Joi.string().max(255).required(),
  year: Joi.string().max(4).required(),
  color: Joi.boolean().valid(true),
  duration: Joi.number().max(3).required(),
})

const validateUser = (req, res, next) => {
  const { firstname, lastname, email, city, language } = req.body;
  const { error } = userSchema.validate(
    { firstname, lastname, email, city, language },
    {abortEarly: false}
  );
  if(error) {
    res.status(422).json({validationErrors: error.details});
  } else {
    next();
  }
};

const validateMovie = (req, res, next) => {
  const { title, director, year, color, duration } = req.body;
  const { error } = userSchema.validate(
    { title, director, year, color, duration },
    {abortEarly: false}
  );
  if(error) {
    res.status(422).json({validationErrors: error.details});
  } else {
    next();
  }
};

module.exports = {
  validateMovie,
  validateUser,
}