// theme.ts
export const colors = {
  bg: "#f6f7f9",        // พื้นหลังจาง
  card: "#ffffff",      // การ์ด
  border: "#e5e7eb",    // เส้นคั่น
  text: "#111827",      // ข้อความหลัก
  subtext: "#6b7280",   // ข้อความรอง
  primary: "#0ea5e9",   // ฟ้าเรียบ
};

export const radius = { md: 12, xl: 16, xxl: 20 };
export const spacing = (n: number) => n * 4;
export const shadow = {
  shadowColor: "#000",
  shadowOpacity: 0.06,
  shadowRadius: 8,
  shadowOffset: { width: 0, height: 2 },
  elevation: 2,
};
