"use client";

import { signOut } from "next-auth/react";
// import { useSession } from "next-auth/react";

export default function Admin() {
  // const { data: session } = useSession();
  // console.log(session?.user?.email);

  return (
    <div className="grid place-items-center h-screen">
      {/* <div className="shadow-lg p-8 bg-zince-300/10 flex flex-col gap-2 my-6"> */}
      {/*   <div> */}
      {/*     Name: <span className="font-bold">{session?.user?.name}</span> */}
      {/*   </div> */}
      {/*   <div> */}
      {/*     Email: <span className="font-bold">{session?.user?.email}</span> */}
      {/*   </div> */}
      {/*   <div> */}
      {/*     Expires: <span className="font-bold">{session?.expires}</span> */}
      {/*   </div> */}
      {/*   <button */}
      {/*     onClick={() => signOut()} */}
      {/*     className="bg-red-500 text-white font-bold px-6 py-2 mt-3" */}
      {/*   > */}
      {/*     Log Out */}
      {/*   </button> */}
      {/* </div> */}
    </div>
  );
}
