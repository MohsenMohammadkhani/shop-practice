import { queryByAttribute } from "@testing-library/react";

const getElementById = queryByAttribute.bind(null, "id");

export default {
  getElementById,
};
