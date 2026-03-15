import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-nxted-dark">
      <SignIn
        appearance={{
          elements: {
            rootBox: "mx-auto",
            card: "bg-nxted-card border border-nxted-border",
          },
        }}
      />
    </div>
  );
}
