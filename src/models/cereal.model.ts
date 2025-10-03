import { openDatabase, closeDatabase, Index } from "@/lib/database";
import { BadRequest } from "@/lib/error";

export enum CerealMFR {
    AmericanHomeFoodProducts = 'A',
    GeneralMills = 'G',
    Kelloggs = 'K',
    Nabisco = 'N',
    Post = 'P',
    QuakerOats = 'Q',
    RalstonPurina = 'R',
}

export enum CerealType {
    Hot = 'H',
    Cold = 'C',
}

export type Cereal = {
    name: string;
    mfr: CerealMFR;
    type?: CerealType;
    calories?: number;
    protein?: number;
    fat?: number;
    sodium?: number;
    fiber?: number;
    carbo?: number;
    sugars?: number;
    potass?: number;
    vitamins?: number;
    shelf?: number;
    weight?: number;
    cups?: number;
    rating: number;
}
export type FecthedCereal = Cereal & { id: string }
export type UpdateCereal = Partial<Cereal>
 
export async function cerealFetchMany(index: Index): Promise<FecthedCereal[]> {
    let db = await openDatabase();
    const [results, fields] = await db.execute(
        'SELECT * FROM `cereal` LIMIT ?, ?',
        [index.offset, index.limit]
    );
    
    await closeDatabase(db);

    let cereals = results as FecthedCereal[];
    return cereals;
}

export async function cerealFetch(id: string): Promise<FecthedCereal> {
    let db = await openDatabase();
    const [results, fields] = await db.execute(
        'SELECT * FROM `cereal` WHERE `id`=?',
        [id]
    );

    await closeDatabase(db);

    let cereals = results as FecthedCereal[];
    let cereal = cereals[0];

    return cereal;
}

export async function cerealCreate(newCereal: Cereal): Promise<void> {
    if (!verifyCereal(newCereal)) throw new BadRequest('Bad cereal data given');

    let name = `${newCereal.name}`;
    let mfr = `${newCereal.mfr}`;
    let type = `${newCereal.type ?? null}`;
    let calories = `${newCereal.calories ?? null}`;
    let protein = `${newCereal.protein ?? null}`;
    let fat = `${newCereal.fat ?? null}`;
    let sodium = `${newCereal.sodium ?? null}`;
    let fiber = `${newCereal.fiber ?? null}`;
    let carbo = `${newCereal.carbo ?? null}`;
    let sugars = `${newCereal.sugars ?? null}`;
    let potass = `${newCereal.potass ?? null}`;
    let vitamins = `${newCereal.vitamins ?? null}`;
    let shelf = `${newCereal.shelf ?? null}`;
    let weight = `${newCereal.weight ?? null}`;
    let cups = `${newCereal.cups ?? null}`;
    let rating = `${newCereal.rating}`;

    let db = await openDatabase();
    const [results, fields] = await db.execute(
        'INSERT INTO `cereal` (name, mfr, type, calories, protein, fat, sodium, fiber, carbo, sugars, potass, vitamins, shelf, weight, cups, rating) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
        [name, mfr, type, calories, protein, fat, sodium, fiber, carbo, sugars, potass, vitamins, shelf, weight, cups, rating]
    );

    await closeDatabase(db);

    return;
}

export async function cerealUpdate(id: string, updateCereal: UpdateCereal): Promise<void> {
    if (!verifyCerealUpdate(updateCereal)) throw new BadRequest('Bad update cereal data given');

    let name = updateCereal.name ? `${updateCereal.name}` : undefined;
    let mfr = updateCereal.mfr ? `${updateCereal.mfr}` : undefined;
    let type = updateCereal.type ? `${updateCereal.type}` : undefined;
    let calories = updateCereal.calories ? `${updateCereal.calories}` : undefined;
    let protein = updateCereal.protein ? `${updateCereal.protein}` : undefined;
    let fat = updateCereal.fat ? `${updateCereal.fat}` : undefined;
    let sodium = updateCereal.sodium ? `${updateCereal.sodium}` : undefined;
    let fiber = updateCereal.fiber ? `${updateCereal.fiber}` : undefined;
    let carbo = updateCereal.carbo ? `${updateCereal.carbo}` : undefined;
    let sugars = updateCereal.sugars ? `${updateCereal.sugars}` : undefined;
    let potass = updateCereal.potass ? `${updateCereal.potass}` : undefined;
    let vitamins = updateCereal.vitamins ? `${updateCereal.vitamins}` : undefined;
    let shelf = updateCereal.shelf ? `${updateCereal.shelf}` : undefined;
    let weight = updateCereal.weight ? `${updateCereal.weight}` : undefined;
    let cups = updateCereal.cups ? `${updateCereal.cups}` : undefined;
    let rating = updateCereal.rating ? `${updateCereal.rating}` : undefined;

    let db = await openDatabase();
    const [results, fields] = await db.execute(
        'UPDATE `cereal` SET `name`=?, `mfr`=?, `type`=?, `calories`=?, `protein`=?, `fat`=?, `sodium`=?, `fiber`=?, `carbo`=?, `sugars`=?, `potass`=?, `vitamins`=?, `shelf`=?, `weight`=?, `cups`=?, `rating`=? WHERE `id`=?',
        [name, mfr, type, calories, protein, fat, sodium, fiber, carbo, sugars, potass, vitamins, shelf, weight, cups, rating, id]
    );

    await closeDatabase(db);

    return;

}

