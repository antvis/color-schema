// import * as colorSchema from "../hand-made-schema.json";
import Ajv from 'ajv';
import { matchersWithOptions } from 'jest-json-schema';
import * as colorSchema from '../build/color-schema.json';
import classic from '../examples/classic.json';

expect.extend(
  matchersWithOptions({
    schemas: [colorSchema],
  })
);

const colorAssets = classic;

describe('test', () => {
  test('schema itself is valid', () => {
    expect(colorSchema).toBeValidSchema();
  });

  it('schema validate', () => {
    // by jest-json-schema (powered by ajv)
    expect(colorAssets).toMatchSchema(colorSchema);

    // by ajv
    const ajv = new Ajv();
    const validate = ajv.compile(colorSchema);
    const valid = validate(colorAssets);
    expect(valid).toBe(true);
  });
});
