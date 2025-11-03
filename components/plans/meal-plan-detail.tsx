'use client';

import { useMealPlan } from '@/hooks/use-meal-plan';
import { DefaultHeader } from '@/layouts/default-header';
import {
  AlarmClock,
  Apple,
  Calendar,
  Moon,
  Sun,
  Utensils,
  Flame,
  ShoppingBag,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { useEffect, useState, useRef } from 'react';
import { NoPlans } from '../no-plans';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Loading } from '../loading';
import { redirect } from 'next/navigation';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation } from 'swiper/modules';
import type { Swiper as SwiperType } from 'swiper';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { useRouter } from 'next/navigation';

interface MealPlanDetailProps {
  planId: string;
}

const mealTypes = [
  {
    key: 'breakfast',
    label: '아침',
    icon: <AlarmClock className="w-4 h-4 text-foreground" />,
    color: 'bg-orange-100 text-orange-800',
  },
  {
    key: 'lunch',
    label: '점심',
    icon: <Sun className="w-4 h-4 text-foreground" />,
    color: 'bg-yellow-100 text-yellow-800',
  },
  {
    key: 'dinner',
    label: '저녁',
    icon: <Moon className="w-4 h-4 text-foreground" />,
    color: 'bg-blue-100 text-blue-800',
  },
  {
    key: 'snack',
    label: '간식',
    icon: <Apple className="w-4 h-4 text-forground" />,
    color: 'bg-green-50 text-green-700',
  },
];

