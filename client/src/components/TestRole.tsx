import { useUser } from "@clerk/clerk-react";

const TestRole = () => {
  const { user } = useUser();

  // ✅ SAFELY extract role from publicMetadata
  const role = user?.publicMetadata
    ? (user.publicMetadata as { role?: string }).role
    : undefined;

  return (
    <div className="fixed bottom-4 right-4 bg-black text-white px-4 py-2 rounded-xl z-[999]">
      Role: {role || "NO ROLE"}
    </div>
  );
};

export default TestRole;

