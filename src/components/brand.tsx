import Link from "next/link";
import MyImage from "./my-image";

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
      {/* <MyImage
        src="/images/brand-icon.png"
        width={100}
        height={100}
        alt="logo"
        className="invert brightness-0 block md:hidden"
      /> */}
    </Link>
  );
};

export default Brand;
