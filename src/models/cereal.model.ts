import { openDatabase, closeDatabase, Index } from "@/lib/database";

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

export type cereal = {
    name: string;
    mfr: CerealMFR;
    type: CerealType;
    calories: number;
    protein: number;
    fat: number;
    sodium: number;
    fiber: number;
    carbo: number;
    sugars: number;
    potass: number;
    vitamins: number;
    shelf: number;
    weight: number;
    cups: number;
    rating: number; // What the F*ck this should be an Int...
}

export type FecthedCereal = cereal & { id: string }
export type UpdateCereal = Partial<cereal>
 
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
export async function cerealCreate(newCereal: cereal): Promise<void> {}
export async function cerealUpdate(id: string, updateCereal: UpdateCereal): Promise<void> {}
export async function cerealDelete(id: string): Promise<void> {}