
const userSchema = {
    type: 'object',
    properties: {
      name: { type: 'string', minLength: 1 },
      email: { type: 'string', format: 'email' },
      age: { type: 'integer', minimum: 0 }
    },
    required: ['name', 'email', 'age'],
    additionalProperties: false
};
  
export default userSchema;