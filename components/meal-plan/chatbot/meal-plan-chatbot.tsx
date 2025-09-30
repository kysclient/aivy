"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Sparkles, Bot, Calendar } from "lucide-react"
import { ChatMessage as ChatMessageComponent } from "./chat-message"
import { ChatInput } from "./chat-input"
import { useSocket } from "@/providers/socket-provider"
import { mealPlanRepository } from "@/repositoires/RepositoryFactory"
import TokenManager from "@/lib/token-manager"
import { MealPlan, MealPlanStatus, MealPlanStatusUpdate } from "@/repositoires/MealPlanRepository"
import { toast } from "sonner"
import { getMealPlanDates } from "@/lib/utils"
import { useRouter } from "next/navigation"
import { useGeneratingMealPlans } from "@/hooks/use-meal-plan"

export interface ChatMessage {
  id: string
  type: 'bot' | 'user'
  content: string | React.ReactNode
  timestamp: Date
  isTyping?: boolean
}

export interface UserProfile {
  title: string
  name: string
  age: string
  gender: string
  height: string
  weight: string
  activityLevel: string
  goal: string
  allergies: string[]
  excludeFoods: string[]
  targetCalories: number | null
  specialRequests: string
}

const questions = [
  {
    id: 'title',
    question: '안녕하세요! 🍽️ AI 식단 생성을 도와드릴게요. 먼저 이번 식단의 제목을 정해주세요.',
    placeholder: '예: 다이어트 식단, 헬스 식단 등',
    type: 'text' as const
  },
  {
    id: 'name',
    question: '반가워요! 성함을 알려주세요.',
    placeholder: '홍길동',
    type: 'text' as const
  },
  {
    id: 'age',
    question: '나이를 알려주시면 더 정확한 식단을 만들어드릴 수 있어요.',
    placeholder: '25',
    type: 'number' as const
  },
  {
    id: 'gender',
    question: '성별을 선택해주세요.',
    type: 'select' as const,
    options: [
      { value: 'male', label: '남성' },
      { value: 'female', label: '여성' },
      { value: 'other', label: '기타' }
    ]
  },
  {
    id: 'height',
    question: '키를 알려주세요 (cm)',
    placeholder: '170',
    type: 'number' as const
  },
  {
    id: 'weight',
    question: '현재 몸무게를 알려주세요 (kg)',
    placeholder: '65',
    type: 'number' as const
  },
  {
    id: 'activityLevel',
    question: '평소 활동 수준은 어떻게 되시나요?',
    type: 'select' as const,
    options: [
      { value: 'sedentary', label: '좌식 생활 (운동 거의 안함)' },
      { value: 'light', label: '가벼운 활동 (주 1-3회 운동)' },
      { value: 'moderate', label: '보통 활동 (주 3-5회 운동)' },
      { value: 'active', label: '활발한 활동 (주 6-7회 운동)' },
      { value: 'very-active', label: '매우 활발 (하루 2회 운동)' }
    ]
  },
  {
    id: 'goal',
    question: '어떤 목표를 가지고 계신가요?',
    type: 'select' as const,
    options: [
      { value: 'weight-loss', label: '체중 감량' },
      { value: 'weight-gain', label: '체중 증가' },
      { value: 'muscle-gain', label: '근육 증가' },
      { value: 'maintenance', label: '현재 체중 유지' },
      { value: 'health', label: '건강 관리' }
    ]
  },
  {
    id: 'targetCalories',
    question: '목표 일일 칼로리가 있으시면 알려주세요. (선택사항)',
    placeholder: '2000 (비워두시면 자동으로 계산해드려요)',
    type: 'number' as const,
    optional: true
  },
  {
    id: 'allergies',
    question: '알레르기가 있으시면 알려주세요. (선택사항)',
    placeholder: '예: 견과류, 갑각류, 계란 등 (쉼표로 구분)',
    type: 'tags' as const,
    optional: true
  },
  {
    id: 'excludeFoods',
    question: '제외하고 싶은 음식이 있으시면 알려주세요. (선택사항)',
    placeholder: '예: 매운음식, 생선, 유제품 등 (쉼표로 구분)',
    type: 'tags' as const,
    optional: true
  },
  {
    id: 'specialRequests',
    question: '마지막으로 특별한 요청사항이 있으시면 말씀해주세요. (선택사항)',
    placeholder: '예: 저염식으로 준비해주세요, 매운 음식 선호 등',
    type: 'textarea' as const,
    optional: true
  }
]

