"use client"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Send, Plus, X } from "lucide-react"

interface Question {
  id: string
  question: string
  placeholder?: string
  type: 'text' | 'number' | 'select' | 'tags' | 'textarea'
  options?: { value: string; label: string }[]
  optional?: boolean
}

interface ChatInputProps {
  question: Question
  onSubmit: (value: string | string[]) => void
  disabled?: boolean
}

export function ChatInput({ question, onSubmit, disabled }: ChatInputProps) {
  const [value, setValue] = useState<string>('')
  const [tags, setTags] = useState<string[]>([])
  const [tagInput, setTagInput] = useState<string>('')
  const inputRef = useRef<HTMLInputElement>(null)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    if (question.type === 'text' || question.type === 'number') {
      inputRef.current?.focus()
    } else if (question.type === 'textarea') {
      textareaRef.current?.focus()
    }
  }, [question])

  const handleSubmit = (e?: React.FormEvent) => {
    e?.preventDefault()

    if (disabled) return

    if (question.type === 'tags') {
      if (tags.length === 0 && !question.optional) return
      onSubmit(tags)
      setTags([])
      setTagInput('')
    } else if (question.type === 'select') {
      if (!value && !question.optional) return
      onSubmit(value)
      setValue('')
    } else {
      if (!value.trim() && !question.optional) return
      onSubmit(value.trim())
      setValue('')
    }
  }

  const addTag = (tag: string) => {
    const trimmedTag = tag.trim()
    if (trimmedTag && !tags.includes(trimmedTag)) {
      setTags([...tags, trimmedTag])
      setTagInput('')
    }
  }

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove))
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      if (question.type === 'tags') {
        e.preventDefault()
        addTag(tagInput)
      } else if (!e.shiftKey) {
        e.preventDefault()
        handleSubmit()
      }
    }
  }

  const handleSkip = () => {
    if (question.optional) {
      onSubmit('')
    }
  }

  const renderInput = () => {
    switch (question.type) {
      case 'select':
        return (
          <div className="space-y-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <AnimatePresence>
                {question.options?.map((option, index) => (
                  <motion.div
                    key={option.value}
                    initial={{ opacity: 0, y: 15, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.9 }}
                    transition={{
                      delay: index * 0.1,
                      type: "spring",
                      stiffness: 300,
                      damping: 25
                    }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Button
                      variant={value === option.value ? "default" : "outline"}
                      className={`
                        w-full justify-start text-left h-auto py-4 px-5
                        transition-all duration-300 border
                        ${value === option.value
                          ? 'bg-gradient-to-r from-primary to-blue-600 border-primary shadow-lg scale-105'
                          : 'hover:border-primary/50 hover:shadow-md hover:bg-primary/5'
                        }
                      `}
                      onClick={() => setValue(option.value)}
                      disabled={disabled}
                    >
                      <span className="truncate font-medium">{option.label}</span>
                      {value === option.value && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="ml-auto text-lg"
                        >
                          ✓
                        </motion.div>
                      )}
                    </Button>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>
        )

      case 'tags':
        return (
          <div className="space-y-3">
            <div className="relative flex items-center">
              <Input
                ref={inputRef}
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                placeholder={question.placeholder}
                onKeyDown={handleKeyDown}
                disabled={disabled}
                className="flex-1 pr-12 border focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all duration-300 rounded-full text-sm placeholder:text-sm"
              />
              <motion.div
                className="absolute right-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  type="button"
                  size="sm"
                  onClick={() => addTag(tagInput)}
                  disabled={disabled || !tagInput.trim()}
                  className="w-8 h-8 rounded-full p-0 bg-gradient-to-r from-primary to-blue-600 hover:from-primary/90 hover:to-blue-600/90 shadow-lg"
                >
                  <Plus className="w-4 h-4" />
                </Button>
              </motion.div>
            </div>

            {tags.length > 0 && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="flex flex-wrap gap-2"
              >
                {tags.map((tag, index) => (
                  <motion.div
                    key={tag}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <Badge
                      variant="secondary"
                      className="cursor-pointer hover:bg-destructive hover:text-destructive-foreground transition-colors"
                      onClick={() => removeTag(tag)}
                    >
                      {tag}
                      <X className="w-3 h-3 ml-1" />
                    </Badge>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </div>
        )

      case 'textarea':
        return (
          <div className="relative">
            <Textarea
              ref={textareaRef}
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder={question.placeholder}
              onKeyDown={handleKeyDown}
              disabled={disabled}
              rows={3}
              className="resize-none pr-12 border focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all duration-300 rounded-2xl text-sm placeholder:text-sm"
            />
            <motion.div
              className="absolute bottom-3 right-3"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                type="submit"
                size="sm"
                disabled={disabled || !canSubmit()}
                className="w-8 h-8 rounded-full p-0 bg-gradient-to-r from-primary to-blue-600 hover:from-primary/90 hover:to-blue-600/90 shadow-lg"
              >
                <Send className="w-4 h-4" />
              </Button>
            </motion.div>
          </div>
        )

      default:
        return (
          <div className="relative flex items-center">
            <Input
              ref={inputRef}
              type={question.type}
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder={question.placeholder}
              onKeyDown={handleKeyDown}
              disabled={disabled}
              className="flex-1 pr-12 border focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all duration-300 rounded-full text-sm placeholder:text-sm"
            />
            <motion.div
              className="absolute right-2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                type="submit"
                size="sm"
                disabled={disabled || !canSubmit()}
                className="w-8 h-8 rounded-full p-0 bg-gradient-to-r from-primary to-blue-600 hover:from-primary/90 hover:to-blue-600/90 shadow-lg"
              >
                <Send className="w-4 h-4" />
              </Button>
            </motion.div>
          </div>
        )
    }
  }

  const canSubmit = () => {
    if (question.type === 'tags') {
      return tags.length > 0 || question.optional
    } else if (question.type === 'select') {
      return value || question.optional
    } else {
      return value.trim() || question.optional
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -30, scale: 0.95 }}
      transition={{
        duration: 0.4,
        type: "spring",
        stiffness: 300,
        damping: 30
      }}
      className="space-y-4"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        {renderInput()}

        {/* Select, Tags에 별도 버튼 표시 */}
        {(question.type === 'select' || (question.type === 'tags' && tags.length > 0)) && (
          <div className="flex gap-2 justify-end mt-4">
            {question.optional && (
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  type="button"
                  variant="ghost"
                  onClick={handleSkip}
                  disabled={disabled}
                  className="text-muted-foreground hover:text-primary transition-colors duration-300"
                >
                  건너뛰기
                </Button>
              </motion.div>
            )}

            {question.type === 'select' && (
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  type="button"
                  onClick={handleSubmit}
                  disabled={disabled || !canSubmit()}
                  className="gap-2 min-w-[120px] bg-gradient-to-r from-primary to-blue-600 hover:from-primary/90 hover:to-blue-600/90 shadow-lg rounded-full"
                >
                  <Send className="w-4 h-4" />
                  선택완료
                </Button>
              </motion.div>
            )}

            {question.type === 'tags' && tags.length > 0 && (
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  type="submit"
                  disabled={disabled}
                  className="gap-2 min-w-[120px] bg-gradient-to-r from-primary to-blue-600 hover:from-primary/90 hover:to-blue-600/90 shadow-lg rounded-full"
                >
                  <Send className="w-4 h-4" />
                  전송 ({tags.length})
                </Button>
              </motion.div>
            )}
          </div>
        )}

        {/* Optional 버튼을 input 타입에도 추가 */}
        {question.optional && ['text', 'number', 'textarea'].includes(question.type) && (
          <div className="flex justify-center mt-2">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={handleSkip}
                disabled={disabled}
                className="text-xs text-muted-foreground hover:text-primary transition-colors duration-300"
              >
                건너뛰기
              </Button>
            </motion.div>
          </div>
        )}
      </form>

      {question.optional && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-xs text-muted-foreground text-center"
        >
          이 질문은 선택사항입니다. 건너뛸 수 있어요.
        </motion.p>
      )}
    </motion.div>
  )
}