import { z } from 'zod'

export const profileSchema = z.object({
    name: z.string().min(1, '이름은 필수입니다').max(10, '이름은 10자 이내로 입력하세요'),
    description: z.string().max(200, '설명은 200자 이내로 입력하세요').optional(),
    coverImage: z
        .union([z.instanceof(File), z.null()])
        .optional()
        .refine((file) => !file || file.size <= 5 * 1024 * 1024, '커버 이미지는 5MB 이하로 업로드하세요'),
    profileImage: z
        .union([z.instanceof(File), z.null()])
        .optional()
        .refine((file) => !file || file.size <= 5 * 1024 * 1024, '프로필 이미지는 5MB 이하로 업로드하세요')
})
