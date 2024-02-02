import { withAuth } from "next-auth/middleware";

export { default } from "next-auth/middleware";

export const config = { matcher: ["/"] };

// export default withAuth(
//   function middleware(req) {
//     console.log(req.nextauth.token);
//   },
//   {
//     callbacks: {
//       authorized: ({ token }) => token?.email === "qqq@qqq.com",
//     },
//   }
// );
