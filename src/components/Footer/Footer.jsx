import React from "react";
import { FaFacebook, FaGithub } from "react-icons/fa6";
import { IoLogoInstagram } from "react-icons/io5";

const Footer = () => {
  const logoURL = "https://i.imgur.com/520zDfd.png";
  const socialMediaIcons = [
    {
      href: "",
      icon: <FaGithub />,
      alt: "github icon",
    },
    {
      href: "",
      icon: <FaFacebook />,
      alt: "telegram icon",
    },
    {
      href: "",
      icon: <IoLogoInstagram />,
      alt: "twitter icon",
    },
  ];

  const footerSections = [
    {
      title: "FEATURES",
      links: [
        { text: "Marketing", url: "#" },
        { text: "Commerce", url: "#" },
        { text: "Analytics", url: "#" },
        { text: "Merchandise", url: "#" },
      ],
    },
    {
      title: "SUPPORT",
      links: [
        { text: "Pricing", url: "#" },
        { text: "Docs", url: "#" },
        { text: "Audition", url: "#" },
        { text: "Art Status", url: "#" },
      ],
    },
    {
      title: "DOCUMENTS",
      links: [
        { text: "Terms", url: "#" },
        { text: "Conditions", url: "#" },
        { text: "Privacy", url: "#" },
        { text: "License", url: "#" },
      ],
    },
    {
      title: "DELIVERY",
      links: [
        { text: "List of countries", url: "#" },
        { text: "Special information", url: "#" },
        { text: "Restrictions", url: "#" },
        { text: "Payment", url: "#" },
      ],
    },
  ];

  return (
    <>
      <footer className="mx-auto w-full max-w-[1200px] justify-between pb-10 flex flex-col lg:flex-row">
        <div className="ml-5">
          <h1 className="text-5xl font-bold">
            T<span className="text-orange-500">M</span>
          </h1>
          <p className="pl-0">
            Lorem ipsum dolor sit amet consectetur <br />
            adipisicing elit.
          </p>
          <div className="mt-10 flex gap-3">
            {socialMediaIcons.map((icon, index) => (
              <a key={index} href={icon.href}>
                {icon.icon}
              </a>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {footerSections.map((section, index) => (
            <div key={index} className="mx-5 mt-10">
              <p className="font-medium text-gray-500">{section.title}</p>
              <ul className="text-sm leading-8">
                {section.links.map((link) => (
                  <li key={link.text}>
                    <a href={link.url}>{link.text}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </footer>
      <section className="h-11 bg-orange-400">
        <div className="mx-auto flex max-w-[1200px] items-center justify-between px-4 pt-2">
          <p>© All Right Reserved | 2023</p>
          <div className="flex items-center space-x-3">
            <img
              className="h-8"
              src="https://cdn-icons-png.flaticon.com/512/5968/5968299.png"
              alt="Visa icon"
            />
            <img
              className="h-8"
              src="https://cdn-icons-png.flaticon.com/512/349/349228.png"
              alt="AE icon"
            />
            <img
              className="h-8"
              src="https://cdn-icons-png.flaticon.com/512/5968/5968144.png"
              alt="Apple pay icon"
            />
          </div>
        </div>
      </section>
    </>
  );
};

export default Footer;
