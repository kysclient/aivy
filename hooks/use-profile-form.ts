'use client'
import { profileSchema } from '@/lib/validation/profile-schema'
import { useAuth } from '@/providers/auth-provider'
import { User } from '@/types/user'
import { useCallback, useEffect, useRef, useState } from 'react'

interface UseProfileFormProps {
    user: User
    onSuccess?: () => void
    isMe?: boolean
}

export interface ProfileFormData {
    name: string
    description: string
    coverImage?: string | null
    profileImage?: string | null
    coverFile?: File | null
    profileFile?: File | null
}

export const useProfileForm = ({ user, onSuccess, isMe }: UseProfileFormProps) => {
    const { updateProfile } = useAuth()
    const [formData, setFormData] = useState<ProfileFormData>({
        name: user.name || '',
        description: user.description || '',
        coverImage: user.coverImage || null,
        profileImage: user.profileImage || null,
        coverFile: null,
        profileFile: null
    })

    const [errors, setErrors] = useState<Record<string, string[]> | null>(null)
    const [submitting, setSubmitting] = useState(false)
    const fileInputRef = useRef<HTMLInputElement>(null)

    // 이미지 URL 해제
    useEffect(() => {
        return () => {
            if (formData.coverImage && formData.coverFile) URL.revokeObjectURL(formData.coverImage)
            if (formData.profileImage && formData.profileFile) URL.revokeObjectURL(formData.profileImage)
        }
    }, [formData.coverImage, formData.profileImage, formData.coverFile, formData.profileFile])

    // 이미지 업로드 처리
    const handleImageUpload = useCallback((type: 'coverImage' | 'profileImage', event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0]
        if (!file) return

        // 기존 이미지 URL 해제
        setFormData((prev) => {
            if (type === 'coverImage' && prev.coverImage && prev.coverFile) {
                URL.revokeObjectURL(prev.coverImage)
            }
            if (type === 'profileImage' && prev.profileImage && prev.profileFile) {
                URL.revokeObjectURL(prev.profileImage)
            }

            const previewUrl = URL.createObjectURL(file)
            return {
                ...prev,
                [type]: previewUrl,
                [type === 'coverImage' ? 'coverFile' : 'profileFile']: file
            }
        })

        if (fileInputRef.current) fileInputRef.current.value = ''
    }, [])

    // 이미지 제거 처리
    const handleImageRemove = useCallback((type: 'coverImage' | 'profileImage') => {
        setFormData((prev) => {
            if (type === 'coverImage' && prev.coverImage && prev.coverFile) {
                URL.revokeObjectURL(prev.coverImage)
            }
            if (type === 'profileImage' && prev.profileImage && prev.profileFile) {
                URL.revokeObjectURL(prev.profileImage)
            }
            return {
                ...prev,
                [type]: null,
                [type === 'coverImage' ? 'coverFile' : 'profileFile']: null
            }
        })
    }, [])

    // 폼 제출 처리
    const handleSubmit = useCallback(async () => {
        setSubmitting(true)
        setErrors(null)

        const validationData = {
            name: formData.name,
            description: formData.description,
            coverImage: formData.coverFile,
            profileImage: formData.profileFile
        }

        const result = profileSchema.safeParse(validationData)
        if (!result.success) {
            setErrors(result.error.flatten().fieldErrors)
            setSubmitting(false)
            return
        }

        const submitData = new FormData()
        submitData.append('name', formData.name)
        if (formData.description) submitData.append('description', formData.description)
        if (formData.coverFile) submitData.append('cover_image', formData.coverFile)
        if (formData.profileFile) submitData.append('profile_image', formData.profileFile)

        try {
            const response = await updateProfile(submitData)

        } catch (error) {
            setErrors({ general: ['서버 오류가 발생했습니다'] })
        } finally {
            setSubmitting(false)
        }
    }, [formData, onSuccess])

    // 파일 입력 트리거
    const triggerFileInput = useCallback((type: 'coverImage' | 'profileImage') => {
        if (fileInputRef.current) {
            fileInputRef.current.dataset.type = type
            fileInputRef.current.click()
        }
    }, [])

    return {
        formData,
        setFormData,
        errors,
        submitting,
        fileInputRef,
        handleImageUpload,
        handleImageRemove,
        handleSubmit,
        triggerFileInput
    }
}

