"use client";
// reuseable search component
interface SearchProps {
  placeholder: string;
  value: string;
  
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;

}
const Search = () => {
  return <div></div>;
};

export default Search;
