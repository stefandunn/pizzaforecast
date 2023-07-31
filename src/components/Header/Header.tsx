import { pathname } from "@/utils/url";
import { Logo } from "../Logo/Logo";

export const Header = () => {
  const isNotHome = pathname() !== "/";

  return (
    <header className="p-4 absolute top-0 left-0 w-full z-10">
      <Logo isNotHome={isNotHome} />
    </header>
  );
};
