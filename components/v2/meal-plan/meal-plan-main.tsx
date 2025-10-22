'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
    Sparkles,
    Bot,
    Calendar,
    Menu,
    Plus,
    Send,
    ArrowLeft,
    User,
    Settings,
    PanelLeft,
    MoveUp
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useSocket } from '@/providers/socket-provider';
import { mealPlanRepository } from '@/repositoires/RepositoryFactory';
import TokenManager from '@/lib/token-manager';
import { MealPlanStatus, MealPlanStatusUpdate } from '@/repositoires/MealPlanRepository';
import { toast } from 'sonner';
import { getMealPlanDates } from '@/lib/utils';
import { useRouter } from 'next/navigation';
import { useGeneratingMealPlans } from '@/hooks/use-meal-plan';
import { AuthModal } from '@/components/modal/auth-modal';
import { useScreenSize } from '@/hooks/use-screen-size';
import { AiIcon, UserIcon } from '@/components/icons';
import { useAuth } from '@/providers/auth-provider';
import { SidebarUserNav } from '@/components/sidebar-user-nav';
import { UserAvatar } from '../user-avatar';

interface ChatMessage {
    id: string;
    type: 'bot' | 'user';
    content: string | React.ReactNode;
    timestamp: Date;
}

interface UserProfile {
    title: string;
    name: string;
    age: string;
    gender: string;
    height: string;
    weight: string;
    activityLevel: string;
    goal: string;
    allergies: string[];
    excludeFoods: string[];
    targetCalories: number | null;
    specialRequests: string;
}

const questions = [
    {
        id: 'name',
        question: '반가워요! 성함을 알려주세요.',
        placeholder: '홍길동',
        type: 'text' as const,
    },
    {
        id: 'age',
        question: '나이를 알려주시면 더 정확한 식단을 만들어드릴 수 있어요.',
        placeholder: '25',
        type: 'number' as const,
    },
    {
        id: 'gender',
        question: '성별을 선택해주세요.',
        type: 'select' as const,
        options: [
            { value: 'male', label: '남성' },
            { value: 'female', label: '여성' },
            { value: 'other', label: '기타' },
        ],
    },
    {
        id: 'height',
        question: '키를 알려주세요 (cm)',
        placeholder: '170',
        type: 'number' as const,
    },
    {
        id: 'weight',
        question: '현재 몸무게를 알려주세요 (kg)',
        placeholder: '65',
        type: 'number' as const,
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
            { value: 'very-active', label: '매우 활발 (하루 2회 운동)' },
        ],
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
            { value: 'health', label: '건강 관리' },
        ],
    },
    {
        id: 'targetCalories',
        question: '목표 일일 칼로리가 있으시면 알려주세요.',
        placeholder: '2000 (선택사항)',
        type: 'number' as const,
        optional: true,
    },
    {
        id: 'allergies',
        question: '알레르기가 있으시면 알려주세요.',
        placeholder: '예: 견과류, 갑각류, 계란 등 (쉼표로 구분, 선택사항)',
        type: 'tags' as const,
        optional: true,
    },
    {
        id: 'excludeFoods',
        question: '제외하고 싶은 음식이 있으시면 알려주세요.',
        placeholder: '예: 매운음식, 생선, 유제품 등 (쉼표로 구분, 선택사항)',
        type: 'tags' as const,
        optional: true,
    },
    {
        id: 'specialRequests',
        question: '마지막으로 특별한 요청사항이 있으시면 말씀해주세요.',
        placeholder: '예: 저염식으로 준비해주세요, 매운 음식 선호 등 (선택사항)',
        type: 'textarea' as const,
        optional: true,
    },
];

