export function formatDate(dateString: string | null): string {
    if(!dateString) return ""
    return new Date(dateString).toLocaleString("es-ES", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        formatMatcher: "basic"
    });
}