export interface Client {
    id: number;
    firstName: string;
    lastName: string;
    gender: string;
    dateOfBirth: Date;
    addresses: Address[];
    phoneNumbers: PhoneNumber[];
}

export interface Address {
    id: number;
    type: string;
    details: string;
    clientId: number;
}


export interface PhoneNumber {
    id: number;
    number: string;
    type: string;
}
