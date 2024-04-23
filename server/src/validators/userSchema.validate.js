const { z } = require("zod");

const userSchemaValidate = z.object({
  firstName: z
    .string({ required_error: "Firstname is required." })
    .trim()
    .min(3, { message: "Firstname must contain at least 3 characters." }),

  lastName: z
    .string({ required_error: "Lastname is required." })
    .min(3, { message: "Lastname must contain at least 3 characters." })
    .optional(), // Make the field optional

  email: z
    .string({ required_error: "Email is required." })
    .min(10, { message: "Email must be at least 10 characters long." })
    .max(255, { message: "Email cannot exceed 255 characters." })
    .email({ message: "Invalid email address." }),

  phone: z
    .string({ required_error: "Phone is required." })
    .min(10, { message: "Phone must be at least 10 digits." })
    .max(10, { message: "Phone must be at most 10 digits." }),

  dob: z
    .string({ required_error: "Date of birth is required." })
    .min(1, { message: "DOB is required" }),

  gender: z
    .string({ required_error: "Gender is required." })
    .min(1, { message: "Gender is required" }),

  password: z
    .string({ required_error: "Password is required." })
    .min(3, { message: "Password must be at least 3 characters long." }),
});

module.exports = { userSchemaValidate };
