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
    comments?: GuitarCommentModel [];
    isInCart: boolean;
}

export interface GuitarCommentModel{
    id: string;
    userName: string;
    advantage: string;
    disadvantage: string;
    comment: string;
    rating: number;
    createAt: Date;
    guitarId: number;
}

export interface AddCommentModel{
    guitarId: number;
    userName: string;
    advantage: string;
    disadvantage: string;
    comment: string;
    rating: number;
}

export enum GuitarType {
    Acoustic = 'acoustic',
    Electric = 'electric',
    Ukulele = 'ukulele',
}

export enum GuitarStringCount {
    'Four' = '4',
    'Six' = '6',
    'Seven' = '7',
    'Twelve' = '12'
}

export interface CartItemModel {
  guitar: GuitarModel,
  count: number
}
