import { GetServerSidePropsContext } from "next";

export const redirect = (
  context: GetServerSidePropsContext,
  destination: string
) => {
  if (context.res) {
    // Server-side redirect
    context.res.writeHead(302, { Location: destination });
    context.res.end();
  } else {
    // Client-side redirect
    window.location.replace(destination);
  }
};
