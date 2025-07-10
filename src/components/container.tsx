import { cn } from "../lib/utils";
import { PageTitle } from "./titles";
import AddButton from "./add-button";

interface Props extends React.ImgHTMLAttributes<HTMLImageElement> {
  children: React.ReactNode;
  title?: string;
  m?: boolean;
  className?: string;
  addBtnTitle?: string;
  isDialog?: boolean;
  dialogContent?: React.ReactNode;
}

const Container = ({
  children,
  title,
  addBtnTitle,
  isDialog,
  dialogContent,
  m = true,
  className,
  ...rest
}: Props) => {
  return (
    <>
      <div className="flex items-center justify-between pb-4">
        {title && <PageTitle title={title} />}
        {addBtnTitle && <AddButton addBtnTitle={addBtnTitle} isDialog={isDialog} dialogContent={dialogContent} />}
      </div>
      <div
        className={cn(`w-full mx-auto ${m ? "mb-" : ""}`, className)}
        {...rest}
      >
        {children}
      </div>
    </>
  );
};

export default Container;
