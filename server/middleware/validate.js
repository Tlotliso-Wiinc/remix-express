import Ajv from 'ajv';
import addFormats from 'ajv-formats';

const ajv = new Ajv();
addFormats(ajv);

const validate = (schema) => (req, res, next) => {
  const valid = ajv.validate(schema, req.body);
  if (!valid) {
    return res.status(400).json({
      error: 'Validation failed',
      details: ajv.errors
    });
  }
  next();
};

export default validate;