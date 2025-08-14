import {
  Avatar as AvatarComponent,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";

export const Avatar = ({
  image,
  name,
}: {
  image: string | undefined;
  name: string;
}) => {
  return (
    <AvatarComponent> 
      <AvatarImage src={image || ""} alt={name} />
      <AvatarFallback className="bg-muted-foreground text-background">{name.charAt(0)}</AvatarFallback>
    </AvatarComponent>
  );
};
