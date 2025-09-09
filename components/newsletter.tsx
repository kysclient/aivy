'use client'

import { useEffect, useRef, useState } from 'react'
import { Button, buttonVariants } from './ui/button'
import { AnimatePresence, motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import { ArrowRightIcon, Croissant } from 'lucide-react'
import { useRouter } from 'next/navigation'

const DURATION = 0.3
const DELAY = DURATION
const EASE_OUT = 'easeOut'
const EASE_OUT_OPACITY = [0.25, 0.46, 0.45, 0.94] as const
const SPRING = {
  type: 'spring' as const,
  stiffness: 60,
  damping: 10,
  mass: 0.8
}

export const Newsletter = () => {
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(false)
  const isInitialRender = useRef(true)

  useEffect(() => {
    return () => {
      isInitialRender.current = false
    }
  }, [isOpen])

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false)
      }
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [])

  function inputVariants(): string | undefined {
    throw new Error('Function not implemented.')
  }

  return (
    <div className="flex overflow-hidden relative flex-col gap-4 justify-center items-center pt-10 w-full h-full short:lg:pt-10 pb-footer-safe-area 2xl:pt-footer-safe-area px-sides short:lg:gap-4 lg:gap-8">
      <motion.div layout="position" transition={{ duration: DURATION, ease: EASE_OUT }}>
        <h1 className="font-serif text-5xl italic short:lg:text-8xl sm:text-8xl lg:text-9xl text-white">Aivy</h1>
      </motion.div>

      <div className="flex flex-col items-center min-h-0 shrink">
        <AnimatePresenceGuard>
          {!isOpen && (
            <motion.div
              key="newsletter"
              initial={isInitialRender.current ? false : 'hidden'}
              animate="visible"
              exit="exit"
              variants={{
                visible: {
                  scale: 1,
                  transition: {
                    delay: DELAY,
                    duration: DURATION,
                    ease: EASE_OUT
                  }
                },
                hidden: {
                  scale: 0.9,
                  transition: { duration: DURATION, ease: EASE_OUT }
                },
                exit: {
                  y: -150,
                  scale: 0.9,
                  transition: { duration: DURATION, ease: EASE_OUT }
                }
              }}
            >
              <div className="flex flex-col gap-4 w-full max-w-xl md:gap-6 lg:gap-8">
                {/* <FormNewsletter
                                    input={(props: any) => (
                                        <motion.input
                                            autoCapitalize="off"
                                            autoComplete="email"
                                            placeholder="Enter your email"
                                            className={inputVariants()}
                                            initial={isInitialRender.current ? false : { opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            exit={{
                                                opacity: 0,
                                                transition: {
                                                    duration: DURATION,
                                                    ease: EASE_OUT_OPACITY,
                                                },
                                            }}
                                            transition={{
                                                duration: DURATION,
                                                ease: EASE_OUT,
                                                delay: DELAY,
                                            }}
                                            {...props}
                                        />
                                    )}
                                    submit={(props: any) => (
                                        <motion.button
                                            className={buttonVariants({
                                                variant: "iconButton",
                                                size: "icon-xl",
                                            })}
                                            {...props}
                                            initial={isInitialRender.current ? false : { opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            exit={{
                                                opacity: 0,
                                                transition: {
                                                    duration: DURATION,
                                                    ease: EASE_OUT_OPACITY,
                                                },
                                            }}
                                            transition={{
                                                duration: DURATION,
                                                ease: EASE_OUT,
                                                delay: DELAY,
                                            }}
                                        >
                                            <ArrowRightIcon className="w-4 h-4 text-current" />
                                        </motion.button>
                                    )}
                                /> */}
                <motion.p
                  initial={isInitialRender.current ? false : { opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{
                    opacity: 0,
                    transition: { duration: DURATION, ease: EASE_OUT_OPACITY }
                  }}
                  transition={{
                    duration: DURATION,
                    ease: EASE_OUT,
                    delay: DELAY
                  }}
                  className="text-base short:lg:text-lg sm:text-lg lg:text-xl !leading-[1.1] font-bold text-center text-white text-pretty"
                >
                  당신만을 위한 하루 한 끼, 아이비가 알아서 챙겨드립니다.
                </motion.p>
              </div>
            </motion.div>
          )}

          <motion.div layout="position" transition={SPRING} key="button" className={isOpen ? 'my-6' : 'mt-6'}>
            <Button className={cn('relative px-8 w-[100px]')} onClick={() => setIsOpen(!isOpen)} shine={!isOpen}>
              <motion.span animate={{ x: isOpen ? -16 : 0 }} transition={{ duration: DURATION, ease: EASE_OUT }} className="inline-block font-semibold">
                Manifesto
              </motion.span>

              {isOpen && (
                <motion.div
                  className={cn(buttonVariants({ variant: 'iconButton', size: 'icon' }), 'absolute -top-px -right-px aspect-square')}
                  initial={{ opacity: 0, scale: 0.8, rotate: -40 }}
                  animate={{ opacity: 1, scale: 1, rotate: 0 }}
                  transition={{
                    duration: DURATION,
                    ease: EASE_OUT,
                    delay: DELAY
                  }}
                >
                  <Croissant className="size-5 text-primary-foreground" />
                </motion.div>
              )}
            </Button>
          </motion.div>

          {isOpen && (
            <motion.div
              key="manifesto"
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={{
                visible: {
                  opacity: 1,
                  scale: 1,
                  transition: {
                    delay: DELAY,
                    duration: DURATION,
                    ease: EASE_OUT
                  }
                },
                hidden: {
                  opacity: 0,
                  scale: 0.9,
                  transition: { duration: DURATION, ease: EASE_OUT }
                },
                exit: {
                  opacity: 0,
                  scale: 0.9,
                  transition: { duration: DURATION, ease: EASE_OUT_OPACITY }
                }
              }}
              className="relative flex min-h-0 flex-shrink overflow-hidden text-sm md:text-base max-h-[calc(70dvh-var(--footer-safe-area))] flex-col gap-8 text-center backdrop-blur-xl text-balance border-2 border-border/50 bg-primary/20 max-w-3xl text-white rounded-3xl ring-1 ring-offset-primary/10 ring-border/10 ring-offset-2 shadow-button"
            >
              <article className="relative overflow-y-auto italic p-6 h-full [&_p]:my-4">
                <p>우리는 개인 맞춤 영양의 새로운 시대를 열고 있습니다. 인공지능과 요리의 창의성이 만나, 매일의 식사가 단순한 끼니를 넘어 삶을 변화시키는 경험이 되도록 합니다. 우리의 미션은 누구나 쉽고 즐겁게 건강한 식단을 누릴 수 있도록, 스마트하고 혁신적인 맞춤 식단 솔루션을 제공하는 것입니다.</p>

                <p>우리는 기술과 영양의 경계를 넓히며, 단순한 편리함을 넘어 삶을 변화시키는 경험을 창조합니다. 복잡한 선택은 줄이고, 누구나 직관적으로 활용할 수 있는 경험을 설계하며, 지속 가능한 방식으로 지구와 건강을 동시에 지키는 것을 최우선으로 합니다. 우리는 호기심과 열정을 가진 모든 이들을 하나로 연결하고, 더 건강하고 스마트한 세상을 만들어가는 커뮤니티를 구축합니다.</p>
                <p>우리의 약속은 누구나 쉽게 접근할 수 있는 최첨단 AI 식단 솔루션을 제공하고, 변화와 혁신을 주도하며, 매일의 식탁에서 건강과 즐거움을 선사하는 것입니다. 함께 이 여정에 동참하여, 매 순간 건강한 선택이 자연스러워지는 세상을 만들어가세요.</p>
              </article>
            </motion.div>
          )}

          <Button className={cn('relative px-8 w-[100px] mt-4')} onClick={() => router.push('/')} shine={!isOpen}>
            Home
          </Button>
        </AnimatePresenceGuard>
      </div>
    </div>
  )
}

const AnimatePresenceGuard = ({ children }: { children: React.ReactNode }) => {
  return (
    <AnimatePresence mode="popLayout" propagate>
      {children}
    </AnimatePresence>
  )
}
