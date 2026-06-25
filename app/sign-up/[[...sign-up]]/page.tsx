import SignUpPage from "./SignUpClient";

export function generateStaticParams() {
  return [{ "sign-up": [] }];
}

export default function Page() {
  return <SignUpPage />;
}
