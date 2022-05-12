import { useAvatar, UseAvatarProps } from "lib/hooks/useAvatar";

export type AvatarProps = UseAvatarProps & {
  size?: "is-64x64" | "is-32x32";
};

export const Avatar = ({ seed, type, size = "is-64x64" }: AvatarProps) => {
  const svg = useAvatar({
    seed,
    type,
  });

  return (
    <figure className={`image ${size}`}>
      <div dangerouslySetInnerHTML={{ __html: svg }} />
    </figure>
  );
};
