import React from "react";
import HeaderNav from "./header-nav";
import { Sheet, SheetContent, SheetHeader, SheetTrigger } from "../../components/ui/sheet";
import { Menu } from "lucide-react";

export default function Header() {
  return (
    <div className="w-full h-[6rem] bg-black text-white flex flex-wrap justify-between items-center px-10">
      <div>
        <h1 className="text-2xl font-bold">Expense Manager</h1>
      </div>

      <div className="hidden md:flex">
        <HeaderNav />
      </div>

      <div className="md:hidden">
        <Sheet>
          <SheetTrigger asChild>
            <button aria-label="Abrir menu">
              <Menu className="h-6 w-6" />
            </button>
          </SheetTrigger>
          <SheetContent side="right" className="bg-black text-white">
            <SheetHeader>
              <h2 className="text-lg font-bold">Menu</h2>
            </SheetHeader>
            <div className="mt-4">
              <HeaderNav isColumn={true} />
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
}