import { Button } from "@/registry/ui3/ui/button";
import {
  Menu,
  MenuContent,
  MenuItem,
  MenuSeparator,
  MenuSub,
  MenuSubContent,
  MenuSubTrigger,
  MenuTrigger,
} from "@/registry/ui3/ui/menu";

export default function MenuSubmenuDemo() {
  return (
    <Menu>
      <MenuTrigger render={<Button variant="secondary">Open menu</Button>} />
      <MenuContent className="w-48">
        <MenuItem>Team</MenuItem>
        <MenuSub>
          <MenuSubTrigger>Invite users</MenuSubTrigger>
          <MenuSubContent>
            <MenuItem>Email</MenuItem>
            <MenuItem>Message</MenuItem>
            <MenuSeparator />
            <MenuItem>More...</MenuItem>
          </MenuSubContent>
        </MenuSub>
        <MenuItem>Delete account</MenuItem>
      </MenuContent>
    </Menu>
  );
}
