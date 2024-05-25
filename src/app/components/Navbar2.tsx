import React from "react";
import Link from "next/link";
import { ThemeToggle } from "./ThemeToggle";
import { Button } from "@/components/ui/button";
import {
  RegisterLink,
  LoginLink,
} from "@kinde-oss/kinde-auth-nextjs/components";

import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { UserNav } from "./UserNav";

export default async function Navbar() {
  const { isAuthenticated, getUser } = getKindeServerSession();
  const user = await getUser();

  return (
    <nav className="fixed top-0 left-0 right-0 border-b bg-background h-[10vh] flex items-center transition-all duration-300 z-50">
      <div className="container flex items-center justify-between">
        <Link href="/">
          <h1 className="font-bold text-2xl">lidom</h1>
        </Link>

        <div className="flex items-center gap-x-5">

          {(await isAuthenticated()) ? (
            <UserNav
              email={user?.email as string}
              profileImage={user?.picture as string}
              name={user?.given_name as string}
            />
          ) : (
            <div className="flex items-center gap-x-5">
              <Link href='/create' className='btn btn-ghost'>Add Books</Link>
              {/* <LoginLink>
                <Button>Login</Button>
              </LoginLink>
              <RegisterLink>
                <Button variant="secondary">Signup</Button>
              </RegisterLink> */}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
