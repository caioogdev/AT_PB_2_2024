import React from "react";
import { Link } from "react-router-dom";

export default function HeaderNav({ isColumn }) {
  return (
    <nav className={`flex ${isColumn ? "flex-col gap-4" : "flex-row gap-6"} text-md`}>
      <Link to="/home" className="">
        Home
      </Link>
      <Link to="/control" className="">
        Controle
      </Link>
      <Link to="/contact" className="">
        Contato
      </Link>
    </nav>
  );
}