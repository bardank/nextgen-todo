import axios from "../libs/axios";
import { User } from "../types/user";

export const requestCurrentUser = async () => axios.get<{ user: User }>("/user/me");
