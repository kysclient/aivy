"use client"

import { motion } from "framer-motion"
import { Bot, User } from "lucide-react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export interface ChatMessage {
  id: string
  type: 'bot' | 'user'
  content: string | React.ReactNode
  timestamp: Date
  isTyping?: boolean
}

interface ChatMessageProps {
  message: ChatMessage
}

export function ChatMessage({ message }: ChatMessageProps) {
  const isBot = message.type === 'bot'

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -20, scale: 0.95 }}
      transition={{
        duration: 0.4,
        ease: "easeOut",
        type: "spring",
        stiffness: 300,
        damping: 30
      }}
      className={`flex gap-3 ${isBot ? 'justify-start' : 'justify-end'}`}
    >
      {isBot && (
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ delay: 0.1, duration: 0.5, type: "spring" }}
          className="shrink-0"
        >
          <Avatar className="w-8 h-8 sm:w-10 sm:h-10 border-2 border-primary/30 shadow-lg">
            <AvatarFallback className="bg-gradient-to-br from-primary via-blue-500 to-purple-500">
              <motion.div
                animate={{
                  scale: [1, 1.1, 1],
                  rotate: [0, 5, -5, 0]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  repeatDelay: 3
                }}
              >
                <Bot className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
              </motion.div>
            </AvatarFallback>
          </Avatar>
        </motion.div>
      )}

      <div className={`max-w-[85%] sm:max-w-[75%] ${isBot ? 'mr-auto' : 'ml-auto'} min-w-0`}>
        <motion.div
          initial={{
            opacity: 0,
            x: isBot ? -20 : 20,
            scale: 0.8
          }}
          animate={{
            opacity: 1,
            x: 0,
            scale: 1
          }}
          transition={{
            delay: 0.2,
            duration: 0.4,
            type: "spring",
            stiffness: 400,
            damping: 25
          }}
          whileHover={{
            scale: 1.02,
            transition: { duration: 0.2 }
          }}
          className={`
            relative backdrop-blur-sm
            ${isBot
              ? 'bg-muted/80 text-foreground border border-border/50 shadow-lg'
              : 'bg-primary text-white shadow-lg'
            }
            rounded-2xl px-3 py-3 sm:px-5 sm:py-4
            ${isBot ? 'rounded-tl-md' : 'rounded-tr-md'}
            hover:shadow-xl transition-shadow duration-300
          `}
        >
          {message.isTyping ? (
            <div className="flex items-center gap-2">
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 0.6, repeat: Infinity }}
                className="w-2 h-2 bg-primary rounded-full"
              />
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }}
                className="w-2 h-2 bg-primary rounded-full"
              />
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 0.6, repeat: Infinity, delay: 0.4 }}
                className="w-2 h-2 bg-primary rounded-full"
              />
              <span className="text-sm text-muted-foreground ml-2">생각하는 중...</span>
            </div>
          ) : (
            <div className="space-y-2">
              {typeof message.content === 'string' ? (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3, duration: 0.4 }}
                  className="text-sm leading-relaxed"
                >
                  {message.content}
                </motion.p>
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3, duration: 0.4 }}
                >
                  {message.content}
                </motion.div>
              )}
            </div>
          )}

          {!isBot && (
            <div className={`
              absolute top-3 -right-2
              w-0 h-0
              border-l-8 border-l-primary
              border-t-4 border-t-transparent
              border-b-4 border-b-transparent
            `} />
          )}

          {isBot && (
            <div className={`
              absolute top-3 -left-2
              w-0 h-0
              border-r-8 border-r-card
              border-t-4 border-t-transparent
              border-b-4 border-b-transparent
            `} />
          )}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.3 }}
          className={`
            text-xs text-muted-foreground mt-1 px-1
            ${isBot ? 'text-left' : 'text-right'}
          `}
        >
          {message.timestamp.toLocaleTimeString('ko-KR', {
            hour: '2-digit',
            minute: '2-digit'
          })}
        </motion.div>
      </div>

      {/* {!isBot && (
        <motion.div
          initial={{ scale: 0, rotate: 180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ delay: 0.1, duration: 0.4, type: "spring" }}
        >
          <Avatar className="w-10 h-10 border-2 border-primary/30 shadow-lg">
            <AvatarFallback className="bg-gradient-to-br from-purple-500 via-pink-500 to-rose-500">
              <motion.div
                animate={{
                  scale: [1, 1.05, 1]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  repeatDelay: 4
                }}
              >
                <User className="w-5 h-5 text-white" />
              </motion.div>
            </AvatarFallback>
          </Avatar>
        </motion.div>
      )} */}
    </motion.div>
  )
}