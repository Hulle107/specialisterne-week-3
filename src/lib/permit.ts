import { Permit } from 'permitio';

/**
 * Constructed instance of the Permit class with the specified configuration.
 */
export const permit = new Permit({
    pdp: process.env.PERMIT_PDP,
    token: process.env.PERMIT_TOKEN,
});