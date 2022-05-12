import { createAvatar } from "@dicebear/avatars";
import { useEffect, useState } from "react";

export type AvatarTypes = "croodles" | "bottts" | string;

export type UseAvatarProps = {
  type: AvatarTypes;
  seed: string;
};

const AvatarMap: Record<AvatarTypes, () => any> = {
  croodles: async () => import("@dicebear/croodles"),
  bottts: async () => import("@dicebear/avatars-bottts-sprites"),
};

const importStyle = async (type: AvatarTypes) => {
  const style = await AvatarMap[type]();
  return style;
};

export const useAvatar = ({ seed, type }: UseAvatarProps) => {
  const [svg, setSvg] = useState("");
  useEffect(() => {
    const awaitSVG = async () => {
      const style = await importStyle(type);

      let svg = createAvatar(style, {
        seed,
        backgroundColor: "white",
        radius: 50,
        scale: 80,
      });
      setSvg(svg);
    };

    awaitSVG();
  }, [seed, type]);

  return svg;
};
