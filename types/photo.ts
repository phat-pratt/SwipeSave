import { Asset } from "expo-media-library";

export interface Photo extends Asset {
    properUri: string;
    fileSize?: number;
    fileType?: string;
}