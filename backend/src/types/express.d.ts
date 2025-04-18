declare module "express";
import {
    Request as ExpressRequest,
    Response as ExpressResponse,
} from "express";

declare global {
    export interface Request extends ExpressRequest {}
    export interface Response extends ExpressResponse {
        // Puedes añadir métodos personalizados aquí si los necesitas
    }
}