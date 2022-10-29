export function numberWithSpaces (x: number){
        const parts = x.toFixed(0).toString().split(".");
        parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, " ");
        return parts.join(".");
}