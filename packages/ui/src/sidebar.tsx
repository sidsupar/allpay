'use client'

import Link from "next/link";
import { usePathname } from 'next/navigation'

interface sidebarValues{
  label:string,
  icon:React.ReactNode,
  href:string
}

export const Sidebar = ({label, icon, href}: sidebarValues) => {

  const currentPathName = usePathname();
  const selected = currentPathName.startsWith(href);
  return (
    <div className="flex justify-center ">
      <div className="mt-2 w-4/5">        
        <Link href={href}>
          <div className="cursor-pointer">
            <div className="">
              <div className="flex justify-start">
                <div className="">
                  {icon}
                </div>
                <div className={`col-span-7 ${selected ? "text-violet-700" : ""}`}>{label}</div>
              </div>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
};
