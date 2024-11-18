import { Asset } from "expo-media-library";

export interface Photo extends Asset {
    properUri: string;
    fileSize?: number;
    fileType?: string;
}

export type DeleteMapEntry = {
    uri: string;
    fileSize?: number;
    fileType?: string;
    creationTime: number;
};