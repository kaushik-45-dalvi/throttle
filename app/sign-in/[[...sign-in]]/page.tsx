import SignInPage from "./SignInClient";

export function generateStaticParams() {
  return [{ "sign-in": [] }];
}

export default function Page() {
  return <SignInPage />;
}
