export interface ResponseDTO<T = any> {
    msg?: string;
    data?: T;
    status: 'ERROR' | 'WARNING' | 'SUCCESS';
}