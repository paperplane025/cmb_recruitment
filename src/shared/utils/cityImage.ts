/** Ảnh khung cảnh thành phố xác định theo tên (seed) — dùng chung cho card khu vực trang chủ và ảnh minh hoạ liên quan tới địa điểm. */
export function getCityImage(name: string) {
  const seed = encodeURIComponent(name.toLowerCase().replace(/\s+/g, '-'))
  return `https://picsum.photos/seed/${seed}/600/400`
}
