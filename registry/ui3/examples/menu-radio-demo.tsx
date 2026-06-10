"use client";

import { useState } from "react";
import { Button } from "@/registry/ui3/ui/button";
import {
  Menu,
  MenuContent,
  MenuGroup,
  MenuLabel,
  MenuRadioGroup,
  MenuRadioItem,
  MenuTrigger,
} from "@/registry/ui3/ui/menu";

export default function MenuRadioDemo() {
  const [position, setPosition] = useState("bottom");

  return (
    <Menu>
      <MenuTrigger render={<Button variant="secondary">Open menu</Button>} />
      <MenuContent className="w-48">
        <MenuGroup>
          <MenuLabel>Panel position</MenuLabel>
          <MenuRadioGroup value={position} onValueChange={setPosition}>
            <MenuRadioItem value="top">Top</MenuRadioItem>
            <MenuRadioItem value="bottom">Bottom</MenuRadioItem>
            <MenuRadioItem value="right">Right</MenuRadioItem>
          </MenuRadioGroup>
        </MenuGroup>
      </MenuContent>
    </Menu>
  );
}
