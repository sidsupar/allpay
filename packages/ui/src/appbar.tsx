
import Link from "next/link";

interface link{
  page:string,
  name:string
}

export const Appbar = ({links, signin, signout, user}:{links:link[],signin:any, signout: any, user:object | undefined}) => {
  return (
    <div className="flex justify-between border-b p-5">
      <div data-name="heading" className="flex jsutify-center">
        <div className="flex jsutify-center font-bold">
          all.pay
        </div>
      </div>
      <div className="flex justify-end pr-5 w-1/2">
        {/* <div data-name="links" className="flex justify-between gap-10 p-5">
          {links.map((link, index) => {
            
            return(
              <>
                <div className="" key={"appbar "+"link"+index}>
                  <Link href={link?.page}>
                    {link?.name}
                  </Link>
                </div>
              </>
            )
          })}
        </div> */}
        <div className="flex justify-center">
          <div className="flex flex-col justify-center">
            <button onClick={user ? signout:signin} className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">
              {user ? "signout" : "signin"}
            </button>
          </div>       
        </div>
      </div>
    </div>
  );
};
