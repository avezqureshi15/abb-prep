export const saveToLocal = <T>(key: string, data: T) => {
    localStorage.setItem(key, JSON.stringify(data));
}