export interface GuitarModel {
    id: number;
    name: string;
    vendorCode: string;
    type: GuitarType;
    description: string;
    previewImg: string;
    stringCount: GuitarStringCount,
    rating: number;
    price: number;
    commentsCount?: number;
}

export enum GuitarType {
    Acoustic = 'acoustic',
    Electric = 'electric',
    Ukulele = 'ukulele',
}

export enum GuitarStringCount {
    'Four' = 4,
    'Six' = 6,
    'Seven' = 7,
    'Twelve' = 12
}

