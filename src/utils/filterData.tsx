type FilterDataOptions<T> = {
  data: T[];
  search?: string;
  searchKeys?: string[]; // now supports "nested.property.path"
  filters?: Record<string, any>; // also supports nested keys
  custom?: (item: T) => boolean;
};

// Helper to get nested values from object using "a.b.c" paths
function getNestedValue(obj: any, path: string) {
  return path.split(".").reduce((acc, part) => acc?.[part], obj);
}

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
      searchKeys.some((path) => {
        const value = getNestedValue(item, path);
        return (
          typeof value === "string" && value.toLowerCase().includes(searchLower)
        );
      });

    // ✅ Filters match
    const matchesFilters = Object.entries(filters).every(([path, expected]) => {
      if (expected === undefined || expected === "all") return true;

      const actual = getNestedValue(item, path);

      return typeof expected === "function"
        ? expected(actual)
        : actual === expected;
    });

    // 🧠 Optional custom logic
    const matchesCustom = custom ? custom(item) : true;

    return matchesSearch && matchesFilters && matchesCustom;
  });
}