export async function cerealDelete(id: string): Promise<void> {
    let db = await openDatabase();
    const [results, fields] = await db.execute(
        'DELETE FROM `cereal` WHERE `id`=?',
        [id]
    );

    await closeDatabase(db);

    return;
}

export function verifyCerealMFR(value: unknown): value is CerealMFR {
    if (value === CerealMFR.AmericanHomeFoodProducts) return true;
    if (value === CerealMFR.GeneralMills) return true;
    if (value === CerealMFR.Kelloggs) return true;
    if (value === CerealMFR.Nabisco) return true;
    if (value === CerealMFR.Post) return true;
    if (value === CerealMFR.QuakerOats) return true;
    if (value === CerealMFR.RalstonPurina) return true;
    return false;
}

export function verifyCerealType(value: unknown): value is CerealType {
    if (value === CerealType.Cold) return true;
    if (value === CerealType.Hot) return true;
    return false;
}

export function verifyCereal(cereal: unknown): cereal is Cereal {
    if (cereal === undefined || cereal === null) return false;
    if (typeof cereal !== 'object') return false;

    if (!('name' in cereal)) return false;
    if (typeof cereal.name !== 'string') return false;
    if (cereal.name.length > 128) return false;

    if (!('mfr' in cereal)) return false;
    if (typeof cereal.mfr !== 'string') return false;
    if (!verifyCerealMFR(cereal.mfr)) return false;

    if ('type' in cereal) {
        if (typeof cereal.type !== 'string' && typeof cereal.type !== 'undefined') return false;
        if (typeof cereal.type === 'string' && !verifyCerealType(cereal.type)) return false;
    }

    if ('calories' in cereal) {
        if (typeof cereal.calories !== 'number' && typeof cereal.calories !== 'undefined') return false;
        if (typeof cereal.calories === 'number' && !Number.isInteger(cereal.calories)) return false;
    }

    if ('protein' in cereal) {
        if (typeof cereal.protein !== 'number' && typeof cereal.protein !== 'undefined') return false;
        if (typeof cereal.protein === 'number' && !Number.isInteger(cereal.protein)) return false;
    }

    if ('fat' in cereal) {
        if (typeof cereal.fat !== 'number' && typeof cereal.fat !== 'undefined') return false;
        if (typeof cereal.fat === 'number' && !Number.isInteger(cereal.fat)) return false;
    }

    if ('sodium' in cereal) {
        if (typeof cereal.sodium !== 'number' && typeof cereal.sodium !== 'undefined') return false;
        if (typeof cereal.sodium === 'number' && !Number.isInteger(cereal.sodium)) return false;
    }

    if ('fiber' in cereal) {
        if (typeof cereal.fiber !== 'number' && typeof cereal.fiber !== 'undefined') return false;
    }

    if ('carbo' in cereal) {
        if (typeof cereal.carbo !== 'number' && typeof cereal.carbo !== 'undefined') return false;
    }

    if ('sugars' in cereal) {
        if (typeof cereal.sugars !== 'number' && typeof cereal.sugars !== 'undefined') return false;
        if (typeof cereal.sugars === 'number' && !Number.isInteger(cereal.sugars)) return false;
    }

    if ('potass' in cereal) {
        if (typeof cereal.potass !== 'number' && typeof cereal.potass !== 'undefined') return false;
        if (typeof cereal.potass === 'number' && !Number.isInteger(cereal.potass)) return false;
    }

    if ('vitamins' in cereal) {
        if (typeof cereal.vitamins !== 'number' && typeof cereal.vitamins !== 'undefined') return false;
        if (typeof cereal.vitamins === 'number' && !Number.isInteger(cereal.vitamins)) return false;
    }

    if ('shelf' in cereal) {
        if (typeof cereal.shelf !== 'number' && typeof cereal.shelf !== 'undefined') return false;
        if (typeof cereal.shelf === 'number' && !Number.isInteger(cereal.shelf)) return false;
    }

    if ('weight' in cereal) {
        if (typeof cereal.weight !== 'number' && typeof cereal.weight !== 'undefined') return false;
    }

    if ('cups' in cereal) {
        if (typeof cereal.cups !== 'number' && typeof cereal.cups !== 'undefined') return false;
    }

    if (!('rating' in cereal)) return false;
    if (typeof cereal.rating !== 'number') return false;
    if (cereal.rating > 100) return false;
    if (cereal.rating < 0) return false;

    return true;
}

