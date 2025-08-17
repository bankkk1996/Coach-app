export const uid = () => Math.random().toString(36).slice(2);
export const todayStr = () => new Date().toISOString().slice(0,10);
