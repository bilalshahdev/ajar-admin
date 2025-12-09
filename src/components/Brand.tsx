import Link from "next/link";
import MyImage from "./custom/MyImage";

const Brand = () => {
  return (
    <Link href="/">
      <MyImage
        src="/images/brand.png"
        width={80}
        height={80}
        alt="logo"
        // className="invert brightness-0"
      />
    </Link>
  );
};

export default Brand;
