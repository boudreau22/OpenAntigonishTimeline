import fs from 'fs';
import path from 'path';
import Ajv from 'ajv';
import addFormats from 'ajv-formats';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const schemaPath = path.join(__dirname, '../src/data/schema.json');
const dataPath = path.join(__dirname, '../src/data/town_projects.json');

try {
    const schema = JSON.parse(fs.readFileSync(schemaPath, 'utf-8'));
    const data = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));

    const ajv = new Ajv({ allErrors: true });
    addFormats(ajv);

    const validate = ajv.compile(schema);
    const valid = validate(data);

    if (!valid) {
        console.error('Validation failed:');
        console.error(JSON.stringify(validate.errors, null, 2));
        process.exit(1);
    } else {
        console.log('Validation successful.');
    }
} catch (error) {
    console.error('Error reading files:', error);
    process.exit(1);
}
