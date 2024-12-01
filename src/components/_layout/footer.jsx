import React from "react";
import { FaFacebookSquare } from "react-icons/fa";
import { BiLogoGmail } from "react-icons/bi";
import { FaSquareInstagram } from "react-icons/fa6";
import HeaderNav from "./header-nav";

export default function Footer() {
  const navItems = [
    { label: "Home", description: "Dashboard de despesas", path: "/home" },
    {
      label: "Controle",
      description: [
        "Adicionar despesa",
        "Editar despesa",
        "Excluir despesa",
        "Listar despesa",
      ],
      path: "/control",
    },
    { label: "Contato", description: "Fale conosco", path: "/contact" },
  ];
  return (
    <footer className="bg-black text-white py-4">
      <div className="">
        <div className="mx-4 flex flex-wrap justify-between mb-6">
          <div className="flex items-center">
          <h1 className="font-bold text-2xl">Expense Manager</h1>
          </div>
          <div>
            <div className="flex flex-wrap gap-10 mt-4 md:mt-0">
              {navItems.map((item) => (
                <div key={item.label}>
                  <a href={item.path} className="block text-md">
                    {item.label}
                  </a>
                  {Array.isArray(item.description) ? (
                    <ul className="text-sm text-gray-400 space-y-1 mt-1">
                      {item.description.map((desc, index) => (
                        <li key={index}>{desc}</li>
                      ))}
                    </ul>
                  ) : (
                    <span className="text-sm text-gray-400">
                      {item.description}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
        <hr className="my-2 border-gray-100"></hr>
        <div className="flex flex-col justify-center items-center space-y-4 mt-4">
          <div className="flex flex-wrap gap-4">
            <a
              href="https://facebook.com"
              target="_blank"
              className="hover:text-gray-400 hover:border-gray-400 border-2 rounded-full p-2"
            >
              <FaFacebookSquare className="h-6 w-6" />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              className="hover:text-gray-400 hover:border-gray-400 border-2 rounded-full p-2"
            >
              <FaSquareInstagram className="h-6 w-6" />
            </a>
            <a
              href="https://gmail.com"
              target="_blank"
              className="hover:text-gray-400 hover:border-gray-400 border-2 rounded-full p-2"
            >
              <BiLogoGmail className="h-6 w-6" />
            </a>
          </div>
          <p className="text-sm">
            © {new Date().getFullYear()} Expense Manager. Todos os direitos
            reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
