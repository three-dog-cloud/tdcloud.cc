export function isValidUrl(url: string): boolean {
    const regex = /^(ftp|http|https):\/\/[^ "]+$/;
    return regex.test(url);
}