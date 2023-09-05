import Airtable from 'airtable';

const apiKey = process.env.NEXT_PUBLIC_AIRTABLE_API_KEY;
Airtable.configure({ apiKey });
const baseId = process.env.NEXT_PUBLIC_AIRTABLE_BASE_ID!;

const base = Airtable.base(baseId);

export const projectDirectory = base('Project Directory');
