import type { BlogPost } from '@/features/blog/types.ts'

export const mockBlogPosts: BlogPost[] = [
  {
    id: '1',
    title: 'Bí quyết viết CV ứng tuyển ấn tượng',
    slug: 'bi-quyet-viet-cv-ung-tuyen-an-tuong',
    excerpt:
      'Một CV tốt là bước đầu tiên để lọt vào mắt xanh của nhà tuyển dụng. Cùng tìm hiểu những nguyên tắc cơ bản để CV của bạn nổi bật.',
    content:
      '<p>Một CV tốt là bước đầu tiên để lọt vào mắt xanh của nhà tuyển dụng. Cùng tìm hiểu những nguyên tắc cơ bản để CV của bạn nổi bật.</p><ul><li>Trình bày ngắn gọn, súc tích, tối đa 2 trang</li><li>Nêu bật thành tích bằng số liệu cụ thể</li><li>Tùy chỉnh CV theo từng vị trí ứng tuyển</li></ul>',
    coverImage: null,
    eventGallery: [],
    postedAt: '2026-06-20T00:00:00+07:00',
    author: 'CMB HR',
  },
  {
    id: '2',
    title: '5 kỹ năng mềm nhà tuyển dụng luôn tìm kiếm',
    slug: '5-ky-nang-mem-nha-tuyen-dung-luon-tim-kiem',
    excerpt:
      'Bên cạnh chuyên môn, kỹ năng mềm ngày càng được các nhà tuyển dụng đánh giá cao. Đây là 5 kỹ năng bạn nên rèn luyện.',
    content:
      '<p>Bên cạnh chuyên môn, kỹ năng mềm ngày càng được các nhà tuyển dụng đánh giá cao.</p><ol><li>Giao tiếp hiệu quả</li><li>Làm việc nhóm</li><li>Quản lý thời gian</li><li>Tư duy phản biện</li><li>Khả năng thích nghi</li></ol>',
    coverImage: null,
    eventGallery: [],
    postedAt: '2026-06-10T00:00:00+07:00',
    author: 'CMB HR',
  },
  {
    id: '3',
    title: 'Quy trình phỏng vấn tại CMB diễn ra như thế nào?',
    slug: 'quy-trinh-phong-van-tai-cmb',
    excerpt:
      'Tìm hiểu các bước trong quy trình tuyển dụng của CMB để chuẩn bị tốt nhất cho buổi phỏng vấn sắp tới.',
    content:
      '<p>Quy trình tuyển dụng tại CMB gồm 3 bước chính: sàng lọc hồ sơ, phỏng vấn chuyên môn và phỏng vấn với quản lý trực tiếp.</p>',
    coverImage: null,
    eventGallery: [],
    postedAt: '2026-05-28T00:00:00+07:00',
    author: 'CMB HR',
  },
]
