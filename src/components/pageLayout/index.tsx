import { FC, ReactNode } from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";

interface LayoutProps {
  children?: ReactNode;
  className?: string;
  title?: string;
}

const PageLayout: FC<LayoutProps> = ({
  children,
  className = "",
  title = "",
}) => {
  return (
    <main
      className={`relative lg:min-h-screen backdrop-blur-lg bg-gray-800  ${className}`}
    >
      <div className="flex">
        <Sidebar />
        <div className="w-full lg:w-[calc(100%-80px)] min-h-screen">
          {children}
        </div>
      </div>
    </main>
  );
};

export default PageLayout;
