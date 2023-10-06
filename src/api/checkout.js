import { ServiceInstance } from "../../axios.config";

export const createSession = (data) => {
  return ServiceInstance.post("/users/checkout", data);
};
