'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ChefHat, Heart, TrendingUp, Utensils, Apple, Target } from 'lucide-react';
import Link from 'next/link';

const healthTips = [
  {
    id: '1',
    title: '물 섭취의 중요성',
    content:
      '하루 8잔의 물을 마시면 신진대사가 활발해지고 피부가 좋아져요. 식사 30분 전에 물을 마시면 포만감도 높일 수 있어요.',
    category: '수분 섭취',
    readTime: '2분',
    likes: 124,
    image: '/water-glass-healthy.jpg',
  },
  {
    id: '2',
    title: '단백질 섭취 타이밍',
    content:
      '운동 후 30분 이내에 단백질을 섭취하면 근육 회복과 성장에 도움이 됩니다. 체중 1kg당 1.2-2g의 단백질 섭취를 권장해요.',
    category: '영양소',
    readTime: '3분',
    likes: 89,
    image: '/protein-rich-foods.jpg',
  },
  {
    id: '3',
    title: '간헐적 단식의 효과',
    content:
      '16:8 간헐적 단식은 인슐린 감수성을 개선하고 체중 감량에 도움을 줄 수 있어요. 개인의 생활 패턴에 맞게 조절하는 것이 중요합니다.',
    category: '식습관',
    readTime: '4분',
    likes: 156,
    image: '/intermittent-fasting-clock.jpg',
  },
];

export default function HomeTips() {
  return (
    <div className="p-4 md:p-6 max-w-4xl mx-auto">
      <div className="space-y-6">
        {/* Welcome Header */}
        <div className="text-center py-8">
          <h1 className="text-4xl font-bold mb-4">건강한 하루를 시작하세요 ✨</h1>
          <p className="text-xl text-muted-foreground mb-6">AI가 추천하는 맞춤형 식단과 건강 팁</p>
          <Button size="lg" className="gap-2" asChild>
            <Link href="/">
              <ChefHat className="w-5 h-5" />
              식단 생성 시작하기
            </Link>
          </Button>
        </div>

        {/* Health Tips Feed */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <TrendingUp className="w-6 h-6 text-primary" />
            오늘의 건강 팁
          </h2>

          {healthTips.map((tip, index) => (
            <motion.div
              key={tip.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardContent className="p-0">
                  <div className="md:flex">
                    <div className="md:w-1/3">
                      <img
                        src={tip.image || '/placeholder.svg'}
                        alt={tip.title}
                        className="w-full h-48 md:h-full object-cover rounded-l-lg"
                      />
                    </div>
                    <div className="md:w-2/3 p-6">
                      <div className="flex items-center gap-2 mb-2">
                        <Badge variant="secondary">{tip.category}</Badge>
                        <span className="text-sm text-muted-foreground">{tip.readTime} 읽기</span>
                      </div>
                      <h3 className="text-xl font-bold mb-3">{tip.title}</h3>
                      <p className="text-muted-foreground mb-4 line-clamp-3">{tip.content}</p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Heart className="w-4 h-4" />
                          {tip.likes}명이 좋아해요
                        </div>
                        <Button variant="ghost" size="sm">
                          더 읽기 →
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
          <Card className="text-center p-6 hover:shadow-lg transition-shadow cursor-pointer">
            <Link href="/">
              <Utensils className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="font-bold mb-2">식단 계획</h3>
              <p className="text-sm text-muted-foreground">AI가 맞춤형 식단을 생성해드려요</p>
            </Link>
          </Card>
          <Card className="text-center p-6 hover:shadow-lg transition-shadow cursor-pointer">
            <Apple className="w-12 h-12 text-primary mx-auto mb-4" />
            <h3 className="font-bold mb-2">영양 분석</h3>
            <p className="text-sm text-muted-foreground">섭취한 음식의 영양소를 분석해요</p>
          </Card>
          <Card className="text-center p-6 hover:shadow-lg transition-shadow cursor-pointer">
            <Target className="w-12 h-12 text-primary mx-auto mb-4" />
            <h3 className="font-bold mb-2">목표 관리</h3>
            <p className="text-sm text-muted-foreground">건강 목표를 설정하고 추적해요</p>
          </Card>
        </div>
      </div>
    </div>
  );
}
