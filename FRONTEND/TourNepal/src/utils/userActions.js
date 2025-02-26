import { deleteRequest as deletionRequest} from "../api/authService";
import { getToken } from "./TokenStorage";

export const deleteRequest = async () => {

    const token = await getToken();
    const response = await deletionRequest(token.accessToken);

    return response;
}