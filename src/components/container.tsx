import { cn } from "../lib/utils";
import { PageTitle } from "./titles";

interface Props extends React.ImgHTMLAttributes<HTMLImageElement> {
  children: React.ReactNode;
  title?: string;
  section?: string;
  m?: boolean;
  p?: boolean;
  className?: string;
}

const Container = ({
  children,
  title,
  section,
  m = true,
  p = true,
  className,
  ...rest
}: Props) => {
  return (
    <>
      {title && <PageTitle title={title} />}
      <div
        className={cn(
          `max-w-screen-lg mx-auto px-4 sm:px-6 lg:px-8 ${m ? "mb-4" : ""}`,
          className
        )}
        {...rest}
      >
        {children}
      </div>
    </>
  );
};

export default Container;
