import { SignUp } from "@clerk/nextjs";

export default function SignUpPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-nxted-dark">
      <SignUp
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
