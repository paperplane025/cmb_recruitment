/**
 * Ví dụ unit test — cài Vitest để chạy:
 * npm i -D vitest
 * npx vitest src/tests/unit/dateUtils.test.ts
 */
import { describe, expect, it } from 'vitest'
import { formatDate } from '@/shared/utils/dateUtils.ts'

describe('formatDate', () => {
  it('formats ISO date for vi-VN locale', () => {
    const result = formatDate('2026-05-01', 'vi-VN')
    expect(result).toMatch(/01/)
    expect(result).toMatch(/05/)
    expect(result).toMatch(/2026/)
  })
})
