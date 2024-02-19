"use client";
import _Dashboard from "@admin/components/_Dashboard";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@ui/components/ui/sheet";
import SideBarNav from "@admin/components/_SideBarNav";
import { useState } from "react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [active, setActive] = useState("dashboard");
  return (
    <div>
      <div className="inline-flex items-center p-2 ml-[73px] mt-2 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600">
        <Sheet>
          <SheetTrigger>Open Sidebar</SheetTrigger>
          <SheetContent side={"left"} className="bg-[#F9EBD3]">
            <SideBarNav active={active} setActive={setActive} />
          </SheetContent>
        </Sheet>
      </div>
      <div>
        <div className="flex flex-row bg-[#F9EBD3]">
          {/* <!--Side Options--> */}

          <div className="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0 bg-[#E1CDAD] drop-shadow-xl overflow-y-auto">
            <SideBarNav active={active} setActive={setActive} />
          </div>
          {/* <!--Main Container--> */}
          <div className="p-4 sm:ml-64 w-full">
            <div>{children}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
