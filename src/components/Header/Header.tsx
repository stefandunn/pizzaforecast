import { Logo } from "../Logo/Logo";

export const Header = () => {
  return (
    <header className="p-4 absolute top-0 left-0 w-full z-10">
      <Logo />
    </header>
  );
};
