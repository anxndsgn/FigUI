"use client";

import { useState } from "react";
import { Button } from "@/registry/ui3/ui/button";
import {
  Menu,
  MenuCheckboxItem,
  MenuContent,
  MenuGroup,
  MenuLabel,
  MenuTrigger,
} from "@/registry/ui3/ui/menu";

export default function MenuCheckboxDemo() {
  const [showStatusBar, setShowStatusBar] = useState(true);
  const [showActivityBar, setShowActivityBar] = useState(false);

  return (
    <Menu>
      <MenuTrigger render={<Button variant="secondary">Open menu</Button>} />
      <MenuContent className="w-48">
        <MenuGroup>
          <MenuLabel>Appearance</MenuLabel>
          <MenuCheckboxItem checked={showStatusBar} onCheckedChange={setShowStatusBar}>
            Status bar
          </MenuCheckboxItem>
          <MenuCheckboxItem checked={showActivityBar} onCheckedChange={setShowActivityBar}>
            Activity bar
          </MenuCheckboxItem>
        </MenuGroup>
      </MenuContent>
    </Menu>
  );
}
