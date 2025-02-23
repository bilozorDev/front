import { UserButton } from "@clerk/nextjs";

import { SignedIn, SignedOut } from "@clerk/nextjs";
import { SignInButton, SignUpButton } from "@clerk/nextjs";

export default function Login() {
  return (
    <div>
      <SignedOut>
        <SignInButton />
        <SignUpButton />
      </SignedOut>
      <SignedIn>
        <UserButton />
      </SignedIn>
    </div>
  );
}
