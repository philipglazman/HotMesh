import { request } from "./http";

export const getPrice = () => request("/api/price");
export const getAddressPaid = () => request("/api/address-paid");
