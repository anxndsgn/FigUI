import { Button } from "@/registry/ui3/ui/button";
import {
  Menu,
  MenuContent,
  MenuGroup,
  MenuItem,
  MenuLabel,
  MenuShortcut,
  MenuTrigger,
} from "@/registry/ui3/ui/menu";

export default function MenuShortcutDemo() {
  return (
    <Menu>
      <MenuTrigger render={<Button variant="secondary">Open menu</Button>} />
      <MenuContent className="w-56">
        <MenuGroup>
          <MenuLabel>My Account</MenuLabel>
          <MenuItem>
            Profile
            <MenuShortcut>⇧⌘P</MenuShortcut>
          </MenuItem>
          <MenuItem>
            Billing
            <MenuShortcut>⌘B</MenuShortcut>
          </MenuItem>
          <MenuItem>
            Settings
            <MenuShortcut>⌘S</MenuShortcut>
          </MenuItem>
        </MenuGroup>
      </MenuContent>
    </Menu>
  );
}
