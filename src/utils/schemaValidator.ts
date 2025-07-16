import Ajv, { JSONSchemaType } from 'ajv';

const ajv = new Ajv();

export function validateSchema<T>(data: unknown, schema: JSONSchemaType<T>): { valid: boolean; errors?: string[] } {
  const validate = ajv.compile(schema);
  const valid = validate(data);
  return {
    valid: !!valid,
    errors: validate.errors ? validate.errors.map(e => `${e.instancePath} ${e.message}`) : undefined
  };
} 