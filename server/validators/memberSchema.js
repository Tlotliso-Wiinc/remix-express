
const memberSchema = {
    type: 'object',
    properties: {
      firstname: { type: 'string', minLength: 1 },
      lastname: { type: 'string', minLength: 1 },
      email: { type: 'string', format: 'email' },
      phone: { type: 'string', minLength: 1 },
    },
    required: ['firstname', 'lastname', 'email', 'phone'],
    additionalProperties: true
};
  
export default memberSchema;