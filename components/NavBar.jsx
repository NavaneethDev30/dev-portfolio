import Image from "next/image";
import Link from "next/link";

function NavBar() {
  return (
<nav
  className="
    fixed top-0 left-0 z-50
    w-full h-16
    bg-white/10
    backdrop-blur-md
    border-b border-white/20
    px-6 md:px-8
  "
>
<div className="max-w-7xl mx-auto h-full flex justify-between items-center text-white">

  <a href="/" className="flex items-center gap-3 ml-[-26]">
    <Image
      src="/pp.png"
      alt="profile-pic"
      width={30}
      height={30}
      className="rounded-full"
    />
    <span className="text-1xl font-bold italic">
      Navaneeth Dev G
    </span>
  </a>

  <div className="flex items-center gap-10 ">
    <a href="">Home</a>
    <a href="#skills">Skills</a>
    <a href="#projects">Projects</a>
    <a href="#contact">Contact</a>
  </div>

<Link href="/personal">
  <button className="px-6 py-3 border border-white/20 rounded-xl">
    Personal
  </button>
</Link>


</div>
</nav>
  );
}

export default NavBar;