import { getContacts } from "../api/authService";

export const getEmergencyContacts = async () => {
    const contacts = await getContacts();
    return contacts;
}