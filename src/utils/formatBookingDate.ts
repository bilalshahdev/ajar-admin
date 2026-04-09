export const formatBookingDate = (dateString: string, unit: string) => {
        const date = new Date(dateString);

        if (unit === "hour") {
            return date.toLocaleString("en-GB", {
                day: "2-digit",
                month: "short",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
                hour12: true,
            }).replace(/\//g, ' ');
        }

        return date.toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "short",
            year: "numeric",
        });
    };