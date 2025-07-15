type FilterDataOptions<T> = {
  data: T[];
  search?: string;
  searchKeys?: (keyof T)[];
  filters?: Partial<Record<keyof T, any>>;
  custom?: (item: T) => boolean; // optional extra logic
};

export function filterData<T>({
  data,
  search = "",
  searchKeys = [],
  filters = {},
  custom,
}: FilterDataOptions<T>): T[] {
  const searchLower = search.toLowerCase();

  return data.filter((item) => {
    // 🔍 Search match
    const matchesSearch =
      search === "" ||
      searchKeys.some((key) => {
        const value = item[key];
        return (
          typeof value === "string" && value.toLowerCase().includes(searchLower)
        );
      });

    // ✅ Filters match (string, number, boolean)
    const matchesFilters = Object.entries(filters).every(([key, expected]) => {
      if (expected === undefined || expected === "all") return true;

      const actual = item[key as keyof T];

      // Support value OR function (e.g., (val) => val > 5)
      return typeof expected === "function"
        ? expected(actual)
        : actual === expected;
    });

    // 🧠 Optional custom logic (date ranges, compound conditions)
    const matchesCustom = custom ? custom(item) : true;

    return matchesSearch && matchesFilters && matchesCustom;
  });
}
