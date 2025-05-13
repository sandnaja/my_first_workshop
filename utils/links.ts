type NavLink = {
  href: string;
  label: string;
};

export const links: NavLink[] = [
  { href: "/", label: "Home" },
  { href: "/profile", label: "Profile" },
  { href: "/favorites", label: "Favorites" },
  { href: "/camp", label: "Camp" },
  { href: "/camp/create", label: "Create Landmark" },
];
