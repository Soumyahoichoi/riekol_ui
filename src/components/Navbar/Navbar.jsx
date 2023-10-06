import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  //   Link,
  DropdownItem,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  Avatar,
  Button,
} from "@nextui-org/react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useStore } from "../../store/store";
import { createSession } from "../../api/checkout";
import { getResultFromData } from "../../helper";
import { toast } from "sonner";

const isBrowser = typeof window !== "undefined";

const NavBar = () => {
  const [activeTab, setActiveTab] = useState(0);
  const cart = useStore((state) => state.cart);

  const handleCheckout = async () => {
    if (cart) {
      const session = await createSession(cart);
      const result = getResultFromData(session);

      if (isBrowser && result) {
        window.open(result, "_blank", "noopener,noreferrer");
      } else {
        toast.error("Something went wrong!");
      }
    } else {
      toast.error("Please add something to the cart");
    }
  };
  return (
    <div>
      {" "}
      <Navbar>
        <NavbarBrand>
          {/* <AcmeLogo /> */}
          <p className="font-bold text-inherit">EO Kol</p>
        </NavbarBrand>

        <NavbarContent className="sm:flex gap-4" justify="center">
          <NavbarItem isActive={activeTab === 0}>
            <Link to="/myeo" onClick={() => setActiveTab(0)}>
              My EO
            </Link>
          </NavbarItem>
          {/* <NavbarItem isActive>
            <Link href="#" aria-current="page" color="secondary">
              Customers
            </Link>
          </NavbarItem> */}
          <NavbarItem isActive={activeTab === 1}>
            <Link to="/deepdive" onClick={() => setActiveTab(1)}>
              Deep Dive
            </Link>
          </NavbarItem>
        </NavbarContent>

        <NavbarContent as="div" justify="end">
          <Button color="danger" onClick={handleCheckout}>
            Checkout
          </Button>
          {/* <Dropdown placement="bottom-end">
            <DropdownTrigger>
              <Avatar
                isBordered
                as="button"
                className="transition-transform"
                color="secondary"
                name="Jason Hughes"
                size="sm"
                src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
              />
            </DropdownTrigger>
            <DropdownMenu aria-label="Profile Actions" variant="flat">
              <DropdownItem key="profile" className="h-14 gap-2">
                <p className="font-semibold">Signed in as</p>
                <p className="font-semibold">zoey@example.com</p>
              </DropdownItem>
              <DropdownItem key="settings">My Settings</DropdownItem>
              <DropdownItem key="team_settings">Team Settings</DropdownItem>
              <DropdownItem key="analytics">Analytics</DropdownItem>
              <DropdownItem key="system">System</DropdownItem>
              <DropdownItem key="configurations">Configurations</DropdownItem>
              <DropdownItem key="help_and_feedback">
                Help & Feedback
              </DropdownItem>
              <DropdownItem key="logout" color="danger">
                Log Out
              </DropdownItem>
            </DropdownMenu>
          </Dropdown> */}
        </NavbarContent>
      </Navbar>
    </div>
  );
};

export default NavBar;
