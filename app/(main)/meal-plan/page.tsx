"use client"

import MealPlanChatbot from '@/components/meal-plan/chatbot/meal-plan-chatbot'
import MealPlanMain from '@/components/meal-plan/meal-plan-main'
import { MenuHeader } from '@/layouts/menu-header'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { MessageCircle, Settings } from 'lucide-react'

export default function Page() {
  const [viewMode, setViewMode] = useState<'chatbot' | 'form'>('chatbot')

  return (
    <>
      <MenuHeader title="AI 식단생성" />
      <div className="p-4 pb-0">
        <div className="max-w-4xl mx-auto mb-4">
          <div className="flex gap-2 justify-center">
            <Button
              variant={viewMode === 'chatbot' ? 'default' : 'outline'}
              onClick={() => setViewMode('chatbot')}
              className="gap-2"
            >
              <MessageCircle className="w-4 h-4" />
              챗봇 모드
            </Button>
            <Button
              variant={viewMode === 'form' ? 'default' : 'outline'}
              onClick={() => setViewMode('form')}
              className="gap-2"
            >
              <Settings className="w-4 h-4" />
              폼 모드
            </Button>
          </div>
        </div>
      </div>

      {viewMode === 'chatbot' ? <MealPlanChatbot /> : <MealPlanMain />}
    </>
  )
}
