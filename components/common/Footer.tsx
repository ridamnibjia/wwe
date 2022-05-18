import { useContext } from "react";
import Link from "next/Link";
import Logo from "./Logo";
import { SOCIAL_LINKS } from "../../utils/constants/links";
import { RiFacebookFill, RiInstagramFill, RiInstagramLine, RiLinkedinBoxLine, RiLinkedinLine, RiTwitterLine } from "react-icons/ri";
import { ThemeContext } from "../context/themeContext";

const subFooterNavigationData: Array<{ label: string; href: string }> = [
  {
    label: "About Us",
    href: "/about-us",
  },
  {
    label: "Privacy Policy",
    href: "/privacy-policy",
  },
  {
    label: "Contact Us",
    href: "/contact-us",
  },
];
const FooterSocialLinkData = [
  {
    label: "Facebook",
    href: "/www.facebook.com/",
    icon: <RiFacebookFill />,
  },
  {
    label: "Instagram",
    href: "/www.instagram.com/",
    icon: <RiInstagramLine />,
  },
  {
    label: "Twitter",
    href: "/www.twitter.com/",
    icon: <RiTwitterLine />,
  },
  {
    label: "LinkedIn",
    href: "/www.linkedin.com/",
    icon: <RiLinkedinBoxLine />,
  },



];

function Footer() {
  const { theme } = useContext(ThemeContext)
  return (
    <footer className={`${theme === 'light' ? 'bg-white ' : 'text-[#efefef] bg-light-black'} pt-8`}>
      <div className="flex items-center flex-col">
        <Logo />
        <p className="md:text-lg text-center m-auto max-w-[700px] py-3 font-md xsm:text-md xsm:w-[90%] ">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Et quisquam optio culpa voluptas. Repellendus, quis iste. Eum, labore nisi aperiam corporis provident velit, repudiandae optio consequuntur, nulla quo officiis a!</p>
        <div className="flex">
          {FooterSocialLinkData.map(data => (
            <a href={data.href} title={data.label} className={`mx-1 transition duration-500 flex items-center justify-center h-[45px] w-[45px] rounded-full border-2 text-2xl  cursor-pointer hover:text-main hover:border-[#ce061e] ${theme === 'light' ? 'text-[#555]' : 'text-[#efefef]'}`}>{data.icon}</a>

          ))}
        </div>
        <div className="flex md:flex-row items-center flex-col border-t w-full justify-between py-4 md:px-8 xsm:px-2 mt-4">
          <p className="text-lg font-semibold">Copyright &copy; 2022 Wrestling world.</p>
          <div className="flex items-center">
            {subFooterNavigationData.map(link => (
              <a href={link.href} className={` border-2 xsm:mt-2 md:mt-0 rounded-full px-4 text-sm  py-1 mr-2 ${theme === 'light' ? 'hover:bg-gray-100' : 'hover:bg-light-black'}`} title={link.label}>{link.label}</a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
