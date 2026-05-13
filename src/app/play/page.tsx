"use client";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

export default function PlayPage() {
  const { push } = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (pathname === "/play") {
      push("/play/0");
    }
  }, [pathname, push]);
  return <></>;
}
