import { AlignLeft, UserIcon } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "../ui/button";
import Link from "next/link";
import { links } from "@/utils/links";

import SignOutLinks from "./SignOutLinks";
import { SignedIn, SignedOut, SignInButton, SignUpButton } from "@clerk/nextjs";

const DropdownListMenu = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant={"outline"}>
          <AlignLeft />
          <UserIcon />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />

        <SignedOut>
          <DropdownMenuItem>
            <SignInButton mode="modal">
              <button>Login</button>
            </SignInButton>
          </DropdownMenuItem>

          <DropdownMenuItem>
            <SignUpButton mode="modal">
              <button>Sign Up</button>
            </SignUpButton>
          </DropdownMenuItem>
        </SignedOut>

        <SignedIn>
          {links.map((item, index) => {
            return (
              <DropdownMenuItem key={index}>
                <Link href={item.href}>{item.label}</Link>
              </DropdownMenuItem>
            );
          })}
          <DropdownMenuSeparator />
          <DropdownMenuItem>
          <SignOutLinks />
          </DropdownMenuItem>
        </SignedIn>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
export default DropdownListMenu;
