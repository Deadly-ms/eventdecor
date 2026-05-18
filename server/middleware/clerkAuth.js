// import { ClerkExpressRequireAuth } from "@clerk/clerk-sdk-node";
const { ClerkExpressRequireAuth } = require("@clerk/clerk-sdk-node");

module.exports = {
  clerkAuth: ClerkExpressRequireAuth({
    authorizedParties: ["http://localhost:5173"],
  }),
};