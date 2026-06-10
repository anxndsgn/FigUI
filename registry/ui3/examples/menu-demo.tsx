import { Button } from "@/registry/ui3/ui/button";
import { Menu, MenuContent, MenuItem, MenuTrigger } from "@/registry/ui3/ui/menu";

export function MenuDemo() {
  return (
    <Menu>
      <MenuTrigger render={<Button variant="secondary">Open menu</Button>} />
      <MenuContent className="w-48">
        <MenuItem>Profile</MenuItem>
        <MenuItem>Settings</MenuItem>
        <MenuItem>Log out</MenuItem>
      </MenuContent>
    </Menu>
  );
}
