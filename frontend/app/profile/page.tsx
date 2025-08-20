import {MockUser} from "@/config/mocks";
export default async function ProfilePage() {
  return ( 
    <main className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4 text-slate-900">
        Profile
      </h1>
      <p>{MockUser.name}</p>
    </main>
  );
}

