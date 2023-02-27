import { usersMock } from "../mocks/users-mock";
import { AppUser } from "../models/AppUser";

export const loggedUser: AppUser = {
  ...usersMock.find(u => u.id === 1)!
}