export function verifyCerealUpdate(cereal: unknown): cereal is UpdateCereal {
    if (cereal === undefined || cereal === null) return false;
    if (typeof cereal !== 'object') return false;

    if ('name' in cereal) {
        if (typeof cereal.name !== 'string' && typeof cereal.name !== 'undefined') return false;
        if (typeof cereal.name === 'string' && cereal.name.length > 128) return false;
    }

    if ('mfr' in cereal) {
        if (typeof cereal.mfr !== 'string' && typeof cereal.mfr !== 'undefined') return false;
        if (typeof cereal.mfr === 'string' && !verifyCerealMFR(cereal.mfr)) return false;
    }

    if ('type' in cereal) {
        if (typeof cereal.type !== 'string' && typeof cereal.type !== 'undefined') return false;
        if (typeof cereal.type === 'string' && !verifyCerealType(cereal.type)) return false;
    }

    if ('calories' in cereal) {
        if (typeof cereal.calories !== 'number' && typeof cereal.calories !== 'undefined') return false;
        if (typeof cereal.calories === 'number' && !Number.isInteger(cereal.calories)) return false;
    }

    if ('protein' in cereal) {
        if (typeof cereal.protein !== 'number' && typeof cereal.protein !== 'undefined') return false;
        if (typeof cereal.protein === 'number' && !Number.isInteger(cereal.protein)) return false;
    }

    if ('fat' in cereal) {
        if (typeof cereal.fat !== 'number' && typeof cereal.fat !== 'undefined') return false;
        if (typeof cereal.fat === 'number' && !Number.isInteger(cereal.fat)) return false;
    }

    if ('sodium' in cereal) {
        if (typeof cereal.sodium !== 'number' && typeof cereal.sodium !== 'undefined') return false;
        if (typeof cereal.sodium === 'number' && !Number.isInteger(cereal.sodium)) return false;
    }

    if ('fiber' in cereal) {
        if (typeof cereal.fiber !== 'number' && typeof cereal.fiber !== 'undefined') return false;
    }

    if ('carbo' in cereal) {
        if (typeof cereal.carbo !== 'number' && typeof cereal.carbo !== 'undefined') return false;
    }

    if ('sugars' in cereal) {
        if (typeof cereal.sugars !== 'number' && typeof cereal.sugars !== 'undefined') return false;
        if (typeof cereal.sugars === 'number' && !Number.isInteger(cereal.sugars)) return false;
    }

    if ('potass' in cereal) {
        if (typeof cereal.potass !== 'number' && typeof cereal.potass !== 'undefined') return false;
        if (typeof cereal.potass === 'number' && !Number.isInteger(cereal.potass)) return false;
    }

    if ('vitamins' in cereal) {
        if (typeof cereal.vitamins !== 'number' && typeof cereal.vitamins !== 'undefined') return false;
        if (typeof cereal.vitamins === 'number' && !Number.isInteger(cereal.vitamins)) return false;
    }

    if ('shelf' in cereal) {
        if (typeof cereal.shelf !== 'number' && typeof cereal.shelf !== 'undefined') return false;
        if (typeof cereal.shelf === 'number' && !Number.isInteger(cereal.shelf)) return false;
    }

    if ('weight' in cereal) {
        if (typeof cereal.weight !== 'number' && typeof cereal.weight !== 'undefined') return false;
    }

    if ('cups' in cereal) {
        if (typeof cereal.cups !== 'number' && typeof cereal.cups !== 'undefined') return false;
    }

    if ('rating' in cereal) {
        if (typeof cereal.rating !== 'number' && typeof cereal.rating !== 'undefined') return false;
        if (typeof cereal.rating === 'number' && cereal.rating > 100) return false;
        if (typeof cereal.rating === 'number' && cereal.rating < 0) return false;
    }

    return true;
}