export default function MealPlanMain({ title }: { title?: string }) {
    const { user } = useAuth();
    const { isMobile } = useScreenSize();
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [inputValue, setInputValue] = useState('');
    const [isGenerating, setIsGenerating] = useState(false);
    const [isComplete, setIsComplete] = useState(false);
    const [progress, setProgress] = useState(0);
    const [authModalOpen, setAuthModalOpen] = useState(false);
    const [pendingProfile, setPendingProfile] = useState<UserProfile | null>(null);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const { isConnected, socket } = useSocket();
    const { generatingMealPlans, count } = useGeneratingMealPlans();
    const token = TokenManager.getAccessToken();
    const router = useRouter();



    const [userProfile, setUserProfile] = useState<UserProfile>({
        title: title || '',
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
        specialRequests: '',
    });

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    useEffect(() => {
        const welcomeMessage: ChatMessage = {
            id: 'welcome',
            type: 'bot',
            content: `안녕하세요! "${title || '맞춤형 식단'}" 생성을 시작하겠습니다. ${questions[0].question}`,
            timestamp: new Date(),
        };
        setMessages([welcomeMessage]);
    }, [title]);

    useEffect(() => {
        if (!socket || !isConnected) return;

        const handleStatusUpdate = (data: MealPlanStatusUpdate) => {
            if (data.progress !== undefined) {
                setProgress(data.progress);
            }

            if (data.message) {
                const botMessage: ChatMessage = {
                    id: `status-${Date.now()}`,
                    type: 'bot',
                    content: data.message,
                    timestamp: new Date(),
                };
                setMessages((prev) => [...prev, botMessage]);
            }

            switch (data.status) {
                case MealPlanStatus.GENERATING:
                    setIsGenerating(true);
                    break;

                case MealPlanStatus.COMPLETED:
                    setProgress(100);
                    setIsGenerating(false);
                    setIsComplete(true);

                    const completionMessage: ChatMessage = {
                        id: `completion-${Date.now()}`,
                        type: 'bot',
                        content: (
                            <div className="space-y-4">
                                <div className="flex items-center gap-3">
                                    <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-blue-500 rounded-full flex items-center justify-center">
                                        <Sparkles className="w-6 h-6 text-white" />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-bold text-emerald-600">
                                            🎉 맞춤형 식단이 완성되었습니다!
                                        </h3>
                                        <p className="text-sm text-muted-foreground">
                                            {userProfile.name}님을 위한 30일 식단이 준비되었어요
                                        </p>
                                    </div>
                                </div>
                                <div className="flex gap-3">
                                    <Button
                                        onClick={() => router.push('/plans')}
                                        className="flex-1 bg-primary hover:bg-primary/90"
                                    >
                                        <Calendar className="w-4 h-4 mr-2" />
                                        식단 보러가기
                                    </Button>
                                    <Button variant="outline" className="flex-1" onClick={resetChat}>
                                        새로운 식단 만들기
                                    </Button>
                                </div>
                            </div>
                        ),
                        timestamp: new Date(),
                    };
                    setMessages((prev) => [...prev, completionMessage]);
                    break;

                case MealPlanStatus.FAILED:
                    setProgress(0);
                    setIsGenerating(false);
                    const errorMessage: ChatMessage = {
                        id: `error-${Date.now()}`,
                        type: 'bot',
                        content: '죄송합니다. 식단 생성에 실패했습니다. 다시 시도해주세요.',
                        timestamp: new Date(),
                    };
                    setMessages((prev) => [...prev, errorMessage]);
                    break;
            }
        };

        socket.on('meal-plan-status', handleStatusUpdate);

        return () => {
            socket.off('meal-plan-status', handleStatusUpdate);
        };
    }, [socket, isConnected, userProfile.name, router]);

    useEffect(() => {
        if (count > 0) {
            setIsGenerating(true);
        }
    }, [count]);


    useEffect(() => {
        setSidebarOpen(!isMobile);
    }, [isMobile])

    const resetChat = () => {
        setMessages([
            {
                id: 'welcome-reset',
                type: 'bot',
                content: `안녕하세요! "${title || '맞춤형 식단'}" 생성을 시작하겠습니다. ${questions[0].question}`,
                timestamp: new Date(),
            },
        ]);
        setCurrentQuestionIndex(0);
        setUserProfile({
            title: title || '',
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
            specialRequests: '',
        });
        setIsGenerating(false);
        setIsComplete(false);
        setProgress(0);
    };

    const handleSubmit = async () => {
        if (!inputValue.trim() || isGenerating) return;

        const currentQuestion = questions[currentQuestionIndex];
        const value = inputValue.trim();

        let displayValue = value;
        if (currentQuestion.type === 'select' && currentQuestion.options) {
            const selectedOption = currentQuestion.options.find((option) => option.label === value);
            displayValue = selectedOption ? selectedOption.label : value;
        }

        const userMessage: ChatMessage = {
            id: `user-${Date.now()}`,
            type: 'user',
            content: displayValue,
            timestamp: new Date(),
        };
        setMessages(prev => [...prev, userMessage]);

        const updatedProfile = { ...userProfile };
        if (currentQuestion.type === 'tags') {
            const tags = value.split(',').map(tag => tag.trim()).filter(tag => tag);
            (updatedProfile as any)[currentQuestion.id] = tags;
        } else if (currentQuestion.id === 'targetCalories') {
            (updatedProfile as any)[currentQuestion.id] = value ? parseInt(value) : null;
        } else if (currentQuestion.type === 'select' && currentQuestion.options) {
            const selectedOption = currentQuestion.options.find((option) => option.label === value);
            (updatedProfile as any)[currentQuestion.id] = selectedOption ? selectedOption.value : value;
        } else {
            (updatedProfile as any)[currentQuestion.id] = value;
        }
        setUserProfile(updatedProfile);

        setInputValue('');

        await new Promise((resolve) => setTimeout(resolve, 800));

        if (currentQuestionIndex < questions.length - 1) {
            const nextQuestion = questions[currentQuestionIndex + 1];
            const botMessage: ChatMessage = {
                id: `bot-${Date.now()}`,
                type: 'bot',
                content: nextQuestion.question,
                timestamp: new Date(),
            };
            setMessages(prev => [...prev, botMessage]);
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        } else {
            generateMealPlan(updatedProfile);
        }
    };

    const handleSelectOption = (value: string) => {
        setInputValue(value);
        setTimeout(() => {
            handleSubmit();
        }, 100);
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSubmit();
        }
    };

    const handleAuthNav = (path: string) => {
        router.push(`/auth?mode=${path}`);
    };

    const generateMealPlan = async (profile: UserProfile) => {
        if (!token) {
            setPendingProfile(profile);
            setAuthModalOpen(true);
            return;
        }

        const generatingMessage: ChatMessage = {
            id: `generating-${Date.now()}`,
            type: 'bot',
            content: (
                <div className="space-y-4">
                    <div className="flex items-center gap-3">
                        <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                            className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full"
                        />
                        <p className="text-sm font-medium">
                            {profile.name}님의 맞춤형 식단을 생성하고 있어요...
                        </p>
                    </div>
                    {progress > 0 && (
                        <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
                            <motion.div
                                className="bg-primary h-2 rounded-full"
                                initial={{ width: 0 }}
                                animate={{ width: `${progress}%` }}
                                transition={{ duration: 0.5 }}
                            />
                        </div>
                    )}
                </div>
            ),
            timestamp: new Date(),
        };

        setMessages((prev) => [...prev, generatingMessage]);
        setIsGenerating(true);

        const { startDate, endDate } = getMealPlanDates();
        const bodyData = {
            ...profile,
            startDate,
            endDate,
            age: parseInt(profile.age),
            height: parseInt(profile.height),
            weight: parseInt(profile.weight),
        };

        try {
            await mealPlanRepository.generateMealPlan(bodyData);
        } catch (error) {
            setIsGenerating(false);
            const errorMessage: ChatMessage = {
                id: `error-${Date.now()}`,
                type: 'bot',
                content: '죄송합니다. 식단 생성 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.',
                timestamp: new Date(),
            };
            setMessages((prev) => [...prev, errorMessage]);
            toast('식단 생성에 실패했습니다. 잠시 후 다시 시도해주세요.');
        }
    };

    const currentQuestion = questions[currentQuestionIndex];

    return (
        <div className="flex h-screen w-full bg-background overflow-hidden">
            <AuthModal
                open={authModalOpen}
                onOpenChange={setAuthModalOpen}
                onSuccess={() => {
                    if (pendingProfile) {
                        generateMealPlan(pendingProfile);
                        setPendingProfile(null);
                    }
                }}
            />

            {/* Sidebar */}
            <AnimatePresence>
                {sidebarOpen && (
                    <>
                        {/* Mobile Overlay */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setSidebarOpen(false)}
                            className="fixed inset-0 z-40 lg:hidden"
                        />

                        {/* Sidebar Content */}
                        <motion.aside
                            initial={{ x: -300 }}
                            animate={{ x: 0 }}
                            exit={{ x: -300 }}
                            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                            className="fixed lg:relative top-0 left-0 h-full w-[280px] bg-muted/30 backdrop-blur-xl border-r border-border/50 z-50 flex flex-col"
                        >
                            {/* Sidebar Header */}
                            <div className="p-4 border-b border-border/50">
                                <div className="flex items-center justify-between mb-1">
                                    <h2 className="text-lg font-bold">aivy</h2>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        onClick={() => setSidebarOpen(false)}
                                        className="lg:hidden"
                                    >
                                        <ArrowLeft className="w-5 h-5" />
                                    </Button>
                                </div>
                            </div>

                            {/* History List */}
                            <div className="flex-1 overflow-y-auto p-3 space-y-2">
                                <div className="text-xs font-semibold text-muted-foreground px-3 py-2">
                                    최근 식단
                                </div>
                                {[1, 2, 3].map((i) => (
                                    <button
                                        key={i}
                                        className="w-full text-left px-3 py-2 rounded-lg hover:bg-muted/50 transition-colors text-sm"
                                    >
                                        <div className="font-medium truncate">다이어트 식단 {i}</div>
                                        <div className="text-xs text-muted-foreground">2일 전</div>
                                    </button>
                                ))}
                            </div>

                            {/* Sidebar Footer */}
                            <div className="p-3 pt-8 border-t border-border/50 space-y-1">
                                {
                                    user &&
                                    <button
                                        onClick={() => {
                                            router.push(`/profile/${user.name}`)
                                        }}
                                        className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-muted/50 transition-colors text-sm">
                                        <User className="w-4 h-4" />
                                        <span>프로필</span>
                                    </button>
                                }
                                <button
                                    onClick={() => {
                                        router.push('/settings')
                                    }}
                                    className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-muted/50 transition-colors text-sm">
                                    <Settings className="w-4 h-4" />
                                    <span>설정</span>
                                </button>
                            </div>
                        </motion.aside>
                    </>
                )}
            </AnimatePresence>

            {/* Main Content */}
            <div className="flex-1 flex flex-col min-w-0">
                {/* Top Bar with Menu Button */}
                <div className="h-16 border-b border-border/50 flex flex-row justify-between items-center px-4 backdrop-blur-xl bg-background/80 shrink-0">
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setSidebarOpen(!sidebarOpen)}
                    >
                        <PanelLeft className="w-5 h-5" />
                    </Button>
                    <div className="flex flex-row items-center gap-0.5">
                        {
                            user ?
                                <>
                                    <UserAvatar iconClassName='w-7 h-7' />
                                </>

                                :
                                <div className="flex flex-row items-center gap-2">
                                    <Button
                                        onClick={() => {
                                            handleAuthNav('signup');
                                        }}
                                        className="bg-foreground text-background hover:bg-foreground/90 rounded-full"
                                    >
                                        <UserIcon /> 가입하기
                                    </Button>
                                    <Button
                                        onClick={() => {
                                            handleAuthNav('login');
                                        }}
                                        className="bg-background border border-border rounded-full hover:bg-muted text-foreground"
                                    >
                                        로그인{' '}
                                    </Button>
                                </div>
                        }
                    </div>
                </div>

                {/* Messages Container */}
                <div className="flex-1 overflow-y-auto px-4 py-6 min-h-0 transition-all">
                    <div className="max-w-3xl mx-auto space-y-6">
                        <AnimatePresence mode="popLayout">
                            {messages.map((message) => {
                                if (message.content === '') return null;
                                return (
                                    <motion.div
                                        key={message.id}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -20 }}
                                        transition={{ duration: 0.3 }}
                                        className={cn(
                                            'flex gap-3',
                                            message.type === 'user' ? 'justify-end' : 'justify-start'
                                        )}
                                    >
                                        {message.type === 'bot' && (
                                            <div className="w-8 h-8 bg-background border border-border rounded-full flex items-center justify-center shrink-0 mt-1">
                                                <AiIcon />
                                            </div>
                                        )}
                                        <div
                                            className={cn(
                                                'rounded-2xl px-4 py-3 max-w-[80%]',
                                                message.type === 'user'
                                                    ? 'bg-primary text-primary-foreground'
                                                    : 'bg-muted'
                                            )}
                                        >
                                            {typeof message.content === 'string' ? (
                                                <p className="text-sm leading-relaxed whitespace-pre-wrap">
                                                    {message.content}
                                                </p>
                                            ) : (
                                                message.content
                                            )}
                                        </div>
                                        {message.type === 'user' && (
                                            <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center shrink-0 mt-1">
                                                <User className="w-4 h-4" />
                                            </div>
                                        )}
                                    </motion.div>
                                );
                            })}
                        </AnimatePresence>
                        <div ref={messagesEndRef} />
                    </div>
                </div>

                {/* Input Area */}
                {!isGenerating && !isComplete && currentQuestionIndex < questions.length && (
                    <div className="border-t border-border/50 p-4 backdrop-blur-xl bg-background/80 shrink-0">
                        <div className="max-w-3xl mx-auto">
                            {/* Select Options */}
                            {currentQuestion.type === 'select' && currentQuestion.options && (
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-4">
                                    {currentQuestion.options.map((option) => (
                                        <Button
                                            key={option.value}
                                            variant="outline"
                                            onClick={() => handleSelectOption(option.label)}
                                            className="justify-start h-auto py-3 text-left hover:bg-primary/10 hover:border-primary"
                                        >
                                            {option.label}
                                        </Button>
                                    ))}
                                </div>
                            )}

                            {/* Text Input */}
                            <div className="relative">
                                {currentQuestion.type === 'textarea' ? (
                                    <Textarea
                                        value={inputValue}
                                        onChange={(e) => setInputValue(e.target.value)}
                                        onKeyDown={handleKeyPress}
                                        placeholder={currentQuestion.placeholder}
                                        className="min-h-[100px] pr-12 resize-none rounded-2xl bg-muted"
                                    />
                                ) : (
                                    <Input
                                        type={currentQuestion.type === 'number' ? 'number' : 'text'}
                                        value={inputValue}
                                        onChange={(e) => setInputValue(e.target.value)}
                                        onKeyDown={handleKeyPress}
                                        placeholder={currentQuestion.placeholder}
                                        className="h-12 pr-12 rounded-full bg-muted"
                                    />
                                )}
                                <Button
                                    onClick={handleSubmit}
                                    size="icon"
                                    disabled={!inputValue.trim()}
                                    className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-foreground text-background"
                                >
                                    <MoveUp className="w-4 h-4" />
                                </Button>
                            </div>

                            {currentQuestion.optional && (
                                <div className="flex justify-end mt-2">
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => {
                                            setInputValue('');
                                            setTimeout(() => handleSubmit(), 50);
                                        }}
                                        className="text-xs text-muted-foreground hover:text-foreground"
                                    >
                                        건너뛰기 →
                                    </Button>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}