export function MealPlanDetail({ planId }: MealPlanDetailProps) {
  const router = useRouter();
  const { mealPlan, refresh, error, isLoading } = useMealPlan(planId);
  const mealPlanData = mealPlan?.mealPlanData?.mealPlanData || [];
  const [currentDay, setCurrentDay] = useState(0);
  const currentMeal = mealPlanData[currentDay];
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const swiperRef = useRef<SwiperType | null>(null);

  // 상품 추천 페이지로 이동
  const handleProductRecommendation = (menu: string) => {
    // 1. '+' 를 ', '로 변경
    let cleanedMenu = menu.replace(/\s*\+\s*/g, ', ');

    // 2. 쉼표로 분리
    const items = cleanedMenu.split(',').map(item => item.trim()).filter(item => item);

    // 3. 각 항목에서 단위 제거
    const cleanedItems = items.map(item => {
      // 단위 제거 (g, kg, ml, L, 개, 공기, 컵, 큰술, 작은술 등)
      let cleaned = item.replace(/\s*\d+\.?\d*\s*(g|kg|ml|L|개|공기|컵|큰술|작은술|티스푼|스푼|숟가락|그릇|접시|봉지|팩|조각|half|(|))/gi, '');

      // 분수 표현 제거 (예: 1/2)
      cleaned = cleaned.replace(/\s*\d+\/\d+\s*/g, ' ');

      // 연속된 공백을 하나로
      cleaned = cleaned.replace(/\s+/g, ' ');

      // 앞뒤 공백 제거
      return cleaned.trim();
    }).filter(item => item); // 빈 문자열 제거

    // 4. 쉼표로 다시 합치기
    const finalKeyword = cleanedItems.join(', ');

    router.push(`/products?keyword=${encodeURIComponent(finalKeyword)}`);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ko-KR', {
      month: 'long',
      day: 'numeric',
      weekday: 'short',
    });
  };

  const handleDateSelect = (date: Date | undefined) => {
    if (!date) return;

    const selectedDateString = date.toISOString().split('T')[0];
    const dayIndex = mealPlanData.findIndex((meal) => meal.date === selectedDateString);

    if (dayIndex !== -1) {
      setCurrentDay(dayIndex);
      swiperRef.current?.slideTo(dayIndex);
      setIsCalendarOpen(false);
    } else {
      setIsCalendarOpen(false);
    }
  };

  const isDateAvailable = (date: Date) => {
    const dateString = date.toISOString().split('T')[0];
    return mealPlanData.some((meal) => meal.date === dateString);
  };

  const getNutrientPercentage = (value: number, max: number) => {
    return Math.min((value / max) * 100, 100);
  };


  if (mealPlanData.length === 0 || !currentMeal) {
    return (
      <div className="flex justify-center items-center min-h-screen w-full">
        <Loading />
      </div>
    );
  }

  if (mealPlan?.status !== 'completed') {
    redirect('/plans');
  }

  return (
    <>
      <DefaultHeader title={mealPlan?.title || ''} />
      <div className="min-h-screen bg-background pb-8">
        {/* Header Section with Date */}
        <div className="sticky top-0 z-10 bg-background/80 backdrop-blur-xl border-b border-border/50 px-4 py-4">
          <div className="max-w-2xl mx-auto">
            <Popover open={isCalendarOpen} onOpenChange={setIsCalendarOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="ghost"
                  className="w-full flex items-center justify-center gap-3 hover:bg-muted/50 h-auto py-3"
                >
                  <Calendar className="h-5 w-5 text-primary" />
                  <div>
                    <div className="font-bold text-base text-foreground">
                      {formatDate(currentMeal.date)}
                    </div>
                    <div className="text-[10px] text-muted-foreground">
                      Day {currentDay + 1} of {mealPlanData.length}
                    </div>
                  </div>
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="center">
                <CalendarComponent
                  mode="single"
                  selected={new Date(currentMeal.date)}
                  onSelect={handleDateSelect}
                  disabled={(date) => !isDateAvailable(date)}
                  className="rounded-md border-0"
                  classNames={{
                    disabled: 'text-muted-foreground opacity-30 line-through',
                    today: 'bg-primary/10 text-primary rounded-md font-semibold',
                  }}
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>

        {/* Swiper Container */}
        <div className="px-4 pt-6">
          <Swiper
            modules={[Pagination, Navigation]}
            spaceBetween={20}
            slidesPerView={1}
            pagination={{
              clickable: true,
              dynamicBullets: true,
            }}
            onSwiper={(swiper) => {
              swiperRef.current = swiper;
            }}
            onSlideChange={(swiper) => {
              setCurrentDay(swiper.activeIndex);
            }}
            className="meal-plan-swiper pb-12"
          >
            {mealPlanData.map((dayMeal) => (
              <SwiperSlide key={dayMeal.date}>
                <div className="max-w-2xl mx-auto space-y-4">
                  {/* Daily Summary Card */}
                  <Card className="border rounded-2xl shadow-sm overflow-hidden">
                    <CardContent className="p-5">
                      <div className="flex items-center justify-center gap-2 mb-4">
                        <Flame className="w-5 h-5 text-orange-500" />
                        <div className="text-center">
                          <div className="text-2xl font-bold text-foreground">
                            {dayMeal.totalCalories.toLocaleString()}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            총 칼로리
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-3 gap-3">
                        <div className="text-center p-3 bg-muted/30 rounded-xl">
                          <div className="text-lg font-bold text-foreground">
                            {dayMeal.dailyNutrients.carbs}g
                          </div>
                          <div className="text-[10px] text-muted-foreground mt-0.5">
                            탄수화물
                          </div>
                        </div>
                        <div className="text-center p-3 bg-muted/30 rounded-xl">
                          <div className="text-lg font-bold text-foreground">
                            {dayMeal.dailyNutrients.protein}g
                          </div>
                          <div className="text-[10px] text-muted-foreground mt-0.5">
                            단백질
                          </div>
                        </div>
                        <div className="text-center p-3 bg-muted/30 rounded-xl">
                          <div className="text-lg font-bold text-foreground">
                            {dayMeal.dailyNutrients.fat}g
                          </div>
                          <div className="text-[10px] text-muted-foreground mt-0.5">
                            지방
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Meals */}
                  <div className="space-y-3">
                    {mealTypes.map((mealType) => {
                      const meal = dayMeal[mealType.key as keyof typeof dayMeal] as any;
                      if (!meal || typeof meal !== 'object' || !meal.menu) return null;

                      return (
                        <Card
                          key={mealType.key}
                          className="rounded-2xl border transition-shadow overflow-hidden"
                        >
                          <div className={`h-1.5 bg-gradient-to-r ${
                            mealType.key === 'breakfast' ? 'from-orange-400 to-yellow-400' :
                            mealType.key === 'lunch' ? 'from-yellow-400 to-amber-400' :
                            mealType.key === 'dinner' ? 'from-blue-400 to-indigo-400' :
                            'from-green-400 to-emerald-400'
                          }`} />
                          <CardHeader className="pb-2 pt-4">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <div className="w-6 h-6 flex items-center justify-center">
                                  {mealType.icon}
                                </div>
                                <CardTitle className="text-base text-foreground font-bold">
                                  {mealType.label}
                                </CardTitle>
                              </div>
                              <Badge
                                variant="secondary"
                                className="text-xs px-2 py-0.5 font-medium bg-muted"
                              >
                                {meal.calories} kcal
                              </Badge>
                            </div>
                          </CardHeader>
                          <CardContent className="space-y-4 pb-4">
                            <div className="bg-muted/30 rounded-xl p-3">
                              <div className="text-xs leading-relaxed text-foreground">
                                {meal.menu}
                              </div>
                            </div>

                            {/* 상품 추천 버튼 */}
                            <Button
                              variant="outline"
                              size="sm"
                              className="w-full gap-2 text-xs font-semibold text-foreground"
                              onClick={() => handleProductRecommendation(meal.menu)}
                            >
                              <ShoppingBag className="w-3.5 h-3.5" />
                              상품 추천 보기
                            </Button>

                            {/* Nutrient bars */}
                            <div className="space-y-3">
                              <div className="space-y-1.5">
                                <div className="flex justify-between items-center">
                                  <span className="text-[11px] text-muted-foreground">
                                    탄수화물
                                  </span>
                                  <span className="text-xs font-medium text-foreground">
                                    {meal.nutrients.carbs}g
                                  </span>
                                </div>
                                <div className="w-full bg-muted/50 rounded-full h-2 overflow-hidden">
                                  <div
                                    className="bg-gradient-to-r from-emerald-400 via-emerald-500 to-emerald-600 h-2 rounded-full transition-all duration-700"
                                    style={{
                                      width: `${getNutrientPercentage(meal.nutrients.carbs, 150)}%`,
                                    }}
                                  />
                                </div>
                              </div>

                              <div className="space-y-1.5">
                                <div className="flex justify-between items-center">
                                  <span className="text-[11px] text-muted-foreground">
                                    단백질
                                  </span>
                                  <span className="text-xs font-medium text-foreground">
                                    {meal.nutrients.protein}g
                                  </span>
                                </div>
                                <div className="w-full bg-muted/50 rounded-full h-2 overflow-hidden">
                                  <div
                                    className="bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 h-2 rounded-full transition-all duration-700"
                                    style={{
                                      width: `${getNutrientPercentage(meal.nutrients.protein, 80)}%`,
                                    }}
                                  />
                                </div>
                              </div>

                              <div className="space-y-1.5">
                                <div className="flex justify-between items-center">
                                  <span className="text-[11px] text-muted-foreground">
                                    지방
                                  </span>
                                  <span className="text-xs font-medium text-foreground">
                                    {meal.nutrients.fat}g
                                  </span>
                                </div>
                                <div className="w-full bg-muted/50 rounded-full h-2 overflow-hidden">
                                  <div
                                    className="bg-gradient-to-r from-amber-400 via-orange-500 to-red-500 h-2 rounded-full transition-all duration-700"
                                    style={{
                                      width: `${getNutrientPercentage(meal.nutrients.fat, 40)}%`,
                                    }}
                                  />
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      );
                    })}
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>

      <style jsx global>{`
        .meal-plan-swiper .swiper-pagination-bullet {
          width: 8px;
          height: 8px;
          background: hsl(var(--muted-foreground));
          opacity: 0.3;
        }
        .meal-plan-swiper .swiper-pagination-bullet-active {
          background: hsl(var(--primary));
          opacity: 1;
          width: 24px;
          border-radius: 4px;
        }
      `}</style>
    </>
  );
}