export default function MealPlanChatbot() {
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [userProfile, setUserProfile] = useState<UserProfile>({
    title: '',
    name: '',
    age: '',
    gender: '',
    height: '',
    weight: '',
    activityLevel: '',
    goal: '',
    allergies: [],
    excludeFoods: [],
    targetCalories: null,
    specialRequests: ''
  })
  const [isGenerating, setIsGenerating] = useState(false)
  const [isComplete, setIsComplete] = useState(false)
  const [progress, setProgress] = useState(0)

  const messagesEndRef = useRef<HTMLDivElement>(null)
  const { isConnected, socket } = useSocket()
  const {
    generatingMealPlans,
    count
  } = useGeneratingMealPlans()
  const token = TokenManager.getAccessToken()
  const router = useRouter()

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  useEffect(() => {
    const welcomeMessage: ChatMessage = {
      id: 'welcome',
      type: 'bot',
      content: questions[0].question,
      timestamp: new Date()
    }

    setMessages([welcomeMessage])
  }, [])

  useEffect(() => {
    if (!socket || !isConnected) return

    const handleStatusUpdate = (data: MealPlanStatusUpdate) => {
      if (data.progress !== undefined) {
        setProgress(data.progress)
      }

      if (data.message) {
        const botMessage: ChatMessage = {
          id: `status-${Date.now()}`,
          type: 'bot',
          content: data.message,
          timestamp: new Date()
        }
        setMessages(prev => [...prev, botMessage])
      }

      switch (data.status) {
        case MealPlanStatus.GENERATING:
          setIsGenerating(true)
          break

        case MealPlanStatus.COMPLETED:
          setProgress(100)
          setIsGenerating(false)
          setIsComplete(true)
          const { startDate, endDate } = getMealPlanDates()

          const completionMessage: ChatMessage = {
            id: `completion-${Date.now()}`,
            type: 'bot',
            content: (
              <div className="space-y-4">
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-emerald-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Sparkles className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-emerald-600 mb-2">
                    🎉 맞춤형 식단이 완성되었습니다!
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    {userProfile.name}님을 위한 건강한 30일 식단이 준비되었어요
                  </p>
                </div>
                <div className="flex gap-3">
                  <Button
                    onClick={() => router.push('/plans')}
                    className="flex-1 bg-gradient-to-r from-emerald-500 to-blue-500 hover:from-emerald-600 hover:to-blue-600 text-white"
                  >
                    <Calendar className="w-4 h-4 mr-2" />
                    나의 식단 보러가기
                  </Button>
                  <Button
                    variant="outline"
                    onClick={resetChat}
                    className="flex-1"
                  >
                    새로운 식단 만들기
                  </Button>
                </div>
              </div>
            ),
            timestamp: new Date()
          }
          setMessages(prev => [...prev, completionMessage])
          break

        case MealPlanStatus.FAILED:
          setProgress(0)
          setIsGenerating(false)
          const errorMessage: ChatMessage = {
            id: `error-${Date.now()}`,
            type: 'bot',
            content: '죄송합니다. 식단 생성에 실패했습니다. 다시 시도해주세요.',
            timestamp: new Date()
          }
          setMessages(prev => [...prev, errorMessage])
          break
      }
    }

    socket.on('meal-plan-status', handleStatusUpdate)

    return () => {
      socket.off('meal-plan-status', handleStatusUpdate)
    }
  }, [socket, isConnected, userProfile.name, router])

  useEffect(() => {
    if (count > 0) {
      setIsGenerating(true)
    }
  }, [count])

  const resetChat = () => {
    setMessages([{
      id: 'welcome-reset',
      type: 'bot',
      content: questions[0].question,
      timestamp: new Date()
    }])
    setCurrentQuestionIndex(0)
    setUserProfile({
      title: '',
      name: '',
      age: '',
      gender: '',
      height: '',
      weight: '',
      activityLevel: '',
      goal: '',
      allergies: [],
      excludeFoods: [],
      targetCalories: null,
      specialRequests: ''
    })
    setIsGenerating(false)
    setIsComplete(false)
    setProgress(0)
  }

  const handleUserResponse = async (value: string | string[]) => {
    const currentQuestion = questions[currentQuestionIndex]

    // 선택형 질문의 경우 라벨을 찾아서 표시
    let displayValue = Array.isArray(value) ? value.join(', ') : value

    if (currentQuestion.type === 'select' && currentQuestion.options && !Array.isArray(value)) {
      const selectedOption = currentQuestion.options.find(option => option.value === value)
      displayValue = selectedOption ? selectedOption.label : value
    }

    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      type: 'user',
      content: displayValue,
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])

    const updatedProfile = { ...userProfile }

    if (currentQuestion.type === 'tags') {
      const tags = Array.isArray(value) ? value : value.split(',').map(tag => tag.trim()).filter(tag => tag)
      ;(updatedProfile as any)[currentQuestion.id] = tags
    } else if (currentQuestion.id === 'targetCalories') {
      ;(updatedProfile as any)[currentQuestion.id] = value ? parseInt(value as string) : null
    } else {
      ;(updatedProfile as any)[currentQuestion.id] = value
    }

    setUserProfile(updatedProfile)

    await new Promise(resolve => setTimeout(resolve, 800))

    if (currentQuestionIndex < questions.length - 1) {
      const nextQuestion = questions[currentQuestionIndex + 1]
      const botMessage: ChatMessage = {
        id: `bot-${Date.now()}`,
        type: 'bot',
        content: nextQuestion.question,
        timestamp: new Date()
      }

      setMessages(prev => [...prev, botMessage])
      setCurrentQuestionIndex(currentQuestionIndex + 1)
    } else {
      generateMealPlan(updatedProfile)
    }
  }

  const generateMealPlan = async (profile: UserProfile) => {
    if (!token) {
      toast("로그인 후 이용해주세요.", {
        action: {
          label: "로그인",
          onClick: () => router.push('/auth'),
        },
      })
      return
    }

    const generatingMessage: ChatMessage = {
      id: `generating-${Date.now()}`,
      type: 'bot',
      content: (
        <div className="space-y-4">
          <div className="text-center">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full mx-auto mb-4"
            />
            <p className="text-primary font-medium">
              {profile.name}님의 맞춤형 식단을 생성하고 있어요...
            </p>
            <p className="text-sm text-muted-foreground mt-2">
              영양소 균형을 맞춰 30일 식단을 만들고 있습니다
            </p>
          </div>
          {progress > 0 && (
            <div className="w-full bg-muted rounded-full h-2">
              <motion.div
                className="bg-gradient-to-r from-primary to-blue-500 h-2 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
          )}
        </div>
      ),
      timestamp: new Date()
    }

    setMessages(prev => [...prev, generatingMessage])
    setIsGenerating(true)

    const { startDate, endDate } = getMealPlanDates()
    const bodyData = {
      ...profile,
      startDate,
      endDate,
      age: parseInt(profile.age),
      height: parseInt(profile.height),
      weight: parseInt(profile.weight),
    }

    try {
      await mealPlanRepository.generateMealPlan(bodyData)
    } catch (error) {
      setIsGenerating(false)
      const errorMessage: ChatMessage = {
        id: `error-${Date.now()}`,
        type: 'bot',
        content: '죄송합니다. 식단 생성 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.',
        timestamp: new Date()
      }
      setMessages(prev => [...prev, errorMessage])
      toast('식단 생성에 실패했습니다. 잠시 후 다시 시도해주세요.')
    }
  }

  return (
    <div className="flex flex-col h-[calc(100vh-12rem)] w-full">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col h-full"
      >
        {/* Header */}
        <motion.div
          className="p-4 border-b bg-gradient-to-r from-primary/10 via-blue-500/10 to-purple-500/10 backdrop-blur-sm"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="flex items-center gap-4">
            <motion.div
              className="w-10 h-10 bg-gradient-to-r from-primary via-blue-500 to-purple-500 rounded-full flex items-center justify-center shadow-lg"
              animate={{
                boxShadow: [
                  "0 4px 20px rgba(59, 130, 246, 0.3)",
                  "0 4px 30px rgba(147, 51, 234, 0.4)",
                  "0 4px 20px rgba(59, 130, 246, 0.3)"
                ]
              }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <Bot className="w-5 h-5 text-white" />
            </motion.div>
            <div>
              <h2 className="font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
                AI 식단 생성 도우미
              </h2>
              <p className="text-xs text-muted-foreground font-medium">
                {isGenerating ? (
                  <motion.span
                    animate={{ opacity: [1, 0.5, 1] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    🤖 식단 생성 중...
                  </motion.span>
                ) : isComplete ? (
                  <span className="text-emerald-600">✨ 완료!</span>
                ) : (
                  <span>💬 질문 {currentQuestionIndex + 1} / {questions.length}</span>
                )}
              </p>
            </div>
          </div>
        </motion.div>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gradient-to-b from-transparent to-muted/5">
          <AnimatePresence mode="popLayout">
            {messages.map((message) => (
              <ChatMessageComponent key={message.id} message={message} />
            ))}
          </AnimatePresence>
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area - Fixed at bottom */}
        {!isGenerating && !isComplete && currentQuestionIndex < questions.length && (
          <motion.div
            className="p-2 sm:p-4 border-t bg-background/80 backdrop-blur-sm"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <ChatInput
              question={questions[currentQuestionIndex]}
              onSubmit={handleUserResponse}
              disabled={isGenerating}
            />
          </motion.div>
        )}
      </motion.div>
    </div>
  )
}