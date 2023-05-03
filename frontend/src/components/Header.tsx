import { useSession } from "next-auth/react";
import { Avatar, Button, Dropdown, Navbar } from "flowbite-react";
import { MdDashboard, MdLogout } from "react-icons/md";
import { AiOutlineShopping } from "react-icons/ai";
/**
 * This function builds the header seen on the site.
 * @returns Header component.
 */
export default function Header() {
  const { data: session } = useSession();

  return (
    <Navbar
      fluid={true}
      rounded={true}
      className="max-w-7xl mx-auto shadow-md sticky top-[2%]"
    >
      <Navbar.Brand href="#">
        <img
          src="https://www.tactalyse.com/wp-content/uploads/2019/07/tactalyse-sport-analyse.png"
          className="mr-3 h-6 sm:h-9"
        />
      </Navbar.Brand>

      {session === null ? (
        <div className="flex md:order-2 gap-1">
          <Button
            className="hidden md:block rounded-md bg-transparent hover:!text-[#FF2301] !text-black focus:!ring-0 hover:!bg-transparent"
            size="sm"
          >
            Sign In
          </Button>
          <Button
            className="hidden md:block rounded-md !bg-[#FF2301] hover:!bg-[#FF2301]/80 text-white focus:!ring-0"
            size="sm"
          >
            Register
          </Button>
          <Navbar.Toggle className="focus:!ring-0" />
        </div>
      ) : (
        <div className="flex md:order-2 gap-1 items-center">
          <Dropdown
            label={
              <Avatar
                rounded={true}
                status="online"
                size={"sm"}
                className="cursor-pointer"
              />
            }
            arrowIcon={false}
            inline={true}
          >
            <Dropdown.Header>
              <div className="flex flex-col">
                <span className="text-sm text-black capitalize">
                  {session?.user.email.split("@")[0]}
                </span>
                <span className="text-sm text-slate-500">
                  {session?.user.email}
                </span>
              </div>
            </Dropdown.Header>
            <Dropdown.Item icon={MdDashboard}>Dashboard</Dropdown.Item>
            <Dropdown.Item icon={AiOutlineShopping}>Buy report</Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item icon={MdLogout}>Logout</Dropdown.Item>
          </Dropdown>
          <Navbar.Toggle className="focus:!ring-0" />
        </div>
      )}

      <Navbar.Collapse id="menu">
        <Navbar.Link
          href="/navbars"
          className="rounded-md hover:!text-[#FF2301]"
        >
          Home
        </Navbar.Link>
        <Navbar.Link
          href="/navbars"
          className="rounded-md hover:!text-[#FF2301]"
        >
          About
        </Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
  );
}
